using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Configuration
{
    public class ShippingFromAddressEntityTypeConfiguration : IEntityTypeConfiguration<ShippingFromAddress>
    {
        public void Configure(EntityTypeBuilder<ShippingFromAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(a => a.Seller)
                .WithOne(u => u.ShippingFromAddress)
                .HasForeignKey<ShippingFromAddress>(a => a.SellerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
