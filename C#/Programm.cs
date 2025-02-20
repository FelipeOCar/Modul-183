using BaselCoinProject.Services;
using BaselCoinProject.Controllers;
using MongoDB.Driver;

class Program
{
    static void Main()
    {
        var databaseService = new DatabaseService();
        var authService = new AuthService(databaseService);
        var userController = new UserController(authService);

        Console.WriteLine("Willkommen bei Basel Coin!");
        
        while (true)
        {
            Console.WriteLine("\n1. Registrieren\n2. Login\n3. Beenden");
            Console.Write("Auswahl: ");
            var choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    userController.RegisterUser();
                    break;
                case "2":
                    userController.LoginUser();
                    break;
                case "3":
                    Console.WriteLine("Programm beendet.");
                    return;
                default:
                    Console.WriteLine("Ungültige Auswahl, bitte erneut versuchen.");
                    break;
            }
        }
    }
}
