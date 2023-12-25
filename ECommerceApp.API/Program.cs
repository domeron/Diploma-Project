using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data;
using FluentValidation;
using FluentValidation.AspNetCore;
using ECommerceApp.Services;
using ECommerceApp.API.Repository;
using ECommerceApp.Library.Data.DTO;
using ECommerceApp.Library.Data.DTO.Validation;
using ECommerceApp.API.Services;
using ECommerceApp.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;
var AllowReactOrigin = "_allowReactOrigin";

#region CONFIGURATION
builder.Configuration
    .AddJsonFile("appsettings.json", false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);
#endregion

#region CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowReactOrigin,policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});
#endregion

#region LOGGING
builder.Logging.AddSeq();
#endregion

#region EF CORE
var connString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(connString), ServiceLifetime.Transient);
#endregion

#region FLUENT VALIDATION
builder.Services.AddValidatorsFromAssemblyContaining<UserCreateModelValidator>();
builder.Services.AddScoped<IValidator<UserRegisterDTO>, UserCreateModelValidator>();
builder.Services.AddFluentValidationAutoValidation(options =>
{
    options.DisableDataAnnotationsValidation = true;
});
builder.Services.AddFluentValidationClientsideAdapters();
#endregion

#region SWAGGER
// [Swagger]
builder.Services.AddSwaggerGen(opts =>
{
    opts.SwaggerDoc("v1", new OpenApiInfo { Title = "E-Commerce WebAPI (ASP.NET Core)", Version = "v1" });
});
#endregion

#region CUSTOM SERVICES
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository,UserRepository>();

builder.Services.AddScoped<SellerService, SellerService>();
builder.Services.AddScoped<ISellerRepository,SellerRepository>();

builder.Services.AddScoped<IProductCategoryService, ProductCategoryService>();
builder.Services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();

builder.Services.AddScoped<IProductImageService, ProductImageService>();
builder.Services.AddScoped<IProductImageRepository, ProductImageRepository>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();


builder.Services.AddScoped<IProductReviewService, ProductReviewService>();
builder.Services.AddScoped<IProductReviewRepository, ProductReviewRepository>();

builder.Services.AddScoped<IUserCartService, UserCartService>();
builder.Services.AddScoped<IUserCartRepository, UserCartRepository>();

builder.Services.AddScoped<CountryService, CountryService>();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();

builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();

builder.Services.AddScoped<IFavoritesRepository, FavoritesRepository>();
builder.Services.AddScoped<IFavoritesService, FavoritesService>();

#endregion

builder.Services.AddControllers();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(opts =>
{
    opts.DocumentTitle = "E-Commerce WebAPI (ASP.NET Core)";
    opts.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API");
    opts.RoutePrefix = string.Empty;
    opts.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(AllowReactOrigin);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();