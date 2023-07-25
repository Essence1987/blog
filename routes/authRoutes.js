const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign-up route - Display sign-up form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Sign-up route - Handle form submission
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await User.create({ username, password: hashedPassword });

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Login route - Display login form
router.get('/login', (req, res) => {
  res.render('login'); 
});

// Login route - Handle form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Username.' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Password.' });
    }

    // Set the user in the session to mark them as logged in
    req.session.user = user;

    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }

    return res.status(200).json({ message: 'Logout successful.' });
  });
});

module.exports = router;
