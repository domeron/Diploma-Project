using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductCategoryRepository
    {
        public IAsyncEnumerable<ProductCategory> GetTopCategories();
        public IAsyncEnumerable<ProductCategory> GetChildCategories(int categoryId);
        public Task<ProductCategory> GetCategoryByIdAsync(int id);
        public Task<ProductCategory> GetCategoryWithChildrenAsync(int id);
    }
}
