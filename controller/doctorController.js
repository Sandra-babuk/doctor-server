
const doctorModel = require('../model/doctorModel');

exports.doctorAvailability = async (req, res) => {
  console.log('doctorAvailability');

  try {
    const { doctorId } = req.body;

    const docData = await doctorModel.findById(doctorId);
    await doctorModel.findByIdAndUpdate(doctorId, { available: !docData.available });
    res.status(200).json('Availability changed');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
};
