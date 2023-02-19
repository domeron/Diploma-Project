using E_Commerce_WebAPI.Data;
using E_Commerce_WebAPI.Data.Repository;
using E_Commerce_WebAPI.Model;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_WebAPI.Tests
{
    public class SQLiteUnitTest
    {
        [Fact]
        public void GetUserProductDetails_CanLoadFromContext()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(connection)
                .Options;

            using (var context = new AppDbContext(options))
            {
                context.Database.EnsureCreated();
                context.Products.AddRange(
                    new Product { ProductId = 1, ProductName = "Product1", priceUSD=1.1},
                    new Product { ProductId = 2, ProductName = "Product2", priceUSD = 1.2 },
                    new Product { ProductId = 3, ProductName = "Product3", priceUSD = 1.3 });
                context.SaveChanges();
            }

            using (var context = new AppDbContext(options)) 
            {
                var repository = new ProductRepository(context);
                var product = repository.GetProductByIdAsync(productId: 2).Result;
                Assert.NotNull(product);
                Assert.Equal(2, product.ProductId);
                Assert.Equal("Product2", product.ProductName);
                Assert.Equal(1.2, product.priceUSD);

            })
        }
    }
}
