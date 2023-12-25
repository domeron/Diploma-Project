using Microsoft.AspNetCore.Http;

namespace ECommerceApp.Library.Data.DTO;

public class UserUpdateDTO
{
    public int UserId { get; set; }
    public IFormFile? ProfileImage { get; set; }
    public string? ProfileImagePath { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Password { get; set; }

    public int? SellerId { get; set; }
    public bool? IsSeller { get; set; }
}
