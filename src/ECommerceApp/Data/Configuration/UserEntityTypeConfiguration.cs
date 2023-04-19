using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.Property(u => u.FirstName).IsRequired();
            builder.Property(u => u.LastName).IsRequired();
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.Password).IsRequired();

            builder.HasOne(u => u.ShippingAddress)
                .WithOne(a => a.User)
                .HasForeignKey<User>(u => u.ShippingAddressId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Property(u => u.IsSeller).HasDefaultValue(false);

            builder.HasOne(u => u.Seller)
                .WithOne(s => s.User)
                .HasForeignKey<User>(u => u.SellerId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
