import express from "express";
import mongoose from "mongoose"; // fixed spelling
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();

app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
    res.send("🎵 Music library API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
