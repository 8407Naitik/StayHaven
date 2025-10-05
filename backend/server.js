// backend/server.js

const express = require('express');
const dotenv = require('dotenv').config(); 
const { connectDB, sequelize } = require('./config/db'); 
const Room = require('./models/Room'); 
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = 5000;
const app = express();

// Middleware to allow the server to read JSON data from the client
app.use(express.json()); 
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

// Function to initialize the database connection and sync models
const initializeApp = async () => {
    try {
        await connectDB(); // Step 1: Connect to Neon DB

        // Step 2: Synchronize the models (create/update tables)
        await sequelize.sync({ alter: true }); 
        console.log('All Sequelize models synchronized successfully.');

        // Start the server only after the DB is ready
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
          console.log(`Test URL: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Initialization Failed:", error);
        process.exit(1);
    }
};

// === ROUTES (API Endpoints) GO HERE ===

// Simple test route (API Endpoint)
app.get('/', (req, res) => {
  res.send('Welcome to the Smart Room & Mess Finder Backend API!');
});


// Execute the initialization function
initializeApp();