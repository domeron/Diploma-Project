using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.Services;

public class SellerService
{
    private readonly ISellerRepository _sellerRepository;
    private readonly IUserRepository _userRepository;

    public SellerService(
        ISellerRepository sellerRepository,
        IUserRepository userRepository)
    {
        _sellerRepository = sellerRepository;
        _userRepository = userRepository;
    }

    public async Task<(User?, Exception?)> CreateSeller(SellerCreateDTO model)
    {
        try
        {
            var user = await _userRepository.GetUserByIdAsync(model.UserId);

            if (await _sellerRepository.GetSellerByEmailAsync(model.SellerEmail) != null)
                throw new SellerWithEmailExistsException();

            var seller = await _sellerRepository.CreateSellerAsync(model);

            await _userRepository.UpdateUserSellerInfo(user, true, seller.SellerId);

            return (user, null);
        }
        catch (UserNotFoundException e) { return (null, e); }
        catch (SellerWithEmailExistsException e) { return (null, e); }
        catch (Exception exception) { return (null, exception); }
    }

    public async Task<(Seller?, Exception?)> UpdateSeller(int id, SellerUpdateDTO model)
    {
        if (model == null)
            return (null, new ArgumentException("Model is null"));
        try
        {
            var seller = await _sellerRepository.GetSellerByIdAsync(id);

            if (!string.IsNullOrEmpty(model.SellerEmail) && !seller.SellerEmail.Equals(model.SellerEmail)) {
                try
                {
                    await _sellerRepository.GetSellerByEmailAsync(model.SellerEmail!);
                    throw new SellerWithEmailExistsException();
                }
                catch (SellerWithEmailDontExistException) { }
            }

            await _sellerRepository.UpdateSellerAsync(seller, model);
            return (seller, null);
        }
        catch (SellerNotFoundException e) { return (null, e); }
        catch (SellerWithEmailExistsException e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }

    public async Task<(bool, Exception?)> DeleteSellerAsync(int sellerId) {
        try {
            var seller = await _sellerRepository.GetSellerByIdAsync(sellerId);
            var user = await _userRepository.GetUserByIdAsync(seller.UserId);

            await _sellerRepository.DeleteSellerAsync(seller);
            await _userRepository.UpdateUserSellerInfo(user, false, null);

            return (true, null);
        }
        catch(SellerNotFoundException e) { return (false, e); }
        catch(Exception e) { return (false, e); }
    }

    public async Task<(Seller?, Exception?)> GetSellerByEmailAsync(string email)
    {
        Seller seller;
        try
        {
            seller = await _sellerRepository.GetSellerByEmailAsync(email);
        }
        catch (ArgumentException e) { return (null, e); }
        catch (SellerWithEmailDontExistException e) { return (null, e); }
        catch (SellerNotFoundException e) { return (null, e); }
        catch (Exception e) { return (null, e); }

        return (seller, null);
    }

    public async Task<(Seller?, Exception?)> GetSellerByIdAsync(int id) {
        Seller seller;
        try
        {
            seller = await _sellerRepository.GetSellerByIdAsync(id);
        }
        catch (ArgumentException e) { return (null, e); }
        catch (SellerNotFoundException e) { return (null, e); }
        catch (Exception e) { return (null, e); }

        return (seller, null);
    }

    public async IAsyncEnumerable<Seller> GetAllSellersAsync() {
        var sellers = _sellerRepository.GetAllSellersAsync();

        await foreach (var seller in sellers) {
            yield return seller;
        }
    }
}
