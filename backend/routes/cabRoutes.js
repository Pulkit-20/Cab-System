const express = require("express");
const { addCab, fetchCabs } = require("../controllers/cabController");

const router = express.Router();

router.route("/add").post(addCab);
router.route("/").get(fetchCabs);

module.exports = router;
