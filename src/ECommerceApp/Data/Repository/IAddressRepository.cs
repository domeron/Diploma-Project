using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IAddressRepository
    {
        public Task<Address> GetUserShippingAddressAsync(int userId);
        public Task CreateShippingAddressAsync(CreateAddressModel model);
        public Task UpdateShippingAddressAsync(int addressId, CreateAddressModel model);

        public Task DeleteShippingAddressAsync(int addressId);
    }
}
