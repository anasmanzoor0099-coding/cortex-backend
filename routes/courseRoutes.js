import express from 'express';
import { 
  getCourses, getCourseById, createCourse, 
  deleteCourse, addModule, deleteModule 
} from '../controllers/courseController.js';
import { protect, instructorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCourses).post(protect, instructorOnly, createCourse);

router.route('/:id')
  .get(getCourseById)
  .delete(protect, instructorOnly, deleteCourse); // Delete Course

router.route('/:id/modules')
  .post(protect, instructorOnly, addModule); // Add Module

router.route('/:id/modules/:moduleId')
  .delete(protect, instructorOnly, deleteModule); // Delete Module

export default router;