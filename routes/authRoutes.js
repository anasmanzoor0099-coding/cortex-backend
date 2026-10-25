import express from 'express';
import {
  register,
  verifyEmailAndSetPassword,
  login,
  forgotPassword,
  resetPassword,
  becomeInstructor // <-- IMPORT THIS
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // <-- IMPORT PROTECT

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmailAndSetPassword);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/become-instructor', protect, becomeInstructor); // <-- ADD ROUTE

export default router;