using Duende.IdentityServer.Extensions;
using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class SellerRepository : ISellerRepository
    {
        private readonly ApplicationDbContext _context;

        public SellerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateSeller(SellerCreateModel model)
        {
            try
            {
                await GetSellerByEmailAsync(model.SellerEmail);
                throw new SellerWithEmailExistsException();
                return false;
            }
            catch (SellerWithEmailDontExistException) { }
            var seller = new Seller
            {
                SellerName = model.SellerName,
                SellerEmail = model.SellerEmail,
                SellerDescription = model.SellerDescription,
                IsIndividual = model.IsIndividual,
                Password = model.Password,
                UserRole = "Seller",
            };
            _context.Sellers.Add(seller);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Seller> GetSellerByEmailAsync(string email)
        {
            if (email.IsNullOrEmpty())
            {
                throw new ArgumentException("email is empty");
            }

            return await _context.Sellers.FirstOrDefaultAsync(s => s.SellerEmail == email) ??
                throw new SellerWithEmailDontExistException();
        }

        public async Task<Seller> GetSellerByIdAsync(int id)
        {
            if (id < 0)
                throw new ArgumentException("Id is less than zero");
            return await _context.Sellers.FirstOrDefaultAsync(s => s.SellerId == id) ??
                throw new SellerNotFoundException();
        }

        public async Task<Seller> GetSellerByEmailAndPasswordAsync(string email, string password)
        {
            if (email.IsNullOrEmpty() || password.IsNullOrEmpty())
                throw new ArgumentException("Email and password are null or empty");

            var seller = await _context.Sellers.FirstOrDefaultAsync(s => s.SellerEmail == email) ??
                throw new SellerWithEmailDontExistException();
            if (!seller.Password.Equals(password))
            {
                throw new WrongPasswordException();
            }
            return seller;
        }

        public async Task UpdateSeller(int id, SellerCreateModel model)
        {
            Seller seller;
            try
            {
                seller = await GetSellerByIdAsync(id);
            } catch (SellerNotFoundException e) { throw e; }

            if (!seller.SellerEmail.Equals(model.SellerEmail))
            {
                try
                {
                    if (await GetSellerByEmailAsync(model.SellerEmail) != null)
                        throw new SellerWithEmailExistsException();
                }
                catch (SellerWithEmailDontExistException) { }
            }

            seller.SellerName = model.SellerName;
            seller.SellerEmail = model.SellerEmail;
            seller.SellerDescription = model.SellerDescription;
            seller.IsIndividual = model.IsIndividual;
            seller.Password = model.Password;
            _context.Attach(seller);
            _context.Entry(seller).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async IAsyncEnumerable<Seller> GetAllSellersAsync()
        {
            var sellers = _context.Sellers.OrderBy(s => s.SellerId).AsAsyncEnumerable();

            await foreach (var seller in sellers) {
                yield return seller;
            }
        }
    }
}
