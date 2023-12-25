using ECommerceApp.Library.Extensions;

namespace ECommerceApp.Library.Data.DTO;
public class GetProductsRequestDTO
{
    public int PageIndex { get; set; } = 0;
    public int PageSize { get; set; } = 50;
    public int CategoryId { get; set; } = 0;
    public string? StartPattern { get; set; }
    public int SellerId { get; set; } = 0;
    public ProductListSortOptions SortOption { get; set; } = ProductListSortOptions.Rating;
}
