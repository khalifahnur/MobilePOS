const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/MenuController");
const FetchMenuController  = require("../controllers/DataController");
const RemoveController = require("../controllers/RemoveItemController");
const UpdateController = require("../controllers/UpdateItemController")

router.post("/createMenu", MenuController.createMenu);
router.get("/fetchMenu",FetchMenuController.FetchMenu);
router.post("/remove",RemoveController.removeItem);
router.post("/update",UpdateController.updateItem);


module.exports = router;
