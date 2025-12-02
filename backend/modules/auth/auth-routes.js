const { Router } = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserModel = require('../users/users-model');

const authRoute = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000)); 
}
// POST /api/auth/login
authRoute.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const otp = generateOtp();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); 

    user.otp = otp;
    user.otpExpiresAt = expiry;
    await user.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"MovieHub OTP" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your MovieHub OTP Code',
        text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
      });
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not set. OTP will only be logged to console.');
      console.log(`OTP for ${user.email}: ${otp}`);
    }

    return res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/verify-otp
authRoute.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ message: 'OTP not requested or invalid' });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { authRoute };
