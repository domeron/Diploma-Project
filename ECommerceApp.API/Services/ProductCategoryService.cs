using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.Services;

public interface IProductCategoryService
{
    Task<(ProductCategory?, Exception?)> GetCategoryByIdAsync(int id);
    Task<(ProductCategory?, Exception?)> GetCategoryByIdWithChildrenAsync(int id);
    Task<List<ProductCategory>> GetAllCategories();
    Task<List<ProductCategory>> GetTopCategoriesWithChildren();
    Task<(ProductCategory?, Exception?)> CreateCategory(ProductCategoryCreateDTO model);
    Task<(ProductCategory?, Exception?)> RenameCategory(int categoryId, string name);
    Task<(bool, Exception?)> DeleteCategory(int categoryId);
}

public class ProductCategoryService : IProductCategoryService
{
    private readonly IProductCategoryRepository _repository;

    public ProductCategoryService(IProductCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<(ProductCategory?, Exception?)> GetCategoryByIdAsync(int id) {
        try
        {
            var category = await _repository.GetCategoryByIdAsync(id);
            return (category, null);
        }
        catch (ProductCategoryNotFound e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }

    public async Task<(ProductCategory?, Exception?)> GetCategoryByIdWithChildrenAsync(int id)
    {
        try
        {
            var category = await _repository.GetCategoryByIdWithChildren(id);
            return (category, null);
        }
        catch (ProductCategoryNotFound e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }

    public async Task<List<ProductCategory>> GetAllCategories()
    { 
        return await _repository.GetAllCategories();
    }

    public async Task<List<ProductCategory>> GetTopCategoriesWithChildren()
    {
        return await _repository.GetTopCategoriesWithChildren();
    }

    public async Task<(ProductCategory?, Exception?)> CreateCategory(ProductCategoryCreateDTO model)
    {
        try
        {
            var category = await _repository.CreateCategory(model);
            return (category, null);
        }
        catch(Exception e) { return (null, e); }
    }

    public async Task<(ProductCategory?, Exception?)> RenameCategory(int categoryId, string name)
    {
        try
        {
            var category = await _repository.RenameCategory(categoryId, name);
            return (category, null);
        }
        catch (Exception e) { return (null, e); }
    }

    public async Task<(bool, Exception?)> DeleteCategory(int categoryId) {
        try {
            await _repository.DeleteCategory(categoryId);

            return (true, null);
        }catch(Exception ex) { return (false, ex); }
    }
}
