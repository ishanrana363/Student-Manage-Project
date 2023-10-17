const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController")
// student register routes
router.post("/register",studentController.create);
// login routes
router.post("/login",studentController.login)




module.exports = router