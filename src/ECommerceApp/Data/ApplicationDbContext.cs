using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using ECommerceApp.Models;
using ECommerceApp.Data.Models;

namespace ECommerceApp.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }

    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Product>().HasKey(p => p.ProductId);
        builder.Entity<Product>()
            .ToTable("Products")
            .HasOne(p => p.ProductCategory)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.ProductCategoryId)
            .HasConstraintName("fk_product_category")
            .OnDelete(DeleteBehavior.Cascade)
            ;
        builder.Entity<Product>()
            .Property(p => p.ProductName)
            .IsRequired()
            .HasMaxLength(50);
        builder.Entity<Product>()
            .Property(p => p.PriceUSD)
            .IsRequired()
            .HasDefaultValue(0.00);
        builder.Entity<Product>()
            .Property(p => p.IsStocked)
            .HasDefaultValue(false);

        builder.Entity<ProductCategory>().HasKey(c => c.ProductCategoryId);
        /*builder.Entity<ProductCategory>().HasMany(p => p.Products)
            .WithOne(c => c.ProductCategory);*/
        builder.Entity<ProductCategory>()
            .Property(c => c.ProductCategoryName)
            .IsRequired().HasMaxLength(50);
    }
}
