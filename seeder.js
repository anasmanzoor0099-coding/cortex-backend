import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Course from './models/Course.js';
import Module from './models/Module.js';

// Import ALL 11 data files
import { jsCourseData } from './data/jsCourseData.js';
import { htmlCourseData } from './data/htmlCourseData.js';
import { gitCourseData } from './data/gitCourseData.js';
import { reactCourseData } from './data/reactCourseData.js';
import { nodeCourseData } from './data/nodeCourseData.js';
import { mongoCourseData } from './data/mongoCourseData.js';
import { tailwindCourseData } from './data/tailwindCourseData.js';
import { vercelCourseData } from './data/vercelCourseData.js';
import { typescriptCourseData } from './data/typescriptCourseData.js';
import { projectsCourseData } from './data/projectsCourseData.js';
import { pythonCourseData } from './data/pythonCourseData.js'; // <-- Naya Python Course

dotenv.config();
connectDB();

// Array of all 11 courses to seed
const allCoursesData = [
  htmlCourseData,
  jsCourseData,
  gitCourseData,
  reactCourseData,
  nodeCourseData,
  mongoCourseData,
  tailwindCourseData,
  vercelCourseData,
  typescriptCourseData,
  projectsCourseData,
  pythonCourseData // <-- Array mein add kiya
];

const seedData = async () => {
  try {
    await Course.deleteMany();
    await Module.deleteMany();
    console.log('🧹 Old data cleared...');

    for (const courseData of allCoursesData) {
      const { modules, ...courseFields } = courseData;
      
      const createdCourse = await Course.create(courseFields);
      
      const moduleDocs = modules.map(mod => ({
        ...mod,
        courseId: createdCourse._id
      }));

      await Module.insertMany(moduleDocs);
    }

    console.log(`✅ SUCCESS: ${allCoursesData.length} Massive Detailed Courses created!`);
    console.log('🎉 Database Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();