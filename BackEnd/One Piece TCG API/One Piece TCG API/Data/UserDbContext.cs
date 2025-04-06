using Microsoft.EntityFrameworkCore;
using One_Piece_TCG_API.Entities;

namespace One_Piece_TCG_API.Data
{
    public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
    {
        public DbSet<OnePieceTCG> Card { get; set; }
        public DbSet<CollectedCards> CollectedCards { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OnePieceTCG>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<CollectedCards>()
                .HasKey(cc => cc.Id); 
            modelBuilder.Entity<CollectedCards>()
                .HasOne(cc => cc.User)
                .WithMany()
                .HasForeignKey(cc => cc.User_Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CollectedCards>()
                .HasOne(cc => cc.Card)
                .WithMany()
                .HasForeignKey(cc => cc.CardId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
