const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  restaurantId: { type: String, required: true },
  data: [
    {
      title: String,
      description: [
        {
          name: String,
          quantity: String,
          cost: Number,
          image: String,
        },
      ],
    },
  ],
});

const Menu = model("Menu", userSchema);
module.exports = Menu;
