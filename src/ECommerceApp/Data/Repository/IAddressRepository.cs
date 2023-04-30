using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IAddressRepository
    {
        public Task<ShippingAddress> GetUserShippingAddressAsync(int userId);
        public Task<ShippingAddress> GetShiipingAddressByIdAsync(int addressId);
        public Task CreateShippingAddressAsync(AddressCreateModel model);
        public Task UpdateShippingAddressAsync(ShippingAddress address, AddressUpdateModel model);
        public Task DeleteShippingAddressAsync(ShippingAddress address);
    }
}
