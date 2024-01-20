using Backend.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class MigrateData
{

    public static void CreateInitialMigrate(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        //var appDbContext = scope.ServiceProvider.GetService<AppDBContext>();
        var accountDbContext = scope.ServiceProvider.GetService<AccountDbContext>();

        if ( accountDbContext.Database.GetPendingMigrations().Any())
        {
            accountDbContext.Database.Migrate();
        }
        else
        {
            // Migrações já foram aplicadas, não há migrações pendentes
            Console.WriteLine("Migrações já foram aplicadas, nada a ser feito.");
        }
    }

}
