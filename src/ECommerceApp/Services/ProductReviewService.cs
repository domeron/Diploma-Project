using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.ViewModels;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Linq.Expressions;

namespace ECommerceApp.Services
{
    public class ProductReviewService
    {
        private readonly IProductReviewRepository repository;
        private readonly IProductRepository productRepository;
        private readonly ILogger<ProductReviewService> logger;

        public ProductReviewService(
            IProductReviewRepository repository, 
            IProductRepository productRepository,
            ILogger<ProductReviewService> logger)
        {
            this.repository = repository;
            this.productRepository = productRepository;
            this.logger = logger;
        }

        public async IAsyncEnumerable<ProductReview> GetReviewsByProductIdAsync(int productId)
        {
            var reviews = GetSortedReviews("", repository.GetReviewsByProductIdAsync(productId));

            await foreach (var product in reviews)
            {
                yield return product;
            }
        }

        public async IAsyncEnumerable<ProductReview> GetReviewsByProductIdAsync(int productId, string sortOption)
        {
            var reviews = GetSortedReviews(sortOption, repository.GetReviewsByProductIdAsync(productId));

            await foreach (var product in reviews)
            {
                yield return product;
            }
        }

        public async Task<(ProductReview?, Exception?)> CreateProductReviewAsync(ProductReviewCreateModel model) {
            try
            {
                ProductReview review = await repository.CreateProductReview(model);
                var product = await productRepository.GetProductByIdAsync(review.ProductId);

                await productRepository.UpdateWithNewReviewAsync(product, review);
                return (review, null);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (ReviewByUserForProductExists e) { return (null, e); }
            catch (ProductNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        private async IAsyncEnumerable<ProductReview> GetSortedReviews(string sortOption, IQueryable<ProductReview> reviews)
        {
            IAsyncEnumerable<ProductReview> sortedReviews = reviews.AsAsyncEnumerable();
            switch (sortOption)
            {
                case "":
                    break;
                case "oldest":
                    sortedReviews = reviews.OrderBy(r => r.CreatedOn).AsAsyncEnumerable();
                    break;
                case "newest":
                    sortedReviews = reviews.OrderByDescending(r => r.CreatedOn).AsAsyncEnumerable();
                    break;
                case "highest-rating":
                    logger.LogInformation("highest-rating option in GetSortedReviews method");
                    sortedReviews = reviews.OrderByDescending(r => r.Rating).AsAsyncEnumerable();
                    break;
            }
            await foreach (var review in sortedReviews)
            {
                yield return review;
            }
        }
    }
}
