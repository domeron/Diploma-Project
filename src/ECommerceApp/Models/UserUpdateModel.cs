namespace ECommerceApp.Models
{
    public class UserUpdateModel
    {
        public IFormFile? ProfileImage { get; set; }
        public string? ProfileImagePath { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
    }
}
