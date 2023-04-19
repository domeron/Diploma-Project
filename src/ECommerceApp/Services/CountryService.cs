using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;

namespace ECommerceApp.Services
{
    public class CountryService
    {
        private readonly ICountryRepository _countryRepository;

        public CountryService(ICountryRepository countryRepository) { 
            _countryRepository= countryRepository;
        }

        public async IAsyncEnumerable<Country> GetAllCountriesAsync() {
            var countries = _countryRepository.GetAllCountriesAsync();

            await foreach (var country in countries) {
                yield return country;
            }
        }
    }
}
