const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  restaurantId:{type:String,required:true},
  items: [
    {
      cost: Number,
      id: String,
      image: String,
      name: String,
      quantity: Number,
    },
  ],
  totalCost: Number,
},{timestamps:true});

const Sales = model("Sale", userSchema);
module.exports = Sales;
