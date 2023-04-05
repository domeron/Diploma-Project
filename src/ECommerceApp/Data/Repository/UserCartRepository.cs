using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace ECommerceApp.Data.Repository
{
    public class UserCartRepository : IUserCartRepository
    {
        private readonly ApplicationDbContext _context;

        public UserCartRepository(ApplicationDbContext context) 
        {
            _context = context;    
        }
        public async Task AddProductToCart(int userId, int productId)
        {
            _context.UserCarts.Add(new UserCart { UserId = userId, ProductId = productId });
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductFromCart(int userId, int productId)
        {
            var userCart = await _context.UserCarts.Where(uc => uc.UserId == userId && uc.ProductId == productId).FirstOrDefaultAsync()
                ?? throw new ProductDoesntExistInUserCartException();
            _context.UserCarts.Remove(userCart);
            await _context.SaveChangesAsync();
        }

        public async IAsyncEnumerable<Product> GetProductsInUserCart(int userId)
        {
            var products = _context.UserCarts
                .Where(uc => uc.UserId == userId)
                .Include(uc => uc.Product)
                .ThenInclude(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .Select(uc => uc.Product)
                .AsAsyncEnumerable();

            await foreach (var product in products) {
                yield return product;
            }
        }

        public async IAsyncEnumerable<User> GetUsersWhoHasProductInCart(int productId)
        {
            var users = _context.UserCarts.Where(uc => uc.ProductId == productId).Select(uc => uc.User).AsAsyncEnumerable();

            await foreach (var user in users) {
                yield return user;
            }
        }

        public async Task<bool> IsProductExistsInCart(int userId, int productId)
        {
            var userCart = await _context.UserCarts.Where(uc => uc.UserId == userId && uc.ProductId == productId).FirstOrDefaultAsync() ?? null;
            if (userCart != null)
                return true;
            else return false;
        }
    }
}
