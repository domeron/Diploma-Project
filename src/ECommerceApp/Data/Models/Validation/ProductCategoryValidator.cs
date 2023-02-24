using ECommerceApp.Data.Models;
using FluentValidation;

namespace ECommerceApp.Data.Models.Validation
{
    public class ProductCategoryValidator
        : AbstractValidator<ProductCategory>
    {
        public ProductCategoryValidator() 
        {
            RuleFor(x => x.ProductCategoryName)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(100);
        }
    }
}
