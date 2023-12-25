using Microsoft.EntityFrameworkCore;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Data.Configuration;

namespace ECommerceApp.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Seller> Sellers{ get; set; }
    public DbSet<ProductCategory> ProductCategories{ get; set; }
    public DbSet<Product> Products{ get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<ProductReview> ProductReviews{ get; set; }
    public DbSet<UserCart> UserCarts{ get; set; }
    public DbSet<ShippingAddress> ShippingAddresses { get; set; }
    public DbSet<ShippingFromAddress> ShippingFromAddresses { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<FavoriteProduct> Favorites { get; set; }

    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(typeof(ProductConfiguration).Assembly);
    }
}
