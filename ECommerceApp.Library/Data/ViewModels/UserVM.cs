using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class UserVM
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? ProfileImagePath { get; set; }

    public bool IsSeller { get; set; }

    public int? SellerId { get; set; }

    public UserVM(User user) { 
        UserId = user.UserId;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        ProfileImagePath = user.ProfileImagePath;
        IsSeller = user.IsSeller;
        SellerId = user.SellerId;
    }
}
