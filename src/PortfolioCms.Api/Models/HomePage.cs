using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioCms.Api.Models;

public class HomePage
{
    public const int SingletonId = 1;

    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; } = SingletonId;

    public int? HeroSectionId { get; set; }
    public HeroSection? HeroSection { get; set; }

    public AboutSection? AboutSection { get; set; }
    public BigPictureSection? BigPictureSection { get; set; }
    public PersonalSection? PersonalSection { get; set; }
}
