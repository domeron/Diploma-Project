namespace ECommerceApp.Library.Data.Models;
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public double PriceUSD { get; set; }
    public int Quantity { get; set; }
    public double Rating { get; set; }
    public int ReviewsCount { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime LastUpdatedOn { get; set; }
    public string? FrontImagePath { get; set; }
    public int CategoryId { get; set; }
    public ProductCategory Category { get; set; }
    public int SellerId { get; set; }
    public Seller Seller { get; set; }

    public ICollection<ProductReview> ProductReviews { get; set; }
    public ICollection<UserCart> UsersCart { get; set; }
    public ICollection<FavoriteProduct> UserFavorites{ get; set; }
    public ICollection<ProductImage> ProductImages { get; set; }
}
