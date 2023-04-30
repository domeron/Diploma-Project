using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductImageRepository> _log;

        public ProductImageRepository(ApplicationDbContext context, ILogger<ProductImageRepository> log)
        {
            _context = context;
            _log = log;
        }

        public async Task<ProductImage> GetProductImageByIdAsync(int productImageId) {
            return await _context.ProductImages
                .Where(pi => pi.Id == productImageId)
                .FirstOrDefaultAsync() ?? throw new ProductImageNotFoundException();
        }

        public async IAsyncEnumerable<ProductImage> GetProductImagesByProductIdAsync(int productId) {
            var productImages = _context.ProductImages
                .Where(pi => pi.ProductId == productId)
                .AsAsyncEnumerable();

            await foreach (var productImage in productImages) { 
                yield return productImage;
            }
        }

        public async Task CreateProductImageAsync(int productId, string imagePath)
        {
            var productImage = new ProductImage
            {
                ImagePath = imagePath,
                ProductId = productId
            };
            await _context.ProductImages.AddAsync(productImage);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductImageAsync(ProductImage productImage) {

            _context.ProductImages.Remove(productImage);
            _context.Entry(productImage).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}
