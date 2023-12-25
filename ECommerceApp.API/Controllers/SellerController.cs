using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;
using ECommerceApp.Library.Exceptions;
using ECommerceApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceApp.Controllers;

[ApiController]
[Route("seller")]
public class SellerController : ControllerBase
{
    private readonly SellerService _service;

    public SellerController(SellerService service)
    {
        _service = service;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateSellerAsync(SellerCreateDTO sellerModel)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        (User? user, Exception? ex) = await _service.CreateSeller(sellerModel);

        if (user != null && ex == null)
        {
            return StatusCode((int)HttpStatusCode.Created, user);
        }

        if (ex is SellerWithEmailExistsException)
            return BadRequest("Seller with provided email already exists.");
        else if (ex is CouldNotAddEntityToDatabase)
            return StatusCode(500, "Could not add seller to database");
        else
            return StatusCode(500, ex.StackTrace);
        
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateSeller(int id, SellerUpdateDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        (Seller? seller, Exception? ex) = await _service.UpdateSeller(id, model);

        if (seller != null && ex == null)
            return Ok(new SellerVM(seller));

        if (ex is SellerWithEmailExistsException)
            return BadRequest("Seller with provided email already exists.");
        else if (ex is SellerNotFoundException)
            return NotFound("Seller not found");
        else
            return StatusCode(500, ex.Message);
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetSellerByEmailAsync(string email)
    {
        if (string.IsNullOrEmpty(email)) return BadRequest();
        
        (Seller? seller, Exception? ex) = await _service.GetSellerByEmailAsync(email);

        if (seller != null && ex == null)
            return Ok(new SellerVM(seller));

        if (ex is SellerWithEmailDontExistException)
            return BadRequest("Seller with provided email is not found.");
        else
            return StatusCode(500, ex.Message);
    }

    [HttpGet("{sellerId}")]
    public async Task<IActionResult> GetSellerByIdAsync(int sellerId) { 
        (Seller? seller, Exception? e) = await _service.GetSellerByIdAsync(sellerId);

        if(seller != null && e == null) return Ok(new SellerVM(seller));

        if (e is SellerNotFoundException) return NotFound();
        else return StatusCode(500, e.StackTrace);
    }

    [HttpGet("all")]
    public async IAsyncEnumerable<SellerVM> GetAllSellersAsync() {
        var sellers = _service.GetAllSellersAsync();

        await foreach (var seller in sellers) {
            yield return new SellerVM(seller);
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
