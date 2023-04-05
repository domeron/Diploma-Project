using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IUserCartRepository 
    {
        public IAsyncEnumerable<Product> GetProductsInUserCart(int userId);
        public IAsyncEnumerable<User> GetUsersWhoHasProductInCart(int productId);
        public Task<bool> IsProductExistsInCart(int userId, int productId);
        public Task AddProductToCart(int userId, int productId);
        public Task DeleteProductFromCart(int userId, int productId);
    }
}
