using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.API.Services;

public interface IUserCartService
{
    Task<(IList<Product>?, Exception?)> GetProductsInUserCart(int userId);
    Task<(bool, Exception?)> AddProductToCart(int userId, int productId);
    Task<(bool, Exception?)> IsProductExistInUserCart(int userId, int productId);
    Task<(bool, Exception?)> RemoveProductFromUserCart(int userId, int productId);
}
public class UserCartService : IUserCartService
{
    private readonly IUserCartRepository _cartRepo;
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;

    public UserCartService(IUserCartRepository cartRepo, IUserRepository userRepository, IProductRepository productRepository)
    { 
        _cartRepo = cartRepo;
        _userRepository = userRepository;
        _productRepository = productRepository;
    }

    public async Task<(IList<Product>?, Exception?)> GetProductsInUserCart(int userId)
    {
        try {
            _ = await _userRepository.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();

            var products = await _cartRepo.GetProductsInUserCart(userId);

            return (products, null);
        } catch (Exception ex) { return (null, ex); }
    }

    public async Task<(bool, Exception?)> AddProductToCart(int userId, int productId)
    {
        try
        {
            _ = await _userRepository.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();
            _ = await _productRepository.GetProductById(productId) ?? throw new ProductNotFoundException();

            if (!await _cartRepo.IsProductExistsInCart(userId, productId))
                await _cartRepo.AddProductToCart(userId, productId);
            else
                return (false, new ProductExistsInUserCartException());

            return (true, null);
        }
        catch (Exception e) { return (false, e); }
    }


    public async Task<(bool, Exception?)> IsProductExistInUserCart(int userId, int productId)
    {
        try
        {
            _ = await _userRepository.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();
            _ = await _productRepository.GetProductById(productId) ?? throw new ProductNotFoundException();
            var exist = await _cartRepo.IsProductExistsInCart(userId, productId);

            return (exist, null);
        }
        catch (Exception e) { return (false, e); }
    }

    public async Task<(bool, Exception?)> RemoveProductFromUserCart(int userId, int productId)
    {
        try
        {
            _ = await _userRepository.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();
            _ = await _productRepository.GetProductById(productId) ?? throw new ProductNotFoundException();

            await _cartRepo.RemoveProductFromCart(userId, productId);
            
            return (true, null);
        }
        catch (ProductDoesntExistInUserCartException e) { return (false, e); }
        catch (Exception e) { return (false, e); }
    }
}
