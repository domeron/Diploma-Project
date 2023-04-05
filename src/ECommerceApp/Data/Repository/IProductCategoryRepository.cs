using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductCategoryRepository
    {
        public IAsyncEnumerable<ProductCategory> GetTopCategories();
        public Task<ProductCategory> GetCategoryByIdAsync(int id);
        public Task<ProductCategory> GetCategoryWithChildrenAsync(int id);
    }
}
