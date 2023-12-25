using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Utils.File;


namespace ECommerceApp.Services;

public interface IUserService {
    Task<(User?, Exception?)> GetUser(int id);
    Task<(User?, Exception?)> GetUser(string email);
    Task<(User?, Exception?)> GetUser(string email, string password);

    Task<(User?, Exception?)> CreateUserAsync(UserRegisterDTO model);
    Task<(User?, Exception?)> UpdateUserAsync(UserUpdateDTO model);
}
public class UserService : IUserService 
{
    private readonly IUserRepository _userRepo;
    private readonly IWebHostEnvironment _env;

    public UserService(
        IUserRepository userRepository, 
        IWebHostEnvironment env)
    {
        _userRepo = userRepository;
        _env = env;
    }

    #region GET METHODS
    public async Task<(User?, Exception?)> GetUser(int userId) {
        try
        {
            var user = await _userRepo.GetUserByIdAsync(userId);

            return(user, null);
        }
        catch (UserNotFoundException e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }
    public async Task<(User?, Exception?)> GetUser(string email)
    {
        try
        {
            var user = await _userRepo.GetUserByEmailAsync(email);
            return (user, null);
        }
        catch (ArgumentException e) { return (null, e); }
        catch (UserWithEmailDontExistException e) { return (null, e); }
        catch (UserNotFoundException e) { return (null, e); }
        catch (Exception e) { return (null, e); }

    }
    public async Task<(User?, Exception?)> GetUser(string email, string password)
    {
        try
        {
            var user = await _userRepo.GetUserByEmailAndPasswordAsync(email, password);
            return (user, null);
        }
        catch (ArgumentException e) { return (null, e); }
        catch (UserWithEmailDontExistException e) { return (null, e); }
        catch (WrongPasswordException e) { return (null, e); }
        catch (Exception e) { return (null, e); }

    }
    #endregion

    public async Task<(User?, Exception?)> CreateUserAsync(UserRegisterDTO model)
    {
        try
        {
            if (await _userRepo.GetUserByEmailAsync(model.Email) != null)
                throw new UserWithEmailExistsException();

            var user = await _userRepo.CreateUser(model);
            return (user, null);
        }
        catch (UserWithEmailExistsException e) { return (null, e);  }
        catch (Exception exception) { return (null, exception); }
    }

    public async Task<(User?, Exception?)> UpdateUserAsync(UserUpdateDTO model)
    {
        try
        {
            if (model.ProfileImage != null) {
                var uniqueFileName = FileHelper.GetUniqueFileName(model.ProfileImage.FileName);
                var uploads = Path.Combine("images", "users", model.UserId.ToString(), "profileImage");
                var filePath = Path.Combine(_env.WebRootPath, uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                await model.ProfileImage.CopyToAsync(new FileStream(filePath, FileMode.Create));
                model.ProfileImagePath = Path.Combine(uploads, uniqueFileName);
            }

            var user = await _userRepo.UpdateUserAsync(model);
            return (user, null);
        }
        catch (UserNotFoundException e) { return (null, e); }
        catch (UserWithEmailExistsException e) { return (null, e); }
        catch (UserWithPhoneExistsException e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }

}
