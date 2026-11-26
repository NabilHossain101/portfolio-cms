using PortfolioCms.Api.Models;

namespace PortfolioCms.Api.Dtos;

/// <summary>Each section is null until a save includes it, so About, Big Picture and Personal can be null on an older saved home page.</summary>
public record HomePageDto(
    int Id,
    HeroSection? HeroSection,
    AboutSection? AboutSection,
    BigPictureSection? BigPictureSection,
    PersonalSection? PersonalSection)
{
    public static HomePageDto From(HomePage? page) =>
        new(HomePage.SingletonId, page?.HeroSection, page?.AboutSection, page?.BigPictureSection, page?.PersonalSection);
}
