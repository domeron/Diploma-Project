using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("ProductCategory")]
    public class ProductCategoryController : Controller
    {
        private readonly ProductCategoryService _service;

        public ProductCategoryController(ProductCategoryService productCategoryService)
        {
            _service= productCategoryService;
        }

        [HttpGet]
        [Route("Top")]
        public async IAsyncEnumerable<ProductCategoryWithChildrenViewModel> GetTopCategoriesWithChildren() {
            var categories = _service.GetTopCategories();

            await foreach (var category in categories)
            {
                yield return new ProductCategoryWithChildrenViewModel(category);
            }
        }

        [HttpGet]
        [Route("{categoryId}")]
        public async Task<IActionResult> GetCategoryByIdAsync(int categoryId) {
            (ProductCategory? category, Exception? e) = await _service.GetCategoryByIdAsync(categoryId);

            if (category != null && e == null)
                return Ok(new ProductCategoryWithParentsViewModel(category));
            else if (e is ProductCategoryNotFound) return BadRequest("Category not found");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
