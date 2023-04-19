namespace ECommerceApp.Models
{
    public class SellerUpdateModel
    {
        public string? SellerName { get; set; }
        public string? SellerEmail { get; set; }
        public string? SellerDescription { get; set; }

        public bool? IsIndividual { get; set; }

        public bool? IsVerified { get; set; }
    }
}
