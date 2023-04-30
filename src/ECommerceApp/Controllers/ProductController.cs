using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Net;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Product")]
    public class ProductController : Controller
    {
        private readonly ProductService _service;
        private readonly ILogger<ProductController> _log;
        public ProductController(
            ProductService service,
            ILogger<ProductController> log)
        {
            _service = service;
            _log = log;
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductById(int productId) {
            (Product? product, Exception? e) = await _service.GetProductByIdAsync(productId);

            if (product != null && e == null) {
                return Ok(new ProductViewModel(product));
            }

            if (e is ProductNotFoundException) { return NotFound(); }
            else return StatusCode(500, e.StackTrace);
        }
        
        [HttpGet("All")]
        public async IAsyncEnumerable<ProductViewModel> GetProductsAsync()
        {
            var products = _service.GetAllProductsAsync();

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Seller/{sellerId}")]
        public async IAsyncEnumerable<ProductViewModel> GetProductsBySellerIdAsync(int sellerId) {
            var products = _service.GetProductsBySellerIdAsync(sellerId);

            await foreach (var product in products) { 
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Category/{categoryId}")]
        public async IAsyncEnumerable<ProductViewModel> GetAllProductsInCategory(int categoryId) {
            var products = _service.GettAllProductsInCategory(categoryId);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Category/{categoryId}/Random/{quantity}")]
        public async IAsyncEnumerable<ProductViewModel> GetRandomProductsInCategory(int categoryId, int quantity)
        {
            var products = _service.GetRandomProductsInCategory(categoryId, quantity);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Random/{quantity}")]
        public async IAsyncEnumerable<ProductViewModel> GetRandomProducts(int quantity)
        {
            var products = _service.GetRandomProductsAsync(quantity);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Seller/Search/{sellerId}/{pattern}")]
        public async IAsyncEnumerable<ProductViewModel> GetSellersProductsStartingWithPatternAsync(int sellerId, string? pattern)
        {
            var products = _service.GetSellersProductsStartingWithPatternAsync(sellerId, pattern);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Search/{categoryId}/{sortOption}/{pattern}")]
        public async IAsyncEnumerable<ProductViewModel> GetProductsStartingWithPattern(int categoryId, string sortOption, string pattern)
        {
            var products = _service.GetProductsStartingWithPatternAsync(categoryId, sortOption, pattern);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }

        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProductAsync([FromForm] ProductCreateModel productModel)
        {
            (Product? product, Exception? exception) = await _service.CreateProductAsync(productModel);

            if (product != null && exception == null) {
                return StatusCode((int)HttpStatusCode.Created);
            }

            if (exception is ProductWithNameAndSellerExists)
                return BadRequest("Product with provided name by this seller already exists.");
            else if (exception is CouldNotAddEntityToDatabase)
                return StatusCode(500, "Could not add seller to database");
            else
                return StatusCode(500, exception.Message);

        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductUpdateModel model)
        {
            if (ModelState.IsValid && model != null)
            {
                (bool updated, Exception? exception) = await _service.UpdateProduct(id, model);

                if (updated && exception == null)
                    return Ok();

                if (exception is ProductWithNameAndSellerExists)
                    return BadRequest("Product with provided name by this seller already exists.");
                else if (exception is ProductNotFoundException)
                    return NotFound("Product not found");
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeletProduct(int id)
        {
            if (id < 0) return BadRequest("id is less than zero");

            (bool deleted, Exception? exception) = await _service.DeleteProduct(id);

            if (deleted && exception == null) {
                return Ok();
            }

            if (exception is ArgumentException) return BadRequest("id is wrong");
            if (exception is ProductNotFoundException) return NotFound();

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }
    }
}
