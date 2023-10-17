const mongoose = require("mongoose")
require("dotenv").config()
const dbPort = process.env.DB_PORT
console.log(dbPort)
const connectDb = ()=>{
    try {
        mongoose.connect(dbPort)
        console.log("db is connect")
    }catch (e){
        console.log("db is not connec")
    }
}

module.exports = connectDb