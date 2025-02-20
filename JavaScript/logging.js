function logAction(actionType, username) {
    const log = {
        timestamp: new Date().toISOString(),
        eventType: actionType,
        user: username,
        action: `${actionType} action performed`
    };
    console.log(log); // Hier könnte man auch eine API oder eine Datenbank verwenden, um das Log zu speichern
}
