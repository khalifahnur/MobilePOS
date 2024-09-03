const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/MenuController");
const FetchMenuController  = require("../controllers/DataController");

router.post("/createMenu", MenuController.createMenu);
router.get("/fetchMenu",FetchMenuController.FetchMenu);


module.exports = router;
