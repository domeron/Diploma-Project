using ECommerceApp.Library.Data.Models;
using FluentValidation.Validators;

namespace ECommerceApp.Library.Data.ViewModels;

public class ProductCategoryVM
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public int? ParentCategoryId { get; set; }

    public ProductCategoryVM() { }
    public ProductCategoryVM(ProductCategory category) { 
        Id = category.Id;
        CategoryName= category.CategoryName;
        ParentCategoryId = category.ParentCategoryId;
    }
}
