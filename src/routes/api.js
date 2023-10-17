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
// profile update api
router.post("/profile-update/:id",authUserVerifyMiddleware,studentController.profileUpdate)



module.exports = router