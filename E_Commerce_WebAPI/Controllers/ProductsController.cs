using E_Commerce_WebAPI.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_WebAPI.Controllers
{
    [ApiController]
    public class ProductsController : Controller
    {
        [HttpGet("products")]
        public ActionResult Index()
        {
            return Ok();
        }

        [HttpGet("products/{id}")]
        public ActionResult<string> GetProduct(int id)
        {

            return NotFound();
        }

        [HttpPost("product")]
        public ActionResult CreateProduct(Product product)
        {
            if (product.Id < 0)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
