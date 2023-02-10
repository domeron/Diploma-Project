using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Model
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
    }
}
