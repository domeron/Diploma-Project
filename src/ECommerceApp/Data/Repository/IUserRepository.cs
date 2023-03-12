using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IUserRepository
    {
        public Task<bool> CreateUser(UserCreateModel model);
        public Task<User> GetUserByEmailAsync(string email);
        public Task<User> GetUserByIdAsync(int id);

        public Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
        public Task UpdateUser(int id, UserCreateModel model);
    }
}
