const applicationRoutes = require("./routes/applicationRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Database Connection
const connectDB = require("./config/db");

// Import Routes
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 JobTrack Pro API Running...");
});

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});