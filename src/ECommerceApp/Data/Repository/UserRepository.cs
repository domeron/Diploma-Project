using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public class UserRepository
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
    }
}
