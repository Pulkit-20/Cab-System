const mongoose = require("mongoose");

const cabSchema = mongoose.Schema({
  cabType: { type: String, required: true },
  cabPrice: { type: Number, required: true },
  availability: {
    type: Boolean,
    default: true,
  },
  cabPic: {
    type: String,
    required: true,
    default:
      "https://github.com/Pulkit-20/Photos/blob/main/vecteezy_taxi-yellow-car-vector-image_7006931.jpg",
  },
});

const Cab = mongoose.model("Cab", cabSchema);
module.exports = Cab;
