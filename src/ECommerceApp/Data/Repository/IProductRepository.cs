using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductRepository
    {
        public Task<Product> GetProductByIdAsync(int id);
        public Task<Product> GetProductByIdAndSellerIdAsync(int id, int sellerId);
        public Task<Product> GetProductByNameAndSellerIdAsync(string productName, int sellerId);

        public IAsyncEnumerable<Product> GetProductsBySellerIdAsync(int sellerId);
        public IAsyncEnumerable<Product> GetAllProductsAsync();
        
        public IAsyncEnumerable<Product> GetAllProductsInCategory(int categoryId);
        public IAsyncEnumerable<Product> GetRandomProductsInCategory(int categoryId, int quantity);
        public IAsyncEnumerable<Product> GetRandomProductsAsync(int quantity);

        public IAsyncEnumerable<Product> GetSellersProductsStartingWithPatternAsync(int sellerId, string pattern);
        public IAsyncEnumerable<Product> GetProductsStartingWithPatternAsync(int? categoryId, string? sortOption, string pattern);

        public Task CreateProductAsync(ProductCreateModel productModel);

        public Task UpdateProduct(Product product, ProductUpdateModel updateModel);
        public Task UpdateWithNewReviewAsync(Product product, ProductReview reivew);
        public Task DeleteProductAsync(Product product);
    }
}
