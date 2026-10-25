import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import authRoutes from '../routes/authRoutes.js';
import courseRoutes from '../routes/courseRoutes.js'; // <-- NEW
import enrollmentRoutes from '../routes/enrollmentRoutes.js'; // <-- NEW

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5173'],
  credentials: true
}));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Cortex API! 🧠' });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); // <-- NEW
app.use('/api/enrollments', enrollmentRoutes); // <-- NEW

// Error handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});