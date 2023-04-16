using ECommerceApp.Data.Models;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.ViewModels
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double PriceUSD { get; set; }
        public int Quantity { get; set; }
        public double Rating { get; set; }
        public int ReviewsCount { get; set; }
        public string CreatedOn { get; set; }
        public string FrontImagePath { get; set; }
        public ICollection<string>? ImagesURL { get; set; }
        public ProductCategoryViewModel Category { get; set; }

        public ProductViewModel(Product product)
        { 
            ProductId = product.ProductId;
            SellerId= product.SellerId;
            ProductName = product.ProductName;
            ProductDescription = product.ProductDescription;
            PriceUSD = product.PriceUSD;
            Quantity = product.Quantity;
            Rating = product.Rating;
            ReviewsCount = product.ReviewsCount;
            CreatedOn = product.CreatedOn.ToString("MMMM dd, yyyy");
            Category = new ProductCategoryViewModel(new() { 
                Id = product.CategoryId,
                CategoryName = product.Category.CategoryName,
            });
            FrontImagePath = product.FrontImagePath;

            if (!product.ProductImages.IsNullOrEmpty()) {
                ImagesURL = new List<string>();
                foreach (var image in product.ProductImages) {
                    ImagesURL.Add(image.ImagePath);
                }
            }
        }
    }
}
