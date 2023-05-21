import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    watchlist:{
        type:Array,
        default:[]
    },
    favouritegenre:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

},{timestamps:true})
export default mongoose.model("Users",UserSchema)

