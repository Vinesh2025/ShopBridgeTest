using Contract;
using Entities;
using LoggerService;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using ShopBridgeAPI.Helper;
using ShopBridgeAPI.Models;

namespace ShopBridgeAPI.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }
        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {

            });
        }
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();

        }
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration config)
        {
            //var drcptCon = EncryptDecrypt.DecryptStringAES(config["ConnectionStrings:SQL"]);
            //var connectionString = drcptCon;

            var connectionString = config["ConnectionStrings:SQL"];
            services.AddDbContext<ShopBridgeContext>(o => o.UseSqlServer(connectionString));
            services.AddSingleton(new SqlDB(connectionString));

        }
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }

        
    }
}
