using E_Commerce_WebAPI.Data;
using E_Commerce_WebAPI.Data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_WebAPI.Controllers
{
    [Route("Category")]
    [ApiController]
    public class CategoriesController : Controller
    {
        private IRepositoryWrapper _repository;
        public CategoriesController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _repository.Category.GetAllCategoriesAsync();
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
                var category = await _repository.Category.GetCategoryByIdAsync(id);
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

                _repository.Category.CreateCategory(category);
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
                var category = await _repository.Category.GetCategoryByIdAsync(id);
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
