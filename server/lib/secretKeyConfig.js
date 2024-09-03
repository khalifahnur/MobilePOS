const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

// Function to generate a random secret key
const GenerateSecretKey = () => {
  const randomKey = crypto.randomBytes(32).toString("hex");
  return randomKey;
};

// Check if the secret key exists in the environment variables
let secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  // Generate a new secret key if it doesn't exist
  secretKey = GenerateSecretKey();
  console.log("Generated Secret Key:", secretKey);

  // Optional: Store it in a .env file for future use
  const envPath = path.resolve(__dirname, '../.env');
  
  // Ensure the key is appended on a new line
  fs.appendFileSync(envPath, `\nJWT_SECRET_KEY=${secretKey}\n`);

  console.log(`Secret key added to .env file at: ${envPath}`);
}

// Now you can use the secretKey for your JWT token generation
