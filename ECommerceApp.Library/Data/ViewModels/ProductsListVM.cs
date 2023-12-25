namespace ECommerceApp.Library.Data.ViewModels;
public class ProductsListVM
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public IList<ProductVM> ProductList { get; set; } = new List<ProductVM>();
}
