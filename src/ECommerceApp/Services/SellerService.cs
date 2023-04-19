using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.Services
{
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

        public async Task<(bool, Exception?)> CreateSeller(SellerCreateModel sellerModel)
        {
            if (sellerModel == null)
                return (false, new ArgumentException("Seller Model is null"));

            try
            {
                var user = await _userRepository.GetUserByIdAsync(sellerModel.UserId);
                try
                {
                    await _sellerRepository.GetSellerByEmailAsync(sellerModel.SellerEmail);
                }
                catch (SellerWithEmailDontExistException) { }
                

                var seller = await _sellerRepository.CreateSellerAsync(sellerModel);

                user.SellerId = seller.SellerId;
                user.IsSeller = true;
                await _userRepository.UpdateUserAsync(user);

                return (true, null);
            }
            catch (UserNotFoundException e) { return (false, e); }
            catch (SellerWithEmailExistsException e) { return (false, e); }
            catch (Exception exception) { return (false, exception); }
        }

        public async Task<(Seller?, Exception?)> UpdateSeller(int id, SellerUpdateModel model)
        {
            if (model == null)
                return (null, new ArgumentException("Model is null"));
            try
            {
                var seller = await _sellerRepository.GetSellerByIdAsync(id);

                if (!model.SellerEmail.IsNullOrEmpty() && !seller.SellerEmail.Equals(model.SellerEmail)) {
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

                user.SellerId = null;
                user.IsSeller= false;
                await _userRepository.UpdateUserAsync(user);

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
}
