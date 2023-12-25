using Microsoft.AspNetCore.Http;

namespace ECommerceApp.Library.Data.DTO;

public class ProductCreateDTO
{
    public required string ProductName { get; set; }
    public required string ProductDescription { get; set; }
    public double PriceUSD { get; set; }
    public int Quantity { get; set; }
    public int CategoryId { get; set; }
    public int SellerId { get; set; }

    public required IEnumerable<IFormFile> ImageFiles { get; set; }
}
