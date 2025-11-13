import mongoose from "mongoose";

//define schema
const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: String,
    genre: String,
    year: Number,
    duration: String
});

//Create a model
const Song = mongoose.model("Song",songSchema);

export default Song;