using ECommerceApp.Data;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace ECommerceApp.API.Repository;

public interface ICountryRepository
{
    public Task<IList<Country>> GetAllCountriesAsync();
}

public class CountryRepository : ICountryRepository
{
    private readonly ApplicationDbContext _context;

    public CountryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Country>> GetAllCountriesAsync()
    {
        return await _context.Countries
            .OrderBy(c => c.Name)
            .ToListAsync();
    }
}
