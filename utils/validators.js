import mongoose from 'mongoose';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const normalizeEmail = (email) =>
  typeof email === 'string' ? email.trim().toLowerCase() : '';

export const isValidEmail = (email) => EMAIL_REGEX.test(normalizeEmail(email));

export const validateString = (val, minLen = 1, maxLen = 5000) => {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (trimmed.length < minLen || trimmed.length > maxLen) return null;
  return trimmed;
};

export const sanitizeStringArray = (arr, maxItems = 30) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim())
    .slice(0, maxItems);
};

export const validateQuizArray = (quiz) => {
  if (quiz === undefined) return { valid: true, data: [] };
  if (!Array.isArray(quiz)) {
    return { valid: false, message: 'Quiz must be an array of questions.' };
  }

  const sanitized = [];
  for (let i = 0; i < quiz.length; i++) {
    const q = quiz[i];
    if (!q || typeof q !== 'object') {
      return { valid: false, message: `Quiz question ${i + 1} is invalid.` };
    }
    const question = validateString(q.question, 3, 500);
    if (!question) {
      return { valid: false, message: `Quiz question ${i + 1} text is required.` };
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      return { valid: false, message: `Quiz question ${i + 1} must have 2 to 6 options.` };
    }
    const options = q.options.map((o) => (typeof o === 'string' ? o.trim() : '')).filter(Boolean);
    if (options.length !== q.options.length) {
      return { valid: false, message: `Quiz question ${i + 1} has empty options.` };
    }
    const correctAnswer = Number(q.correctAnswer);
    if (!Number.isInteger(correctAnswer) || correctAnswer < 0 || correctAnswer >= options.length) {
      return { valid: false, message: `Quiz question ${i + 1} has an invalid correctAnswer index.` };
    }
    const explanation = typeof q.explanation === 'string' ? q.explanation.trim() : '';
    sanitized.push({ question, options, correctAnswer, explanation });
  }

  return { valid: true, data: sanitized };
};
