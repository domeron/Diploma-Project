using Microsoft.AspNetCore.Http;

namespace ECommerceApp.Library.Data.DTO;

public class ProductImagesUpdateDTO
{
    public IEnumerable<IFormFile> NewImageFiles { get; set; }
    public IEnumerable<int> DeletedImagesIds { get; set; }
}
