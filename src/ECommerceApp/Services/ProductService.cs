using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Utils.File;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;
        private readonly IProductCategoryRepository _categoryRepository;
        private readonly ProductImageService _productImageService;

        public ProductService(IProductRepository repository, 
            IProductCategoryRepository categoryRepository,
            ProductImageService productImageService)
        {
            _repository = repository;
            _categoryRepository = categoryRepository;
            _productImageService = productImageService;
        }

        public async Task<(Product?, Exception?)> GetProductByIdAsync(int productId) {
            try
            {
                var product = await _repository.GetProductByIdAsync(productId);
                return (product, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ProductNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(Product?, Exception?)> CreateProductAsync(ProductCreateModel productModel)
        {
            if (productModel == null)
                return (null, new ArgumentException("Product Model is null"));

            try
            {
                try
                {
                    if (await _repository.GetProductByNameAndSellerIdAsync(productModel.ProductName, productModel.SellerId) != null)
                        throw new ProductWithNameAndSellerExists();
                }
                catch (ProductNotFoundException) { }

                await _repository.CreateProductAsync(productModel);
                var product = await _repository.GetProductByNameAndSellerIdAsync(productModel.ProductName, productModel.SellerId);
                await _productImageService.CreateProductImages(product, productModel.ImageFiles);
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

        public async IAsyncEnumerable<Product> GetSellersProductsStartingWithPatternAsync(int sellerId, string? pattern) {
            var products = pattern.IsNullOrEmpty() ? _repository.GetProductsBySellerIdAsync(sellerId) :
                _repository.GetSellersProductsStartingWithPatternAsync(sellerId, pattern);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GettAllProductsInCategory(int categoryId) {
            var products = _repository.GetAllProductsInCategory(categoryId);

            await foreach (var product in products) {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetRandomProductsInCategory(int categoryId, int quantity)
        {
            var products = _repository.GetRandomProductsInCategory(categoryId, quantity);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetRandomProductsAsync(int quantity)
        {
            var products = _repository.GetRandomProductsAsync(quantity);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetProductsStartingWithPatternAsync(int cateogoryId, string? sortOption, string pattern)
        {

            var products =  _repository.GetProductsStartingWithPatternAsync(cateogoryId, sortOption, pattern);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async Task<(bool, Exception?)> UpdateProduct(int id, ProductUpdateModel model)
        {
            if (model == null)
                return (false, new ArgumentException("Model is null"));
            try
            {
                var product = await _repository.GetProductByIdAsync(id);

                try
                {
                    if (!model.ProductName.IsNullOrEmpty() &&
                        !product.ProductName.Equals(model.ProductName)) {
                        _ = await _repository.GetProductByNameAndSellerIdAsync(model.ProductName!, product.SellerId);
                        throw new ProductWithNameAndSellerExists(); 
                    }
                }
                catch (ProductNotFoundException) { }

                if (!model.DeletedImagesIds.IsNullOrEmpty()) {
                    await _productImageService.DeleteProductImagesAsync(model.DeletedImagesIds!);
                }
                if (!model.NewImageFiles.IsNullOrEmpty()) {
                    await _productImageService.AddProductImages(product, model.NewImageFiles!);
                }
                await _repository.UpdateProduct(product, model);

                return (true, null);
            }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (ProductWithNameAndSellerExists e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }


        public async Task<(bool, Exception?)> DeleteProduct(int id)
        {
            try
            {
                var product = await _repository.GetProductByIdAsync(id);
                await _repository.DeleteProductAsync(product);
                return (true, null);
            }
            catch (ArgumentException e) { return (false, e); }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }
    }
}
