using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data.Models;
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
    public DbSet<PaymentCard> PaymentCards { get; set; }
    public DbSet<Address> Addresses { get; set; }

    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new UserEntityTypeConfiguration().Configure(builder.Entity<User>());
        new SellerEntityTypeConfiguration().Configure(builder.Entity<Seller>());
        new ProductCategoryEntityTypeConfiguration().Configure(builder.Entity<ProductCategory>());
        new ProductEntityTypeConfiguration().Configure(builder.Entity<Product>());
        new UserCartEntityTypeConfiguration().Configure(builder.Entity<UserCart>());
        new ProductImageEntityTypeConfiguration().Configure(builder.Entity<ProductImage>());
        new AddressEntityConfiguration().Configure(builder.Entity<Address>());
    }
}
