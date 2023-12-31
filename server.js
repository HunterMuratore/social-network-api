const express = require('express');
const session = require('express-session');

const user_routes = require('./controllers/user_routes');
const friends_routes = require('./controllers/friends_routes');
const thoughts_routes = require('./controllers/thoughts_routes');
const reactions_routes = require('./controllers/reactions_routes');

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
app.use('/api', user_routes, friends_routes, thoughts_routes, reactions_routes);

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