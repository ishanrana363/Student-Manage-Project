const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController")
// student register routes
router.post("/register",studentController.create);




module.exports = router