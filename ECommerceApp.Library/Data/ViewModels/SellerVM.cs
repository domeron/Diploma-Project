using ECommerceApp.Library.Data.Models;

namespace ECommerceApp.Library.Data.ViewModels;

public class SellerVM
{
    public int SellerId { get; set; }
    public string SellerName { get; set; }
    public string SellerEmail { get; set; }
    public string? SellerDescription { get; set; }
    public bool IsIndividual { get; set; }
    public bool IsVerified { get; set; }
    public int UserId { get; set; }

    public SellerVM() { }
    public SellerVM(Seller seller) {
        SellerId = seller.SellerId;
        SellerName = seller.SellerName;
        SellerEmail = seller.SellerEmail;
        SellerDescription = seller.SellerDescription;
        IsIndividual = seller.IsIndividual;
        IsVerified = seller.IsVerified;
        UserId = seller.UserId;
    }
}
