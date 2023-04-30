namespace ECommerceApp.Models
{
    public class ProductUpdateModel
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public double? PriceUSD { get; set; }
        public int? Quantity { get; set; }
        public int? CategoryId { get; set; }

        public string? FrontImagePath { get; set; }
        public IEnumerable<IFormFile>? NewImageFiles { get; set; }
        public IEnumerable<int>? DeletedImagesIds { get; set; }
    }
}
