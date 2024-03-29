﻿using FluentValidation;
using Backend.Models;

namespace Backend.Validators.Account;

public class UserRegisterValidator : AbstractValidator<UserRegisterModel>
{
    public UserRegisterValidator()
    {
        RuleFor(user => user.UserName).NotNull().WithMessage("A propriedade UserName é obrigatória")
            .NotEmpty().MaximumLength(30)
                .WithMessage("O nome não pode ter mais de 30 caracteres.");
        RuleFor(user => user.LastName).NotNull().WithMessage("A propriedade LastName é obrigatória")
           .NotEmpty().MaximumLength(30)
               .WithMessage("O sobrenome não pode ter mais de 30 caracteres.");
        RuleFor(user => user.Email).NotNull().WithMessage("A propriedade Email é obrigatória")
            .NotEmpty().WithMessage("O campo de e-mail não pode estar vazio.")
        .EmailAddress().WithMessage("Por favor, forneça um endereço de e-mail válido.");
        RuleFor(user => user.Password).NotNull().WithMessage("A propriedade Password é obrigatória")
            .NotEmpty().WithMessage("A senha não pode estar vazia.")
        .MinimumLength(8).WithMessage("A senha deve conter no mínimo 8 caracteres.")
        .Matches(@"[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]")
        .WithMessage("A senha deve conter pelo menos 2 caracteres especiais.");
        RuleFor(user => user.Role).NotNull().WithMessage("A propriedade Role é obrigatória")
        .NotEmpty().WithMessage("O campo 'Role' não pode estar vazio.")
        .Must(role => role == "Admin" || role == "User")
            .WithMessage("O campo 'Role' deve ser 'Admin' ou 'User'.");
    }
}
