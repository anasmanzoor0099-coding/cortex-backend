import crypto from 'crypto';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register user (Step 1: Email Only)
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: 'User already exists and is verified.' });
    }

    // Generate a 6-digit verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpire = Date.now() + 15 * 60 * 1000; // 15 mins

    if (user && !user.isVerified) {
      // Update existing unverified user
      user.name = name;
      user.verificationToken = verificationToken;
      user.verificationTokenExpire = verificationTokenExpire;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        verificationToken,
        verificationTokenExpire,
      });
    }

    // Send email
    const message = `
      <h2>Welcome to Cortex, ${name}!</h2>
      <p>Your verification code is: <strong style="font-size: 24px; color: #00f0ff;">${verificationToken}</strong></p>
      <p>This code expires in 15 minutes.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Cortex - Email Verification Code',
        html: message,
      });
      res.status(201).json({ message: 'Verification code sent to email.' });
    } catch (error) {
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Email and Set Password (Step 2)
// @route   POST /api/auth/verify-email
export const verifyEmailAndSetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Set password and verify
    user.password = password;
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    const jwtToken = generateToken(user._id);

    res.status(200).json({
      message: 'Email verified successfully! You can now login.',
      token: jwtToken,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'There is no user with that email.' });

    // Generate 6-digit reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const message = `
      <h2>Password Reset</h2>
      <p>Your password reset code is: <strong style="font-size: 24px; color: #00f0ff;">${resetToken}</strong></p>
      <p>This code expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Cortex - Password Reset Code',
      html: message,
    });

    res.status(200).json({ message: 'Reset code sent to email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset code.' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful. You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Upgrade user to instructor using a secret code
// @route   PUT /api/auth/become-instructor
export const becomeInstructor = async (req, res) => {
  try {
    const { secretCode } = req.body;

    // Check if the code matches the .env variable
    if (secretCode !== process.env.INSTRUCTOR_SECRET_CODE) {
      return res.status(401).json({ message: 'Invalid instructor secret code.' });
    }

    // Find the user and update their role
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'instructor' || user.role === 'admin') {
      return res.status(400).json({ message: 'You are already an instructor.' });
    }

    user.role = 'instructor';
    await user.save();

    res.status(200).json({ 
      message: 'Congratulations! You are now an instructor.',
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};