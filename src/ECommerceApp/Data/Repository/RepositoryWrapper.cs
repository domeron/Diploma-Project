namespace ECommerceApp.Data.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ApplicationDbContext _context;
        private IProductCategoryRepository _category;
        private IProductRepository _product;

        public IProductCategoryRepository ProductCategory {
            get {
                if (_category == null)
                {
                    _category = new ProductCategoryRepository(_context);
                }

                return _category;
            }
        }

        public IProductRepository Product {
            get {
                if (_product == null) { 
                    _product = new ProductRepository(_context);
                }

                return _product;
            }
        }

        public RepositoryWrapper(ApplicationDbContext context) { 
            _context= context;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
