const mongoose = require("mongoose");

const cabScheduleSchema = new mongoose.Schema({
  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cab",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  sourceLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  destinationLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

const CabSchedule = mongoose.model("CabSchedule", cabScheduleSchema);

module.exports = CabSchedule;
