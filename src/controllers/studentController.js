const studentsModel = require("../models/studentsModel")

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