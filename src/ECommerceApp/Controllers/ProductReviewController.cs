using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("ProductReview")]
    public class ProductReviewController : Controller
    {
        private readonly ProductReviewService _service;

        public ProductReviewController(ProductReviewService service)
        {
            _service = service;
        }

        [HttpGet("{productId}")]
        public async IAsyncEnumerable<ProductReviewViewModel> GetReviewsByProductIdAsync(int productId)
        {
            var reviews = _service.GetReviewsByProductIdAsync(productId);

            await foreach (var review in reviews)
            {
                yield return new ProductReviewViewModel(review);
            }
        }

        [HttpGet("{productId}/{sortOption}")]
        public async IAsyncEnumerable<ProductReviewViewModel> GetReviewsByProductIdAsync(int productId, string sortOption)
        {
            var reviews = _service.GetReviewsByProductIdAsync(productId, sortOption);

            await foreach (var review in reviews)
            {
                yield return new ProductReviewViewModel(review);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProductReviewAsync(ProductReviewCreateModel model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            (ProductReview? review, Exception? e) = await _service.CreateProductReviewAsync(model);

            if (review != null && e == null) 
                return Ok(new ProductReviewViewModel(review));

            else if (e is ReviewByUserForProductExists) return BadRequest("Review By User For Product Exists");
            else return StatusCode(500, e.StackTrace);
        }
    }
}
