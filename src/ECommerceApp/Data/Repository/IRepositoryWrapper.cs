namespace ECommerceApp.Data.Repository
{
    public interface IRepositoryWrapper
    {
        IProductCategoryRepository ProductCategory { get; }
        IProductRepository Product { get; }
        Task SaveAsync();
    }
}
