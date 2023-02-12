using E_Commerce_WebAPI.Model;

namespace E_Commerce_WebAPI.Data.Repository
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int categoryId);

        void CreateCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(Category category);
    }
}
