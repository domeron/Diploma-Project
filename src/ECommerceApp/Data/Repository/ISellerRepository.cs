using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface ISellerRepository
    {
        public Task<Seller> GetSellerByEmailAsync(string email);
        public Task<Seller> GetSellerByIdAsync(int id);
        public IAsyncEnumerable<Seller> GetAllSellersAsync();
        public Task<Seller> CreateSellerAsync(SellerCreateModel model);
        public Task UpdateSellerAsync(Seller seller, SellerUpdateModel model);
        public Task DeleteSellerAsync(Seller seller);

    }
}
