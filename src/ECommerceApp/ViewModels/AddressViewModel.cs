using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class AddressViewModel
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string City { get; set; }
        public string StreetAddress { get; set; }
        public string? StreetAddress2 { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }

        public AddressViewModel(Address address) { 
            Id = address.Id;
            CountryId = address.CountryId;
            City= address.City;
            StreetAddress = address.StreetAddress;
            StreetAddress2 = address.StreetAddress2;
            PostalCode = address.PostalCode;
            PhoneNumber = address.PhoneNumber;
            if(address.Country != null)
                CountryName = address.Country.Name;
        }

    }
}
