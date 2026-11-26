using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortfolioCms.Api.Models;

/// <summary>Stored as JSON on HomePage.</summary>
public class PersonalSection
{
    public required string Title { get; set; }

    public required string Lead { get; set; }

    public string? Description { get; set; }

    /// <summary>Web-root-relative paths from IImageStorage, in display order: the first 3 are the left strip, the last 3 the right.</summary>
    [JsonIgnore]
    public List<string> ImagePaths { get; set; } = [];

    [NotMapped]
    public List<string> ImageUrls => ImagePaths.Select(path => $"/{path}").ToList();
}
