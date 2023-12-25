using ECommerceApp.Library.Exceptions;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Data;
using ECommerceApp.Library.Extensions;

namespace ECommerceApp.API.Repository;

public interface IProductRepository
{
    public Task<Product?> GetProductById(int id);
    public Task<Product?> GetProductByIdAndSellerId(int id, int sellerId);
    public Task<Product?> GetProductByNameAndSellerId(string productName, int sellerId);

    public Task<IList<Product>> GetProducts(GetProductsRequestDTO request);

    public Task<IList<Product>> GetRandomProducts(int quantity);
    public Task<IList<Product>> GetRandomProductsInCategory(int categoryId, int quantity);
    
    public Task<Product> CreateProduct(ProductCreateDTO productModel);
    public Task<Product> UpdateProduct(ProductUpdateDTO updateModel);
    
    public Task UpdateWithNewReview(int productId, ProductReview review);
    public Task UpdateWithReviewDeleted(int productId);

    public Task DeleteProduct(int productId);
}

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    #region GET METHODS
    public async Task<Product?> GetProductByIdAndSellerId(int id, int sellerId)
    {
        return await _context.Products.FirstOrDefaultAsync(
            p => p.ProductId == id && p.SellerId == sellerId) ??
            null;
    }

    public async Task<Product?> GetProductById(int id)
    {
        return await _context.Products
            .Where(p => p.ProductId == id)
            .Include(p => p.ProductImages)
            .FirstOrDefaultAsync() ?? null;
    }

    public async Task<Product?> GetProductByNameAndSellerId(string productName, int sellerId)
    {
        return await _context.Products.FirstOrDefaultAsync(
            p => p.ProductName.Equals(productName) &&
            p.SellerId == sellerId) ?? null;
    }

    public async Task<IList<Product>> GetProducts(GetProductsRequestDTO request)
    {
        IQueryable<Product>? products = _context.Products;

        if (request.CategoryId != 0)
            products = products
                .Where(p => p.CategoryId == request.CategoryId
                || p.Category.ParentCategoryId == request.CategoryId
                || p.Category.ParentCategory.ParentCategoryId == request.CategoryId);
        if (request.StartPattern != null)
            products = products.Where(p => p.ProductName.StartsWith(request.StartPattern));
        if (request.SellerId != 0)
            products = products.Where(p => p.SellerId == request.SellerId);

        switch (request.SortOption)
        {
            case ProductListSortOptions.Rating: products = products.OrderByDescending(p => p.Rating); break;
            case ProductListSortOptions.PriceHigh: products = products.OrderByDescending(p => p.PriceUSD); break;
            case ProductListSortOptions.PriceLow: products = products.OrderBy(p => p.PriceUSD); break;
            case ProductListSortOptions.DateNew: products = products.OrderByDescending(p => p.CreatedOn); break;
            case ProductListSortOptions.DateOld: products = products.OrderBy(p => p.CreatedOn); break;
            case ProductListSortOptions.Random: products = products.OrderBy(p => Guid.NewGuid()); break;
        }

        return await products.Skip(request.PageIndex * request.PageSize)
            .Take(request.PageSize).ToListAsync();
    }

    public async Task<IList<Product>> GetRandomProductsInCategory(int categoryId, int quantity)
    {
        return await _context.Products
            .Where(p => p.CategoryId == categoryId)
            .OrderBy(r => Guid.NewGuid()) //random rows
            .Take(quantity)
            .ToListAsync();
    }

    public async Task<IList<Product>> GetRandomProducts(int quantity)
    {
        return await _context.Products
            .OrderBy(r => Guid.NewGuid()) //random rows
            .Take(quantity)
            .ToListAsync();
    }

    #endregion
    public async Task<Product> CreateProduct(ProductCreateDTO productModel)
    {
        Product product = new()
        {
            ProductName = productModel.ProductName,
            ProductDescription = productModel.ProductDescription,
            SellerId = productModel.SellerId,
            PriceUSD = productModel.PriceUSD,
            Quantity = productModel.Quantity,
            Rating = 0.0,
            ReviewsCount = 0,
            CategoryId = productModel.CategoryId,
            CreatedOn = DateTime.Now,
            LastUpdatedOn = DateTime.Now,
        };

        await _context.Products.AddAsync(product);
        _context.Entry(product).State = EntityState.Added;
        await _context.SaveChangesAsync();
        return product;
    }

    #region UPDATE METHODS
    public async Task<Product> UpdateProduct(ProductUpdateDTO model)
    {
        var product = await GetProductById(model.ProductId) ?? throw new ProductNotFoundException();

        if (!string.IsNullOrEmpty(model.ProductName))
            product.ProductName = model.ProductName;

        if (!string.IsNullOrEmpty(model.ProductDescription))
            product.ProductDescription = model.ProductDescription;

        if (!string.IsNullOrEmpty(model.FrontImagePath))
            product.FrontImagePath = model.FrontImagePath!;

        if (model.PriceUSD.HasValue)
            product.PriceUSD = model.PriceUSD.Value;

        if (model.Quantity.HasValue)
            product.Quantity = model.Quantity.Value;

        if (model.CategoryId.HasValue)
            product.CategoryId = model.CategoryId.Value;

        product.LastUpdatedOn = DateTime.Now;

        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return product;
    }
    public async Task UpdateWithNewReview(int productId, ProductReview review)
    {
        var product = await GetProductById(productId) ?? throw new ProductNotFoundException();

        product.ReviewsCount++;
        product.Rating = Math.Round(
            await _context.ProductReviews.Where(r => r.ProductId == product.ProductId).Select(r => r.Rating).AverageAsync(), 2);

        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateWithReviewDeleted(int productId)
    {
        var product = await GetProductById(productId) ?? throw new ProductNotFoundException();

        product.ReviewsCount--;
        if (product.ReviewsCount > 0)
            product.Rating = Math.Round(
                await _context.ProductReviews.Where(r => r.ProductId == product.ProductId).Select(r => r.Rating).AverageAsync(), 2);
        else product.Rating = 0;

        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    #endregion

    #region DELETE METHODS
    public async Task DeleteProduct(int productId)
    {
        var product = await GetProductById(productId) ?? throw new ProductNotFoundException();
        _context.Products.Remove(product);
        _context.Entry(product).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }

    #endregion
}
