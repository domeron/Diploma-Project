using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Services;

public interface IProductReviewService
{
    Task<(IList<ProductReview>?, Exception?)> GetProductReviews(GetReviewsRequestDTO request);
    Task<(ProductReview?, Exception?)> CreateProductReviewAsync(ProductReviewCreateDTO model);
    Task<(bool, Exception?)> DeleteProductReview(int reviewId);
}

public class ProductReviewService : IProductReviewService
{
    private readonly IProductReviewRepository _repo;
    private readonly IProductRepository _productRepo;
    private readonly IUserRepository _userRepo;

    public ProductReviewService(
        IProductReviewRepository repo, 
        IProductRepository productRepo,
        IUserRepository userRepo)
    {
        _repo = repo;
        _productRepo = productRepo;
        _userRepo = userRepo;
    }

    public async Task<(IList<ProductReview>?, Exception?)> GetProductReviews(GetReviewsRequestDTO request)
    {
        try {
            _ = await _productRepo.GetProductById(request.ProductId) ?? throw new ProductNotFoundException();

            var reviews = await _repo.GetProductReviews(request);

            return (reviews, null);
        } catch (Exception ex) { return (null, ex); }
    }

    public async Task<(ProductReview?, Exception?)> CreateProductReviewAsync(ProductReviewCreateDTO model) {
        try
        {
            _ = await _productRepo.GetProductById(model.ProductId) ?? throw new ProductNotFoundException();
            _ = await _userRepo.GetUserByIdAsync(model.UserId) ?? throw new UserNotFoundException();

            var review = await _repo.CreateProductReview(model);
            
            await _productRepo.UpdateWithNewReview(review.ProductId, review);
            return (review, null);
        }
        catch (Exception e) { return (null, e); }
    }

    public async Task<(bool, Exception?)> DeleteProductReview(int reviewId)
    {
        try
        {
            var review = await _repo.GetProductReviewById(reviewId) ?? throw new ProductReviewNotFoundException();
            await _repo.DeleteProductReview(reviewId);

            await _productRepo.UpdateWithReviewDeleted(review.ProductId);

            return (true, null);
        }
        catch (Exception ex) { return (false, ex); }
    }

}
