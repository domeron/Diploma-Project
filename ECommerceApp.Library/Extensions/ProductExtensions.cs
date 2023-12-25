using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;

namespace ECommerceApp.Library.Extensions;

public enum ProductListSortOptions { 
     DateNew, DateOld, Rating, PriceLow, PriceHigh, Random
}

public static class ProductExtensions
{
    public static IList<ProductVM> ToViewModelList(this IList<Product> products)
    {
        var vms = new List<ProductVM>();

        foreach (var product in products) {
            vms.Add(new ProductVM(product));
        }

        return vms;
    }

    public static ProductVM ToViewModel(this Product product)
    { 
        return new ProductVM(product);
    }
}
