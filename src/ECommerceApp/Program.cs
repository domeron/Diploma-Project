using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data;
using FluentValidation;
using FluentValidation.AspNetCore;
using ECommerceApp.Data.Models.Validation;
using ECommerceApp.Data.Repository;
using ECommerceApp.Services;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;
var AllowReactOrigin = "_allowReactOrigin";

// [Configuration]
builder.Configuration
    .AddJsonFile("appsettings.json", false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);

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
    options => options.UseSqlServer(connString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();


// [Fluent Validation]
builder.Services.AddValidatorsFromAssemblyContaining<UserValidator>();
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
builder.Services.AddScoped(typeof(UserService), typeof(UserService));
builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
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