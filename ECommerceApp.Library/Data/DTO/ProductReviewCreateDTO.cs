namespace ECommerceApp.Library.Data.DTO;

public class ProductReviewCreateDTO
{
    public string Title { get; set; }
    public string Content { get; set; }
    public int Rating { get; set; }
    public int ProductId { get; set; }
    public int UserId { get; set; }
}
