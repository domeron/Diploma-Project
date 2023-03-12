using FluentValidation;

namespace ECommerceApp.Data.Models.Validation
{
    public class SellerValidator
        : AbstractValidator<Seller>
    {
        public SellerValidator() {
            RuleFor(s => s.SellerName)
                .NotEmpty();
            RuleFor(s => s.SellerEmail)
                .NotEmpty();
            RuleFor(s => s.IsIndividual)
                .NotEmpty();
            RuleFor(s => s.Password)
                .NotEmpty();
            RuleFor(s => s.UserRole)
                .NotEmpty();
        }
    }
}
