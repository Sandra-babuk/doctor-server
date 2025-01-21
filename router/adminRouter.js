const express = require('express');
const adminController = require('../controller/adminController');
const multerMiddleware = require('../middleware/multerMiddleware');
const authAdmin = require('../middleware/jwtMiddleware'); // Updated JWT Middleware

const adminRouter = new express.Router();

// Admin login route
adminRouter.post('/admin-login', adminController.adminLoginController);

// Add doctor route (protected with JWT auth)
adminRouter.post('/add-doctor', authAdmin,multerMiddleware.single('image'),adminController.adminAddController);

module.exports = adminRouter;
