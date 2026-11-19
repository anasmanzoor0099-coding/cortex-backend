import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      trim: true,
      maxlength: [140, 'Title cannot exceed 140 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    instructor: {
      type: String,
      default: 'Anas Manzoor',
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    thumbnail: {
      type: String,
      default: 'default-course',
      trim: true,
    },
    totalDuration: {
      type: String,
      default: '0h 0m',
      trim: true,
    },
    category: {
      type: String,
      default: 'Web Development',
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    tags: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
      type: [String],
      default: [],
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: String,
      default: '',
      trim: true,
    },
    practicalProject: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ category: 1, difficulty: 1 });
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Course', courseSchema);
