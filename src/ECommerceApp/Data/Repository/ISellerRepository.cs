using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface ISellerRepository
    {
        public Task<bool> CreateSeller(SellerCreateModel model);
        public Task<Seller> GetSellerByEmailAsync(string email);
        public Task<Seller> GetSellerByIdAsync(int id);
        public Task<Seller> GetSellerByEmailAndPasswordAsync(string email, string password);

        public IAsyncEnumerable<Seller> GetAllSellersAsync();
        public Task UpdateSeller(int id, SellerCreateModel model);

    }
}
