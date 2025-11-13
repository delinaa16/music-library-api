import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import songRoutes from "./routes/Song.js";

dotenv.config(); // Load environment variables from .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Create Express app

// =====================
// Middleware
// =====================
app.use(cors());            // Enable CORS for front-end requests
app.use(express.json());    // Parse JSON request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// =====================
// Routes
// =====================
app.use("/songs", songRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Music library API is running");
});

// =====================
// Connect to MongoDB
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// =====================
// Start server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
