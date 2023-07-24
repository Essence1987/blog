const express = require('express');
const database = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Test database connection
async function testDatabaseConnection() {
    try {
        await database.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDatabaseConnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
