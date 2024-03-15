const express = require("express");
const { bookCab, trackCabs } = require("../controllers/bookingController");

const router = express.Router();

router.route("/").post(bookCab);
router.route("/track").get(trackCabs);

module.exports = router;