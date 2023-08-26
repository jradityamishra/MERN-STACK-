import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unquie:true
    },
    password:{
        type:String,
        required:true,

    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type : String ,
        required:true
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0 // 0 for admin and 1 for customer
    },

}, {timestamps: true}) // timestemps tell the register time of new user

export default mongoose.model('users',userSchema);