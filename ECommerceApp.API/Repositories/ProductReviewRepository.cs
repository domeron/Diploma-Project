using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Library.Extensions;

namespace ECommerceApp.API.Repository;

public interface IProductReviewRepository
{
    public Task<ProductReview?> GetProductReviewById(int reviewId);
    public Task<IList<ProductReview>> GetProductReviews(GetReviewsRequestDTO request);
    public Task<ProductReview> CreateProductReview(ProductReviewCreateDTO model);
    public Task DeleteProductReview(int reviewId);
}

public class ProductReviewRepository : IProductReviewRepository
{
    private readonly ApplicationDbContext _context;

    public ProductReviewRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ProductReview?> GetProductReviewById(int reviewId)
    {
        return await _context.ProductReviews
            .FirstOrDefaultAsync(r => r.Id == reviewId)
            ?? null;
    }

    public async Task<IList<ProductReview>> GetProductReviews(GetReviewsRequestDTO request)
    {
        IQueryable<ProductReview>? reviews = _context.ProductReviews
            .Where(r => r.ProductId == request.ProductId);

        switch (request.SortOption)
        {
            case ProductReviewSortOptions.RatingHigh: reviews = reviews.OrderByDescending(r => r.Rating); break;
            case ProductReviewSortOptions.RatingLow: reviews = reviews.OrderBy(r => r.Rating); break;
            case ProductReviewSortOptions.DateNew: reviews = reviews.OrderByDescending(r => r.CreatedOn); break;
            case ProductReviewSortOptions.DateOld: reviews = reviews.OrderBy(r => r.CreatedOn); break;
        }

        return await reviews
            .Include(r => r.User)
            .Skip(request.PageIndex * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();
    }

    public async Task<ProductReview> CreateProductReview(ProductReviewCreateDTO model)
    {
        var productReview = new ProductReview
        {
            ProductId = model.ProductId,
            UserId = model.UserId,
            Title = model.Title,
            Content = model.Content,
            Rating = model.Rating,
            CreatedOn = DateTime.Now
        };

        await _context.ProductReviews.AddAsync(productReview);
        await _context.SaveChangesAsync();

        _context.ProductReviews.Attach(productReview);
        _context.Entry(productReview).Reference(r => r.User).Load();
        _context.Entry(productReview).Reference(r => r.Product).Load(); 
        return productReview;
    }

    public async Task DeleteProductReview(int reviewId)
    { 
        var review = _context.ProductReviews.FirstOrDefault(r => r.Id == reviewId)
            ?? throw new ProductReviewNotFoundException();

        _context.Remove(review);
        await _context.SaveChangesAsync();
    }

}
