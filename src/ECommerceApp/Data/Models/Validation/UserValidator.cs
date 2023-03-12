using FluentValidation;

namespace ECommerceApp.Data.Models.Validation
{
    public class UserValidator
    : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.FirstName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(60);
            RuleFor(u => u.LastName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(60);
            RuleFor(u => u.Email)
                .NotEmpty();
            RuleFor(u => u.Password)
                .NotEmpty();
            RuleFor(u => u.UserRole)
                .NotEmpty();
        }
    }
}
