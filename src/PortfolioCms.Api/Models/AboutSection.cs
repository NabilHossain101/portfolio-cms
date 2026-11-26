namespace PortfolioCms.Api.Models;

/// <summary>Stored as JSON on HomePage.</summary>
public class AboutSection
{
    public required string Title { get; set; }

    public List<AboutItem> Items { get; set; } = [];
}

public class AboutItem
{
    public required string Title { get; set; }

    /// <summary>The item's lines, separated by "\n".</summary>
    public required string Description { get; set; }
}
