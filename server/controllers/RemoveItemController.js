const Menu = require("../models/menu"); // Import the Menu model

// Controller to remove an item by `id`
const removeItemById = async (req, res) => {
  const { restaurantId, title, itemId } = req.body; // Extract data from the request body

  try {
    // Update the menu and remove the item from the `description` array using its id
    const result = await Menu.updateOne(
      {
        restaurantId: restaurantId, // Match restaurantId
        "data.title": title, // Match the section title
      },
      {
        $pull: {
          "data.$.description": { _id: itemId }, // Remove the item based on its `_id`
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

module.exports = { removeItemById };
