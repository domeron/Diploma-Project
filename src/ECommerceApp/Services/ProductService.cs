using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;

namespace ECommerceApp.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<(Product?, Exception?)> CreateProductAsync(ProductCreateModel productModel)
        {
            if (productModel == null)
                return (null, new ArgumentException("Product Model is null"));

            try
            {
                await _repository.CreateProductAsync(productModel);
                var product = await _repository.GetProductByNameAndSellerIdAsync(productModel.ProductName, productModel.SellerId);
                return (product, null);
            }
            catch (ProductWithNameAndSellerExists e) { return (null, e); }
            catch (CouldNotAddEntityToDatabase e) { return (null, e); }
            catch (Exception exception) { return (null, exception); }
        }

        public async IAsyncEnumerable<Product> GetProductsBySellerIdAsync(int sellerId) {
            var products = _repository.GetProductsBySellerIdAsync(sellerId);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetAllProductsAsync()
        {
            var products = _repository.GetAllProductsAsync();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async Task<(Product?, Exception?)> UpdateProduct(int id, ProductCreateModel model)
        {
            if (model == null)
                return (null, new ArgumentException("Model is null"));
            try
            {
                await _repository.UpdateProduct(id, model);
                var seller = await _repository.GetProductByIdAsync(id);
                return (seller, null);
            }
            catch (ProductNotFoundException e) { return (null, e); }
            catch (ProductWithNameAndSellerExists e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(bool, Exception?)> DeleteProduct(int id)
        {
            try
            {
                await _repository.DeleteProductAsync(id);
                return (true, null);
            }
            catch (ArgumentException e) { return (false, e); }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

    }
}
