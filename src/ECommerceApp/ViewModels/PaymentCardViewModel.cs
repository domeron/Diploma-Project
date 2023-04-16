using ECommerceApp.Data.Models;

namespace ECommerceApp.ViewModels
{
    public class PaymentCardViewModel
    {
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string CardHolderFirstName { get; set; }
        public string CardHolderLastName { get; set; }

        public PaymentCardViewModel(PaymentCard card) { 
            Id = card.Id;
            CardNumber = card.CardNumber;
            ExpirationDate = card.ExpirationDate;
            CardHolderFirstName = card.CardHolderFirstName;
            CardHolderLastName = card.CardHolderLastName;
        }
    }
}
