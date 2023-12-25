namespace ECommerceApp.Library.Data.DTO;

public class SellerUpdateDTO
{
    public string? SellerName { get; set; }
    public string? SellerEmail { get; set; }
    public string? SellerDescription { get; set; }

    public bool? IsIndividual { get; set; }

    public bool? IsVerified { get; set; }
}
