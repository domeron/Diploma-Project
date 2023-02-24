using FluentValidation;

namespace ECommerceApp.Data.Models.Validation
{
    public class ProductValidator
        : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.ProductName)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(60);
            RuleFor(x => x.PriceUSD)
                .NotNull()
                .InclusiveBetween(0.50, 15000);
            RuleFor(p => p.ProductCategoryId).NotEmpty();
        }
    }
}
