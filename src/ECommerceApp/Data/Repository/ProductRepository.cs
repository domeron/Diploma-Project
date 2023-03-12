using ECommerceApp.Data.Models;
using ECommerceApp.Models;
using ECommerceApp.Exceptions;
using Microsoft.EntityFrameworkCore;
using Duende.IdentityServer.Extensions;

namespace ECommerceApp.Data.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context) { 
            _context = context;
        }
        public async Task<bool> CreateProductAsync(ProductCreateModel productModel)
        {
            try
            {
                if (await GetProductByNameAndSellerIdAsync(productModel.ProductName, productModel.SellerId) != null)
                    throw new ProductWithNameAndSellerExists();
                return false;
            }
            catch (ProductNotFoundException) { }
            Product product = new Product { 
                ProductName = productModel.ProductName,
                ProductDescription= productModel.ProductDescription,
                SellerId = productModel.SellerId,
                PriceUSD= productModel.PriceUSD,
                Quantity= productModel.Quantity,
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return true;
            
        }

        public async Task<Product> GetProductByIdAndSellerIdAsync(int id, int sellerId)
        {
            if (id < 0 || sellerId < 0)
                throw new ArgumentException();
            return await _context.Products.FirstOrDefaultAsync(
                p => p.ProductId == id && p.SellerId == sellerId) ??
                throw new ProductNotFoundException();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            if (id < 0)
                throw new ArgumentException("Product id is less than zero");
            return await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id) ??
                throw new ProductNotFoundException();
        }

        public async Task<Product> GetProductByNameAndSellerIdAsync(string productName, int sellerId)
        {
            if (productName.IsNullOrEmpty() || sellerId < 0)
                throw new ArgumentException();
            return await _context.Products.FirstOrDefaultAsync(
                p => p.ProductName.Equals(productName) &&
                p.SellerId == sellerId) ??
                throw new ProductNotFoundException();
        }

        public async IAsyncEnumerable<Product> GetProductsBySellerIdAsync(int sellerId)
        {
            var products = _context.Products.Where(p => p.SellerId == sellerId)
                .OrderBy(p => p.ProductId).AsAsyncEnumerable();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetAllProductsAsync()
        {
            var products = _context.Products
                .OrderBy(p => p.ProductId).AsAsyncEnumerable();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async Task UpdateProduct(int id, ProductCreateModel productModel)
        {
            Product product;
            try
            {
                product = await GetProductByIdAsync(id);
            } catch (ProductNotFoundException e) { throw e; }

            if (!product.ProductName.Equals(productModel.ProductName))
            {
                try {
                    if (await GetProductByNameAndSellerIdAsync(productModel.ProductName, productModel.SellerId) != null)
                        throw new ProductWithNameAndSellerExists();
                }
                catch(ProductNotFoundException) {}
            }

            product.ProductName = productModel.ProductName;
            product.ProductDescription = productModel.ProductDescription;
            product.PriceUSD = productModel.PriceUSD;
            product.Quantity = productModel.Quantity;
            product.SellerId = productModel.SellerId;
            try
            {
                _context.Attach(product);
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task DeleteProductAsync(int id)
        {
            Product product;
            try
            {
                product = await GetProductByIdAsync(id);
            }
            catch (ArgumentException e) { throw e; }
            catch (ProductNotFoundException e) { throw e; }

            try
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            } catch(Exception) { throw; }
        }
    }
}
