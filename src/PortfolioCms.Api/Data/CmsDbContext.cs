using PortfolioCms.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioCms.Api.Data;

public class CmsDbContext(DbContextOptions<CmsDbContext> options) : DbContext(options)
{
    public DbSet<HomePage> HomePages => Set<HomePage>();
    public DbSet<HeroSection> HeroSections => Set<HeroSection>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HeroSection>().ComplexCollection(h => h.Stats, stats => stats.ToJson());
        modelBuilder.Entity<HomePage>(page =>
        {
            page.ComplexProperty(p => p.AboutSection, about => about.ToJson());
            page.ComplexProperty(p => p.BigPictureSection, bigPicture => bigPicture.ToJson());
            page.ComplexProperty(p => p.PersonalSection, personal => personal.ToJson());
        });
    }
}
