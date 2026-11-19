import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  register,
  verifyEmailAndSetPassword,
  login,
  forgotPassword,
  resetPassword,
  becomeInstructor,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts. Please try again in 15 minutes.' },
});

router.post('/register', authLimiter, register);
router.post('/verify-email', authLimiter, verifyEmailAndSetPassword);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.put('/become-instructor', protect, becomeInstructor);
router.get('/me', protect, getMe);

export default router;
