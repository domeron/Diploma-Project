using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;

namespace ECommerceApp.Services
{
    public class SellerService
    {
        private readonly ISellerRepository _sellerRepository;

        public SellerService(ISellerRepository sellerRepository)
        {
            _sellerRepository = sellerRepository;
        }

        public async Task<(Seller?, Exception?)> CreateSeller(SellerCreateModel sellerModel)
        {
            if (sellerModel == null)
                return (null, new ArgumentException("Seller Model is null"));

            try
            {
                await _sellerRepository.CreateSeller(sellerModel);
                var seller = await _sellerRepository.GetSellerByEmailAsync(sellerModel.SellerEmail);
                return (seller, null);
            }
            catch (SellerWithEmailExistsException e) { return (null, e); }
            catch (Exception exception) { return (null, exception); }
        }

        public async Task<(Seller?, Exception?)> UpdateSeller(int id, SellerCreateModel model)
        {
            if (model == null)
                return (null, new ArgumentException("Model is null"));
            try
            {
                await _sellerRepository.UpdateSeller(id, model);
                var seller = await _sellerRepository.GetSellerByIdAsync(id);
                return (seller, null);
            }
            catch (UserNotFoundException e) { return (null, e); }
            catch (UserWithEmailExistsException e) { return (null, e); }
            catch (Exception e) { return (null, e); }
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

        public async Task<(Seller?, Exception?)> GetSellerByEmailAndPasswordAsync(string email, string password)
        {

            Seller seller;
            try
            {
                seller = await _sellerRepository.GetSellerByEmailAndPasswordAsync(email, password);
            }
            catch (ArgumentException e) { return (null, e); }
            catch (UserWithEmailDontExistException e) { return (null, e); }
            catch (WrongPasswordException e) { return (null, e); }
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
}
