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
                   throw new UserNotFoundException();
        }
    }
}
