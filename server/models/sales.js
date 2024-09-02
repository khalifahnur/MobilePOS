const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  items: [
    {
      cost: Number,
      id: String,
      image: Number,
      name: String,
      quantity: Number,
    },
  ],
  totalCost: Number,
  orderItem: {type:Number,required: true, unique: true},
  timeStamp: Date,
});

const Sales = model("Sale", userSchema);
module.exports = Sales;
