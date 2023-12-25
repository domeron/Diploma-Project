using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class ProductVM
{
    public int ProductId { get; set; }
    public int SellerId { get; set; }
    public int CategoryId { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public double PriceUSD { get; set; }
    public int Quantity { get; set; }
    public double Rating { get; set; }
    public int ReviewsCount { get; set; }
    public string CreatedOn { get; set; }
    public string? FrontImagePath { get; set; }
    public Dictionary<int,string>? ImagesURL { get; set; }
    public ProductCategoryVM? Category { get; set; }

    public ProductVM(Product product)
    { 
        ProductId = product.ProductId;
        SellerId= product.SellerId;
        CategoryId = product.CategoryId;
        ProductName = product.ProductName;
        ProductDescription = product.ProductDescription;
        PriceUSD = product.PriceUSD;
        Quantity = product.Quantity;
        Rating = product.Rating;
        ReviewsCount = product.ReviewsCount;
        CreatedOn = product.CreatedOn.ToString("MMMM dd, yyyy");
        FrontImagePath = product.FrontImagePath;

        if (product.Category != null) { 
            Category = new ProductCategoryVM(new() { 
                Id = product.CategoryId,
                CategoryName = product.Category.CategoryName,
            });
        }

        if (product.ProductImages != null) {
            ImagesURL = new Dictionary<int, string>();
            foreach (var image in product.ProductImages) {
                ImagesURL.Add(image.Id, image.ImagePath);
            }
        }
    }
}
