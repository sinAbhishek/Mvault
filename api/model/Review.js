import mongoose from "mongoose";

const ReviewSchema= new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    movieid:{
        type:String,
        required:true
    },
    Rating:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

},{timestamps:true})
export default mongoose.model("ReviewS",ReviewSchema)