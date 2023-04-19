using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Country")]
    public class CountryController : Controller
    {
        private CountryService _service;

        public CountryController(CountryService service) {
            _service = service;
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<CountryViewModel> GetAllCountriesAsync() {
            var countries = _service.GetAllCountriesAsync();

            await foreach (var country in countries)
            {
                yield return new CountryViewModel(country);
            }
        }
    }
}
