using System.ComponentModel.DataAnnotations;

namespace PortfolioCms.Api.Validation;

/// <summary>An optional uploaded image: allowed extension, not empty, at most 10 MB.
/// Messages use the property's [Display(Name)], e.g. "Hero image", so they make sense on their own.</summary>
[AttributeUsage(AttributeTargets.Property)]
public sealed class ImageFileAttribute : ValidationAttribute
{
    public const long MaxBytes = 10 * 1024 * 1024;
    private static readonly string[] Extensions = ["jpg", "jpeg", "png", "webp", "gif"];

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
            return ValidationResult.Success;
        var name = validationContext.DisplayName;
        if (value is not IFormFile file)
            return new($"The {name} must be a file.");

        var extension = Path.GetExtension(file.FileName).TrimStart('.');
        if (!Extensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
            return new($"The {name} must have a .{string.Join(", .", Extensions[..^1])} or .{Extensions[^1]} extension.");

        if (file.Length == 0)
            return new($"The {name} must not be empty.");
        if (file.Length > MaxBytes)
            return new($"The {name} must not be greater than {MaxBytes / (1024 * 1024)} MB.");

        return ValidationResult.Success;
    }
}
