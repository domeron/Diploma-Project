using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerceApp.Data.Configuration;

public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
{
    public void Configure(EntityTypeBuilder<ProductCategory> builder) 
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.CategoryName).IsRequired().HasMaxLength(128);
        builder.HasMany(c => c.ChildCategories)
            .WithOne(c => c.ParentCategory)
            .HasForeignKey(c => c.ParentCategoryId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
