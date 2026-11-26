using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortfolioCms.Api.Models;

public class HeroSection
{
    public int Id { get; set; }

    [MaxLength(200)]
    public required string Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    /// <summary>Web-root-relative path from IImageStorage, e.g. "uploads/3f2a….png".</summary>
    [JsonIgnore]
    [MaxLength(100)]
    public string? ImagePath { get; set; }

    [NotMapped]
    public string? ImageUrl => ImagePath is { } path ? $"/{path}" : null;

    /// <summary>Stored as one JSON column (see CmsDbContext).</summary>
    public List<HeroStat> Stats { get; set; } = [];
}
