namespace ECommerceApp.Data.Repository
{
    public interface IProductImageRepository
    {
        public Task CreateProductImage(int productId, string imagePath);
    }
}
