using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;

namespace ECommerceApp.Library.Extensions;

public enum ProductReviewSortOptions
{
    DateNew, DateOld, RatingHigh, RatingLow
}
public static class ProductReviewExtensions
{
    public static IList<ProductReviewVM> ToViewModelList(this IList<ProductReview> reviews)
    { 
        var vms = new List<ProductReviewVM>();

        foreach (var review in reviews)
        {
            vms.Add(new ProductReviewVM(review));
        }

        return vms;
    }

    public static ProductReviewVM ToViewModel(this ProductReview review)
    { 
        return new ProductReviewVM(review);
    }
}
