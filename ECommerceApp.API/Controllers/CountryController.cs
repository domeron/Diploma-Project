using ECommerceApp.Library.Extensions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers;

[ApiController]
[Route("country")]
public class CountryController : ControllerBase
{
    private readonly CountryService _service;

    public CountryController(CountryService service) {
        _service = service;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllCountriesAsync() {
        var countries = await _service.GetAllCountriesAsync();

        return Ok(countries.ToViewModelList());
    }
}
