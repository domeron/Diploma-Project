namespace ECommerceApp.Data.Models
{
    public class Seller
    {
        public int SellerId { get; set; }
        public string SellerName { get; set; }
        public string SellerEmail { get; set; }
        public string SellerDescription { get; set; }

        public bool IsIndividual { get; set; }

        public string Password { get; set; }
        public string UserRole { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
