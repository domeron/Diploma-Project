using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.API.Repository;

public interface IUserCartRepository
{
    public Task<IList<Product>> GetProductsInUserCart(int userId);
    public Task AddProductToCart(int userId, int productId);
    public Task<bool> IsProductExistsInCart(int userId, int productId);
    public Task RemoveProductFromCart(int userId, int productId);
}

public class UserCartRepository : IUserCartRepository
{
    private readonly ApplicationDbContext _context;

    public UserCartRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IList<Product>> GetProductsInUserCart(int userId)
    {
        return await _context.UserCarts
            .Where(uc => uc.UserId == userId)
            .Include(uc => uc.Product)
            .Select(uc => uc.Product)
            .ToListAsync();
    }
    public async Task AddProductToCart(int userId, int productId)
    {
        _context.UserCarts.Add(new UserCart { UserId = userId, ProductId = productId });
        await _context.SaveChangesAsync();
    }
    public async Task RemoveProductFromCart(int userId, int productId)
    {
        var uc = await _context.UserCarts
            .Where(uc => uc.UserId == userId && uc.ProductId == productId)
            .FirstOrDefaultAsync()
            ?? throw new ProductDoesntExistInUserCartException();
        _context.UserCarts.Remove(uc);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> IsProductExistsInCart(int userId, int productId)
    {
        return await _context.UserCarts
            .Where(uc => uc.UserId == userId
            && uc.ProductId == productId)
            .AnyAsync();
    }
}
