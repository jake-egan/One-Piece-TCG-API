using Microsoft.AspNetCore.Mvc;

namespace One_Piece_TCG_API.Controllers
{
    public class OnePieceTCGController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
