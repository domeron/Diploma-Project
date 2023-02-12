using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Data
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }
    }
}
