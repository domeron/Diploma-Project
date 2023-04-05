using Duende.IdentityServer.Extensions;
using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Seller")]
    public class SellerController : Controller
    {
        private readonly SellerService _service;

        public SellerController(SellerService service)
        {
            _service = service;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateSellerAsync(SellerCreateModel sellerModel)
        {
            if (ModelState.IsValid && sellerModel != null)
            {
                (Seller? seller, Exception? exception) = await _service.CreateSeller(sellerModel);

                if (seller != null && exception == null)
                {
                    return StatusCode((int)HttpStatusCode.Created, seller);
                }

                if (exception is SellerWithEmailExistsException)
                    return BadRequest("Seller with provided email already exists.");
                else if (exception is CouldNotAddEntityToDatabase)
                    return StatusCode(500, "Could not add seller to database");
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginSellerAsync(SellerLoginModel form)
        {
            if (ModelState.IsValid && !form.Email.IsNullOrEmpty() && !form.Password.IsNullOrEmpty())
            {
                (Seller? seller, Exception? exception) = await _service.GetSellerByEmailAndPasswordAsync(form.Email, form.Password);
                if (seller != null && exception == null)
                    return Ok(seller);

                if (exception is SellerWithEmailDontExistException)
                    return BadRequest("Seller with provided email is not found.");
                if (exception is WrongPasswordException)
                    return BadRequest("Wrong password");
                else if (exception is SellerNotFoundException)
                    return NotFound("Seller with provided email and password is not found.");
                else
                    return StatusCode(500, exception.Message);
            }
            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateSeller(int id, SellerCreateModel model)
        {
            if (ModelState.IsValid && model != null)
            {
                (Seller? seller, Exception? exception) = await _service.UpdateSeller(id, model);

                if (seller != null && exception == null)
                    return Ok(seller);

                if (exception is SellerWithEmailExistsException)
                    return BadRequest("Seller with provided email already exists.");
                else if (exception is SellerNotFoundException)
                    return NotFound("Seller not found");
                else
                    return StatusCode(500, exception.Message);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpGet("Email/{email}")]
        public async Task<IActionResult> GetSellerByEmailAsync(string email)
        {
            if (!email.IsNullOrEmpty())
            {
                (Seller? seller, Exception? exception) = await _service.GetSellerByEmailAsync(email);

                if (seller != null && exception == null)
                    return Ok(seller);

                if (exception is SellerWithEmailDontExistException)
                    return BadRequest("Seller with provided email is not found.");
                else
                    return StatusCode(500, exception.Message);
            }
            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<Seller> GetAllSellersAsync() {
            var sellers = _service.GetAllSellersAsync();

            await foreach (var seller in sellers) {
                yield return seller;
            }
        }
    }
}
