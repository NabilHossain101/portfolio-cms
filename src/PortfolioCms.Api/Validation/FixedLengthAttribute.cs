using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace PortfolioCms.Api.Validation;

/// <summary>A list with exactly this many entries and no null ones (gaps in explicit form indexes bind as null).</summary>
[AttributeUsage(AttributeTargets.Property)]
public sealed class FixedLengthAttribute(int length) : ValidationAttribute
{
    public override bool IsValid(object? value) =>
        value is IList list && list.Count == length && !list.Contains(null);
}
