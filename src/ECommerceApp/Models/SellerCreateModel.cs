namespace ECommerceApp.Models
{
    public class SellerCreateModel
    {
        public string SellerName { get; set; }
        public string SellerEmail { get; set; }
        public string SellerDescription { get; set; }

        public bool IsIndividual { get; set; }

        public string Password { get; set; }
    }
}
