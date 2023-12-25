using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class CountryVM
{
    public int Id { get; set; }
    public string Name { get; set; }

    public CountryVM(Country country) { 
        Id = country.Id;
        Name = country.Name;
    }
}
