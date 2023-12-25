using ECommerceApp.API.Repositories;
using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;
using SQLitePCL;

namespace ECommerceApp.API.Services;

public interface IFavoritesService {
    Task<(IList<Product>?, Exception?)> GetFavoriteProducts(int userId);
    Task<(bool, Exception?)> AddToFavorites(int userId, int productId);
    Task<(bool, Exception?)> RemoveFromFavorites(int userId, int productId);
    Task<bool> IsInFavorites(int userId, int productId);
}

public class FavoritesService : IFavoritesService
{
    private readonly IFavoritesRepository _repo;
    private readonly IUserRepository _userRepo;
    private readonly IProductRepository _productRepo;

    public FavoritesService(IFavoritesRepository repo, IUserRepository userRepo,IProductRepository productRepo)
    {
        _repo = repo;
        _userRepo = userRepo;
        _productRepo = productRepo;
    }

    public async Task<(bool, Exception?)> AddToFavorites(int userId, int productId)
    {
        try {
            _ = await _userRepo.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();
            _ = await _productRepo.GetProductById(productId) ?? throw new ProductNotFoundException();

            if (await _repo.IsInFavorites(userId, productId))
                throw new AlreadyExistsException();

            await _repo.AddToFavorites(userId, productId);

            return (true, null);
        } catch (Exception ex) { return (false, ex); }
    }

    public async Task<(IList<Product>?, Exception?)> GetFavoriteProducts(int userId)
    {
        try {
            _ = await _userRepo.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();

            var products = await _repo.GetFavoriteProducts(userId);

            return (products, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<bool> IsInFavorites(int userId, int productId)
    {
        return await _repo.IsInFavorites(userId, productId);
    }

    public async Task<(bool, Exception?)> RemoveFromFavorites(int userId, int productId)
    {
        try
        {
            _ = await _userRepo.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();
            _ = await _productRepo.GetProductById(productId) ?? throw new ProductNotFoundException();

            if (!await _repo.IsInFavorites(userId, productId))
                throw new FavoriteNotFoundException();

            await _repo.RemoveFromFavorites(userId, productId);

            return (true, null);
        }
        catch (Exception ex) { return (false, ex); }
    }
}
