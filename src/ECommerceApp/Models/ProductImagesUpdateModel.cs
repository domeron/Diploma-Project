namespace ECommerceApp.Models
{
    public class ProductImagesUpdateModel
    {
        public IEnumerable<IFormFile> NewImageFiles { get; set; }
        public IEnumerable<int> DeletedImagesIds { get; set; }
    }
}
