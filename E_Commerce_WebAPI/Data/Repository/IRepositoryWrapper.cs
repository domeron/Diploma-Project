namespace E_Commerce_WebAPI.Data.Repository
{
    public interface IRepositoryWrapper
    {
        ICategoryRepository Category { get; }
        IProductRepository Product { get; }
        Task SaveAsync();
    }
}
