import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import { isValidEmail, normalizeEmail, validateString } from '../utils/validators.js';

const generateToken = (id, tokenVersion = 0) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// @desc    Register user (Step 1: Send 6-digit verification code)
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const name = validateString(req.body.name, 2, 80);
    const email = normalizeEmail(req.body.email);

    if (!name) {
      return res.status(400).json({ message: 'Please provide a valid name (2–80 characters).' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: 'An account with this email already exists. Please log in.' });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpire = new Date(Date.now() + 15 * 60 * 1000);

    if (user && !user.isVerified) {
      user.name = name;
      user.verificationToken = verificationToken;
      user.verificationTokenExpire = verificationTokenExpire;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        verificationToken,
        verificationTokenExpire,
      });
    }

    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #EAE6DF; border-radius: 12px;">
        <h2 style="color: #1C1C1C; margin-bottom: 8px;">Welcome to Cortex, ${name}!</h2>
        <p style="color: #6B6B6B;">Use the verification code below to verify your email and set your password:</p>
        <div style="background: #FDFBF7; border: 1px solid #EAE6DF; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
          <strong style="font-size: 28px; letter-spacing: 6px; color: #FF8C42;">${verificationToken}</strong>
        </div>
        <p style="color: #6B6B6B; font-size: 13px;">This code expires in 15 minutes. If you did not request this, you can safely ignore this email.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Cortex - Email Verification Code',
        html: message,
      });
      return res.status(201).json({ message: 'Verification code sent to your email.' });
    } catch (emailError) {
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save();
      return res.status(500).json({ message: 'Could not send verification email. Please try again later.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

// @desc    Verify Email and Set Password (Step 2)
// @route   POST /api/auth/verify-email
export const verifyEmailAndSetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const token = typeof req.body.token === 'string' ? req.body.token.trim() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!isValidEmail(email) || !/^\d{6}$/.test(token)) {
      return res.status(400).json({ message: 'Please provide a valid email and 6-digit verification code.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    }).select('+verificationToken +verificationTokenExpire');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    user.password = password;
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    const jwtToken = generateToken(user._id, user.tokenVersion ?? 0);

    return res.status(200).json({
      message: 'Email verified successfully!',
      token: jwtToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during email verification.' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!isValidEmail(email) || !password) {
      return res.status(400).json({ message: 'Please provide a valid email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id, user.tokenVersion ?? 0);

    return res.status(200).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login.' });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(404).json({ message: 'No verified account found with that email address.' });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #EAE6DF; border-radius: 12px;">
        <h2 style="color: #1C1C1C; margin-bottom: 8px;">Password Reset Request</h2>
        <p style="color: #6B6B6B;">Use the 6-digit code below to reset your Cortex password:</p>
        <div style="background: #FDFBF7; border: 1px solid #EAE6DF; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
          <strong style="font-size: 28px; letter-spacing: 6px; color: #FF8C42;">${resetToken}</strong>
        </div>
        <p style="color: #6B6B6B; font-size: 13px;">This code expires in 15 minutes. If you did not request a password reset, please ignore this email.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Cortex - Password Reset Code',
        html: message,
      });
      return res.status(200).json({ message: 'Password reset code sent to your email.' });
    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: 'Could not send reset email. Please try again later.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error while processing password reset.' });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const token = typeof req.body.token === 'string' ? req.body.token.trim() : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';

    if (!isValidEmail(email) || !/^\d{6}$/.test(token)) {
      return res.status(400).json({ message: 'Please provide a valid email and 6-digit reset code.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpire');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset code.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while resetting password.' });
  }
};

// @desc    Upgrade user to instructor using a secret code
// @route   PUT /api/auth/become-instructor
export const becomeInstructor = async (req, res) => {
  try {
    const secretCode = typeof req.body.secretCode === 'string' ? req.body.secretCode.trim() : '';
    const configuredCode = process.env.INSTRUCTOR_SECRET_CODE;

    if (!configuredCode) {
      return res.status(503).json({ message: 'Instructor onboarding is currently unavailable.' });
    }

    if (!secretCode || secretCode !== configuredCode) {
      return res.status(401).json({ message: 'Invalid instructor secret code.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role === 'instructor' || user.role === 'admin') {
      return res.status(400).json({ message: 'You already have instructor privileges.' });
    }

    user.role = 'instructor';
    await user.save();

    return res.status(200).json({
      message: 'Congratulations! You are now an instructor.',
      role: user.role,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating role.' });
  }
};

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
};
