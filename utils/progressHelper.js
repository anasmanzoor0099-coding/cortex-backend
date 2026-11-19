import Module from '../models/Module.js';
import Enrollment from '../models/Enrollment.js';

/**
 * Computes clamped [0..100] progress percentage and filters completedModules
 * to only valid module IDs currently belonging to the course.
 */
export const calculateProgress = (completedModuleIds, validModuleIdSet) => {
  const totalModules = validModuleIdSet.size;
  const filtered = completedModuleIds.filter((id) => validModuleIdSet.has(id.toString()));

  // Deduplicate while preserving order
  const seen = new Set();
  const uniqueCompleted = [];
  for (const id of filtered) {
    const str = id.toString();
    if (!seen.has(str)) {
      seen.add(str);
      uniqueCompleted.push(id);
    }
  }

  if (totalModules === 0) {
    return { uniqueCompleted, progressPercentage: 0, isCompleted: false };
  }

  const raw = Math.round((uniqueCompleted.length / totalModules) * 100);
  const progressPercentage = Math.max(0, Math.min(100, Number.isFinite(raw) ? raw : 0));
  const isCompleted = uniqueCompleted.length >= totalModules;

  return { uniqueCompleted, progressPercentage, isCompleted };
};

/**
 * Recalculates progress for all enrollments of a course (e.g. after module add/delete).
 */
export const recalculateCourseEnrollments = async (courseId) => {
  const modules = await Module.find({ courseId }).select('_id').lean();
  const validIds = new Set(modules.map((m) => m._id.toString()));

  const enrollments = await Enrollment.find({ course: courseId });
  if (enrollments.length === 0) return;

  const bulkOps = enrollments.map((enrollment) => {
    const { uniqueCompleted, progressPercentage, isCompleted } = calculateProgress(
      enrollment.completedModules,
      validIds
    );
    return {
      updateOne: {
        filter: { _id: enrollment._id },
        update: {
          $set: {
            completedModules: uniqueCompleted,
            progressPercentage,
            completedAt: isCompleted ? enrollment.completedAt || new Date() : null,
          },
        },
      },
    };
  });

  await Enrollment.bulkWrite(bulkOps);
};
