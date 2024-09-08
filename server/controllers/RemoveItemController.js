const menu = require("../models/Menu");

const removeItem = async (req, res) => {
  const { restaurantId, title, itemId } = req.body; 

  try {
    const result = await menu.updateOne(
      {
        restaurantId: restaurantId,
        "data.title": title,
      },
      {
        $pull: {
          "data.$.description": { _id: itemId },
        },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Item not found or already removed" });
    }

    res.status(200).json({ message: "Item removed successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { removeItem};
