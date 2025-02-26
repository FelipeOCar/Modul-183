using Microsoft.AspNetCore.Mvc;
using BaselCoinProject.Services;
using BaselCoinProject.Models;

namespace BaselCoinProject.Controllers
{
    [ApiController]
    [Route("api")] // Basis-URL für API-Endpunkte
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;

        public UserController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                return BadRequest(new { error = "Benutzername und Passwort dürfen nicht leer sein." });
            }

            bool success = _authService.Register(user.Username, user.PasswordHash, user.Role ?? "User");
            if (success)
            {
                return Ok(new { message = "Registrierung erfolgreich!" });
            }
            else
            {
                return BadRequest(new { error = "Benutzername existiert bereits." });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var loggedInUser = _authService.Login(user.Username, user.PasswordHash);
            if (loggedInUser != null)
            {
                return Ok(new { message = "Login erfolgreich!", user = loggedInUser });
            }
            else
            {
                return Unauthorized(new { error = "Falscher Benutzername oder Passwort." });
            }
        }
    }
}

public class UserDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
}