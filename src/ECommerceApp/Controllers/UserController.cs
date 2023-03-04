using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(User user)
        {
            if (ModelState.IsValid && user != null)
            {
                (bool result, Exception exception) = await _userService.CreateUser(user);

                if (result && exception == null)
                {
                    return StatusCode((int)HttpStatusCode.Created);
                }

                return exception is CouldNotAddUserToDatabase
                    ? StatusCode((int)HttpStatusCode.NotFound)
                    : StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }
    }
}
