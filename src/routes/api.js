const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authUserVerifyMiddleware = require("../middlewares/authUserVerifyMiddleware")
// student register routes
router.post("/register",studentController.create);
// login routes
router.post("/login",studentController.login);
// profile details api
router.get("/profile-details",authUserVerifyMiddleware,studentController.profileDetails)




module.exports = router