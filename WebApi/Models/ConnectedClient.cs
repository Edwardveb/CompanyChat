using System;

namespace WebApi.Models
{
    public class ConnectedClient
    {
        public string Username { get; set; }
        public string ConnectionId { get; set; }
        public DateTime TimeConnected { get; set; } = DateTime.UtcNow;
        public DateTime LatestActivity { get; set; } = DateTime.UtcNow;

        public ConnectedClient(string username, string connectionId)
        {
            Username = username;
            ConnectionId = connectionId;
        }
    }
}
