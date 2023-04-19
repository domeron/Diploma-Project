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

        public async Task UpdateUserAsync(User user, UserUpdateModel model)
        {
            if(!model.FirstName.IsNullOrEmpty())
                user.FirstName = model.FirstName!;
            if(!model.LastName.IsNullOrEmpty()) 
                user.LastName = model.LastName!;
            if(!model.Email.IsNullOrEmpty())
                user.Email = model.Email!;
            if(!model.Password.IsNullOrEmpty())
                user.Password = model.Password!;
            if (!model.PhoneNumber.IsNullOrEmpty())
                user.PhoneNumber = model.PhoneNumber;
            if (!model.ProfileImagePath.IsNullOrEmpty())
                user.ProfileImagePath = model.ProfileImagePath;

            await UpdateUserAsync(user);
        }

        public async Task UpdateUserAsync(User user) {
            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
