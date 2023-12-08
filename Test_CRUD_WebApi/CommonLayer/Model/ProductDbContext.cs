using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Test_CRUD_WebApi.CommonLayer.Model
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
