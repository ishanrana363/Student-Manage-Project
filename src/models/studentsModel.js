const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    mobile : {
        type : String
    },
    password : {
        type : String
    },
    roll : {
        type : String
    },
    class : {
        type : String
    }
},{timestamps:true,versionKey:false})

const studentModel  = mongoose.model("studentData",dataSchema)

module.exports = studentModel




































