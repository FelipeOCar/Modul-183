const fs = require('fs'); // Import the fs module

const logFilePath = './users/userLogs.txt'; // Path to the userLogs.txt inside the "users" folder

function logAction(actionType, username, role) {
    const log = {
        timestamp: new Date().toISOString(),
        eventType: actionType,
        user: username,
        role: role, // Added role for more detailed logging
        action: `${actionType} action performed by ${role}`
    };

    const logMessage = JSON.stringify(log) + '\n'; // Convert log object to string and add a newline
    
    // Save the log message to a file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Log saved successfully');
        }
    });
}

// Example usage:
logAction('login', 'adminUser', 'Admin'); // Example: Log a login action by Admin
logAction('register', 'user1', 'User'); // Example: Log a register action by User
logAction('register', 'user2', 'User'); // Example: Log a register action by User
