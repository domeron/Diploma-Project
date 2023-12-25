using ECommerceApp.Data;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.API.Repository;

public interface IUserRepository
{
    public Task<User> CreateUser(UserRegisterDTO model);
    public Task<User?> GetUserByEmailAsync(string email);
    public Task<User?> GetUserByIdAsync(int id);
    public Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
    public Task<User?> GetUserByPhoneAsync(string phone);
    public Task<User> UpdateUserAsync(UserUpdateDTO model);
    public Task UpdateUserSellerInfo(User user, bool isSeller, int? sellerId);
}

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> CreateUser(UserRegisterDTO model)
    {
        var user = new User
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email,
            Password = model.Password,
        };
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Where(u => u.Email == email)
            .FirstOrDefaultAsync() ?? null;
    }

    public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
    {
        var user = await GetUserByEmailAsync(email) ?? throw new UserWithEmailDontExistException();
        if (!user.Password.Equals(password))
        {
            throw new WrongPasswordException();
        }
        return user;
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .Where(u => u.UserId == id)
            .FirstOrDefaultAsync() ?? null;
    }

    public async Task<User?> GetUserByPhoneAsync(string phone)
    {
        return await _context.Users
            .Where(u => u.PhoneNumber.Equals(phone))
            .FirstOrDefaultAsync() ??
            null;
    }

    public async Task<User> UpdateUserAsync(UserUpdateDTO model)
    {
        var user = await GetUserByIdAsync(model.UserId) ?? throw new UserNotFoundException();

        if (!string.IsNullOrEmpty(model.FirstName))
            user.FirstName = model.FirstName;
        if (!string.IsNullOrEmpty(model.LastName))
            user.LastName = model.LastName;
        if (!string.IsNullOrEmpty(model.Email) && !user.Email.Equals(model.Email)) {
            if (await GetUserByEmailAsync(model.Email) != null)
                throw new UserWithEmailExistsException();
            user.Email = model.Email;
        }

        if (!string.IsNullOrEmpty(model.PhoneNumber)) {
            if (await GetUserByPhoneAsync(model.PhoneNumber) != null)
                throw new UserWithPhoneExistsException();
            user.PhoneNumber = model.PhoneNumber;
        }

        if (!string.IsNullOrEmpty(model.Password))
            user.Password = model.Password;

        if (!string.IsNullOrEmpty(model.ProfileImagePath))
            user.ProfileImagePath = model.ProfileImagePath;

        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task UpdateUserSellerInfo(User user, bool isSeller, int? sellerId)
    { 
        user.IsSeller = isSeller;
        user.SellerId = sellerId;

        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}
