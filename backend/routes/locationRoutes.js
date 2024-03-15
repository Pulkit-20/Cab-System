const express = require("express");
const { addLocation } = require("../controllers/locationController");

const router = express.Router();
router.route("/add").post(addLocation);

module.exports = router;
