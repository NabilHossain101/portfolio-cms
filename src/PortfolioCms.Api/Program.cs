using PortfolioCms.Api.Data;
using PortfolioCms.Api.Requests;
using PortfolioCms.Api.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CmsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Cms")));

builder.Services.AddSingleton<IImageStorage, LocalImageStorage>();

// nginx sends X-Forwarded-Proto so HTTPS redirection knows the original scheme.
builder.Services.Configure<ForwardedHeadersOptions>(options => options.ForwardedHeaders = ForwardedHeaders.XForwardedProto);

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));

// Controllers return ValidationProblem(ModelState) themselves, so checks that need the database are
// reported together with the request's own errors, and a list's count is checked even when an item is invalid.
builder.Services
    .AddControllers(options => options.ValidateComplexTypesIfChildValidationFails = true)
    .ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);
builder.Services.AddOpenApi(options =>
{
    // Avoid schema ID collisions between nested request item classes and Models.* types,
    // while keeping published OpenAPI schema IDs stable.
    options.CreateSchemaReferenceId = type => type.Type switch
    {
        var t when t == typeof(UpdateHomePageRequest.HeroStat) => "UpdateHeroStatRequest",
        var t when t == typeof(UpdateHomePageRequest.AboutItem) => "UpdateAboutItemRequest",
        var t when t == typeof(UpdateHomePageRequest.BigPictureItem) => "UpdateBigPictureItemRequest",
        _ => OpenApiOptions.CreateDefaultSchemaReferenceId(type),
    };
});

var app = builder.Build();

app.UseForwardedHeaders();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();            // /openapi/v1.json
    app.MapScalarApiReference(); // /scalar
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors();

// Serves wwwroot, including uploaded images (on the VPS, point ASPNETCORE_WEBROOT at persistent storage).
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context => context.Context.Response.Headers["X-Content-Type-Options"] = "nosniff",
});

app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapControllers();

app.Run();
