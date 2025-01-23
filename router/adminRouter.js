const express = require('express');
const adminController = require('../controller/adminController');
const doctorController = require('../controller/doctorController')

const adminRouter = new express.Router();

// Admin login route
adminRouter.post('/admin-login', adminController.adminLoginController);

// Add doctor route
adminRouter.post('/add-doctor', adminController.addDoctorController);
// get doctor
adminRouter.get('/get-doctor',adminController.getAllDoctor)
// Update availability route
adminRouter.post('/update-availability', doctorController.doctorAvailability); 

module.exports = adminRouter;
