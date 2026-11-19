import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Course from './models/Course.js';
import Module from './models/Module.js';

// Import ALL 11 data files
import { htmlCourseData } from './data/htmlCourseData.js';
import { jsCourseData } from './data/jsCourseData.js';
import { gitCourseData } from './data/gitCourseData.js';
import { reactCourseData } from './data/reactCourseData.js';
import { nodeCourseData } from './data/nodeCourseData.js';
import { mongoCourseData } from './data/mongoCourseData.js';
import { tailwindCourseData } from './data/tailwindCourseData.js';
import { vercelCourseData } from './data/vercelCourseData.js';
import { typescriptCourseData } from './data/typescriptCourseData.js';
import { projectsCourseData } from './data/projectsCourseData.js';
import { pythonCourseData } from './data/pythonCourseData.js';

dotenv.config();

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
  pythonCourseData,
];

const seedData = async () => {
  try {
    await connectDB();

    await Course.deleteMany();
    await Module.deleteMany();
    console.log('🧹 Old courses and modules cleared...');

    let totalModules = 0;

    for (const courseData of allCoursesData) {
      const { modules, ...courseFields } = courseData;

      const createdCourse = await Course.create(courseFields);

      const moduleDocs = modules.map((mod, index) => ({
        ...mod,
        order: mod.order ?? index,
        courseId: createdCourse._id,
      }));

      await Module.insertMany(moduleDocs);
      totalModules += moduleDocs.length;
    }

    console.log(`✅ SUCCESS: ${allCoursesData.length} courses and ${totalModules} modules created!`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
