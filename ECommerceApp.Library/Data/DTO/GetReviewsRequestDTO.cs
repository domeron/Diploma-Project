using ECommerceApp.Library.Extensions;

namespace ECommerceApp.Library.Data.DTO;
public class GetReviewsRequestDTO
{
    public int PageIndex { get; set; } = 0;
    public int PageSize { get; set; } = 50;
    public int ProductId { get; set; }
    public ProductReviewSortOptions SortOption { get; set; } = ProductReviewSortOptions.RatingHigh;
}
