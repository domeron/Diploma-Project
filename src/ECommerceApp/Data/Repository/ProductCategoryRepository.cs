using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{

    public class ProductCategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public ProductCategoryRepository(AppDbContext context) : base(context) { }

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
