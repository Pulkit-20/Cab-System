const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookCabRoutes = require("./routes/bookCabRoutes");
const cabRoutes = require("./routes/cabRoutes");
const locationRoutes = require("./routes/locationRoutes");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/book", bookCabRoutes);
app.use("/cab", cabRoutes);
app.use("/location", locationRoutes);

// Deployement

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
// ------

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server added on PORT ${PORT}`));
