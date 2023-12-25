using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.API.Repository;

public interface IProductImageRepository
{
    public Task<ProductImage?> GetProductImage(int id);
    public Task<IList<ProductImage>> GetProductImages(int productId);
    public Task CreateProductImage(int productId, string imagePath);
    public Task DeleteProductImage(ProductImage productImage);
}


public class ProductImageRepository : IProductImageRepository
{
    private readonly ApplicationDbContext _context;

    public ProductImageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductImage?> GetProductImage(int productImageId)
    {
        return await _context.ProductImages
            .Where(pi => pi.Id == productImageId)
            .FirstOrDefaultAsync() ?? null;
    }

    public async Task<IList<ProductImage>> GetProductImages(int productId)
    {
        return await _context.ProductImages
            .Where(pi => pi.ProductId == productId)
            .ToListAsync();
    }

    public async Task CreateProductImage(int productId, string imagePath)
    {
        var productImage = new ProductImage
        {
            ImagePath = imagePath,
            ProductId = productId
        };
        await _context.ProductImages.AddAsync(productImage);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProductImage(ProductImage productImage)
    {
        _context.ProductImages.Remove(productImage);
        _context.Entry(productImage).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }
}
