const mongoose = require("mongoose")

const clientSchema= new mongoose.Schema({
    name:String,
    lastName:String,
    phoneNumber:String,
    project:String,
    email:String
})

let ClientModel = mongoose.model("client",clientSchema )

module.exports= ClientModel;