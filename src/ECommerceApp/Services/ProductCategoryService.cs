using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;

namespace ECommerceApp.Services
{
    public class ProductCategoryService
    {
        private readonly IProductCategoryRepository _repository;

        public ProductCategoryService(IProductCategoryRepository repository)
        {
            _repository = repository;
        }

        public async IAsyncEnumerable<ProductCategory> GetTopCategories() {
            var categories = _repository.GetTopCategories();

            await foreach (var category in categories)
            {
                yield return category;
            }
        }

        public async Task<(ProductCategory?, Exception?)> GetCategoryByIdAsync(int id) {
            try
            {
                var category = await _repository.GetCategoryByIdAsync(id);
                return (category, null);
            }
            catch (ProductCategoryNotFound e) { return (null, e); }
            catch (Exception e) { return (null, e); }
        }
    }
}
