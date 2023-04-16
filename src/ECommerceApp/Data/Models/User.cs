﻿namespace ECommerceApp.Data.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }

        public Address? ShippingAddress { get; set; }
        public int? ShippingAddressId { get; set; }
        public ICollection<ProductReview> ProductReviews { get; set; }
        public ICollection<UserCart> Cart { get; set; }
    }
}
