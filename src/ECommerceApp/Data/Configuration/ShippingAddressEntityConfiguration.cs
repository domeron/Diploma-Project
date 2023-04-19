using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration
{
    public class ShippingAddressEntityConfiguration : IEntityTypeConfiguration<ShippingAddress>
    {
        public void Configure(EntityTypeBuilder<ShippingAddress> builder) { 
            builder.HasKey(x => x.Id);
            builder.HasOne(a => a.User)
                .WithOne(u => u.ShippingAddress)
                .HasForeignKey<ShippingAddress>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
