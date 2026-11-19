import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import connectDB from '../config/db.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import courseRoutes from '../routes/courseRoutes.js';
import enrollmentRoutes from '../routes/enrollmentRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Enrollment from '../models/Enrollment.js';

dotenv.config();

const app = express();

// Trust first proxy (needed for accurate rate limiting on Vercel)
app.set('trust proxy', 1);

// 1. Security Headers
app.use(helmet());

// 2. Global API Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
});
app.use('/api', limiter);

// 3. Body Parser (500kb allows multi-lesson Markdown modules & quizzes while preventing huge payloads)
app.use(express.json({ limit: '500kb' }));

// 4. Data Sanitization against NoSQL Injection & XSS
app.use(mongoSanitize());
app.use(xss());

// 5. CORS
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
for (const localOrigin of ['http://localhost:5173', 'http://localhost:4173']) {
  if (!allowedOrigins.includes(localOrigin)) {
    allowedOrigins.push(localOrigin);
  }
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// 6. Ensure MongoDB is connected on every request (safe & cached for Vercel serverless)
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    return res.status(503).json({ message: 'Database connection unavailable. Please try again.' });
  }
});

// --- ROUTES ---
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Cortex API!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/stats', async (req, res) => {
  try {
    const [totalCourses, totalModules, totalEnrollments, lessonAgg] = await Promise.all([
      Course.countDocuments(),
      Module.countDocuments(),
      Enrollment.countDocuments(),
      Module.aggregate([
        {
          $project: {
            lessonCount: {
              $cond: [
                { $gt: [{ $size: { $ifNull: ['$lessons', []] } }, 0] },
                { $size: { $ifNull: ['$lessons', []] } },
                1,
              ],
            },
          },
        },
        { $group: { _id: null, totalLessons: { $sum: '$lessonCount' } } },
      ]),
    ]);
    const totalLessons = lessonAgg[0]?.totalLessons ?? totalModules;
    return res.json({ totalCourses, totalModules, totalLessons, totalEnrollments });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load platform stats.' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
});

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

// Only bind a port when running locally (Vercel invokes the exported app)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
    });
}

export default app;
