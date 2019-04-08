using Microsoft.AspNetCore.Mvc;

namespace ChatClient.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
    }
}
