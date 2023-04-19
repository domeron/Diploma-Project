using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Net;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateUser(UserCreateModel userModel)
        {
            if (ModelState.IsValid && userModel != null)
            {
                (User? user, Exception? exception) = await _userService.CreateUser(userModel);

                if (user != null && exception == null)
                {
                    return StatusCode((int)HttpStatusCode.Created, new UserViewModel(user));
                }

                if (exception is UserWithEmailExistsException)
                    return BadRequest("User with provided email already exists.");
                else if (exception is CouldNotAddEntityToDatabase)
                    return NotFound();
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser(UserLoginModel form)
        {
            if (ModelState.IsValid && !form.Email.IsNullOrEmpty() && !form.Password.IsNullOrEmpty()) {
                (User? user, Exception? exception) = await _userService.GetUserByEmailAndPasswordAsync(form.Email, form.Password);
                if (user != null && exception == null)
                    return Ok(new UserViewModel(user));

                if (exception is UserWithEmailDontExistException)
                    return BadRequest("User with provided email is not found.");
                if (exception is WrongPasswordException)
                    return BadRequest("Wrong password");
                else if (exception is UserNotFoundException)
                    return NotFound("User with provided email and password is not found.");
                else
                    return StatusCode(500, exception.Message);
            }
            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UserUpdateModel userModel)
        {
            if (ModelState.IsValid && userModel != null)
            {
                (User? user, Exception? exception) = await _userService.UpdateUser(id, userModel);

                if (user != null && exception == null)
                {
                    return Ok(new UserViewModel(user));
                }

                if (exception is UserWithEmailExistsException)
                    return BadRequest("User with provided email already exists.");
                else if (exception is UserNotFoundException)
                    return NotFound("User not found");
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserByIdAsync(int userId) {
            (User? user, Exception? e) = await _userService.GetUserByIdAsync(userId);

            if(user != null && e == null) return Ok(new UserViewModel(user));

            if (e is UserNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("Email/{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email)
        {
            if (!email.IsNullOrEmpty()) {
                (User? user, Exception? exception) = await _userService.GetUserByEmailAsync(email);

                if (user != null && exception == null)
                    return Ok(new UserViewModel(user));

                if (exception is UserWithEmailDontExistException)
                    return BadRequest("User with provided email is not found.");
                else
                    return StatusCode(500, exception.Message);
            }
            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPost("Cart/Add/{userId}/{productId}")]
        public async Task<IActionResult> AddProductToCart(int userId, int productId) {
            if (userId < 0 || productId < 0) return BadRequest("userId or productId is less than zero");

            (bool added, Exception? exception) = await _userService.AddProductToCart(userId, productId);

            if (added && exception == null) return Ok("added");
            if (exception is UserNotFoundException) return BadRequest("User not found");
            else if (exception is ProductNotFoundException) return BadRequest("Product not found");
            else if (exception is ProductExistsInUserCartException) return BadRequest("Product already exists in User Cart");
            else return StatusCode(500, exception.StackTrace);
        }

        [HttpGet("Cart/{userId}")]
        public async IAsyncEnumerable<ProductViewModel> GetProductsInUserCart(int userId)
        {
            var products = _userService.GetProductsInUserCart(userId);

            await foreach (var product in products)
            {
                yield return new ProductViewModel(product);
            }
        }

        [HttpGet("Cart/{userId}/HasProduct/{productId}")]
        public async Task<IActionResult> IsProductExistInUserCart(int userId, int productId)
        {
            (bool exist, Exception? e) = await _userService.IsProductExistInUserCart(userId, productId);

            if (e == null) return Ok(exist);

            if (e is UserNotFoundException) return BadRequest("User not found");
            else if (e is ProductNotFoundException) return BadRequest("Product not found exception");
            else return StatusCode(500, e.StackTrace);
        }

        [HttpDelete("Cart/{userId}/{productId}")]
        public async Task<IActionResult> DeleteProductFromUserCart(int userId, int productId) {
            if (userId < 0 || productId < 0) return BadRequest("userId or productId is less than zero");

            (bool deleted, Exception? e) = await _userService.DeleteProductFromUserCart(userId, productId);

            if (deleted && e == null) return Ok();

            if (e is UserNotFoundException) return BadRequest("User not found");
            else if (e is ProductNotFoundException) return BadRequest("Product not found");
            else if (e is ProductDoesntExistInUserCartException) return BadRequest("Product doesn't exist in User Cart");
            else return StatusCode(500, "Internal Server Error");
        }

        [HttpGet("ShippingAddress/{userId}")]
        public async Task<IActionResult> GetUserShippingAddress(int userId) {
            (Address? address, Exception? e) = await _userService.GetUserShippingAddressAsync(userId);

            if (address != null && e == null) 
                return Ok(new AddressViewModel(address));

            if (e is UserNotFoundException) return NotFound();
            else if (e is AddressNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }
    }
}
