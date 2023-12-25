using FluentValidation;

namespace ECommerceApp.Library.Data.DTO.Validation;

public class ProductCreateModelValidator : AbstractValidator<ProductCreateDTO>
{
    public ProductCreateModelValidator()
    {
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
