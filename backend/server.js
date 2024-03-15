const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookCabRoutes = require("./routes/bookCabRoutes");
const cabRoutes = require("./routes/cabRoutes");
const locationRoutes = require("./routes/locationRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/book", bookCabRoutes);
app.use("/cab", cabRoutes);
app.use("/location", locationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server added on PORT ${PORT}`));
