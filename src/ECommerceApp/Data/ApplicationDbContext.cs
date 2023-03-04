using Microsoft.EntityFrameworkCore;
using ECommerceApp.Data.Models;
using ECommerceApp.Data.Configuration;

namespace ECommerceApp.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users{ get; set; }

    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new UserEntityTypeConfiguration().Configure(builder.Entity<User>());
    }
}
