using ECommerceApp.Data.Models;
using ECommerceApp.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApp.Data.Repository
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async IAsyncEnumerable<ProductCategory> GetTopCategories()
        {
            var categories = _context.ProductCategories
                .Where(c => c.ParentCategoryId == null)
                .Include(c => c.ChildCategories)
                .ThenInclude(c => c.ChildCategories)
                .AsAsyncEnumerable();

            await foreach (var category in categories) {
                yield return category;
            }
        }

        public async Task<ProductCategory> GetCategoryByIdAsync(int id) {
            return await _context.ProductCategories
                .Where(c => c.Id == id)
                .Include(c => c.ParentCategory)
                .ThenInclude(c => c.ParentCategory)
                .FirstOrDefaultAsync()

                ?? throw new ProductCategoryNotFound();
        }

        public async Task<ProductCategory> GetCategoryWithChildrenAsync(int id) {
            return await _context.ProductCategories
                .Where(c => c.Id == id)
                .Include(c => c.ChildCategories)
                .ThenInclude(c => c.ChildCategories)
                .FirstOrDefaultAsync()
                ?? throw new ProductCategoryNotFound();
        }
    }
}
