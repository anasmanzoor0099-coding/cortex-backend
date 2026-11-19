import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import { isValidObjectId } from '../utils/validators.js';
import { calculateProgress } from '../utils/progressHelper.js';

// @desc    Enroll in a course
// @route   POST /api/enrollments/:courseId
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      completedModules: [],
      passedQuizModules: [],
      completedLessons: [],
      progressPercentage: 0,
    });

    return res.status(201).json(enrollment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }
    return res.status(500).json({ message: 'Failed to enroll in course.' });
  }
};

// @desc    Get my enrollments (Student Dashboard)
// @route   GET /api/enrollments/my
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course')
      .sort({ updatedAt: -1 })
      .lean();

    const courseIds = enrollments.map((e) => e.course?._id).filter(Boolean);

    const moduleCounts = await Module.aggregate([
      { $match: { courseId: { $in: courseIds } } },
      { $group: { _id: '$courseId', count: { $sum: 1 } } },
    ]);
    const countMap = new Map(moduleCounts.map((m) => [m._id.toString(), m.count]));

    const enriched = enrollments.map((enroll) => {
      const totalModules = enroll.course ? countMap.get(enroll.course._id.toString()) || 0 : 0;
      const completedCount = enroll.completedModules ? enroll.completedModules.length : 0;
      return {
        ...enroll,
        totalModules,
        completedCount,
        isCourseUnavailable: !enroll.course,
      };
    });

    return res.json(enriched);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch your enrollments.' });
  }
};

// @desc    Submit module quiz for server-side grading (100% required to pass)
// @route   POST /api/enrollments/:courseId/module/:moduleId/quiz
export const submitModuleQuiz = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { answers } = req.body;

    if (!isValidObjectId(courseId) || !isValidObjectId(moduleId)) {
      return res.status(400).json({ message: 'Invalid course or module ID.' });
    }

    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found. Please enroll first.' });
    }

    const mod = await Module.findOne({ _id: moduleId, courseId }).lean();
    if (!mod) {
      return res.status(404).json({ message: 'Module not found in this course.' });
    }

    const quiz = mod.quiz || [];
    if (quiz.length === 0) {
      return res.status(400).json({ message: 'This module does not have a quiz.' });
    }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Quiz answers are required.' });
    }

    let correctCount = 0;
    const results = quiz.map((q, idx) => {
      const selected = Number(answers[idx] ?? answers[String(idx)]);
      if (!Number.isInteger(selected) || selected < 0 || selected >= q.options.length) {
        return { questionIndex: idx, isCorrect: false, explanation: q.explanation || '' };
      }
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        isCorrect,
        explanation: q.explanation || '',
      };
    });

    // Ensure all questions were answered
    const answeredCount = quiz.filter((_, idx) => {
      const val = answers[idx] ?? answers[String(idx)];
      return val !== undefined && val !== null && val !== '';
    }).length;

    if (answeredCount !== quiz.length) {
      return res.status(400).json({ message: 'Please answer all questions before submitting.' });
    }

    const scorePercentage = Math.round((correctCount / quiz.length) * 100);
    const passed = scorePercentage === 100;

    if (passed) {
      const alreadyPassed = enrollment.passedQuizModules.some(
        (id) => id.toString() === moduleId
      );
      if (!alreadyPassed) {
        enrollment.passedQuizModules.push(moduleId);
      }
    }
    enrollment.lastAccessedAt = new Date();
    await enrollment.save();

    return res.json({
      scorePercentage,
      passed,
      passedQuizModules: enrollment.passedQuizModules,
      results,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to grade quiz.' });
  }
};

// @desc    Toggle individual lesson completion inside a module
// @route   PUT /api/enrollments/:courseId/module/:moduleId/lesson/:lessonIndex
export const toggleLessonCompletion = async (req, res) => {
  try {
    const { courseId, moduleId, lessonIndex } = req.params;
    const idx = Number(lessonIndex);

    if (!isValidObjectId(courseId) || !isValidObjectId(moduleId) || !Number.isInteger(idx) || idx < 0) {
      return res.status(400).json({ message: 'Invalid course, module, or lesson index.' });
    }

    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found.' });
    }

    const mod = await Module.findOne({ _id: moduleId, courseId }).select('lessons').lean();
    if (!mod) {
      return res.status(404).json({ message: 'Module not found in this course.' });
    }

    if (!mod.lessons || idx >= mod.lessons.length) {
      return res.status(400).json({ message: 'Lesson index out of range.' });
    }

    const lessonKey = `${moduleId}:${idx}`;
    const exists = enrollment.completedLessons.includes(lessonKey);

    if (exists) {
      enrollment.completedLessons = enrollment.completedLessons.filter((k) => k !== lessonKey);
    } else {
      enrollment.completedLessons.push(lessonKey);
    }

    enrollment.lastAccessedAt = new Date();
    await enrollment.save();

    return res.json(enrollment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update lesson progress.' });
  }
};

// @desc    Toggle module completion (Enforces 100% quiz pass server-side)
// @route   PUT /api/enrollments/:courseId/module/:moduleId
export const toggleModuleCompletion = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;

    if (!isValidObjectId(courseId) || !isValidObjectId(moduleId)) {
      return res.status(400).json({ message: 'Invalid course or module ID.' });
    }

    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found. Please enroll first.' });
    }

    const modules = await Module.find({ courseId }).select('_id quiz').lean();
    const targetModule = modules.find((m) => m._id.toString() === moduleId);
    if (!targetModule) {
      return res.status(404).json({ message: 'Module does not belong to this course.' });
    }

    const alreadyCompleted = enrollment.completedModules.some(
      (id) => id.toString() === moduleId
    );

    if (alreadyCompleted) {
      enrollment.completedModules = enrollment.completedModules.filter(
        (id) => id.toString() !== moduleId
      );
    } else {
      // Server-side enforcement: if the module has a quiz, student must pass it with 100% first
      if (targetModule.quiz && targetModule.quiz.length > 0) {
        const hasPassedQuiz = enrollment.passedQuizModules.some(
          (id) => id.toString() === moduleId
        );
        if (!hasPassedQuiz) {
          return res.status(403).json({
            message: 'You must pass the module quiz with 100% before marking this module complete.',
          });
        }
      }
      enrollment.completedModules.push(moduleId);
    }

    const validModuleIdSet = new Set(modules.map((m) => m._id.toString()));
    const { uniqueCompleted, progressPercentage, isCompleted } = calculateProgress(
      enrollment.completedModules,
      validModuleIdSet
    );

    enrollment.completedModules = uniqueCompleted;
    enrollment.progressPercentage = progressPercentage;
    enrollment.lastAccessedAt = new Date();
    enrollment.completedAt = isCompleted ? enrollment.completedAt || new Date() : null;

    await enrollment.save();
    return res.json(enrollment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update module progress.' });
  }
};

// @desc    Get specific enrollment for a course
// @route   GET /api/enrollments/:courseId
export const getSpecificEnrollment = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.courseId)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled in this course.' });
    }

    return res.json(enrollment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch enrollment.' });
  }
};
