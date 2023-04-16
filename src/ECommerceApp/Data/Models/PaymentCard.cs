namespace ECommerceApp.Data.Models
{
    public class PaymentCard
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public string CardNumber { get; set; }

        public DateTime ExpirationDate { get; set; }
        public string CardHolderFirstName { get; set; }
        public string CardHolderLastName { get; set; }

        public int CardSecurityCode { get; set; }
    }
}
