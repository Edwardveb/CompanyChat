using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ChatClient
{
    public class Program
    {
        public static void Main(string[] args) => BuildWebHost(args).Run();

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureKestrel(c => c.AddServerHeader = false)
                .UseStartup<Startup>().Build();
    }
}
