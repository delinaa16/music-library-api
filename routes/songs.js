import express from "express";
import song from "../models/Song.js";

const router = express.Router();

//Get all songs

router.get("/", async(req,res)=>{
    try{
        const songs = await Song.find();
        res.json(songs);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.post("/", async(req,res)=>{
    const{ title, artist, album, genre, year, duration} = req.body;
    const song = new Song({ title, artist, album, genre, year, duration});
    try{
        const newSong = await song.save();
        res.status(201).json(newSong);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});
export default router;