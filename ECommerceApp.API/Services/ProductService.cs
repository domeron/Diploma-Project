using ECommerceApp.Library.Extensions;
using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.Models;
using ECommerceApp.Library.Exceptions;

namespace ECommerceApp.Services;

public interface IProductService
{
    Task<(Product?, Exception?)> GetProductById(int productId);
    Task<(IList<Product>?, Exception? ex)> GetProducts(GetProductsRequestDTO request);
    Task<(Product?, Exception?)> CreateProduct(ProductCreateDTO model);
    Task<(Product?, Exception?)> UpdateProduct(ProductUpdateDTO model);
    Task<(bool, Exception?)> DeleteProduct(int id);

}

public class ProductService : IProductService
{
    private readonly IProductRepository _repo;
    private readonly IProductImageService _productImgService;
    private readonly ISellerRepository _sellerRepo;
    private readonly IProductCategoryRepository _categoryRepo;

    public ProductService(IProductRepository repository, 
        IProductImageService productImageService, ISellerRepository sellerRepo,
        IProductCategoryRepository categoryRepo)
    {
        _repo = repository;
        _productImgService = productImageService;
        _sellerRepo = sellerRepo;
        _categoryRepo = categoryRepo;
    }

    public async Task<(Product?, Exception?)> GetProductById(int productId) {
        try
        {
            var product = await _repo.GetProductById(productId);
            return (product, null);
        }
        catch (ArgumentException e) { return (null, e); }
        catch (ProductNotFoundException e) { return (null, e); }
        catch (Exception e) { return (null, e); }
    }

    public async Task<(IList<Product>?, Exception? ex)> GetProducts(GetProductsRequestDTO request) 
    {
        try
        {
            if (request.SellerId != 0)
                _ = _sellerRepo.GetSellerByIdAsync(request.SellerId) ?? throw new SellerNotFoundException();
            if (request.CategoryId != 0)
                _ = _categoryRepo.GetCategoryByIdAsync(request.CategoryId) ?? throw new ProductCategoryNotFound();

            var products = await _repo.GetProducts(request);

            return (products, null);
        }
        catch (Exception ex) { return (null, ex); }
    }

    public async Task<(Product?, Exception?)> CreateProduct(ProductCreateDTO model)
    {
        try
        {
            var product = await _repo.CreateProduct(model);
            await _productImgService.CreateProductImages(product.ProductId, model.ImageFiles);
            return (product, null);
        }
        catch (Exception exception) { return (null, exception); }
    }

    public async Task<(Product?, Exception?)> UpdateProduct(ProductUpdateDTO model)
    {
        try
        {
            if (model.DeletedImagesIds != null) {
                await _productImgService.DeleteProductImagesAsync(model.DeletedImagesIds);
            }
            if (model.NewImageFiles != null)
            {
                await _productImgService.AddProductImages(model.ProductId, model.NewImageFiles);
            }
            var product = await _repo.UpdateProduct(model);

            return (product, null);
        }
        catch (ProductNotFoundException e)  { return (null, e); }
        catch (Exception e)                 { return (null, e); }
    }

    public async Task<(bool, Exception?)> DeleteProduct(int id)
    {
        try
        {
            await _repo.DeleteProduct(id);
            return (true, null);
        }
        catch (ProductNotFoundException e) { return (false, e); }
        catch (Exception e) { return (false, e); }
    }
}
