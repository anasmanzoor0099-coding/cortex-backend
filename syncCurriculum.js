import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Course from './models/Course.js';
import Module from './models/Module.js';
import Enrollment from './models/Enrollment.js';

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

/**
 * Non-destructive curriculum synchronization script.
 * Updates existing courses and modules in-place while preserving Course._id,
 * Module._id, users, and student Enrollment progress.
 */
const syncCurriculum = async () => {
  try {
    await connectDB();

    const existingCourses = await Course.find().sort({ createdAt: 1, _id: 1 });

    for (let idx = 0; idx < allCoursesData.length; idx++) {
      const { modules, ...courseFields } = allCoursesData[idx];
      let courseDoc =
        existingCourses.find((c) => c.title === courseFields.title) || existingCourses[idx];

      if (courseDoc) {
        await Course.updateOne({ _id: courseDoc._id }, { $set: courseFields });
      } else {
        courseDoc = await Course.create(courseFields);
      }

      const existingMods = await Module.find({ courseId: courseDoc._id }).sort({
        order: 1,
        _id: 1,
      });

      for (let i = 0; i < modules.length; i++) {
        const modPayload = {
          ...modules[i],
          order: modules[i].order ?? i,
          courseId: courseDoc._id,
        };
        if (i < existingMods.length) {
          await Module.updateOne({ _id: existingMods[i]._id }, { $set: modPayload });
        } else {
          await Module.create(modPayload);
        }
      }

      if (existingMods.length > modules.length) {
        const extraIds = existingMods.slice(modules.length).map((m) => m._id);
        const refEnrollments = await Enrollment.find({
          completedModules: { $in: extraIds },
        }).lean();
        const referencedSet = new Set(
          refEnrollments.flatMap((e) => (e.completedModules || []).map((id) => id.toString()))
        );
        const safeToDelete = extraIds.filter((id) => !referencedSet.has(id.toString()));
        if (safeToDelete.length > 0) {
          await Module.deleteMany({ _id: { $in: safeToDelete } });
        }
      }
    }

    console.log('✅ Non-destructive curriculum sync completed.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error syncing curriculum: ${error.message}`);
    process.exit(1);
  }
};

syncCurriculum();
