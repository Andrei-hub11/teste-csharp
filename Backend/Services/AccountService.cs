﻿using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Backend.DTOs;
using ErrorOr;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services;

public class AccountService : IAccount
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<List<UserDTO>> GetUsersAsync()
    {
        var users = await _userManager.Users.ToListAsync();
        var usersDTO = users.Select(_mapper.Map<UserDTO>).ToList();
        return usersDTO;
    }

    public async Task<ErrorOr<UserDTO>> GetUserByIdAsync(string userId)
    {
        List<Error> errors = new();
        var user = await _userManager.Users
            .FirstOrDefaultAsync((user) => user.Id == userId);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o id {userId} não foi encontrado"
            )
        );
            return errors;
        }

        var userDTO = _mapper.Map<ApplicationUser, UserDTO>(user);
        return userDTO;
    }

    public async Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role)
    {

        try
        {
            var result = await _userManager.AddToRoleAsync(user, role);
            return result;
        }
        catch (Exception ex)
        {
            return IdentityResult.Failed(new IdentityError { Description = ex.Message });
        }
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<IdentityResult> CreateAsync(ApplicationUser user, string password)
    {
            return await _userManager.CreateAsync(user, password);
    }


    public async Task<ErrorOr<ApplicationUser>> FindByEmailAsync(string email)
    {
            List<Error> errors = new();


            var user = await _userManager.Users.
            FirstOrDefaultAsync(user => user.Email == email);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o email {email} não foi encontrado"
            )
        );
            return errors;
        }

        return user;
    }

    public async Task<IList<string>> GetRolesAsync(ApplicationUser user)
    {
        return await _userManager.GetRolesAsync(user);
    }

    public async Task<ErrorOr<UserDTO>> UpdateUserAsync(UserUpdateModel userData, string userId) { 
        List<Error> errors = new();

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o id {userId} não foi encontrado"
            )
        );
            return errors;
        }

        if (!string.IsNullOrEmpty(userData.Email) && user.Id != userId)
        {
            errors.Add(
                Error.Validation(
                    description: $"O email {userData.Email} já existe para outro usuário."
                )
            );
            return errors;
        }

        user.UserName = userData.UserName ?? user.UserName;
        user.LastName = userData.LastName ?? user.LastName;
        user.Email = userData.Email ?? user.Email;

        await _userManager.UpdateAsync(user);

        var userDTO = _mapper.Map<ApplicationUser, UserDTO>(user);
        return userDTO;
    }

    public async Task<ErrorOr<IdentityResult>> DeleteUserAsync(string email)
    {
        List<Error> errors = new();
        var user = await _userManager.Users
            .FirstOrDefaultAsync((user) => user.Email == email);

        if (user == null)
        {
            errors.Add(
            Error.Validation(
                description: $"O usuário com o email {email} não foi encontrado"
            )
        );
            return errors;
        }

    var result = await   _userManager.DeleteAsync(user);

        return result;
    }
}
