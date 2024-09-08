const Menu = require("../models/Menu");

const updateItem = async (req, res) => {
  const { restaurantId, title, oldName, oldCost, newName, newCost } = req.body;

  try {
    const result = await Menu.updateOne(
      {
        restaurantId: restaurantId,
        "data.title": title,
        "data.description.name": oldName,
        "data.description.cost": oldCost,
      },
      {
        $set: {
          "data.$[section].description.$[desc].name": newName,
          "data.$[section].description.$[desc].cost": newCost,
        },
      },
      {
        arrayFilters: [
          { "section.title": title },
          { "desc.name": oldName, "desc.cost": oldCost }
        ],
      }
    );

    if (result.matchedCount === 0) {
      // No matching document found
      return res.status(404).json({ message: "No matching item found" });
    }

    if (result.modifiedCount === 0) {
      // Document found but no updates made (name/cost may be the same)
      return res.status(400).json({ message: "Item found but no changes made" });
    }

    // If both matched and modified counts are greater than 0
    res.status(200).json({ message: "Item updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateItem };
