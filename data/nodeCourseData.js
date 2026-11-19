export const nodeCourseData = {
  "title": "Node.js & Express Backend Engineering",
  "description": "Build secure, scalable REST APIs with Node.js and Express. Master the Node runtime, middleware pipelines, REST architecture, bcrypt + JWT authentication, role-based authorization, input validation, rate limiting, and serverless deployment.",
  "thumbnail": "node",
  "totalDuration": "14h 00m",
  "category": "Backend Development",
  "difficulty": "Intermediate",
  "tags": [
    "Node.js",
    "Express",
    "REST API",
    "JWT",
    "Security",
    "Middleware"
  ],
  "learningOutcomes": [
    "Understand Node.js event-driven non-blocking I/O and ESM module architecture",
    "Design clean Express REST APIs separated into routes, controllers, models, and middleware",
    "Implement secure password hashing with bcryptjs and stateless JWT authentication",
    "Enforce Role-Based Access Control (student, instructor, admin) and resource ownership",
    "Validate ObjectIds, payloads, and emails while blocking XSS and NoSQL injection",
    "Harden APIs with Helmet, CORS allowlists, tiered rate limiting, and centralized error handling"
  ],
  "prerequisites": [
    "Modern JavaScript (ES6+)",
    "Basic understanding of HTTP (GET, POST, PUT, DELETE)"
  ],
  "targetAudience": "JavaScript and React developers ready to build production-grade backend APIs.",
  "practicalProject": "Build a complete Course & Enrollment REST API with JWT auth, 6-digit email verification, role guards, rate limiting, and automated Node tests.",
  "modules": [
    {
      "title": "Module 1: Node.js Runtime, ESM & Express Architecture",
      "duration": "2h 15m",
      "objectives": [
        "Explain Node.js non-blocking I/O and why blocking the event loop hurts concurrency",
        "Configure ES Modules (\"type\": \"module\") and environment variables cleanly",
        "Understand Express middleware pipelines (req, res, next)",
        "Build a centralized Express error-handling middleware that hides stack traces in production"
      ],
      "notes": "### Module Introduction\nNode.js executes JavaScript outside the browser on Google's V8 engine, paired with **libuv** for fast asynchronous file, network, and database I/O. Express adds a minimalist, composable middleware pipeline on top of Node's HTTP server.\n\n### Prerequisites\n- Modern JavaScript (ES6+ modules, `async/await`, `try/catch`).\n\n### How the Lessons Connect\n- **Lesson 1** explains Node's single-threaded Event Loop, why `fs.readFileSync` blocks all users, and ESM setup.\n- **Lesson 2** walks through Express middleware order, request parsing, and centralized 4-argument error handlers.\n\n### Module Summary\nYou will structure Express APIs cleanly without blocking the Event Loop or leaking internal stack traces to clients.\n\n### Completion Criteria\n- Complete both lessons and run the Express server exercises locally.\n- Deliver the Health-Check & Centralized Error Handler API assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nBuild a minimal, production-structured Express API skeleton (server.js) with request timing logs, JSON body size limits, a /api/health endpoint, a 404 fallback, and a centralized error handler that hides stack traces when NODE_ENV === 'production'.\n\nObjectives:\n- Order Express middleware correctly (body parser -> routes -> 404 -> 4-arg error handler).\n- Use async non-blocking operations rather than synchronous *Sync file calls.\n\nRequirements:\n1. Initialize package.json with \"type\": \"module\" and install express.\n2. Add express.json({ limit: '500kb' }) to prevent giant payload DoS attacks.\n3. Add a custom request-logger middleware recording method, URL, and duration in ms using res.on('finish', ...).\n4. Add GET /api/health returning { status: 'ok', uptime: process.uptime() }.\n5. Add a route GET /api/fail-test that forwards an Error via next(err) to your 4-argument error handler (err, req, res, next).\n6. In the error handler, return { message } only in production, and include stack in development.\n\nStep-by-Step Instructions:\n1. Create server.js and mount middleware in exact order.\n2. Test GET /api/health, GET /api/unknown (expect 404 JSON), and GET /api/fail-test (expect 500 JSON).\n3. Test with NODE_ENV=production node server.js to verify stack traces are hidden.\n\nDeliverables:\n- server.js and package.json.\n\nEvaluation Criteria:\n- 4-argument error middleware placed AFTER all routes.\n- JSON 404 handler returns structured JSON instead of Express's default HTML 404.",
      "lessons": [
        {
          "title": "Node.js Event Loop & Non-Blocking I/O",
          "duration": "1h 05m",
          "introduction": "A single Node.js server can handle thousands of concurrent connections — unless one handler calls a synchronous *Sync function and freezes every user.",
          "objectives": [
            "Contrast non-blocking async I/O with synchronous blocking calls",
            "Use node:fs/promises instead of fs.readFileSync inside request handlers",
            "Use process.env safely with dotenv and ESM imports"
          ],
          "notes": "### Why Blocking the Event Loop Is Fatal in Node.js\nUnlike Apache/PHP which may spawn a separate thread per visitor, Node.js serves **all incoming HTTP requests on a single JavaScript Event Loop thread** (while offloading disk/network I/O to libuv's thread pool and the OS kernel).\n- If one route calls `fs.readFileSync()` or runs a 2-second CPU loop, **every other user's request stalls** until that call finishes!\n- Always use asynchronous APIs like `await fs.readFile(...)` from `node:fs/promises` inside routes.\n\n### Native ESM in Node.js\nAdd `\"type\": \"module\"` to `package.json` so you can use standard `import` / `export` everywhere (just remember relative imports require the `.js` extension, e.g., `import userRoutes from './routes/userRoutes.js';`).",
          "codeExample": "import fs from 'node:fs/promises';\nimport path from 'node:path';\n\nexport async function readConfigAsync(filePath) {\n  const resolved = path.resolve(filePath);\n  const raw = await fs.readFile(resolved, 'utf8');\n  return JSON.parse(raw);\n}\n\n// Non-blocking demo\nconsole.log('1. Starting async read...');\nreadConfigAsync('./package.json')\n  .then((pkg) => console.log('3. Loaded package:', pkg.name))\n  .catch((err) => console.error('Read failed:', err.message));\nconsole.log('2. Event loop stays free for other requests!');",
          "codeExplanation": "1. node:fs/promises uses non-blocking I/O so the Event Loop stays free while the disk reads package.json.\n2. Notice the log order: 1 -> 2 -> 3, proving the main thread did not stall waiting for disk I/O.\n\nHow to Run & Expected Output:\nRun `node demo.js` in a folder with package.json. Prints steps 1, 2, then 3 with your package name.",
          "practiceExercise": "Guided Exercise:\n1. Write an async function using fs.writeFile from node:fs/promises to save a JSON log file without blocking.\n\nIndependent Challenge:\nBenchmark serving two requests where one uses fs.readFile vs heavy synchronous work, observing how synchronous work delays the second request.\n\nHints:\n- Sync calls like fs.readFileSync are fine ONLY at server startup before app.listen(), never inside per-request handlers!",
          "keyTakeaways": [
            "Node.js handles all JS execution on one Event Loop thread and delegates I/O via libuv",
            "Never call synchronous *Sync functions or heavy CPU loops inside Express route handlers",
            "Use node:fs/promises with async/await for non-blocking file operations",
            "Set \"type\": \"module\" in package.json for native ES Modules in Node"
          ]
        },
        {
          "title": "Express Middleware Pipeline & Error Handling",
          "duration": "1h 10m",
          "introduction": "Express is essentially a chain of middleware functions executed in top-to-bottom order. Getting that order right prevents 90% of Express routing bugs.",
          "objectives": [
            "Write custom middleware functions using (req, res, next)",
            "Place body parsers, routes, 404 handlers, and 4-arg error handlers in proper order",
            "Forward async errors to the centralized error handler cleanly"
          ],
          "notes": "### How `(req, res, next)` Flows\nEvery Express middleware receives `(req, res, next)`. It must either:\n1. **End the response** (`res.json(...)`, `res.status(404).json(...)`), OR\n2. **Pass control forward** by calling `next()` (or `next(err)` to jump straight to error middleware!).\nIf a middleware forgets both, the browser request hangs forever until timeout!\n\n### The Golden Express Middleware Order\n1. Security & body parsers (`helmet()`, `cors(...)`, `express.json({ limit: '500kb' })`)\n2. Custom logging / auth middleware\n3. API route handlers (`app.use('/api/courses', courseRoutes)`)\n4. **404 Not Found catch-all** (`app.use((req, res) => res.status(404).json({ message: 'Not Found' }))`)\n5. **Centralized 4-argument Error Handler**: `app.use((err, req, res, next) => ...)` — Express **only** recognizes an error handler if it has **all 4 parameters**!",
          "codeExample": "import express from 'express';\n\nconst app = express();\napp.use(express.json({ limit: '500kb' }));\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok', timestamp: new Date().toISOString() });\n});\n\napp.get('/api/boom', (req, res, next) => {\n  const err = new Error('Database temporarily unavailable');\n  err.statusCode = 503;\n  next(err);\n});\n\n// 404 catch-all\napp.use((req, res) => {\n  res.status(404).json({ message: `Route ${req.originalUrl} not found` });\n});\n\n// 4-argument centralized error handler (MUST be last!)\napp.use((err, req, res, next) => {\n  const status = err.statusCode || 500;\n  res.status(status).json({\n    message: err.message || 'Internal Server Error',\n    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })\n  });\n});",
          "codeExplanation": "1. express.json({ limit: '500kb' }) parses JSON bodies safely while rejecting oversized payloads.\n2. Calling next(err) skips normal routes and jumps directly to the 4-argument error handler.\n3. Stack traces are only included when NODE_ENV !== 'production' so internal file paths never leak to attackers.\n\nHow to Run & Expected Output:\nMount app.listen(5000) and visit /api/health (200 JSON), /api/boom (503 JSON), and /api/missing (404 JSON).",
          "practiceExercise": "Guided Exercise:\n1. Add a request-timing middleware above app.get('/api/health') that logs \"${req.method} ${req.path} -> ${res.statusCode}\" on res.on('finish').\n\nIndependent Challenge:\nWrite an asyncHandler(fn) wrapper: const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); and test it on an async throwing route in Express 4.\n\nHints:\n- Express 4 does not automatically catch rejected async route Promises unless wrapped in try/catch or asyncHandler (Express 5 handles this natively).",
          "keyTakeaways": [
            "Express executes middleware strictly in top-to-bottom registration order",
            "Every middleware must either send a response or call next()",
            "Centralized error middleware requires 4 parameters (err, req, res, next) and must be registered last",
            "Never expose raw error stack traces in production responses"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should fs.readFileSync() never be used inside an Express route handler?",
          "options": [
            "It only reads binary files",
            "It blocks the single Node.js Event Loop thread, stalling all other concurrent users until the disk read finishes",
            "It ignores UTF-8 encoding",
            "Express deletes synchronous files"
          ],
          "correctAnswer": 1,
          "explanation": "Node.js serves all requests on one Event Loop; blocking synchronous I/O freezes the entire server for every user."
        },
        {
          "question": "How does Express identify a centralized error-handling middleware function?",
          "options": [
            "By naming the function errorHandler",
            "By its 4-parameter signature: (err, req, res, next)",
            "By registering it before express.json()",
            "By returning false"
          ],
          "correctAnswer": 1,
          "explanation": "Express inspects Function.length and only treats middleware with 4 parameters (err, req, res, next) as an error handler."
        },
        {
          "question": "What happens if a custom Express middleware neither sends a response nor calls next()?",
          "options": [
            "Express automatically sends 200 OK",
            "The HTTP request hangs indefinitely until the client times out",
            "The server restarts",
            "Express skips to the 404 handler"
          ],
          "correctAnswer": 1,
          "explanation": "Without res.send/json or next(), Express waits forever and the client connection hangs."
        },
        {
          "question": "Why should express.json({ limit: \"500kb\" }) be configured on an API?",
          "options": [
            "To compress responses with Gzip",
            "To prevent memory exhaustion / DoS attacks from attackers sending huge multi-hundred-MB JSON payloads",
            "To allow file uploads",
            "To enable CORS"
          ],
          "correctAnswer": 1,
          "explanation": "Capping request body size protects server RAM against oversized payload denial-of-service attacks."
        }
      ]
    },
    {
      "title": "Module 2: RESTful Routing, Controllers & Input Validation",
      "duration": "2h 15m",
      "objectives": [
        "Design predictable REST endpoints using plural nouns and HTTP methods",
        "Return accurate HTTP status codes (200, 201, 204, 400, 401, 403, 404, 409, 500)",
        "Separate thin Route files from Controller business logic",
        "Validate request payloads and MongoDB ObjectIds before hitting the database"
      ],
      "notes": "### Module Introduction\nClean APIs are predictable: any frontend developer can guess the URL, HTTP method, and status codes without reading every line of backend code. Separating **Routes** from **Controllers** and validating inputs at the gate keeps your database clean and secure.\n\n### Prerequisites\n- Completion of Module 1 (Express middleware, JSON parsing, error handling).\n\n### How the Lessons Connect\n- **Lesson 1** covers RESTful resource naming, HTTP status code semantics, and Route-Controller separation.\n- **Lesson 2** covers strict payload validation (types, lengths, allowlists) and MongoDB `ObjectId` validation to prevent 500 `CastError` crashes.\n\n### Module Summary\nYou will build clean MVC/Route-Controller APIs that reject malformed inputs with `400 Bad Request` rather than crashing or saving dirty data.\n\n### Completion Criteria\n- Complete both lessons and validation exercises.\n- Deliver the Courses CRUD Router & Validator assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a clean, modular Courses API router (routes/courseRoutes.js + controllers/courseController.js) backed by an in-memory array (simulating DB records) with full input validation and proper HTTP status codes.\n\nObjectives:\n- Separate route definitions from controller functions cleanly.\n- Reject invalid IDs, missing required fields, and mass-assignment extra fields.\n\nRequirements:\n1. Implement endpoints:\n   - GET /api/courses (200)\n   - GET /api/courses/:id (200 or 404 if not found, 400 if invalid ID format)\n   - POST /api/courses (201 Created, validates title >= 3 chars and difficulty in ['Beginner', 'Intermediate', 'Advanced'])\n   - PUT /api/courses/:id (200 or 404, explicitly picks only allowed fields — zero mass-assignment!)\n   - DELETE /api/courses/:id (200 or 204)\n2. Never pass req.body directly into object creation/update — destructure only allowlisted fields.\n\nStep-by-Step Instructions:\n1. Create controllers/courseController.js with pure handler functions.\n2. Create routes/courseRoutes.js using express.Router().\n3. Mount under /api/courses in server.js and test every status code (200, 201, 400, 404) with curl or Thunder Client.\n\nDeliverables:\n- routes/courseRoutes.js and controllers/courseController.js.\n\nEvaluation Criteria:\n- Proper status codes (201 on POST create, 400 on invalid payload, 404 on missing resource).\n- Allowlist destructuring prevents unexpected fields like isAdmin or createdBy from being injected.",
      "lessons": [
        {
          "title": "REST Conventions & HTTP Status Codes",
          "duration": "1h 05m",
          "introduction": "A REST API treats data as resources (nouns) manipulated with standard HTTP verbs (GET, POST, PUT/PATCH, DELETE) rather than random verb URLs like /createNewCoursePost.",
          "objectives": [
            "Name REST endpoints cleanly using plural resource nouns",
            "Choose the exact right HTTP status code for success, client error, and conflict",
            "Split Express Routers from Controller modules"
          ],
          "notes": "### RESTful Resource Design\n- `GET /api/courses` -> List courses (`200 OK`)\n- `POST /api/courses` -> Create a new course (`201 Created`)\n- `GET /api/courses/:id` -> Fetch one course (`200 OK` or `404 Not Found`)\n- `PUT /api/courses/:id` / `PATCH` -> Update course (`200 OK`)\n- `DELETE /api/courses/:id` -> Remove course (`200 OK` or `204 No Content`)\n\n### Essential HTTP Status Codes\n- **`200 OK`**: Standard success.\n- **`201 Created`**: New resource successfully created via `POST`.\n- **`400 Bad Request`**: Invalid syntax, missing required fields, or invalid ID format.\n- **`401 Unauthorized`**: Missing or invalid authentication token (\"Who are you?\").\n- **`403 Forbidden`**: Authenticated, but lacking permission/role (\"I know who you are, you can't do this!\").\n- **`404 Not Found`**: Resource does not exist.\n- **`409 Conflict`**: Duplicate email or enrollment already exists.\n- **`429 Too Many Requests`**: Rate limit exceeded.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "// routes/courseRoutes.js\nimport express from 'express';\nimport { listCourses, createCourse, getCourseById } from '../controllers/courseController.js';\n\nconst router = express.Router();\n\nrouter.route('/').get(listCourses).post(createCourse);\nrouter.route('/:id').get(getCourseById);\n\nexport default router;",
          "codeExplanation": "1. express.Router() groups related /api/courses endpoints cleanly.\n2. router.route('/') chains GET and POST on the same path without repeating '/'.\n3. Business logic lives in controllers/courseController.js so routes stay readable at a glance.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Map these 4 outcomes to HTTP status codes: (a) Login token missing, (b) Student tries to access Admin panel, (c) Email already registered, (d) Course created.\n\nIndependent Challenge:\nAdd PUT /:id and DELETE /:id to courseRoutes.js pointing to updateCourse and deleteCourse controller stubs.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Use plural resource nouns in URLs and HTTP methods (GET, POST, PUT, DELETE) for actions",
            "Distinguish 401 (unauthenticated) from 403 (authenticated but forbidden)",
            "Return 201 Created on POST resource creation and 409 Conflict on duplicate registrations",
            "Separate thin route files from controller logic"
          ]
        },
        {
          "title": "Validating Payloads & MongoDB ObjectIds",
          "duration": "1h 10m",
          "introduction": "Never trust req.body or req.params.id! Unvalidated payloads allow mass-assignment attacks, and invalid MongoDB IDs crash routes with CastError.",
          "objectives": [
            "Validate MongoDB ObjectIds with mongoose.Types.ObjectId.isValid(id)",
            "Prevent Mass Assignment by allowlisting specific fields from req.body",
            "Trim strings, enforce length bounds, and validate emails/enums before saving"
          ],
          "notes": "### Why Mass Assignment Is Dangerous\nIf you write `await User.create(req.body)` or `await Course.findByIdAndUpdate(id, req.body)`, an attacker can send `{ \"role\": \"admin\", \"emailVerified\": true }` in the JSON body and escalate their own privileges!\n**Always explicitly pick allowed fields**:\n`const { title, description, difficulty } = req.body;`\n\n### Guarding `req.params.id`\nIn MongoDB/Mongoose, passing `/api/courses/abc123` (not a 24-hex ObjectId) to `Course.findById('abc123')` throws a `CastError` (500 crash if unhandled). Check `if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });` right at the top of the controller!\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "import mongoose from 'mongoose';\n\nconst ALLOWED_DIFFICULTIES = new Set(['Beginner', 'Intermediate', 'Advanced']);\n\nexport const createCourse = async (req, res) => {\n  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';\n  const difficulty = req.body.difficulty;\n\n  if (title.length < 3 || title.length > 120) {\n    return res.status(400).json({ message: 'Title must be 3 to 120 characters' });\n  }\n  if (!ALLOWED_DIFFICULTIES.has(difficulty)) {\n    return res.status(400).json({ message: 'Invalid difficulty level' });\n  }\n\n  // Only allowlisted fields are passed forward (zero mass-assignment!)\n  return res.status(201).json({ title, difficulty });\n};\n\nexport const validateIdParam = (id) => mongoose.Types.ObjectId.isValid(id);",
          "codeExplanation": "1. Type-checking typeof req.body.title === 'string' before .trim() prevents crashes if an attacker sends a number or object { \"$gt\": \"\" }.\n2. Set.has() validates enum values cleanly in O(1).\n3. mongoose.Types.ObjectId.isValid(id) catches malformed IDs with 400 Bad Request before querying MongoDB.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Test what happens if req.body.title is an object { \"$ne\": \"\" } when you call .trim() without checking typeof === 'string' first.\n\nIndependent Challenge:\nWrite a reusable Express middleware validateObjectId(paramName = 'id') that returns 400 JSON if req.params[paramName] is invalid, otherwise calls next().\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Always check typeof === \"string\" before calling string methods on req.body fields",
            "Never pass raw req.body into Model.create() or findByIdAndUpdate() — allowlist fields explicitly",
            "Validate MongoDB ObjectIds with mongoose.Types.ObjectId.isValid() to return 400 instead of 500 CastError"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which HTTP status code should an API return when an authenticated student tries to access an instructor-only endpoint?",
          "options": [
            "400 Bad Request",
            "401 Unauthorized",
            "403 Forbidden",
            "404 Not Found"
          ],
          "correctAnswer": 2,
          "explanation": "401 means unauthenticated (missing/invalid credentials), whereas 403 Forbidden means the user is authenticated but lacks permission."
        },
        {
          "question": "What security vulnerability occurs when you pass req.body directly into User.findByIdAndUpdate(id, req.body)?",
          "options": [
            "CORS preflight failure",
            "Mass Assignment — an attacker could overwrite protected fields like role: \"admin\"",
            "Event Loop blocking",
            "Memory leak"
          ],
          "correctAnswer": 1,
          "explanation": "Mass assignment lets attackers inject unexpected fields (role, isVerified) unless you explicitly allowlist permitted fields."
        },
        {
          "question": "Why should controllers check mongoose.Types.ObjectId.isValid(req.params.id) before querying?",
          "options": [
            "To encrypt the ID",
            "To return a clean 400 Bad Request instead of triggering a Mongoose CastError",
            "To generate a new UUID",
            "To bypass authentication"
          ],
          "correctAnswer": 1,
          "explanation": "Malformed IDs cause Mongoose CastErrors; validating with ObjectId.isValid() catches them cleanly at the controller boundary."
        },
        {
          "question": "Which HTTP status code is most appropriate when creating a new account fails because the email already exists?",
          "options": [
            "201 Created",
            "409 Conflict",
            "500 Internal Server Error",
            "301 Moved Permanently"
          ],
          "correctAnswer": 1,
          "explanation": "409 Conflict specifically indicates a state conflict with an existing resource, such as a duplicate unique email."
        }
      ]
    },
    {
      "title": "Module 3: Password Security, Email Verification & JWTs",
      "duration": "2h 30m",
      "objectives": [
        "Hash passwords safely with bcryptjs and a strong cost factor (10-12 rounds)",
        "Prevent password hashes and OTPs from leaking in API responses",
        "Sign and verify stateless JWTs with expiration and algorithm checks",
        "Build a hardened protect middleware that re-fetches live user state from DB"
      ],
      "notes": "### Module Introduction\nAuthentication is the highest-stakes part of backend engineering. Storing plain-text passwords, leaking `passwordHash` in JSON responses, or trusting stale JWT claims without checking the database creates critical vulnerabilities.\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** covers one-way password hashing with `bcryptjs`, constant-time comparison, and hiding sensitive fields in Mongoose schemas.\n- **Lesson 2** builds stateless JWT issuance and a hardened `protect` middleware.\n\n### Module Summary\nYou will implement industry-standard registration, login, and protected route authentication without leaking secrets.\n\n### Completion Criteria\n- Complete both lessons and security drills.\n- Deliver the Hardened Auth Register/Login & Protect Middleware assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a secure authentication module (authController.js + authMiddleware.js) using bcryptjs and jsonwebtoken that hashes passwords, rejects unverified accounts, and protects private routes.\n\nObjectives:\n- Hash passwords with bcrypt.hash(password, 12) and verify with bcrypt.compare.\n- Never return passwordHash or reset tokens in JSON responses.\n- Re-verify user existence and emailVerified status inside protect middleware.\n\nRequirements:\n1. Enforce minimum password length (>= 8 chars) on registration.\n2. Hash password with salt rounds = 12 before storing.\n3. On login, return identical generic error \"Invalid email or password\" (401) for both wrong email and wrong password (preventing account enumeration!).\n4. Sign JWT with { id: user._id }, secret from process.env.JWT_SECRET, and expiresIn: '7d'.\n5. Implement protect middleware reading Authorization: Bearer <token>, verifying signature, and checking user still exists in store/DB.\n\nStep-by-Step Instructions:\n1. Create authController.js with register and login handlers.\n2. Create authMiddleware.js with protect.\n3. Test registering a user, logging in to receive a JWT, and calling GET /api/auth/me with and without the Bearer header.\n\nDeliverables:\n- authController.js and authMiddleware.js.\n\nEvaluation Criteria:\n- Identical 401 message for unknown email vs wrong password.\n- Zero sensitive fields returned in JSON.\n- protect checks token signature AND live user record.",
      "lessons": [
        {
          "title": "Bcrypt Hashing & Sensitive Field Protection",
          "duration": "1h 15m",
          "introduction": "Encryption is two-way (can be decrypted). Passwords must NEVER be encrypted — they must be one-way hashed with a salted, slow algorithm like bcrypt.",
          "objectives": [
            "Contrast fast hashes (SHA-256) with slow salted adaptive hashes (bcrypt)",
            "Hash and verify passwords safely with bcryptjs",
            "Strip sensitive fields (password, OTP codes) from JSON responses"
          ],
          "notes": "### Why Bcrypt Instead of SHA-256?\nSHA-256 is designed to be blazingly fast — modern GPUs can guess billions of SHA-256 passwords per second! **Bcrypt** is intentionally **slow** (controlled by cost factor `10–12`) and automatically generates a unique random **salt** per user so two users with the same password produce completely different hashes (defeating rainbow tables).\n\n### Preventing User Enumeration & Data Leaks\n- On login, return the **exact same error** (`401 Invalid email or password`) whether the email wasn't found OR the password was wrong. Telling an attacker *\"Email not found\"* lets them harvest registered emails!\n- In Mongoose schemas, set `select: false` on `password`, `verificationCode`, and `resetPasswordToken` so normal queries never accidentally serialize them into API responses.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "import bcrypt from 'bcryptjs';\n\nexport async function hashPassword(plainPassword) {\n  if (typeof plainPassword !== 'string' || plainPassword.length < 8) {\n    throw new Error('Password must be at least 8 characters');\n  }\n  const saltRounds = 12;\n  return bcrypt.hash(plainPassword, saltRounds);\n}\n\nexport async function verifyPassword(plainPassword, storedHash) {\n  return bcrypt.compare(plainPassword, storedHash);\n}\n\n// Demo\nconst hash = await hashPassword('CortexSecure!26');\nconsole.log('Stored hash:', hash);\nconsole.log('Valid login:', await verifyPassword('CortexSecure!26', hash));\nconsole.log('Wrong login:', await verifyPassword('wrongpass', hash));",
          "codeExplanation": "1. bcrypt.hash generates a unique random 128-bit salt and embeds it alongside the cost factor (12) inside the resulting hash string.\n2. bcrypt.compare extracts the salt from storedHash, hashes the candidate password, and compares in constant time.\n\nHow to Run & Expected Output:\nRun in Node with bcryptjs installed. Prints the $2a$12$... hash, true, and false.",
          "practiceExercise": "Guided Exercise:\n1. Hash the exact same password twice with bcrypt.hash('hello1234', 10) and confirm the two output strings are completely different due to unique salts.\n\nIndependent Challenge:\nWrite a sanitizeUser(userDoc) helper that returns strictly { id, name, email, role } so sensitive fields can never slip into JSON responses.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Never store plain-text or reversible encrypted passwords — always use salted adaptive hashing (bcrypt)",
            "Use a cost factor of 10-12 rounds for bcrypt",
            "Return identical generic 401 errors on failed login to prevent email enumeration",
            "Exclude password hashes and OTPs at the schema/serializer level"
          ]
        },
        {
          "title": "Stateless JWTs & Hardened protect Middleware",
          "duration": "1h 15m",
          "introduction": "A JSON Web Token (JWT) lets your server verify a user’s identity without a database session table on every read — provided you verify it carefully.",
          "objectives": [
            "Understand the 3 Base64Url parts of a JWT (Header.Payload.Signature)",
            "Remember that JWT payloads are signed, NOT encrypted",
            "Build a hardened protect middleware checking signature, expiry, and live user status"
          ],
          "notes": "### JWTs Are Signed, NOT Encrypted!\nAnyone can decode the middle payload section of a JWT at jwt.io! Therefore, **never put passwords, secrets, or sensitive PII inside a JWT payload** — put only `{ id: user._id }`. The cryptographic **Signature** guarantees nobody tampered with the payload without knowing your server's `JWT_SECRET`.\n\n### Why `protect` Must Still Check the Database\nSuppose you put `role: 'admin'` in a 7-day JWT, and tomorrow an admin demotes or deletes that user. If `protect` blindly trusts the JWT without checking the database, that deleted user keeps admin access for 7 days!\nInstead, store only `id` in the token and fetch `const user = await User.findById(decoded.id).select('-password')` inside `protect`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "import jwt from 'jsonwebtoken';\n\nexport const signToken = (userId) => {\n  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {\n    expiresIn: '7d'\n  });\n};\n\nexport const createProtectMiddleware = (findUserById) => async (req, res, next) => {\n  const authHeader = req.headers.authorization || '';\n  if (!authHeader.startsWith('Bearer ')) {\n    return res.status(401).json({ message: 'Not authorized, missing token' });\n  }\n\n  const token = authHeader.slice(7);\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    const user = await findUserById(decoded.id);\n    if (!user) {\n      return res.status(401).json({ message: 'User no longer exists' });\n    }\n    req.user = user;\n    next();\n  } catch {\n    return res.status(401).json({ message: 'Not authorized, invalid or expired token' });\n  }\n};",
          "codeExplanation": "1. signToken signs only userId with an explicit 7-day expiration.\n2. createProtectMiddleware extracts the Bearer token, verifies the HMAC signature and expiration via jwt.verify, and loads the live user record into req.user.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Sign a token with expiresIn: '1s', wait 2 seconds, and observe jwt.verify throwing TokenExpiredError.\n\nIndependent Challenge:\nExtend protect to also check if (!user.emailVerified) return res.status(403).json({ message: 'Please verify your email' });.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "JWT payloads are Base64Url-encoded (readable by anyone), NOT encrypted — never store secrets inside them",
            "Always set an expiration (expiresIn) on signed JWTs",
            "Re-fetch the live user record inside protect middleware so deleted or demoted users lose access immediately"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is bcrypt preferred over SHA-256 for storing user passwords?",
          "options": [
            "SHA-256 is reversible",
            "Bcrypt is intentionally slow (configurable cost factor) and salts each password uniquely, resisting GPU brute-force and rainbow tables",
            "Bcrypt compresses passwords to 8 characters",
            "SHA-256 only works on numbers"
          ],
          "correctAnswer": 1,
          "explanation": "Fast hashes like SHA-256 allow billions of guesses per second on GPUs; bcrypt adds salt and adaptive computational cost."
        },
        {
          "question": "What can anyone who intercepts a JWT do with its payload section?",
          "options": [
            "Nothing — JWT payloads are encrypted by default",
            "Decode and read the payload as plain JSON, though they cannot forge a valid signature without JWT_SECRET",
            "Modify the user ID and keep the same signature valid",
            "Bypass expiresIn"
          ],
          "correctAnswer": 1,
          "explanation": "Standard JWS JWTs are signed, not encrypted. Anyone can Base64-decode the payload, so never put sensitive secrets in it."
        },
        {
          "question": "Why should login return the exact same 401 message (\"Invalid email or password\") for both wrong email and wrong password?",
          "options": [
            "To save bandwidth",
            "To prevent attackers from enumerating which email addresses have accounts on your platform",
            "Because HTTP 401 only allows 25 characters",
            "To skip bcrypt comparison"
          ],
          "correctAnswer": 1,
          "explanation": "Distinguishing \"Email not found\" from \"Wrong password\" lets attackers probe which emails are registered."
        },
        {
          "question": "Why should protect middleware look up the user in the database after verifying the JWT?",
          "options": [
            "Because jwt.verify doesn’t check the signature",
            "So revoked, deleted, or role-changed users are caught immediately instead of trusting stale token claims",
            "To re-hash the user’s password on every request",
            "To extend token expiry automatically"
          ],
          "correctAnswer": 1,
          "explanation": "Fetching the live user ensures deleted accounts or changed roles/verification flags take effect immediately."
        }
      ]
    },
    {
      "title": "Module 4: Role-Based Access Control (RBAC) & Ownership",
      "duration": "2h 00m",
      "objectives": [
        "Build composable authorize(...roles) middleware for Role-Based Access Control",
        "Enforce resource ownership so users can only edit/delete their own records",
        "Protect privileged signup roles (instructor/admin) from client-side manipulation"
      ],
      "notes": "### Module Introduction\nAuthentication answers *\"Who are you?\"* (**401**). Authorization answers *\"What are you allowed to do?\"* (**403**). Checking roles alone isn't enough — you must also check **resource ownership** so Instructor A cannot delete Instructor B's course!\n\n### Prerequisites\n- Completion of Module 3 (JWTs and `protect` middleware setting `req.user`).\n\n### How the Lessons Connect\n- **Lesson 1** implements `authorize(...roles)` middleware and resource ownership checks (`course.createdBy.equals(req.user._id)`).\n- **Lesson 2** secures privileged onboarding (e.g., server-side instructor secret codes) and admin-only endpoints.\n\n### Module Summary\nYou will eliminate Broken Object-Level Authorization (BOLA/IDOR) bugs and secure admin/instructor routes properly.\n\n### Completion Criteria\n- Complete both lessons and authorization exercises.\n- Deliver the RBAC & Ownership Guard Middleware assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nAn LMS API has a critical IDOR (Insecure Direct Object Reference) bug: any instructor can edit or delete any other instructor's course just by guessing its ID. Fix this with composable RBAC + ownership guards.\n\nObjectives:\n- Implement authorize(...allowedRoles) middleware returning 403 when req.user.role is not permitted.\n- Verify resource ownership inside update/delete handlers (allowing admin override only if explicitly intended).\n\nRequirements:\n1. Write authorize(...roles) returning (req, res, next).\n2. Protect POST /api/courses with protect, authorize('instructor', 'admin').\n3. Protect DELETE /api/courses/:id with ownership check: course.createdBy.toString() === req.user._id.toString() || req.user.role === 'admin'.\n4. Return 403 Forbidden if a different instructor attempts to delete the course.\n\nStep-by-Step Instructions:\n1. Implement authorize(...roles) in roleMiddleware.js.\n2. Implement assertOwnership(resourceOwnerId, user) helper.\n3. Write quick test calls simulating student (403), owner instructor (200), other instructor (403), and admin (200).\n\nDeliverables:\n- roleMiddleware.js and ownership helper.\n\nEvaluation Criteria:\n- Strict 403 returned for unauthorized role or non-owner.\n- Never trusts role sent in req.body.",
      "lessons": [
        {
          "title": "Role Middleware & Resource Ownership",
          "duration": "1h 00m",
          "introduction": "Broken Object-Level Authorization (IDOR) is the #1 API security vulnerability on the OWASP API Top 10. Checking req.user.role without checking ownership leaves user data exposed.",
          "objectives": [
            "Write a variadic authorize(...roles) middleware factory",
            "Enforce per-record ownership before updating or deleting resources",
            "Prevent IDOR vulnerabilities on /api/enrollments/:id and /api/courses/:id"
          ],
          "notes": "### Role Middleware (`authorize(...roles)`)\nAfter `protect` attaches `req.user`, `authorize('instructor', 'admin')` checks `roles.includes(req.user.role)`. If false, immediately return `403 Forbidden`.\n\n### Ownership Checks (Stopping IDOR)\nSuppose `GET /api/enrollments/65f...` returns an enrollment document. Even if the caller is a logged-in `student`, you **must** verify:\n`if (enrollment.studentId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });`\nOtherwise, any logged-in student could loop through IDs and read or overwrite other students' progress!\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "export const authorize = (...allowedRoles) => (req, res, next) => {\n  if (!req.user || !allowedRoles.includes(req.user.role)) {\n    return res.status(403).json({\n      message: 'Forbidden: insufficient permissions'\n    });\n  }\n  next();\n};\n\nexport const canModifyResource = (ownerId, user) => {\n  if (!user) return false;\n  if (user.role === 'admin') return true;\n  return String(ownerId) === String(user._id);\n};",
          "codeExplanation": "1. authorize(...allowedRoles) returns an Express middleware closing over allowedRoles.\n2. canModifyResource compares stringified ObjectIds cleanly (since two Mongo ObjectId instances are never === by reference!) and allows admin override.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Test String(idA) === String(idB) vs idA === idB in Node with two new mongoose.Types.ObjectId('65f000000000000000000001') instances to see why direct === fails on ObjectIds!\n\nIndependent Challenge:\nCompose router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse) and add the ownership check inside deleteCourse.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "authorize(...roles) checks role permissions after protect authenticates req.user",
            "Always verify record ownership (IDOR protection), not just user role",
            "Compare MongoDB ObjectIds using .equals() or String() — never raw ==="
          ]
        },
        {
          "title": "Admin-Only Endpoints & Secret Code Onboarding",
          "duration": "1h 00m",
          "introduction": "Never let a public /api/register form accept role: \"admin\" from the browser! Elevated roles must be gated server-side.",
          "objectives": [
            "Force default role: \"student\" on public signup unless server-verified",
            "Gate instructor/admin onboarding behind server-side secret codes or admin invites",
            "Avoid timing leaks and client-side secrets"
          ],
          "notes": "### Never Trust `req.body.role` Blindly\nIf your registration endpoint lets anyone send `{ \"role\": \"instructor\" }` without verification, anyone can publish courses or access instructor tools!\nInstead:\n- Default all public signups to `role: 'student'`.\n- To allow instructor registration, require a server-side `INSTRUCTOR_SECRET_CODE` from `process.env` (never exposed in frontend `VITE_*` variables!) or require an existing `admin` to promote the user via an admin-only endpoint.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "import crypto from 'node:crypto';\n\nexport function resolveSignupRole(requestedRole, providedCode) {\n  if (requestedRole !== 'instructor') {\n    return 'student'; // Never allow arbitrary 'admin' signup from public form\n  }\n  const expected = process.env.INSTRUCTOR_SECRET_CODE || '';\n  if (!expected || typeof providedCode !== 'string') {\n    throw new Error('Invalid instructor registration code');\n  }\n\n  const a = Buffer.from(providedCode);\n  const b = Buffer.from(expected);\n  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {\n    throw new Error('Invalid instructor registration code');\n  }\n  return 'instructor';\n}",
          "codeExplanation": "1. Any request not explicitly verified defaults to 'student' (ignoring 'admin' attempts).\n2. crypto.timingSafeEqual compares the provided code against process.env.INSTRUCTOR_SECRET_CODE in constant time.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Verify why Vite variables starting with VITE_ are public in browser bundles while process.env.* on Node stays private.\n\nIndependent Challenge:\nWrite an admin-only PATCH /api/admin/users/:id/role endpoint guarded by protect, authorize('admin') that prevents an admin from demoting themselves accidentally.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Never allow public registration to assign admin or unverified instructor roles",
            "Keep secret onboarding codes strictly in backend process.env, never in frontend bundles",
            "Use crypto.timingSafeEqual when comparing sensitive server-side secrets"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must you compare two MongoDB ObjectId values using .equals() or String(idA) === String(idB) instead of idA === idB?",
          "options": [
            "ObjectIds are async Promises",
            "ObjectIds are objects, so === compares memory references rather than their 24-hex values",
            "String() converts them to numbers",
            "Mongoose forbids ==="
          ],
          "correctAnswer": 1,
          "explanation": "Two separate ObjectId instances holding the same hex ID are distinct JS objects, so === returns false."
        },
        {
          "question": "What is an IDOR (Insecure Direct Object Reference) vulnerability?",
          "options": [
            "Using an expired SSL certificate",
            "An authenticated user accessing or modifying another user’s record simply by changing the :id in the URL because ownership wasn’t checked",
            "Missing CORS headers",
            "Slow database indexing"
          ],
          "correctAnswer": 1,
          "explanation": "IDOR occurs when an endpoint checks authentication (protect) but fails to verify that req.user owns the requested record."
        },
        {
          "question": "Where must INSTRUCTOR_SECRET_CODE be stored and checked?",
          "options": [
            "In frontend/src/config.js",
            "In frontend .env as VITE_INSTRUCTOR_CODE",
            "Strictly on the backend in process.env and checked server-side",
            "Inside localStorage"
          ],
          "correctAnswer": 2,
          "explanation": "Anything in frontend code or VITE_* env vars is shipped to every browser and visible in DevTools. Secrets must stay on the backend."
        },
        {
          "question": "What HTTP status code should authorize(\"admin\") return when a logged-in student calls an admin route?",
          "options": [
            "401",
            "403",
            "404",
            "500"
          ],
          "correctAnswer": 1,
          "explanation": "403 Forbidden indicates the user is authenticated (known identity) but lacks the required role."
        }
      ]
    },
    {
      "title": "Module 5: Production Security, Rate Limiting & Email Service",
      "duration": "2h 30m",
      "objectives": [
        "Harden Express with Helmet security headers, strict CORS allowlists, and NoSQL sanitization",
        "Configure tiered express-rate-limit rules for auth/email vs general reads",
        "Send transactional emails safely while escaping all user-supplied HTML"
      ],
      "notes": "### Module Introduction\nOnce an API goes live on the public internet, automated bots immediately probe for open CORS, brute-force login endpoints, NoSQL injection operators (`{ \"$gt\": \"\" }`), and HTML/XSS injection in contact emails.\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** configures `helmet`, strict origin allowlist `cors`, NoSQL operator stripping, and `express-rate-limit`.\n- **Lesson 2** covers transactional email delivery (Nodemailer/SMTP) and escaping user input inside HTML templates.\n\n### Module Summary\nYou will deploy Express APIs with layered defense-in-depth security controls.\n\n### Completion Criteria\n- Complete both lessons and security exercises.\n- Deliver the API Hardening & Safe Email Template assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nHarden an Express API against brute-force logins, cross-origin abuse, NoSQL operator injection, and HTML injection in support contact emails.\n\nObjectives:\n- Configure Helmet, CORS origin allowlisting, and tiered rate limiters.\n- Escape HTML special characters before interpolating user messages into emails.\n\nRequirements:\n1. Configure cors({ origin: (origin, cb) => ... }) allowing only process.env.CLIENT_URL and http://localhost:5173 (plus non-browser tools with !origin if desired).\n2. Add two express-rate-limit limiters: generalLimiter (100 req / 15 min) and authLimiter (10 req / 15 min on /api/auth/*).\n3. Write a sanitizeNoSql(obj) middleware stripping keys starting with '$' or containing '.'.\n4. Write an escapeHtml(str) helper escaping &, <, >, \", and ' and use it in a contact email HTML builder.\n\nStep-by-Step Instructions:\n1. Build securityMiddleware.js and emailTemplate.js.\n2. Test sanitizeNoSql against { email: { \"$gt\": \"\" } } to confirm '$' keys are stripped.\n3. Test escapeHtml against '<script>alert(1)</script>' to confirm it renders harmlessly as '&lt;script&gt;...'.\n\nDeliverables:\n- securityMiddleware.js and emailTemplate.js.\n\nEvaluation Criteria:\n- Strict CORS allowlist (never origin: '*' with credentials: true).\n- All 5 HTML characters escaped in email templates.",
      "lessons": [
        {
          "title": "Helmet, CORS, Sanitization & Rate Limiting",
          "duration": "1h 15m",
          "introduction": "Defense in depth means assuming one layer might miss something — so headers, CORS, rate limits, and input sanitization work together.",
          "objectives": [
            "Explain what Helmet headers protect against",
            "Configure a strict CORS allowlist instead of wildcard *",
            "Protect login/OTP endpoints with express-rate-limit and strip Mongo $ operators"
          ],
          "notes": "### Essential Express Hardening Layers\n1. **Helmet (`app.use(helmet())`)**: Sets protective HTTP headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options`, hides `X-Powered-By: Express`).\n2. **Strict CORS Allowlist**: Never pair `origin: '*'` with `credentials: true`! Validate `req.headers.origin` against an explicit `Set` of trusted frontend URLs.\n3. **NoSQL Injection Defense**: In MongoDB, if an attacker sends `{ \"email\": { \"$ne\": null } }` instead of a string, Mongoose/Mongo might match the first user in the DB! Strip `$` keys *and* enforce `typeof === 'string'` in controllers.\n4. **Tiered Rate Limiting**: Put stricter limits (e.g., 10 requests / 15 min) on `/api/auth/login`, `/register`, and `/forgot-password` than on public `GET /api/courses`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "const ALLOWED_ORIGINS = new Set([\n  process.env.CLIENT_URL,\n  'http://localhost:5173'\n].filter(Boolean));\n\nexport const corsOptions = {\n  origin(origin, callback) {\n    if (!origin || ALLOWED_ORIGINS.has(origin)) {\n      return callback(null, true);\n    }\n    return callback(new Error('Blocked by CORS policy'));\n  },\n  credentials: true\n};\n\n// Recursively strip keys starting with '$' to block NoSQL operator injection\nexport function stripDollarKeys(value) {\n  if (Array.isArray(value)) return value.map(stripDollarKeys);\n  if (value && typeof value === 'object') {\n    return Object.fromEntries(\n      Object.entries(value)\n        .filter(([k]) => !k.startsWith('$') && !k.includes('.'))\n        .map(([k, v]) => [k, stripDollarKeys(v)])\n    );\n  }\n  return value;\n}",
          "codeExplanation": "1. corsOptions validates the incoming Origin header against a Set of approved domains.\n2. stripDollarKeys recursively removes any object key starting with '$' or containing '.', neutralizing MongoDB operator injection payloads.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Test stripDollarKeys({ email: { \"$gt\": \"\" }, name: \"Ada\" }) in Node and verify the \"$gt\" key is removed.\n\nIndependent Challenge:\nConfigure app.set('trust proxy', 1) and explain why express-rate-limit needs it behind reverse proxies like Vercel or Nginx.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Use Helmet to set secure HTTP response headers automatically",
            "Always enforce an explicit CORS origin allowlist in production",
            "Strip $-prefixed keys and validate string types to prevent NoSQL injection",
            "Apply stricter rate limits to authentication, OTP, and contact endpoints"
          ]
        },
        {
          "title": "Transactional Emails & Escaping User Input",
          "duration": "1h 15m",
          "introduction": "Sending verification codes, password resets, and contact form notifications via SMTP/Nodemailer requires careful HTML escaping and async safety.",
          "objectives": [
            "Configure Nodemailer transports via environment variables",
            "Escape all user-supplied strings before embedding into HTML emails",
            "Prevent header injection in email Subject and Reply-To fields"
          ],
          "notes": "### Escaping User Input in HTML Emails\nWhen a visitor submits a Contact Form with `name` and `message`, and your backend emails that to the site owner as HTML, **never** interpolate raw `${message}` directly into `<p>${message}</p>`! An attacker could inject malicious links or tracking pixels.\nAlways pass every user field through `escapeHtml(str)`, and strip `\\r\\n` newlines from `subject`/`name` to prevent SMTP header injection.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "export function escapeHtml(str = '') {\n  return String(str)\n    .replaceAll('&', '&amp;')\n    .replaceAll('<', '&lt;')\n    .replaceAll('>', '&gt;')\n    .replaceAll('\"', '&quot;')\n    .replaceAll(\"'\", '&#39;');\n}\n\nexport function buildContactEmailHtml({ name, email, message }) {\n  return `\n    <h2>New Contact Message</h2>\n    <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>\n    <p><strong>Message:</strong></p>\n    <blockquote>${escapeHtml(message)}</blockquote>\n  `;\n}",
          "codeExplanation": "1. escapeHtml replaces all 5 dangerous HTML characters (&, <, >, \", ') with safe HTML entities.\n2. buildContactEmailHtml escapes every user field before assembling the HTML email body.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Call buildContactEmailHtml with message: '<a href=\"https://evil.test\">Click</a>' and inspect the escaped output.\n\nIndependent Challenge:\nAdd a stripNewlines(str) helper for the email Subject line so embedded \\r\\n characters cannot inject extra SMTP headers.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Store SMTP credentials strictly in backend environment variables",
            "Always HTML-escape every user-supplied value placed inside HTML email templates",
            "Strip CR/LF newlines from email headers like Subject and Reply-To"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must you strip keys starting with \"$\" (and validate string types) from req.body before querying MongoDB?",
          "options": [
            "JSON does not support $ characters",
            "Attackers can pass query operators like { \"$ne\": null } to bypass login or extract records (NoSQL injection)",
            "MongoDB converts $ into spaces",
            "Helmet rejects $ keys"
          ],
          "correctAnswer": 1,
          "explanation": "If req.body.email is { \"$ne\": \"\" } instead of a string, MongoDB treats $ne as a query operator unless sanitized/type-checked."
        },
        {
          "question": "Why should authentication endpoints (/login, /forgot-password) have stricter rate limits than GET /api/courses?",
          "options": [
            "GET requests cannot be rate-limited",
            "Auth endpoints are prime targets for credential-stuffing and brute-force OTP guessing attacks",
            "GET /api/courses doesn’t use Express",
            "Rate limits only work on POST"
          ],
          "correctAnswer": 1,
          "explanation": "Tiered rate limiting slows down brute-force login/OTP attacks without throttling normal catalog browsing."
        },
        {
          "question": "What is the purpose of escapeHtml() before building a transactional HTML email from a contact form?",
          "options": [
            "To compress the email attachment",
            "To prevent attackers from injecting malicious HTML/links into the recipient’s email client",
            "To translate text to UTF-8",
            "To bypass spam filters"
          ],
          "correctAnswer": 1,
          "explanation": "Escaping &, <, >, \", and ' ensures user input renders as harmless text rather than active HTML."
        },
        {
          "question": "Why should app.set(\"trust proxy\", 1) be enabled when deploying behind Vercel, Render, or Nginx?",
          "options": [
            "To disable HTTPS",
            "So Express and express-rate-limit read the real client IP from X-Forwarded-For instead of treating the proxy IP as every user",
            "To allow wildcard CORS",
            "To speed up bcrypt"
          ],
          "correctAnswer": 1,
          "explanation": "Without trust proxy, every user appears to share the proxy’s IP, causing rate limiters to lock out all users together."
        }
      ]
    },
    {
      "title": "Module 6: Serverless Deployment & Automated Backend Testing",
      "duration": "2h 30m",
      "objectives": [
        "Adapt an Express app for Vercel Serverless Functions while keeping local app.listen() working",
        "Reuse MongoDB connections across warm serverless invocations",
        "Write fast, isolated automated backend tests using Node’s built-in node:test runner"
      ],
      "notes": "### Module Introduction\nModern Node backends often deploy as **serverless functions** (like Vercel Functions) rather than always-on VMs — and require fast automated tests so every code change is verified before shipping.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** shows how to export `app` cleanly for serverless platforms while caching DB connections across warm starts.\n- **Lesson 2** teaches automated backend testing with Node's native `node:test` and `node:assert/strict` (zero extra test dependencies required!).\n\n### Module Summary\nYou now know how to build, harden, test, and deploy production Node.js & Express APIs.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the Serverless Export & `node:test` Suite assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nPrepare an Express API for serverless deployment (exporting app without unconditionally calling app.listen) and write an automated node:test suite covering validation helpers and auth middleware.\n\nObjectives:\n- Export Express app cleanly for serverless adapters while running app.listen only locally.\n- Write unit + middleware tests using built-in node:test and node:assert/strict.\n\nRequirements:\n1. Export default app from api/index.js and guard app.listen with if (!process.env.VERCEL && process.env.NODE_ENV !== 'test').\n2. Implement a cached connectDB() helper storing the connection promise on globalThis so warm invocations reuse the pool.\n3. Write tests/api.test.js with at least 4 tests using describe/it from node:test covering:\n   - stripDollarKeys sanitization\n   - escapeHtml escaping\n   - protect middleware returning 401 when Authorization header is missing\n   - authorize('admin') returning 403 for a student req.user.\n4. Run node --test tests/api.test.js and verify all 4 pass.\n\nStep-by-Step Instructions:\n1. Guard app.listen() cleanly in api/index.js.\n2. Create tests/api.test.js using mock req/res/next objects (no live DB required for unit middleware tests!).\n3. Run node --test and verify exit code 0.\n\nDeliverables:\n- api/index.js snippet and tests/api.test.js.\n\nEvaluation Criteria:\n- Zero unconditional app.listen() blocking test imports or serverless execution.\n- All 4 node:test assertions pass cleanly.",
      "lessons": [
        {
          "title": "Express on Vercel Serverless Functions",
          "duration": "1h 15m",
          "introduction": "Serverless functions spin up on demand and freeze between requests. Calling app.listen() unconditionally or opening a fresh DB connection on every request breaks serverless.",
          "objectives": [
            "Export Express app as default export for serverless platforms",
            "Guard app.listen() so local dev works without breaking serverless or tests",
            "Cache Mongoose connection promises across warm serverless invocations"
          ],
          "notes": "### Serverless Differences vs. Traditional VPS\n1. **No `app.listen()` in Serverless**: Vercel invokes your exported `app(req, res)` handler directly. Guard `app.listen()` behind `if (!process.env.VERCEL && process.env.NODE_ENV !== 'test')`.\n2. **Connection Reuse**: Opening a new MongoDB TLS handshake on every request adds 200ms+ and exhausts Atlas connection limits. Cache the connection promise on `globalThis._mongoConn` so warm function containers reuse the existing pool!\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "// Cached DB connection for serverless + local\nimport mongoose from 'mongoose';\n\nlet cached = globalThis._mongooseCache || (globalThis._mongooseCache = { conn: null, promise: null });\n\nexport async function connectDB(uri) {\n  if (cached.conn) return cached.conn;\n  if (!cached.promise) {\n    cached.promise = mongoose.connect(uri, { bufferCommands: false });\n  }\n  cached.conn = await cached.promise;\n  return cached.conn;\n}\n\n// Guarded local listener\n// if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {\n//   app.listen(PORT, () => console.log(`Running on ${PORT}`));\n// }",
          "codeExplanation": "1. globalThis._mongooseCache persists across warm serverless invocations in the same container.\n2. Storing cached.promise prevents two simultaneous cold-start requests from opening duplicate MongoDB connections.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Check process.env.VERCEL and process.env.NODE_ENV !== 'test' before calling app.listen in a sample Express app.\n\nIndependent Challenge:\nEnsure connectDB resets cached.promise = null in a catch block if the initial connection fails so the next request can retry cleanly.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Export Express app cleanly for serverless platforms and guard app.listen() for local dev only",
            "Cache database connection promises on globalThis to reuse pools across warm serverless invocations",
            "Reset cached.promise on connection failure so transient errors don’t stick forever"
          ]
        },
        {
          "title": "Testing Backend Logic with node:test",
          "duration": "1h 15m",
          "introduction": "Modern Node.js ships with a fast, zero-dependency built-in test runner (node:test) and strict assertions (node:assert/strict).",
          "objectives": [
            "Write unit and middleware tests with node:test and node:assert/strict",
            "Mock req, res, and next objects to test Express middleware without network overhead",
            "Run automated test suites via node --test"
          ],
          "notes": "### Why `node:test`?\nYou don't always need heavy frameworks to test pure backend helpers, validators, and Express middleware! Built straight into Node 18+:\n- `import { describe, it } from 'node:test';`\n- `import assert from 'node:assert/strict';`\n- Run with `node --test`.\n\n### Testing Express Middleware with Lightweight Mocks\nTo test `authorize('admin')`, create a tiny `mockRes` with `statusCode` and `body`, pass `{ user: { role: 'student' } }` as `req`, and assert `res.statusCode === 403`! Runs in under 5 milliseconds.\n\n### Common Mistakes & Solutions\n- **Mistake**: Skipping boundary validation or relying on client-side checks alone.\n  - **Solution**: Enforce validation, authentication, and authorization strictly inside Express middleware and controllers on every request.",
          "codeExample": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst authorize = (...roles) => (req, res, next) => {\n  if (!req.user || !roles.includes(req.user.role)) {\n    return res.status(403).json({ message: 'Forbidden' });\n  }\n  next();\n};\n\ndescribe('authorize middleware', () => {\n  it('returns 403 when student accesses admin route', () => {\n    const req = { user: { role: 'student' } };\n    const res = {\n      statusCode: 200,\n      status(code) { this.statusCode = code; return this; },\n      json(payload) { this.body = payload; return this; }\n    };\n    let nextCalled = false;\n\n    authorize('admin')(req, res, () => { nextCalled = true; });\n    assert.equal(res.statusCode, 403);\n    assert.equal(nextCalled, false);\n  });\n});",
          "codeExplanation": "1. describe and it organize tests natively using node:test.\n2. mock res supports chained res.status(403).json(...) just like real Express.\n3. assert.equal verifies both the 403 status and that next() was never called.\n\nHow to Run & Expected Output:\nRun in a Node ESM project (`\"type\": \"module\"` in `package.json`). Execute with `node <file>.js` (or `node --test` for test files) and inspect the printed JSON/status outputs.",
          "practiceExercise": "Guided Exercise:\n1. Save the snippet as auth.test.js and run `node --test auth.test.js`.\n\nIndependent Challenge:\nAdd a second test verifying that when req.user.role === 'admin', nextCalled becomes true and res.statusCode remains untouched.\n\nExpected Result:\nVerified working implementation handling both valid requests and invalid/unauthorized inputs cleanly.",
          "keyTakeaways": [
            "Node includes a fast, zero-dependency test runner via node:test and node:assert/strict",
            "Express middleware can be tested in milliseconds using simple mock req/res/next objects",
            "Use assert/strict (deepStrictEqual, equal) rather than loose assertions"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must app.listen() be guarded when deploying an Express API to Vercel Serverless Functions (or importing it in tests)?",
          "options": [
            "Vercel forbids HTTP servers",
            "Serverless platforms invoke the exported app directly per request, and unconditional app.listen() keeps the process open or collides on ports",
            "app.listen() disables JSON parsing",
            "ESM forbids app.listen()"
          ],
          "correctAnswer": 1,
          "explanation": "Serverless runtimes manage ports themselves and invoke your exported Express app handler; unconditional app.listen() breaks imports and serverless lifecycle."
        },
        {
          "question": "Why do serverless Express apps cache the Mongoose connection promise on globalThis?",
          "options": [
            "To store user passwords in memory",
            "To reuse the existing DB connection pool across warm invocations instead of opening a new connection on every request",
            "To bypass MongoDB authentication",
            "To disable TLS"
          ],
          "correctAnswer": 1,
          "explanation": "Reusing cached connections avoids slow TLS handshakes on every request and prevents exhausting MongoDB Atlas connection limits."
        },
        {
          "question": "Which built-in Node module provides describe() and it() without installing Jest or Mocha?",
          "options": [
            "node:fs",
            "node:test",
            "node:http",
            "node:cluster"
          ],
          "correctAnswer": 1,
          "explanation": "Node.js includes a native test runner in node:test, runnable with node --test."
        },
        {
          "question": "How can you unit-test an Express middleware like authorize(\"admin\") in milliseconds without starting an HTTP server?",
          "options": [
            "By deploying to Vercel first",
            "By passing lightweight mock req, res (with chained status/json), and next spy objects",
            "By editing MongoDB directly",
            "Express middleware cannot be unit-tested"
          ],
          "correctAnswer": 1,
          "explanation": "Express middleware is just a function (req, res, next), so passing mock objects lets you test its behavior in milliseconds."
        }
      ]
    },
    {
      "title": "Module 7: Streams, Buffers & Large File Uploads/Downloads",
      "duration": "2h 15m",
      "objectives": [
        "Process large files in constant O(1) memory using Node.js Readable, Writable, and Transform streams",
        "Compose streams safely with node:stream/promises pipeline() so errors and backpressure never leak",
        "Validate file uploads by MIME type, size limit, and safe filenames"
      ],
      "notes": "### Module Introduction & Description\nCalling `await fs.readFile('2gb-export.csv')` tries to allocate 2 GB of RAM at once — crashing a 512 MB serverless container instantly! **Node.js Streams** process data chunk-by-chunk in constant memory using built-in **backpressure** control.\n\n### Prerequisites\n- Completion of Modules 1–6 (Node Event Loop, Express middleware, security).\n\n### Skills Acquired\n- Using `pipeline()` from `node:stream/promises`, `Buffer` basics, and secure upload/download validation.\n\n### How the Lessons Connect\n- **Lesson 1** teaches Streams, `Buffer`s, and `stream.pipeline()`.\n- **Lesson 2** covers safe multipart file upload validation (size caps, MIME allowlists, path-traversal prevention).\n\n### Completion Criteria\n- Complete both lessons, deliver the Streaming CSV Transform & Safe Download assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nAn instructor dashboard needs to export 50,000 enrollment records as a CSV download without spiking server RAM, and accept safe avatar image uploads without allowing path-traversal attacks (../../etc/passwd).\n\nObjectives:\n- Stream data incrementally using Readable/Transform streams and pipeline().\n- Sanitize upload filenames and enforce strict size + MIME allowlists.\n\nRequirements:\n1. Build a Transform stream (or async generator -> Readable.from()) converting objects into CSV rows on the fly.\n2. Pipe cleanly using `await pipeline(source, transform, res)` from `node:stream/promises`.\n3. Write a `validateUpload({ mimetype, size, originalname })` guard allowing only `image/png`, `image/jpeg`, `image/webp` under 2 MB and stripping directory segments via `path.basename()`.\n\nStep-by-Step Instructions:\n1. Implement streamExport.js and uploadGuard.js.\n2. Test `validateUpload` with `../../evil.exe` and a 5 MB file to confirm both are rejected cleanly.\n\nDeliverables:\n- streamExport.js and uploadGuard.js.\n\nEvaluation Criteria:\n- Uses `pipeline()` instead of raw `.pipe()` (which leaks streams on error!).\n- Enforces strict MIME allowlist and path traversal sanitization.",
      "lessons": [
        {
          "title": "Readable, Writable & Transform Streams (pipeline)",
          "duration": "1h 10m",
          "introduction": "Think of Streams like a conveyor belt instead of waiting for an entire truckload of boxes to arrive before processing box #1.",
          "objectives": [
            "Contrast fs.readFile (buffers everything in RAM) vs fs.createReadStream (chunks)",
            "Use pipeline() from node:stream/promises to handle errors and backpressure automatically"
          ],
          "notes": "### Why `pipeline()` Beats `.pipe()`\nLegacy `readStream.pipe(res)` has a notorious flaw: if `readStream` errors or the HTTP client disconnects halfway, `.pipe()` does **not** destroy the other stream — leaking file descriptors!\n`await pipeline(readStream, transformStream, res)` from `node:stream/promises` automatically handles **backpressure** (pausing reads when the network is slower than disk) AND destroys all streams cleanly if any stage fails!\n\n### Common Mistakes & Solutions\n- **Mistake**: Reading a multi-hundred-MB file with `fs.readFile()` inside an API route.\n  - **Solution**: Stream it with `fs.createReadStream()` + `pipeline()`.",
          "codeExample": "import { Readable } from 'node:stream';\nimport { pipeline } from 'node:stream/promises';\n\nasync function* rowsGenerator() {\n  yield 'id,name\n';\n  for (let i = 1; i <= 3; i++) {\n    yield `${i},Student_${i}\n`;\n  }\n}\n\n// Stream directly to stdout (or Express 'res' in a route!)\nawait pipeline(Readable.from(rowsGenerator()), process.stdout);",
          "codeExplanation": "1. Readable.from(rowsGenerator()) turns an async generator into a memory-efficient Node Readable stream.\n2. pipeline() handles backpressure and stream cleanup automatically.\n\nHow to Run & Expected Output:\nRun `node streamDemo.js`. Streams `id,name` followed by 3 CSV rows without allocating an array of all rows.",
          "practiceExercise": "Guided Exercise:\n1. Write a `Transform` stream that uppercases incoming text chunks and pipe `Readable.from(['hello ', 'streams\\n'])` through it to `process.stdout`.\n\nIndependent Challenge:\nHandle `req.on('close', ...)` or `AbortController` signal passed into `pipeline(..., { signal })` when a user cancels a large download.\n\nExpected Result:\nConstant-memory streaming with zero leaked file handles.",
          "keyTakeaways": [
            "Streams process large files chunk-by-chunk in O(1) memory instead of buffering everything in RAM",
            "Always use pipeline() from node:stream/promises instead of raw .pipe() so errors clean up all streams"
          ]
        },
        {
          "title": "Handling Multipart Uploads Safely Without Exhausting RAM",
          "duration": "1h 05m",
          "introduction": "Accepting file uploads without size limits, MIME checks, and safe filenames lets attackers crash your server disk/RAM or overwrite system files.",
          "objectives": [
            "Enforce max file size and strict MIME-type allowlists",
            "Prevent path traversal attacks using path.basename() and generated UUID filenames"
          ],
          "notes": "### Four Rules for Safe Uploads\n1. **Strict Size Limit**: Cap upload bytes (e.g., 2 MB for avatars) at the parser level (e.g., Multer `limits: { fileSize: 2 * 1024 * 1024 }`).\n2. **Allowlist MIME & Extension**: Never trust `originalname` alone; check allowed MIME types (`image/png`, `image/jpeg`, `image/webp`) and inspect magic bytes in high-security apps.\n3. **Never Trust User Filenames on Disk**: A filename like `../../api/index.js` causes **Path Traversal**! Generate a fresh `crypto.randomUUID()` filename instead.",
          "codeExample": "import path from 'node:path';\nimport crypto from 'node:crypto';\n\nconst ALLOWED_MIMES = new Map([\n  ['image/jpeg', '.jpg'],\n  ['image/png', '.png'],\n  ['image/webp', '.webp']\n]);\n\nexport function prepareSafeUpload(file) {\n  if (!file || file.size > 2 * 1024 * 1024) {\n    throw new Error('File must be under 2 MB');\n  }\n  const ext = ALLOWED_MIMES.get(file.mimetype);\n  if (!ext) throw new Error('Unsupported image format');\n\n  const safeBase = path.basename(file.originalname || 'upload');\n  return { originalSafeName: safeBase, storedName: `${crypto.randomUUID()}${ext}` };\n}",
          "codeExplanation": "1. Rejects files over 2 MB immediately.\n2. Uses ALLOWED_MIMES Map to enforce exact supported image types and extensions.\n3. Generates a collision-free UUID filename so user-supplied paths can never traverse directories.\n\nHow to Run & Expected Output:\nCall `prepareSafeUpload({ mimetype: 'image/png', size: 1024, originalname: '../../evil.png' })`. Returns `{ originalSafeName: 'evil.png', storedName: '<uuid>.png' }`.",
          "practiceExercise": "Guided Exercise:\n1. Test `prepareSafeUpload` with `mimetype: 'application/x-msdownload'` and confirm it throws `Unsupported image format`.\n\nIndependent Challenge:\nExplain why storing user uploads in object storage (S3 / Cloudflare R2 / Cloudinary) is preferred over local disk in serverless environments like Vercel (ephemeral filesystem!).\n\nExpected Result:\nHardened upload validation immune to oversized files and path traversal.",
          "keyTakeaways": [
            "Always enforce file size caps and a strict MIME allowlist on uploads",
            "Never save files using raw user-supplied filenames — generate UUID names instead",
            "In serverless deployments, stream uploads to object storage (S3/R2) rather than ephemeral local disk"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should `pipeline()` from `node:stream/promises` be preferred over `readStream.pipe(res)`?",
          "options": [
            "pipe() only works on Windows",
            "pipeline() automatically cleans up all streams and propagates errors cleanly if any stream fails or closes early",
            "pipeline() loads the whole file into RAM first",
            "pipe() disables HTTPS"
          ],
          "correctAnswer": 1,
          "explanation": "Raw .pipe() does not automatically destroy upstream/downstream streams on error, risking memory and file-descriptor leaks."
        },
        {
          "question": "What vulnerability occurs if you save an uploaded file using `path.join(UPLOAD_DIR, req.file.originalname)` without sanitization?",
          "options": [
            "CORS preflight failure",
            "Path Traversal — an attacker naming a file \"../../app.js\" could overwrite server files",
            "CSS Specificity conflict",
            "SQL injection"
          ],
          "correctAnswer": 1,
          "explanation": "Always generate safe server-controlled filenames (like crypto.randomUUID()) instead of trusting client filenames."
        },
        {
          "question": "Why do serverless platforms (like Vercel) require object storage (S3/R2/Cloudinary) for persistent user uploads?",
          "options": [
            "Serverless Node cannot use fs",
            "Serverless containers have ephemeral filesystems that wipe between cold starts and do not share across instances",
            "S3 is required by Express",
            "Local disk only stores JSON"
          ],
          "correctAnswer": 1,
          "explanation": "Serverless function filesystems are temporary and isolated per instance, so persistent files must go to external object storage."
        },
        {
          "question": "What does backpressure mean in Node.js streams?",
          "options": [
            "Compressing files with Gzip",
            "Automatically pausing fast reads when a slower destination (like a slow mobile network) cannot keep up, preventing RAM overflow",
            "Retrying failed HTTP requests",
            "Running two Event Loops"
          ],
          "correctAnswer": 1,
          "explanation": "Backpressure coordinates producer and consumer speeds so fast disk reads don’t flood RAM waiting for slow network writes."
        }
      ]
    },
    {
      "title": "Module 8: Background Jobs, Caching & Graceful Shutdown",
      "duration": "2h 15m",
      "objectives": [
        "Implement TTL (Time-To-Live) caching with explicit invalidation on writes",
        "Handle OS signals (SIGTERM, SIGINT) to drain in-flight HTTP requests and close DB pools cleanly"
      ],
      "notes": "### Module Introduction & Description\nWhen an API scales, caching hot read-only catalog responses slashes database load, while **graceful shutdown** ensures zero dropped user requests or half-written DB operations during server restarts or rolling deploys.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Building TTL caches, invalidating caches on mutations, and implementing `SIGTERM`/`SIGINT` graceful shutdown hooks.\n\n### How the Lessons Connect\n- **Lesson 1** builds a bounded TTL cache with explicit invalidation.\n- **Lesson 2** handles `SIGTERM`/`SIGINT` cleanly in Express + Mongoose.\n\n### Completion Criteria\n- Complete both lessons, deliver the TTL Catalog Cache & Graceful Shutdown assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nA public /api/courses catalog receives 500 reads/minute while courses only change a few times per day, AND server restarts currently drop active HTTP requests mid-response.\n\nObjectives:\n- Build a bounded in-memory TTL cache with explicit invalidation when a course is created/updated/deleted.\n- Implement a SIGTERM/SIGINT graceful shutdown handler closing HTTP server then Mongoose cleanly.\n\nRequirements:\n1. Create TtlCache(maxEntries = 100, ttlMs = 60000) supporting get(key), set(key, value), and delete(key) / clear().\n2. Evict expired entries on read and cap maxEntries so memory never grows unbounded!\n3. Implement gracefulShutdown(server, mongooseConn) listening on SIGTERM and SIGINT, calling server.close(), then mongooseConn.close(), with a 10s force-exit timeout.\n\nStep-by-Step Instructions:\n1. Implement ttlCache.js and shutdown.js.\n2. Unit-test TtlCache expiration and maxEntries cap in Node.\n\nDeliverables:\n- ttlCache.js and shutdown.js.\n\nEvaluation Criteria:\n- Cache never exceeds maxEntries; stale entries expire cleanly.\n- Shutdown closes HTTP server before closing DB connection.",
      "lessons": [
        {
          "title": "In-Memory / Redis Caching & Cache Invalidation Strategies",
          "duration": "1h 10m",
          "introduction": "Caching is easy to add and surprisingly easy to get wrong: an unbounded Map leaks RAM, and forgetting to invalidate after an edit serves stale data.",
          "objectives": [
            "Use Cache-Aside pattern with TTL (Time-To-Live) expiration",
            "Never cache private per-user responses under shared public keys",
            "Invalidate cache keys explicitly on POST/PUT/DELETE mutations"
          ],
          "notes": "### Cache-Aside Pattern\n1. Check cache for `courses:public`. If fresh hit -> return immediately!\n2. On miss -> query MongoDB, store in cache with `expiresAt = Date.now() + ttlMs`, return result.\n3. On any course create/update/delete -> call `cache.delete('courses:public')` immediately!\n**Rule**: Always cap `maxEntries` on in-memory caches and **never** cache authenticated user-specific data under generic keys.",
          "codeExample": "export class TtlCache {\n  #store = new Map();\n  constructor(ttlMs = 30_000, maxEntries = 100) {\n    this.ttlMs = ttlMs;\n    this.maxEntries = maxEntries;\n  }\n\n  get(key) {\n    const entry = this.#store.get(key);\n    if (!entry) return undefined;\n    if (Date.now() > entry.expiresAt) {\n      this.#store.delete(key);\n      return undefined;\n    }\n    return entry.value;\n  }\n\n  set(key, value) {\n    if (this.#store.size >= this.maxEntries) {\n      const oldestKey = this.#store.keys().next().value;\n      this.#store.delete(oldestKey);\n    }\n    this.#store.set(key, { value, expiresAt: Date.now() + this.ttlMs });\n  }\n\n  invalidate(key) { this.#store.delete(key); }\n}",
          "codeExplanation": "1. Checks Date.now() > entry.expiresAt on read to evict stale entries automatically.\n2. Caps size at maxEntries by evicting the oldest Map key so RAM stays bounded.\n\nHow to Run & Expected Output:\nInstantiate `const cache = new TtlCache(1000, 50);`, call `cache.set('k', 1)`, read immediately (1), then read after 1.1s (undefined).",
          "practiceExercise": "Guided Exercise:\n1. Test `TtlCache` with `maxEntries = 2`, insert 3 keys, and verify the oldest key was evicted.\n\nIndependent Challenge:\nWrap `getCourses` in a Cache-Aside helper that invalidates `'courses:all'` whenever `createCourse` runs.\n\nExpected Result:\nBounded, TTL-enforced caching with clean write invalidation.",
          "keyTakeaways": [
            "Always set both a TTL and a maxEntries bound on in-memory caches",
            "Invalidate affected cache keys immediately on POST/PUT/DELETE mutations",
            "Never cache private user-specific responses under shared keys"
          ]
        },
        {
          "title": "Process Signals (SIGTERM/SIGINT) & Zero-Downtime Shutdown",
          "duration": "1h 05m",
          "introduction": "When Docker, Kubernetes, or a cloud host deploys a new version, it sends SIGTERM to your old Node process. Graceful shutdown finishes active requests before exiting.",
          "objectives": [
            "Listen for SIGTERM (container stop) and SIGINT (Ctrl+C)",
            "Close HTTP server first to finish active requests, then close MongoDB connection"
          ],
          "notes": "### Graceful Shutdown Order\n1. Receive `SIGTERM` / `SIGINT`.\n2. Call `server.close(() => ...)` — stops accepting *new* connections while letting *in-flight* requests finish!\n3. Once active requests finish, call `await mongoose.connection.close()`.\n4. Add a safety `setTimeout(() => process.exit(1), 10000).unref()` in case a stuck socket hangs.",
          "codeExample": "export function registerGracefulShutdown(server, closeDb) {\n  const shutdown = (signal) => {\n    console.log(`Received ${signal}, draining connections...`);\n    const forceTimer = setTimeout(() => process.exit(1), 10_000);\n    forceTimer.unref();\n\n    server.close(async () => {\n      await closeDb();\n      process.exit(0);\n    });\n  };\n\n  process.on('SIGTERM', () => shutdown('SIGTERM'));\n  process.on('SIGINT', () => shutdown('SIGINT'));\n}",
          "codeExplanation": "1. server.close waits for active HTTP responses to finish before running its callback.\n2. forceTimer.unref() ensures the safety timer doesn't keep Node alive needlessly once DB closes cleanly.\n\nHow to Run & Expected Output:\nStart a local Express server with `registerGracefulShutdown` and press Ctrl+C: logs \"Received SIGINT, draining connections...\" and exits with code 0.",
          "practiceExercise": "Guided Exercise:\n1. Add a guard `let isShuttingDown = false;` so pressing Ctrl+C twice doesn't run shutdown twice.\n\nIndependent Challenge:\nExplain why closing MongoDB *before* `server.close()` finishes would break active in-flight requests!\n\nExpected Result:\nZero dropped requests during deployments and restarts.",
          "keyTakeaways": [
            "Always call server.close() before closing database connections on SIGTERM/SIGINT",
            "Include an unref() safety timeout so hung keep-alive sockets cannot stall shutdown forever"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must an in-memory cache always enforce both a TTL and a maximum entry limit?",
          "options": [
            "JavaScript Maps crash after 10 keys",
            "Without expiration and a size cap, stale data lingers forever and unbounded growth causes Out-Of-Memory crashes",
            "TTL encrypts the cache",
            "Maps cannot store objects"
          ],
          "correctAnswer": 1,
          "explanation": "TTL prevents stale data and maxEntries caps RAM usage under high traffic."
        },
        {
          "question": "During graceful shutdown on SIGTERM, why must `server.close()` run BEFORE `mongoose.connection.close()`?",
          "options": [
            "Express requires Mongoose to stay open forever",
            "So in-flight HTTP requests can finish their database queries cleanly before the DB pool closes",
            "SIGTERM deletes MongoDB",
            "server.close() is synchronous"
          ],
          "correctAnswer": 1,
          "explanation": "Closing the DB first would cause active in-flight HTTP handlers to fail mid-request."
        },
        {
          "question": "What does calling `.unref()` on the 10-second force-exit `setTimeout` accomplish?",
          "options": [
            "Cancels the timer immediately",
            "Allows Node.js to exit cleanly as soon as server.close() and DB close finish, without waiting 10 seconds for the timer",
            "Doubles the timeout",
            "Restarts the server"
          ],
          "correctAnswer": 1,
          "explanation": "An unref’d timer won’t keep the Node event loop open if normal cleanup completes early."
        },
        {
          "question": "When using Cache-Aside for `/api/courses`, what must happen when an instructor creates or edits a course?",
          "options": [
            "Wait 24 hours",
            "Explicitly invalidate/delete the cached courses key immediately",
            "Clear all user cookies",
            "Disable CORS"
          ],
          "correctAnswer": 1,
          "explanation": "Write-side invalidation ensures users see newly published or updated courses right away."
        }
      ]
    },
    {
      "title": "Module 9: Structured Logging, Observability & API Versioning",
      "duration": "2h 00m",
      "objectives": [
        "Emit structured JSON logs with request correlation IDs while redacting secrets/passwords",
        "Version public APIs cleanly (/api/v1) and document OpenAPI/REST contracts"
      ],
      "notes": "### Module Introduction & Description\nWhen an error happens in production across 10,000 requests, `console.log(\"something failed\")` is useless. **Structured JSON logs** with a **request correlation ID** let you trace one user's request end-to-end in seconds, while **API versioning** lets you evolve endpoints without breaking mobile apps or existing clients.\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Request ID middleware, structured JSON logging with secret redaction, and `/api/v1` versioning strategies.\n\n### How the Lessons Connect\n- **Lesson 1** implements Request Correlation IDs and redacted JSON logging.\n- **Lesson 2** covers URL/header API versioning and backwards-compatible response evolution.\n\n### Completion Criteria\n- Complete both lessons, deliver the Correlation Logger & V1 Router assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nProduction logs currently mix plain strings without request IDs and occasionally print Authorization headers or passwords when logging errors. Build a structured request-ID logger middleware and mount versioned /api/v1 routes.\n\nObjectives:\n- Attach a unique X-Request-Id header and req.requestId to every request.\n- Emit single-line JSON logs with redacted sensitive fields.\n\nRequirements:\n1. Write requestIdMiddleware setting req.requestId = req.headers['x-request-id'] || crypto.randomUUID() and res.setHeader('X-Request-Id', req.requestId).\n2. Write logEvent(level, message, meta) emitting JSON.stringify({ timestamp, level, message, ...redact(meta) }) where password, token, authorization are replaced with '[REDACTED]'.\n3. Mount a versioned router at /api/v1/courses alongside backward-compatible /api/courses alias.\n\nStep-by-Step Instructions:\n1. Implement logger.js and test redacting { email: 'a@b.com', password: 'secret', token: 'jwt' }.\n2. Verify X-Request-Id appears on HTTP responses.\n\nDeliverables:\n- logger.js and versioned router snippet.\n\nEvaluation Criteria:\n- Sensitive keys redacted at any nesting level or top level.\n- Valid single-line JSON logs.",
      "lessons": [
        {
          "title": "Structured JSON Logging & Request Correlation IDs",
          "duration": "1h 00m",
          "introduction": "Cloud log aggregators (Vercel Logs, Datadog, CloudWatch) parse single-line JSON automatically so you can filter by requestId, statusCode, or userId.",
          "objectives": [
            "Attach unique X-Request-Id headers per request",
            "Redact secrets (password, token, authorization) before logging"
          ],
          "notes": "### Why Structured JSON Logs?\nPlain text logs break across multi-line stack traces and are hard to query. Single-line JSON (`JSON.stringify({ level, requestId, method, path, status, durationMs })`) makes searching production logs instantaneous — as long as you **redact** `password`, `token`, `authorization`, and `cookie` keys!",
          "codeExample": "import crypto from 'node:crypto';\n\nconst SENSITIVE = new Set(['password', 'token', 'authorization', 'secret']);\n\nexport function redactMeta(obj = {}) {\n  return Object.fromEntries(\n    Object.entries(obj).map(([k, v]) => [\n      k,\n      SENSITIVE.has(k.toLowerCase()) ? '[REDACTED]' : v\n    ])\n  );\n}\n\nexport function requestLogger(req, res, next) {\n  req.requestId = req.headers['x-request-id'] || crypto.randomUUID();\n  res.setHeader('X-Request-Id', req.requestId);\n  const start = Date.now();\n  res.on('finish', () => {\n    console.log(JSON.stringify({\n      requestId: req.requestId,\n      method: req.method,\n      path: req.originalUrl,\n      status: res.statusCode,\n      durationMs: Date.now() - start\n    }));\n  });\n  next();\n}",
          "codeExplanation": "1. Generates or preserves X-Request-Id so frontend error reports can be matched to exact backend log lines.\n2. Logs clean single-line JSON on res.on('finish') with elapsed durationMs.\n\nHow to Run & Expected Output:\nMount in Express and hit any route: logs `{\"requestId\":\"...\",\"method\":\"GET\",\"path\":\"/api/health\",\"status\":200,\"durationMs\":3}`.",
          "practiceExercise": "Guided Exercise:\n1. Test `redactMeta({ user: 'ada', password: '123', Authorization: 'Bearer xyz' })` to verify both `password` and `Authorization` become `'[REDACTED]'`.\n\nIndependent Challenge:\nExtend `redactMeta` recursively so nested `{ body: { password: '123' } }` objects are also redacted.\n\nExpected Result:\nTraceable JSON logs with zero secret leakage.",
          "keyTakeaways": [
            "Attach an X-Request-Id correlation ID to every request and response",
            "Emit single-line JSON logs for easy cloud filtering and latency tracking",
            "Always redact passwords, tokens, and Authorization headers before logging"
          ]
        },
        {
          "title": "API Versioning (/api/v1) & Backward Compatibility",
          "duration": "1h 00m",
          "introduction": "When an API has mobile apps or external consumers, changing a response field name breaks old clients immediately unless you version cleanly.",
          "objectives": [
            "Add new optional fields backward-compatibly without breaking existing clients",
            "Introduce /api/v1 and /api/v2 routers cleanly for breaking changes"
          ],
          "notes": "### Additive vs. Breaking Changes\n- **Non-breaking (no new version needed)**: Adding a new optional JSON field, adding a new endpoint.\n- **Breaking (requires `/api/v2`)**: Renaming/removing a field, changing status codes, or changing pagination envelope shape.",
          "codeExample": "import express from 'express';\n\nconst v1Router = express.Router();\nv1Router.get('/status', (req, res) => res.json({ version: 'v1', ok: true }));\n\n// Mount versioned router\n// app.use('/api/v1', v1Router);\nexport default v1Router;",
          "codeExplanation": "1. Isolates v1 routes inside a dedicated Router so v2 can be introduced later without disrupting existing v1 consumers.\n\nHow to Run & Expected Output:\nMount `app.use('/api/v1', v1Router)` and request `GET /api/v1/status` -> `200 { \"version\": \"v1\", \"ok\": true }`.",
          "practiceExercise": "Guided Exercise:\n1. List 2 additive changes (safe in v1) and 2 breaking changes (requiring v2).\n\nIndependent Challenge:\nAdd a `Deprecation: true` response header middleware on a simulated legacy `/api/v1/old-stats` endpoint.\n\nExpected Result:\nClean API evolution without breaking existing clients.",
          "keyTakeaways": [
            "Additive optional fields are backward-compatible; renaming/removing fields requires a new API version",
            "Use separate Express Routers (/api/v1, /api/v2) when breaking changes are unavoidable"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why attach an `X-Request-Id` header and log it on every API request?",
          "options": [
            "To encrypt the JSON body",
            "So a user’s error report or frontend log can be correlated directly to the exact backend log lines for that request",
            "To speed up MongoDB indexes",
            "To bypass CORS"
          ],
          "correctAnswer": 1,
          "explanation": "Correlation IDs let engineers trace a single request across logs and services during debugging."
        },
        {
          "question": "Which of the following is a BREAKING API change requiring a new version (/api/v2)?",
          "options": [
            "Adding a new optional `subtitle` field to course JSON",
            "Renaming `title` to `courseTitle` or wrapping a previously flat array inside `{ items: [...] }`",
            "Improving query speed with .lean()",
            "Adding a new GET /api/analytics endpoint"
          ],
          "correctAnswer": 1,
          "explanation": "Renaming existing keys or changing the top-level response shape breaks existing clients expecting the old format."
        },
        {
          "question": "Why must structured loggers redact keys like `password`, `token`, and `authorization`?",
          "options": [
            "JSON.stringify fails on passwords",
            "So sensitive credentials never end up stored in plain-text log aggregators",
            "To reduce CPU usage by 90%",
            "Express forbids logging strings"
          ],
          "correctAnswer": 1,
          "explanation": "Logs are often shared across teams or stored externally and must never contain user passwords or bearer tokens."
        },
        {
          "question": "Why emit single-line JSON logs instead of multi-line formatted strings in cloud deployments?",
          "options": [
            "Multi-line logs crash Node",
            "Cloud log tools treat each newline as a separate log entry, whereas single-line JSON parses fields cleanly for search",
            "JSON logs skip stdout",
            "Single-line logs disable timestamps"
          ],
          "correctAnswer": 1,
          "explanation": "Log platforms index single-line JSON fields (status, durationMs, requestId) automatically."
        }
      ]
    },
    {
      "title": "Module 10: Real-Time Events & Capstone API Integration",
      "duration": "2h 15m",
      "objectives": [
        "Stream real-time server-to-client notifications using Server-Sent Events (SSE) or WebSockets",
        "Integrate all 10 Node.js & Express modules into a hardened, tested, production-ready REST API"
      ],
      "notes": "### Module Introduction & Description\nTraditional REST waits for the client to poll. For live notifications, build logs, or progress updates, **Server-Sent Events (SSE)** and **WebSockets** push events in real time — and in this final module you integrate the full Express backend stack.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Implementing lightweight SSE real-time streams with proper client-disconnect cleanup and assembling a complete production Node/Express API.\n\n### How the Lessons Connect\n- **Lesson 1** teaches Server-Sent Events (SSE) vs WebSockets over standard HTTP.\n- **Lesson 2** integrates all security, validation, auth, streaming, logging, and `node:test` layers into the Final Capstone API.\n\n### Completion Criteria\n- Complete both lessons, deliver the Final Hardened REST + SSE API Capstone, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Hardened Multi-Resource REST + Live Notification API:\nProblem Statement:\nAssemble a complete, production-hardened Express backend combining Helmet, strict CORS, tiered rate limiting, JWT auth + RBAC, validated CRUD routes, structured request-ID logging, a live SSE notification stream, and an automated node:test suite.\n\nObjectives:\n- Integrate security, observability, real-time events, and automated testing into one cohesive Node.js backend.\n\nRequirements:\n1. Mount middleware in exact order: Helmet -> CORS -> Request Logger -> JSON Parser (500kb) -> Tiered Rate Limiters -> Routes -> 404 -> Centralized Error Handler.\n2. Implement GET /api/events SSE endpoint setting Content-Type: text/event-stream, sending heartbeat/events, and cleaning up clearInterval on req.on('close').\n3. Include >= 6 automated node:test specs verifying health, auth 401/403 guards, payload validation, and sanitization.\n\nStep-by-Step Instructions:\n1. Wire the full Express app in server.js (guarding app.listen for tests/serverless).\n2. Run `node --test` and verify 100% pass rate.\n\nDeliverables:\n- server.js, sseRoute.js, and api.test.js.\n\nEvaluation Criteria:\n- Clean middleware order and error handling.\n- SSE interval cleaned up cleanly on client disconnect (zero memory leaks!).",
      "lessons": [
        {
          "title": "Real-Time Notifications with Server-Sent Events (SSE) & WebSockets",
          "duration": "1h 05m",
          "introduction": "You don’t always need a heavy WebSocket library for live notifications or AI/progress streaming — HTTP-native Server-Sent Events (SSE) work over plain Express routes.",
          "objectives": [
            "Contrast one-way SSE (server -> client over HTTP) with two-way WebSockets",
            "Clean up timers/subscriptions on req.on(\"close\") to prevent memory leaks"
          ],
          "notes": "### SSE vs. WebSockets\n- **SSE (`text/event-stream`)**: Unidirectional (server -> browser), auto-reconnects natively via `new EventSource('/api/events')`, works over standard HTTP. Perfect for notifications, live feeds, and progress streams!\n- **WebSockets**: Full-duplex bidirectional (client <-> server). Ideal for multiplayer games or real-time chat.\n**Critical Leak Prevention**: Always listen to `req.on('close', () => clearInterval(timer))` on SSE routes so closed browser tabs don't leave timers running forever!",
          "codeExample": "export function sseNotificationsHandler(req, res) {\n  res.setHeader('Content-Type', 'text/event-stream');\n  res.setHeader('Cache-Control', 'no-cache');\n  res.setHeader('Connection', 'keep-alive');\n\n  res.write(`data: ${JSON.stringify({ type: 'connected', ts: Date.now() })}\n\n`);\n\n  const heartbeat = setInterval(() => {\n    res.write(`data: ${JSON.stringify({ type: 'ping', ts: Date.now() })}\n\n`);\n  }, 15_000);\n\n  req.on('close', () => {\n    clearInterval(heartbeat);\n    res.end();\n  });\n}",
          "codeExplanation": "1. Sets required SSE headers (text/event-stream, no-cache, keep-alive).\n2. Formats each SSE message as \"data: <json>\\n\\n\".\n3. Clears the heartbeat interval when req emits 'close' so disconnected clients never leak timers.\n\nHow to Run & Expected Output:\nMount on `app.get('/api/events', sseNotificationsHandler)` and visit with `curl -N http://localhost:5000/api/events`. Streams connected event immediately and pings every 15s.",
          "practiceExercise": "Guided Exercise:\n1. Test disconnecting `curl -N` (Ctrl+C) and log inside `req.on('close')` to confirm `clearInterval` fires immediately.\n\nIndependent Challenge:\nAdd a shared `EventEmitter` broadcast so `POST /api/courses` pushes a `course_created` event to all connected SSE listeners.\n\nExpected Result:\nClean real-time HTTP streaming with zero leaked intervals.",
          "keyTakeaways": [
            "Use SSE (EventSource) for server-to-client live streams and WebSockets for two-way real-time apps",
            "Format SSE messages with \"data: ...\\n\\n\" and always clean up intervals on req.on(\"close\")"
          ]
        },
        {
          "title": "Final Capstone: Hardened Multi-Resource REST API",
          "duration": "1h 10m",
          "introduction": "Reviewing the complete Express architecture from request entry to tested shutdown before shipping to production.",
          "objectives": [
            "Verify middleware ordering, security headers, DB pooling, logging, and error boundaries",
            "Run full node:test suite after final edits"
          ],
          "notes": "### Production Node/Express Checklist\n1. **Security**: Helmet, strict CORS allowlist, `express.json({ limit: '500kb' })`, `$` sanitization, bcrypt + JWT + RBAC + ownership checks.\n2. **Reliability**: Async non-blocking I/O, cached DB connection, graceful shutdown, centralized 4-arg error handler hiding production stacks.\n3. **Observability & Tests**: `/api/health`, JSON request-ID logs, and passing `node --test` suite.",
          "codeExample": "// Middleware pipeline order summary\n// 1. helmet() & cors(corsOptions)\n// 2. requestLogger (X-Request-Id + durationMs)\n// 3. express.json({ limit: '500kb' }) & stripDollarKeys\n// 4. Rate limiters + /api/v1/* routes (protect, authorize, validation)\n// 5. 404 JSON fallback -> 6. (err, req, res, next) error handler\nexport const EXPRESS_PIPELINE = ['security', 'logger', 'parser', 'routes', '404', 'errorHandler'];",
          "codeExplanation": "1. Summarizes the exact top-to-bottom registration order for a hardened Express backend.\n\nHow to Run & Expected Output:\nRun `npm test` in `backend/`; all unit and integration tests pass with exit code 0.",
          "practiceExercise": "Guided Exercise:\n1. Audit an existing `index.js` / `server.js` against all 6 pipeline stages in order.\n\nIndependent Challenge:\nAdd an automated `node:test` case verifying your 4-arg error handler omits `stack` when `NODE_ENV === 'production'`.\n\nExpected Result:\nProduction-ready, thoroughly tested Node.js & Express API.",
          "keyTakeaways": [
            "Middleware order determines security, CORS behavior, and error catching in Express",
            "Always verify the full backend test suite after your final edit"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When is Server-Sent Events (SSE) a simpler choice than WebSockets?",
          "options": [
            "For multiplayer 3D games requiring bidirectional binary frames",
            "For one-way server-to-client updates (notifications, progress feeds, AI text streaming) over standard HTTP",
            "When you need to send huge files from client to server",
            "SSE does not work in browsers"
          ],
          "correctAnswer": 1,
          "explanation": "SSE uses standard HTTP with automatic browser EventSource reconnection for server-to-client streaming."
        },
        {
          "question": "Why must an SSE Express handler always register `req.on(\"close\", () => clearInterval(...))`?",
          "options": [
            "To force HTTPS",
            "To stop timers and release memory when a user closes their browser tab",
            "Express deletes routes without it",
            "To parse JSON"
          ],
          "correctAnswer": 1,
          "explanation": "Without cleaning up on req close, intervals continue firing forever for disconnected clients."
        },
        {
          "question": "Where must `cors(corsOptions)` be registered relative to routes and error handlers?",
          "options": [
            "At the very end after the 404 handler",
            "Near the top before routes so preflight OPTIONS requests and route responses receive CORS headers",
            "Only inside loginController",
            "Inside MongoDB"
          ],
          "correctAnswer": 1,
          "explanation": "Registering cors() early ensures OPTIONS preflights and route responses include proper Access-Control headers."
        },
        {
          "question": "What Content-Type header is required for Server-Sent Events (SSE)?",
          "options": [
            "application/json",
            "text/event-stream",
            "text/html",
            "multipart/form-data"
          ],
          "correctAnswer": 1,
          "explanation": "Browsers’ EventSource API requires Content-Type: text/event-stream."
        }
      ]
    }
  ]
};
