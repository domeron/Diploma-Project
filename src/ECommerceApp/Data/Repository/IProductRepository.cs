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
        public IAsyncEnumerable<Product> GetSellersProductsStartingWithPatternAsync(int sellerId, string pattern);
        public IAsyncEnumerable<Product> GetProductsStartingWithPatternAsync(int? categoryId, string? sortOption, string pattern);
        public Task UpdateProduct(int id, ProductCreateModel productModel);
        public Task UpdateWithNewReviewAsync(int id, ProductReview reivew);
        public Task SetFrontImageAsync(int id, string filePath);
        public Task DeleteProductAsync(int id);
    }
}
