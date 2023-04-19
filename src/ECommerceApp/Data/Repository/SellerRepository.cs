using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.Data.Repository
{
    public class SellerRepository : ISellerRepository
    {
        private readonly ApplicationDbContext _context;

        public SellerRepository(ApplicationDbContext context)
        {
            _context = context;
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

        public async IAsyncEnumerable<Seller> GetAllSellersAsync()
        {
            var sellers = _context.Sellers.OrderBy(s => s.SellerId).AsAsyncEnumerable();

            await foreach (var seller in sellers)
            {
                yield return seller;
            }
        }
        public async Task<Seller> CreateSellerAsync(SellerCreateModel model)
        {
            var seller = new Seller
            {
                SellerName = model.SellerName,
                SellerEmail = model.SellerEmail,
                SellerDescription = model.SellerDescription,
                IsIndividual = model.IsIndividual,
                UserId = model.UserId,
            };
            await _context.Sellers.AddAsync(seller);
            _context.Entry(seller).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return seller;
        }


        public async Task UpdateSellerAsync(Seller seller, SellerUpdateModel model)
        {
            if (!model.SellerEmail.IsNullOrEmpty() && !seller.SellerEmail.Equals(model.SellerEmail))
            {
                try
                {
                    if (await GetSellerByEmailAsync(model.SellerEmail!) != null)
                        throw new SellerWithEmailExistsException();
                }
                catch (SellerWithEmailDontExistException) { }
            }

            if(!model.SellerName.IsNullOrEmpty())
                seller.SellerName = model.SellerName!;
            if(!model.SellerEmail.IsNullOrEmpty())
                seller.SellerEmail = model.SellerEmail!;
            if(!model.SellerDescription.IsNullOrEmpty())
                seller.SellerDescription = model.SellerDescription!;
            if(model.IsIndividual.HasValue)
                seller.IsIndividual = model.IsIndividual.Value;
            if(model.IsVerified.HasValue)
                seller.IsVerified = model.IsVerified.Value;

            _context.Attach(seller);
            _context.Entry(seller).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSellerAsync(Seller seller) {
            _context.Sellers.Remove(seller);
            _context.Entry(seller).State= EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}
