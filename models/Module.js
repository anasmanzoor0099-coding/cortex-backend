import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option (0, 1, 2, or 3)
});

const moduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a module title'],
    },
    duration: {
      type: String,
      required: [true, 'Please add duration (e.g., 2h 30m)'],
    },
    // E1: Text Notes
    notes: {
      type: String,
      required: [true, 'Please add module notes'],
    },
    // E2: Code Examples (optional)
    codeExample: {
      type: String,
      default: '',
    },
    // E4: Quiz (optional per module)
    quiz: [quizQuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Module', moduleSchema);