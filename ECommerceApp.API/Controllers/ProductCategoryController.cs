using ECommerceApp.Library.Extensions;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers;

[ApiController]
[Route("category")]
public class ProductCategoryController : Controller
{
    private readonly IProductCategoryService _service;

    public ProductCategoryController(IProductCategoryService productCategoryService)
    {
        _service= productCategoryService;
    }

    [HttpGet]
    [Route("{categoryId}")]
    public async Task<IActionResult> GetCategoryByIdAsync(int categoryId) {
        (ProductCategory? category, Exception? e) = await _service.GetCategoryByIdAsync(categoryId);

        if (category != null && e == null)
            return Ok(category.ToViewModel());

        else if (e is ProductCategoryNotFound) return BadRequest("Category not found");
        else return StatusCode(500, e.StackTrace);
    }

    [HttpGet]
    [Route("children/{categoryId}")]
    public async Task<IActionResult> GetCategoryByIdWithChildrenAsync(int categoryId)
    {
        (ProductCategory? category, Exception? e) = await _service.GetCategoryByIdWithChildrenAsync(categoryId);

        var vm = new ProductCategoryWithChildrenVM(category);

        if (category != null && e == null)
            return Ok(vm);

        else if (e is ProductCategoryNotFound) return BadRequest("Category not found");
        else return StatusCode(500, e.StackTrace);
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetAllCategories()
    { 
        var categories = await _service.GetAllCategories();
        return Ok(categories.ToViewModelsList());
    }

    [HttpGet]
    [Route("all/children")]
    public async Task<IActionResult> GetAllCategoriesWithChildren()
    {
        var categories = await _service.GetTopCategoriesWithChildren();
        IList<ProductCategoryWithChildrenVM> categoryViewModels = new List<ProductCategoryWithChildrenVM>();
        
        foreach (var category in categories) {
            categoryViewModels.Add(new ProductCategoryWithChildrenVM(category));
        }
        return Ok(categoryViewModels);
    }

    /*[HttpGet]
    [Route("Top")]
    public async Task<IActionResult> GetTopCategoriesWithChildren()
    {
        var categories = await _service.GetTopCategoriesWithChildren();
        return Ok(categories.ToViewModels());
    }*/

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateCategory(ProductCategoryCreateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (ProductCategory? category, Exception? ex) = await _service.CreateCategory(model);

        if (category != null && ex is null) 
            return Ok(category.ToViewModel());

        return StatusCode(500, "Internal Server Error");
    }

    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> RenameCategory(int categoryId, string name)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (ProductCategory? category, Exception? ex) = await _service.RenameCategory(categoryId, name);

        if (category != null && ex is null)
            return Ok(category.ToViewModel());

        if(ex is ProductCategoryNotFound) return BadRequest("Category Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpDelete]
    [Route("delete/{categoryId}")]
    public async Task<IActionResult> DeleteCategory(int categoryId)
    {
        (bool deleted, Exception? ex) = await _service.DeleteCategory(categoryId);

        if (deleted && ex is null)
            return Ok();

        if (ex is ProductCategoryNotFound) return BadRequest("Category Not Found");
        return StatusCode(500, ex.StackTrace);
    }
}
