using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceApp.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) 
        {
            _context = context;    
        }

        public async Task<bool> CreateUser(UserCreateModel model)
        {
            try
            {
                await GetUserByEmailAsync(model.Email);
                throw new UserWithEmailExistsException();
                return false;
            }
            catch (UserWithEmailDontExistException) { }
                
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password,
                UserRole = "User"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
            
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            if (email.IsNullOrEmpty())
            {
                Console.WriteLine($"Could not find user in GetUserByEmail! email = {email}");
                throw new ArgumentException();
            }

            return await _context.Users.Where(u => u.Email == email)
                .Include(u => u.Cart)
                .ThenInclude(uc => uc.Product)
                .ThenInclude(p => p.Category)
                .ThenInclude(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .FirstOrDefaultAsync() ??
                   throw new UserWithEmailDontExistException();
        }

        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            if (email.IsNullOrEmpty() || password.IsNullOrEmpty()) {
                Console.WriteLine($"Could not find user in GetUserByEmailAndPassword! email = {email}");
                throw new ArgumentException();
            }

            var user = await GetUserByEmailAsync(email);
            if (!user.Password.Equals(password)) {
                throw new WrongPasswordException();
            }
            return user;
        }

        public async Task<User> GetUserByIdAsync(int id) {
            if (id < 0)
            {
                throw new ArgumentException();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id) ??
                throw new UserNotFoundException();

            return user;
        }

        public async Task UpdateUser(int id, UserCreateModel model)
        {
            User user;
            try
            {
                user = await GetUserByIdAsync(id);
            } catch(UserNotFoundException e) { throw e; }

            //if user provided new email, check if new email is used by someone else
            if (!user.Email.Equals(model.Email)) {
                try {
                    if (await GetUserByEmailAsync(model.Email) != null) 
                        throw new UserWithEmailExistsException();
                }
                catch (UserWithEmailDontExistException e) { }
            }
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.Password = model.Password;
            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
