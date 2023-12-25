using ECommerceApp.Library.Extensions;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers;

[ApiController]
[Route("product")]
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IProductReviewService _reviewService;

    private readonly ILogger<ProductController> _log;
    public ProductController(
        IProductService service,
        IProductReviewService reviewService,
        ILogger<ProductController> log)
    {
        _productService = service;
        _reviewService = reviewService;
        _log = log;
    }

    #region GET METHODS

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetProductById(int productId) {
        (Product? product, Exception? e) = await _productService.GetProductById(productId);

        if (product != null && e == null) {
            return Ok(product.ToViewModel());
        }

        if (e is ProductNotFoundException) { return NotFound(); }
        else return StatusCode(500, e.StackTrace);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetProductsAsync([FromQuery] GetProductsRequestDTO request)
    {
        (IList<Product>? products, Exception? ex) = await _productService.GetProducts(request);

        if (products != null && ex == null)
            return Ok(products.ToViewModelList());

        return StatusCode(500, ex.StackTrace);
    }

    #endregion


    [HttpPost("create")]
    public async Task<IActionResult> CreateProductAsync([FromForm] ProductCreateDTO model)
    {
        (Product? product, Exception? ex) = await _productService.CreateProduct(model);

        if (product != null && ex == null) {
            return Ok(product.ToViewModel());
        }

        return StatusCode(500, ex.Message);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateProduct([FromForm] ProductUpdateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        (Product? product, Exception? ex) = await _productService.UpdateProduct(model);

        if (product != null && ex == null)
            return Ok(product.ToViewModel());

        else if (ex is ProductNotFoundException)
            return NotFound("Product not found");
        else
            return StatusCode(500, ex.Message);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeletProduct(int id)
    {
        (bool deleted, Exception? exception) = await _productService.DeleteProduct(id);

        if (deleted && exception == null) 
            return Ok();
        
        if (exception is ArgumentException) return BadRequest("id is wrong");
        if (exception is ProductNotFoundException) return NotFound();

        return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
    }

    #region REVIEWS

    [HttpGet("reviews")]
    public async Task<IActionResult> GetProductReviews([FromQuery] GetReviewsRequestDTO request)
    {
        (IList<ProductReview>? reviews, Exception? ex) = await _reviewService.GetProductReviews(request);

        if (reviews != null && ex == null)
            return Ok(reviews.ToViewModelList());

        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpPost("add-review")]
    public async Task<IActionResult> CreateProductReviewAsync(ProductReviewCreateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (ProductReview? review, Exception? ex) = await _reviewService.CreateProductReviewAsync(model);

        if (review != null && ex == null)
            return Ok(review.ToViewModel());

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpDelete]
    [Route("delete-review")]
    public async Task<IActionResult> DeleteProductReview(int reviewId)
    {

        (bool deleted, Exception? ex) = await _reviewService.DeleteProductReview(reviewId);

        if (deleted && ex == null)
            return Ok(deleted);

        if (ex is ProductReviewNotFoundException) return BadRequest("Review Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    #endregion
}
