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
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 mins from current time for "Book Now"
  },
  endTime: {
    type: Date,
    required: true
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
