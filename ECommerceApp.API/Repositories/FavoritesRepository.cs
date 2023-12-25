using ECommerceApp.Data;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.API.Repositories;

public interface IFavoritesRepository {
    Task<IList<Product>> GetFavoriteProducts(int userId);
    Task AddToFavorites(int userId, int productId);
    Task RemoveFromFavorites(int userId, int productId);
    Task<bool> IsInFavorites(int userId, int productId);
}

public class FavoritesRepository : IFavoritesRepository
{
    private readonly ApplicationDbContext _context;

    public FavoritesRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Product>> GetFavoriteProducts(int userId)
    {
        return await _context.Favorites.Where(f => f.UserId == userId)
            .Select(f => f.Product).ToListAsync();
    }

    public async Task AddToFavorites(int userId, int productId)
    {
        var favorite = new FavoriteProduct
        {
            UserId = userId,
            ProductId = productId
        };

        await _context.Favorites.AddAsync(favorite);
        await _context.SaveChangesAsync();
    }


    public async Task<bool> IsInFavorites(int userId, int productId)
    {
        return await _context.Favorites
            .Where(f => f.UserId == userId && f.ProductId == productId).AnyAsync();
    }

    public async Task RemoveFromFavorites(int userId, int productId)
    {
        var favorite = await _context.Favorites
            .Where(f => f.UserId == userId && f.ProductId == productId)
            .FirstAsync();

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
    }
}
