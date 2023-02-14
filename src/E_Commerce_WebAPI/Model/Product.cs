using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public double priceUSD { get; set; }
    }
}
