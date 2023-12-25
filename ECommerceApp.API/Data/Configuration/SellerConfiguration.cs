using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration;

public class SellerConfiguration : IEntityTypeConfiguration<Seller>
{
    public void Configure(EntityTypeBuilder<Seller> builder) {
        builder.Property(s => s.SellerName).IsRequired();
        builder.Property(s => s.SellerEmail).IsRequired();
        builder.Property(s => s.IsIndividual).HasDefaultValue(true);
        builder.Property(s => s.IsVerified).HasDefaultValue(false);
        builder.HasOne(s => s.ShippingFromAddress)
            .WithOne(a => a.Seller)
            .HasForeignKey<Seller>(s => s.ShippingFromAddressId)
            .OnDelete(DeleteBehavior.ClientSetNull);
        builder.HasOne(s => s.User)
            .WithOne(u => u.Seller)
            .HasForeignKey<Seller>(s => s.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
