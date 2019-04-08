using Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ChatController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger _logger;

        public ChatController(IAuthenticationService authenticationService, ILogger<ChatController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("chat/connect")]
        public IActionResult Connect([FromBody] User user)
        {
            _logger.LogInformation($"Connect: {user?.Username}");

            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    message = string.Join(" ", ModelState.Values.SelectMany(z => z.Errors)
                        .Select(x => x.ErrorMessage))
                });

            var token = _authenticationService.GetBearerToken(user.Username.MyToString());

            if (token == null)
                return BadRequest(new { message = "Name already taken!" });

            return Ok(new User
            {
                Username = user.Username.MyToString(),
                Token = token
            });
        }

        [HttpPost("chat/disconnect")]
        public void Disconnect()
        {
            _logger.LogInformation($"Disconnect: {User.Identity.Name}");
            _authenticationService.RemoveBearerToken(User.Identity.Name);
        }
    }
}