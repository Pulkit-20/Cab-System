const express = require("express");
const {
  addLocation,
  fetchLocations,
} = require("../controllers/locationController");

const router = express.Router();
router.route("/add").post(addLocation);
router.route("/").get(fetchLocations);

module.exports = router;
