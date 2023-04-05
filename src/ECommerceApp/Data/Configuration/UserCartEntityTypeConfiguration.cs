using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration
{
    public class UserCartEntityTypeConfiguration : IEntityTypeConfiguration<UserCart>
    {
        public void Configure(EntityTypeBuilder<UserCart> builder)
        {
            builder.HasKey(uc => new { uc.UserId, uc.ProductId });
            builder.HasOne(uc => uc.User)
                .WithMany(u => u.Cart)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(uc => uc.Product)
                .WithMany(p => p.UsersCart)
                .HasForeignKey(uc => uc.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
