using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserCartRepository _userCartRepository;

        public UserService(
            IUserRepository userRepository, 
            IProductRepository productRepository,
            IUserCartRepository userCartRepository)
        {
            _userRepository = userRepository;
            _productRepository = productRepository;
            _userCartRepository = userCartRepository;
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

        public async Task<(bool, Exception?)> AddProductToCart(int userId, int productId) {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                var product = await _productRepository.GetProductByIdAsync(productId);
                if (!await _userCartRepository.IsProductExistsInCart(userId, productId))
                    await _userCartRepository.AddProductToCart(userId, productId);
                else {
                    return (false, new ProductExistsInUserCartException());
                }
                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> IsProductExistInUserCart(int userId, int productId) {
            try
            {
                var user = _userRepository.GetUserByIdAsync(userId);
                var product = _productRepository.GetProductByIdAsync(productId);

                var exist = await _userCartRepository.IsProductExistsInCart(userId, productId);

                return (exist, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async Task<(bool, Exception?)> DeleteProductFromUserCart(int userId, int productId) {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                var product = await _productRepository.GetProductByIdAsync(productId);
                await _userCartRepository.DeleteProductFromCart(userId, productId);
                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (ProductNotFoundException e) { return (false, e); }
            catch (ProductDoesntExistInUserCartException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

        public async IAsyncEnumerable<Product> GetProductsInUserCart(int userId)
        {
            var products = _userCartRepository.GetProductsInUserCart(userId);

            await foreach (var product in products)
            {
                yield return product;
            }
        }

    }
}
