using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class AddressVM
{
    public int Id { get; set; }
    public int CountryId { get; set; }
    public string CountryName { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string StreetAddress { get; set; }
    public string? StreetAddress2 { get; set; }
    public string PostalCode { get; set; }
    public string PhoneNumber { get; set; }
    public string FullName { get; set; }

    public AddressVM() { }
    public AddressVM(Address address) { 
        Id = address.Id;
        CountryId = address.CountryId;
        City= address.City;
        State = address.State;
        StreetAddress = address.StreetAddress;
        StreetAddress2 = address.StreetAddress2;
        PostalCode = address.PostalCode;
        PhoneNumber = address.PhoneNumber;
        FullName = address.FullName;
        if(address.Country != null)
            CountryName = address.Country.Name;
    }

}
