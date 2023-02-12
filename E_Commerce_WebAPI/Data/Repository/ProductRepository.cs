using E_Commerce_WebAPI.Data;
using E_Commerce_WebAPI.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_WebAPI.Data.Repository
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await FindAll()
                .OrderBy(product => product.ProductName)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int productId)
        {
            return await FindByCondition(product => product.ProductId.Equals(productId))
                .FirstOrDefaultAsync();
        }

        public void CreateProduct(Product product)
        {
            Create(product);
        }

        public void UpdateProduct(Product product)
        {
            Update(product);
        }

        public void DeleteProduct(Product product)
        {
            Delete(product);
        }
    }
}
