using ECommerceApp.Library.Extensions;
using ECommerceApp.API.Services;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAddressService _addressService;
    private readonly IUserCartService _cartService;
    private readonly IFavoritesService _favService;

    public UserController(IUserService userService, IAddressService addressService, IUserCartService cartService, IFavoritesService favService)
    {
        _userService = userService;
        _addressService = addressService;
        _cartService = cartService;
        _favService = favService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(UserRegisterDTO userModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (User? user, Exception? ex) = await _userService.CreateUserAsync(userModel);

        if (user != null && ex is null)
            return StatusCode((int)HttpStatusCode.Created, new UserVM(user));

        if (ex is UserWithEmailExistsException)
            return BadRequest("User with provided email already exists.");
        else if (ex is CouldNotAddEntityToDatabase)
            return NotFound();

        return StatusCode(500, ex.Message);
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUser(UserLoginDTO form)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (User? user, Exception? ex) = await _userService.GetUser(form.Email, form.Password);

        if (user != null && ex == null)
            return Ok(new UserVM(user));

        if (ex is UserWithEmailDontExistException)
            return BadRequest("User with provided email is not found.");
        if (ex is WrongPasswordException)
            return BadRequest("Wrong password");
        else if (ex is UserNotFoundException)
            return NotFound("User with provided email and password is not found.");
        else
            return StatusCode(500, ex.Message);

    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (User? user, Exception? ex) = await _userService.UpdateUserAsync(model);

        if (user != null && ex is null)
            return Ok(new UserVM(user));

        if (ex is UserWithEmailExistsException)
            return BadRequest("User with provided email already exists.");
        else if (ex is UserWithPhoneExistsException)
            return BadRequest("Provided phone number is already taken.");
        else if (ex is UserNotFoundException)
            return NotFound("User not found");
        else
            return StatusCode(500, ex.Message);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(int id) {
        (User? user, Exception? e) = await _userService.GetUser(id);

        if(user != null && e == null) return Ok(new UserVM(user));

        if (e is UserNotFoundException) return NotFound();
        else return StatusCode(500, e.StackTrace);
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetUserByEmailAsync(string email)
    {
        if (!string.IsNullOrEmpty(email)) {
            (User? user, Exception? ex) = await _userService.GetUser(email);

            if (user != null && ex == null)
                return Ok(new UserVM(user));

            if (ex is UserWithEmailDontExistException)
                return BadRequest("User with provided email is not found.");
            else
                return StatusCode(500, ex.Message);
        }
        return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
    }

    #region SHIPPING ADDRESS

    [HttpGet]
    [Route("{userId}/shipping-address")]
    public async Task<IActionResult> GetUserShippingAddress(int userId)
    { 
        (ShippingAddress? address, Exception? ex) = await _addressService.GetUserShippingAddressAsync(userId);

        if (address != null && ex == null)
            return Ok(address.ToViewModel());

        if(ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is AddressNotFoundException) return BadRequest("Address Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpPost]
    [Route("/shipping-address/create")]
    public async Task<IActionResult> CreateShippingAddress(AddressCreateDTO model)
    { 
        if(!ModelState.IsValid) return BadRequest(ModelState);

        (ShippingAddress? address, Exception? ex) = await _addressService.CreateShippingAddressAsync(model);

        if (address != null && ex == null)
            return Ok(address.ToViewModel());

        return StatusCode(500, ex.StackTrace);
    }

    [HttpPost]
    [Route("/shipping-address/update")]
    public async Task<IActionResult> CreateShippingAddress(AddressUpdateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        (ShippingAddress? address, Exception? ex) = await _addressService.UpdateShippingAddressAsync(model);

        if (address != null && ex == null)
            return Ok(address.ToViewModel());

        if (ex is AddressNotFoundException) return BadRequest("Address Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    #endregion

    #region USER CART
    [HttpGet]
    [Route("cart/{userId}")]
    public async Task<IActionResult> GetProductsInUserCart(int userId)
    {
        (IList<Product>? products, Exception? ex) = await _cartService.GetProductsInUserCart(userId);

        if (products != null && ex == null)
            return Ok(products.ToViewModelList());

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpGet]
    [Route("cart/has")]
    public async Task<IActionResult> Has(int userId, int productId)
    {
        (bool has, Exception? ex) = await _cartService.IsProductExistInUserCart(userId, productId);

        if (ex == null)
            return Ok(has);

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        return StatusCode(500, "Internal Server Error");
    }

    [HttpPost]
    [Route("cart/add")]
    public async Task<IActionResult> Add(int userId, int productId)
    {
        (bool added, Exception? ex) = await _cartService.AddProductToCart(userId, productId);

        if (added && ex == null)
            return Ok("added");

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        if (ex is ProductExistsInUserCartException) return BadRequest("Product already exists in user cart");
        return StatusCode(500, "Internal Server Error");
    }

    [HttpDelete]
    [Route("cart/remove")]
    public async Task<IActionResult> Remove(int userId, int productId)
    {
        (bool removed, Exception? ex) = await _cartService.RemoveProductFromUserCart(userId, productId);

        if (removed && ex == null)
            return Ok("removed");

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        if (ex is ProductDoesntExistInUserCartException) return BadRequest("Product is not in user cart");
        return StatusCode(500, "Internal Server Error");
    }
    #endregion

    #region FAVORITES
    [HttpGet]
    [Route("{userId}/favorites")]
    public async Task<IActionResult> GetFavoriteProducts(int userId)
    { 
        (IList<Product>? products, Exception? ex) = await _favService.GetFavoriteProducts(userId);

        if(products != null && ex is null)
            return Ok(products.ToViewModelList());

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpPost]
    [Route("favorites/add")]
    public async Task<IActionResult> AddToFavorites(int userId, int productId)
    {
        (bool added, Exception? ex) = await _favService.AddToFavorites(userId, productId);

        if (added && ex is null) return Ok();

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        if (ex is AlreadyExistsException) return BadRequest("Already in Favorites");
        return StatusCode(500, ex.StackTrace);
    }

    [HttpGet]
    [Route("favorites/has")]
    public async Task<IActionResult> IsInFavorites(int userId, int productId)
    { 
        var isInFavorites = await _favService.IsInFavorites(userId, productId);

        return Ok(isInFavorites);
    }

    [HttpDelete]
    [Route("favorites")]
    public async Task<IActionResult> RemoveFromFavorites(int userId, int productId)
    { 
        (bool removed, Exception? ex) = await _favService.RemoveFromFavorites(userId, productId);

        if(removed && ex is null) return Ok();

        if (ex is UserNotFoundException) return BadRequest("User Not Found");
        if (ex is ProductNotFoundException) return BadRequest("Product Not Found");
        if (ex is FavoriteNotFoundException) return BadRequest("Favorite Not Found");
        return StatusCode(500, ex.StackTrace);
    }
    #endregion
}
