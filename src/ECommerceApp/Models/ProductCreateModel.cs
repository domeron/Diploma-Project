namespace ECommerceApp.Models
{
    public class ProductCreateModel
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double PriceUSD { get; set; }
        public int Quantity { get; set; }
        public int SellerId { get; set; }
    }
}
