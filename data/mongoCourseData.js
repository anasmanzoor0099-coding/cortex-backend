export const mongoCourseData = {
  "title": "MongoDB & Mongoose Database Architecture",
  "description": "Master NoSQL data modeling, Mongoose schemas, compound unique indexes, query optimization (.lean, N+1 prevention), aggregation pipelines, transactions, and cascading data integrity.",
  "thumbnail": "mongodb",
  "totalDuration": "11h 00m",
  "category": "Databases",
  "difficulty": "Intermediate",
  "tags": [
    "MongoDB",
    "Mongoose",
    "NoSQL",
    "Indexing",
    "Aggregation",
    "Transactions"
  ],
  "learningOutcomes": [
    "Model relationships cleanly using embedding vs. ObjectId referencing",
    "Enforce validation, enums, and compound unique indexes in Mongoose schemas",
    "Optimize read queries with .lean(), .select(), and targeted indexes",
    "Eliminate N+1 queries using MongoDB Aggregation Pipelines ($match, $group, $sort)",
    "Maintain referential integrity across collections with transactions and bulkWrite",
    "Evolve production schemas backward-compatibly without breaking existing records"
  ],
  "prerequisites": [
    "Node.js & Express basics",
    "JavaScript ES6+"
  ],
  "targetAudience": "Backend and full-stack engineers building reliable, fast MongoDB Atlas applications.",
  "practicalProject": "Design and implement the complete Cortex LMS database layer: schemas, unique enrollment index, module-count aggregation, and transactional course deletion.",
  "modules": [
    {
      "title": "Module 1: Document Modeling — Embedding vs. Referencing",
      "duration": "2h 00m",
      "objectives": [
        "Compare relational tables with MongoDB collections and BSON documents",
        "Decide accurately when to embed subdocuments vs. reference by ObjectId",
        "Respect MongoDB’s 16 MB BSON document size limit and avoid unbounded arrays",
        "Enforce enums, validation, and compound unique indexes in Mongoose"
      ],
      "notes": "### Module Introduction\nMongoDB is a **document database** storing rich BSON (Binary JSON) documents in collections rather than rigid SQL rows. \"Schemaless\" does *not* mean \"designless\" — poor document modeling creates 16 MB document overflows, duplicate records, and slow updates.\n\n### Prerequisites\n- Basic Node.js/Express and JavaScript ES6+ familiarity.\n\n### How the Lessons Connect\n- **Lesson 1** teaches the core modeling decision: **Embed** bounded child data vs. **Reference** unbounded or shared collections.\n- **Lesson 2** enforces data integrity in Mongoose via schema types, `enum` constraints, `select: false`, and **compound unique indexes** (like preventing duplicate enrollments).\n\n### Module Summary\nYou will design clean, scalable Mongoose schemas that prevent duplicate records and respect document size boundaries.\n\n### Completion Criteria\n- Complete both lessons and schema modeling exercises.\n- Deliver the LMS Enrollment & Module Schema Architecture assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nDesign the Mongoose schemas for an Online Learning Platform with Users, Courses, Modules, and Enrollments. A student must never be able to enroll in the exact same course twice, and a course with 500+ enrolled students must never hit MongoDB's 16 MB document limit.\n\nObjectives:\n- Choose embedding vs. ObjectId referencing intentionally for each relationship.\n- Enforce a compound unique index on { studentId, courseId } in Enrollment.\n\nRequirements:\n1. Embed small bounded subdocuments (e.g., quiz questions and lessons inside a Module).\n2. Reference Modules -> Course via courseId: { type: ObjectId, ref: 'Course', index: true }.\n3. Model Enrollments in a separate collection (NOT an array inside Course!) with studentId and courseId references.\n4. Add enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }).\n5. Add select: false on User.password and strict enum validation on User.role.\n\nStep-by-Step Instructions:\n1. Create models/Enrollment.js and models/Module.js.\n2. Add the compound unique index and timestamps: true.\n3. Explain in a short comment why Enrollments are referenced in their own collection instead of embedded in Course.\n\nDeliverables:\n- Enrollment.js and Module.js schema files.\n\nEvaluation Criteria:\n- Bounded subdocuments embedded; unbounded collections (enrollments) referenced.\n- Compound unique index prevents race-condition duplicate enrollments at the database level.",
      "lessons": [
        {
          "title": "BSON Documents, Embedding & The 16 MB Limit",
          "duration": "1h 00m",
          "introduction": "The most important architectural decision in MongoDB is choosing whether related data lives inside one document (embedding) or in separate collections (referencing).",
          "objectives": [
            "Understand BSON types (ObjectId, Date, Int32) and the 16 MB max document size",
            "Embed data that is bounded and always read together",
            "Reference data that grows unboundedly or is queried independently"
          ],
          "notes": "### Embedding vs. Referencing Rule of Thumb\n- **Embed** when child data is **bounded** (small, known upper limit — e.g., 4 quiz questions or 5 lessons inside a Module), **owned solely by the parent**, and **almost always read together** in one query. Advantage: **single-query read**, atomic single-document write!\n- **Reference (`ObjectId`)** when child data can **grow unboundedly** (thousands of comments, millions of enrollments, order history) or needs to be queried/updated independently.\n\n### Why Unbounded Arrays Break MongoDB\nEvery MongoDB document has a hard **16 MB BSON size limit**. If you embed an `enrolledStudents: [ObjectId]` array inside a popular `Course` document, 100,000 enrollments will crash writes at 16 MB and slow down every update as MongoDB reallocates the growing document on disk! Always move unbounded 1-to-many or many-to-many relationships into their own collection.\n\n### Common Mistakes & Solutions\n- **Mistake**: Embedding an `enrolledStudents: [ObjectId]` array directly inside `Course`.\n  - **Solution**: Move unbounded many-to-many or 1-to-many relationships into their own `Enrollment` collection so documents never approach the 16 MB BSON limit.",
          "codeExample": "import mongoose from 'mongoose';\n\n// GOOD: Quiz questions are bounded (~4-10 per module) -> Embed!\nconst quizQuestionSchema = new mongoose.Schema({\n  question: { type: String, required: true },\n  options: { type: [String], required: true },\n  correctAnswer: { type: Number, required: true }\n}, { _id: false });\n\n// GOOD: Modules belong to a Course -> Reference Course by ObjectId\nconst moduleSchema = new mongoose.Schema({\n  courseId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'Course',\n    required: true,\n    index: true\n  },\n  title: { type: String, required: true },\n  quiz: [quizQuestionSchema]\n}, { timestamps: true });\n\nexport default mongoose.model('Module', moduleSchema);",
          "codeExplanation": "1. quizQuestionSchema is embedded inside moduleSchema because a module has a small, bounded number of quiz questions always loaded together.\n2. moduleSchema references Course via courseId with index: true so fetching all modules for a course is fast.\n\nHow to Run & Expected Output:\nImport into a Node/Mongoose script connected to MongoDB. Calling `await Module.create({ courseId, title: 'Intro', quiz: [...] })` stores a single Module document with embedded quiz questions and an indexed ObjectId link to Course.",
          "practiceExercise": "Guided Exercise:\n1. Decide Embed vs Reference for: (a) User shipping addresses (max 5), (b) Blog post comments (potentially 50,000), (c) Order line items (usually 1-20).\n\nIndependent Challenge:\nAdd a custom Mongoose validator on quizQuestionSchema.options ensuring every question has between 2 and 6 options.\n\nExpected Result:\nClean separation between bounded embedded subdocuments and unbounded referenced collections.",
          "keyTakeaways": [
            "Embed bounded subdocuments that are owned by and always read with their parent",
            "Reference unbounded lists (comments, enrollments, logs) in separate collections",
            "Every BSON document is capped at 16 MB — never store unbounded growing arrays inside one document"
          ]
        },
        {
          "title": "Schema Constraints, Enums & Compound Unique Indexes",
          "duration": "1h 00m",
          "introduction": "Checking \"does this enrollment already exist?\" in JavaScript before calling .create() has a race condition! Only a database-level unique index guarantees zero duplicates.",
          "objectives": [
            "Enforce required, trim, lowercase, minlength, and enum constraints in Mongoose",
            "Protect sensitive fields with select: false",
            "Prevent race-condition duplicates using compound unique indexes"
          ],
          "notes": "### Why Check-Then-Insert Fails Under Concurrency\nIf a user double-clicks the \"Enroll\" button, two `POST /api/enroll` requests arrive 2 milliseconds apart. Both run `Enrollment.findOne(...)`, both see `null`, and **both** insert a duplicate enrollment!\nAdding a **compound unique index** in MongoDB:\n`enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });`\nforces the database engine itself to allow only one document per `(studentId, courseId)` pair, throwing MongoDB duplicate error code **`11000`** on the second concurrent write!\n\n### Clean Validation & `select: false`\nUse `trim: true`, `lowercase: true` on emails, `enum: ['student', 'instructor', 'admin']` on roles, and `select: false` on `password` so `User.findById()` never returns password hashes accidentally.\n\n### Common Mistakes & Solutions\n- **Mistake**: Relying on `if (await Enrollment.findOne(...))` alone to stop duplicates.\n  - **Solution**: Always back it with `schema.index({ studentId: 1, courseId: 1 }, { unique: true })` and handle error code `11000`.",
          "codeExample": "import mongoose from 'mongoose';\n\nconst enrollmentSchema = new mongoose.Schema({\n  studentId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'User',\n    required: true\n  },\n  courseId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'Course',\n    required: true\n  },\n  progress: { type: Number, default: 0, min: 0, max: 100 }\n}, { timestamps: true });\n\n// Database-level guarantee against duplicate enrollments\nenrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });\n\nexport default mongoose.model('Enrollment', enrollmentSchema);",
          "codeExplanation": "1. progress enforces min: 0 and max: 100 at the schema level.\n2. enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }) guarantees uniqueness even if two requests arrive simultaneously.\n3. Controllers can catch err.code === 11000 and return a clean 409 Conflict (or return the existing enrollment idempotently).\n\nHow to Run & Expected Output:\nRegister the model and run `await Enrollment.syncIndexes()`. Attempting two simultaneous `Enrollment.create({ studentId, courseId })` calls results in one success and one E11000 duplicate key error.",
          "practiceExercise": "Guided Exercise:\n1. Write a controller catch block checking if (err.code === 11000) return res.status(409).json({ message: 'Already enrolled' });.\n\nIndependent Challenge:\nAdd a compound unique index on { courseId: 1, order: 1 } in a Module schema so no two modules in the same course can share the same order number.\n\nExpected Result:\nDatabase-enforced uniqueness with graceful HTTP 409 handling.",
          "keyTakeaways": [
            "Use database-level unique and compound unique indexes to prevent race-condition duplicates",
            "Handle MongoDB duplicate-key error code 11000 gracefully as HTTP 409 Conflict",
            "Combine trim, lowercase, enum, min/max, and select: false directly in Mongoose schemas"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should an Enrollment relationship between 50,000 Students and Courses be modeled in its own Enrollment collection rather than an array inside Course?",
          "options": [
            "Mongoose does not support arrays",
            "An unbounded array can hit MongoDB’s 16 MB BSON document limit and degrade write performance",
            "ObjectIds cannot be stored in arrays",
            "Separate collections skip authentication"
          ],
          "correctAnswer": 1,
          "explanation": "Unbounded arrays inside a single document risk hitting the 16 MB BSON limit and cause expensive document reallocations on writes."
        },
        {
          "question": "How do you guarantee a student cannot enroll in the same course twice even if two POST requests arrive simultaneously?",
          "options": [
            "Check findOne() in JavaScript first",
            "Define a compound unique index: schema.index({ studentId: 1, courseId: 1 }, { unique: true })",
            "Disable the submit button in CSS",
            "Use .lean() on the query"
          ],
          "correctAnswer": 1,
          "explanation": "Only an atomic database-level unique index prevents race-condition duplicates; handle error code 11000 in the controller."
        },
        {
          "question": "What does select: false on a Mongoose password field do?",
          "options": [
            "Prevents the password from being saved",
            "Excludes the password field from query results by default unless explicitly requested via .select(\"+password\")",
            "Encrypts the password automatically",
            "Makes the field read-only"
          ],
          "correctAnswer": 1,
          "explanation": "select: false protects sensitive fields like passwords and OTP tokens from accidentally leaking in standard API queries."
        },
        {
          "question": "Which MongoDB error code indicates a unique index violation?",
          "options": [
            "404",
            "11000",
            "500",
            "1045"
          ],
          "correctAnswer": 1,
          "explanation": "MongoDB throws E11000 duplicate key error when an insert or update violates a unique index."
        }
      ]
    },
    {
      "title": "Module 2: Indexing & Query Performance (.lean, .select)",
      "duration": "1h 45m",
      "objectives": [
        "Explain how B-Tree indexes turn full collection scans (COLLSCAN) into fast index scans (IXSCAN)",
        "Apply the ESR (Equality, Sort, Range) rule for compound indexes",
        "Reduce memory usage and speed up read APIs with .lean() and .select()"
      ],
      "notes": "### Module Introduction\nQueries that feel instant with 20 test documents can grind your server to a halt when a collection grows to 200,000 documents. Indexing and lean projections keep read latency in single-digit milliseconds.\n\n### Prerequisites\n- Completion of Module 1 (Mongoose schemas and basic indexes).\n\n### How the Lessons Connect\n- **Lesson 1** explains `COLLSCAN` vs `IXSCAN`, `explain('executionStats')`, and the ESR compound index rule.\n- **Lesson 2** shows how `.lean()` and `.select()` cut Mongoose hydration overhead and network payload size on read endpoints.\n\n### Module Summary\nYou will diagnose slow queries and optimize Mongoose read paths cleanly.\n\n### Completion Criteria\n- Complete both lessons and query optimization exercises.\n- Deliver the Fast Catalog Query & Index Plan assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nAn LMS course catalog query filters by { category, difficulty } and sorts by createdAt descending, while returning full 50KB lesson notes inside list responses. Optimize both the MongoDB index and the Mongoose read query.\n\nObjectives:\n- Design a compound index following the ESR (Equality, Sort, Range) rule.\n- Strip unused heavy fields with .select() and skip Mongoose document hydration with .lean().\n\nRequirements:\n1. Define a compound index on Course: { category: 1, difficulty: 1, createdAt: -1 }.\n2. Write getCatalogCourses({ category, difficulty }) using:\n   - .select('title description category difficulty totalDuration thumbnail')\n   - .sort({ createdAt: -1 })\n   - .lean()\n3. Explain why .lean() must NOT be used when you intend to call doc.save() later in the same handler.\n\nStep-by-Step Instructions:\n1. Add the compound index to CourseSchema.\n2. Implement the optimized catalog query function.\n3. Verify with .explain('executionStats') in a test script or Atlas that totalDocsExamined matches nReturned (no full COLLSCAN).\n\nDeliverables:\n- Optimized Course index definition and catalog query function.\n\nEvaluation Criteria:\n- Compound index matches Equality (category, difficulty) before Sort (createdAt).\n- Both .select() and .lean() applied on read-only list endpoint.",
      "lessons": [
        {
          "title": "How Indexes Work (IXSCAN vs. COLLSCAN)",
          "duration": "55m",
          "introduction": "Without an index, MongoDB has to open and read every single document in a collection just to find one matching email.",
          "objectives": [
            "Contrast COLLSCAN (full collection scan) with IXSCAN (B-Tree index scan)",
            "Order compound index fields using the ESR (Equality, Sort, Range) rule",
            "Avoid over-indexing write-heavy collections"
          ],
          "notes": "### `COLLSCAN` vs. `IXSCAN`\n- **`COLLSCAN`**: MongoDB reads **every document** in the collection from disk/RAM to check your filter. At 500,000 docs, this spikes CPU and latency!\n- **`IXSCAN`**: MongoDB traverses a sorted **B-Tree index** (like a book's index at the back) in `O(log n)` time and jumps straight to the matching documents.\n\n### The ESR Rule for Compound Indexes\nWhen a query filters and sorts on multiple fields, order your index fields as:\n1. **E — Equality** fields first (e.g., `category: 1, difficulty: 1`)\n2. **S — Sort** fields next (e.g., `createdAt: -1`)\n3. **R — Range** fields last (e.g., `price: 1` for `$gte / $lte`)\n*Tradeoff*: Every index speeds up reads while slightly slowing down writes (since MongoDB updates the B-Tree on insert/update), so index intentionally for your real query patterns!\n\n### Common Mistakes & Solutions\n- **Mistake**: Putting Range fields (`$gte`, `$lte`) *before* Sort fields in a compound index.\n  - **Solution**: Follow **ESR (Equality -> Sort -> Range)** so MongoDB reads pre-sorted index entries directly without an in-memory sort.",
          "codeExample": "// Equality on studentId + status, sorted by updatedAt descending\nenrollmentSchema.index({ studentId: 1, status: 1, updatedAt: -1 });\n\n// Query that uses this index cleanly (IXSCAN):\n// Enrollment.find({ studentId, status: 'active' }).sort({ updatedAt: -1 });",
          "codeExplanation": "1. Equality filters (studentId, status) narrow the B-Tree immediately.\n2. Because updatedAt: -1 comes next in the exact sort direction, MongoDB reads results already in sorted order without an expensive in-memory sort!\n\nHow to Run & Expected Output:\nRun `await Enrollment.find({ studentId, status: 'active' }).sort({ updatedAt: -1 }).explain('executionStats')`. `winningPlan` shows `IXSCAN` (never `COLLSCAN`).",
          "practiceExercise": "Guided Exercise:\n1. Order a compound index for: Course.find({ published: true, rating: { $gte: 4 } }).sort({ enrollmentsCount: -1 }) using ESR -> { published: 1, enrollmentsCount: -1, rating: 1 }.\n\nIndependent Challenge:\nRun await Model.find(...).explain('executionStats') on an unindexed vs indexed field and compare executionTimeMillis and totalDocsExamined.\n\nExpected Result:\n`totalDocsExamined` equals `nReturned` via `IXSCAN`.",
          "keyTakeaways": [
            "Indexes turn O(n) COLLSCANs into O(log n) B-Tree IXSCANs",
            "Order compound indexes using ESR: Equality -> Sort -> Range",
            "Don’t index every field blindly — each index adds overhead on inserts and updates"
          ]
        },
        {
          "title": "Fast Projections with .lean() and .select()",
          "duration": "50m",
          "introduction": "By default, Mongoose wraps every returned database document in a heavy Mongoose Document instance with change-tracking, getters, and .save() methods you don’t need for read-only JSON.",
          "objectives": [
            "Use .lean() to return plain JavaScript objects for read-only APIs",
            "Use .select() projections to fetch only the fields the UI actually needs",
            "Know when NOT to use .lean() (when calling .save() or Mongoose instance methods)"
          ],
          "notes": "### Why `.lean()` Speeds Up Read APIs\nA Mongoose Document object carries internal state tracking (`__v`, dirty-path trackers, virtuals, `.save()`). On a list of 100 courses, hydrating 100 full Mongoose Documents consumes noticeable CPU and RAM.\nAdding **`.lean()`** tells Mongoose: *\"Skip document hydration and give me plain, fast JavaScript objects!\"*\n\n### Combine with `.select()`\nIf your Courses grid only needs `title`, `description`, `difficulty`, and `thumbnail`, don't transfer 10KB of `learningOutcomes`, `prerequisites`, and `notes` over the wire!\n`Course.find().select('title description difficulty thumbnail').lean()`\n\n### Common Mistakes & Solutions\n- **Mistake**: Calling `.lean()` and then trying to call `await doc.save()` later in the controller.\n  - **Solution**: Use `.lean()` strictly on read-only endpoints; omit `.lean()` when you need Mongoose document methods or `.save()`.",
          "codeExample": "export async function getPublicCourses() {\n  return Course.find({ isPublished: true })\n    .select('title description category difficulty totalDuration thumbnail')\n    .sort({ createdAt: -1 })\n    .lean();\n}",
          "codeExplanation": "1. .select(...) instructs MongoDB itself to project and transmit only those 6 fields.\n2. .lean() skips Mongoose Document wrapping, returning lightweight plain JS objects ready for res.json().\n\nHow to Run & Expected Output:\nCall `await getPublicCourses()`. Returns an array of plain JS objects containing only the 6 selected fields, ready for `res.json()`.",
          "practiceExercise": "Guided Exercise:\n1. Compare console.log(doc instanceof mongoose.Document) with and without .lean().\n\nIndependent Challenge:\nUpdate a slow GET /api/modules/:courseId summary endpoint to use .select('title order duration') and .lean().\n\nExpected Result:\nSmaller JSON payloads and zero Mongoose Document hydration overhead on GET lists.",
          "keyTakeaways": [
            "Use .lean() on read-only GET endpoints to skip Mongoose Document hydration overhead",
            "Use .select() to exclude large unused fields from database and network transfer",
            "Do NOT use .lean() if you plan to mutate the object and call doc.save()"
          ]
        }
      ],
      "quiz": [
        {
          "question": "In MongoDB’s .explain(\"executionStats\"), what does COLLSCAN mean?",
          "options": [
            "The query used a compound index efficiently",
            "MongoDB scanned every single document in the entire collection because no suitable index matched",
            "The collection was deleted",
            "Mongoose cached the query"
          ],
          "correctAnswer": 1,
          "explanation": "COLLSCAN means a full collection scan, which becomes very slow as collection size grows."
        },
        {
          "question": "What does the ESR rule stand for when designing compound indexes?",
          "options": [
            "Encode, Serialize, Return",
            "Equality, Sort, Range",
            "Execute, Store, Replicate",
            "Extract, Sanitize, Render"
          ],
          "correctAnswer": 1,
          "explanation": "Compound indexes perform best when Equality filters come first, Sort fields second, and Range filters ($gt, $lt) last."
        },
        {
          "question": "When should you NOT add .lean() to a Mongoose query?",
          "options": [
            "When returning a list of 50 courses in res.json()",
            "When you need to call doc.save() or Mongoose instance methods on the returned document",
            "When using .select()",
            "When sorting results"
          ],
          "correctAnswer": 1,
          "explanation": ".lean() returns plain JavaScript objects without .save(), virtuals, or Mongoose change-tracking."
        },
        {
          "question": "Why does .select(\"title difficulty\") improve API performance?",
          "options": [
            "It bypasses authentication",
            "It tells MongoDB to project and send only the requested fields over the network instead of entire heavy documents",
            "It automatically creates a B-Tree index",
            "It converts arrays to strings"
          ],
          "correctAnswer": 1,
          "explanation": "Field projection reduces database disk/RAM work and shrinks JSON payload sizes sent to clients."
        }
      ]
    },
    {
      "title": "Module 3: Aggregation Pipelines & Eliminating N+1 Queries",
      "duration": "2h 00m",
      "objectives": [
        "Build multi-stage Aggregation Pipelines with $match, $group, $project, and $sort",
        "Identify and eliminate N+1 query bottlenecks in API endpoints",
        "Compute per-course module and lesson counts in a single database round-trip"
      ],
      "notes": "### Module Introduction\nLooping over 20 courses in JavaScript and running `await Module.countDocuments({ courseId: c._id })` inside the loop fires **21 separate database queries** (the classic **N+1 Query Problem**). MongoDB's **Aggregation Pipeline** computes those summaries in **one fast database pass**.\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** introduces Aggregation Pipeline stages (`$match`, `$group`, `$sort`).\n- **Lesson 2** applies aggregation and `$in` batching to eliminate N+1 queries in real Express endpoints.\n\n### Module Summary\nYou will replace slow query loops with single-round-trip aggregations and `$in` batch lookups.\n\n### Completion Criteria\n- Complete both lessons and pipeline exercises.\n- Deliver the Course Stats Aggregation Pipeline assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nThe Courses listing endpoint currently runs 1 query for courses plus 1 query per course to count its modules and total lessons — causing 12+ Atlas round-trips on every page load. Replace the loop with a single Aggregation Pipeline.\n\nObjectives:\n- Use Module.aggregate([...]) to compute moduleCount and lessonCount per courseId in one query.\n- Merge aggregated counts back onto lean Course objects in O(1) via a Map.\n\nRequirements:\n1. Build an aggregation pipeline on Module:\n   - $match (optional filter if courseIds array provided)\n   - $project: { courseId: 1, lessonCount: { $size: { $ifNull: ['$lessons', []] } } }\n   - $group: { _id: '$courseId', moduleCount: { $sum: 1 }, totalLessons: { $sum: '$lessonCount' } }\n2. Convert the aggregation result into a Map keyed by String(row._id).\n3. Attach moduleCount and totalLessons to each course cleanly (defaulting to 0 if no modules exist).\n\nStep-by-Step Instructions:\n1. Write getCourseStatsMap(courseIds) using Module.aggregate().\n2. Use $ifNull so legacy modules without a lessons array don't crash $size.\n3. Combine with Course.find().lean() in Promise.all and merge via the Map.\n\nDeliverables:\n- getCourseStatsMap helper and combined catalog loader.\n\nEvaluation Criteria:\n- Exactly 2 total DB queries regardless of whether there are 10 courses or 1,000 courses.\n- Safe handling of missing lessons arrays via $ifNull.",
      "lessons": [
        {
          "title": "Aggregation Stages: $match, $group, $sort",
          "duration": "1h 00m",
          "introduction": "Think of an Aggregation Pipeline as an assembly line: documents enter at stage 1, get filtered, reshaped, and grouped stage by stage, and exit as clean analytics.",
          "objectives": [
            "Filter early with $match so fewer documents enter later stages",
            "Compute counts, sums, and averages with $group ($sum, $avg, $max)",
            "Reshape fields safely with $project and $ifNull"
          ],
          "notes": "### Key Aggregation Stages\n1. **`$match`**: Filters documents (just like `.find()`). **Always put `$match` first** so MongoDB can use indexes and shrink the dataset before grouping!\n2. **`$project`**: Selects or computes new fields (e.g., `lessonCount: { $size: { $ifNull: ['$lessons', []] } }`).\n3. **`$group`**: Groups documents by `_id` (e.g., `_id: '$courseId'` or `_id: null` for a grand total across all docs) and runs accumulators like `$sum: 1` or `$avg: '$progress'`.\n4. **`$sort`**: Sorts the grouped output.\n\n### Common Mistakes & Solutions\n- **Mistake**: Calling `$size: '$lessons'` on legacy documents where `lessons` is `undefined` or `null`.\n  - **Solution**: Always wrap optional arrays with `{ $size: { $ifNull: ['$lessons', []] } }`.",
          "codeExample": "const stats = await Module.aggregate([\n  { $match: { courseId: { $in: courseIds } } },\n  {\n    $project: {\n      courseId: 1,\n      lessonCount: { $size: { $ifNull: ['$lessons', []] } }\n    }\n  },\n  {\n    $group: {\n      _id: '$courseId',\n      moduleCount: { $sum: 1 },\n      totalLessons: { $sum: '$lessonCount' }\n    }\n  },\n  { $sort: { moduleCount: -1 } }\n]);",
          "codeExplanation": "1. $match narrows modules to only the requested courseIds using the courseId index.\n2. $project safely computes each module’s lessonCount (using $ifNull if lessons is missing).\n3. $group aggregates moduleCount and totalLessons per courseId in a single database pass.\n\nHow to Run & Expected Output:\nRun `await Module.aggregate(...)` against seeded modules. Returns `[{ _id: courseId, moduleCount: 6, totalLessons: 12 }]` in a single round-trip.",
          "practiceExercise": "Guided Exercise:\n1. Write an Enrollment.aggregate pipeline grouping by '$courseId' to compute totalEnrollments and averageProgress ($avg: '$progress').\n\nIndependent Challenge:\nAdd a $match: { progress: 100 } stage at the start to count completed students per course.\n\nExpected Result:\nServer-side aggregation completes in one query without throwing on missing optional arrays.",
          "keyTakeaways": [
            "Always place $match as early as possible in an aggregation pipeline to leverage indexes",
            "Use $group with _id and accumulators ($sum, $avg) to compute server-side summaries",
            "Guard $size on optional arrays with $ifNull: [\"$field\", []]"
          ]
        },
        {
          "title": "Solving the N+1 Query Problem",
          "duration": "1h 00m",
          "introduction": "N+1 queries silently pass local tests with 3 records, then blow up latency to several seconds in production when 100 records exist.",
          "objectives": [
            "Spot N+1 loops (await DB query inside .map() or for...of)",
            "Replace N+1 loops with $in batch queries or Aggregation Pipelines",
            "Join batched results in memory using a JavaScript Map in O(1)"
          ],
          "notes": "### Spotting the N+1 Trap\n```js\n// BAD: 1 query for courses + N queries inside Promise.all(courses.map(...))\nconst enriched = await Promise.all(courses.map(async (c) => ({\n  ...c,\n  modules: await Module.countDocuments({ courseId: c._id })\n})));\n```\nWith 100 courses, that fires **101 queries**!\n### The Fix: 2 Queries Total + `Map`\n1. Fetch `courses = await Course.find().lean()`.\n2. Run **one** `Module.aggregate([{ $match: { courseId: { $in: ids } } }, ...])` (or `$in` query).\n3. Put the counts into a `new Map(stats.map(s => [String(s._id), s]))` and merge cleanly in JavaScript!\n\n### Common Mistakes & Solutions\n- **Mistake**: Keying a `Map` with raw `ObjectId` objects (`map.get(course._id)`) and getting `undefined` because two ObjectId objects have different references!\n  - **Solution**: Always convert keys via `String(id)`.",
          "codeExample": "// GOOD: O(1) total database round-trips (always 2 queries!)\nconst courses = await Course.find().select('title category').lean();\nconst courseIds = courses.map((c) => c._id);\n\nconst counts = await Module.aggregate([\n  { $match: { courseId: { $in: courseIds } } },\n  { $group: { _id: '$courseId', moduleCount: { $sum: 1 } } }\n]);\n\nconst countMap = new Map(counts.map((row) => [String(row._id), row.moduleCount]));\n\nconst result = courses.map((c) => ({\n  ...c,\n  moduleCount: countMap.get(String(c._id)) ?? 0\n}));",
          "codeExplanation": "1. Regardless of whether there are 5 courses or 500 courses, MongoDB executes exactly 2 queries.\n2. String(id) keys the Map reliably because two ObjectId objects won't match by reference in Map.get().\n\nHow to Run & Expected Output:\nExecute against a seeded database with 11 courses. Fires exactly 2 queries total and prints courses enriched with accurate `moduleCount`.",
          "practiceExercise": "Guided Exercise:\n1. Convert a loop fetching author details per post (await User.findById(post.authorId)) into a single User.find({ _id: { $in: authorIds } }).lean() + Map lookup.\n\nIndependent Challenge:\nDeduplicate authorIds with [...new Set(posts.map(p => String(p.authorId)))] before passing to $in.\n\nExpected Result:\nConstant O(1) database round-trips regardless of catalog size.",
          "keyTakeaways": [
            "Never execute await Model.find/count inside a loop over records (N+1 anti-pattern)",
            "Batch related lookups with $in or compute summaries in one Aggregation Pipeline",
            "Join batched results in memory using a Map keyed by String(id)"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should $match generally be placed as the very first stage in a MongoDB Aggregation Pipeline?",
          "options": [
            "$match only works at the start",
            "It filters out irrelevant documents early and allows MongoDB to use collection indexes",
            "It sorts results alphabetically",
            "It disables the 16 MB limit"
          ],
          "correctAnswer": 1,
          "explanation": "Placing $match first leverages indexes and reduces the number of documents flowing through $project and $group."
        },
        {
          "question": "What is the \"N+1 Query Problem\"?",
          "options": [
            "Having 1 too many indexes on a schema",
            "Fetching N parent records in 1 query and then executing N additional queries inside a loop for each parent’s children",
            "Returning 404 when N is 0",
            "A syntax error in $group"
          ],
          "correctAnswer": 1,
          "explanation": "N+1 queries multiply database round-trips linearly with data size; solve them with $in batching or Aggregation Pipelines."
        },
        {
          "question": "Why use { $size: { $ifNull: [\"$lessons\", []] } } in an aggregation $project stage?",
          "options": [
            "To delete empty lessons",
            "Because $size throws an error if the lessons field is missing or null on an older document",
            "To sort lessons alphabetically",
            "To convert lessons to strings"
          ],
          "correctAnswer": 1,
          "explanation": "$size requires an array; $ifNull supplies [] as a safe fallback for documents lacking the field."
        },
        {
          "question": "When merging aggregated stats back onto lean course documents using a JavaScript Map, how should ObjectId keys be stored?",
          "options": [
            "As raw ObjectId instances",
            "Converted via String(id) so lookup keys match reliably by string value",
            "As JSON.stringify(doc)",
            "As random numbers"
          ],
          "correctAnswer": 1,
          "explanation": "Map compares object keys by reference; two ObjectId instances with the same hex ID won’t match unless converted with String(id)."
        }
      ]
    },
    {
      "title": "Module 4: Transactions, Cascading Deletes & Integrity",
      "duration": "1h 45m",
      "objectives": [
        "Use MongoDB multi-document ACID Transactions (withTransaction) for all-or-nothing writes",
        "Clean up dependent Modules and Enrollments when deleting a Course (cascading integrity)",
        "Perform high-speed batch updates using Model.bulkWrite()"
      ],
      "notes": "### Module Introduction\nMongoDB writes to a **single document** are always atomic. However, deleting a Course while also deleting its Modules and Enrollments spans **multiple collections** — if the server crashes halfway, orphan records remain! **Transactions** and **`bulkWrite`** solve multi-document consistency and batch performance.\n\n### Prerequisites\n- Completion of Modules 1–3.\n\n### How the Lessons Connect\n- **Lesson 1** teaches multi-document ACID transactions with Mongoose `ClientSession` and cascading delete cleanup.\n- **Lesson 2** covers `bulkWrite()` for reordering modules or batch-updating progress in a single network call.\n\n### Module Summary\nYou will keep related collections consistent under failures and execute batch updates efficiently.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Transactional Course Deletion & Module Reorder assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nWhen an instructor deletes a course, orphan Module and Enrollment documents currently remain in MongoDB. Additionally, reordering 12 modules currently fires 12 sequential updateOne calls. Fix both with Transactions and bulkWrite().\n\nObjectives:\n- Wrap multi-collection course deletion inside a Mongoose session.withTransaction(...) block.\n- Batch-reorder modules in a single Module.bulkWrite() call.\n\nRequirements:\n1. Write deleteCourseCascade(courseId):\n   - Starts a Mongoose session (await mongoose.startSession()).\n   - Inside session.withTransaction(...), deletes Modules ({ courseId }), Enrollments ({ courseId }), and the Course (_id: courseId), passing { session } to every query!\n   - Calls await session.endSession() in finally.\n2. Write reorderModules(courseId, orderedIds):\n   - Builds an array of { updateOne: { filter: { _id: id, courseId }, update: { $set: { order: idx + 1 } } } }.\n   - Executes await Module.bulkWrite(ops).\n\nStep-by-Step Instructions:\n1. Implement deleteCourseCascade carefully ensuring { session } is passed to ALL three delete operations (forgetting { session } on one query runs it outside the transaction!).\n2. Implement reorderModules using bulkWrite.\n\nDeliverables:\n- courseMaintenance.js with both functions.\n\nEvaluation Criteria:\n- session.endSession() always runs in finally.\n- Every DB call inside withTransaction passes { session }.\n- bulkWrite filters by both _id and courseId for safety.",
      "lessons": [
        {
          "title": "Multi-Document Transactions & Rollback",
          "duration": "55m",
          "introduction": "When an operation must modify two or three collections together — either ALL succeed or ALL roll back — MongoDB multi-document transactions protect your data.",
          "objectives": [
            "Understand why single-document writes are atomic while multi-document writes need transactions",
            "Use session.withTransaction() and always pass { session } to every operation",
            "Clean up sessions in finally blocks (note: transactions require a MongoDB Replica Set like Atlas)"
          ],
          "notes": "### How Mongoose Transactions Work\n1. `const session = await mongoose.startSession();`\n2. `await session.withTransaction(async () => { ... });` — automatically retries transient commit errors and rolls back everything if any error is thrown inside the callback!\n3. **Critical Gotcha**: Every Mongoose query inside the callback **must** receive `{ session }` (e.g., `Module.deleteMany({ courseId }).session(session)` or `{ session }`), otherwise that query executes *outside* the transaction!\n4. Always call `await session.endSession()` in a `finally` block.\n*(Note: MongoDB transactions require a Replica Set — MongoDB Atlas clusters provide this out of the box, whereas a standalone local `mongod` without `--replSet` does not.)*\n\n### Common Mistakes & Solutions\n- **Mistake**: Starting a transaction on a standalone local `mongod` without Replica Set enabled and hitting `Transaction numbers are only allowed on a replica set member`.\n  - **Solution**: Use MongoDB Atlas (replica set by default) or initialize a local single-node replica set for transaction testing.",
          "codeExample": "export async function deleteCourseSafely(courseId) {\n  const session = await mongoose.startSession();\n  try {\n    await session.withTransaction(async () => {\n      await Module.deleteMany({ courseId }, { session });\n      await Enrollment.deleteMany({ courseId }, { session });\n      const deleted = await Course.findByIdAndDelete(courseId, { session });\n      if (!deleted) {\n        throw new Error('Course not found'); // Triggers automatic rollback!\n      }\n    });\n  } finally {\n    await session.endSession();\n  }\n}",
          "codeExplanation": "1. session.withTransaction wraps all three deletions in an atomic ACID transaction.\n2. If Course.findByIdAndDelete returns null and throws, MongoDB automatically rolls back the Module and Enrollment deletions.\n3. finally guarantees the session handle is always closed.\n\nHow to Run & Expected Output:\nCall `await deleteCourseSafely(courseId)` on an Atlas replica set. Either Course + Modules + Enrollments are all deleted together, or all three roll back intact on error.",
          "practiceExercise": "Guided Exercise:\n1. Trace what happens if Enrollment.deleteMany throws a network timeout halfway through deleteCourseSafely (Module.deleteMany is rolled back cleanly!).\n\nIndependent Challenge:\nWrite a transactional wallet transfer function transferCredits(fromId, toId, amount) checking sender balance >= amount inside the transaction.\n\nExpected Result:\nZero orphan Module or Enrollment documents left after deleting a course.",
          "keyTakeaways": [
            "Single-document writes in MongoDB are atomic; multi-document/collection writes require Transactions",
            "Always pass { session } to every Mongoose query inside session.withTransaction()",
            "Always close sessions in a finally block via session.endSession()"
          ]
        },
        {
          "title": "Batch Updates with bulkWrite()",
          "duration": "50m",
          "introduction": "Updating 50 documents one-by-one inside a for loop wastes 50 network round-trips. bulkWrite() sends all 50 operations in a single batch.",
          "objectives": [
            "Construct updateOne / insertOne / deleteOne operations for Model.bulkWrite()",
            "Use ordered: false when independent writes can proceed even if one fails",
            "Combine bulkWrite with safe filtering"
          ],
          "notes": "### `bulkWrite()` for High-Throughput Batches\n`Module.bulkWrite(ops)` accepts an array of write descriptors and sends them to MongoDB in **one** batched command:\n- `{ updateOne: { filter: { _id, courseId }, update: { $set: { order: idx + 1 } } } }`\n- `ordered: true` (default): Stops on the first error.\n- `ordered: false`: Runs all valid operations even if one fails (great for bulk imports).\n\n### Common Mistakes & Solutions\n- **Mistake**: Passing an empty array `[]` to `Model.bulkWrite([])`.\n  - **Solution**: Always check `if (operations.length === 0) return;` beforehand.",
          "codeExample": "export async function reorderCourseModules(courseId, orderedModuleIds) {\n  const operations = orderedModuleIds.map((modId, index) => ({\n    updateOne: {\n      filter: { _id: modId, courseId },\n      update: { $set: { order: index + 1 } }\n    }\n  }));\n\n  if (operations.length === 0) return { modifiedCount: 0 };\n  return Module.bulkWrite(operations);\n}",
          "codeExplanation": "1. Each operation filters by BOTH _id and courseId so a caller cannot accidentally reorder modules belonging to a different course.\n2. Guarding operations.length === 0 avoids sending an empty bulkWrite (which MongoDB rejects).\n\nHow to Run & Expected Output:\nCall `await reorderCourseModules(courseId, [id3, id1, id2])`. Updates all 3 `order` fields in one MongoDB command and returns `{ modifiedCount: 3 }`.",
          "practiceExercise": "Guided Exercise:\n1. Add a guard checking mongoose.Types.ObjectId.isValid(modId) on every ID before building the bulkWrite array.\n\nIndependent Challenge:\nBuild a bulkWrite upsert script ({ updateOne: { filter, update, upsert: true } }) to sync a batch of catalog items idempotently.\n\nExpected Result:\nSingle-round-trip batch updates scoped safely by parent `courseId`.",
          "keyTakeaways": [
            "bulkWrite() executes many inserts, updates, or deletes in a single database round-trip",
            "Guard against empty operations arrays before calling bulkWrite([])",
            "Include ownership/parent filters (e.g., courseId) inside every bulkWrite filter"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens if you forget to pass { session } to one of the Mongoose queries inside session.withTransaction()?",
          "options": [
            "Mongoose throws a syntax error",
            "That query executes outside the transaction and will NOT roll back if a later step fails",
            "MongoDB automatically attaches the session anyway",
            "The session closes immediately"
          ],
          "correctAnswer": 1,
          "explanation": "Every query participating in a transaction must explicitly receive { session }."
        },
        {
          "question": "Where should await session.endSession() always be placed?",
          "options": [
            "Before starting the transaction",
            "Inside a finally block so the session closes whether the transaction succeeds or throws",
            "Only inside the catch block",
            "Sessions never need to be closed"
          ],
          "correctAnswer": 1,
          "explanation": "Using finally guarantees the server/driver session resource is released even if an exception occurs."
        },
        {
          "question": "What happens if you call Model.bulkWrite([]) with an empty array?",
          "options": [
            "It deletes all documents",
            "MongoDB/Mongoose throws an error because bulkWrite requires at least one operation",
            "It returns all documents",
            "It creates a new collection"
          ],
          "correctAnswer": 1,
          "explanation": "Always guard with if (ops.length === 0) return; before calling bulkWrite()."
        },
        {
          "question": "Why does MongoDB require a Replica Set (like MongoDB Atlas) for multi-document transactions?",
          "options": [
            "Transactions use the replica set oplog to coordinate atomic commits and rollbacks across documents",
            "Standalone mongod cannot store ObjectIds",
            "Atlas blocks non-transactional writes",
            "Replica sets disable indexes"
          ],
          "correctAnswer": 0,
          "explanation": "Multi-document ACID transactions rely on the replica set’s distributed oplog mechanism."
        }
      ]
    },
    {
      "title": "Module 5: Connection Pooling, Caching & Migrations",
      "duration": "1h 45m",
      "objectives": [
        "Configure Mongoose connection pools and serverless caching cleanly",
        "Handle production Atlas timeouts and never mix dev/test/prod URIs",
        "Write backward-compatible schema migrations (expand-and-contract pattern)"
      ],
      "notes": "### Module Introduction\nProduction databases run continuously while application code deploys new versions. Knowing how connection pooling works — and how to evolve schemas without breaking live users or wiping production data — separates hobby projects from production systems.\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** covers Atlas connection pooling, serverless warm-container caching, and strict DB isolation between test and production.\n- **Lesson 2** teaches backward-compatible schema evolution (just like adding multi-part `lessons` to an existing `Module` schema without breaking single-document modules!).\n\n### Module Summary\nYou will manage MongoDB Atlas connections reliably and evolve schemas safely with zero downtime.\n\n### Completion Criteria\n- Complete both lessons and migration exercises.\n- Deliver the Backward-Compatible Schema Evolution assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nYour Course Module schema originally stored a single notes string per module. Now you are upgrading to multi-part lessons[] arrays while 500 existing production modules must keep rendering cleanly without any downtime or data loss.\n\nObjectives:\n- Design backward-compatible Mongoose schemas with safe defaults.\n- Write an idempotent migration script that only updates legacy documents lacking lessons.\n\nRequirements:\n1. Keep legacy top-level notes required/preserved alongside the new lessons: [lessonSchema] array (defaulting to []).\n2. Write an idempotent migration script migrateModulesToLessons():\n   - Queries only documents where { $or: [{ lessons: { $exists: false } }, { lessons: { $size: 0 } }] }.\n   - Wraps existing module notes into a 1-element lessons array without overwriting modules that already have lessons!\n3. Never drop or wipe the collection.\n\nStep-by-Step Instructions:\n1. Draft the dual-compatible moduleSchema.\n2. Write migrateModulesToLessons() using bulkWrite or updateMany with an idempotent filter.\n3. Verify running the migration twice produces 0 changes on the second run.\n\nDeliverables:\n- migrateModulesToLessons.js script.\n\nEvaluation Criteria:\n- Running the script twice is 100% idempotent (safe to re-run).\n- Zero data loss on existing modules.",
      "lessons": [
        {
          "title": "Serverless Connection Caching & Atlas Best Practices",
          "duration": "50m",
          "introduction": "Misconfigured connection logic in serverless environments can exhaust Atlas M0/M10 connection limits in minutes.",
          "objectives": [
            "Reuse Mongoose connection pools across warm serverless invocations",
            "Set appropriate maxPoolSize and serverSelectionTimeoutMS",
            "Isolate test databases strictly from production MongoDB Atlas clusters"
          ],
          "notes": "### Atlas Connection Hygiene\n- **Never** hardcode MongoDB Atlas URIs in source code — load `process.env.MONGODB_URI`.\n- **Never** run destructive test suites or `deleteMany({})` seeders against your production URI! Use a dedicated test database name (e.g., `cortex_test`) or an isolated test cluster.\n- In serverless functions (Vercel), cache the `mongoose.connect()` promise on `globalThis` and set `maxPoolSize: 10` so each function instance doesn't open excessive sockets.\n\n### Common Mistakes & Solutions\n- **Mistake**: Running `npm test` against your production `MONGO_URI` because `.env` was loaded automatically!\n  - **Solution**: Override the database name to a dedicated `_test` DB or abort if URI matches production.",
          "codeExample": "import mongoose from 'mongoose';\n\nconst cached = globalThis._db || (globalThis._db = { conn: null, promise: null });\n\nexport async function connectAtlas() {\n  if (cached.conn) return cached.conn;\n  const uri = process.env.MONGODB_URI;\n  if (!uri) throw new Error('MONGODB_URI is not configured');\n\n  if (!cached.promise) {\n    cached.promise = mongoose.connect(uri, {\n      maxPoolSize: 10,\n      serverSelectionTimeoutMS: 5000\n    });\n  }\n\n  try {\n    cached.conn = await cached.promise;\n    return cached.conn;\n  } catch (err) {\n    cached.promise = null; // Allow retry on next request\n    throw err;\n  }\n}",
          "codeExplanation": "1. Reuses cached.conn across warm requests.\n2. Resets cached.promise = null on failure so a temporary Atlas hiccup doesn’t permanently wedge the container.\n\nHow to Run & Expected Output:\nCall `await connectAtlas()` twice in a Node script with `MONGODB_URI` set. First call connects; second call returns the cached connection immediately.",
          "practiceExercise": "Guided Exercise:\n1. Verify how Mongoose’s uri database name segment works (mongodb+srv://.../cortex_prod vs .../cortex_test).\n\nIndependent Challenge:\nAdd a safety check in a test seeder script that refuses to run if process.env.MONGODB_URI does not contain \"test\" in the database name!\n\nExpected Result:\nPooled Atlas reuse with strict test/prod isolation.",
          "keyTakeaways": [
            "Cache Mongoose connection promises globally in serverless environments",
            "Reset cached.promise on error so subsequent requests can reconnect",
            "Strictly isolate test databases from production Atlas data"
          ]
        },
        {
          "title": "Backward-Compatible Schema Migrations",
          "duration": "55m",
          "introduction": "In production, old code and new documents (or new code and old documents) briefly coexist during deployments. Backward-compatible schemas prevent crashes.",
          "objectives": [
            "Apply the Expand-and-Contract pattern for zero-downtime schema changes",
            "Support legacy and new document shapes simultaneously in application code",
            "Write idempotent migration scripts safe to run multiple times"
          ],
          "notes": "### Expand-and-Contract Pattern\nNever rename or delete a required field in one big-bang deploy!\n1. **Expand**: Add the new field (`lessons: []`) as optional with a safe default, and update UI/API code to read `lessons` if non-empty, falling back to legacy `notes` otherwise.\n2. **Backfill (Idempotently)**: Run a script that migrates legacy records where `lessons` is missing/empty.\n3. **Contract**: Only after all records are migrated and old code is retired, clean up deprecated fields if needed.\n\n### Common Mistakes & Solutions\n- **Mistake**: Renaming or deleting a required schema field in one deploy while old server instances or documents still exist.\n  - **Solution**: Use Expand -> Backfill (idempotently) -> Contract across safe releases.",
          "codeExample": "// Idempotent backfill: safe to run 1 time or 10 times\nexport async function backfillModuleLessons(ModuleModel) {\n  const legacyModules = await ModuleModel.find({\n    $or: [{ lessons: { $exists: false } }, { lessons: { $size: 0 } }]\n  }).lean();\n\n  const ops = legacyModules.map((mod) => ({\n    updateOne: {\n      filter: { _id: mod._id, 'lessons.0': { $exists: false } },\n      update: {\n        $set: {\n          lessons: [{ title: mod.title, duration: mod.duration || '30m', notes: mod.notes }]\n        }\n      }\n    }\n  }));\n\n  if (ops.length === 0) return { migrated: 0 };\n  const res = await ModuleModel.bulkWrite(ops);\n  return { migrated: res.modifiedCount };\n}",
          "codeExplanation": "1. The query targets only modules lacking lessons.\n2. The bulkWrite filter double-checks 'lessons.0': { $exists: false } so even concurrent runs remain 100% idempotent.\n\nHow to Run & Expected Output:\nRun `await backfillModuleLessons(Module)` twice: first run prints `{ migrated: N }`, second run prints `{ migrated: 0 }` (idempotent!).",
          "practiceExercise": "Guided Exercise:\n1. Write a frontend/API helper getDisplayNotes(mod) that returns mod.lessons?.[0]?.notes ?? mod.notes so both old and new records render cleanly.\n\nIndependent Challenge:\nExplain why removing a field immediately in a rolling deploy causes errors on servers still running the previous code version.\n\nExpected Result:\nIdempotent backfill with zero downtime or data loss.",
          "keyTakeaways": [
            "Use Expand-and-Contract for zero-downtime MongoDB schema evolution",
            "Write idempotent migrations that filter strictly for un-migrated documents",
            "Support fallback reading in application code during transitions"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should a serverless connectDB() helper reset cached.promise = null inside its catch block?",
          "options": [
            "To delete the database",
            "So a single transient connection failure doesn’t permanently cache a rejected Promise for future requests",
            "To clear user sessions",
            "To disable pooling"
          ],
          "correctAnswer": 1,
          "explanation": "If a rejected Promise stays cached, every future invocation in that container will immediately fail without retrying."
        },
        {
          "question": "What makes a database migration script \"idempotent\"?",
          "options": [
            "It deletes all records before inserting",
            "Running it multiple times produces the exact same end state without duplicating data or failing",
            "It runs without an internet connection",
            "It bypasses schema validation"
          ],
          "correctAnswer": 1,
          "explanation": "Idempotent migrations filter only un-migrated records so re-running them is completely safe."
        },
        {
          "question": "In the Expand-and-Contract migration pattern, what do you do first when introducing a new field structure?",
          "options": [
            "Delete the old field immediately",
            "Add the new field alongside the old one with safe fallbacks before backfilling",
            "Drop the collection",
            "Turn off indexes"
          ],
          "correctAnswer": 1,
          "explanation": "Expanding first lets old and new code coexist safely while data is backfilled."
        },
        {
          "question": "Why must automated integration tests use an isolated test database instead of the production database?",
          "options": [
            "Production databases don’t support Mongoose",
            "Tests insert, mutate, and clean up synthetic data that would corrupt or wipe real user records",
            "Test databases don’t need indexes",
            "MongoDB forbids tests on Atlas"
          ],
          "correctAnswer": 1,
          "explanation": "Automated tests frequently reset or modify data and must always stay strictly isolated from production records."
        }
      ]
    },
    {
      "title": "Module 6: Full-Text Search, Pagination & Capstone",
      "duration": "1h 45m",
      "objectives": [
        "Escape user input before building MongoDB $regex search queries (preventing ReDoS)",
        "Implement efficient limit/skip and cursor pagination",
        "Review end-to-end MongoDB + Mongoose architecture for production readiness"
      ],
      "notes": "### Module Introduction\nPassing raw user search strings into `new RegExp(req.query.q)` is a classic Denial-of-Service vulnerability (**ReDoS** — Regular Expression Denial of Service) AND throws errors on characters like `[` or `(`. Combined with clean pagination, your search APIs stay fast and resilient.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** teaches escaping regex metacharacters cleanly (and when to use MongoDB `$text` indexes).\n- **Lesson 2** covers `limit`/`skip` pagination vs cursor pagination and wraps up the Mongoose architecture capstone.\n\n### Module Summary\nYou now have complete mastery of MongoDB & Mongoose architecture — modeling, indexing, aggregations, transactions, migrations, search, and pagination.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the Safe Search & Paginated Catalog API assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nA user typed \"(react\" into the course search bar and crashed the backend with a SyntaxError in RegExp, while another user requested ?page=1&limit=100000 to dump the entire database at once. Fix both issues.\n\nObjectives:\n- Escape regex metacharacters safely before querying MongoDB with $regex.\n- Clamp pagination page and limit parameters safely and return total/pages metadata.\n\nRequirements:\n1. Write escapeRegex(str) escaping .*+?^$()[]{}|\\ characters.\n2. Cap query length (e.g., max 80 chars) and validate typeof === 'string'.\n3. Clamp page = Math.max(1, parseInt(req.query.page, 10) || 1) and limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12)).\n4. Run Course.find(filter).skip((page - 1) * limit).limit(limit).lean() alongside Course.countDocuments(filter) in Promise.all.\n\nStep-by-Step Instructions:\n1. Implement escapeRegex and clampPagination helpers.\n2. Test searching for \"(react\" and \"c++\" — verify zero crashes and accurate escaping.\n3. Test ?limit=99999 — verify it clamps cleanly to 50.\n\nDeliverables:\n- searchCatalog.js module.\n\nEvaluation Criteria:\n- Zero unhandled RegExp SyntaxErrors on special characters.\n- Hard upper cap on limit prevents full-collection dumps.",
      "lessons": [
        {
          "title": "Safe Search Queries & Escaping Regex",
          "duration": "50m",
          "introduction": "Letting users pass unescaped characters like (, [, or catastrophic backtracking patterns into MongoDB $regex can crash your route or freeze CPU.",
          "objectives": [
            "Escape regex metacharacters cleanly before passing to $regex",
            "Cap search string length and verify string type",
            "Know when MongoDB $text indexes outperform $regex"
          ],
          "notes": "### Why Raw `$regex` Is Dangerous\n1. If a user searches for `\"C++\"` or `\"(react\"`, unescaped `+` or `(` causes an immediate **`SyntaxError: Invalid regular expression`**!\n2. Crafted evil patterns like `(a+)+$` can trigger **ReDoS** (exponential CPU backtracking).\n3. Leading-wildcard regexes (`/react/i`) **cannot use standard B-Tree indexes**, forcing a `COLLSCAN`.\n**Fix**: Always escape metacharacters with `escapeRegex(str)` and cap length (e.g., 80 chars). For large catalogs, create a MongoDB `$text` index (`schema.index({ title: 'text', description: 'text' })`) or Atlas Search!\n\n### Common Mistakes & Solutions\n- **Mistake**: Passing `req.query.q` directly to `new RegExp(req.query.q, 'i')`.\n  - **Solution**: Check `typeof === 'string'`, cap length (`.slice(0, 80)`), and escape regex metacharacters with `escapeRegex()`.",
          "codeExample": "export function escapeRegex(str = '') {\n  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n}\n\nexport function buildSearchFilter(rawQuery) {\n  if (typeof rawQuery !== 'string') return {};\n  const trimmed = rawQuery.trim().slice(0, 80);\n  if (!trimmed) return {};\n\n  const safePattern = new RegExp(escapeRegex(trimmed), 'i');\n  return {\n    $or: [{ title: safePattern }, { description: safePattern }]\n  };\n}\n\nconsole.log(buildSearchFilter('(C++ & React)'));",
          "codeExplanation": "1. escapeRegex prepends a backslash before every regex metacharacter so C++ and (React) match literally.\n2. .slice(0, 80) bounds input length to protect CPU.\n\nHow to Run & Expected Output:\nRun `node search.js`. Prints `{ '$or': [ { title: /\\(C\\+\\+ & React\\)/i }, { description: /\\(C\\+\\+ & React\\)/i } ] }` with zero SyntaxErrors.",
          "practiceExercise": "Guided Exercise:\n1. Test new RegExp('(react') vs new RegExp(escapeRegex('(react')) in Node to see the crash prevented.\n\nIndependent Challenge:\nDefine a compound text index { title: 'text', tags: 'text' } with weights { title: 3, tags: 1 } on a Course schema.\n\nExpected Result:\nSpecial characters like `(`, `+`, and `?` match literally without crashing RegExp.",
          "keyTakeaways": [
            "Always escape regex metacharacters and cap query length before building $regex filters",
            "Validate typeof rawQuery === \"string\" to block NoSQL object payloads",
            "Prefer MongoDB $text indexes or Atlas Search over $regex for large datasets"
          ]
        },
        {
          "title": "Pagination & Capstone Database Review",
          "duration": "55m",
          "introduction": "Returning 10,000 documents in a single API response crashes mobile browsers. Clean pagination keeps responses fast and predictable.",
          "objectives": [
            "Implement clamped offset pagination (page, limit, totalPages)",
            "Explain why cursor-based pagination (_id > lastId) scales better for deep feeds",
            "Verify end-to-end database health with indexes, lean queries, and transactions"
          ],
          "notes": "### Offset Pagination vs. Cursor Pagination\n- **Offset (`skip` + `limit`)**: Simple and supports jumping to \"Page 4\" directly. Always clamp `limit` (e.g., max `50`) so clients can't request `?limit=1000000`. Note that `skip(50000)` still scans and discards 50,000 index entries!\n- **Cursor (`_id: { $gt: lastId }` + `limit`)**: Ideal for infinite scroll or huge feeds — jumps straight into the B-Tree index in `O(log n)` regardless of page depth!\n\n### Common Mistakes & Solutions\n- **Mistake**: Trusting `Number(req.query.limit)` directly, letting clients pass `limit=1000000` or `limit=-5`.\n  - **Solution**: Clamp `safePage >= 1` and `1 <= safeLimit <= 50`.",
          "codeExample": "export async function paginateCourses(CourseModel, { page = 1, limit = 12 } = {}) {\n  const safePage = Math.max(1, Number.parseInt(page, 10) || 1);\n  const safeLimit = Math.min(50, Math.max(1, Number.parseInt(limit, 10) || 12));\n  const skip = (safePage - 1) * safeLimit;\n\n  const [items, total] = await Promise.all([\n    CourseModel.find().sort({ createdAt: -1 }).skip(skip).limit(safeLimit).lean(),\n    CourseModel.countDocuments()\n  ]);\n\n  return {\n    items,\n    page: safePage,\n    limit: safeLimit,\n    total,\n    totalPages: Math.ceil(total / safeLimit)\n  };\n}",
          "codeExplanation": "1. safePage and safeLimit clamp negative, NaN, or absurdly large values cleanly.\n2. Promise.all runs the paginated .lean() query and countDocuments() in parallel.\n\nHow to Run & Expected Output:\nCall `await paginateCourses(Course, { page: 1, limit: 12 })`. Returns `{ items: [...], page: 1, limit: 12, total: 11, totalPages: 1 }`.",
          "practiceExercise": "Guided Exercise:\n1. Test paginateCourses with { page: -5, limit: 5000 } and confirm it clamps to page: 1, limit: 50.\n\nIndependent Challenge:\nSketch a cursor-based pagination query fetching the next 20 messages older than lastMessageId using { _id: { $lt: lastMessageId } }.\n\nExpected Result:\nClamped, parallelized pagination safe against negative or oversized query params.",
          "keyTakeaways": [
            "Always clamp page (>= 1) and limit (1..50) on paginated API endpoints",
            "Run paginated data queries and countDocuments in parallel with Promise.all",
            "Use cursor-based pagination (_id < lastId) for deep infinite-scroll feeds"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must user search strings be escaped before passing them to new RegExp(query, \"i\") for MongoDB $regex?",
          "options": [
            "MongoDB forbids lowercase letters",
            "Special characters like ( or + throw RegExp SyntaxErrors and crafted patterns can trigger ReDoS CPU stalls",
            "Escaping converts strings to ObjectIds",
            "RegExp is deprecated in Node"
          ],
          "correctAnswer": 1,
          "explanation": "Unescaped regex metacharacters can throw SyntaxErrors on inputs like \"(react\" or \"C++\" and expose the server to ReDoS."
        },
        {
          "question": "Why should an API endpoint always clamp req.query.limit (e.g., max 50)?",
          "options": [
            "MongoDB crashes if limit > 50",
            "To prevent clients from requesting ?limit=1000000 and forcing the server to serialize the entire database into RAM",
            "To enable .lean()",
            "To sort descending"
          ],
          "correctAnswer": 1,
          "explanation": "Without an upper clamp on limit, an attacker or buggy client can trigger huge memory/bandwidth spikes."
        },
        {
          "question": "When does cursor-based pagination (_id > lastId) outperform skip()/limit()?",
          "options": [
            "When jumping directly to page 2 of a 30-item catalog",
            "On deep infinite-scroll feeds with tens of thousands of documents, because skip() still scans and discards skipped entries",
            "When collections have 0 indexes",
            "Only in SQL databases"
          ],
          "correctAnswer": 1,
          "explanation": "skip(N) must walk past N entries in the index; cursor pagination jumps straight to the cursor in O(log n)."
        },
        {
          "question": "How can you run a paginated .find().lean() query and a total countDocuments() in the fastest way?",
          "options": [
            "Await them sequentially one after the other",
            "Run both concurrently using Promise.all([...])",
            "Use setTimeout between them",
            "Use fs.readFileSync"
          ],
          "correctAnswer": 1,
          "explanation": "Because the list fetch and total count are independent reads, Promise.all executes them in parallel."
        }
      ]
    },
    {
      "title": "Module 7: Advanced Aggregation — $lookup, $unwind & $facet",
      "duration": "2h 00m",
      "objectives": [
        "Join related collections cleanly on the database server using $lookup",
        "Flatten array fields safely with $unwind (and preserveNullAndEmptyArrays)",
        "Run parallel pagination + total count + filter facets in one query using $facet"
      ],
      "notes": "### Module Introduction & Description\nWhile MongoDB favors embedding when bounded, normalized collections (like `Enrollments` -> `Courses`, or `Orders` -> `Users`) occasionally need server-side joins and multi-dimensional analytics. **`$lookup`**, **`$unwind`**, and **`$facet`** unlock relational-grade reporting in a single aggregation pass.\n\n### Prerequisites\n- Completion of Modules 1–6 (schemas, indexes, basic `$match`/`$group`).\n\n### Skills Acquired\n- Server-side `$lookup` joins, safe `$unwind` flattening, and single-query paginated analytics with `$facet`.\n\n### How the Lessons Connect\n- **Lesson 1** teaches `$lookup` + `$unwind` without dropping parent documents that have empty arrays.\n- **Lesson 2** builds single-query paginated catalogs + category counts using `$facet`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Enrolled Course Analytics & Faceted Catalog assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nAn Admin Analytics page needs (1) a list of Enrollments joined with Course titles and Student names, and (2) a single catalog query returning paginated courses AND total counts per difficulty in one database round-trip.\n\nObjectives:\n- Join collections cleanly using $lookup + $unwind.\n- Return paginated items alongside facet counts using $facet.\n\nRequirements:\n1. Build an aggregation on Enrollment using $lookup to attach course title/category from courses, followed by $unwind with preserveNullAndEmptyArrays: true.\n2. Build a $facet pipeline on Course returning:\n   - items: [$sort, $skip, $limit, $project]\n   - totalCount: [{ $count: 'count' }]\n   - byDifficulty: [{ $group: { _id: '$difficulty', count: { $sum: 1 } } }].\n3. Ensure foreignField in $lookup ('_id') is indexed (default on _id!).\n\nStep-by-Step Instructions:\n1. Write both pipelines in analyticsAggregations.js.\n2. Verify preserveNullAndEmptyArrays: true keeps enrollments even if a referenced course was deleted.\n\nDeliverables:\n- analyticsAggregations.js.\n\nEvaluation Criteria:\n- Safe $unwind preserving unmatched rows.\n- Single-query $facet pagination.",
      "lessons": [
        {
          "title": "Joining Collections with $lookup & Flattening with $unwind",
          "duration": "1h 00m",
          "introduction": "$lookup performs a left outer join between collections directly inside MongoDB — eliminating manual multi-query stitching for reporting pipelines.",
          "objectives": [
            "Join two collections with $lookup (from, localField, foreignField, as)",
            "Use preserveNullAndEmptyArrays: true on $unwind so unmatched records aren’t dropped"
          ],
          "notes": "### Safe `$lookup` + `$unwind`\n`$lookup` always outputs an **array** in the `as` field (even when joining by unique `_id`). Adding `$unwind: { path: '$course', preserveNullAndEmptyArrays: true }` turns that 1-element array into an object — and `preserveNullAndEmptyArrays: true` ensures the parent record isn't silently deleted if the foreign document is missing!\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `$unwind: '$course'` as a bare string, silently dropping rows where `course` is missing.\n  - **Solution**: Always pass `preserveNullAndEmptyArrays: true` for left-join behavior.",
          "codeExample": "const enrichedEnrollments = await Enrollment.aggregate([\n  { $match: { progress: { $gte: 50 } } },\n  {\n    $lookup: {\n      from: 'courses', // actual MongoDB collection name (lowercase plural!)\n      localField: 'courseId',\n      foreignField: '_id',\n      as: 'course'\n    }\n  },\n  { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },\n  { $project: { progress: 1, courseTitle: '$course.title' } }\n]);",
          "codeExplanation": "1. from: 'courses' matches the physical MongoDB collection name (lowercase plural of Course).\n2. preserveNullAndEmptyArrays: true keeps the enrollment row even if the course document was removed.\n\nHow to Run & Expected Output:\nRun against seeded Enrollments/Courses in MongoDB. Returns objects like `{ _id, progress: 80, courseTitle: 'HTML & CSS Masterclass' }`.",
          "practiceExercise": "Guided Exercise:\n1. Check your Mongoose model's physical collection name via `Course.collection.name` (usually `'courses'`) before writing `from:` in `$lookup`.\n\nIndependent Challenge:\nAdd a `pipeline:` sub-stage inside `$lookup` with `$project: { title: 1, difficulty: 1 }` so MongoDB doesn't load heavy unused course fields during the join!\n\nExpected Result:\nLean, non-dropping server-side joins.",
          "keyTakeaways": [
            "$lookup uses the physical MongoDB collection name (usually lowercase plural), not the Mongoose model name",
            "Always set preserveNullAndEmptyArrays: true on $unwind for safe left-outer-join behavior"
          ]
        },
        {
          "title": "Multi-Pipeline Analytics & Pagination with $facet",
          "duration": "1h 00m",
          "introduction": "$facet lets MongoDB run multiple independent aggregation sub-pipelines on the same matched dataset in one single query.",
          "objectives": [
            "Combine paginated results and total count in one $facet stage",
            "Respect the 16 MB result size limit when using $facet"
          ],
          "notes": "### Single-Query Faceted Search\nWhen building a filter sidebar showing *\"Beginner (4), Intermediate (5), Advanced (2)\"* alongside Page 1 of results, `$facet` computes both the paginated slice AND the category counts in one database round-trip!\n*(Note: Keep `$match` BEFORE `$facet` so indexes filter first, and remember the entire `$facet` output document is still subject to MongoDB's 16 MB limit — always `$limit` the `items` branch!)*",
          "codeExample": "const [catalog] = await Course.aggregate([\n  { $match: { isPublished: true } },\n  {\n    $facet: {\n      items: [{ $sort: { createdAt: -1 } }, { $skip: 0 }, { $limit: 12 }],\n      total: [{ $count: 'count' }],\n      byDifficulty: [{ $group: { _id: '$difficulty', count: { $sum: 1 } } }]\n    }\n  }\n]);",
          "codeExplanation": "1. $match filters published courses first using indexes.\n2. $facet splits into three parallel branches returning items, total count, and difficulty breakdown in one response document.\n\nHow to Run & Expected Output:\nRun on seeded Courses: `catalog.items` holds up to 12 courses, `catalog.total[0]?.count` holds total count, and `catalog.byDifficulty` lists counts per level.",
          "practiceExercise": "Guided Exercise:\n1. Handle an empty catalog safely: `const total = catalog?.total?.[0]?.count ?? 0;`.\n\nIndependent Challenge:\nAdd a `byCategory` facet grouping by `'$category'` sorted descending by count.\n\nExpected Result:\nOne-round-trip paginated catalog with live filter counts.",
          "keyTakeaways": [
            "Place $match before $facet so indexes filter documents before branching",
            "Always apply $limit inside paginated $facet branches to stay well below the 16 MB document cap"
          ]
        }
      ],
      "quiz": [
        {
          "question": "In a Mongoose `$lookup` stage, what value must you pass to `from:`?",
          "options": [
            "The JavaScript file name",
            "The physical MongoDB collection name (typically lowercase plural, like \"courses\")",
            "The capitalized Mongoose model name (\"Course\")",
            "The database URI"
          ],
          "correctAnswer": 1,
          "explanation": "$lookup operates directly inside MongoDB and requires the actual collection name (e.g., Course.collection.name -> \"courses\")."
        },
        {
          "question": "What happens if you use `$unwind: \"$course\"` without `preserveNullAndEmptyArrays: true` when an enrollment references a missing course?",
          "options": [
            "It inserts a dummy course",
            "That enrollment document is silently dropped from the aggregation output",
            "MongoDB throws a 404 error",
            "It converts null to []"
          ],
          "correctAnswer": 1,
          "explanation": "Default $unwind drops documents whose target array is empty or missing; preserveNullAndEmptyArrays: true preserves them."
        },
        {
          "question": "Why should `$match` generally be placed BEFORE `$facet`?",
          "options": [
            "$facet cannot run without $match",
            "So MongoDB can use indexes to filter documents once before running multiple $facet sub-pipelines",
            "To disable sorting",
            "To bypass the 16 MB limit"
          ],
          "correctAnswer": 1,
          "explanation": "Filtering before $facet leverages collection indexes and shrinks the working set for all facet branches."
        },
        {
          "question": "Why must you always include `$limit` inside the `items` branch of a `$facet` stage?",
          "options": [
            "MongoDB requires $limit in every stage",
            "Because the entire $facet result is returned as one single BSON document capped at 16 MB",
            "$limit sorts items automatically",
            "Without $limit, $count returns 0"
          ],
          "correctAnswer": 1,
          "explanation": "All branches of $facet combine into one single document, so unbounded items arrays could exceed 16 MB."
        }
      ]
    },
    {
      "title": "Module 8: TTL Indexes, Time-Series & Geospatial Queries",
      "duration": "1h 45m",
      "objectives": [
        "Auto-expire temporary OTPs, sessions, and verification records with MongoDB TTL indexes",
        "Query nearby locations cleanly using GeoJSON Point fields and 2dsphere indexes"
      ],
      "notes": "### Module Introduction & Description\nManually writing cron jobs to delete expired 15-minute OTP codes or password reset tokens is error-prone. MongoDB **TTL (Time-To-Live) Indexes** delete expired documents automatically in the background, while **2dsphere** indexes power location-based search.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Configuring `expireAfterSeconds` TTL indexes and modeling GeoJSON `Point` coordinates with `2dsphere` indexes.\n\n### How the Lessons Connect\n- **Lesson 1** configures TTL indexes for OTPs, reset tokens, and ephemeral logs.\n- **Lesson 2** introduces GeoJSON `2dsphere` indexes and `$near` queries.\n\n### Completion Criteria\n- Complete both lessons, deliver the Auto-Expiring OTP & Nearby Campus Finder assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nPendingUser OTP verification records currently stay in MongoDB forever if a user abandons signup, AND a study-group finder needs to query study hubs within 5 km of a student's coordinates.\n\nObjectives:\n- Configure a TTL index on expiresAt so MongoDB deletes stale OTP records automatically.\n- Model a GeoJSON Point field with a 2dsphere index and $near query.\n\nRequirements:\n1. In PendingUserSchema, add `expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }`.\n2. Explain why TTL expiration runs via a ~60s background thread (so auth controllers MUST still check `expiresAt > new Date()` in code!).\n3. In StudyHubSchema, define `location: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } }` with `index('2dsphere')` (remember: [longitude, latitude] order!).\n\nStep-by-Step Instructions:\n1. Create ttlAndGeoSchemas.js with both schemas and a findNearbyHubs(lng, lat, maxMeters) helper.\n2. Verify [longitude, latitude] ordering in GeoJSON!\n\nDeliverables:\n- ttlAndGeoSchemas.js.\n\nEvaluation Criteria:\n- Auth code still enforces expiresAt > now despite TTL index.\n- GeoJSON coordinates strictly [longitude, latitude].",
      "lessons": [
        {
          "title": "Auto-Expiring OTPs & Sessions with TTL Indexes",
          "duration": "50m",
          "introduction": "TTL indexes let MongoDB act as a self-cleaning store for temporary verification codes, rate-limit windows, and audit logs.",
          "objectives": [
            "Create TTL indexes using expireAfterSeconds: 0 on an explicit expiresAt Date field",
            "Still validate expiresAt > new Date() in application code (since TTL cleanup runs ~every 60 seconds)"
          ],
          "notes": "### The 60-Second TTL Gotcha!\nMongoDB's TTL monitor thread wakes up roughly **once every 60 seconds** to delete expired documents. That means an OTP expiring at `12:00:00` might still sit in the collection at `12:00:40`!\n**Security Rule**: Always check `if (record.expiresAt <= new Date())` in your controller logic — treat the TTL index as automatic storage cleanup, not your sole security timer!",
          "codeExample": "import mongoose from 'mongoose';\n\nconst otpSchema = new mongoose.Schema({\n  email: { type: String, required: true, index: true },\n  codeHash: { type: String, required: true },\n  // expireAfterSeconds: 0 tells MongoDB to delete at the exact Date stored in expiresAt\n  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }\n});\n\nexport default mongoose.model('OtpToken', otpSchema);",
          "codeExplanation": "1. Setting expireAfterSeconds: 0 on expiresAt lets each document specify its own dynamic expiration timestamp (e.g., 10 minutes from now).\n\nHow to Run & Expected Output:\nInsert an OtpToken with `expiresAt: new Date(Date.now() + 10 * 60_000)`. MongoDB automatically purges it ~10 minutes later.",
          "practiceExercise": "Guided Exercise:\n1. Write a controller check rejecting an OTP if `otpDoc.expiresAt.getTime() <= Date.now()` even if MongoDB's 60s TTL sweep hasn't deleted it yet.\n\nIndependent Challenge:\nCompare `expireAfterSeconds: 86400` on `createdAt` (fixed 24h lifetime) vs `expireAfterSeconds: 0` on `expiresAt` (per-document flexible expiry).\n\nExpected Result:\nSelf-cleaning temporary collections with strict application-level expiry enforcement.",
          "keyTakeaways": [
            "TTL indexes automatically delete expired Date-indexed documents in the background",
            "Use expireAfterSeconds: 0 on an explicit expiresAt Date for per-document expiration times",
            "Always enforce expiresAt > new Date() in application code since the TTL monitor runs ~every 60s"
          ]
        },
        {
          "title": "Geospatial 2dsphere Indexes & $near Queries",
          "duration": "55m",
          "introduction": "Finding nearby stores, campuses, or events takes just 5 lines in MongoDB using GeoJSON Point fields and a 2dsphere index.",
          "objectives": [
            "Store GeoJSON Points with [longitude, latitude] coordinate order",
            "Query within a radius in meters using $near and $maxDistance"
          ],
          "notes": "### Watch Out for `[longitude, latitude]` Order!\nIn everyday speech we say \"latitude, longitude\" — **GeoJSON requires `[longitude, latitude]`** (X first, Y second)! Swapping them puts your location in the wrong hemisphere or throws an out-of-range error if latitude > 90!",
          "codeExample": "const hubSchema = new mongoose.Schema({\n  name: String,\n  location: {\n    type: { type: String, enum: ['Point'], required: true },\n    coordinates: { type: [Number], required: true } // [longitude, latitude]\n  }\n});\n\nhubSchema.index({ location: '2dsphere' });\n\n// Find hubs within 5,000 meters (5 km):\n// Hub.find({ location: { $near: { $geometry: { type: 'Point', coordinates: [lng, lat] }, $maxDistance: 5000 } } });",
          "codeExplanation": "1. location follows the strict GeoJSON Point schema.\n2. 2dsphere index enables spherical Earth distance queries via $near and $maxDistance (in meters).\n\nHow to Run & Expected Output:\nSeed 2 Hubs with [lng, lat] coordinates and query with $near: returns matching hubs sorted from closest to farthest.",
          "practiceExercise": "Guided Exercise:\n1. Validate longitude (-180..180) and latitude (-90..90) before saving coordinates to MongoDB.\n\nIndependent Challenge:\nCheck why `$near` automatically sorts results by distance ascending (closest first).\n\nExpected Result:\nAccurate Earth-surface radius queries in meters.",
          "keyTakeaways": [
            "GeoJSON coordinates MUST be ordered [longitude, latitude]",
            "Create a 2dsphere index on the GeoJSON location field to enable $near queries"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must your auth controller still check `otp.expiresAt > new Date()` even when a MongoDB TTL index is configured?",
          "options": [
            "TTL indexes only work on strings",
            "MongoDB’s background TTL monitor runs roughly once every 60 seconds, so an expired document may briefly remain readable",
            "Mongoose ignores TTL indexes",
            "Date comparisons are faster than indexes"
          ],
          "correctAnswer": 1,
          "explanation": "TTL cleanup is eventual (~60s interval), so security checks must always verify expiration timestamps in code."
        },
        {
          "question": "In MongoDB GeoJSON, what is the required order of coordinates in the `coordinates` array?",
          "options": [
            "[latitude, longitude]",
            "[longitude, latitude]",
            "[altitude, latitude, longitude]",
            "Order does not matter"
          ],
          "correctAnswer": 1,
          "explanation": "GeoJSON strictly uses [longitude, latitude] (horizontal X before vertical Y)."
        },
        {
          "question": "What does `expireAfterSeconds: 0` on an `expiresAt` Date field tell MongoDB?",
          "options": [
            "Never expire the document",
            "Delete each document shortly after the exact timestamp stored in its `expiresAt` field",
            "Delete the entire collection immediately",
            "Expire after 1 hour"
          ],
          "correctAnswer": 1,
          "explanation": "Setting expireAfterSeconds: 0 lets each document control its own dynamic expiration timestamp via expiresAt."
        },
        {
          "question": "Which index type is required for `$near` and `$geoWithin` queries on Earth-like coordinates?",
          "options": [
            "text",
            "hashed",
            "2dsphere",
            "unique"
          ],
          "correctAnswer": 2,
          "explanation": "2dsphere indexes calculate spherical geometry across Earth-surface GeoJSON coordinates."
        }
      ]
    },
    {
      "title": "Module 9: Mongoose Hooks, Virtuals & Schema Discriminators",
      "duration": "1h 45m",
      "objectives": [
        "Hash passwords or normalize fields cleanly in Mongoose pre(\"save\") hooks",
        "Compute derived display fields with Virtuals (and enable toJSON: { virtuals: true })",
        "Model polymorphic sub-types in one collection using Mongoose Discriminators"
      ],
      "notes": "### Module Introduction & Description\nMongoose offers powerful schema-level abstractions: **`pre('save')` hooks** (for automatic password hashing only when modified), **Virtuals** (computed fields never stored on disk), and **Discriminators** (sharing one `Notification` or `Content` collection across distinct sub-schemas).\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Writing safe `pre('save')` hooks (and knowing when `findByIdAndUpdate` bypasses them!), using Virtuals, and structuring Discriminators.\n\n### How the Lessons Connect\n- **Lesson 1** covers `pre('save')` hooks and Virtual properties.\n- **Lesson 2** introduces Mongoose Discriminators for polymorphic collections.\n\n### Completion Criteria\n- Complete both lessons, deliver the Password Hook & Polymorphic Notification Schema assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nA User model hashes passwords inside pre('save') — but accidentally re-hashes an already-hashed password whenever a user updates their display name! Also, a Notifications collection needs to store both CourseAnnouncement (courseId) and QuizResult (score, total) cleanly.\n\nObjectives:\n- Guard pre('save') password hashing with if (!this.isModified('password')) return next();.\n- Model polymorphic Notification types using Mongoose model.discriminator().\n\nRequirements:\n1. Implement userSchema.pre('save', async function () { if (!this.isModified('password') || !this.password) return; ... }).\n2. Add a virtual initials on User computing initials from this.name.\n3. Create base Notification model and two discriminators: AnnouncementNotification and QuizNotification.\n\nStep-by-Step Instructions:\n1. Implement userHooks.js and notificationDiscriminators.js.\n2. Explain in a comment why User.findByIdAndUpdate() does NOT trigger pre('save') hooks!\n\nDeliverables:\n- userHooks.js and notificationDiscriminators.js.\n\nEvaluation Criteria:\n- Checks this.isModified('password') so updating name/role never double-hashes password.\n- Clean discriminatorKey setup.",
      "lessons": [
        {
          "title": "Middleware Hooks (pre/post save) & Virtual Properties",
          "duration": "55m",
          "introduction": "A classic Mongoose bug is double-hashing a user’s password whenever they edit their profile name because pre(\"save\") ran unconditionally.",
          "objectives": [
            "Guard pre(\"save\") hooks with this.isModified(\"password\")",
            "Remember that updateOne / findByIdAndUpdate bypass save hooks completely",
            "Define computed Virtual properties without storing duplicate data in MongoDB"
          ],
          "notes": "### Two Classic Mongoose Hook Traps\n1. **Double Hashing**: Always write `if (!this.isModified('password')) return;` at the top of `pre('save')`!\n2. **`findByIdAndUpdate` Skips `save` Hooks**: `User.findByIdAndUpdate(id, { password })` does **NOT** fire `pre('save')`! For password updates, fetch `const user = await User.findById(id); user.password = newPass; await user.save();`.",
          "codeExample": "userSchema.pre('save', async function () {\n  if (!this.isModified('password') || !this.password) return;\n  this.password = await bcrypt.hash(this.password, 12);\n});\n\nuserSchema.virtual('displayLabel').get(function () {\n  return `${this.name} (${this.role})`;\n});",
          "codeExplanation": "1. this.isModified('password') ensures bcrypt only hashes when password is new or changed.\n2. displayLabel computes a formatted string on demand without storing redundant text in MongoDB.\n\nHow to Run & Expected Output:\nCall `user.name = 'New Name'; await user.save();`: password hash stays untouched while `user.displayLabel` reflects the new name.",
          "practiceExercise": "Guided Exercise:\n1. Enable `{ toJSON: { virtuals: true } }` in schema options so `res.json(user)` includes `displayLabel`.\n\nIndependent Challenge:\nExplain why `async function () { ... }` Mongoose hooks do NOT take a `next` callback (returning/throwing a Promise handles completion automatically).\n\nExpected Result:\nBug-free password hooks and clean computed virtuals.",
          "keyTakeaways": [
            "Always guard pre(\"save\") password hooks with if (!this.isModified(\"password\")) return",
            "Remember findByIdAndUpdate / updateMany bypass pre(\"save\") hooks",
            "Use virtuals for derived display strings instead of storing duplicate fields in MongoDB"
          ]
        },
        {
          "title": "Schema Discriminators for Polymorphic Collections",
          "duration": "50m",
          "introduction": "When an Activity Feed stores CommentEvents, EnrollmentEvents, and QuizEvents in one sorted collection, Discriminators let each event type keep its own strict fields.",
          "objectives": [
            "Create a base Mongoose schema with discriminatorKey",
            "Attach typed sub-models using BaseModel.discriminator()"
          ],
          "notes": "### How Discriminators Work\nAll documents live in **one** MongoDB collection (great for fast sorted timelines!), tagged automatically with `kind: 'QuizEvent'` or `kind: 'EnrollEvent'`, while Mongoose enforces each subtype's own required fields!",
          "codeExample": "const eventSchema = new mongoose.Schema({\n  userId: { type: mongoose.Schema.Types.ObjectId, required: true }\n}, { discriminatorKey: 'kind', timestamps: true });\n\nconst Activity = mongoose.model('Activity', eventSchema);\nconst QuizActivity = Activity.discriminator('QuizActivity', new mongoose.Schema({\n  score: { type: Number, required: true }\n}));",
          "codeExplanation": "1. discriminatorKey: 'kind' stores 'QuizActivity' automatically when creating via QuizActivity.create(...).\n2. Querying Activity.find() returns all activity types cleanly in one sorted query.\n\nHow to Run & Expected Output:\n`await QuizActivity.create({ userId, score: 100 })` saves to the `activities` collection with `kind: 'QuizActivity'`.",
          "practiceExercise": "Guided Exercise:\n1. Add a second discriminator `EnrollActivity` requiring `courseId: ObjectId`.\n\nIndependent Challenge:\nQuery `Activity.find({ userId }).sort({ createdAt: -1 }).lean()` and inspect how `kind` distinguishes each returned item.\n\nExpected Result:\nClean polymorphic collection modeling with per-type validation.",
          "keyTakeaways": [
            "Discriminators store related polymorphic types in one collection while enforcing distinct sub-schemas",
            "Use discriminatorKey to tag each document’s subtype cleanly"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens if you omit `if (!this.isModified(\"password\")) return;` inside a Mongoose `pre(\"save\")` hook?",
          "options": [
            "Passwords are never hashed",
            "Every time the user updates their name or email via .save(), the already-hashed password gets hashed a SECOND time, breaking login!",
            "MongoDB rejects the save",
            "Virtuals stop working"
          ],
          "correctAnswer": 1,
          "explanation": "Without isModified(\"password\"), saving any unrelated field re-hashes the bcrypt string and locks the user out."
        },
        {
          "question": "Which Mongoose method does NOT trigger `pre(\"save\")` middleware hooks?",
          "options": [
            "await user.save()",
            "await User.create(...)",
            "await User.findByIdAndUpdate(id, { password })",
            "new User(...).save()"
          ],
          "correctAnswer": 2,
          "explanation": "Query-based updates (findByIdAndUpdate, updateOne, updateMany) run directly on MongoDB and bypass document save() hooks."
        },
        {
          "question": "What is a Mongoose Virtual property?",
          "options": [
            "A field encrypted in MongoDB",
            "A computed property derived on the fly in JS that is not persisted to MongoDB",
            "A backup database",
            "An async index"
          ],
          "correctAnswer": 1,
          "explanation": "Virtuals compute values dynamically from existing fields without taking up disk space in MongoDB."
        },
        {
          "question": "When are Mongoose Discriminators most useful?",
          "options": [
            "When storing unrelated collections",
            "When storing multiple related event/item subtypes in one collection while validating each subtype’s unique fields",
            "To replace .lean()",
            "To disable schema validation"
          ],
          "correctAnswer": 1,
          "explanation": "Discriminators allow a single collection (e.g., Activity or Notification) to enforce distinct schemas per subtype."
        }
      ]
    },
    {
      "title": "Module 10: Atlas Monitoring, Backups & Capstone DB Verification",
      "duration": "1h 45m",
      "objectives": [
        "Use MongoDB Atlas Performance Advisor and automated backups/snapshots",
        "Understand horizontal scaling (sharding keys) vs vertical scaling conceptually",
        "Verify a complete Mongoose database layer end-to-end against an isolated test DB"
      ],
      "notes": "### Module Introduction & Description\nIn this final MongoDB module, you step back to view production operations: reading Atlas slow-query logs, configuring automated backups, understanding when sharding matters, and running a final verification pass over your database layer.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Atlas slow-query analysis, backup/restore hygiene, shard-key concepts, and isolated test-DB integration verification.\n\n### How the Lessons Connect\n- **Lesson 1** covers Atlas Performance Advisor, backups, and sharding concepts.\n- **Lesson 2** executes a complete Mongoose DB layer verification against an isolated test DB.\n\n### Completion Criteria\n- Complete both lessons, deliver the Isolated DB Integration Verification assignment, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Complete LMS Database Layer Verification:\nProblem Statement:\nVerify the complete Cortex-style Mongoose database layer against an isolated test database (never touching production!), confirming unique indexes, aggregation stats, cascading deletes, and zero N+1 queries.\n\nObjectives:\n- Prove database integrity, index uniqueness, and cleanup end-to-end in an isolated test DB.\n\nRequirements:\n1. Connect strictly to a URI containing \"_test\" (aborting immediately if not!).\n2. Test 1: Creating two identical enrollments for (studentId, courseId) rejects with code 11000.\n3. Test 2: Module.aggregate() returns exact moduleCount and totalLessons per course.\n4. Test 3: Deleting a course removes all its Modules and Enrollments cleanly.\n5. Disconnect cleanly in finally.\n\nStep-by-Step Instructions:\n1. Write verifyDbLayer.mjs with explicit \"_test\" URI safety guard.\n2. Run against your isolated test database and confirm all 3 assertions pass.\n\nDeliverables:\n- verifyDbLayer.mjs.\n\nEvaluation Criteria:\n- Strict safety guard preventing accidental execution against production DB.\n- Clean teardown with zero leftover test records.",
      "lessons": [
        {
          "title": "Atlas Performance Advisor, Slow Query Profiling & Backups",
          "duration": "50m",
          "introduction": "Before scaling hardware or adding sharding, 90% of MongoDB slowdowns are fixed in 5 minutes by adding the missing index flagged by Atlas Performance Advisor.",
          "objectives": [
            "Spot slow >100ms COLLSCANs using Atlas Performance Advisor",
            "Verify automated backup snapshots before destructive operations",
            "Understand shard keys conceptually for multi-terabyte horizontal scaling"
          ],
          "notes": "### Scaling & Operations Priorities\n1. **Fix Queries & Indexes First**: Add ESR compound indexes and `.lean()`/`.select()` before upgrading cluster tiers.\n2. **Backups**: Always ensure Cloud Backups (continuous or snapshot) are active before running major migrations.\n3. **Sharding**: Only needed when a single replica set runs out of RAM/disk/write throughput (terabytes of data) — choosing a high-cardinality shard key prevents hot shards.",
          "codeExample": "// Safety guard for any test/migration script targeting MongoDB\nexport function assertIsolatedTestUri(uri) {\n  if (!uri || !/_test|test_verify/i.test(uri)) {\n    throw new Error('SAFETY ABORT: Refusing to run destructive test script on non-test database!');\n  }\n}",
          "codeExplanation": "1. Inspects the database URI before connecting so a destructive test or reset script can never touch production MongoDB by accident.\n\nHow to Run & Expected Output:\nCall `assertIsolatedTestUri('mongodb+srv://.../cortex_prod')`: immediately throws SAFETY ABORT.",
          "practiceExercise": "Guided Exercise:\n1. Add `assertIsolatedTestUri(process.env.MONGO_URI)` at the top of a test helper script.\n\nIndependent Challenge:\nExplain why choosing a monotonically increasing field like `createdAt` as a MongoDB Shard Key creates a \"hot shard\" bottleneck on inserts.\n\nExpected Result:\nSafe operational habits and clear understanding of MongoDB scaling levers.",
          "keyTakeaways": [
            "Fix missing indexes and N+1 queries before scaling cluster size",
            "Always guard destructive test/seeder scripts so they can never target production URIs",
            "Maintain automated Atlas backups before running schema migrations"
          ]
        },
        {
          "title": "Final Capstone: Complete LMS Database Layer Verification",
          "duration": "55m",
          "introduction": "Bringing together modeling, indexing, aggregations, transactions, TTL, and safe search into one cohesive verified database architecture.",
          "objectives": [
            "Verify unique indexes, aggregations, and cascading integrity in an isolated test DB",
            "Confirm zero N+1 loops and clean connection teardown"
          ],
          "notes": "### Complete MongoDB Architecture Summary\n- **Modeling**: Embed bounded data; reference unbounded collections; use TTL for temporary OTPs.\n- **Performance**: ESR compound indexes, `.lean()`, `.select()`, Aggregation Pipelines (`$match`, `$group`, `$lookup`, `$facet`).\n- **Safety**: Transactions for multi-collection writes, escaped `$regex`, clamped pagination, and strict test/prod isolation.",
          "codeExample": "// Verification checklist helper\nexport const DB_AUDIT_GATES = [\n  'Compound unique index on Enrollment(studentId, courseId)',\n  'ESR indexes on filtered/sorted queries',\n  'Lean + select on read-only endpoints',\n  'Escaped regex + clamped pagination limit',\n  'Isolated test DB for automated tests'\n];",
          "codeExplanation": "1. Captures the 5 core production database gates verified across Modules 1-10.\n\nHow to Run & Expected Output:\nRun your isolated DB verification script; all index, aggregation, and cascade assertions pass cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Review each of the 5 gates against your project's `models/` and `controllers/`.\n\nIndependent Challenge:\nVerify `Enrollment.syncIndexes()` has been run or autoIndex is enabled in dev/test so unique constraints are active.\n\nExpected Result:\nVerified, production-ready MongoDB & Mongoose database architecture.",
          "keyTakeaways": [
            "Verify indexes, aggregations, and transactional cleanup against an isolated test DB",
            "Never run destructive test scripts against production MongoDB"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is usually the very first bottleneck to fix when Atlas Performance Advisor flags >100ms queries?",
          "options": [
            "Immediately enable sharding",
            "Add an appropriate ESR compound index (or eliminate N+1 / missing .lean())",
            "Convert all data to CSV",
            "Disable Mongoose validation"
          ],
          "correctAnswer": 1,
          "explanation": "Missing indexes (causing COLLSCANs) and N+1 loops account for the vast majority of slow queries and are fixed without sharding."
        },
        {
          "question": "Why is a safety check verifying \"_test\" in the database URI essential before running `deleteMany({})` in test scripts?",
          "options": [
            "MongoDB forbids deleteMany on production",
            "To guarantee a misconfigured .env can never accidentally wipe real production user and enrollment records",
            "To speed up tests",
            "To enable TTL indexes"
          ],
          "correctAnswer": 1,
          "explanation": "An explicit URI guard prevents catastrophic accidental deletion of production data."
        },
        {
          "question": "Why does sharding on a monotonically increasing timestamp (`createdAt`) hurt write throughput?",
          "options": [
            "Timestamps cannot be indexed",
            "All new inserts route to the single shard holding the highest timestamp range (\"hot shard\") instead of distributing writes",
            "MongoDB deletes old timestamps",
            "It disables backups"
          ],
          "correctAnswer": 1,
          "explanation": "A good shard key distributes writes evenly across shards rather than concentrating all new writes on one shard."
        },
        {
          "question": "When should automated database backups be verified?",
          "options": [
            "Only after an accidental deletion",
            "Continuously, and specifically before running any schema migration or bulk update",
            "Never on Atlas",
            "Only in local development"
          ],
          "correctAnswer": 1,
          "explanation": "Backups must be verified proactively before migrations so you always have a clean recovery point."
        }
      ]
    }
  ]
};
