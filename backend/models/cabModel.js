const mongoose = require("mongoose");

const cabSchema = mongoose.Schema({
  cabType: { type: String, required: true },
  cabPrice: { type: Integer, required: true },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Cab = mongoose.model("Cab", cabSchema);
module.exports = Cab;
