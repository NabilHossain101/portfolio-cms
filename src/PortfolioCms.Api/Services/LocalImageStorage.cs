namespace PortfolioCms.Api.Services;

/// <summary>Saves images under the web root (wwwroot, or ASPNETCORE_WEBROOT on the VPS), served by UseStaticFiles.</summary>
public sealed class LocalImageStorage(IWebHostEnvironment env) : IImageStorage
{
    private const string Folder = "uploads";

    public async Task<string> SaveAsync(IFormFile image, CancellationToken ct)
    {
        var directory = Directory.CreateDirectory(Path.Combine(env.WebRootPath, Folder));
        // New random name; only the (already validated) extension comes from the upload.
        var fileName = $"{Guid.NewGuid():N}{Path.GetExtension(image.FileName).ToLowerInvariant()}";

        await using var stream = new FileStream(Path.Combine(directory.FullName, fileName), FileMode.CreateNew);
        await image.CopyToAsync(stream, ct);
        return $"{Folder}/{fileName}";
    }
}
