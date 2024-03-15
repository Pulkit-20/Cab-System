const Cab = require("../models/cabModel");

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
module.exports = { addCab, fetchCabs };
