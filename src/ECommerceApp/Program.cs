using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data;
using FluentValidation;
using FluentValidation.AspNetCore;
using ECommerceApp.Data.Repository;
using ECommerceApp.Services;
using ECommerceApp.Models;
using ECommerceApp.Models.Validation;
using ECommerceApp.Configuration;
using ECommerceApp.Utils.EmailSender;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;
var AllowReactOrigin = "_allowReactOrigin";

// [Configuration]
builder.Configuration
    .AddJsonFile("appsettings.json", false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);

// [Email Sender]
var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddScoped<IEmailSender, EmailSender>();

// [CORS]
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowReactOrigin,policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});

// [Logging Seq]
builder.Logging.AddSeq();

// [EF Core]
var connString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(connString), ServiceLifetime.Transient);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();


// [Fluent Validation]
builder.Services.AddValidatorsFromAssemblyContaining<UserCreateModelValidator>();
builder.Services.AddScoped<IValidator<UserCreateModel>, UserCreateModelValidator>();
builder.Services.AddFluentValidationAutoValidation(options =>
{
    options.DisableDataAnnotationsValidation = true;
});
builder.Services.AddFluentValidationClientsideAdapters();

// [Swagger]
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "E-Commerce WebAPI (ASP.NET Core)", Version = "v1" });
});

// [Repositories]
builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
builder.Services.AddScoped(typeof(UserService), typeof(UserService));
builder.Services.AddScoped(typeof(ISellerRepository), typeof(SellerRepository));
builder.Services.AddScoped(typeof(SellerService), typeof(SellerService));
builder.Services.AddScoped(typeof(IProductCategoryRepository), typeof(ProductCategoryRepository));
builder.Services.AddScoped(typeof(ProductCategoryService), typeof(ProductCategoryService));
builder.Services.AddScoped(typeof(IProductRepository), typeof(ProductRepository));
builder.Services.AddScoped(typeof(ProductService), typeof(ProductService));
builder.Services.AddScoped(typeof(IProductImageRepository), typeof(ProductImageRepository));
builder.Services.AddScoped(typeof(ProductImageService), typeof(ProductImageService));
builder.Services.AddScoped(typeof(IProductReviewRepository), typeof(ProductReviewRepository));
builder.Services.AddScoped(typeof(ProductReviewService), typeof(ProductReviewService));
builder.Services.AddScoped(typeof(IUserCartRepository), typeof(UserCartRepository));
builder.Services.AddScoped(typeof(PaymentService), typeof(PaymentService));
builder.Services.AddScoped(typeof(IPaymentCardRepository), typeof(PaymentCardRepository));
builder.Services.AddControllers();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "E-Commerce WebAPI (ASP.NET Core)";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API");
    swaggerUIOptions.RoutePrefix = string.Empty;
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(AllowReactOrigin);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();