const User = require("../models/users");
const bcrypt = require('bcrypt');

const resetPassword =  async (req, res) => {
  const { email, newPassword } = req.body;
console.log(req.body)
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send('User not found');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear verification code and expirtion
    user.verificationCode = null;
    user.verificationCodeExpiration = null;

    await user.save();

    res.send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Error updating password');
  }
};

module.exports = {resetPassword}
