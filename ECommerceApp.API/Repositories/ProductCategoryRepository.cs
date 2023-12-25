using ECommerceApp.Data;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace ECommerceApp.API.Repository;

public interface IProductCategoryRepository
{
    public Task<List<ProductCategory>> GetAllCategories();
    public Task<List<ProductCategory>> GetTopCategoriesWithChildren();
    public Task<ProductCategory?> GetCategoryByIdAsync(int id);
    public Task<ProductCategory?> GetCategoryByIdWithChildren(int id);
    public Task<ProductCategory?> GetCategoryByNameAsync(string name);

    public Task<ProductCategory?> CreateCategory(ProductCategoryCreateDTO model);
    public Task<ProductCategory?> RenameCategory(int categoryId, string name);

    public Task DeleteCategory(int categoryId);
    public Task<bool> HasChildWithName(int categoryId, string name);
}

public class ProductCategoryRepository : IProductCategoryRepository
{
    private readonly ApplicationDbContext _context;
    public ProductCategoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductCategory>> GetAllCategories()
    {
        return await _context.ProductCategories
            .OrderBy(c => c.CategoryName)
            .ToListAsync();
    }
    
    public async Task<List<ProductCategory>> GetTopCategoriesWithChildren()
    {
        return await _context.ProductCategories
            .Where(c => c.ParentCategoryId == null)
            .Include(c => c.ChildCategories)
            .ThenInclude(c => c.ChildCategories)
            .OrderBy(p => p.CategoryName)
            .ToListAsync();
    }

    public async Task<ProductCategory?> GetCategoryByIdAsync(int id)
    {
        return await _context.ProductCategories
            .Where(c => c.Id == id)
            .FirstAsync();
    }

    public async Task<ProductCategory?> GetCategoryByIdWithChildren(int id)
    {
        return await _context.ProductCategories
            .Where(c => c.Id == id)
            .Include (c => c.ParentCategory).ThenInclude(p => p.ParentCategory)
            .Include (c => c.ChildCategories).ThenInclude(c => c.ChildCategories)
            .FirstAsync();
    }

    public async Task<ProductCategory?> GetCategoryByNameAsync(string name)
    {
        return await _context.ProductCategories
            .Where(c => c.CategoryName.Equals(name))
            .FirstOrDefaultAsync()
            ?? null;
    }

    public async Task<ProductCategory?> CreateCategory(ProductCategoryCreateDTO model)
    {

        var category = new ProductCategory
        {
            CategoryName = model.CategoryName,
            ParentCategoryId = model.ParentCategoryId == 0 ? null : model.ParentCategoryId,
        };

        await _context.ProductCategories.AddAsync(category);
        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<ProductCategory?> RenameCategory(int categoryId, string name)
    {
        var category = await GetCategoryByIdAsync(categoryId) ?? throw new ProductCategoryNotFound();

        if (!string.IsNullOrEmpty(name)) 
            category.CategoryName = name;

        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return category;
    }

    public async Task<bool> HasChildWithName(int categoryId, string name)
    {
        return await _context.ProductCategories.Where(c => c.ParentCategoryId == categoryId && c.CategoryName.Equals(name)).AnyAsync();
    }

    public async Task DeleteCategory(int categoryId)
    {
        var category = await GetCategoryByIdAsync(categoryId) ?? throw new ProductCategoryNotFound();

        _context.Remove(category);

        await _context.SaveChangesAsync();
    }
}
