using ECommerceApp.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{

    public class ProductCategoryRepository : RepositoryBase<ProductCategory>, IProductCategoryRepository
    {
        public ProductCategoryRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<ProductCategory>> GetAllCategoriesAsync()
        {
            return await FindAll()
                .OrderBy(category => category.ProductCategoryName)
                .ToListAsync();
        }

        public async Task<ProductCategory> GetCategoryByIdAsync(int categoryId)
        {
            return await FindByCondition(category => category.ProductCategoryId.Equals(categoryId))
                .FirstOrDefaultAsync();
        }

        public void CreateCategory(ProductCategory category)
        {
            Create(category);
        }

        public void UpdateCategory(ProductCategory category) 
        { 
            Update(category); 
        }

        public void DeleteCategory(ProductCategory category)
        {
            Delete(category);
        }
    }
}
