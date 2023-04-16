using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;

namespace ECommerceApp.Services
{
    public class PaymentService
    {
        private readonly IPaymentCardRepository _paymentCardRepository;
        private readonly IUserRepository _userRepository;

        public PaymentService(
            IPaymentCardRepository paymentCardRepository,
            IUserRepository userRepository)
        {
            _paymentCardRepository = paymentCardRepository;
            _userRepository = userRepository;
        }

        public async IAsyncEnumerable<PaymentCard> GetUserPaymentCardsAsync(int userId)
        {
            _ = _userRepository.GetUserByIdAsync(userId);

            var cards = _paymentCardRepository.GetUserPaymentCardsAsync(userId);

            await foreach (var card in cards) {
                yield return card;
            }
        }

        public async Task CreatePaymentCardAsync(PaymentCardCreateModel model) {
            _ = _userRepository.GetUserByIdAsync(model.UserId);
            try
            {
                var card = _paymentCardRepository.GetPaymentCardByCardNumber(model.CardNumber);

                if (card != null) { 
                    throw new PaymentCardAlreadyExistsException();
                }
            }
            catch (PaymentCardNotFoundException) { 
                await _paymentCardRepository.CreatePaymentCardAsync(model);
            }

        }
    }
}
