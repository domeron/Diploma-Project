using Microsoft.AspNetCore.Http;

namespace ECommerceApp.Library.Data.DTO;

public class ProductUpdateDTO
{
    public int ProductId { get; set; }
    public string? ProductName { get; set; }
    public string? ProductDescription { get; set; }
    public double? PriceUSD { get; set; }
    public int? Quantity { get; set; }
    public int? CategoryId { get; set; }

    public string? FrontImagePath { get; set; }
    public ICollection<IFormFile>? NewImageFiles { get; set; }
    public ICollection<int>? DeletedImagesIds { get; set; }
}
