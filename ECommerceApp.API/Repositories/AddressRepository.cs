using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.DTO;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.API.Repository;

public interface IAddressRepository
{
    public Task<ShippingAddress?> GetUserShippingAddressAsync(int userId);
    public Task<ShippingAddress?> GetShiipingAddressByIdAsync(int addressId);
    public Task<ShippingAddress> CreateShippingAddressAsync(AddressCreateDTO model);
    public Task<ShippingAddress> UpdateShippingAddressAsync(AddressUpdateDTO model);
    public Task DeleteShippingAddressAsync(int addressId);
}

public class AddressRepository : IAddressRepository
{
    private readonly ApplicationDbContext _context;

    public AddressRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ShippingAddress?> GetUserShippingAddressAsync(int userId)
    {
        return await _context.ShippingAddresses
            .Where(a => a.UserId == userId)
            .Include(a => a.Country)
            .FirstOrDefaultAsync() ?? null;
    }

    public async Task<ShippingAddress?> GetShiipingAddressByIdAsync(int addressId)
    {
        return await _context.ShippingAddresses
            .Where(sa => sa.Id == addressId)
            .Include(sa => sa.Country)
            .FirstOrDefaultAsync() ?? null;
    }


    public async Task<ShippingAddress> CreateShippingAddressAsync(AddressCreateDTO model)
    {
        ShippingAddress address = new()
        {
            UserId = model.UserId,
            CountryId = model.CountryId,
            City = model.City,
            PostalCode = model.PostalCode,
            StreetAddress = model.StreetAddress,
            StreetAddress2 = model.StreetAddress2,
            PhoneNumber = model.PhoneNumber,
            State = model.State,
            FullName = model.FullName,
        };

        await _context.ShippingAddresses.AddAsync(address);
        _context.Entry(address).State = EntityState.Added;

        await _context.SaveChangesAsync();

        return address;
    }
    public async Task<ShippingAddress> UpdateShippingAddressAsync(AddressUpdateDTO model)
    {

        var address = await _context.ShippingAddresses
            .FirstOrDefaultAsync(a => a.Id == model.AddressId) ?? throw new AddressNotFoundException();

        if (!string.IsNullOrEmpty(model.PostalCode) && !address.PostalCode.Equals(model.PostalCode))
            address.PostalCode = model.PostalCode!;

        if (!string.IsNullOrEmpty(model.StreetAddress) && !address.StreetAddress.Equals(model.StreetAddress))
            address.StreetAddress = model.StreetAddress!;

        if (!string.IsNullOrEmpty(model.StreetAddress2) && !address.StreetAddress2!.Equals(model.StreetAddress2))
            address.StreetAddress2 = model.StreetAddress2;

        if (!string.IsNullOrEmpty(model.PhoneNumber) && !address.PhoneNumber.Equals(model.PhoneNumber))
            address.PhoneNumber = model.PhoneNumber!;

        if (model.CountryId.HasValue && address.CountryId != model.CountryId.Value)
            address.CountryId = model.CountryId.Value;

        if (!string.IsNullOrEmpty(model.State) && !address.State.Equals(model.State))
            address.State = model.State!;

        if (!string.IsNullOrEmpty(model.City) && !address.City.Equals(model.City))
            address.City = model.City!;

        if (!string.IsNullOrEmpty(model.FullName) && !address.FullName.Equals(model.FullName))
            address.FullName = model.FullName!;

        _context.Entry(address).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return address;
    }

    public async Task DeleteShippingAddressAsync(int addressId)
    {
        var address = await _context.ShippingAddresses.FirstOrDefaultAsync(a => a.Id == addressId) ?? throw new AddressNotFoundException();
        _context.ShippingAddresses.Remove(address);
        _context.Entry(address).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }


}
