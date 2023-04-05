using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductReviewRepository
    {
        public Task<ProductReview> GetProductReviewByUserIdAndProductIdAsync(int userId, int productId);
        public IQueryable<ProductReview> GetReviewsByProductIdAsync(int productId);
        public Task<ProductReview> CreateProductReview(ProductReviewCreateModel model);
    }
}
