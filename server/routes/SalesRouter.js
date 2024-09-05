const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/SalesController");

router.post("/createSales", SaleController.SalesController);

module.exports = router;
