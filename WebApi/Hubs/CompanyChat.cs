using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Hubs
{
    public class CompanyChat
    {
        private IHubContext<CompanyChatHub> Hub { get; }

        private const int InactivityTimeoutInSeconds = 30;
        private readonly ILogger _logger;
        private readonly IAuthenticationService _authenticationService;

        public CompanyChat(IHubContext<CompanyChatHub> hub, ILogger<CompanyChat> logger, IAuthenticationService authenticationService)
        {
            Hub = hub;
            _logger = logger;
            _authenticationService = authenticationService;

            Task.Factory.StartNew(RemoveInactiveUsers, TaskCreationOptions.LongRunning);
        }

        private async Task RemoveInactiveUsers()
        {
            while (true)
            {
                foreach (var (key, client) in CompanyChatHub.CurrentConnections.Where(z => z.Value.LatestActivity.AddSeconds(InactivityTimeoutInSeconds) < DateTime.UtcNow))
                {
                    _logger.LogInformation($"{key} was disconnected due to inactivity.");

                    CompanyChatHub.CurrentConnections.TryRemove(key, out _);

                    await Hub.Clients.Client(client.ConnectionId).SendAsync("UserKill",
                        new ChatMessage("Admin", "Disconnected due to inactivity."));

                    _authenticationService.RemoveBearerToken(client.Username);

                    await Hub.Clients.AllExcept(client.ConnectionId).SendAsync("UserTimeout",
                        new ChatMessage("Admin", $"{key} was disconnected due to inactivity."));
                }
                await Task.Delay(1000);
            }
            // ReSharper disable once FunctionNeverReturns
        }

        public Task BroadcastMessage(string name, string message) => Hub.Clients.All.SendAsync("BroadChatMessage", new ChatMessage(name, message));

        public Task UserConnected(string name, string message, string connectionId) => Hub.Clients.AllExcept(connectionId).SendAsync("UserConnected", new ChatMessage(name, message));

        public Task UserDisconnected(string name, string message) => Hub.Clients.All.SendAsync("UserDisconnected", new ChatMessage(name, message));
    }
}
