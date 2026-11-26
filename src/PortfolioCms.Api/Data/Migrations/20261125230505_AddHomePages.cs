using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortfolioCms.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddHomePages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomePages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false),
                    HeroSectionId = table.Column<int>(type: "INTEGER", nullable: true),
                    AboutSection = table.Column<string>(type: "TEXT", nullable: true),
                    BigPictureSection = table.Column<string>(type: "TEXT", nullable: true),
                    PersonalSection = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomePages_HeroSections_HeroSectionId",
                        column: x => x.HeroSectionId,
                        principalTable: "HeroSections",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HomePages_HeroSectionId",
                table: "HomePages",
                column: "HeroSectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HomePages");
        }
    }
}
