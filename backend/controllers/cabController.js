const Cab = require("../models/cabModel"); 
const Booking = require("../models/bookingModel");

async function addCab(req, res) {
  try {
    const { cabType, cabPrice, cabPic } = req.body;

    const newCab = new Cab({
      cabType,
      cabPrice,
      cabPic,
    });

    await newCab.save();

    res.status(201).json({ message: "Cab added successfully", cab: newCab });
  } catch (error) {
    console.error("Error adding cab:", error);
    res.status(500).json({ message: "Error adding cab", error: error.message });
  }
};
async function fetchCabs(req, res) {
  try {
    const cabs = await Cab.find();
    res.status(200).json(cabs);
  } catch (error) {
    console.error('Error fetching cabs:', error);
    res.status(500).json({ message: 'Error fetching cabs', error: error.message });
  }
}
async function editCab(req, res) {
  try {
    const cabId = req.params.id; 
    const { cabType, cabPrice, cabPic } = req.body;

    // Check if the cab exists
    const cab = await Cab.findById(cabId);
    if (!cab) {
      return res.status(404).json({ message: "Cab not found" });
    }

    // Update cab details
    cab.cabType = cabType;
    cab.cabPrice = cabPrice;
    cab.cabPic = cabPic;

    // Save the updated cab
    await cab.save();

    res.status(200).json({ message: "Cab updated successfully", cab });
  } catch (error) {
    console.error("Error editing cab:", error);
    res
      .status(500)
      .json({ message: "Error editing cab", error: error.message });
  }
}
module.exports = { addCab, fetchCabs, editCab};
