const express = require('express');
const session = require('express-session');

require('dotenv').config();

const db = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3333;

// Load JSON Middleware
app.use(express.json());

// Load Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 10 * 60 * 1000, // Expires after 10 minutes
        httpOnly: true
     }
}));

// Load api routes

// Catch any unknown routes
app.use('*', (req, res) => {
    res.status(404).send({
        message: 'Route Not Found',
        error: 404
    });
});

// Open db connection and start server
db.on('open', () => {
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});