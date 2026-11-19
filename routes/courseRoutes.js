import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addModule,
  updateModule,
  deleteModule,
  reorderModules,
  getCourseEnrollments,
} from '../controllers/courseController.js';
import { protect, instructorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getCourses)
  .post(protect, instructorOnly, createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(protect, instructorOnly, updateCourse)
  .delete(protect, instructorOnly, deleteCourse);

router.get('/:id/enrollments', protect, instructorOnly, getCourseEnrollments);

router.put('/:id/modules/reorder', protect, instructorOnly, reorderModules);

router
  .route('/:id/modules')
  .post(protect, instructorOnly, addModule);

router
  .route('/:id/modules/:moduleId')
  .put(protect, instructorOnly, updateModule)
  .delete(protect, instructorOnly, deleteModule);

export default router;
