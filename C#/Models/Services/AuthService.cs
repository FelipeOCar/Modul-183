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
        private readonly string _filePath = "users/users.txt"; // Path to your local file storing user data in the "users" folder

        public bool Register(string username, string password, string role = "User")
        {
            var users = LoadUsersFromFile();
            var existingUser = users.Find(u => u.Username == username);

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

            // Append new user to the file
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

        // Load all users from the file
        private List<User> LoadUsersFromFile()
        {
            var users = new List<User>();

            if (File.Exists(_filePath))
            {
                var lines = File.ReadAllLines(_filePath);
                foreach (var line in lines)
                {
                    var userParts = line.Split(',');
                    if (userParts.Length == 3) // Ensure the line has the correct format
                    {
                        var user = new User
                        {
                            Username = userParts[0],
                            PasswordHash = userParts[1],
                            Role = userParts[2]
                        };
                        users.Add(user);
                    }
                }
            }

            return users;
        }

        // Save a new user to the file
        private void SaveUserToFile(User user)
        {
            var line = $"{user.Username},{user.PasswordHash},{user.Role}";
            File.AppendAllText(_filePath, line + Environment.NewLine);
        }
    }
}
