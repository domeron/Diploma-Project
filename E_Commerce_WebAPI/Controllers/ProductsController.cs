using E_Commerce_WebAPI.Data;
using E_Commerce_WebAPI.Data.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_WebAPI.Controllers
{
    [Route("Product")]
    [ApiController]
    public class ProductsController : Controller
    {
        private IRepositoryWrapper _repository;

        public ProductsController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _repository.Product.GetAllProductsAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProductById(int id)
        {
            try
            {
                var product = await _repository.Product.GetProductByIdAsync(id);
                if (product == null)
                {
                    return NotFound();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("ProductObject is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.Product.CreateProduct(product);
                await _repository.SaveAsync();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductById(int id)
        {
            try
            {
                var product = await _repository.Product.GetProductByIdAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                _repository.Product.DeleteProduct(product);
                await _repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
