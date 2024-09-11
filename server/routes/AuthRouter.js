const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const forgotPsswdController = require("../controllers/ForgotPsswdController");

router.post("/SignUp", AuthController.signUpUser);
router.post("/SignIn", AuthController.loginUser);
router.post("/:userId/updateRestaurantDetails", AuthController.updateRestaurantDetails);
router.post("/forgot-password",forgotPsswdController.forgotPsswd);

module.exports = router;
