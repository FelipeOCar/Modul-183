const fs = require('fs'); // Import the fs module

function logAction(actionType, username, role) {
    const log = {
        timestamp: new Date().toISOString(),
        eventType: actionType,
        user: username,
        role: role, // Add the role information
        action: `${actionType} action performed by ${role}`
    };

    const logMessage = JSON.stringify(log) + '\n'; // Convert log object to string and add a newline
    
    // Save the log message to a file
    fs.appendFile('userLogs.txt', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Log saved successfully');
        }
    });
}

// Example usage:
logAction('login', 'adminUser', 'Admin'); // Log admin login action
logAction('register', 'user1', 'User'); // Log user registration action
logAction('register', 'user2', 'User'); // Log another user registration action
