using FluentValidation;

namespace ECommerceApp.Models.Validation
{
    public class UserCreateModelValidator : AbstractValidator<UserCreateModel>
    {
        public UserCreateModelValidator() {
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
        }
    }
}
