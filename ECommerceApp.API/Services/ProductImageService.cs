using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Utils.File;

namespace ECommerceApp.Services;

public interface IProductImageService
{
    Task CreateProductImages(int productId, IEnumerable<IFormFile> imageFiles);
    Task AddProductImages(int productId, IEnumerable<IFormFile> imageFiles);
    Task<string> SaveProductImageFile(int productId, IFormFile imageFile);
    Task SetProductFrontImageAsync(int productId, string filePath);
    
    Task DeleteProductImagesAsync(IEnumerable<int> imageIDs);
    void DeleteProductImageFile(string filePath);
}

public class ProductImageService : IProductImageService
{
    private readonly IProductImageRepository _repo;
    private readonly IWebHostEnvironment _env;
    private readonly IProductRepository _productRepo;

    public ProductImageService(
        IProductImageRepository repo,
        IWebHostEnvironment env,
        IProductRepository productRepo) { 
        _repo= repo;
        _productRepo=productRepo;
        _env= env;
    }

    public async Task CreateProductImages(int productId, IEnumerable<IFormFile> imageFiles)
    {
        int i = 0;
        foreach (var imageFile in imageFiles)
        {
            string filePath = await SaveProductImageFile(productId, imageFile);
            await _repo.CreateProductImage(productId, filePath);

            if (i == 0) {
                await SetProductFrontImageAsync(productId, filePath);
            }
            i++;
        }
    }

    public async Task AddProductImages(int productId, IEnumerable<IFormFile> imageFiles) {
        foreach (var imageFile in imageFiles)
        {
            string filePath = await SaveProductImageFile(productId, imageFile);
            await _repo.CreateProductImage(productId, filePath);
        }
    }
    public async Task SetProductFrontImageAsync(int productId, string filePath)
    {
        await _productRepo.UpdateProduct(
            new() { 
                ProductId = productId, 
                FrontImagePath = filePath
            });
    }
    public async Task<string> SaveProductImageFile(int productId, IFormFile imageFile)
    {
        var uniqueFileName = FileHelper.GetUniqueFileName(imageFile.FileName);
        var uploads = Path.Combine("images", "products", productId.ToString());
        var filePath = Path.Combine(_env.WebRootPath, uploads, uniqueFileName);
        Directory.CreateDirectory(Path.GetDirectoryName(filePath));
        await imageFile.CopyToAsync(new FileStream(filePath, FileMode.Create));
        return Path.Combine(uploads, uniqueFileName);
    }

    public async Task DeleteProductImagesAsync(IEnumerable<int> imageIDs) {
        foreach (var imageID in imageIDs) { 
            var image = await _repo.GetProductImage(imageID);
            DeleteProductImageFile(image.ImagePath);
            await _repo.DeleteProductImage(image);
        }
    }
    public void DeleteProductImageFile(string filePath) {
        filePath = Path.Combine(_env.WebRootPath, filePath);
        if (File.Exists(filePath)) { 
            File.Delete(filePath);
        }
    }

}
