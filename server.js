import express from "express";
import mongoose from "mongoose"; // fixed spelling
import dotenv from "dotenv";
import songRoutes from "./routes/Song.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


dotenv.config(); // Load .env variables

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use((req,res,next)=>{
    console.log(`$req.method} ${req.url}`);
    next();
});

app.use("/songs", songRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
    res.send(" Music library API is running");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
