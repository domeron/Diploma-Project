using FluentValidation;

namespace E_Commerce_WebAPI.Model.Validation
{
    public class ProductModelValidator
        : AbstractValidator<Product>
    {
        public ProductModelValidator()
        {
            RuleFor(x => x.ProductName)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(60);
            RuleFor(x => x.priceUSD)
                .NotNull()
                .InclusiveBetween(0.50, 15000);
        }
    }
}
