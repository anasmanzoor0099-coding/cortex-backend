import User from '../models/User.js';
import { sanitizeUser } from './authController.js';
import { validateString } from '../utils/validators.js';

// @desc    Get current authenticated user's profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
};

// @desc    Update authenticated user's display name (email remains read-only)
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const rawName = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    if (!rawName) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const validName = validateString(rawName, 2, 80);
    if (!validName) {
      return res.status(400).json({
        message: 'Name must be between 2 and 80 characters.',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User account not found.' });
    }

    user.name = validName;
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating profile.' });
  }
};

// @desc    Change authenticated user's password and revoke existing JWT sessions
// @route   PUT /api/users/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const currentPassword =
      typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword =
      typeof req.body.newPassword === 'string' ? req.body.newPassword : '';
    const confirmPassword =
      typeof req.body.confirmPassword === 'string' ? req.body.confirmPassword : '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: 'Current password, new password, and confirmation are required.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: 'New password must be at least 8 characters long.',
      });
    }

    if (newPassword.length > 128) {
      return res.status(400).json({
        message: 'New password cannot exceed 128 characters.',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'New password and confirmation do not match.',
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: 'New password must be different from your current password.',
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User account not found.' });
    }

    const isCurrentMatch = await user.matchPassword(currentPassword);
    if (!isCurrentMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const isSameAsStored = await user.matchPassword(newPassword);
    if (isSameAsStored) {
      return res.status(400).json({
        message: 'New password must be different from your current password.',
      });
    }

    user.password = newPassword;
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;
    await user.save();

    return res.status(200).json({
      message: 'Password changed successfully. Please log in again with your new password.',
      requireRelogin: true,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while changing password.' });
  }
};
