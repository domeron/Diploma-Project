namespace ECommerceApp.Models
{
    public class AddressUpdateModel
    {
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string? StreetAddress { get; set; }
        public string? StreetAddress2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? CountryId { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FullName { get; set; }
    }
}
