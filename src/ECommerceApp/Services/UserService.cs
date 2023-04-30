using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Utils.File;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserCartRepository _userCartRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<UserService> _logger;

        public UserService(
            IUserRepository userRepository, 
            IProductRepository productRepository,
            IUserCartRepository userCartRepository,
            IWebHostEnvironment environment,
            ILogger<UserService> logger,
            IAddressRepository addressRepository)
        {
            _userRepository = userRepository;
            _productRepository = productRepository;
            _userCartRepository = userCartRepository;
            _environment = environment;
            _logger = logger;
            _addressRepository = addressRepository;
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

        public async Task<(User?, Exception?)> UpdateUser(int id, UserUpdateModel model)
        {
            if (model == null)  
                return (null, new ArgumentException());
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);

                if (model.ProfileImage != null) {
                    _logger.LogInformation($"{model.ProfileImage.FileName} : file Name");
                    var uniqueFileName = FileHelper.GetUniqueFileName(model.ProfileImage.FileName);
                    var uploads = Path.Combine("images", "users", id.ToString(), "profileImage");
                    var filePath = Path.Combine(_environment.WebRootPath, uploads, uniqueFileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                    await model.ProfileImage.CopyToAsync(new FileStream(filePath, FileMode.Create));
                    model.ProfileImagePath = Path.Combine(uploads, uniqueFileName);
                }

                if (!model.Email.IsNullOrEmpty() && !user.Email.Equals(model.Email)) {
                    try
                    {
                        if (await _userRepository.GetUserByEmailAsync(model.Email!) != null)
                            throw new UserWithEmailExistsException();
                    }
                    catch (UserWithEmailDontExistException) { }
                }

                _logger.LogInformation($"{model.ProfileImage} : file Name");

                await _userRepository.UpdateUserAsync(user, model);
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

        public async Task<(User?, Exception?)> GetUserByIdAsync(int userId) {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);

                return(user, null);
            }
            catch (UserNotFoundException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
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

        public async IAsyncEnumerable<Product> GetProductsInUserCart(int userId)
        {
            var products = _userCartRepository.GetProductsInUserCart(userId);

            await foreach (var product in products)
            {
                yield return product;
            }
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

        public async Task<(Address?, Exception?)> GetUserShippingAddressAsync(int userId) {
            try
            {
                var address = await _addressRepository.GetUserShippingAddressAsync(userId);

                return(address, null);
            }
            catch (UserNotFoundException e) { return (null, e); }
            catch (AddressNotFoundException e) { return (null, e); }
            catch (Exception e) {return (null, e); }
        }

        public async Task<(bool, Exception?)> CreateUserShippingAddressAsync(AddressCreateModel model) {
            try
            {
                await _addressRepository.CreateShippingAddressAsync(model);

                return(true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch(Exception e) {return(false, e); }
        }

        public async Task<(bool, Exception?)> UpdateUserShippingAddressAsync(AddressUpdateModel model)
        {
            try
            {
                var address = await _addressRepository.GetShiipingAddressByIdAsync(model.AddressId);
                await _addressRepository.UpdateShippingAddressAsync(address, model);

                return (true, null);
            }
            catch (AddressNotFoundException e) { return (false, e); }
            catch (Exception e) { return (false, e); }
        }

    }
}
