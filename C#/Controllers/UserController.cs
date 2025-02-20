using BaselCoinProject.Services;
using BaselCoinProject.Models;

namespace BaselCoinProject.Controllers
{
    public class UserController
    {
        private readonly AuthService _authService;

        public UserController(AuthService authService)
        {
            _authService = authService;
        }

        public void RegisterUser()
        {
            Console.Write("Benutzername: ");
            string username = Console.ReadLine() ?? "";

            Console.Write("Passwort: ");
            string password = Console.ReadLine() ?? "";

            Console.Write("Rolle (User/Admin): ");
            string role = Console.ReadLine() ?? "User";

            if (_authService.Register(username, password, role))
            {
                Console.WriteLine("Benutzer erfolgreich registriert.");
            }
            else
            {
                Console.WriteLine("Fehler bei der Registrierung.");
            }
        }

        public void LoginUser()
        {
            Console.Write("Benutzername: ");
            string username = Console.ReadLine() ?? "";

            Console.Write("Passwort: ");
            string password = Console.ReadLine() ?? "";

            var user = _authService.Login(username, password);
            if (user != null)
            {
                if (user.Role == "Admin")
                    Console.WriteLine("Admin-Dashboard wird geladen...");
                else
                    Console.WriteLine("User-Dashboard wird geladen...");
            }
        }
    }
}
