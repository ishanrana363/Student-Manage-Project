const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : String
    },
    status : {
        type : Number,
        default : 0
    }

},{versionKey:false,timestamps:true})


const otpModel = mongoose.model("otp",dataSchema)

module.exports = otpModel


















