using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.API.Services;

public interface IAddressService
{
    Task<(ShippingAddress?, Exception?)> GetUserShippingAddressAsync(int userId);
    Task<(ShippingAddress?, Exception?)> GetShippingAddressByIdAsync(int addressId);
    Task<(ShippingAddress?, Exception?)> CreateShippingAddressAsync(AddressCreateDTO model);
    Task<(ShippingAddress?, Exception?)> UpdateShippingAddressAsync(AddressUpdateDTO model);
    Task<(bool, Exception?)> DeleteShippingAddressAsync(int addressId);
}

public class AddressService : IAddressService
{
    private readonly IAddressRepository _addressRepo;
    private readonly IUserRepository _userRepo;

    public AddressService(IAddressRepository addressRepo, IUserRepository userRepo)
    { 
        _addressRepo = addressRepo;
        _userRepo = userRepo;
    }

    public async Task<(ShippingAddress?, Exception?)> GetUserShippingAddressAsync(int userId)
    {
        try
        {
            _ = await _userRepo.GetUserByIdAsync(userId) ?? throw new UserNotFoundException();

            var shippingAddress = await _addressRepo.GetUserShippingAddressAsync(userId) ?? throw new AddressNotFoundException();

            return (shippingAddress, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<(ShippingAddress?, Exception?)> GetShippingAddressByIdAsync(int addressId)
    {
        try
        {
            var shippingAddress = await _addressRepo.GetShiipingAddressByIdAsync(addressId) ?? throw new AddressNotFoundException();

            return (shippingAddress, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<(ShippingAddress?, Exception?)> CreateShippingAddressAsync(AddressCreateDTO model)
    {
        try
        {
            var address = await _addressRepo.CreateShippingAddressAsync(model);

            return (address, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<(ShippingAddress?, Exception?)> UpdateShippingAddressAsync(AddressUpdateDTO model)
    {
        try
        {
            var address = await _addressRepo.UpdateShippingAddressAsync(model);

            return (address, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<(bool, Exception?)> DeleteShippingAddressAsync(int addressId)
    {
        try
        {
            await _addressRepo.DeleteShippingAddressAsync(addressId);

            return (true, null);
        }
        catch (Exception ex) { return (false, ex); }
    }
}
