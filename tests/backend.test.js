import test from 'node:test';
import assert from 'node:assert/strict';

import Enrollment from '../models/Enrollment.js';
import Module from '../models/Module.js';
import {
  submitModuleQuiz,
  toggleLessonCompletion,
  toggleModuleCompletion,
} from '../controllers/enrollmentController.js';
import {
  isValidObjectId,
  normalizeEmail,
  isValidEmail,
  validateString,
  sanitizeStringArray,
  validateQuizArray,
} from '../utils/validators.js';
import { calculateProgress } from '../utils/progressHelper.js';
import { protect, instructorOnly, adminOnly } from '../middleware/authMiddleware.js';

// Helper mock for Express req/res/next
const createMockRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
};

// --- VALIDATOR TESTS ---
test('normalizeEmail and isValidEmail handle whitespace, casing, and invalid inputs', () => {
  assert.equal(normalizeEmail('  Anas@Example.COM  '), 'anas@example.com');
  assert.equal(isValidEmail('student@cortex.dev'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('isValidObjectId validates 24-hex MongoDB ObjectIds', () => {
  assert.equal(isValidObjectId('507f1f77bcf86cd799439011'), true);
  assert.equal(isValidObjectId('invalid-id'), false);
  assert.equal(isValidObjectId('12345'), false);
});

test('validateString enforces min/max bounds and trims whitespace', () => {
  assert.equal(validateString('  Hello World  ', 3, 50), 'Hello World');
  assert.equal(validateString('  ab  ', 3, 50), null);
  assert.equal(validateString(12345, 1, 10), null);
});

test('sanitizeStringArray trims and drops empty entries', () => {
  assert.deepEqual(sanitizeStringArray(['  React ', '', '   ', 'Node.js']), ['React', 'Node.js']);
  assert.deepEqual(sanitizeStringArray('not-array'), []);
});

test('validateQuizArray accepts valid quizzes and rejects malformed questions', () => {
  const valid = validateQuizArray([
    {
      question: 'What is JSX?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 1,
      explanation: 'JSX stands for JavaScript XML.',
    },
  ]);
  assert.equal(valid.valid, true);
  assert.equal(valid.data.length, 1);

  const badIndex = validateQuizArray([
    {
      question: 'What is JSX?',
      options: ['A', 'B'],
      correctAnswer: 5,
    },
  ]);
  assert.equal(badIndex.valid, false);

  const tooFewOptions = validateQuizArray([
    {
      question: 'What is JSX?',
      options: ['Only one'],
      correctAnswer: 0,
    },
  ]);
  assert.equal(tooFewOptions.valid, false);
});

// --- PROGRESS CALCULATION TESTS ---
test('calculateProgress prevents division by zero and NaN when course has 0 modules', () => {
  const res = calculateProgress([], new Set());
  assert.equal(res.progressPercentage, 0);
  assert.equal(Number.isNaN(res.progressPercentage), false);
  assert.equal(res.isCompleted, false);
});

test('calculateProgress filters stale/deleted module IDs and deduplicates', () => {
  const validIds = new Set(['m1', 'm2', 'm3', 'm4']);
  const res = calculateProgress(['m1', 'm1', 'deleted-id', 'm2'], validIds);
  assert.deepEqual(res.uniqueCompleted, ['m1', 'm2']);
  assert.equal(res.progressPercentage, 50);
  assert.equal(res.isCompleted, false);
});

test('calculateProgress clamps to 100% and sets isCompleted when all modules done', () => {
  const validIds = new Set(['m1', 'm2']);
  const res = calculateProgress(['m1', 'm2'], validIds);
  assert.equal(res.progressPercentage, 100);
  assert.equal(res.isCompleted, true);
});

// --- MIDDLEWARE AUTH & RBAC TESTS ---
test('protect rejects missing or malformed Authorization headers with 401', async () => {
  const req = { headers: {} };
  const res = createMockRes();
  let nextCalled = false;

  await protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
});

test('instructorOnly allows instructor and admin, blocks student with 403', () => {
  for (const role of ['instructor', 'admin']) {
    const res = createMockRes();
    let nextCalled = false;
    instructorOnly({ user: { role } }, res, () => {
      nextCalled = true;
    });
    assert.equal(nextCalled, true);
  }

  const studentRes = createMockRes();
  let studentNext = false;
  instructorOnly({ user: { role: 'student' } }, studentRes, () => {
    studentNext = true;
  });
  assert.equal(studentNext, false);
  assert.equal(studentRes.statusCode, 403);
});

test('adminOnly allows admin only and blocks instructor with 403', () => {
  const adminRes = createMockRes();
  let adminNext = false;
  adminOnly({ user: { role: 'admin' } }, adminRes, () => {
    adminNext = true;
  });
  assert.equal(adminNext, true);

  const instRes = createMockRes();
  let instNext = false;
  adminOnly({ user: { role: 'instructor' } }, instRes, () => {
    instNext = true;
  });
  assert.equal(instNext, false);
  assert.equal(instRes.statusCode, 403);
});

// --- COURSE DATA SEEDER INTEGRITY TEST ---
test('all 11 course data modules export valid structures and quizzes', async () => {
  const files = [
    'htmlCourseData',
    'jsCourseData',
    'gitCourseData',
    'reactCourseData',
    'nodeCourseData',
    'mongoCourseData',
    'tailwindCourseData',
    'vercelCourseData',
    'typescriptCourseData',
    'projectsCourseData',
    'pythonCourseData',
  ];

  for (const name of files) {
    const mod = await import(`../data/${name}.js`);
    const course = mod[name];
    assert.ok(course, `${name} must be exported`);
    assert.ok(course.title && course.description, `${name} needs title and description`);
    assert.ok(Array.isArray(course.modules) && course.modules.length >= 3, `${name} needs >= 3 modules`);
    for (const m of course.modules) {
      assert.ok(m.title && m.duration && m.notes, `Module in ${name} missing required fields`);
      if (Array.isArray(m.lessons) && m.lessons.length > 0) {
        for (const l of m.lessons) {
          assert.ok(l.title && l.notes, `Lesson in ${name} -> ${m.title} missing title or notes`);
        }
      }
      if (m.quiz && m.quiz.length > 0) {
        const check = validateQuizArray(m.quiz);
        assert.equal(check.valid, true, `Invalid quiz in ${name} -> ${m.title}: ${check.message}`);
      }
    }
  }
});

// --- STUDENT LEARNING JOURNEY & SERVER-SIDE QUIZ ENFORCEMENT TESTS ---
test('server-side quiz gate blocks module completion until 100% quiz score is achieved', async (t) => {
  const courseId = '507f1f77bcf86cd799439011';
  const moduleId = '507f1f77bcf86cd799439022';
  const studentId = '507f1f77bcf86cd799439033';

  const mockEnrollment = {
    student: studentId,
    course: courseId,
    completedModules: [],
    passedQuizModules: [],
    completedLessons: [],
    progressPercentage: 0,
    completedAt: null,
    async save() {
      return this;
    },
  };

  const mockModuleDoc = {
    _id: moduleId,
    courseId,
    lessons: [{ title: 'Lesson 1', notes: 'Notes' }],
    quiz: [
      { question: 'Q1', options: ['A', 'B'], correctAnswer: 1, explanation: 'B is right' },
      { question: 'Q2', options: ['C', 'D'], correctAnswer: 0, explanation: 'C is right' },
    ],
  };

  t.mock.method(Enrollment, 'findOne', async () => mockEnrollment);
  t.mock.method(Module, 'findOne', () => ({
    select() { return this; },
    lean: async () => mockModuleDoc,
  }));
  t.mock.method(Module, 'find', () => ({
    select() { return this; },
    lean: async () => [mockModuleDoc],
  }));

  // 1. Direct API bypass attempt before passing quiz -> 403 Forbidden
  const bypassRes = createMockRes();
  await toggleModuleCompletion(
    { params: { courseId, moduleId }, user: { _id: studentId } },
    bypassRes
  );
  assert.equal(bypassRes.statusCode, 403);
  assert.equal(mockEnrollment.completedModules.length, 0);

  // 2. Submit failing quiz (50%) -> passed: false, passedQuizModules stays empty
  const failQuizRes = createMockRes();
  await submitModuleQuiz(
    {
      params: { courseId, moduleId },
      body: { answers: { 0: 1, 1: 1 } },
      user: { _id: studentId },
    },
    failQuizRes
  );
  assert.equal(failQuizRes.statusCode, 200);
  assert.equal(failQuizRes.body.scorePercentage, 50);
  assert.equal(failQuizRes.body.passed, false);
  assert.equal(mockEnrollment.passedQuizModules.length, 0);

  // 3. Toggle lesson completion -> records "moduleId:0"
  const lessonRes = createMockRes();
  await toggleLessonCompletion(
    { params: { courseId, moduleId, lessonIndex: '0' }, user: { _id: studentId } },
    lessonRes
  );
  assert.equal(lessonRes.statusCode, 200);
  assert.deepEqual(mockEnrollment.completedLessons, [`${moduleId}:0`]);

  // 4. Submit passing quiz (100%) -> passed: true, unlocks module completion
  const passQuizRes = createMockRes();
  await submitModuleQuiz(
    {
      params: { courseId, moduleId },
      body: { answers: { 0: 1, 1: 0 } },
      user: { _id: studentId },
    },
    passQuizRes
  );
  assert.equal(passQuizRes.statusCode, 200);
  assert.equal(passQuizRes.body.scorePercentage, 100);
  assert.equal(passQuizRes.body.passed, true);
  assert.equal(mockEnrollment.passedQuizModules.length, 1);

  // 5. Mark module complete -> succeeds with 100% progress
  const completeRes = createMockRes();
  await toggleModuleCompletion(
    { params: { courseId, moduleId }, user: { _id: studentId } },
    completeRes
  );
  assert.equal(completeRes.statusCode, 200);
  assert.equal(mockEnrollment.progressPercentage, 100);
  assert.equal(mockEnrollment.completedModules.length, 1);
});
