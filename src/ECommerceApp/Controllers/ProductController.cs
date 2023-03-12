using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Product")]
    public class ProductController : Controller
    {
        private readonly ProductService _service;
        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProductAsync(ProductCreateModel productModel)
        {
            if (ModelState.IsValid && productModel != null)
            {
                (Product? product, Exception? exception) = await _service.CreateProductAsync(productModel);

                if (product != null && exception == null)
                {
                    return StatusCode((int)HttpStatusCode.Created, product);
                }

                if (exception is ProductWithNameAndSellerExists)
                    return BadRequest("Product with provided name by this seller already exists.");
                else if (exception is CouldNotAddEntityToDatabase)
                    return StatusCode(500, "Could not add seller to database");
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpGet("Seller/{sellerId}")]
        public async IAsyncEnumerable<Product> GetProductsBySellerIdAsync(int sellerId) {
            var products = _service.GetProductsBySellerIdAsync(sellerId);

            await foreach (var product in products) { 
                yield return product;
            }
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<Product> GetProductsAsync()
        {
            var products = _service.GetAllProductsAsync();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductCreateModel model)
        {
            if (ModelState.IsValid && model != null)
            {
                (Product? product, Exception? exception) = await _service.UpdateProduct(id, model);

                if (product != null && exception == null)
                    return Ok(product);

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
