using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using BaselCoinProject.Models;

namespace BaselCoinProject.Services
{
    public class AuthService
    {
        private readonly string _filePath = "users/users.txt";

        public bool Register(string username, string password, string role = "User")
        {
            var users = LoadUsersFromFile();
            if (users.Exists(u => u.Username == username))
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
            SaveUserToFile(newUser);
            Console.WriteLine("Registrierung erfolgreich!");
            return true;
        }

        public User? Login(string username, string password)
        {
            var users = LoadUsersFromFile();
            var user = users.Find(u => u.Username == username);
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

        private List<User> LoadUsersFromFile()
        {
            var users = new List<User>();
            if (File.Exists(_filePath))
            {
                foreach (var line in File.ReadAllLines(_filePath))
                {
                    var parts = line.Split(",");
                    if (parts.Length == 3)
                    {
                        users.Add(new User { Username = parts[0], PasswordHash = parts[1], Role = parts[2] });
                    }
                }
            }
            return users;
        }

        private void SaveUserToFile(User user)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "users");
            File.AppendAllText(_filePath, $"{user.Username},{user.PasswordHash},{user.Role}{Environment.NewLine}");
        }
    }
}