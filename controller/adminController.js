const validator = require('validator');
const doctors = require('../model/doctorModel');
const bcrypt = require('bcrypt')
const { v2: cloudinary } = require('cloudinary');
const jwt = require('jsonwebtoken')



// admin login

exports.adminLoginController = async (req, res) => {
  console.log('inside adminLoginController');

  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, password }, process.env.JWT_PASSWORD);
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(404).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};


// add doctor 
exports.adminAddController = async (req,res) =>{
  console.log("inside adminAddController ");

  try {
    const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
    const imageFile = req.imageFile

    console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile);

    // all data required
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
      return res.json({success:false,message:"all fields required"})
    }

    // validating email
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"please enter a valid email"})
    }

    // password
    if (password.length < 8){
      return res.json({success:false,message:"please enter a strong password"})

    }
    // hashing password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // upload image to cloud
    const imageUpload =  await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const doctorData ={
      name,
      email,
      Image:imageUrl,
      password:hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address:JSON.parse(address),
      date:Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({success:true,message:"Doctor added"})


    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
    
  }
  
}





