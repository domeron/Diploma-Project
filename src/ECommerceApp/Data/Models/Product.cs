﻿namespace ECommerceApp.Data.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double PriceUSD { get; set; }
        public int Quantity { get; set; }
        public Seller Seller{ get; set; }
        public int SellerId { get; set; }
    }
}
