const express = require("express");
const { bookCab } = require("../controllers/bookingController");

const router = express.Router();

router.route("/").post(bookCab);

module.exports = router;