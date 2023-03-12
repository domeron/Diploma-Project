using FluentValidation;

namespace ECommerceApp.Models.Validation
{
    public class ProductCreateModelValidator : AbstractValidator<ProductCreateModel>
    {
        public ProductCreateModelValidator() {
            RuleFor(p => p.ProductName)
                .NotEmpty();
            RuleFor(p => p.ProductDescription)
                .NotEmpty();
            RuleFor(p => p.PriceUSD)
                .Must(price => price > 0.0 && price <= 20000.0);
            RuleFor(p => p.Quantity)
                .Must(q => q <= 10000);
            RuleFor(p => p.SellerId)
                .NotEmpty();
        }
    }
}
