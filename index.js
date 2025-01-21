require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./connection/dbConnection'); 
const adminRouter = require('./router/adminRouter'); 

const doctorServer = express();

// Middlewares
doctorServer.use(cors());
doctorServer.use(express.json());
doctorServer.use('/admin', adminRouter);
doctorServer.use('/uploads', express.static('./uploads')); 

doctorServer.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Doctor Server</h1>");
});

const PORT = process.env.PORT || 3000;

// Start the server
doctorServer.listen(PORT, () => {
  console.log(`doctorServer started at PORT: ${PORT} and waiting for the client request...`);
});
