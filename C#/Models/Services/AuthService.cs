using MongoDB.Driver;
using BaselCoinProject.Models;
using System.Security.Cryptography;
using System.Text;

namespace BaselCoinProject.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public AuthService(DatabaseService databaseService)
        {
            _usersCollection = databaseService.GetUsersCollection();
        }

        public bool Register(string username, string password, string role = "User")
        {
            var existingUser = _usersCollection.Find(u => u.Username == username).FirstOrDefault();
            if (existingUser != null)
            {
                Console.WriteLine("Benutzername existiert bereits.");
                return false;
            }

            var newUser = new User
            {
                Username = username,
                PasswordHash = HashPassword(password),
                Role = role
            };

            _usersCollection.InsertOne(newUser);
            Console.WriteLine("Registrierung erfolgreich!");
            return true;
        }

        public User? Login(string username, string password)
        {
            var user = _usersCollection.Find(u => u.Username == username).FirstOrDefault();
            if (user == null || !VerifyPassword(password, user.PasswordHash))
            {
                Console.WriteLine("Falscher Benutzername oder Passwort.");
                return null;
            }

            Console.WriteLine($"Login erfolgreich! Willkommen, {user.Username} ({user.Role})");
            return user;
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return HashPassword(password) == storedHash;
        }
    }
}
