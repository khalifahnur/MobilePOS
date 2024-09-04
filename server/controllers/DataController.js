const Menu = require("../models/Menu")

const FetchMenu = async (req, res) => {
  const { restaurantId } = req.query;

  try {
    const data = await Menu.find({ restaurantId: restaurantId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports= {FetchMenu};
