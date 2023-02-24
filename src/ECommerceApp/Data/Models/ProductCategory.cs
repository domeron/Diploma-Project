namespace ECommerceApp.Data.Models
{
    public class ProductCategory
    {
        public Guid ProductCategoryId { get; set; }

        public string ProductCategoryName { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
