using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data.Models;
using ECommerceApp.Data.Configuration;

namespace ECommerceApp.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Seller> Sellers{ get; set; }
    public DbSet<Product> Products{ get; set; }

    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new UserEntityTypeConfiguration().Configure(builder.Entity<User>());
        new SellerEntityTypeConfiguration().Configure(builder.Entity<Seller>());
        new ProductEntityTypeConfiguration().Configure(builder.Entity<Product>());
    }
}
