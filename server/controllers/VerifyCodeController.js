const User = require("../models/users");


const verifyCode = async (req, res) => {
    const { email, verificationCode } = req.body;
    console.log(req.query)
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.verificationCode !== verificationCode || user.verificationCodeExpiration < Date.now()) {
        return res.status(400).send('Invalid or expired verification code');
      }
  
      res.send('Code verified');
    } catch (error) {
      res.status(500).send('Error verifying code');
    }
  };

module.exports = {verifyCode};
  