const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// POST endpoint for sending emails
router.post("/send", emailController.sendEmail);

module.exports = router;
