namespace E_Commerce_WebAPI.Data.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private AppDbContext _context;
        private ICategoryRepository _category;
        private IProductRepository _product;

        public ICategoryRepository Category {
            get {
                if (_category == null)
                {
                    _category = new CategoryRepository(_context);
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

        public RepositoryWrapper(AppDbContext context) { 
            _context= context;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
