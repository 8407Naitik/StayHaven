const express = require('express');
const app = express();
const PORT = 5000;

// A simple test route (API Endpoint)
app.get('/', (req, res) => {
  res.send('Welcome to the Smart Room & Mess Finder Backend API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}`);
});