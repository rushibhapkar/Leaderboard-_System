const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 3005 )
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    // Initialize with default users if database is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUsers = [
        { name: 'Rahul' },
        { name: 'Kamal' },
        { name: 'Sanak' },
        { name: 'Priya' },
        { name: 'Arjun' },
        { name: 'Kavya' },
        { name: 'Rohit' },
        { name: 'Neha' },
        { name: 'Vikram' },
        { name: 'Ananya' }
      ];
      
      await User.insertMany(defaultUsers);
      console.log('Default users created');
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});