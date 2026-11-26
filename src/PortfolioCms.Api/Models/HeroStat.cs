namespace PortfolioCms.Api.Models;

public class HeroStat
{
    public required string Label { get; set; }

    /// <summary>Text, not a number, so editors can write "140+".</summary>
    public required string Value { get; set; }
}
