const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('../models/User');
const auth = express.Router(); // Changed the router variable name to auth
const flash = require('connect-flash');
auth.use(flash());

// Session middleware setup
auth.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Use 'secure: true' in production with HTTPS
  })
);

// Initialize Passport
auth.use(passport.initialize());
auth.use(passport.session());
auth.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Login</title>
    </head>
    <body>
      <h1>User Login</h1>
      <form action="/auth/login" method="post"> <!-- Updated action to /auth/login -->
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Login">
      </form>
    </body>
    </html>
  `);
});
// Route for rendering user registration form
auth.get('/register', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Registration</title>
    </head>
    <body>
      <h1>User Registration</h1>
      <form action="/auth/register" method="post"> <!-- Updated action to /auth/register -->
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Register">
      </form>
    </body>
    </html>
  `);
});

// Route for user registration
auth.post('/register', async (req, res)  => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user instance with provided username and password
    const newUser = new User({ username, password });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Route for user login
auth.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirect on successful login
  failureRedirect: '/login', // Redirect on failed login
  failureFlash: true // Enable flash messages for failures
}));

// Route for user logout
auth.post('/auth/logout', (req, res) => {
  req.logout(); // Passport method to log out
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});

module.exports = auth;
