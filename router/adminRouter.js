const express = require('express');
const adminController = require('../controller/adminController');

const adminRouter = new express.Router();

// Admin login route
adminRouter.post('/admin-login', adminController.adminLoginController);

// Add doctor route
adminRouter.post('/add-doctor', adminController.addDoctorController);
// get doctor
adminRouter.get('/get-doctor',adminController.getAllDoctor)

module.exports = adminRouter;
