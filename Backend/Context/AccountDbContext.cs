using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context;

public class AccountDbContext: IdentityDbContext<ApplicationUser>
{

    public AccountDbContext(DbContextOptions<AccountDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(user  => user.LastName).IsRequired();
        });
    }
    }
