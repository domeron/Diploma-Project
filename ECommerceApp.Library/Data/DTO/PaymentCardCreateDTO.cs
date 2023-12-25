namespace ECommerceApp.Library.Data.DTO;

public class PaymentCardCreateDTO
{
    public int UserId { get; set; }
    public string CardNumber { get; set; }
    public DateTime ExpirationDate { get; set; }
    public string CardHolderFirstName { get; set; }
    public string CardHolderLastName { get; set; }
    public int CardSecurityCode { get; set; }
}
