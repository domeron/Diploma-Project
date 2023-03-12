using FluentValidation;

namespace ECommerceApp.Models.Validation
{
    public class SellerLoginModelValidator : AbstractValidator<SellerLoginModel>
    {
        public SellerLoginModelValidator() { 
            RuleFor(s => s.Email).NotEmpty();
            RuleFor(s => s.Password).NotEmpty();
        }
    }
}
