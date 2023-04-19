using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface ICountryRepository
    {
        public IAsyncEnumerable<Country> GetAllCountriesAsync();
    }
}
