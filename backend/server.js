const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5340;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_app';

// Enhanced MongoDB connection with Atlas support
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    
    // Check if using Atlas
    if (MONGODB_URI.includes('mongodb+srv')) {
      console.log('☁️  Using MongoDB Atlas (Cloud)');
    } else {
      console.log('💻 Using Local MongoDB');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('authentication failed')) {
      console.error('🔐 Check your username and password in the connection string');
    }
    if (error.message.includes('IP address')) {
      console.error('🌍 Check your IP whitelist in MongoDB Atlas Network Access');
    }
    
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Social Media API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Social Media API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      posts: {
        getAllPosts: 'GET /api/posts',
        getPostsByCategory: 'GET /api/posts/:category',
        createPost: 'POST /api/posts',
        updateLikes: 'PUT /api/posts/:id/like',
        deletePost: 'DELETE /api/posts/:id'
      }
    }
  });
});

// Connect to MongoDB (Atlas or Local)
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
