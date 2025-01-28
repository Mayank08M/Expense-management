require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB with logging
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB is connected.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
