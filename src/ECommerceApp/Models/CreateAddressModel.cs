using ECommerceApp.Data.Models;

namespace ECommerceApp.Models
{
    public class CreateAddressModel
    {
        public int CountryId { get; set; }
        public string StreetAddress { get; set; }
        public string? StreetAddress2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
    }
}
