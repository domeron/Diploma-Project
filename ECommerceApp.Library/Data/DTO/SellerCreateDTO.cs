namespace ECommerceApp.Library.Data.DTO;

public class SellerCreateDTO
{
    public int UserId { get; set; }
    public string SellerName { get; set; }
    public string SellerEmail { get; set; }
    public string? SellerDescription { get; set; }

    public bool IsIndividual { get; set; }

}
