using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Data.ViewModels;

namespace ECommerceApp.Library.Extensions;
public static class CountryExtensions
{
    public static IList<CountryVM> ToViewModelList(this IList<Country> countries)
    { 
        var vms = new List<CountryVM>();

        foreach (var country in countries) {
            vms.Add(new CountryVM(country));
        }

        return vms;
    }

    public static CountryVM ToViewModel(this Country country)
    { 
        return new CountryVM(country);
    }
}
