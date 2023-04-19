namespace ECommerceApp.Data.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Password { get; set; }
        public string? ProfileImagePath { get; set; }

        public bool IsSeller { get; set; }

        public int? SellerId { get; set; }
        public Seller? Seller { get; set; }
        public int? ShippingAddressId { get; set; }
        public ShippingAddress? ShippingAddress { get; set; }

        public ICollection<ProductReview> ProductReviews { get; set; }
        public ICollection<UserCart> Cart { get; set; }
    }
}
