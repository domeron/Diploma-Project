namespace ECommerceApp.Data.Models
{
    public class ShippingFromAddress : Address
    {
        public int SellerId { get; set; }
        public Seller Seller { get; set; }
    }
}
