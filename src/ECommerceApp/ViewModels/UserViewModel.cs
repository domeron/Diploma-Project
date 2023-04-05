using Duende.IdentityServer.Extensions;
using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class UserViewModel
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }
        public ICollection<ProductViewModel>? Cart { get; set; }

        public UserViewModel(User user) { 
            UserId = user.UserId;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            UserRole= user.UserRole;
            if (!user.Cart.IsNullOrEmpty()) { 
                Cart = new List<ProductViewModel>();
                foreach (var userCart in user.Cart) {
                    Cart.Add(new ProductViewModel(userCart.Product));
                }
            }
        }
    }
}
