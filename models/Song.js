import mongoose from "mongoose";

//define a schema;

const songSchema = new mongoose.Schema({
    title:{
           type:String,
           required:true
        },
    artist:{
           type:String,
           required:true
        },
    album: String,
    genre: String,
    year: Number,
    duration: String,

    // NEW FIELD: favorite system

    isFavorite:{
        type: Boolean,
        default: false
    }
});
//create a model
export default mongoose.model("Song",songSchema);















