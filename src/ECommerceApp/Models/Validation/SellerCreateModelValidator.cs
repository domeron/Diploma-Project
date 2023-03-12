using FluentValidation;

namespace ECommerceApp.Models.Validation
{
    public class SellerCreateModelValidator : AbstractValidator<SellerCreateModel>
    {
        public SellerCreateModelValidator()
        {
            RuleFor(s => s.SellerName)
                .NotEmpty();
            RuleFor(s => s.SellerEmail)
                .NotEmpty();
            RuleFor(s => s.IsIndividual)
                .Must(x => x == false || x == true);
            RuleFor(s => s.Password)
                .NotEmpty();
        }
    }
}
