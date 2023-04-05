using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class ProductCategoryWithParentsViewModel
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public int? ParentCategoryId { get; set; }
        public ProductCategoryWithParentsViewModel? Parent { get; set; }

        public ProductCategoryWithParentsViewModel(ProductCategory category)
        {
            Id = category.Id;
            CategoryName = category.CategoryName;
            if (category.ParentCategoryId != null && category.ParentCategory != null)
            {
                ParentCategoryId = category.ParentCategoryId;
                Parent = new ProductCategoryWithParentsViewModel(category.ParentCategory);
            }
        }
    }
}
