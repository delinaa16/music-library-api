import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

// =====================
// GET all songs
// =====================
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find(); // Get all songs from DB
    res.json(songs);                 // Send songs as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// POST a new song
// =====================
router.post("/", async (req, res) => {
  const { title, artist, album, genre, year, duration } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ message: "Title and artist are required" });
  }

  const song = new Song({ title, artist, album, genre, year, duration });

  try {
    const newSong = await song.save(); // Save song to DB
    res.status(201).json(newSong);     // Send back the saved song
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// =====================
// PUT - UPDATE a song by ID
// =====================
router.put("/:id", async (req, res) => {
  const { title, artist } = req.body;

  if (title === "" || artist === "") {
    return res.status(400).json({ message: "Title and artist cannot be empty" });
  }

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,  // Get ID from URL
      req.body,       // Update with data from request body
      { new: true }   // Return the updated song
    );

    if (!updatedSong)
      return res.status(404).json({ message: "Song not found" });

    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// =====================
// DELETE a song by ID
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id); // Delete song by ID

    if (!song)
      return res.status(404).json({ message: "Song not found" });

    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// SEARCH songs by title or artist
// =====================
router.get("/search", async (req, res) => {
  const { title, artist } = req.query;

  try {
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (artist) {
      query.artist = { $regex: artist, $options: "i" }; // Fixed: was using title instead of artist
    }

    const songs = await Song.find(query); // Fixed typo: SOng -> Song
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
