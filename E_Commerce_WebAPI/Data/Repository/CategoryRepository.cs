using E_Commerce_WebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_WebAPI.Data.Repository
{

    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await FindAll()
                .OrderBy(category => category.CategoryName)
                .ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await FindByCondition(category => category.CategoryId.Equals(categoryId))
                .FirstOrDefaultAsync();
        }

        public void CreateCategory(Category category)
        {
            Create(category);
        }

        public void UpdateCategory(Category category) 
        { 
            Update(category); 
        }

        public void DeleteCategory(Category category)
        {
            Delete(category);
        }
    }
}
