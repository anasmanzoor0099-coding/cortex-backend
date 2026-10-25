import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    instructor: {
      type: String,
      default: 'Anas Manzoor', // Hardcoded for now as requested
    },
    thumbnail: {
      type: String,
      default: 'default-course.jpg', // Will update in frontend
    },
    totalDuration: {
      type: String,
      default: '0h 0m',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);