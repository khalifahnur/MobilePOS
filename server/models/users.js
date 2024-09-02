const { default: mongoose } = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber:{type:String,required: true},
  createdAt: { type: Date, default: Date.now },
  restaurantId: { type: String, default: null },
});

const User = model("User", userSchema);
module.exports = User;
