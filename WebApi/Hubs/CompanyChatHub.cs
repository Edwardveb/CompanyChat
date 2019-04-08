using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Hubs
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CompanyChatHub : Hub
    {
        public static readonly ConcurrentDictionary<string, ConnectedClient> CurrentConnections = new ConcurrentDictionary<string, ConnectedClient>();

        private readonly CompanyChat _companyChat;

        public CompanyChatHub(CompanyChat companyChat)
        {
            _companyChat = companyChat;
        }

        public override async Task OnConnectedAsync()
        {
            CurrentConnections.TryAdd(Context.User.Identity.Name, new ConnectedClient(Context.User.Identity.Name, Context.ConnectionId));
            
            await _companyChat.UserConnected("Admin", $"{Context.User.Identity.Name} has joined the chat.", Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            CurrentConnections.TryRemove(Context.User.Identity.Name, out _);

            await _companyChat.UserDisconnected("Admin", $"{Context.User.Identity.Name} has left the chat.");

            await base.OnDisconnectedAsync(exception);
        }

        [HttpPost("chat/sendmessage")]
        public Task SendMessage(string message)
        {
            CurrentConnections[Context.User.Identity.Name].LatestActivity = DateTime.UtcNow;
            return _companyChat.BroadcastMessage(Context.User.Identity.Name, message);
        }
    }
}
