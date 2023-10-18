const worksModel = require("../models/worksModel")
// work create

exports.create = async (req,res)=>{
    try {
        let reqBody = req.body;
        reqBody.email = req.headers["email"]
        let result = await worksModel.create(reqBody);
        res.status(201).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}

// work find by status

exports.findByStatus = async (req,res)=>{
    try {
        let status = req.params.status;
        let result = await worksModel.find({status:status});
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}

// update by status user id

exports.statusUpdate = async (req,res) =>{
    try {
        let id = req.params.id
        let email = req.headers["email"]
        let query = {
           _id : id,
            email : email
        }
        let status = req.body.status;
        let result = await worksModel.updateOne(query,{status:status});
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}


// all works update

exports.update = async (req,res) =>{
    try {
        let reqBody = req.body;
        let email = req.headers["email"];
        let  id = req.params.id;
        let query = {
            _id : id,
            email : email
        }
        let result = await worksModel.updateOne(query,{reqBody:reqBody});
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}


// delete status


exports.delete = async (req,res)=>{
    try {
        let email = req.headers["email"];
        let id = req.params.id
        let query = {
            _id : id,
            email : email
        }
        let result = await worksModel.deleteOne(query,{new:true});
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}


// status count

exports.statusCount = async (req,res)=>{
    try {
        let email = req.headers['email']
        let result = await worksModel.aggregate([{$match:{email:email}},
            {$group : {_id : "$status" , sum : {$count : {}}}}]);
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch (e){
        res.status(500).json({
            status : "fail",
            error : e.toString()
        })
    }
}













































