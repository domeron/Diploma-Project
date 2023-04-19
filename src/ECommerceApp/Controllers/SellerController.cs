using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
                (bool created, Exception? e) = await _service.CreateSeller(sellerModel);

                if (created && e == null)
                {
                    return StatusCode((int)HttpStatusCode.Created, created);
                }

                if (e is SellerWithEmailExistsException)
                    return BadRequest("Seller with provided email already exists.");
                else if (e is CouldNotAddEntityToDatabase)
                    return StatusCode(500, "Could not add seller to database");
                else
                    return StatusCode(500, e.StackTrace);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateSeller(int id, SellerUpdateModel model)
        {
            if (ModelState.IsValid && model != null)
            {
                (Seller? seller, Exception? exception) = await _service.UpdateSeller(id, model);

                if (seller != null && exception == null)
                    return Ok(new SellerViewModel(seller));

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
                    return Ok(new SellerViewModel(seller));

                if (exception is SellerWithEmailDontExistException)
                    return BadRequest("Seller with provided email is not found.");
                else
                    return StatusCode(500, exception.Message);
            }
            return StatusCode((int)HttpStatusCode.InternalServerError, ModelState.Root.Errors.First().ErrorMessage);
        }

        [HttpGet("{sellerId}")]
        public async Task<IActionResult> GetSellerByIdAsync(int sellerId) { 
            (Seller? seller, Exception? e) = await _service.GetSellerByIdAsync(sellerId);

            if(seller != null && e == null) return Ok(new SellerViewModel(seller));

            if (e is SellerNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }

        [HttpGet("All")]
        public async IAsyncEnumerable<SellerViewModel> GetAllSellersAsync() {
            var sellers = _service.GetAllSellersAsync();

            await foreach (var seller in sellers) {
                yield return new SellerViewModel(seller);
            }
        }

        [HttpDelete("{sellerId}")]
        public async Task<IActionResult> DeleteSellerAsync(int sellerId) {
            (bool deleted, Exception? e) = await _service.DeleteSellerAsync(sellerId);

            if (deleted && e == null) return Ok();

            if (e is SellerNotFoundException) return NotFound();
            else return StatusCode(500, e.StackTrace);
        }
    }
}
