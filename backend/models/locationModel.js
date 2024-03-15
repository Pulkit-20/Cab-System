const mongoose = require("mongoose");

// Adjacency schema
const adjacencySchema = new mongoose.Schema({
  adjLocationName: {
    type: String,
  },
  timeInMinutes: {
    type: Number,
  },
});

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  adjacencyList: [adjacencySchema], // Array of adjacency objects
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
