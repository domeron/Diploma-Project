namespace ECommerceApp.Library.Data.Models;
public class FavoriteProduct
{
    public int UserId { get; set; }
    public int ProductId { get; set; }

    public User User { get; set; }
    public Product Product { get; set; }
}
