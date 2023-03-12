using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration
{
    public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.ProductId);
            builder.Property(p => p.ProductName).IsRequired().HasMaxLength(128);
            builder.Property(p => p.PriceUSD).IsRequired();
            builder.Property(p => p.Quantity).IsRequired();
            builder.HasOne(p => p.Seller).WithMany(s => s.Products)
                .HasForeignKey(p => p.SellerId);
        }
    }
}
