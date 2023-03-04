using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IUserRepository
    {
        public Task<bool> CreateUser(User user);
        public Task<User> GetUserByEmail(string email);
    }
}
