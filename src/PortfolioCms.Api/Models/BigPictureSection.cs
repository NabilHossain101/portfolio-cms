using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortfolioCms.Api.Models;

/// <summary>Stored as JSON on HomePage.</summary>
public class BigPictureSection
{
    public required string Title { get; set; }

    /// <summary>Web-root-relative path from IImageStorage, e.g. "uploads/3f2a….png".</summary>
    [JsonIgnore]
    public string ImagePath { get; set; } = "";

    [NotMapped]
    public string ImageUrl => $"/{ImagePath}";

    public List<BigPictureItem> Items { get; set; } = [];
}

public class BigPictureItem
{
    public required string Question { get; set; }

    public required string Answer { get; set; }
}
