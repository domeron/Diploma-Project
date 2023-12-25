using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.API.Repository;

public interface ISellerRepository
{
    public Task<Seller?> GetSellerByEmailAsync(string email);
    public Task<Seller?> GetSellerByIdAsync(int id);
    public IAsyncEnumerable<Seller> GetAllSellersAsync();
    public Task<Seller> CreateSellerAsync(SellerCreateDTO model);
    public Task UpdateSellerAsync(Seller seller, SellerUpdateDTO model);
    public Task DeleteSellerAsync(Seller seller);

}

public class SellerRepository : ISellerRepository
{
    private readonly ApplicationDbContext _context;

    public SellerRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Seller?> GetSellerByEmailAsync(string email)
    {
        return await _context.Sellers
            .FirstOrDefaultAsync(s => s.SellerEmail.Equals(email)) ?? null;
    }

    public async Task<Seller?> GetSellerByIdAsync(int id)
    {
        return await _context.Sellers
            .FirstOrDefaultAsync(s => s.SellerId == id) ??
            null;
    }

    public async IAsyncEnumerable<Seller> GetAllSellersAsync()
    {
        var sellers = _context.Sellers.OrderBy(s => s.SellerId).AsAsyncEnumerable();

        await foreach (var seller in sellers)
        {
            yield return seller;
        }
    }
    public async Task<Seller> CreateSellerAsync(SellerCreateDTO model)
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


    public async Task UpdateSellerAsync(Seller seller, SellerUpdateDTO model)
    {
        if (!string.IsNullOrEmpty(model.SellerEmail) && !seller.SellerEmail.Equals(model.SellerEmail))
        {
            try
            {
                if (await GetSellerByEmailAsync(model.SellerEmail!) != null)
                    throw new SellerWithEmailExistsException();
            }
            catch (SellerWithEmailDontExistException) { }
        }

        if (!string.IsNullOrEmpty(model.SellerName))
            seller.SellerName = model.SellerName!;
        if (!string.IsNullOrEmpty(model.SellerEmail))
            seller.SellerEmail = model.SellerEmail!;
        if (!string.IsNullOrEmpty(model.SellerDescription))
            seller.SellerDescription = model.SellerDescription!;
        if (model.IsIndividual.HasValue)
            seller.IsIndividual = model.IsIndividual.Value;
        if (model.IsVerified.HasValue)
            seller.IsVerified = model.IsVerified.Value;

        _context.Attach(seller);
        _context.Entry(seller).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSellerAsync(Seller seller)
    {
        _context.Sellers.Remove(seller);
        _context.Entry(seller).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }
}
