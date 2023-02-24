using ECommerceApp.Data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [Route("Category")]
    [ApiController]
    public class ProductCategoriesController : Controller
    {
        private IRepositoryWrapper _repository;
        public ProductCategoriesController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _repository.ProductCategory.GetAllCategoriesAsync();
                //_logger.LogInformation();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _repository.ProductCategory.GetCategoryByIdAsync(id);
                if (category == null)
                {
                    //logger
                    return NotFound();
                }
                else
                {
                    return Ok(category);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            try
            {
                if (category == null)
                {
                    return BadRequest("CategoryObject is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.ProductCategory.CreateCategory(category);
                await _repository.SaveAsync();

                return Ok(category);
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryById(int id)
        {
            try
            {
                var category = await _repository.ProductCategory.GetCategoryByIdAsync(id);
                if (category == null)
                {
                    return NotFound();
                }

                _repository.Category.DeleteCategory(category);
                await _repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
