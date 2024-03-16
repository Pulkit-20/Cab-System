const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Configure your email provider here
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bookcab350@gmail.com",
    pass: "andw raeo tymi brea",
  },
});

// Controller function for sending emails
const sendEmail = async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: "bookcab350@gmail.com",
      to: recipientEmail,
      subject: subject,
      text: message,
    });
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

module.exports = {
  sendEmail,
};
