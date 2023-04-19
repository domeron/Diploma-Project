using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class CountryRepository : ICountryRepository
    {
        private readonly ApplicationDbContext _context;

        public CountryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Country> GetAllCountriesAsync() {
            var countries = _context.Countries
                .OrderBy(c => c.Name)
                .AsAsyncEnumerable();

            await foreach (var country in countries) {
                yield return country;
            }
        }
    }
}
