import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import router from "./routes/route.js"

const app = express()

app.use(bodyParser.json())
app.use("/",router)


mongoose.connect("mongodb+srv://spacespider:admin@cluster0.0ps1ymn.mongodb.net/customer-management").then(()=>console.log("mongodb connected....")).catch(err=> console.log(err))
app.listen(4000,()=>console.log("express running on 4000..."))
