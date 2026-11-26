using System.ComponentModel.DataAnnotations;
using PortfolioCms.Api.Validation;
using Microsoft.AspNetCore.Mvc;

namespace PortfolioCms.Api.Requests;

public class UpdateHomePageRequest
{
    [FromForm(Name = "heroSection.title")]
    [Required(ErrorMessage = "The Hero title is required.")]
    [StringLength(200, ErrorMessage = "The Hero title must not be greater than 200 characters.")]
    public string HeroTitle { get; set; } = "";

    // Browsers send line breaks as "\r\n"; storing "\n" makes the length limit count each one once, as the admin does.
    [FromForm(Name = "heroSection.description")]
    [StringLength(1000, ErrorMessage = "The Hero description must not be greater than 1000 characters.")]
    public string? HeroDescription { get; set => field = value?.ReplaceLineEndings("\n"); }

    [FromForm(Name = "heroSection.stats")]
    [FixedLength(4, ErrorMessage = "The Hero section must contain exactly 4 stats.")]
    public List<HeroStat> HeroStats { get; set; } = [];

    // Required while the section has no saved image; omit it later to keep the current one.
    [FromForm(Name = "heroSection.image")]
    [ImageFile]
    [Display(Name = "Hero image")]
    public IFormFile? HeroImage { get; set; }

    [FromForm(Name = "aboutSection.title")]
    [Required(ErrorMessage = "The About title is required.")]
    [StringLength(200, ErrorMessage = "The About title must not be greater than 200 characters.")]
    public string AboutTitle { get; set; } = "";

    [FromForm(Name = "aboutSection.items")]
    [FixedLength(6, ErrorMessage = "The About section must contain exactly 6 grid items.")]
    public List<AboutItem> AboutItems { get; set; } = [];

    [FromForm(Name = "bigPictureSection.title")]
    [Required(ErrorMessage = "The Big Picture title is required.")]
    [StringLength(200, ErrorMessage = "The Big Picture title must not be greater than 200 characters.")]
    public string BigPictureTitle { get; set; } = "";

    [FromForm(Name = "bigPictureSection.items")]
    [FixedLength(6, ErrorMessage = "The Big Picture section must contain exactly 6 questions.")]
    public List<BigPictureItem> BigPictureItems { get; set; } = [];

    // Required while the section has no saved image; omit it later to keep the current one.
    [FromForm(Name = "bigPictureSection.image")]
    [ImageFile]
    [Display(Name = "Big Picture image")]
    public IFormFile? BigPictureImage { get; set; }

    [FromForm(Name = "personalSection.title")]
    [Required(ErrorMessage = "The Personal title is required.")]
    [StringLength(200, ErrorMessage = "The Personal title must not be greater than 200 characters.")]
    public string PersonalTitle { get; set; } = "";

    [FromForm(Name = "personalSection.lead")]
    [Required(ErrorMessage = "The Personal lead is required.")]
    [StringLength(300, ErrorMessage = "The Personal lead must not be greater than 300 characters.")]
    public string PersonalLead { get; set => field = value?.ReplaceLineEndings("\n") ?? ""; } = "";

    [FromForm(Name = "personalSection.description")]
    [StringLength(1500, ErrorMessage = "The Personal description must not be greater than 1500 characters.")]
    public string? PersonalDescription { get; set => field = value?.ReplaceLineEndings("\n"); }

    // One field per image (list items with only a file don't bind). Each is required while it has no saved image;
    // omit it later to keep the current one.
    [FromForm(Name = "personalSection.images[0]")]
    [ImageFile]
    [Display(Name = "Personal image 1")]
    public IFormFile? PersonalImage1 { get; set; }

    [FromForm(Name = "personalSection.images[1]")]
    [ImageFile]
    [Display(Name = "Personal image 2")]
    public IFormFile? PersonalImage2 { get; set; }

    [FromForm(Name = "personalSection.images[2]")]
    [ImageFile]
    [Display(Name = "Personal image 3")]
    public IFormFile? PersonalImage3 { get; set; }

    [FromForm(Name = "personalSection.images[3]")]
    [ImageFile]
    [Display(Name = "Personal image 4")]
    public IFormFile? PersonalImage4 { get; set; }

    [FromForm(Name = "personalSection.images[4]")]
    [ImageFile]
    [Display(Name = "Personal image 5")]
    public IFormFile? PersonalImage5 { get; set; }

    [FromForm(Name = "personalSection.images[5]")]
    [ImageFile]
    [Display(Name = "Personal image 6")]
    public IFormFile? PersonalImage6 { get; set; }

    public class HeroStat
    {
        [Required(ErrorMessage = "A Hero stat label is required.")]
        [StringLength(100, ErrorMessage = "A Hero stat label must not be greater than 100 characters.")]
        public string Label { get; set; } = "";

        [Required(ErrorMessage = "A Hero stat value is required.")]
        [StringLength(20, ErrorMessage = "A Hero stat value must not be greater than 20 characters.")]
        public string Value { get; set; } = "";
    }

    public class AboutItem
    {
        [Required(ErrorMessage = "An About grid item title is required.")]
        [StringLength(100, ErrorMessage = "An About grid item title must not be greater than 100 characters.")]
        public string Title { get; set; } = "";

        [Required(ErrorMessage = "An About grid item description is required.")]
        [StringLength(500, ErrorMessage = "An About grid item description must not be greater than 500 characters.")]
        public string Description { get; set => field = value?.ReplaceLineEndings("\n") ?? ""; } = "";
    }

    public class BigPictureItem
    {
        [Required(ErrorMessage = "A Big Picture question is required.")]
        [StringLength(100, ErrorMessage = "A Big Picture question must not be greater than 100 characters.")]
        public string Question { get; set; } = "";

        [Required(ErrorMessage = "A Big Picture answer is required.")]
        [StringLength(200, ErrorMessage = "A Big Picture answer must not be greater than 200 characters.")]
        public string Answer { get; set; } = "";
    }

}
