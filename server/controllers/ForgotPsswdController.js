require("dotenv").config();
const User = require("../models/users");
var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  secure: true,
});

const forgotPsswd = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    // Generate verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpiration = Date.now() + 600000; // 10 minutes

    await user.save();

    // Send email using Nodemailer
    await transporter.sendMail({
      to: email,
      subject: "Your Verification Code",
      html: `
    <html>
      <body>
        <h1 style="color: #4CAF50;">Verification Code</h1>
        <p>Hello,</p>
        <p>Your 4-digit verification code is <strong style="font-size: 24px; color: #FF5722;">${verificationCode}</strong>.</p>
        <p>This code is valid for the next 10 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Best regards,<br>M-pos</p>
      </body>
    </html>`,
    });

    res.status(200).send("Verification code sent");
  } catch (error) {
    res.status(500).send("Error sending verification code");
  }
};

module.exports = { forgotPsswd };
