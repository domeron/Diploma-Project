using FluentValidation;

namespace ECommerceApp.Library.Data.DTO.Validation;
public class UserCreateModelValidator : AbstractValidator<UserRegisterDTO>
{
    public UserCreateModelValidator()
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
    }
}
