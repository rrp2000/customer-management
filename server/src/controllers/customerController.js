import mongoose from "mongoose";
import customerModel from "../models/customerModel.js";
import * as validator from "../validator/validator.js"

//create new customer

const createCustomer = async (req,res)=>{
    try {

        const customerData = req.body
        if(Object.keys(customerData).length==0) res.status(400).send({status:false, message:`Please give some data to create.`})
        console.log(customerData)
        const {
            firstName,
            lastName,
            mobileNumber,
            DOB,
            emailID,
            address,
            customerID,
            status
        } = customerData

        //validations for firstName
        if(validator.validateString(firstName)) return res.status(400).send({status:false, message:`First Name ${validator.validateString(firstName)}`})
        if(!validator.checkOnlyLetters(firstName)) return res.status(400).send({status:false, message: "FirstName can only contain letters."})

        //validations for lastName
        if(validator.validateString(lastName)) return res.status(400).send({status:false, message:`Last Name ${validator.validateString(lastName)}`})
        if(!validator.checkOnlyLetters(lastName)) return res.status(400).send({status:false, message: "LastName can only contain letters."})

        //validations for mobileNumber
        if(validator.validateString(mobileNumber)) return res.status(400).send({status:false, message:`Mobile number ${validator.validateString(mobileNumber)}`})
        if(!validator.checkOnlyNumbers(mobileNumber)) return res.status(400).send({status:false, message: "mobileNumber can only contain Numbers."})
        if(mobileNumber.length!=10) return res.status(400).send({status:false, message: "mobileNumber should contain 10 digits."})
        if(await customerModel.findOne({mobileNumber:mobileNumber}))return res.status(400).send({status:false, message:`MobileNUmber already exists`})

        //validations for DOB


        //validations for emailID
        if(validator.validateString(emailID)) return res.status(400).send({status:false, message:`emailID ${validator.validateString(emailID)}`})
        if(!validator.checkEmail(emailID)) return res.status(400).send({status:false, message: "Enter a valid email."})
        if(await customerModel.findOne({emailID:emailID}))return res.status(400).send({status:false, message:`EmailID already exists`})

        //validations for address
        if(validator.validateString(address)) return res.status(400).send({status:false, message:`Address ${validator.validateString(address)}`})
        
        //validations for customerId
        if(validator.validateString(customerID)) return res.status(400).send({status:false, message:`CustomerID ${validator.validateString(customerID)}`})

        //validations for status
        if(validator.validateString(status)) return res.status(400).send({status:false, message:`status ${validator.validateString(status)}`})
        if(["ACTIVE","INACTIVE"].indexOf(status)===-1) return res.status(400).send({status:false, message:`status can eiter ACTIVE or INACTIVE`})

        //creating Customer
        let createdCustomer = await customerModel.create(customerData)
        return res.status(201).send({status:true, message: "created", data:createdCustomer})
        
        
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}


//get all the customers

const getCustomers = async (req,res)=>{
    try {

        let customers = await customerModel.find({status:"ACTIVE",isDeleted:false})
        if(customers.length==0) return res.status(400).send({status:false, message: "There are no customers."})

        return res.status(200).send({status:true, data: customers})
        
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}


//delete customer

const deleteCustomer = async (req,res)=>{
    try {

        let id = req.params.id
        console.log(id)
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({status:false,message:"Give a valid customer ObjectId"})

        let customer = await customerModel.findOne({_id:id,isDeleted:false})
        if(!customer) return res.status(400).send({status:false, message: "This customer doesn't exists."})

        await customerModel.findOneAndUpdate({_id:id},{isDeleted:true})

        return res.status(200).send({status:true, message:"Customer deleted successfully."})
        
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}




export {createCustomer,getCustomers,deleteCustomer}