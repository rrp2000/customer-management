import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    mobileNumber:{
        type: String,
        required:true,
        trim:true
    },
    DOB:{
        type: Date,
        required:true,
        trim:true
    },
    emailID:{
        type: String,
        required:true,
        trim:true
    },
    address:{
        type: String,
        required:true,
        trim:true
    },
    
    customerID:{
        type: String,
        required:true,
        trim:true
    },
    
    status:{
        type: String,
        enum:["ACTIVE","INACTIVE"],
        required:true,
        trim:true
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    
},{timestamps:true})

let customerModel= new mongoose.model("Customer",customerSchema)

export default customerModel