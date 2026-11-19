import mongoose from 'mongoose';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Enrollment from '../models/Enrollment.js';
import {
  isValidObjectId,
  validateString,
  sanitizeStringArray,
  validateQuizArray,
} from '../utils/validators.js';
import { recalculateCourseEnrollments } from '../utils/progressHelper.js';

const VALID_DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const canManageCourse = (course, user) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.role !== 'instructor') return false;
  // Allow instructors to manage courses they created, or legacy seeded courses (createdBy === null)
  if (!course.createdBy) return true;
  return course.createdBy.toString() === user._id.toString();
};

// @desc    Get all courses (supports ?search, ?category, ?difficulty)
// @route   GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const { search, category, difficulty } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category.trim();
    }
    if (difficulty && difficulty !== 'All' && VALID_DIFFICULTIES.includes(difficulty)) {
      filter.difficulty = difficulty;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { tags: regex },
        { category: regex },
      ];
    }

    const courses = await Course.find(filter).sort({ createdAt: 1 }).lean();

    // Attach real moduleCount per course
    const moduleCounts = await Module.aggregate([
      { $group: { _id: '$courseId', count: { $sum: 1 } } },
    ]);
    const countMap = new Map(moduleCounts.map((m) => [m._id.toString(), m.count]));

    const enrichedCourses = courses.map((c) => ({
      ...c,
      moduleCount: countMap.get(c._id.toString()) || 0,
    }));

    return res.json(enrichedCourses);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch courses.' });
  }
};

// @desc    Get single course with ordered modules
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id).lean();
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    const modules = await Module.find({ courseId: course._id })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.json({ course, modules });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch course details.' });
  }
};

// @desc    Create a course (Instructor/Admin)
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const title = validateString(req.body.title, 3, 140);
    const description = validateString(req.body.description, 10, 3000);

    if (!title) {
      return res.status(400).json({ message: 'Course title must be between 3 and 140 characters.' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Course description must be at least 10 characters.' });
    }

    const difficulty = VALID_DIFFICULTIES.includes(req.body.difficulty)
      ? req.body.difficulty
      : 'Beginner';

    const course = await Course.create({
      title,
      description,
      thumbnail: validateString(req.body.thumbnail, 1, 100) || 'default-course',
      totalDuration: validateString(req.body.totalDuration, 1, 40) || '0h 0m',
      category: validateString(req.body.category, 2, 60) || 'Web Development',
      difficulty,
      tags: sanitizeStringArray(req.body.tags, 15),
      learningOutcomes: sanitizeStringArray(req.body.learningOutcomes, 20),
      prerequisites: sanitizeStringArray(req.body.prerequisites, 15),
      targetAudience: typeof req.body.targetAudience === 'string' ? req.body.targetAudience.trim() : '',
      practicalProject: typeof req.body.practicalProject === 'string' ? req.body.practicalProject.trim() : '',
      instructor: req.user?.name || 'Anas Manzoor',
      createdBy: req.user?._id || null,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create course.' });
  }
};

// @desc    Update a course (Instructor/Admin)
// @route   PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to edit this course.' });
    }

    if (req.body.title !== undefined) {
      const title = validateString(req.body.title, 3, 140);
      if (!title) return res.status(400).json({ message: 'Invalid course title.' });
      course.title = title;
    }

    if (req.body.description !== undefined) {
      const description = validateString(req.body.description, 10, 3000);
      if (!description) return res.status(400).json({ message: 'Invalid course description.' });
      course.description = description;
    }

    if (req.body.totalDuration !== undefined) {
      const totalDuration = validateString(req.body.totalDuration, 1, 40);
      if (!totalDuration) return res.status(400).json({ message: 'Invalid course duration.' });
      course.totalDuration = totalDuration;
    }

    if (req.body.thumbnail !== undefined) {
      course.thumbnail = validateString(req.body.thumbnail, 1, 100) || course.thumbnail;
    }

    if (req.body.category !== undefined) {
      course.category = validateString(req.body.category, 2, 60) || course.category;
    }

    if (req.body.difficulty !== undefined) {
      if (!VALID_DIFFICULTIES.includes(req.body.difficulty)) {
        return res.status(400).json({ message: 'Difficulty must be Beginner, Intermediate, or Advanced.' });
      }
      course.difficulty = req.body.difficulty;
    }

    if (req.body.tags !== undefined) course.tags = sanitizeStringArray(req.body.tags, 15);
    if (req.body.learningOutcomes !== undefined) course.learningOutcomes = sanitizeStringArray(req.body.learningOutcomes, 20);
    if (req.body.prerequisites !== undefined) course.prerequisites = sanitizeStringArray(req.body.prerequisites, 15);
    if (req.body.targetAudience !== undefined && typeof req.body.targetAudience === 'string') {
      course.targetAudience = req.body.targetAudience.trim();
    }
    if (req.body.practicalProject !== undefined && typeof req.body.practicalProject === 'string') {
      course.practicalProject = req.body.practicalProject.trim();
    }

    const updated = await course.save();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update course.' });
  }
};

// @desc    Delete a course, its modules, and its enrollments (Instructor/Admin)
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to delete this course.' });
    }

    // Attempt transactional deletion when replica set is available, fallback safely otherwise
    let session = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      await Module.deleteMany({ courseId: course._id }, { session });
      await Enrollment.deleteMany({ course: course._id }, { session });
      await Course.deleteOne({ _id: course._id }, { session });
      await session.commitTransaction();
    } catch (txError) {
      if (session) {
        await session.abortTransaction().catch(() => {});
      }
      // Fallback for standalone MongoDB instances without replica set transactions
      await Module.deleteMany({ courseId: course._id });
      await Enrollment.deleteMany({ course: course._id });
      await course.deleteOne();
    } finally {
      if (session) {
        session.endSession();
      }
    }

    return res.json({ message: 'Course, modules, and related enrollments removed successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete course.' });
  }
};

// @desc    Add a module to a course (Instructor/Admin)
// @route   POST /api/courses/:id/modules
export const addModule = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to modify this course.' });
    }

    const title = validateString(req.body.title, 2, 180);
    const duration = validateString(req.body.duration, 1, 40);
    const notes = validateString(req.body.notes, 10, 100000);

    if (!title || !duration || !notes) {
      return res.status(400).json({ message: 'Module title, duration, and notes are required.' });
    }

    const quizValidation = validateQuizArray(req.body.quiz);
    if (!quizValidation.valid) {
      return res.status(400).json({ message: quizValidation.message });
    }

    const existingCount = await Module.countDocuments({ courseId: course._id });

    const newModule = await Module.create({
      courseId: course._id,
      order: Number.isFinite(Number(req.body.order)) ? Number(req.body.order) : existingCount,
      title,
      duration,
      objectives: sanitizeStringArray(req.body.objectives, 20),
      notes,
      codeExample: typeof req.body.codeExample === 'string' ? req.body.codeExample : '',
      practiceExercise: typeof req.body.practiceExercise === 'string' ? req.body.practiceExercise.trim() : '',
      assignment: typeof req.body.assignment === 'string' ? req.body.assignment.trim() : '',
      keyTakeaways: sanitizeStringArray(req.body.keyTakeaways, 20),
      lessons: Array.isArray(req.body.lessons) ? req.body.lessons : [],
      quiz: quizValidation.data,
    });

    await recalculateCourseEnrollments(course._id);

    return res.status(201).json(newModule);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add module.' });
  }
};

// @desc    Update a module (Instructor/Admin)
// @route   PUT /api/courses/:id/modules/:moduleId
export const updateModule = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.params.moduleId)) {
      return res.status(400).json({ message: 'Invalid course or module ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to modify this course.' });
    }

    const mod = await Module.findOne({ _id: req.params.moduleId, courseId: course._id });
    if (!mod) return res.status(404).json({ message: 'Module not found in this course.' });

    if (req.body.title !== undefined) {
      const title = validateString(req.body.title, 2, 180);
      if (!title) return res.status(400).json({ message: 'Invalid module title.' });
      mod.title = title;
    }
    if (req.body.duration !== undefined) {
      const duration = validateString(req.body.duration, 1, 40);
      if (!duration) return res.status(400).json({ message: 'Invalid module duration.' });
      mod.duration = duration;
    }
    if (req.body.notes !== undefined) {
      const notes = validateString(req.body.notes, 10, 100000);
      if (!notes) return res.status(400).json({ message: 'Module notes must be at least 10 characters.' });
      mod.notes = notes;
    }
    if (req.body.codeExample !== undefined && typeof req.body.codeExample === 'string') {
      mod.codeExample = req.body.codeExample;
    }
    if (req.body.practiceExercise !== undefined && typeof req.body.practiceExercise === 'string') {
      mod.practiceExercise = req.body.practiceExercise.trim();
    }
    if (req.body.objectives !== undefined) {
      mod.objectives = sanitizeStringArray(req.body.objectives, 20);
    }
    if (req.body.keyTakeaways !== undefined) {
      mod.keyTakeaways = sanitizeStringArray(req.body.keyTakeaways, 20);
    }
    if (req.body.order !== undefined && Number.isFinite(Number(req.body.order))) {
      mod.order = Number(req.body.order);
    }
    if (req.body.quiz !== undefined) {
      const quizValidation = validateQuizArray(req.body.quiz);
      if (!quizValidation.valid) {
        return res.status(400).json({ message: quizValidation.message });
      }
      mod.quiz = quizValidation.data;
    }

    const updated = await mod.save();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update module.' });
  }
};

// @desc    Reorder modules in a course (Instructor/Admin)
// @route   PUT /api/courses/:id/modules/reorder
export const reorderModules = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to reorder modules.' });
    }

    const { moduleIds } = req.body;
    if (!Array.isArray(moduleIds) || moduleIds.some((id) => !isValidObjectId(id))) {
      return res.status(400).json({ message: 'moduleIds must be an array of valid module IDs.' });
    }

    const bulkOps = moduleIds.map((moduleId, index) => ({
      updateOne: {
        filter: { _id: moduleId, courseId: course._id },
        update: { $set: { order: index } },
      },
    }));

    if (bulkOps.length > 0) {
      await Module.bulkWrite(bulkOps);
    }

    const updatedModules = await Module.find({ courseId: course._id })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.json(updatedModules);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to reorder modules.' });
  }
};

// @desc    Delete a specific module and recalculate enrollment progress
// @route   DELETE /api/courses/:id/modules/:moduleId
export const deleteModule = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.params.moduleId)) {
      return res.status(400).json({ message: 'Invalid course or module ID.' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to modify this course.' });
    }

    const mod = await Module.findOne({ _id: req.params.moduleId, courseId: course._id });
    if (!mod) {
      return res.status(404).json({ message: 'Module not found.' });
    }

    await mod.deleteOne();
    await recalculateCourseEnrollments(course._id);

    return res.json({ message: 'Module removed and enrollment progress updated.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete module.' });
  }
};

// @desc    Get enrollments for a specific course (Instructor/Admin)
// @route   GET /api/courses/:id/enrollments
export const getCourseEnrollments = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    if (!canManageCourse(course, req.user)) {
      return res.status(403).json({ message: 'You are not authorized to view enrollments for this course.' });
    }

    const enrollments = await Enrollment.find({ course: course._id })
      .populate('student', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    const totalModules = await Module.countDocuments({ courseId: course._id });

    return res.json({
      courseTitle: course.title,
      totalModules,
      enrollments: enrollments.map((e) => ({
        _id: e._id,
        student: e.student || { name: 'Deleted User', email: '' },
        progressPercentage: e.progressPercentage,
        completedCount: e.completedModules?.length || 0,
        enrolledAt: e.createdAt,
        lastAccessedAt: e.lastAccessedAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch course enrollments.' });
  }
};
