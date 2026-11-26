using PortfolioCms.Api.Data;
using PortfolioCms.Api.Dtos;
using PortfolioCms.Api.Models;
using PortfolioCms.Api.Requests;
using PortfolioCms.Api.Services;
using PortfolioCms.Api.Validation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PortfolioCms.Api.Controllers;

[ApiController]
[Route("api/home-page")]
public class HomePageController(CmsDbContext db, IImageStorage imageStorage) : ControllerBase
{
    // Eight images (hero, Big Picture and 6 Personal) plus room for the other form fields.
    private const long MaxRequestBytes = 8 * ImageFileAttribute.MaxBytes + 1024 * 1024;

    [HttpGet]
    public async Task<ActionResult<HomePageDto>> Get(CancellationToken ct)
    {
        var page = await db.HomePages
            .AsNoTracking()
            .Include(p => p.HeroSection)
            .SingleOrDefaultAsync(p => p.Id == HomePage.SingletonId, ct);

        return HomePageDto.From(page);
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(MaxRequestBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxRequestBytes)]
    public async Task<ActionResult<HomePageDto>> Update([FromForm] UpdateHomePageRequest? request, CancellationToken ct)
    {
        // A form that can't be read (e.g. no multipart boundary) binds no request; ModelState holds the reason.
        if (request is null)
            return ValidationProblem(ModelState);

        var page = await db.HomePages
            .Include(p => p.HeroSection)
            .SingleOrDefaultAsync(p => p.Id == HomePage.SingletonId, ct);

        // These checks need the saved page, so they live here; everything is validated before any image is stored.
        if (page?.HeroSection?.ImagePath is null && request.HeroImage is null)
            ModelState.AddModelError("heroSection.image", "The Hero image is required.");
        if (page?.BigPictureSection is null && request.BigPictureImage is null)
            ModelState.AddModelError("bigPictureSection.image", "The Big Picture image is required.");
        IFormFile?[] personalImages =
        [
            request.PersonalImage1, request.PersonalImage2, request.PersonalImage3,
            request.PersonalImage4, request.PersonalImage5, request.PersonalImage6,
        ];
        for (var i = 0; i < personalImages.Length; i++)
            if (page?.PersonalSection is null && personalImages[i] is null)
                ModelState.AddModelError($"personalSection.images[{i}]", $"Personal image {i + 1} is required.");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (page is null)
            db.HomePages.Add(page = new HomePage());

        var hero = page.HeroSection ??= new HeroSection { Title = request.HeroTitle };
        hero.Title = request.HeroTitle.Trim();
        hero.Description = string.IsNullOrWhiteSpace(request.HeroDescription) ? null : request.HeroDescription.Trim();
        hero.Stats = request.HeroStats
            .Select(s => new HeroStat { Label = s.Label.Trim(), Value = s.Value.Trim() })
            .ToList();
        if (request.HeroImage is { } heroImage)
            hero.ImagePath = await imageStorage.SaveAsync(heroImage, ct);

        page.AboutSection = new AboutSection
        {
            Title = request.AboutTitle.Trim(),
            Items = request.AboutItems
                .Select(i => new AboutItem { Title = i.Title.Trim(), Description = i.Description.Trim() })
                .ToList(),
        };

        page.BigPictureSection = new BigPictureSection
        {
            Title = request.BigPictureTitle.Trim(),
            ImagePath = request.BigPictureImage is { } bigPictureImage
                ? await imageStorage.SaveAsync(bigPictureImage, ct)
                : page.BigPictureSection!.ImagePath, // validated above: present when no upload
            Items = request.BigPictureItems
                .Select(i => new BigPictureItem { Question = i.Question.Trim(), Answer = i.Answer.Trim() })
                .ToList(),
        };

        var personalImagePaths = new List<string>();
        for (var i = 0; i < personalImages.Length; i++)
            personalImagePaths.Add(personalImages[i] is { } file
                ? await imageStorage.SaveAsync(file, ct)
                : page.PersonalSection!.ImagePaths[i]); // validated above: present when no upload

        page.PersonalSection = new PersonalSection
        {
            Title = request.PersonalTitle.Trim(),
            Lead = request.PersonalLead.Trim(),
            Description = string.IsNullOrWhiteSpace(request.PersonalDescription) ? null : request.PersonalDescription.Trim(),
            ImagePaths = personalImagePaths,
        };

        await db.SaveChangesAsync(ct);

        return HomePageDto.From(page);
    }
}
