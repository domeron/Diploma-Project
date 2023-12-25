using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;
public class ProductCategoryWithChildrenVM
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public int? ParentCategoryId { get; set; }
    public int? ParentParentCategoryId { get; set; }

    public string? ParentCategoryName { get; set; }
    public string? ParentParentCategoryName { get; set; }

    public IList<ProductCategoryWithChildrenVM> ChildCategories { get; set; } = new List<ProductCategoryWithChildrenVM>();

    public ProductCategoryWithChildrenVM() { }
    public ProductCategoryWithChildrenVM(ProductCategory category)
    {
        Id = category.Id;
        CategoryName = category.CategoryName;
        ParentCategoryId = category.ParentCategoryId;

        if (category.ChildCategories != null && category.ChildCategories.Any()) {
            foreach (var child in category.ChildCategories) { 
                ChildCategories.Add(new ProductCategoryWithChildrenVM(child));
            }
        }

        if (category.ParentCategory != null) { 
            ParentCategoryName = category.ParentCategory.CategoryName;
            ParentParentCategoryId = category.ParentCategory.ParentCategoryId;
            if (category.ParentCategory.ParentCategory != null) 
                ParentParentCategoryName = category.ParentCategory.ParentCategory.CategoryName;
        }
    }
}
