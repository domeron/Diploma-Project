using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;

namespace ECommerceApp.Library.Extensions;

public static class ShippingAddressExtensions
{
    public static AddressVM ToViewModel(this ShippingAddress shippingAddress)
    {
        return new AddressVM(shippingAddress);
    }
}
