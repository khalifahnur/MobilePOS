const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/SalesController");

router.post("/createSales", SaleController.SalesController);
router.get("/fetchSales",SaleController.FetchSales)

module.exports = router;
