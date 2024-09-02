const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/SignUp", AuthController.signUpUser);
router.post("/SignIn", AuthController.loginUser);
router.post("/:userId/updateRestaurantDetails", AuthController.updateRestaurantDetails)

module.exports = router;
