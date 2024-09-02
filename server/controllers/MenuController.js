const Menu = require("../models/Menu");

const createMenu = async (req, res) => {
  const { restaurantId, title, name, quantity, cost, image } = req.body;

  try {
    const menu = await Menu.findOne({ restaurantId });

    if (menu) {
      // Update the existing menu with new data
      menu.data.push({
        title,
        description: [{ name, quantity, cost, image }],
      });
      await menu.save();
      return res.status(200).json({ message: "Menu updated successfully", menu });
    } else {
      // Create a new menu
      const newMenu = new Menu({
        restaurantId,
        data: [
          {
            title,
            description: [{ name, quantity, cost, image }],
          },
        ],
      });

      await newMenu.save();
      return res.status(201).json({ message: "Menu created successfully", menu: newMenu });
    }
  } catch (error) {
    console.error("Error creating menu:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createMenu,
};
