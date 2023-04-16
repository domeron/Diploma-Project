using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class ProductCategoryViewModel
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public int? ParentCategoryId { get; set; }
        public ICollection<ProductCategoryViewModel> ChildCategories { get; set; } = new List<ProductCategoryViewModel>();
        public ProductCategoryViewModel? Parent { get; set; }

        public ProductCategoryViewModel(ProductCategory category) { 
            Id = category.Id;
            CategoryName= category.CategoryName;
            ParentCategoryId = category.ParentCategoryId;

            if (category.ChildCategories != null && category.ChildCategories.Any())
            {
                foreach (var c in category.ChildCategories) {
                    ChildCategories.Add(new ProductCategoryViewModel(new() { 
                        Id = c.Id,
                        CategoryName = c.CategoryName,
                        ParentCategoryId = c.ParentCategoryId,
                        ChildCategories= c.ChildCategories
                    }));
                }
            }
            if (category.ParentCategory != null) {
                Parent = new ProductCategoryViewModel(new()
                {
                    Id = category.ParentCategory.Id,
                    CategoryName = category.ParentCategory.CategoryName,
                    ParentCategoryId = category.ParentCategory.ParentCategoryId,
                    ParentCategory = category.ParentCategory.ParentCategory
                });
            }
            
        }
    }
}
