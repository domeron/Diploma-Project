using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class ProductReviewViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public string CreatedOn { get; set; }
        public UserViewModel User {get; set; }
        public ProductViewModel Product { get; set; }

        public ProductReviewViewModel(ProductReview review) { 
            Id = review.Id;
            Title = review.Title;
            Content = review.Content;
            Rating = review.Rating;
            CreatedOn = review.CreatedOn.ToString("MMMM dd, yyyy");
            User = new UserViewModel(review.User);
            Product = new ProductViewModel(review.Product);
        }
    }
}
