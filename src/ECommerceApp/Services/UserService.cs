using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;

namespace ECommerceApp.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<(bool, Exception)> CreateUser(User user)
        {
            if (user == null)
            {
                return (false, new ArgumentException());
            }

            try
            {
                await _userRepository.CreateUser(user);
                return (true, null);
            }
            catch (Exception exception)
            {
                return (false, exception);
            }
        }
    }
}
