using Microsoft.EntityFrameworkCore;

namespace One_Piece_TCG_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<OnePieceTCG> Card { get; set; }
    }
}
