namespace ECommerceApp.Models
{
    public class ProductReviewCreateModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
    }
}
