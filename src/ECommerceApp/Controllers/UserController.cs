using Azure;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Services;
using ECommerceApp.Views;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> CreateUser(User user)
        {
            if (ModelState.IsValid && user != null)
            {
                (bool result, Exception exception) = await _userService.CreateUser(user);

                if (result && exception == null)
                {
                    return StatusCode((int)HttpStatusCode.Created, user);
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
        public async Task<IActionResult> LoginUser(UserLoginForm form)
        { 
            if (ModelState.IsValid && !form.Email.IsNullOrEmpty() && !form.Password.IsNullOrEmpty()) { 
                (User? user, Exception? exception) = await _userService.GetUserByEmailAndPassword(form.Email, form.Password);
                if (user != null && exception == null)
                    return Ok(user);

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
    }
}
