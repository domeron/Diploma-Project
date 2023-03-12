using FluentValidation;

namespace ECommerceApp.Data.Models.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator() {
            RuleFor(p => p.ProductName)
                .NotEmpty();
            RuleFor(p => p.ProductDescription)
                .NotEmpty();
            RuleFor(p => p.PriceUSD)
                .Must(price => price > 0.0 && price <= 20000.0);
            RuleFor(p => p.Quantity)
                .Must(q => q <= 10000);
        }
    }
}
