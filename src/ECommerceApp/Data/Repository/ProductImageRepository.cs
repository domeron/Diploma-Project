using ECommerceApp.Data.Models;

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
    }
}
