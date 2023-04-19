using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IAddressRepository
    {
        public Task<Address> GetUserShippingAddressAsync(int userId);
        public Task<Address> GetShiipingAddressByIdAsync(int addressId);
        public Task CreateShippingAddressAsync(AddressCreateModel model);
        public Task UpdateShippingAddressAsync(ShippingAddress address, AddressUpdateModel model);
        public Task DeleteShippingAddressAsync(ShippingAddress address);
    }
}
