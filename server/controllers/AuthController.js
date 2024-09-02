const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const GenerateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Ensure the key is being read correctly from the environment variables
const secretKey = process.env.JWT_SECRET_KEY || GenerateSecretKey();

const signUpUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    console.log("Received request body:", req.body);

    if (!name || !email || !password || !phoneNumber) {
      console.log("Missing required field:", {
        name,
        email,
        password,
        phoneNumber,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.log("Error occurred during signup:", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect Email/Password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect Email/Password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      user: {
        user:user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        restaurantId: user.restaurantId || null, 
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred during login" });
    console.log("Error occurred during login:", error);
  }
};

const updateRestaurantDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { restaurantId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.restaurantId = restaurantId; // Update the restaurantId
    await user.save();

    res.status(200).json({
      message: 'Restaurant details updated successfully',
      restaurantName: {
        restaurantId: user.restaurantId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update restaurant details', error: error.message });
  }
};



module.exports = { loginUser, signUpUser, updateRestaurantDetails };
