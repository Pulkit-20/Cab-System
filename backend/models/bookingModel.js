const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },
  startLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  endLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  bookingDateTime: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000),
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
