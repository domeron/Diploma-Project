using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductRepository
    {
        public Task<bool> CreateProductAsync(ProductCreateModel productModel);
        public Task<Product> GetProductByIdAsync(int id);
        public Task<Product> GetProductByIdAndSellerIdAsync(int id, int sellerId);
        public Task<Product> GetProductByNameAndSellerIdAsync(string productName, int sellerId);

        public IAsyncEnumerable<Product> GetProductsBySellerIdAsync(int sellerId);
        public IAsyncEnumerable<Product> GetAllProductsAsync();
        public Task UpdateProduct(int id, ProductCreateModel productModel);
        public Task DeleteProductAsync(int id);
    }
}
