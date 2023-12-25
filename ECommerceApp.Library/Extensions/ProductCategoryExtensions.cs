using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;

namespace ECommerceApp.Library.Extensions;

public static class ProductCategoryExtensions
{
    public static List<ProductCategoryVM> ToViewModelsList(this List<ProductCategory>? categories)
    {
        var viewModels = new List<ProductCategoryVM>();
        foreach (var category in categories)
        {
            viewModels.Add(new ProductCategoryVM(category));
        }   
        return viewModels;
    }

    public static ProductCategoryVM ToViewModel(this ProductCategory category)
    {
        return new ProductCategoryVM(category);
    }
}
