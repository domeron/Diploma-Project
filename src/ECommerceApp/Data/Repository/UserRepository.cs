using Duende.IdentityServer.Extensions;
using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) 
        {
            _context = context;    
        }

        public async Task<bool> CreateUser(User user)
        {

            try
            {
                using (_context)
                {
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            if (email.IsNullOrEmpty())
            {
                Console.WriteLine($"Could not find user in GetUserByEmail! email = {email}");
                throw new UserNotFoundException();
            }

            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email) ??
                   throw new UserWithEmailDontExistException();
        }

        public async Task<User> GetUserByEmailAndPassword(string email, string password)
        {
            if (email.IsNullOrEmpty() || password.IsNullOrEmpty()) {
                Console.WriteLine($"Could not find user in GetUserByEmailAndPassword! email = {email}");
                throw new UserNotFoundException();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email) ?? 
                throw new UserWithEmailDontExistException();
            if (!user.Password.Equals(password)) {
                throw new WrongPasswordException();
            }
            return user;
        }
    }
}
