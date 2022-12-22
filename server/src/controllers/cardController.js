import mongoose from "mongoose";
import cardModel from "../models/cardModel.js";
import customerModel from "../models/customerModel.js";
import * as validator from "../validator/validator.js"

//create card

const createCard = async (req,res)=>{
    try {

        let cardData = req.body
        if(Object.keys(cardData).length===0) return res.status(400).send({status:false,message:"GIve data to create card"})
        console.log(cardData)
        let {
            cardType,
            customerName,
            status,
            vision,
            customerID } = cardData


        //validation for cardNumber
        
        let cards = await cardModel.find()
        cardData.cardNumber = "C"+(cards.length+1).toString().padStart((4-cards.length.toString().length), '0')

        //validations for cardType
        if(validator.validateString(cardType)) return res.status(400).send({status:false, message:`cardType ${validator.validateString(cardType)}`})
        if(["REGULAR","SPECIAL"].indexOf(cardType)===-1) return res.status(400).send({status:false, message:`cardType can eiter REGULAR or SPECIAL.`})

        //validations for customerName
        if(validator.validateString(customerName)) return res.status(400).send({status:false, message:`Customer Name ${validator.validateString(customerName)}`})
        if(!validator.checkOnlyLetters(customerName)) return res.status(400).send({status:false, message: "customerName can only contain letters."})

        //validation for status
        if(status){
            if(validator.validateString(status)) return res.status(400).send({status:false, message:`status ${validator.validateString(status)}`})
            if(["ACTIVE","INACTIVE"].indexOf(status)===-1) return res.status(400).send({status:false, message:`status can eiter ACTIVE or INACTIVE`})
        }

        //validations for vision
        if(validator.validateString(vision)) return res.status(400).send({status:false, message:`vision ${validator.validateString(vision)}`})

        //validations for customerID
        if(validator.validateString(customerID)) return res.status(400).send({status:false, message:`CustomerID ${validator.validateString(customerID)}`})
        if(!mongoose.Types.ObjectId.isValid(customerID)) return res.status(400).send({status:false, message:"Enter a valid customer ObjectID"})
        if(!await customerModel.findById(customerID)) return res.status(400).send({status:false, message:`No such customer with id ${customerID}`})

        let createdCard = await cardModel.create(cardData)
        return res.status(201).send({status:true, message: "Created", data: createdCard})


    } catch (error) {
       return res.status(500).send({status:false,message:error.message})
    }
}


//get all cards

const getCards = async (req,res)=>{
    try {

        let cards = await cardModel.find()
        if(cards.length===0) return res.status(400).send({status:false, message: "no cards found"})

        return res.status(200).send({status:true, data:cards})
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

export {createCard,getCards}