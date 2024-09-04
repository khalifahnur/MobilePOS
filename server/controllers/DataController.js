const Menu = require("../models/Menu")

const FetchMenu = async (req, res) => {
  const { restaurantId } = req.body;

  try {
    const data = await Menu.find({ restaurantId: restaurantId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports= {FetchMenu};
