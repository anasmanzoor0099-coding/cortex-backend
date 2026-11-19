import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  options: {
    type: [{ type: String, required: true, trim: true }],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length >= 2,
      message: 'Each quiz question must have at least 2 options',
    },
  },
  correctAnswer: { type: Number, required: true, min: 0 },
  explanation: { type: String, default: '', trim: true },
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  duration: { type: String, default: '30m', trim: true },
  introduction: { type: String, default: '', trim: true },
  objectives: { type: [String], default: [] },
  notes: { type: String, required: true },
  codeExample: { type: String, default: '' },
  codeExplanation: { type: String, default: '' },
  practiceExercise: { type: String, default: '' },
  keyTakeaways: { type: [String], default: [] },
});

const moduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: [true, 'Please add a module title'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Please add duration (e.g., 2h 30m)'],
      trim: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      required: [true, 'Please add module notes'],
    },
    codeExample: {
      type: String,
      default: '',
    },
    practiceExercise: {
      type: String,
      default: '',
    },
    assignment: {
      type: String,
      default: '',
    },
    keyTakeaways: {
      type: [String],
      default: [],
    },
    lessons: {
      type: [lessonSchema],
      default: [],
    },
    quiz: {
      type: [quizQuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

moduleSchema.index({ courseId: 1, order: 1, createdAt: 1 });

export default mongoose.model('Module', moduleSchema);
