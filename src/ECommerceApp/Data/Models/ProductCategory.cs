namespace ECommerceApp.Data.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public int? ParentCategoryId { get; set; }
        public ProductCategory? ParentCategory { get; set; }
        public IEnumerable<ProductCategory> ChildCategories { get; set; }
        public IEnumerable<Product> Products{ get; set; }
    }
}
