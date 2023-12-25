namespace ECommerceApp.Library.Data.Models;
public class ProductReview
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedOn { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
}
