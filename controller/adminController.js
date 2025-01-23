const doctors = require('../model/doctorModel');

// Admin Login 
exports.adminLoginController = async (req, res) => {
  console.log('Inside adminLoginController');

  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Doctor 
exports.addDoctorController = async (req, res) => {
  console.log("Inside addDoctorController");

  const { name, email, password,image, speciality, degree, experience, about, fees, address } = req.body;

  // Log the values to verify data
  console.log({ name, email, password,image, speciality, degree, experience, about, fees, address });

 

  try {
    // doctor already
    const existingDoctor = await doctors.findOne({ email });
    if (existingDoctor) {
      return res.status(406).json("Doctor already exists in our database. Please add another.");
    }

    // new doctor 
    const newDoctor = new doctors({
      name,
      email,
      password,
      image, 
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(), 
    });

    // Save
    await newDoctor.save();
    res.status(200).json(newDoctor); 
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal server error', details: err });
  }
};

// Get all doctors
exports.getAllDoctor = async (req,res)=>{
  console.log("Inside getAllDoctor");
  try {
      const allDoctors = await doctors.find({})
      res.status(200).json(allDoctors)
  } catch (err) {
      res.status(401).json(err)
  }
}
