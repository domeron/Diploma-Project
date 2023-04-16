using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using ECommerceApp.Services;
using ECommerceApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApp.Controllers
{
    [ApiController]
    [Route("Payment")]
    public class PaymentController : Controller
    {
        private readonly PaymentService _paymentService;

        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("Add-Card")]
        public async Task<IActionResult> CreateNewCard(PaymentCardCreateModel model) { 
            if(!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _paymentService.CreatePaymentCardAsync(model);

                return Ok();
            }
            catch (UserNotFoundException) { return BadRequest("User Not Found"); }
            catch (PaymentCardAlreadyExistsException) { return BadRequest("Payment Card already Exists"); }
            catch (Exception ex) { return BadRequest(ex.StackTrace); }
        }
    }
}
