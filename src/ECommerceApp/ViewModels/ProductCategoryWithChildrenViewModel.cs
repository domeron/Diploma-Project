using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class ProductCategoryWithChildrenViewModel
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public int? ParentCategoryId { get; set; }
        public ICollection<ProductCategoryWithChildrenViewModel> ChildCategories { get; set; } = new List<ProductCategoryWithChildrenViewModel>();

        public ProductCategoryWithChildrenViewModel(ProductCategory category) { 
            Id = category.Id;
            CategoryName= category.CategoryName;
            if (category.ChildCategories != null && category.ChildCategories.Any())
            {
                foreach (var c in category.ChildCategories) {
                    ChildCategories.Add(new ProductCategoryWithChildrenViewModel(c));
                }
            }
            if (category.ParentCategoryId != null) { 
                ParentCategoryId = category.ParentCategoryId;
            }
        }
    }
}
