using MongoDB.Driver;
using BaselCoinProject.Models;

namespace BaselCoinProject.Services
{
    public class DatabaseService
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<User> _usersCollection;

        public DatabaseService()
        {
            var client = new MongoClient("mongodb://localhost:27017"); // Deine MongoDB-URI hier eintragen
            _database = client.GetDatabase("BaselCoinDB");
            _usersCollection = _database.GetCollection<User>("Users");
        }

        public IMongoCollection<User> GetUsersCollection() => _usersCollection;
    }
}
