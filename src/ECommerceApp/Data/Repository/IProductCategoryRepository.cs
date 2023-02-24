using ECommerceApp.Data.Models;

namespace ECommerceApp.Data.Repository
{
    public interface IProductCategoryRepository : IRepositoryBase<ProductCategory>
    {
        Task<IEnumerable<ProductCategory>> GetAllCategoriesAsync();
        Task<ProductCategory> GetCategoryByIdAsync(int categoryId);

        void CreateCategory(ProductCategory category);
        void UpdateCategory(ProductCategory category);
        void DeleteCategory(ProductCategory category);
    }
}
