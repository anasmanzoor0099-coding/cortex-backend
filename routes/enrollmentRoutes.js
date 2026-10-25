import express from 'express';
import { enrollCourse, getMyEnrollments, toggleModuleCompletion, getSpecificEnrollment } from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:courseId', protect, enrollCourse);
router.get('/my', protect, getMyEnrollments);
router.get('/:courseId', protect, getSpecificEnrollment); // <-- NEW
router.put('/:courseId/module/:moduleId', protect, toggleModuleCompletion);

export default router;