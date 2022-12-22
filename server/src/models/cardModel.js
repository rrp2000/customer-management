import mongoose, { Mongoose } from "mongoose";

const cardSchema = new mongoose.Schema({

    cardNumber:{
        type: String,
        trim:true
    },
    cardType:{
        type: String,
        enum:["REGULAR","SPECIAL"],
        required:true,
        trim:true
    },
    customerName:{
        type: String,
        required:true,
        trim:true
    },
    status:{
        type: String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE",
        trim:true
    },
    vision:{
        type: String,
        required:true,
        trim:true
    },
    customerID:{
        type: mongoose.Types.ObjectId,
        ref:"Customer",
        required:true,
        trim:true
    },
},{timestamps:true})

let cardModel= new mongoose.model("card",cardSchema)

export default cardModel