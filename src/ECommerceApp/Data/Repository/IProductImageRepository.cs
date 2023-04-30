
using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductImageRepository
    {

        public Task<ProductImage> GetProductImageByIdAsync(int id);

        public IAsyncEnumerable<ProductImage> GetProductImagesByProductIdAsync(int productId);
        public Task CreateProductImageAsync(int productId, string imagePath);

        public Task DeleteProductImageAsync(ProductImage productImage);
    }
}
