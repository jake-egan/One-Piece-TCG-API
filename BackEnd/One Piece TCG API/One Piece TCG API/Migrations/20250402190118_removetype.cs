﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace One_Piece_TCG_API.Migrations
{
    /// <inheritdoc />
    public partial class removetype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Card");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Card",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
