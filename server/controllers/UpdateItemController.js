const mongoose = require("mongoose");
const Menu = require("./path-to-your-model");

// Function to update the name and cost of a specific item
const updateItem = async (restaurantId, title, oldName, oldCost, newName, newCost) => {
  try {
    const result = await Menu.updateOne(
      {
        restaurantId: restaurantId,
        "data.title": title, // Find the correct `data` array
        "data.description.name": oldName, // Match the item by old name
        "data.description.cost": oldCost, // Match the item by old cost
      },
      {
        $set: {
          "data.$[].description.$[desc].name": newName, // Update name
          "data.$[].description.$[desc].cost": newCost, // Update cost
        },
      },
      {
        arrayFilters: [{ "desc.name": oldName, "desc.cost": oldCost }], // Filter based on old name and cost
      }
    );

    console.log("Item updated:", result);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// Call the function with the required values
updateItem("Beirut", "Main Dishes", "Chicken Burger", 1050, "Beef Burger", 1200);
