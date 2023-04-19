using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class CountryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CountryViewModel(Country country) { 
            Id = country.Id;
            Name = country.Name;
        }
    }
}
