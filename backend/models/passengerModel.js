const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;
