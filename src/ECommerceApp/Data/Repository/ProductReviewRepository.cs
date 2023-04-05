using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class ProductReviewRepository : IProductReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductReview> CreateProductReview(ProductReviewCreateModel model)
        {
            try
            {
                var review = await GetProductReviewByUserIdAndProductIdAsync(model.UserId, model.ProductId);

                throw new ReviewByUserForProductExists();
            }
            catch (ProductReviewNotFoundException) {
                var productReview = new ProductReview {
                    ProductId = model.ProductId,
                    UserId = model.UserId,
                    Title = model.Title,
                    Content = model.Content,
                    Rating = model.Rating,
                    CreatedOn = DateTime.Now
                };
                _context.ProductReviews.Add(productReview);
                await _context.SaveChangesAsync();
                return await GetProductReviewByUserIdAndProductIdAsync(productReview.UserId, productReview.ProductId);
            }
        }

        public async Task<ProductReview> GetProductReviewByUserIdAndProductIdAsync(int userId, int productId)
        {
            return await _context.ProductReviews
                .Where(r => r.UserId == userId && r.ProductId == productId)
                .Include(r => r.User)
                .Include(r => r.Product)
                .ThenInclude(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .FirstOrDefaultAsync()
                ?? throw new ProductReviewNotFoundException();
        }

        public IQueryable<ProductReview> GetReviewsByProductIdAsync(int productId)
        {
            var reviews = _context.ProductReviews
                .Where(r => r.ProductId == productId)
                .Include(r => r.User)
                .Include(r => r.Product)
                .ThenInclude(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory);

            return reviews;
        }
    }
}
