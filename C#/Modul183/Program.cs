using BaselCoinProject.Services;

var builder = WebApplication.CreateBuilder(args);

// API-Controller aktivieren
builder.Services.AddControllers();

// AuthService zur Dependency Injection hinzufügen!
builder.Services.AddSingleton<AuthService>();

// OpenAPI (Swagger)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware konfigurieren
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// API-Controller registrieren
app.MapControllers();

app.Run();
