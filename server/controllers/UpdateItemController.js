const Menu = require("./path-to-your-model");

const updateItem = async (restaurantId, title, oldName, oldCost, newName, newCost) => {
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
          "data.$[].description.$[desc].name": newName,
          "data.$[].description.$[desc].cost": newCost,
        },
      },
      {
        arrayFilters: [{ "desc.name": oldName, "desc.cost": oldCost }],
      }
    );

    console.log("Item updated:", result);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// Call the function with the required values
//updateItem("Beirut", "Main Dishes", "Chicken Burger", 1050, "Beef Burger", 1200);
module.exports = {updateItem};
