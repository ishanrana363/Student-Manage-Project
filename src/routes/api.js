const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authUserVerifyMiddleware = require("../middlewares/authUserVerifyMiddleware");
const workController = require("../controllers/workController")
// student register routes
router.post("/register",studentController.create);
// login routes
router.post("/login",studentController.login);
// profile details api
router.get("/profile-details",authUserVerifyMiddleware,studentController.profileDetails);
// profile update api
router.post("/profile-update/:id",authUserVerifyMiddleware,studentController.profileUpdate);
// profile delete routes
router.delete("/profile-delete/:id",authUserVerifyMiddleware,studentController.profileDelete)
// email recovery with api routes
router.get("/recovery-email-verify/:email",studentController.recoveryEmailVerify);
router.get("/verify-email-otp",studentController.verifyEmailOtp);
router.post("/reset-password",studentController.emailResetPassword)


// work controller routes

// create
router.post("/create",authUserVerifyMiddleware,workController.create);
router.get("/find-by-status/:status",authUserVerifyMiddleware,workController.findByStatus);
router.post("/status-update/:id",authUserVerifyMiddleware,workController.statusUpdate);
router.post("/update/:id",authUserVerifyMiddleware,workController.update);
router.delete("/delete/:id",authUserVerifyMiddleware,workController.delete);
router.get("/status-count",authUserVerifyMiddleware,workController.statusCount)


module.exports = router