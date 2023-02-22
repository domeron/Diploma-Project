using System.ComponentModel.DataAnnotations;

namespace E_Commerce_WebAPI.Model
{
    public class Category
    {
        public Guid CategoryId { get; set; }

        public string CategoryName { get; set; }

        public List<Product> Products { get; set; }
    }
}
