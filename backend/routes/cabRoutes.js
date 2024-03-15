const express = require("express");
const { addCab, fetchCabs, editCab } = require("../controllers/cabController");

const router = express.Router();

router.route("/add").post(addCab);
router.route("/").get(fetchCabs);
router.route("/edit/:id").put(editCab);

module.exports = router;
