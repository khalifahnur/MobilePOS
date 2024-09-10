const menu = require("../models/Menu");

const removeItem = async (req, res) => {

  const { id, restaurantId, title } = req.body;
  console.log(req.body)
  try {
    const result = await menu.updateOne(
      { restaurantId: restaurantId, 'data.title': title },
      {
        $pull: {
          data: {
            _id: id,
          },
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = { removeItem };
