const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const forgotPsswdController = require("../controllers/ForgotPsswdController");
const verifyCodeController = require("../controllers/VerifyCodeController");
const resetPasswordController = require("../controllers/NewPassword")

router.post("/SignUp", AuthController.signUpUser);
router.post("/SignIn", AuthController.loginUser);
router.post("/:userId/updateRestaurantDetails", AuthController.updateRestaurantDetails);
router.post("/forgot-password",forgotPsswdController.forgotPsswd);
router.post("/verify-code",verifyCodeController.verifyCode);
router.post("/reset-password",resetPasswordController.resetPassword);

module.exports = router;
