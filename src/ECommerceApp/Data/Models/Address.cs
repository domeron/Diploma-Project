
namespace ECommerceApp.Data.Models
{
    public abstract class Address
    {
        public int Id { get; set; }

        public int CountryId { get; set; }
        public Country Country { get; set; }
        public string StreetAddress { get; set; }
        public string? StreetAddress2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }

        public string FullName { get; set; }
    }
}
