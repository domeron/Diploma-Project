using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Utils.File;

namespace ECommerceApp.Services
{
    public class ProductImageService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IProductRepository _productRepository;
        private readonly IProductImageRepository _productImageRepository;
        private readonly ILogger<ProductImageService> _log;

        public ProductImageService(
            IWebHostEnvironment environment,
            IProductRepository productRepository,
            IProductImageRepository productImageRepository,
            ILogger<ProductImageService> log)
        {
            _environment = environment;
            _productRepository = productRepository;
            _productImageRepository = productImageRepository;
            _log = log;
        }

        public async Task CreateProductImages(Product product, IEnumerable<IFormFile> imageFiles) {
            int i = 0;
            foreach (var imageFile in imageFiles)
            {
                //_log.LogInformation($"imageFile: {imageFile.FileName}");
                string filePath = await SaveImageFile(imageFile, product.SellerId);
                await _productImageRepository.CreateProductImage(product.ProductId, filePath);
                //_log.LogInformation($"filePath: {filePath}");
                if (i == 0)
                {
                    await _productRepository.SetFrontImageAsync(product.ProductId, filePath);
                }
                i++;
            }
        }

        private async Task<string> SaveImageFile(IFormFile imageFile, int sellerId) {
            var uniqueFileName = FileHelper.GetUniqueFileName(imageFile.FileName);
            var uploads = Path.Combine("images", "users", sellerId.ToString(), "products");
            var filePath = Path.Combine(_environment.WebRootPath, uploads, uniqueFileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            await imageFile.CopyToAsync(new FileStream(filePath, FileMode.Create));
            return Path.Combine(uploads, uniqueFileName);
        }
    }
}
