using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using ECommerceApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class PaymentCardRepository : IPaymentCardRepository
    {
        private readonly ApplicationDbContext _context;

        public PaymentCardRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<PaymentCard> GetUserPaymentCardsAsync(int userId) {
            var cards = _context.PaymentCards
                .Where(c => c.UserId == userId)
                .AsAsyncEnumerable();

            await foreach (var card in cards) {
                yield return card;
            }
        }

        public async Task CreatePaymentCardAsync(PaymentCardCreateModel model) {
            var card = new PaymentCard
            {
                UserId = model.UserId,
                CardHolderFirstName = model.CardHolderFirstName,
                CardHolderLastName = model.CardHolderLastName,
                CardNumber = model.CardNumber,
                CardSecurityCode = model.CardSecurityCode,
                ExpirationDate = model.ExpirationDate,
            };
            await _context.PaymentCards.AddAsync(card);
            _context.Entry(card).State = EntityState.Added;
            await _context.SaveChangesAsync();
        }

        public async Task<PaymentCard> GetPaymentCardByCardNumber(string cardNumber) {
            return await _context.PaymentCards
                .Where(c => c.CardNumber.Equals(cardNumber))
                .FirstOrDefaultAsync() ?? throw new PaymentCardNotFoundException();
        }
    }
}
