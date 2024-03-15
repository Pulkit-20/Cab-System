const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },
  sourceLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  destinationLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  travelTime: {
    type: Number,
    required: true
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  bookingDateTime: {
    type: Date,
  },
  endTime: {
    type: Date,
    required: true
  },
  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cab",
    required: true,
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
