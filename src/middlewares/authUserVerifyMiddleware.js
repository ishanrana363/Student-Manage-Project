const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports = async (req,res,next)=>{
    let token = req.headers["token"]
    jwt.verify(token,process.env.JWT_SECREATE,(err,decoded)=>{
        if (err){
            res.status(401).json({
                status : "Unauthorized"
            })
        }else {
            let email = decoded["data"];
            console.log(email);
            req.headers.email = email;
            next()
        }
    })
}