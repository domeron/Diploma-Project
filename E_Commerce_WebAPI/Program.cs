using E_Commerce_WebAPI.Data;
using E_Commerce_WebAPI.Data.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment;
builder.Configuration
    .AddJsonFile("appsettings.json", false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);

var connString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(connString));

builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "E-Commerce WebAPI (ASP.NET Core)", Version = "v1" });
});
//builder.Services.AddAuthorization();
builder.Services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
builder.Services.AddControllers();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "E-Commerce WebAPI (ASP.NET Core)";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API");
    swaggerUIOptions.RoutePrefix = string.Empty;
});
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
