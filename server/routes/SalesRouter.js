const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/SalesController");
const FilterController = require("../controllers/FilterController");

router.post("/createSales", SaleController.SalesController);
router.get("/fetchSales",SaleController.FetchSales);
router.get("/filteredSales",FilterController.FilteredSales);

module.exports = router;
