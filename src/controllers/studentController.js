const studentsModel = require("../models/studentsModel");
const sendEmailUtility = require("../utility/sendEmailUtility");
const otpModel = require('../models/otpModel')
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
        res.status(500).json({
            status  : "Fail",
            error : e.toString()
        })
    }
}

// user profile update

exports.profileUpdate = async (req,res) =>{
    try {
        let email = req.headers.email
        let id = req.params.id
        let query = {
            _id : id,
            email : email
        }
        let result = await studentsModel.updateOne(query,{
            firstName :req.body.firstName,
            lastName : req.body.lastName,
            mobile : req.body.mobile,
            password : req.body.password,
            roll :  req.body.roll,
            class : req.body.class
        });
        res.status(200).json({
            status: "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status  : "Fail",
            error : e.toString()
        })
    }
}

 // user profile delete

exports.profileDelete = async (req,res) =>{
    try {
        let id = req.params.id
        let email  = req.headers["email"]
        let query = {
            _id : id,
            email :  email
        }
        let result = await studentsModel.deleteOne(query);
        res.status(200).json({
            status: "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status  : "Fail",
            error : e.toString()
        })
    }
}

// recovery verify email

exports.recoveryEmailVerify = async (req,res)=>{
    try {
        let email = req.params.email
        let otpCode = Math.floor(100000 + Math.random() * 900000 );
        let emailSubject = "Verification code is "
        let emailText = "Your verification code is = " + otpCode;
        let result = await studentsModel.find({email:email}).count();
        if (result===1){
            await sendEmailUtility(email,emailSubject,emailText);
            await otpModel.create({email:email,otp:otpCode});
            res.status(200).json({
                status : "success",
                data : " 6 digits verification code has been send successfully "
            })
        }else {
            res.status(401).json({
                status : "Unauthorized"
            })
        }
    }catch (e){
        res.status(500).json({
            status  : "Fail",
            error : e.toString()
        })
    }
}

// otp verify

exports.verifyEmailOtp = async (req,res)=>{
    try {
        let email = req.body.email;
        let otpCode = req.body.otp;
        let statusUpdate = 1;
        let result = await otpModel.find({email:email,otp:otpCode}).count();
        if(result===1){
            await otpModel.updateOne({email:email,otp:otpCode},{status:statusUpdate});
            res.status(200).json({
                status : "Success",
                data : "Otp verification successfully"
            })
        }else {
            res.status(401).json({
                status : "Unauthorized"
            })
        }
    }catch (e){
        res.status(500).json({
            status  : "Fail",
            error : e.toString()
        })
    }
}
// reset password

exports.emailResetPassword = async (req,res)=>{
    try {
        let email = req.body.email;
        let  newPassword = req.body.password;
        let otpCode = req.body.otp
        let statusUpdate = 1;
        let result = await otpModel.find({email:email,otp:otpCode,status:statusUpdate}).count();
        if(result===1){
            await studentsModel.updateOne({email:email},{password:newPassword})
            res.status(200).json({
                status : "success",
                data : "Password reset successfully"
            })
        }
    }catch (e){

    }
}



































































