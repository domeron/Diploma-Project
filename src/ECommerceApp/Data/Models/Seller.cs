namespace ECommerceApp.Data.Models
{
    public class Seller
    {
        public int SellerId { get; set; }
        public string SellerName { get; set; }
        public string SellerEmail { get; set; }
        public string? SellerDescription { get; set; }
        public bool IsIndividual { get; set; }
        public bool IsVerified { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int? ShippingFromAddressId { get; set; }
        public ShippingFromAddress? ShippingFromAddress { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
