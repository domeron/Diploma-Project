namespace ECommerceApp.Library.Data.Models;
public class ShippingAddress : Address
{
    public int UserId { get; set; }
    public User User { get; set; }
}
