import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';

// @desc    Enroll in a course
// @route   POST /api/enrollments/:courseId
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id; // From auth middleware

    // Check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      completedModules: []
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my enrollments (Dashboard)
// @route   GET /api/enrollments/my
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course');
    
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle module completion (Tick/Untick)
// @route   PUT /api/enrollments/:courseId/module/:moduleId
export const toggleModuleCompletion = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    // Check if module is already completed
    const isCompleted = enrollment.completedModules.includes(moduleId);

    if (isCompleted) {
      // Remove it
      enrollment.completedModules = enrollment.completedModules.filter(id => id.toString() !== moduleId);
    } else {
      // Add it
      enrollment.completedModules.push(moduleId);
    }

    // Calculate progress percentage
    const totalModules = await Module.countDocuments({ courseId });
    const completedCount = enrollment.completedModules.length;
    enrollment.progressPercentage = Math.round((completedCount / totalModules) * 100);

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add this to the bottom of enrollmentController.js
export const getSpecificEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ 
      student: req.user._id, 
      course: req.params.courseId 
    });
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};