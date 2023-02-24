namespace ECommerceApp.Data.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }

        public double PriceUSD { get; set; }

        public bool IsStocked { get; set; }

        public Guid ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }
    }
}
