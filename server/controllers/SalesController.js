const Sales = require('../models/sales');

const SalesController = async (req, res) => {
  try {
    const { restaurantId, items, totalCost } = req.body;

    // Check for missing fields
    if (!restaurantId || !items || !totalCost) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSales = new Sales({
      restaurantId,
      items,
      totalCost,
    });

    await newSales.save();

    res.status(200).json({
      message: "Sales stored successfully",
      salesData: newSales,
    });

  } catch (error) {
    console.error("Error storing sales:", error.message || error);
    return res.status(500).json({ error: 'Error storing sales' });
  }
};

module.exports = { SalesController };
