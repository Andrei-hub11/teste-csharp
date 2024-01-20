using Microsoft.AspNetCore.Identity;


namespace Backend.Models;

public class ApplicationUser : IdentityUser
{
    public string LastName { get; set; }
}