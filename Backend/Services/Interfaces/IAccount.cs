using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Backend.DTOs;
using ErrorOr;

namespace Backend.Services.Interfaces;

public interface IAccount
{
    Task<List<UserDTO>> GetUsersAsync();
    Task<ErrorOr<UserDTO>> GetUserByIdAsync(string userId);
    Task<ErrorOr<ApplicationUser>> FindByEmailAsync(string email);
    Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
    Task<IdentityResult> CreateAsync(ApplicationUser user, string password);
    Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role);
    Task<IList<string>> GetRolesAsync(ApplicationUser user);
    Task<ErrorOr<UserDTO>> UpdateUserAsync (UserUpdateModel userData);
    Task<ErrorOr<IdentityResult>> DeleteUserAsync(string email);

}
