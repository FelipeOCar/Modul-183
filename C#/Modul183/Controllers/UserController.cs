[ApiController]
[Route("api")]
public class UserController : ControllerBase
{
    private readonly AuthService _authService;

    public UserController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserDto userDto)
    {
        if (string.IsNullOrWhiteSpace(userDto.Username) || string.IsNullOrWhiteSpace(userDto.Password))
        {
            return BadRequest(new { error = "Benutzername und Passwort dürfen nicht leer sein." });
        }

        bool success = _authService.Register(userDto.Username, userDto.Password, userDto.Role ?? "User");
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
    public IActionResult Login([FromBody] UserDto userDto)
    {
        var user = _authService.Login(userDto.Username, userDto.Password);
        if (user != null)
        {
            return Ok(new { message = "Login erfolgreich!", user });
        }
        else
        {
            return Unauthorized(new { error = "Falscher Benutzername oder Passwort." });
        }
    }
}

public class UserDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
}