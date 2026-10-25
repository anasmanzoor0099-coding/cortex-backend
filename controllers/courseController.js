import Course from '../models/Course.js';
import Module from '../models/Module.js';

// @desc    Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); 
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course with modules
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const modules = await Module.find({ courseId: course._id }).sort({ createdAt: 1 });
    res.json({ course, modules });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course (Instructor)
export const createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, totalDuration } = req.body;
    const course = await Course.create({ title, description, thumbnail, totalDuration, instructor: 'Anas Manzoor' });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a course and its modules (Instructor)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Delete all modules associated with this course
    await Module.deleteMany({ courseId: course._id });
    // Delete the course
    await course.deleteOne();

    res.json({ message: 'Course and its modules removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a module to a course (Instructor)
export const addModule = async (req, res) => {
  try {
    const { title, duration, notes, codeExample } = req.body;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const newModule = await Module.create({
      courseId,
      title,
      duration,
      notes,
      codeExample,
      quiz: [] // We will add quizzes later
    });

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a specific module (Instructor)
export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    await module.deleteOne();
    res.json({ message: 'Module removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};