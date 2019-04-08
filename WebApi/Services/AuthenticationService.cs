using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IAuthenticationService
    {
        string GetBearerToken(string username);
        void RemoveBearerToken(string username);
    }

    public class AuthenticationService : IAuthenticationService
    {
        public static readonly ConcurrentDictionary<string, DateTime> LoggedInUserDb = new ConcurrentDictionary<string, DateTime>();

        private readonly AppSettings _appSettings;

        public AuthenticationService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;

            LoggedInUserDb.TryAdd("Admin", DateTime.MaxValue);

            Task.Factory.StartNew(CleanExpiredLoginsInDb, TaskCreationOptions.LongRunning);
        }

        public string GetBearerToken(string username)
        {
            if (string.IsNullOrWhiteSpace(username) || LoggedInUserDb.ContainsKey(username))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var expiry = DateTime.UtcNow.AddDays(1);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = expiry,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            var bearerToken = tokenHandler.WriteToken(token);

            LoggedInUserDb.TryAdd(username, expiry);

            return bearerToken;
        }

        private async Task CleanExpiredLoginsInDb()
        {
            while (true)
            {
                foreach (var (key, _) in LoggedInUserDb.Where(z => z.Value < DateTime.UtcNow))
                    LoggedInUserDb.TryRemove(key, out _);

                await Task.Delay(60000);
            }
            // ReSharper disable once FunctionNeverReturns
        }

        public void RemoveBearerToken(string username) => LoggedInUserDb.TryRemove(username, out _);
    }
}