using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Model
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }

        public double priceUSD { get; set; }

        public bool isStocked { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
