using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class ProductReviewVM
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }
    public int ProductId { get; set; }
    public DateTime CreatedOn { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string? UserProfileImagePath { get; set; }

    public ProductReviewVM(ProductReview review)
    {
        Id = review.Id;
        Title = review.Title;
        ProductId = review.ProductId;
        Content = review.Content;
        Rating = review.Rating;
        CreatedOn = review.CreatedOn;
        UserId = review.UserId;
        UserName = review.User.FirstName + " " + review.User.LastName;
        UserProfileImagePath = review.User.ProfileImagePath;
    }
}