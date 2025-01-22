require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const path = require('path'); // To handle file paths correctly
require('./connection/dbConnection'); // Make sure your database connection is correctly configured
const adminRouter = require('./router/adminRouter'); // Import the admin router

const doctorServer = express();

// Middleware setup
doctorServer.use(cors()); // Enable CORS for all routes
doctorServer.use(express.json()); // Parse incoming JSON requests
doctorServer.use('/admin', adminRouter); // Mount the adminRouter at '/admin'
doctorServer.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files (uploaded images)

// Root route (testing server)
doctorServer.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Doctor Server</h1>");
});

const PORT = process.env.PORT || 3000; // Port setup (using .env if available)

// Start the server and listen on the configured port
doctorServer.listen(PORT, () => {
  console.log(`Doctor server started at PORT: ${PORT} and waiting for client requests...`);
});
