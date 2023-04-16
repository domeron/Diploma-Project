using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Category")]
    public class ProductCategoryController : Controller
    {
        private readonly ProductCategoryService _service;

        public ProductCategoryController(ProductCategoryService productCategoryService)
        {
            _service= productCategoryService;
        }

        [HttpGet]
        [Route("Top")]
        public async IAsyncEnumerable<ProductCategoryViewModel> GetTopCategoriesWithChildren() {
            var categories = _service.GetTopCategories();

            await foreach (var category in categories)
            {
                yield return new ProductCategoryViewModel(category);
            }
        }

        [HttpGet]
        [Route("{categoryId}")]
        public async Task<IActionResult> GetCategoryByIdAsync(int categoryId) {
            (ProductCategory? category, Exception? e) = await _service.GetCategoryByIdAsync(categoryId);

            if (category != null && e == null)
                return Ok(new ProductCategoryViewModel(category));
            else if (e is ProductCategoryNotFound) return BadRequest("Category not found");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
