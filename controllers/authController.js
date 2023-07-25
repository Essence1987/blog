const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { json } = require('body-parser');

// Signup Controller - Handle form submission
async function signup(req, res) {
    const { username, password } = req.body;

    try{
        // Check if username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400),json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await User.create({ username, password: hashedPassword });

        return res.status(201).json({ message: 'User created succesfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

// Login Controller - Handle form submission
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Set the user in the session to keep them logged in
        req.session.user = user;

        return res.status(200).json({ message: 'User logged in succesfully' });
    } catch (error) {
        console.error('Error logging in user', error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

// Logout controller - Handle form submission
function logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
      }
  
      return res.status(200).json({ message: 'Logout successful.' });
    });
  }

module.exports = {
    signup,
    login,
    logout
};