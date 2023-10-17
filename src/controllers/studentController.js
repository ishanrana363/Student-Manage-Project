const studentsModel = require("../models/studentsModel")
const jwt = require('jsonwebtoken')
require("dotenv").config()
// create

exports.create = async (req,res)=>{
    try {
        let reqBody = req.body
        let result = await studentsModel.create(reqBody);
        res.status(201).json({
            status : "Success",
            data : result
        })
    }catch (e){

    }
}

// login account

exports.login = async (req,res)=>{
    try {
        let secreatKey = process.env.JWT_SECREATE
        let reqBody = req.body
        let email = req.body["email"]
        let result = await studentsModel.find(reqBody).count()
        if (result===1){
            // create jwt token
            let payload = {
                exp: Math.floor(Date.now()/1000) + (24*60*60),
                data : reqBody["email"]
            }
            let Token = jwt.sign(payload,secreatKey)
            res.status(200).json({
                status : "success",
                data : Token
            })
        }else {
            res.status(401).json({
                status: "Unauthorized"
            })
        }
    }catch (e){
        res.status(500).json({
            status : "Fail",
            error : e.toString()
        })
    }
}

// profile details

exports.profileDetails = async (req,res)=>{
    try {
        let email = req.headers["email"];
        console.log(email)
        let reqBody = req.body;
        let result = await studentsModel.find({
            email:email,
        })
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){

    }
}




































































