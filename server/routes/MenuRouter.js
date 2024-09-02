const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/MenuController");

router.post("/createMenu", MenuController.createMenu);


module.exports = router;
