using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Data
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string ProductName { get; set; }
    }
}
