import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // 1. Security Headers
import rateLimit from 'express-rate-limit'; // 2. Spam Protection
import mongoSanitize from 'express-mongo-sanitize'; // 3. NoSQL Injection Protection
import xss from 'xss-clean'; // 4. Cross-Site Scripting (XSS) Protection

import connectDB from '../config/db.js';
import authRoutes from '../routes/authRoutes.js';
import courseRoutes from '../routes/courseRoutes.js';
import enrollmentRoutes from '../routes/enrollmentRoutes.js';

dotenv.config();
connectDB();

const app = express();

// --- SECURITY GUARDS (Hamesha routes se pehle lagte hain) ---

// 1. Helmet: HTTP headers ko secure karta hai (Clickjacking se bachata hai)
app.use(helmet()); 

// 2. Rate Limiting: Ek IP se 15 minute mein sirf 100 requests allow karega
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api', limiter);

// 3. Body Parser: Data ko read karta hai, limit 10kb taake koi bada attack na kar sake
app.use(express.json({ limit: '10kb' }));

// 4. Data Sanitization: Agar koi code mein "$" ya "." bhej kar hack karne ki koshish kare, toh usko clean kar deta hai
app.use(mongoSanitize());

// 5. XSS Clean: Agar koi <script> tag bheje, toh usko remove kar deta hai
app.use(xss());

// --- CORS (Frontend ko connect karne ke liye) ---
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5173'],
  credentials: true
}));

// --- ROUTES ---
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Cortex API! 🧠' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Production mein hacker ko error ki detail nahi dikhayenge
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;