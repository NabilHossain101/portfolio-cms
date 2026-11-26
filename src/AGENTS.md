# API (src/PortfolioCms.Api)

ASP.NET Core 10 controllers, EF Core 10 + SQLite, OpenAPI. Run commands from the repo root.

## Verify

- `dotnet build PortfolioCms.slnx` must pass with no new warnings. There are no tests yet.

## Conventions

- Validate in the request model; only checks that need the database go in the action. Automatic 400s are off, so actions that take input must end validation with `if (!ModelState.IsValid) return ValidationProblem(ModelState);`.
- Keep multipart request models flat, with `[FromForm(Name = "...")]` on each field.
- Validation error messages must make sense on their own; the admin joins them into one notification.
- Return image URLs root-relative (`/uploads/…`); the admin and website add the API origin.
