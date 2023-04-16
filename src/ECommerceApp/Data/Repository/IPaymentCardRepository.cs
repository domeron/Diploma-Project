using ECommerceApp.Data.Models;
using ECommerceApp.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IPaymentCardRepository
    {
        public Task CreatePaymentCardAsync(PaymentCardCreateModel model);
        public IAsyncEnumerable<PaymentCard> GetUserPaymentCardsAsync(int userId);

        public Task<PaymentCard> GetPaymentCardByCardNumber(string cardNUmber);
    }
}
