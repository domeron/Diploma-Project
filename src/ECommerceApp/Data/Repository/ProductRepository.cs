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
                Rating = 0.0,
                ReviewsCount = 0,
                CategoryId= productModel.CategoryId,
                CreatedOn = DateTime.Now,
                LastUpdatedOn= DateTime.Now,
            };
            
            await _context.Products.AddAsync(product);
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
            return await _context.Products
                .Where(p => p.ProductId == id) 
                .Include(p => p.ProductImages)
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .FirstOrDefaultAsync()
                ??
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
            var products = _context.Products
                .Where(p => p.SellerId == sellerId)
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .OrderBy(p => p.ProductId).AsAsyncEnumerable();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetAllProductsAsync()
        {
            var products = _context.Products
                .OrderBy(p => p.ProductId)
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .AsAsyncEnumerable();

            await foreach (var product in products)
            {
                yield return product;
            }
        }
        public async IAsyncEnumerable<Product> GetSellersProductsStartingWithPatternAsync(int sellerId, string pattern)
        {
            var products = _context.Products.Where(p => 
            p.ProductName.StartsWith(pattern) && p.SellerId == sellerId)
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .AsAsyncEnumerable();

            await foreach (var product in products)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<Product> GetProductsStartingWithPatternAsync(int? categoryId, string? sortoption, string pattern)
        {

            var products = _context.Products
                .Where(p => p.ProductName.StartsWith(pattern))
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory).AsNoTracking();

            if (categoryId != 0)
            {
                products = products.Where(p => p.CategoryId == categoryId 
                || p.Category.ParentCategoryId == categoryId
                || p.Category.ParentCategory.ParentCategoryId == categoryId);
            }
            
            switch (sortoption) {
                case "newest":
                    products = products.OrderByDescending(p => p.CreatedOn);
                    break;
                case "oldest":
                    products = products.OrderBy(p => p.CreatedOn);
                    break;
                case "highest-price":
                    products = products.OrderByDescending(p => p.PriceUSD);
                    break;
                case "lowest-price":
                    products = products.OrderBy(p => p.PriceUSD);
                    break;
                default:
                    break;
            }

            products = products
                .Include(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory);

            await foreach (var product in products.AsAsyncEnumerable()) 
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
            product.CategoryId = productModel.CategoryId;
            product.LastUpdatedOn= DateTime.Now;
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

        public async Task UpdateWithNewReviewAsync(int id, ProductReview review)
        {
            Product product;
            try
            {
                product = await GetProductByIdAsync(id);
                product.ReviewsCount++;
                product.Rating = Math.Round(
                    await _context.ProductReviews.Where(r => r.ProductId == id).Select(r => r.Rating).AverageAsync(), 2);
                _context.Attach(product);
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (ProductNotFoundException e) { throw e; }
            catch (Exception) { throw; }
        }

        public async Task SetFrontImageAsync(int id, string filePath)
        {
            try
            {
                var product = await GetProductByIdAsync(id);
                product.FrontImagePath = filePath;
                _context.Attach(product);
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (ProductNotFoundException e) { throw e; }
            catch (Exception) { throw; }
        }
    }
}
