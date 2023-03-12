using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration
{
    public class SellerEntityTypeConfiguration : IEntityTypeConfiguration<Seller>
    {
        public void Configure(EntityTypeBuilder<Seller> builder) {
            builder.Property(s => s.SellerName).IsRequired();
            builder.Property(s => s.SellerEmail).IsRequired();
            builder.Property(s => s.IsIndividual).IsRequired();
            builder.Property(s => s.Password).IsRequired();
            
        }
    }
}
