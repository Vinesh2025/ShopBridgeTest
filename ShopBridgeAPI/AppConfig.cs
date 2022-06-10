using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Reflection;

namespace ShopBridgeAPI
{
    public static class AppConfig
    {
        public static IConfigurationRoot Config => LazyConfig.Value;

        private static readonly Lazy<IConfigurationRoot> LazyConfig = new Lazy<IConfigurationRoot>(() => new ConfigurationBuilder()
            .SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location))
            .AddJsonFile("appsettings.json")
            .Build());
    }
}
