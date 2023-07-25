const express = require('express');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import models
const User = require('./models/User');
const BlogPost = require('./models/BlogPost');
const Comment = require('./models/Comment');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    })
);
app.set('view engine', 'handlebars');

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up models with associations
User.hasMany(BlogPost, { onDelete: 'CASCADE', hooks: true });
User.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
BlogPost.belongsTo(User, { foreignKey: 'userId', allowNull: false });
BlogPost.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(User, { foreignKey: 'userId', allowNull: false });
Comment.belongsTo(BlogPost, { foreignKey: 'blogPostId', allowNull: false });

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Sync models with the database
async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Models synced with the database.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

// Initialize the application
async function startApp() {
  await testDatabaseConnection();
  await syncModels();

// Require authMiddleware
const authMiddleware = require('./middleware/authMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Home Route
app.get('/', async (req, res) => {
    res.render('home');
});

// Dashboard Route (protected by authMiddleware that requires authentication)
app.get('/dashboard', authMiddleware.checkAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startApp();
