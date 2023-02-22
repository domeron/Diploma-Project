using FluentValidation;

namespace E_Commerce_WebAPI.Model.Validation
{
    public class CategoryModelValidator
        : AbstractValidator<Category>
    {
        public CategoryModelValidator() 
        {
            RuleFor(x => x.CategoryName)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(100);
        }
    }
}
