using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Runtime.CompilerServices;

namespace ECommerceApp.Data.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _context;

        public AddressRepository(ApplicationDbContext context) {
            _context = context;
        }


        public async Task CreateShippingAddressAsync(AddressCreateModel model)
        {
            ShippingAddress address = new() {
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
        }

        public async Task DeleteShippingAddressAsync(ShippingAddress address)
        {
            _context.ShippingAddresses.Remove(address);
            _context.Entry(address).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }

        public async Task<Address> GetShiipingAddressByIdAsync(int addressId)
        {
            return await _context.ShippingAddresses
                .Where(sa => sa.Id == addressId)
                .Include(sa => sa.Country)
                .FirstOrDefaultAsync()
                ?? throw new AddressNotFoundException();
        }

        public async Task<Address> GetUserShippingAddressAsync(int userId)
        {
            return await _context.ShippingAddresses
                .Where(a => a.UserId == userId)
                .Include(a => a.Country)
                .FirstOrDefaultAsync()
                ?? throw new AddressNotFoundException();
        }

        public async Task UpdateShippingAddressAsync(ShippingAddress address, AddressUpdateModel model)
        {
            if (!model.PostalCode.IsNullOrEmpty())
                address.PostalCode = model.PostalCode!;

            if (!model.StreetAddress.IsNullOrEmpty())
                address.StreetAddress = model.StreetAddress!;

            if (!model.StreetAddress2.IsNullOrEmpty())
                address.StreetAddress2 = model.StreetAddress2;

            if (!model.PhoneNumber.IsNullOrEmpty())
                address.PhoneNumber = model.PhoneNumber!;

            if(model.CountryId.HasValue)
                address.CountryId = model.CountryId.Value;

            if (!model.State.IsNullOrEmpty())
                address.State = model.State!;
            
            if(!model.City.IsNullOrEmpty())
                address.City = model.City!;

            if(!model.FullName.IsNullOrEmpty())
                address.FullName = model.FullName!;

            _context.Entry(address).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
