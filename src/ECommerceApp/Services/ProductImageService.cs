using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Utils.File;

namespace ECommerceApp.Services
{
    public class ProductImageService
    {
        private readonly IProductImageRepository _repository;
        private readonly IWebHostEnvironment _environment;
        private readonly IProductRepository _productRepository;

        public ProductImageService(
            IProductImageRepository repository,
            IWebHostEnvironment environment,
            IProductRepository productRepository) { 
            _repository= repository;
            _productRepository=productRepository;
            _environment= environment;
        }

        public async Task CreateProductImages(Product product, IEnumerable<IFormFile> imageFiles)
        {
            int i = 0;
            foreach (var imageFile in imageFiles)
            {
                string filePath = await SaveProductImageFile(imageFile, product.ProductId);
                await _repository.CreateProductImageAsync(product.ProductId, filePath);

                if (i == 0) {
                    await SetProductFrontImageAsync(product, filePath);
                }
                i++;
            }
        }

        public async Task AddProductImages(Product product, IEnumerable<IFormFile> imageFiles) {
            foreach (var imageFile in imageFiles)
            {
                string filePath = await SaveProductImageFile(imageFile, product.ProductId);
                await _repository.CreateProductImageAsync(product.ProductId, filePath);
            }
        }
        public async Task DeleteProductImagesAsync(IEnumerable<int> imageIDs) {
            foreach (var imageID in imageIDs) { 
                var image = await _repository.GetProductImageByIdAsync(imageID);
                DeleteProductImageFile(image.ImagePath);
                await _repository.DeleteProductImageAsync(image);
            }
        }

        private async Task<string> SaveProductImageFile(IFormFile imageFile, int productId)
        {
            var uniqueFileName = FileHelper.GetUniqueFileName(imageFile.FileName);
            var uploads = Path.Combine("images", "products", productId.ToString());
            var filePath = Path.Combine(_environment.WebRootPath, uploads, uniqueFileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            await imageFile.CopyToAsync(new FileStream(filePath, FileMode.Create));
            return Path.Combine(uploads, uniqueFileName);
        }


        private void DeleteProductImageFile(string filePath) {
            filePath = Path.Combine(_environment.WebRootPath, filePath);
            if (System.IO.File.Exists(filePath)) { 
                System.IO.File.Delete(filePath);
            }
        }

        public async Task SetProductFrontImageAsync(Product product, string filePath)
        {
            await _productRepository.UpdateProduct(product, new() { FrontImagePath = filePath });
        }
    }
}
