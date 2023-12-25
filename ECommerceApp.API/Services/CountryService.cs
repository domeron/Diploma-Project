using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Services;

public class CountryService
{
    private readonly ICountryRepository _countryRepository;

    public CountryService(ICountryRepository countryRepository) { 
        _countryRepository= countryRepository;
    }

    public async Task<IList<Country>> GetAllCountriesAsync() {
        return await _countryRepository.GetAllCountriesAsync();

    }
}
