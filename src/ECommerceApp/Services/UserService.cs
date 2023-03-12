using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;

namespace ECommerceApp.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<(User?, Exception?)> CreateUser(UserCreateModel userModel)
        {
            if (userModel == null)
            {
                return (null, new ArgumentException());
            }

            try
            {
                await _userRepository.CreateUser(userModel);
                var user = await _userRepository.GetUserByEmailAsync(userModel.Email);
                return (user, null);
            }
            catch (UserWithEmailExistsException e) { return (null, e);  }
            catch (Exception exception) { return (null, exception); }
        }

        public async Task<(User?, Exception?)> UpdateUser(int id, UserCreateModel model)
        {
            if (model == null)
                return (null, new ArgumentException());
            try
            {

                await _userRepository.UpdateUser(id, model);
                var user = await _userRepository.GetUserByIdAsync(id);
                return (user, null);
            }
            catch (UserNotFoundException e) { return (null, e); }
            catch (UserWithEmailExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }

        public async Task<(User?, Exception?)> GetUserByEmailAndPasswordAsync(string email, string password)
        {

            User user;
            try
            {
                user = await _userRepository.GetUserByEmailAndPasswordAsync(email, password);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (UserWithEmailDontExistException e) { return (null, e); }
            catch (WrongPasswordException e) { return (null, e); }
            catch (Exception e) { return (null, e); }

            return (user, null);
        }

        public async Task<(User?, Exception?)> GetUserByEmailAsync(string email)
        {
            User user;
            try
            {
                user = await _userRepository.GetUserByEmailAsync(email);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (UserWithEmailDontExistException e) { return (null, e); }
            catch (UserNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }

            return (user, null);
        }

    }
}
