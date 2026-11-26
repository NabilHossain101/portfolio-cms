namespace PortfolioCms.Api.Services;

public interface IImageStorage
{
    /// <summary>Stores the image and returns its web-root-relative path, e.g. "uploads/3f2a….png".</summary>
    Task<string> SaveAsync(IFormFile image, CancellationToken ct);
}
