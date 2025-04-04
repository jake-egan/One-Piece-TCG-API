using Microsoft.EntityFrameworkCore;
using One_Piece_TCG_API.Entities;

namespace One_Piece_TCG_API.Data
{
    public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options) 
    {
        public DbSet<OnePieceTCG> Card { get; set; }
        public DbSet<User> Users { get; set; }
    }
    
    
}
