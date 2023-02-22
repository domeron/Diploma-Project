using Duende.IdentityServer.EntityFramework.Options;
using E_Commerce_WebAPI.Model;
using E_Commerce_WebAPI.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace E_Commerce_WebAPI.Data
{
    public class AppDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Product>().HasKey(p => p.ProductId);
            builder.Entity<Product>()
                .ToTable("Products")
                .HasOne(p => p.Category)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.CategoryId)
                .HasConstraintName("fk_product_category")
                .OnDelete(DeleteBehavior.Cascade)
                ;
            builder.Entity<Product>()
                .Property(p => p.ProductId)
                .HasColumnName("ProductId");
            builder.Entity<Product>()
                .Property(p => p.ProductName)
                .IsRequired()
                .HasMaxLength(50);
            builder.Entity<Product>()
                .Property(p => p.priceUSD)
                .IsRequired();
            builder.Entity<Product>()
                .Property(p => p.isStocked)
                .HasDefaultValue(false);

            builder.Entity<Category>().HasKey(c => c.CategoryId);
            builder.Entity<Category>()
                .Property(c => c.CategoryName)
                .IsRequired().HasMaxLength(50);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
