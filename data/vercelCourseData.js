export const vercelCourseData = {
  "title": "Vercel & Full-Stack Cloud Deployment",
  "description": "Ship decoupled full-stack React + Node.js applications to production with confidence. Master Vercel static + serverless architecture, SPA rewrites, environment security, CORS, MongoDB Atlas, PWA builds, and post-deploy verification.",
  "thumbnail": "vercel",
  "totalDuration": "8h 00m",
  "category": "Cloud & Deployment",
  "difficulty": "Intermediate",
  "tags": [
    "Vercel",
    "Serverless",
    "Deployment",
    "CORS",
    "PWA",
    "MongoDB Atlas"
  ],
  "learningOutcomes": [
    "Architect decoupled frontend (Vite SPA) and backend (Express serverless) Vercel projects",
    "Configure vercel.json rewrites for SPA deep-linking and serverless API routing",
    "Manage environment variables safely without leaking secrets into VITE_* bundles",
    "Troubleshoot CORS allowlists, 404 refresh bugs, and MongoDB cold-start connections",
    "Verify Vite PWA manifests, Workbox service workers, and auto-update behavior",
    "Run post-deployment smoke tests against /api/health and core endpoints"
  ],
  "prerequisites": [
    "React.js fundamentals",
    "Node.js & Express basics",
    "Git & GitHub"
  ],
  "targetAudience": "Full-stack developers ready to deploy real MERN/Vite applications reliably to production.",
  "practicalProject": "Deploy a complete decoupled frontend + backend Cortex stack on Vercel connected to MongoDB Atlas with verified health checks, CORS, and SPA routing.",
  "modules": [
    {
      "title": "Module 1: Cloud Architecture & Vercel Project Setup",
      "duration": "1h 30m",
      "objectives": [
        "Understand why decoupled frontend + backend deployments scale cleanly",
        "Configure Vercel Root Directory for monorepos (frontend/ and backend/)",
        "Write vercel.json SPA fallback rewrites without breaking /sw.js or /assets/*",
        "Route serverless Express traffic cleanly via api/index.js"
      ],
      "notes": "### Module Introduction\nDeploying a full-stack React + Node.js monorepo to Vercel works best as **two decoupled Vercel projects** connected to the same Git repository: a CDN-served **Static SPA** (`frontend/`) and a **Serverless API** (`backend/`).\n\n### Prerequisites\n- React/Vite, Node.js/Express, and Git & GitHub basics.\n\n### How the Lessons Connect\n- **Lesson 1** explains monorepo dual-project setup and CDN vs Serverless execution.\n- **Lesson 2** solves the #1 SPA deployment bug (404 on browser refresh) and shows how `vercel.json` rewrites must avoid hijacking `/sw.js` or `/manifest.webmanifest`.\n\n### Module Summary\nYou will configure both frontend and backend `vercel.json` files cleanly so deep-links, PWA assets, and Express routes all resolve reliably.\n\n### Completion Criteria\n- Complete both lessons and routing exercises.\n- Deliver the Monorepo Dual vercel.json Configuration assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nA newly deployed Vite React + Express monorepo returns 404 NOT_FOUND whenever a user refreshes /courses/123 directly, and /sw.js accidentally returns index.html instead of JavaScript! Fix both vercel.json configurations.\n\nObjectives:\n- Write a frontend vercel.json SPA rewrite that preserves real static files (/sw.js, /assets/*, /manifest.webmanifest).\n- Write a backend vercel.json routing all traffic to api/index.js.\n\nRequirements:\n1. Create frontend/vercel.json with rewrites sending non-asset, non-PWA paths to /index.html (using negative lookahead or Vercel filesystem-first handling).\n2. Create backend/vercel.json routing /(.*) -> /api/index.js.\n3. Document Root Directory settings for both Vercel projects (frontend vs backend).\n\nStep-by-Step Instructions:\n1. Draft frontend/vercel.json using { \"source\": \"/((?!assets/|sw\\.js|manifest\\.webmanifest|icons/).*)\", \"destination\": \"/index.html\" }.\n2. Draft backend/vercel.json pointing to /api/index.js.\n3. Verify locally that /sw.js and /courses/123 behave as expected.\n\nDeliverables:\n- frontend/vercel.json and backend/vercel.json.\n\nEvaluation Criteria:\n- Deep-link refreshes (/courses/123) serve index.html cleanly.\n- /sw.js and /assets/* are NEVER rewritten to index.html.",
      "lessons": [
        {
          "title": "Monorepo Dual-Project Deployment Architecture",
          "duration": "45m",
          "introduction": "Trying to serve React static assets from inside an Express serverless function wastes function invocations and slows down page loads. Decoupling them gives you the best of both worlds.",
          "objectives": [
            "Contrast Edge CDN static hosting with Serverless Function compute",
            "Configure Root Directory separately for frontend and backend Vercel projects",
            "Understand immutable Preview Deployments per Git branch/PR"
          ],
          "notes": "### Why Decouple Frontend and Backend in a Monorepo?\nA common beginner mistake is configuring Express to serve `frontend/dist/index.html` inside a single monolithic serverless function. On Vercel, that forces every HTML, CSS, and JS page load through a Node.js cold start!\nInstead, create **two Vercel projects** linked to the **same GitHub repository**:\n1. **Frontend Project** (`Root Directory: frontend`, Preset: Vite, Output: `dist`): Served globally from Vercel's **Edge CDN** with zero cold starts.\n2. **Backend Project** (`Root Directory: backend`, Serverless Express via `api/index.js`): Scales API compute independently.\n\n### How Preview Deployments Work\nEvery push to a feature branch or Pull Request triggers isolated **Preview URLs** for both projects, letting you test real cloud builds before merging to `main`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Leaving Root Directory blank at the repo root when `package.json` lives inside `frontend/` and `backend/`.\n  - **Solution**: Set Root Directory explicitly to `frontend` on Project 1 and `backend` on Project 2.",
          "codeExample": "# Monorepo folder structure for dual Vercel projects:\n# cortex/\n# ├── frontend/        -> Vercel Project 1 (Framework: Vite, Output: dist)\n# │   ├── src/\n# │   └── vercel.json\n# └── backend/         -> Vercel Project 2 (Serverless Express)\n#     ├── api/index.js\n#     └── vercel.json",
          "codeExplanation": "1. Setting Root Directory scopes each Vercel build to its own package.json and vercel.json.\n2. Frontend assets deploy directly to Edge CDN nodes worldwide; backend Express handlers deploy as Node.js Serverless Functions.\n\nHow to Run & Expected Output:\nVerify locally that `cd frontend && npm run build` emits `frontend/dist/` and `backend/api/index.js` exports the Express app cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Check both `frontend/package.json` and `backend/package.json` to confirm build scripts and dependencies are cleanly separated.\n\nIndependent Challenge:\nDraw a deployment diagram showing Browser -> Frontend CDN (VITE_API_URL) -> Backend Serverless API -> MongoDB Atlas.\n\nExpected Result:\nClear separation of static CDN delivery and serverless API compute.",
          "keyTakeaways": [
            "Deploy monorepo frontends and backends as two separate Vercel projects with distinct Root Directories",
            "Static Vite builds serve from the Edge CDN; Express runs as on-demand Serverless Functions",
            "Preview Deployments let you verify PR changes on real URLs before merging to main"
          ]
        },
        {
          "title": "SPA Rewrites & Serverless Routing (vercel.json)",
          "duration": "45m",
          "introduction": "Client-side routes like /courses/123 don’t exist as real files on the server. Without an SPA rewrite rule, refreshing /courses/123 returns a 404!",
          "objectives": [
            "Explain why refreshing a client-side route causes 404 on static hosts",
            "Configure SPA fallback rewrites in frontend/vercel.json safely",
            "Ensure /sw.js and static assets are never hijacked by the index.html rewrite"
          ],
          "notes": "### Why Refreshing `/courses/123` Causes a 404 on Static Hosts\nIn a React Single Page Application (SPA), clicking `<Link to=\"/courses/123\">` updates the browser URL via the History API without requesting a file from the server. However, if a user **refreshes the browser** or opens a shared link directly, Vercel's CDN looks for `dist/courses/123.html` — which doesn't exist — and returns **404 NOT_FOUND**!\n\n### Fixing SPA Routing Without Breaking PWAs (`/sw.js`)\nA naive rewrite `\"/(.*)\" -> \"/index.html\"` fixes `/courses/123`, **but** if `/sw.js` or `/assets/missing.js` is ever requested, returning `index.html` (MIME `text/html`) breaks Service Worker registration completely!\nUse a **negative lookahead** excluding static assets, `sw.js`, `workbox-*.js`, `manifest.webmanifest`, and `icons/`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Rewriting `/sw.js` to `/index.html`, causing `SecurityError / MIME type ('text/html') is not executable`.\n  - **Solution**: Exclude PWA and asset paths explicitly in `frontend/vercel.json`.",
          "codeExample": "// frontend/vercel.json\n{\n  \"rewrites\": [\n    {\n      \"source\": \"/((?!assets/|sw\\\\.js|workbox-|manifest\\\\.webmanifest|icons/|favicon).*)\",\n      \"destination\": \"/index.html\"\n    }\n  ]\n}\n\n// backend/vercel.json\n{\n  \"version\": 2,\n  \"rewrites\": [\n    { \"source\": \"/(.*)\", \"destination\": \"/api/index.js\" }\n  ]\n}",
          "codeExplanation": "1. frontend/vercel.json uses a negative lookahead regex so /assets/*, /sw.js, /workbox-*, /manifest.webmanifest, and /icons/* pass through directly while SPA routes (/courses/123, /dashboard) rewrite to /index.html.\n2. backend/vercel.json routes all incoming API paths (/(.*)) to the Express serverless entry point /api/index.js.\n\nHow to Run & Expected Output:\nValidate JSON syntax with `node -e \"JSON.parse(require('fs').readFileSync('frontend/vercel.json'))\"`. On deploy, refreshing `/courses/123` returns 200 HTML and `/sw.js` returns 200 JavaScript.",
          "practiceExercise": "Guided Exercise:\n1. Validate both `frontend/vercel.json` and `backend/vercel.json` with `JSON.parse` in Node.\n\nIndependent Challenge:\nAdd a `headers` rule in `frontend/vercel.json` setting `Cache-Control: no-cache, no-store, must-revalidate` on `/sw.js` so browsers always fetch fresh service worker updates.\n\nExpected Result:\nSPA deep links work on hard refresh while `/sw.js` always serves fresh JavaScript.",
          "keyTakeaways": [
            "SPAs need a fallback rewrite to /index.html so direct URL refreshes work",
            "Exclude /sw.js, /manifest.webmanifest, and /assets/* from SPA rewrites so HTML is never served as JS",
            "Route all backend serverless requests to /api/index.js in backend/vercel.json"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does refreshing /courses/123 on a newly deployed React SPA return a 404 error without vercel.json?",
          "options": [
            "React Router deletes the URL on refresh",
            "There is no physical /courses/123 HTML file in dist/, so the static host needs a rewrite rule to serve /index.html",
            "MongoDB blocks the request",
            "Vite removes routes during build"
          ],
          "correctAnswer": 1,
          "explanation": "On a full browser refresh, the CDN looks for a literal file unless rewritten to /index.html so React Router can handle the path."
        },
        {
          "question": "What happens if a broad SPA rewrite accidentally serves index.html when the browser requests /sw.js?",
          "options": [
            "The service worker runs faster",
            "Service worker registration fails with a MIME type error (text/html instead of application/javascript)",
            "Offline caching starts automatically",
            "CORS is bypassed"
          ],
          "correctAnswer": 1,
          "explanation": "Browsers strictly reject service workers served with text/html MIME type; /sw.js must serve actual JavaScript."
        },
        {
          "question": "In a monorepo with frontend/ and backend/ folders, how should you deploy to Vercel?",
          "options": [
            "Zip node_modules and upload manually",
            "Create two separate Vercel projects pointing to the same repo with Root Directory set to frontend and backend respectively",
            "Run vite dev in production",
            "Merge both package.json files into root"
          ],
          "correctAnswer": 1,
          "explanation": "Dual projects let Vercel serve frontend/ from its Edge CDN and backend/ as Serverless Functions cleanly."
        },
        {
          "question": "Why should /sw.js be served with Cache-Control: no-cache (or max-age=0) headers?",
          "options": [
            "So the service worker never caches anything",
            "So the browser always checks the server for an updated sw.js when you deploy a new version of your app",
            "To disable HTTPS",
            "To reduce JS bundle size"
          ],
          "correctAnswer": 1,
          "explanation": "Preventing long-term HTTP caching of sw.js ensures users receive new Workbox precache manifests promptly after deployments."
        }
      ]
    },
    {
      "title": "Module 2: Environment Variables & Secret Hygiene",
      "duration": "1h 15m",
      "objectives": [
        "Distinguish public build-time VITE_* variables from server-only secrets",
        "Understand why .env files must NEVER be committed to Git",
        "Configure Development, Preview, and Production scopes cleanly in Vercel"
      ],
      "notes": "### Module Introduction\nOne leaked `JWT_SECRET` or `MONGODB_URI` pushed to GitHub or prefixed with `VITE_` compromises your entire database. Environment variable hygiene is non-negotiable in cloud deployments.\n\n### Prerequisites\n- Completion of Module 1.\n\n### How the Lessons Connect\n- **Lesson 1** explains build-time `VITE_*` embedding vs runtime backend `process.env`.\n- **Lesson 2** covers startup fail-fast env validation and Vercel's Production/Preview/Development scopes.\n\n### Module Summary\nYou will keep every credential strictly server-side and fail fast on misconfigured deployments.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Env Audit & Fail-Fast Startup Validator assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nA developer accidentally named a database secret VITE_MONGO_URI in frontend/.env and forgot to validate required backend environment variables at startup, causing cryptic crashes 10 minutes after deployment.\n\nObjectives:\n- Audit and separate public frontend config from private backend secrets.\n- Write a fail-fast validateEnv() startup check for the backend.\n\nRequirements:\n1. List which variables belong in frontend (VITE_API_URL only) vs backend (MONGODB_URI, JWT_SECRET, SMTP_USER, SMTP_PASS, CLIENT_URL).\n2. Write validateEnv(requiredKeys) throwing a clear Error listing any missing keys at startup (unless NODE_ENV === 'test').\n3. Create .env.example templates (with placeholder values only, zero real secrets!) for both frontend and backend.\n\nStep-by-Step Instructions:\n1. Create validateEnv.js and test it with a missing JWT_SECRET.\n2. Create .env.example files and confirm .env is listed in .gitignore.\n\nDeliverables:\n- validateEnv.js, frontend/.env.example, and backend/.env.example.\n\nEvaluation Criteria:\n- Zero secrets prefixed with VITE_.\n- Clear startup error listing missing variable names without printing secret values!",
      "lessons": [
        {
          "title": "VITE_* Public Variables vs. Server-Only Secrets",
          "duration": "40m",
          "introduction": "In Vite, any variable starting with VITE_ is literally copy-pasted as plain text into your public JavaScript bundle during npm run build.",
          "objectives": [
            "Explain how Vite embeds import.meta.env.VITE_* at build time",
            "Keep DB URIs, JWT secrets, SMTP passwords, and admin codes strictly on the backend",
            "Never commit .env files to Git"
          ],
          "notes": "### How Vite Handles `VITE_*` Environment Variables\nDuring `vite build`, Vite performs static text replacement on `import.meta.env.VITE_*`. That means:\n- Any variable starting with `VITE_` is **baked as plain text into your public JavaScript bundle**!\n- Anyone visiting your site can open DevTools -> Sources and read every `VITE_*` value.\n- Therefore, **NEVER** prefix `MONGODB_URI`, `JWT_SECRET`, `SMTP_PASS`, or `INSTRUCTOR_SECRET_CODE` with `VITE_`! Keep only public endpoints like `VITE_API_URL` on the frontend.\n\n### Common Mistakes & Solutions\n- **Mistake**: Committing `.env` to GitHub \"just for a quick test.\"\n  - **Solution**: Add `.env` and `.env.*` (except `.env.example`) to `.gitignore` before your first commit. If a secret ever hits Git history, **rotate it immediately** — deleting it in a later commit does not erase Git history!",
          "codeExample": "// Frontend (PUBLIC at build time - safe for API base URL only):\nconst API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';\n\n// Backend (PRIVATE runtime - never exposed to browser):\nconst jwtSecret = process.env.JWT_SECRET;\nconst mongoUri = process.env.MONGODB_URI;",
          "codeExplanation": "1. import.meta.env.VITE_API_URL is safe for public frontend configuration (the backend base URL).\n2. process.env.JWT_SECRET and process.env.MONGODB_URI remain exclusively inside Node.js backend memory.\n\nHow to Run & Expected Output:\nRun `npm run build` in frontend/ and search `dist/assets/*.js` for your `VITE_API_URL` string — you will see it inlined in plain text, proving why secrets must stay on the backend.",
          "practiceExercise": "Guided Exercise:\n1. Run `git ls-files \"*env*\"` in your repository to verify zero real `.env` files are tracked by Git.\n\nIndependent Challenge:\nCreate clean `.env.example` files for both frontend and backend containing placeholder variable names and helpful comments.\n\nExpected Result:\nZero secrets in Git or client bundles; clean `.env.example` onboarding templates.",
          "keyTakeaways": [
            "Vite embeds VITE_* variables directly into public client-side JavaScript bundles",
            "Never put database URIs, JWT secrets, API keys, or SMTP passwords in VITE_* variables",
            "Always commit .env.example templates and keep real .env files in .gitignore"
          ]
        },
        {
          "title": "Handling Missing Env Vars & Vercel Scopes",
          "duration": "35m",
          "introduction": "Remember: changing an environment variable in Vercel only affects future builds for VITE_* vars, and runtime env scopes must match Production vs Preview.",
          "objectives": [
            "Validate required backend env vars cleanly on boot",
            "Configure Production, Preview, and Development scopes in Vercel",
            "Remember to trigger a redeploy after changing VITE_* build-time variables"
          ],
          "notes": "### Build-Time vs. Runtime Env Changes on Vercel\nA frequent deployment surprise:\n- Updating a **Backend** env var in Vercel takes effect on new invocations/redeploy immediately at runtime.\n- Updating a **Frontend `VITE_*`** env var **does nothing until you trigger a fresh build/redeploy**, because Vite baked the previous value into `dist/` at build time!\n\n### Vercel Scopes & Fail-Fast Startup Checks\nAlways scope Production secrets (`Production` checkbox) separately from `Preview` secrets so PR preview deployments talk to a staging/test database rather than production! On the backend, validate required env keys at boot so missing variables fail loudly with a clear key name instead of crashing obscurely 10 minutes later.\n\n### Common Mistakes & Solutions\n- **Mistake**: Logging `console.log(process.env)` when debugging missing variables.\n  - **Solution**: Log only the **names** of missing keys, never printing secret values to logs.",
          "codeExample": "export function assertRequiredEnv(keys = ['MONGODB_URI', 'JWT_SECRET']) {\n  const missing = keys.filter((k) => !process.env[k] || !process.env[k].trim());\n  if (missing.length > 0) {\n    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);\n  }\n}",
          "codeExplanation": "1. assertRequiredEnv checks that every listed key exists and is non-empty after .trim().\n2. It throws a descriptive Error naming only the missing keys (never leaking secret values).\n\nHow to Run & Expected Output:\nRun `node -e \"import('./validate.js').then(m=>m.assertRequiredEnv(['JWT_SECRET']))\"` without JWT_SECRET set. Throws: `Error: Missing required environment variables: JWT_SECRET`.",
          "practiceExercise": "Guided Exercise:\n1. Test `assertRequiredEnv` with `JWT_SECRET=\"   \"` (whitespace only) to verify `.trim()` catches blank values.\n\nIndependent Challenge:\nSkip throwing when `process.env.NODE_ENV === 'test'` if unit tests don't connect to live Atlas/SMTP.\n\nExpected Result:\nMisconfigured deployments fail immediately with clear diagnostic key names.",
          "keyTakeaways": [
            "Updating VITE_* variables requires rebuilding/redeploying the frontend bundle",
            "Separate Production and Preview database URIs in Vercel environment scopes",
            "Validate required backend env vars early with clear key-name error messages"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must you NEVER store JWT_SECRET or MONGODB_URI in a variable named VITE_JWT_SECRET?",
          "options": [
            "Vite refuses to build if it sees the word SECRET",
            "Vite inlines all VITE_* variables directly into the public client-side JS bundle visible to any user in DevTools",
            "Vercel charges extra for VITE_ variables",
            "Express cannot read VITE_ variables"
          ],
          "correctAnswer": 1,
          "explanation": "VITE_* variables are compiled into public browser JavaScript; secrets must remain strictly on the backend."
        },
        {
          "question": "You update VITE_API_URL in the Vercel dashboard, but your live frontend still calls the old API URL. Why?",
          "options": [
            "Browser cookies cached the URL",
            "VITE_* variables are baked in at build time, so you must trigger a new frontend build/redeploy",
            "CORS reverted the URL",
            "Vercel ignores VITE_API_URL in Production"
          ],
          "correctAnswer": 1,
          "explanation": "Because Vite replaces import.meta.env.VITE_* during vite build, updating it requires a fresh build/redeploy."
        },
        {
          "question": "What should be committed to Git to document required environment variables without leaking credentials?",
          "options": [
            ".env.production",
            ".env.example with placeholder values only",
            "node_modules/.env",
            "JWT_SECRET.txt"
          ],
          "correctAnswer": 1,
          "explanation": "Commit .env.example with dummy placeholders and keep all real .env files in .gitignore."
        },
        {
          "question": "Why should Preview deployments use a separate test/staging MongoDB database instead of Production?",
          "options": [
            "Preview URLs don’t support Atlas",
            "So testing unfinished PR features never corrupts or deletes real user data in Production",
            "Production databases block HTTPS",
            "Preview deployments run offline"
          ],
          "correctAnswer": 1,
          "explanation": "Scoping Preview env vars to a staging DB protects live production records during PR testing."
        }
      ]
    },
    {
      "title": "Module 3: CORS, MongoDB Atlas & Serverless Cold Starts",
      "duration": "1h 30m",
      "objectives": [
        "Troubleshoot and fix CORS errors in decoupled Vercel deployments",
        "Configure MongoDB Atlas Network Access and connection caching for serverless",
        "Minimize serverless cold-start latency"
      ],
      "notes": "### Module Introduction\nTwo issues trip up almost every first-time full-stack deployment: **CORS blocked requests** between frontend/backend domains, and **MongoDB Atlas connection timeouts** from serverless functions.\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** demystifies CORS preflight (`OPTIONS`) requests and dynamic Vercel Preview origin matching.\n- **Lesson 2** configures MongoDB Atlas network access and warm-container connection reuse.\n\n### Module Summary\nYou will eliminate CORS errors cleanly without insecure wildcards and keep Atlas connections fast and reliable.\n\n### Completion Criteria\n- Complete both lessons and troubleshooting drills.\n- Deliver the Production CORS & Atlas Cold-Start Guard assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nYour deployed Vercel frontend (https://cortex-app.vercel.app) receives \"Access to XMLHttpRequest has been blocked by CORS policy\" when calling https://cortex-api.vercel.app, and Atlas occasionally times out on cold starts.\n\nObjectives:\n- Build a strict, trailing-slash-safe CORS origin validator supporting CLIENT_URL and localhost.\n- Configure Atlas connection caching with clean error recovery.\n\nRequirements:\n1. Normalize CLIENT_URL by stripping any trailing slash (.replace(/\\/$/, '')) so https://app.vercel.app/ and https://app.vercel.app both match!\n2. Allow requests with no Origin header (curl, server health checks) and explicit allowlist origins.\n3. Explicitly handle OPTIONS preflight requests cleanly via cors(corsOptions).\n4. Configure mongoose.connect with bufferCommands: false and cached globalThis promise.\n\nStep-by-Step Instructions:\n1. Implement buildCorsOptions(clientUrl) in corsConfig.js.\n2. Test against exact match, trailing-slash mismatch, and an unauthorized evil.com origin.\n\nDeliverables:\n- corsConfig.js and dbConnect.js.\n\nEvaluation Criteria:\n- Rejects untrusted origins cleanly.\n- Never pairs origin: '*' with credentials: true.",
      "lessons": [
        {
          "title": "Mastering CORS in Decoupled Deployments",
          "duration": "45m",
          "introduction": "CORS is enforced by the browser, not curl or Postman — which is why APIs work in Thunder Client and suddenly fail in Chrome after deploying.",
          "objectives": [
            "Understand Browser Same-Origin Policy and CORS preflight (OPTIONS) requests",
            "Normalize trailing slashes in CLIENT_URL allowlists",
            "Support credentials safely without wildcard *"
          ],
          "notes": "### Why Decoupled Deployments Hit CORS Errors\nYour frontend (`https://cortex-lms.vercel.app`) and backend (`https://cortex-api.vercel.app`) live on **different origins** (subdomains). Browsers enforce the **Same-Origin Policy**, blocking JavaScript from reading cross-origin responses unless the backend explicitly replies with `Access-Control-Allow-Origin`!\n*(Note: `curl` and Postman do NOT enforce CORS, which is why an API can work in Postman and fail in Chrome!)*\n\n### Three Subtle Production CORS Traps\n1. **Trailing Slash Mismatch**: If `CLIENT_URL` is `https://app.vercel.app/`, Chrome sends `Origin: https://app.vercel.app` (no slash) — an exact string check fails! Always strip trailing slashes with `.replace(/\\/+$/, '')`.\n2. **Wildcard + Credentials**: Browsers strictly forbid `origin: '*'` combined with `credentials: true`.\n3. **500 Crash Before CORS**: If an early middleware throws *before* `cors()` runs, the 500 response lacks CORS headers and Chrome reports a misleading \"CORS error\"! Always register `cors()` **first**.",
          "codeExample": "export function createCorsOptions(clientUrl) {\n  const normalizedClient = (clientUrl || '').trim().replace(/\\/+$/, '');\n  const allowlist = new Set([\n    normalizedClient,\n    'http://localhost:5173',\n    'http://localhost:4173'\n  ].filter(Boolean));\n\n  return {\n    origin(origin, callback) {\n      if (!origin || allowlist.has(origin)) {\n        return callback(null, true);\n      }\n      return callback(new Error(`CORS blocked for origin: ${origin}`));\n    },\n    credentials: true\n  };\n}",
          "codeExplanation": "1. createCorsOptions strips whitespace and trailing slashes from clientUrl before storing it in a fast Set allowlist.\n2. Requests without an Origin header (curl, server health checks) and approved localhost/production origins are allowed; unknown origins are rejected cleanly.\n\nHow to Run & Expected Output:\nTest `createCorsOptions('https://app.vercel.app/').origin('https://app.vercel.app', cb)` in Node — invokes `cb(null, true)`. Passing `'https://evil.test'` invokes `cb(Error)`.",
          "practiceExercise": "Guided Exercise:\n1. Verify in `backend/api/index.js` that `app.use(cors(corsOptions))` is registered before route handlers.\n\nIndependent Challenge:\nAdd support for comma-separated multiple origins in `CLIENT_URL` (e.g., custom domain + vercel.app domain) by splitting on `,`.\n\nExpected Result:\nZero CORS errors across localhost dev, preview, and production domains while blocking unauthorized origins.",
          "keyTakeaways": [
            "CORS is a browser security enforcement; always register cors() before routes",
            "Normalize trailing slashes on CLIENT_URL when building an origin allowlist",
            "Never combine origin: \"*\" with credentials: true"
          ]
        },
        {
          "title": "MongoDB Atlas Connectivity & Serverless Cold Starts",
          "duration": "45m",
          "introduction": "Serverless functions do not have a fixed static IP address — which means Atlas IP allowlisting and connection caching must be configured for dynamic serverless IPs.",
          "objectives": [
            "Configure MongoDB Atlas Network Access safely for serverless (0.0.0.0/0 + strong auth/TLS)",
            "Reuse cached Mongoose connections across warm serverless invocations",
            "Keep serverless bundles lean to minimize cold-start time"
          ],
          "notes": "### MongoDB Atlas in Serverless Environments\nUnlike a traditional VPS with one static IP running 24/7, Vercel Serverless Functions spin up across dynamic cloud IP ranges and freeze when idle:\n1. **Atlas Network Access**: Configure `0.0.0.0/0` in Atlas Network Access paired with a **strong random DB password**, **least-privilege DB user**, and **TLS** (`mongodb+srv://`) — or use a dedicated private VPC link on paid tiers.\n2. **Connection Caching**: Cache the `mongoose.connect()` Promise on `globalThis` so warm containers reuse the existing socket pool instead of opening a new TLS connection per request.\n3. **Await Before Querying**: When `bufferCommands: false` is enabled, always `await connectDB()` in middleware before hitting Mongoose models so cold starts wait cleanly for the handshake.\n\n### Common Mistakes & Solutions\n- **Mistake**: Calling `connectDB()` without `await` at top level and letting the first request query Mongoose before Atlas finishes connecting.\n  - **Solution**: Run `await connectDB()` inside an Express middleware before API routes.",
          "codeExample": "// Middleware ensuring DB is connected before any /api/* route runs\nexport async function ensureDbConnected(req, res, next) {\n  try {\n    await connectDB();\n    next();\n  } catch (err) {\n    next(err);\n  }\n}",
          "codeExplanation": "1. ensureDbConnected awaits the cached connectDB() promise before passing control via next().\n2. On cold starts it waits for the Atlas handshake; on warm requests it resolves from cache in <1ms.\n\nHow to Run & Expected Output:\nRegister `app.use('/api', ensureDbConnected)` before API routes. Cold-start requests wait cleanly and succeed instead of throwing `Client must be connected` errors.",
          "practiceExercise": "Guided Exercise:\n1. Trace what happens if `connectDB()` rejects due to a temporary Atlas blip and verify `cached.promise = null` lets the next request retry.\n\nIndependent Challenge:\nAdd a timing log on cold-start connection only (when `!cached.conn`) to measure Atlas handshake latency.\n\nExpected Result:\nReliable cold-start connection handling and fast warm-container reuse.",
          "keyTakeaways": [
            "Always await connectDB() before executing queries in serverless handlers",
            "Use strong Atlas credentials + TLS since serverless IPs are dynamic",
            "Keep backend dependencies lean to minimize cold-start latency"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why do API requests sometimes work in curl/Postman yet fail with a CORS error in Chrome?",
          "options": [
            "curl automatically hacks CORS",
            "CORS is enforced strictly by web browsers, whereas server/CLI tools like curl do not enforce browser Same-Origin Policy",
            "Postman sends JSON differently",
            "MongoDB blocks Chrome"
          ],
          "correctAnswer": 1,
          "explanation": "CORS headers instruct browsers which frontend origins are allowed to read responses; non-browser tools ignore CORS."
        },
        {
          "question": "What subtle bug happens if CLIENT_URL is set to \"https://app.vercel.app/\" (with a trailing slash) in an exact-match CORS check?",
          "options": [
            "Nothing — trailing slashes are ignored automatically",
            "Browsers send Origin without a trailing slash (\"https://app.vercel.app\"), causing the exact match to fail and block all requests",
            "Express crashes on startup",
            "HTTPS turns into HTTP"
          ],
          "correctAnswer": 1,
          "explanation": "HTTP Origin headers never include a trailing slash, so always strip trailing slashes from CLIENT_URL."
        },
        {
          "question": "Why does MongoDB Atlas typically require 0.0.0.0/0 (plus strong credentials & TLS) when used from Vercel Serverless Functions?",
          "options": [
            "Vercel disables passwords",
            "Serverless function instances run across dynamic cloud IPs rather than one fixed static IP",
            "MongoDB forbids static IPs",
            "0.0.0.0/0 disables encryption"
          ],
          "correctAnswer": 1,
          "explanation": "Because serverless platforms dynamically allocate IPs, static IP allowlists break unless using paid VPC/static egress."
        },
        {
          "question": "Why should serverless routes await connectDB() before querying when bufferCommands: false is set?",
          "options": [
            "To clear the database",
            "So cold-start requests wait for the TLS/Atlas handshake to finish instead of failing immediately",
            "To disable connection pooling",
            "To bypass Express middleware"
          ],
          "correctAnswer": 1,
          "explanation": "Awaiting the cached connection promise ensures the socket is ready on cold starts and returns immediately on warm requests."
        }
      ]
    },
    {
      "title": "Module 4: PWA Configuration, Caching & Auto-Updates",
      "duration": "1h 15m",
      "objectives": [
        "Configure a valid Web App Manifest and PNG icons for installable PWAs",
        "Separate static app-shell precaching from private API calls in Workbox",
        "Avoid caching private /api/auth/* or user-specific JSON in the Service Worker"
      ],
      "notes": "### Module Introduction\nA **Progressive Web App (PWA)** lets users install your web app to their phone or desktop and load the UI shell even offline. However, misconfigured Workbox rules can accidentally cache stale auth tokens or serve old broken JS!\n\n### Prerequisites\n- Completion of Modules 1–3.\n\n### How the Lessons Connect\n- **Lesson 1** covers the Web App Manifest (`manifest.webmanifest`) and required 192x192 / 512x512 icons.\n- **Lesson 2** configures Workbox `navigateFallback`, excludes `/api/*` from precache navigation fallback, and avoids caching private user endpoints.\n\n### Module Summary\nYou will ship installable, offline-capable Vite PWAs that update cleanly and never cache private user data.\n\n### Completion Criteria\n- Complete both lessons and manifest/SW exercises.\n- Deliver the Safe Vite PWA Configuration assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nConfigure vite-plugin-pwa in vite.config.js so a React SPA is installable, caches its static JS/CSS/HTML shell for offline use, and NEVER caches private /api/auth/* or /api/enrollments/* responses.\n\nObjectives:\n- Configure valid manifest fields (name, short_name, display: 'standalone', 192px & 512px PNG icons).\n- Configure Workbox registerType: 'autoUpdate', cleanupOutdatedCaches: true, and navigateFallbackDenylist: [/^\\/api/].\n\nRequirements:\n1. Define manifest with start_url: '/', display: 'standalone', theme_color, background_color, and both 192x192 and 512x512 PNG icons.\n2. Set workbox.navigateFallback: '/index.html' and navigateFallbackDenylist: [/^\\/api/].\n3. Set skipWaiting: true and clientsClaim: true (via autoUpdate) so new deploys activate cleanly.\n4. Keep private authenticated API routes NetworkOnly (never CacheFirst!).\n\nStep-by-Step Instructions:\n1. Write the VitePWA({ ... }) plugin config inside vite.config.js.\n2. Run npm run build and verify dist/sw.js and dist/manifest.webmanifest are generated.\n\nDeliverables:\n- vite.config.js PWA section.\n\nEvaluation Criteria:\n- Both 192x192 and 512x512 icons configured.\n- /api/* explicitly excluded from navigateFallback and never cached with private user data.",
      "lessons": [
        {
          "title": "Web App Manifest & Icon Requirements",
          "duration": "35m",
          "introduction": "Browsers only show the \"Install App\" prompt when your Web App Manifest meets strict HTTPS, icon, and display criteria.",
          "objectives": [
            "Configure required Web App Manifest fields cleanly",
            "Provide 192x192 and 512x512 PNG icons (plus maskable if desired)",
            "Verify manifest validity in Chrome DevTools -> Application -> Manifest"
          ],
          "notes": "### What Makes a Web App an Installable PWA?\nModern Chromium browsers (Chrome, Edge, Android) only display the \"Install App\" icon when three requirements are met:\n1. **HTTPS**: Always enabled automatically on Vercel production/preview URLs (`localhost` is exempted for local testing).\n2. **Valid Web App Manifest**: Served with `name`, `short_name`, `start_url: \"/\"`, `display: \"standalone\"`, `theme_color`, `background_color`, and **both `192x192` and `512x512` PNG icons** that actually return HTTP `200`.\n3. **Active Service Worker**: Registered cleanly at root scope `/`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Listing `/icons/icon-192.png` in the manifest while the file actually lives at `/icon-192.png` (returning 404).\n  - **Solution**: Open DevTools -> Application -> Manifest and confirm both icons preview cleanly with zero warnings.",
          "codeExample": "// Manifest excerpt inside VitePWA({ manifest: { ... } })\nmanifest: {\n  name: 'Cortex LMS',\n  short_name: 'Cortex',\n  start_url: '/',\n  display: 'standalone',\n  background_color: '#FDFBF7',\n  theme_color: '#FF8C42',\n  icons: [\n    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },\n    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }\n  ]\n}",
          "codeExplanation": "1. display: 'standalone' launches the installed PWA in its own OS window without browser tabs or address bars.\n2. Providing both 192x192 and 512x512 PNG icons satisfies Chromium installability criteria across desktop and Android.\n\nHow to Run & Expected Output:\nRun `npm run build && npm run preview`, open DevTools -> Application -> Manifest. All fields and both PNG icon previews appear with zero errors.",
          "practiceExercise": "Guided Exercise:\n1. Inspect `dist/manifest.webmanifest` after `npm run build` to verify all icon paths and colors match `public/icons/`.\n\nIndependent Challenge:\nAdd a `purpose: 'any maskable'` (or separate maskable icon) entry and inspect how Android adaptive icon masking previews it in DevTools.\n\nExpected Result:\nValid, error-free Web App Manifest ready for standalone installation.",
          "keyTakeaways": [
            "Include name, short_name, start_url, display: \"standalone\", and 192x192 + 512x512 PNG icons",
            "Verify both icon URLs return HTTP 200 in DevTools Application -> Manifest",
            "PWAs require HTTPS in production (localhost is exempted for local testing)"
          ]
        },
        {
          "title": "Service Worker Caching & Auto-Update",
          "duration": "40m",
          "introduction": "Caching static JS/CSS makes your app instant offline — but caching private /api/auth/me JSON or letting an old Service Worker serve deleted chunk hashes breaks apps.",
          "objectives": [
            "Configure Workbox precaching and navigateFallbackDenylist",
            "Keep private authenticated API routes NetworkOnly",
            "Use cleanupOutdatedCaches and autoUpdate so deployments stay fresh"
          ],
          "notes": "### Safe Workbox Caching Rules\nA Service Worker acts like a programmable network proxy inside the user's browser:\n- **Precache Static Shell**: `vite-plugin-pwa` automatically precaches hashed JS, CSS, `index.html`, and icons so public pages load even offline!\n- **`navigateFallbackDenylist: [/^\\/api/]`**: Critical! Without this, direct browser navigations to `/api/health` could be intercepted by Workbox and served `/index.html` instead!\n- **Never Cache Private Auth/User Data**: Keep `/api/auth/*`, `/api/enrollments/*`, and user dashboards strictly **NetworkOnly**. When offline, the UI should show an honest \"You are offline\" error rather than serving stale private JSON from Cache Storage!\n\n### Auto-Updates & Cache Cleanup\nSet `registerType: 'autoUpdate'` and `cleanupOutdatedCaches: true` so new deployments activate promptly and delete obsolete asset caches.",
          "codeExample": "VitePWA({\n  registerType: 'autoUpdate',\n  workbox: {\n    cleanupOutdatedCaches: true,\n    navigateFallback: '/index.html',\n    navigateFallbackDenylist: [/^\\/api/],\n    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']\n  }\n})",
          "codeExplanation": "1. registerType: 'autoUpdate' activates updated service workers automatically on deploy.\n2. cleanupOutdatedCaches: true removes old precache buckets from prior releases.\n3. navigateFallbackDenylist: [/^\\/api/] prevents navigation fallback from hijacking /api/* endpoints.\n\nHow to Run & Expected Output:\nRun `npm run build && npm run preview`. Check DevTools -> Application -> Service Workers (\"activated and is running\") and Cache Storage (`workbox-precache-v2-...`).",
          "practiceExercise": "Guided Exercise:\n1. Load Home and Courses online, switch DevTools Network tab to \"Offline\", refresh `/courses`, and verify the app shell loads cleanly.\n\nIndependent Challenge:\nAttempt to log in or submit a contact form while Offline in DevTools and verify the UI displays an honest offline/network error instead of fake success.\n\nExpected Result:\nOffline public shell caching works while private API requests fail honestly offline.",
          "keyTakeaways": [
            "Use cleanupOutdatedCaches: true and autoUpdate to keep deployed PWAs fresh",
            "Always add /^\\/api/ to navigateFallbackDenylist",
            "Never cache private authenticated API responses in the Service Worker"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which two PNG icon sizes are required by Chromium for standard PWA installability?",
          "options": [
            "16x16 and 32x32",
            "192x192 and 512x512",
            "64x64 and 128x128",
            "1024x1024 only"
          ],
          "correctAnswer": 1,
          "explanation": "Chromium’s PWA install criteria require valid 192x192 and 512x512 PNG icons in the manifest."
        },
        {
          "question": "Why must /^\\/api/ be included in Workbox’s navigateFallbackDenylist?",
          "options": [
            "To cache API responses forever",
            "So navigation fallback to /index.html never intercepts /api/* requests",
            "To compress API JSON",
            "To disable offline mode"
          ],
          "correctAnswer": 1,
          "explanation": "Without the denylist, direct navigations to /api/* could receive /index.html from the service worker."
        },
        {
          "question": "Why should private authenticated endpoints (/api/auth/me, /api/enrollments) NOT be cached in a Service Worker?",
          "options": [
            "Service workers cannot read JSON",
            "Caching private user data risks leaking another user’s session data on shared devices or showing stale fake-online states",
            "Workbox rejects /api URLs",
            "HTTPS blocks API caching"
          ],
          "correctAnswer": 1,
          "explanation": "Private auth/user data must stay NetworkOnly so offline mode shows accurate offline errors and never persists sensitive responses in Cache Storage."
        },
        {
          "question": "What does cleanupOutdatedCaches: true do in Workbox?",
          "options": [
            "Clears localStorage on logout",
            "Deletes obsolete precache entries from older Workbox versions after an update",
            "Deletes user cookies",
            "Disables service worker registration"
          ],
          "correctAnswer": 1,
          "explanation": "cleanupOutdatedCaches removes stale assets left behind by previous app deployments."
        }
      ]
    },
    {
      "title": "Module 5: Transactional Email & Production Observability",
      "duration": "1h 15m",
      "objectives": [
        "Configure SMTP / Gmail App Passwords safely via environment variables",
        "Expose a lightweight /api/health endpoint for uptime monitoring",
        "Run automated post-deployment smoke tests against live endpoints"
      ],
      "notes": "### Module Introduction\n\"Deployed\" does not mean \"verified.\" Production systems need reliable SMTP configuration, a fast `/api/health` endpoint, and repeatable smoke tests right after every deploy.\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** covers Nodemailer SMTP configuration (App Passwords, non-blocking error handling, zero hardcoded personal emails).\n- **Lesson 2** builds `/api/health` checks and post-deploy smoke test scripts.\n\n### Module Summary\nYou will configure transactional email securely and verify live deployments systematically.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Health Check & Post-Deploy Smoke Test Script assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a post-deployment Smoke Test script (smokeTest.mjs) that verifies a newly deployed frontend + backend stack automatically after every release.\n\nObjectives:\n- Verify /api/health returns 200 OK with database connected.\n- Verify public catalog API, 401 protection on private routes, and frontend /sw.js MIME type.\n\nRequirements:\n1. Accept BASE_API_URL and BASE_APP_URL from CLI args or env vars.\n2. Check GET /api/health -> assert status === 200 and body.status === 'ok'.\n3. Check GET /api/courses -> assert status === 200 and Array.isArray(body).\n4. Check GET /api/auth/me (no token) -> assert status === 401.\n5. Check GET <BASE_APP_URL>/sw.js -> assert status === 200 and content-type includes 'javascript'.\n\nStep-by-Step Instructions:\n1. Write smokeTest.mjs using native Node 18+ fetch() and node:assert/strict.\n2. Run against local preview + backend to verify exit code 0.\n\nDeliverables:\n- smokeTest.mjs.\n\nEvaluation Criteria:\n- Fails with non-zero exit code if any critical check fails.\n- Explicitly verifies /sw.js MIME type is JavaScript, not text/html.",
      "lessons": [
        {
          "title": "Nodemailer & Gmail App Passwords",
          "duration": "35m",
          "introduction": "Standard Google account passwords are rejected by SMTP servers. Production Nodemailer setups use 16-character App Passwords (or dedicated providers like Resend/Postmark) stored strictly in backend env vars.",
          "objectives": [
            "Configure Nodemailer SMTP transports with process.env credentials",
            "Keep recipient/support email addresses strictly on the server (never in public frontend code)",
            "Handle SMTP failures gracefully without crashing the whole API"
          ],
          "notes": "### Production SMTP & Email Privacy\nStandard Gmail account passwords fail with `535 Username and Password not accepted` when used in Nodemailer. You must enable 2FA and generate a **16-character App Password** (or use an API provider like Resend/Postmark) stored strictly in backend `SMTP_PASS`.\n\n### Never Expose Personal Emails in Frontend Code\nPutting `mailto:yourpersonal@gmail.com` in React JSX exposes your inbox to spam scrapers and leaks personal identity in public bundles. Instead, render a clean **Contact Form** that POSTs to `/api/contact`, keeping `CONTACT_RECEIVER_EMAIL` strictly on the backend!\n\n### Common Mistakes & Solutions\n- **Mistake**: Letting a slow SMTP server hang an API request for 2 minutes.\n  - **Solution**: Configure `connectionTimeout: 10000` and `socketTimeout: 10000` on the Nodemailer transport and wrap `sendMail()` in `try/catch`.",
          "codeExample": "import nodemailer from 'nodemailer';\n\nexport function createMailer() {\n  return nodemailer.createTransport({\n    host: process.env.SMTP_HOST || 'smtp.gmail.com',\n    port: Number(process.env.SMTP_PORT || 465),\n    secure: true,\n    auth: {\n      user: process.env.SMTP_USER,\n      pass: process.env.SMTP_PASS\n    }\n  });\n}",
          "codeExplanation": "1. createMailer reads SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS strictly from backend process.env.\n2. Port 465 with secure: true enforces implicit TLS encryption.\n\nHow to Run & Expected Output:\nCall `await createMailer().verify()` in a backend diagnostic script with valid env vars -> resolves `true` (\"Server is ready to take our messages\").",
          "practiceExercise": "Guided Exercise:\n1. Run `rg -n \"@gmail.com\" frontend/src` in your workspace to confirm zero personal email addresses leak in client code.\n\nIndependent Challenge:\nAdd `connectionTimeout: 10000` and `greetingTimeout: 10000` to `createMailer()` and test error handling when SMTP credentials are missing.\n\nExpected Result:\nSecure server-side email delivery with zero personal address exposure in frontend code.",
          "keyTakeaways": [
            "Use App Passwords or transactional email APIs (Resend/SendGrid) via backend env vars",
            "Never expose personal email addresses in public frontend bundles",
            "Configure timeouts and try/catch around sendMail()"
          ]
        },
        {
          "title": "Health Checks & Smoke Testing Deployments",
          "duration": "40m",
          "introduction": "A /api/health endpoint lets uptime monitors and deploy scripts confirm in one request that both Express and MongoDB are alive.",
          "objectives": [
            "Implement GET /api/health returning status and DB readiness",
            "Automate post-deploy smoke checks across API and PWA endpoints"
          ],
          "notes": "### Why `/api/health` Matters\nAfter deploying, never assume the site works just because Vercel printed \"Ready\". A lightweight `GET /api/health` endpoint lets uptime monitors and post-deploy smoke scripts verify **both Express and MongoDB** in one fast request:\n- Returns `200 OK` when `mongoose.connection.readyState === 1` (connected).\n- Returns `503 Service Unavailable` when disconnected.\n- **Never** expose `process.env`, DB URIs, or internal stack traces in `/api/health`!\n\n### Automated Smoke Testing\nA 20-line Node script checking `/api/health`, `/api/courses`, `401` on `/api/auth/me`, and `200 text/javascript` on `/sw.js` catches 95% of deployment misconfigurations in 2 seconds!",
          "codeExample": "// GET /api/health\nexport function healthHandler(mongooseConn) {\n  return (req, res) => {\n    const isDbUp = mongooseConn.readyState === 1;\n    res.status(isDbUp ? 200 : 503).json({\n      status: isDbUp ? 'ok' : 'degraded',\n      database: isDbUp ? 'connected' : 'disconnected',\n      timestamp: new Date().toISOString()\n    });\n  };\n}",
          "codeExplanation": "1. healthHandler inspects mongoose.connection.readyState === 1 to report connected vs degraded status accurately.\n2. HTTP 503 alerts monitoring tools immediately if MongoDB Atlas becomes unreachable.\n\nHow to Run & Expected Output:\nSend `curl http://localhost:5000/api/health`. Returns `200 OK` with `{ \"status\": \"ok\", \"database\": \"connected\", \"timestamp\": \"...\" }`.",
          "practiceExercise": "Guided Exercise:\n1. Test `GET /api/health` against your running local backend and verify status `200` and JSON body.\n\nIndependent Challenge:\nWrite a Node smoke script checking `/api/health`, `/api/courses`, `/api/auth/me` (expect 401), and frontend `/sw.js` (expect `javascript` content-type).\n\nExpected Result:\nOne-command verification confirming both frontend and backend deployments are healthy.",
          "keyTakeaways": [
            "Expose GET /api/health returning 200 when healthy and 503 when DB is down",
            "Never leak env vars, URIs, or stack traces in /api/health",
            "Run automated smoke tests right after every production deployment"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should a Contact form POST to a backend /api/contact endpoint instead of putting a personal email address in frontend React JSX?",
          "options": [
            "React cannot render email links",
            "Keeping the recipient address server-side protects privacy, prevents spam scraping, and enables server-side validation & rate limiting",
            "SMTP runs inside the browser",
            "Vercel blocks mailto links"
          ],
          "correctAnswer": 1,
          "explanation": "Server-side contact delivery hides personal email addresses from public HTML/JS bundles and lets you rate-limit spam."
        },
        {
          "question": "What HTTP status code should GET /api/health return when MongoDB is disconnected?",
          "options": [
            "200 OK",
            "503 Service Unavailable",
            "302 Found",
            "201 Created"
          ],
          "correctAnswer": 1,
          "explanation": "503 signals to uptime monitors and load balancers that the service is temporarily unable to handle normal DB traffic."
        },
        {
          "question": "Why should SMTP_PASS never be committed to Git or placed in frontend .env?",
          "options": [
            "Gmail passwords are too long",
            "Anyone with the secret can send emails impersonating your account",
            "Git corrupts passwords",
            "Vite deletes SMTP_PASS"
          ],
          "correctAnswer": 1,
          "explanation": "SMTP credentials grant email-sending access and must remain strictly in private backend environment variables."
        },
        {
          "question": "What should a post-deploy smoke test verify on /sw.js?",
          "options": [
            "That /sw.js returns HTML",
            "That /sw.js returns HTTP 200 with a JavaScript content-type header",
            "That /sw.js returns 404",
            "That /sw.js contains MongoDB credentials"
          ],
          "correctAnswer": 1,
          "explanation": "Confirming /sw.js returns JavaScript (not rewritten index.html) ensures PWA offline support works in production."
        }
      ]
    },
    {
      "title": "Module 6: Bundle Optimization & Production Rollback",
      "duration": "1h 15m",
      "objectives": [
        "Split heavy vendor libraries (Three.js, Framer Motion) with Vite manualChunks",
        "Use Vercel Instant Rollbacks when a production release misbehaves",
        "Complete a structured Pre-Launch Production Sign-Off checklist"
      ],
      "notes": "### Module Introduction\nShipping fast also means **recovering fast**. Keeping JS bundles split into cache-friendly chunks speeds up repeat visits, while Vercel's immutable deployments let you roll back a broken release in one click.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** configures Rollup `manualChunks` in `vite.config.js` so heavy 3D/animation libraries don't bloat the main bundle.\n- **Lesson 2** covers Instant Rollbacks and a repeatable Pre-Launch Sign-Off checklist.\n\n### Module Summary\nYou now know how to architect, secure, optimize, deploy, and verify full-stack React + Node.js applications on Vercel.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the Vite Bundle Split & Pre-Launch Sign-Off assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nA Vite production build prints a warning: \"Some chunks are larger than 500 kB after minification\" because React, Framer Motion, Three.js, and Markdown libraries are all bundled into one giant index.js file. Optimize chunk splitting and draft a Pre-Launch Sign-Off checklist.\n\nObjectives:\n- Configure build.rollupOptions.output.manualChunks in vite.config.js.\n- Combine manualChunks with React.lazy() for heavy pages.\n\nRequirements:\n1. Configure manualChunks separating react/react-dom/react-router-dom ('vendor-react'), framer-motion ('vendor-motion'), and three/@react-three ('vendor-3d').\n2. Run npm run build and verify individual chunk sizes shrink cleanly.\n3. Write a 6-point Pre-Launch Sign-Off checklist covering Env Vars, CORS, /api/health, PWA /sw.js, Mobile 375px overflow, and Rollback readiness.\n\nStep-by-Step Instructions:\n1. Add build.rollupOptions.output.manualChunks to vite.config.js.\n2. Run npm run build and compare chunk outputs.\n\nDeliverables:\n- vite.config.js manualChunks snippet and Pre-Launch checklist.\n\nEvaluation Criteria:\n- Heavy vendor libraries isolated into cacheable chunks.\n- Actionable, verifiable pre-launch checklist.",
      "lessons": [
        {
          "title": "Rollup Manual Chunks & Lazy Loading",
          "duration": "35m",
          "introduction": "Every time you fix a 1-line typo in your React page, users shouldn’t have to re-download 400 KB of unchanged React and Framer Motion code.",
          "objectives": [
            "Separate stable vendor libraries from frequently changing app code using manualChunks",
            "Combine manualChunks with React.lazy() route splitting"
          ],
          "notes": "### Optimizing Vite Bundles with `manualChunks`\nBy default, Vite may lump React, React Router, Framer Motion, and your app pages into one large chunk. Whenever you change 1 line in `Home.jsx`, returning users have to re-download the whole bundle!\nConfiguring `build.rollupOptions.output.manualChunks` isolates stable vendor libraries into separate hashed chunks (`vendor-react-*.js`, `vendor-motion-*.js`). When your app code changes, vendor hashes stay identical and remain cached in users' browsers!\n\n### Combine with `React.lazy()`\nPair `manualChunks` with `React.lazy(() => import('./pages/InstructorDashboard'))` so heavy admin/instructor pages aren't downloaded at all by regular visitors on the Home page.\n\n### Common Mistakes & Solutions\n- **Mistake**: Splitting interdependent circular libraries into conflicting manual chunks.\n  - **Solution**: Keep `react`, `react-dom`, and `react-router-dom` together in one `vendor-react` chunk.",
          "codeExample": "// vite.config.js\nexport default {\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          'vendor-react': ['react', 'react-dom', 'react-router-dom'],\n          'vendor-motion': ['framer-motion']\n        }\n      }\n    }\n  }\n};",
          "codeExplanation": "1. manualChunks groups core React + Router packages into vendor-react and framer-motion into vendor-motion.\n2. Keeping react and react-dom together prevents circular chunk warnings.\n\nHow to Run & Expected Output:\nRun `npm run build` and inspect `dist/assets/` — separate `vendor-react-*.js` and `vendor-motion-*.js` chunks appear alongside slim route chunks.",
          "practiceExercise": "Guided Exercise:\n1. Run `npm run build` and inspect chunk sizes in `dist/assets/` to identify the largest JS chunk.\n\nIndependent Challenge:\nLazy-load an admin or analytics page with `React.lazy()` and confirm its chunk only downloads in DevTools Network tab when navigating to that route.\n\nExpected Result:\nFaster initial landing-page load and better long-term browser caching.",
          "keyTakeaways": [
            "manualChunks isolates stable third-party libraries for better long-term browser caching",
            "Pair manualChunks with React.lazy() route splitting to keep initial page load fast"
          ]
        },
        {
          "title": "Instant Rollbacks & Pre-Launch Sign-Off",
          "duration": "40m",
          "introduction": "Even with tests, unexpected edge cases can hit production. Knowing how Vercel’s immutable deployments enable 1-second rollbacks keeps stress low.",
          "objectives": [
            "Perform an Instant Rollback to a previous immutable Vercel deployment",
            "Run a structured Pre-Launch Sign-Off checklist before announcing a release"
          ],
          "notes": "### How Vercel Instant Rollbacks Work\nEvery Vercel deployment produces an **immutable build snapshot**. Unlike traditional servers that overwrite files in-place, Vercel keeps every previous deployment intact. If a newly merged release introduces a bug in production:\n1. Open the Vercel Deployments list.\n2. Click **Instant Rollback** on the previous healthy deployment.\n3. Production traffic switches back in ~1 second with zero rebuild wait!\n\n### The Rollback Catch: Backward-Compatible Databases\nInstant Rollback restores code instantly, **not** database contents! That is why schema changes must always be **backward-compatible** (Expand-and-Contract) so yesterday's rolled-back backend code still runs cleanly against today's MongoDB documents.\n\n### Pre-Launch Sign-Off Gate\nBefore announcing any release: run all backend tests, frontend tests, `npm run build`, `/api/health`, `/sw.js` MIME check, and a 375px mobile overflow check.",
          "codeExample": "# Pre-Launch Verification Summary:\n# 1. Backend: npm test passes + /api/health returns 200 OK\n# 2. Frontend: npm run build passes + dist/sw.js generated\n# 3. Security: Zero secrets in VITE_*, strict CORS allowlist\n# 4. Mobile & Desktop: Zero console errors, zero 375px horizontal overflow",
          "codeExplanation": "1. Summarizes the 4-gate pre-launch verification workflow across backend tests, frontend tests, Vite/PWA production build, and responsive/security checks.\n\nHow to Run & Expected Output:\nExecute each command sequentially after your final edit; all test suites must exit 0 and `dist/sw.js` must exist before signing off.",
          "practiceExercise": "Guided Exercise:\n1. Draft a 1-page Incident Rollback Checklist for your team (Rollback -> Verify /api/health -> Reproduce on Preview branch -> Write regression test -> Re-deploy).\n\nIndependent Challenge:\nVerify why `vite build` must be re-run *after* your final frontend edit before testing `vite preview`.\n\nExpected Result:\nRepeatable, low-stress release and recovery workflow.",
          "keyTakeaways": [
            "Vercel deployments are immutable, enabling ~1-second Instant Rollbacks",
            "Backward-compatible DB schemas ensure rolled-back code still reads current data cleanly",
            "Always run a final pre-launch check across health, CORS, PWA, and mobile responsiveness"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the main caching benefit of separating React and Framer Motion into manualChunks in vite.config.js?",
          "options": [
            "It disables minification",
            "When you edit your own app code, the unchanged vendor chunk keeps its filename hash and stays cached in users’ browsers",
            "It removes the need for React.lazy",
            "It converts JS to HTML"
          ],
          "correctAnswer": 1,
          "explanation": "Stable vendor chunks retain their content hash across app deploys, maximizing browser cache hits."
        },
        {
          "question": "Why does Vercel’s Instant Rollback work in ~1 second without rebuilding?",
          "options": [
            "It deletes GitHub commits",
            "Every previous deployment is preserved as an immutable build snapshot that production routing can point back to immediately",
            "It runs vite dev in production",
            "It disables HTTPS"
          ],
          "correctAnswer": 1,
          "explanation": "Vercel keeps immutable snapshots of prior deployments, allowing instant domain re-pointing."
        },
        {
          "question": "What makes a backend rollback risky if you recently deployed a destructive database migration?",
          "options": [
            "Vercel blocks rollbacks on Fridays",
            "The older rolled-back code may crash if a required field was already deleted or renamed in MongoDB",
            "MongoDB deletes old backups",
            "CORS stops working"
          ],
          "correctAnswer": 1,
          "explanation": "Always keep schema changes backward-compatible so both the new and previous code versions work against live data."
        },
        {
          "question": "Which command should always be run after final frontend edits to verify Vite + Workbox PWA output?",
          "options": [
            "npm init",
            "npm run build (followed by npm run preview)",
            "git status",
            "node --version"
          ],
          "correctAnswer": 1,
          "explanation": "npm run build compiles production chunks and dist/sw.js, and npm run preview lets you verify them in a real browser."
        }
      ]
    },
    {
      "title": "Module 7: Custom Domains, DNS Records & HTTPS/SSL Automation",
      "duration": "1h 15m",
      "objectives": [
        "Configure Apex domains (A record) and subdomains (CNAME) for Vercel projects",
        "Set up canonical domain redirects (www -> apex or vice versa) for SEO",
        "Verify automatic Let’s Encrypt SSL certificates and HSTS headers"
      ],
      "notes": "### Module Introduction & Description\nShipping on `my-app.vercel.app` is great for staging — production apps use a custom domain (`cortexlms.com` + `api.cortexlms.com`) with automatic HTTPS/TLS certificates and clean canonical redirects.\n\n### Prerequisites\n- Completion of Modules 1–6.\n\n### Skills Acquired\n- Configuring DNS `A` / `CNAME` records, canonical redirects, and `CLIENT_URL` + CORS updates for custom domains.\n\n### How the Lessons Connect\n- **Lesson 1** configures Apex `A` records, `CNAME` subdomains, and canonical redirects.\n- **Lesson 2** covers automatic TLS/SSL provisioning and updating `CLIENT_URL` / `VITE_API_URL` after domain cutover.\n\n### Completion Criteria\n- Complete both lessons, deliver the Custom Domain Cutover & DNS Plan assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nA team is moving from my-lms.vercel.app and my-api.vercel.app to custom domains https://learn.example.com (frontend) and https://api.example.com (backend). Plan the DNS records, canonical redirect, and environment updates so zero users hit CORS errors or broken links.\n\nObjectives:\n- Specify exact DNS records (CNAME / A) and canonical redirects.\n- Coordinate CLIENT_URL and VITE_API_URL updates with zero downtime.\n\nRequirements:\n1. Document DNS record for learn.example.com (CNAME -> cname.vercel-dns.com) and api.example.com (CNAME -> cname.vercel-dns.com).\n2. Add apex example.com -> 307/308 redirect to https://learn.example.com (avoiding duplicate SEO indexing!).\n3. Update backend CLIENT_URL allowlist to accept BOTH https://learn.example.com and https://my-lms.vercel.app during transition!\n4. Update frontend VITE_API_URL to https://api.example.com and trigger a fresh frontend rebuild.\n\nStep-by-Step Instructions:\n1. Write a cutover_plan.md checklist ordering backend CORS update BEFORE frontend VITE_API_URL switchover.\n\nDeliverables:\n- cutover_plan.md.\n\nEvaluation Criteria:\n- Backend CORS updated first (supporting both old and new frontend domains) so zero users break during DNS propagation!",
      "lessons": [
        {
          "title": "Configuring Apex Domains, CNAMEs & Redirects",
          "duration": "40m",
          "introduction": "Pointing a domain to Vercel takes two DNS records — and choosing one canonical domain prevents search engines from splitting your SEO across www and non-www.",
          "objectives": [
            "Distinguish Apex A records from subdomain CNAME records",
            "Configure canonical 308 permanent redirects in Vercel Domain Settings"
          ],
          "notes": "### `A` Record vs. `CNAME` Record\n- **Apex / Root domain (`example.com`)**: DNS standards forbid `CNAME` at the root zone; point an **`A` record** to Vercel's Anycast IP (`76.76.21.21`).\n- **Subdomain (`www.example.com`, `api.example.com`)**: Point a **`CNAME` record** to `cname.vercel-dns.com.` so Vercel's Edge network can route traffic dynamically.\n- **Canonical Redirect**: Redirect `example.com` -> `www.example.com` (or vice versa) with a single canonical URL so cookies, Service Workers, and Google SEO never split across two origins!",
          "codeExample": "# Example DNS Records at your Registrar:\n# Type   Name   Value\n# A      @      76.76.21.21\n# CNAME  www    cname.vercel-dns.com.\n# CNAME  api    cname.vercel-dns.com.",
          "codeExplanation": "1. @ (apex) uses an A record; subdomains (www, api) use CNAME records pointing to Vercel's DNS edge.\n\nHow to Run & Expected Output:\nRun `nslookup api.example.com` or `dig api.example.com` after DNS propagation to verify it resolves to Vercel's edge.",
          "practiceExercise": "Guided Exercise:\n1. Check why `www.example.com` and `example.com` are treated as **different origins** by browser Same-Origin Policy & `localStorage` — explaining why canonical redirect matters!\n\nIndependent Challenge:\nDocument the DNS TTL lowering trick (setting TTL to 300s 24 hours before a domain migration) for fast cutover.\n\nExpected Result:\nClean DNS setup with zero split-origin localStorage or CORS issues.",
          "keyTakeaways": [
            "Use A records for apex domains and CNAME records for subdomains (www, api)",
            "Always configure a canonical redirect so localStorage, PWAs, and SEO stay on one origin"
          ]
        },
        {
          "title": "SSL Certificates, HSTS & Canonical URLs",
          "duration": "35m",
          "introduction": "Vercel provisions and renews Let’s Encrypt TLS certificates automatically once DNS resolves — and updating CORS in the right order prevents outage during cutover.",
          "objectives": [
            "Coordinate backend CLIENT_URL CORS allowlist updates before switching frontend VITE_API_URL",
            "Understand HSTS (Strict-Transport-Security) for enforcing HTTPS"
          ],
          "notes": "### Zero-Downtime Domain Cutover Order\n1. Update Backend `CLIENT_URL` to allow **both** the old `.vercel.app` origin and the new custom domain (comma-separated).\n2. Add custom domains in Vercel and wait for SSL status = **Valid**.\n3. Update Frontend `VITE_API_URL` and redeploy!",
          "codeExample": "// Supporting comma-separated origins in CLIENT_URL during domain cutover:\nconst origins = (process.env.CLIENT_URL || '')\n  .split(',')\n  .map((s) => s.trim().replace(/\\/+$/, ''))\n  .filter(Boolean);\nconsole.log('Allowed origins:', origins);",
          "codeExplanation": "1. Splitting CLIENT_URL on commas lets backend accept both old and new frontend domains seamlessly during DNS migration.\n\nHow to Run & Expected Output:\nRun in Node with `CLIENT_URL=\"https://old.vercel.app,https://learn.example.com\"`. Prints both clean normalized origins.",
          "practiceExercise": "Guided Exercise:\n1. Verify `curl -I https://your-domain` returns `strict-transport-security` header from Vercel Edge.\n\nIndependent Challenge:\nExplain why disabling Cloudflare orange-cloud proxy (using DNS-only grey cloud) is often recommended while Vercel issues initial Let's Encrypt validation.\n\nExpected Result:\nSmooth HTTPS cutover with zero CORS downtime.",
          "keyTakeaways": [
            "Update backend CORS allowlist to accept both old and new origins BEFORE switching frontend domains",
            "Vercel automates Let’s Encrypt SSL renewal once DNS points directly to Vercel"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should a production website redirect `example.com` to `www.example.com` (or vice versa) canonically?",
          "options": [
            "DNS requires two domains",
            "Browsers treat apex and www as separate origins (splitting localStorage, Service Workers, and SEO ranking)",
            "SSL only works on www",
            "Vercel charges per redirect"
          ],
          "correctAnswer": 1,
          "explanation": "A single canonical origin ensures Service Workers, localStorage auth, and search indexing stay unified."
        },
        {
          "question": "Which DNS record type is normally used for a subdomain like `api.example.com` pointing to Vercel?",
          "options": [
            "MX",
            "TXT",
            "CNAME -> cname.vercel-dns.com",
            "SRV"
          ],
          "correctAnswer": 2,
          "explanation": "Subdomains use CNAME records pointing to Vercel’s managed DNS alias."
        },
        {
          "question": "During a custom domain cutover, in what order should you update Backend `CLIENT_URL` vs Frontend `VITE_API_URL`?",
          "options": [
            "Update Frontend first",
            "Update Backend CLIENT_URL first to allow both old and new origins, then redeploy Frontend",
            "Delete CORS completely",
            "Order does not matter"
          ],
          "correctAnswer": 1,
          "explanation": "Allowing both origins on the backend first ensures neither cached old frontends nor new custom-domain frontends hit CORS errors."
        },
        {
          "question": "What does the `Strict-Transport-Security` (HSTS) header instruct browsers to do?",
          "options": [
            "Cache images forever",
            "Automatically upgrade and enforce HTTPS connections for the domain, blocking insecure HTTP downgrades",
            "Disable Service Workers",
            "Enable CORS *"
          ],
          "correctAnswer": 1,
          "explanation": "HSTS protects users from man-in-the-middle SSL-stripping attacks by forcing HTTPS."
        }
      ]
    },
    {
      "title": "Module 8: Edge Middleware, Geo-Routing & Security Headers",
      "duration": "1h 30m",
      "objectives": [
        "Understand Vercel Edge Middleware vs Node.js Serverless Functions",
        "Configure Content-Security-Policy, X-Content-Type-Options, and Cache-Control headers in vercel.json"
      ],
      "notes": "### Module Introduction & Description\nStatic assets and SPA pages benefit massively from **HTTP security & caching headers** configured at Vercel's Edge in `vercel.json` — while **Edge Middleware** runs lightweight request checks (redirects, feature flags, geo-headers) in <5ms before hitting origin!\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Configuring `vercel.json` `headers` (security + immutable asset caching vs `no-cache` for `sw.js`) and understanding Edge Middleware constraints.\n\n### How the Lessons Connect\n- **Lesson 1** contrasts Edge Middleware with Node.js Serverless Functions.\n- **Lesson 2** configures production HTTP security and caching headers in `vercel.json`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Vercel Security & Cache Headers assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nA deployed Vite SPA needs hardened HTTP security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy) plus optimal caching: 1-year immutable caching for hashed /assets/* files and zero caching for /sw.js and /index.html!\n\nObjectives:\n- Configure vercel.json headers accurately for hashed assets vs entry/PWA files.\n\nRequirements:\n1. Add global security headers for /(.*): X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin.\n2. Add /assets/(.*) header: Cache-Control: public, max-age=31536000, immutable.\n3. Add /sw.js header: Cache-Control: no-cache, no-store, must-revalidate.\n\nStep-by-Step Instructions:\n1. Update frontend/vercel.json with the headers array alongside existing rewrites.\n2. Validate JSON with Node JSON.parse.\n\nDeliverables:\n- frontend/vercel.json headers configuration.\n\nEvaluation Criteria:\n- Hashed /assets/* cached long-term; /sw.js never cached stale.\n- Security headers applied across all routes.",
      "lessons": [
        {
          "title": "Running Low-Latency Logic in Vercel Edge Middleware",
          "duration": "45m",
          "introduction": "Edge Middleware executes on V8 isolates at CDN nodes closest to the user — ideal for A/B flags or geo-redirects, NOT for heavy Mongoose DB calls.",
          "objectives": [
            "Contrast Edge Runtime (V8 isolates, no Node fs/net) with Node.js Serverless Functions",
            "Know which tasks belong at the Edge vs Express Serverless API"
          ],
          "notes": "### Edge Runtime vs. Node.js Serverless\n- **Edge Middleware**: Ultra-low cold start (~0ms), runs near the user, supports Web Fetch/Crypto APIs, **does NOT support Node `fs`, `net`, or Mongoose TCP sockets**! Great for redirects, maintenance-mode flags, and geo headers.\n- **Node.js Serverless**: Full Node runtime, runs near your MongoDB Atlas region, ideal for Express APIs and Mongoose.",
          "codeExample": "// Conceptual Edge Middleware (middleware.js at project root)\nexport const config = { matcher: ['/old-courses/:path*'] };\n\nexport default function middleware(request) {\n  const url = new URL(request.url);\n  if (url.pathname.startsWith('/old-courses')) {\n    return Response.redirect(new URL('/courses', request.url), 308);\n  }\n}",
          "codeExplanation": "1. matcher scopes Edge execution only to legacy /old-courses/* paths so normal pages don't invoke middleware needlessly.\n2. Returns a fast 308 permanent redirect right at the CDN edge.",
          "practiceExercise": "Guided Exercise:\n1. List 2 tasks suited for Edge Middleware (redirects, geo-locale detection) and 2 tasks suited for Node Serverless (Mongoose queries, bcrypt/SMTP).\n\nIndependent Challenge:\nExplain why placing Edge Middleware globally without a `matcher` wastes Edge invocations on every image and CSS request!\n\nExpected Result:\nRight-sized compute placement between Edge and Node Serverless.",
          "keyTakeaways": [
            "Edge Middleware runs in V8 isolates without Node TCP/fs APIs — never put Mongoose inside Edge",
            "Always scope Edge Middleware with matcher so static assets aren’t intercepted needlessly"
          ]
        },
        {
          "title": "Configuring Security & Cache Headers in vercel.json",
          "duration": "45m",
          "introduction": "Hashed files like `index-BbMh1s.js` never change — so browsers can cache them for 1 full year! Meanwhile, `/sw.js` and `/index.html` must always revalidate.",
          "objectives": [
            "Set immutable long-term caching on /assets/* and no-cache on /sw.js",
            "Add protective security headers (nosniff, X-Frame-Options, Referrer-Policy)"
          ],
          "notes": "### Caching Golden Rule for Vite PWAs\n- **`/assets/*`** (content-hashed filenames): `public, max-age=31536000, immutable` (1 year!).\n- **`/sw.js`**: `no-cache, no-store, must-revalidate` so browsers always detect new PWA releases immediately.",
          "codeExample": "{\n  \"headers\": [\n    {\n      \"source\": \"/(.*)\",\n      \"headers\": [\n        { \"key\": \"X-Content-Type-Options\", \"value\": \"nosniff\" },\n        { \"key\": \"X-Frame-Options\", \"value\": \"DENY\" },\n        { \"key\": \"Referrer-Policy\", \"value\": \"strict-origin-when-cross-origin\" }\n      ]\n    },\n    {\n      \"source\": \"/assets/(.*)\",\n      \"headers\": [{ \"key\": \"Cache-Control\", \"value\": \"public, max-age=31536000, immutable\" }]\n    },\n    {\n      \"source\": \"/sw.js\",\n      \"headers\": [{ \"key\": \"Cache-Control\", \"value\": \"no-cache, no-store, must-revalidate\" }]\n    }\n  ]\n}",
          "codeExplanation": "1. Applies clickjacking (X-Frame-Options: DENY) and MIME-sniffing protection globally.\n2. Caches content-hashed Vite assets for 1 year while forcing fresh checks on /sw.js.",
          "practiceExercise": "Guided Exercise:\n1. Check response headers in Chrome DevTools Network tab on `/assets/index-*.js` vs `/sw.js` after deploying.\n\nIndependent Challenge:\nResearch `Content-Security-Policy` (CSP) and list what `default-src 'self'` protects against (XSS!).\n\nExpected Result:\nFast repeat loads and hardened browser security headers.",
          "keyTakeaways": [
            "Cache content-hashed /assets/* with max-age=31536000, immutable",
            "Serve /sw.js with no-cache so PWA updates reach users promptly",
            "Add X-Content-Type-Options: nosniff and X-Frame-Options: DENY globally"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must Mongoose / MongoDB TCP connections NOT be placed inside Vercel Edge Middleware?",
          "options": [
            "Edge Middleware only runs on Safari",
            "Edge Middleware runs in lightweight V8 isolates without full Node.js TCP/net socket APIs",
            "MongoDB forbids HTTPS",
            "Edge Middleware has a 10-minute timeout"
          ],
          "correctAnswer": 1,
          "explanation": "Edge Runtime supports Web Standard Fetch/Crypto APIs rather than raw Node.js TCP sockets required by the MongoDB driver."
        },
        {
          "question": "Why is `Cache-Control: public, max-age=31536000, immutable` safe ONLY for `/assets/*` and dangerous for `/sw.js`?",
          "options": [
            "/sw.js is larger than 1 MB",
            "/assets/* filenames include content hashes that change on edits, whereas /sw.js keeps the same filename and would get stuck cached for a year!",
            "Browsers ignore max-age on JS",
            "Immutable disables HTTPS"
          ],
          "correctAnswer": 1,
          "explanation": "Un-hashed entry files like /sw.js must never receive 1-year immutable caching or users will be stuck on old service workers."
        },
        {
          "question": "What does `X-Frame-Options: DENY` protect your web app against?",
          "options": [
            "DDoS attacks",
            "Clickjacking (embedding your site inside a malicious hidden iframe)",
            "SQL injection",
            "Slow CSS"
          ],
          "correctAnswer": 1,
          "explanation": "X-Frame-Options: DENY prevents other sites from framing your app in an iframe."
        },
        {
          "question": "Why add a `matcher` config to Edge Middleware?",
          "options": [
            "To enable dark mode",
            "To avoid running middleware unnecessarily on every static image, font, and CSS request",
            "To compile TypeScript",
            "To disable CORS"
          ],
          "correctAnswer": 1,
          "explanation": "Scoping with matcher saves Edge invocations and keeps static asset delivery fast."
        }
      ]
    },
    {
      "title": "Module 9: Cron Jobs, CDN Caching & Stale-While-Revalidate",
      "duration": "1h 15m",
      "objectives": [
        "Schedule recurring maintenance tasks using Vercel Cron Jobs in vercel.json",
        "Secure cron endpoints with CRON_SECRET Bearer verification",
        "Accelerate public GET APIs safely with CDN stale-while-revalidate headers"
      ],
      "notes": "### Module Introduction & Description\nNeed to clean up expired verification records nightly or send a weekly digest? **Vercel Cron Jobs** invoke an API route on a standard 5-field cron schedule — and **`stale-while-revalidate`** CDN headers let Vercel cache public API responses at the Edge!\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Securing Cron endpoints with `CRON_SECRET`, scheduling crons in `vercel.json`, and configuring `s-maxage` + `stale-while-revalidate`.\n\n### How the Lessons Connect\n- **Lesson 1** configures and secures Vercel Cron Jobs.\n- **Lesson 2** applies CDN `s-maxage` and `stale-while-revalidate` strictly on public (non-user-specific!) endpoints.\n\n### Completion Criteria\n- Complete both lessons, deliver the Secured Cron Job & Public CDN Cache assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nAdd a daily cleanup Cron endpoint (/api/cron/cleanup) that removes stale records, secured so random internet callers cannot trigger it, AND add safe Edge caching on GET /api/stats without ever caching private /api/auth/me responses!\n\nObjectives:\n- Verify Authorization: Bearer <CRON_SECRET> cleanly on cron routes.\n- Apply s-maxage + stale-while-revalidate strictly to public, non-authenticated endpoints.\n\nRequirements:\n1. Configure crons in backend/vercel.json: { \"path\": \"/api/cron/cleanup\", \"schedule\": \"0 3 * * *\" }.\n2. Guard GET /api/cron/cleanup by checking Authorization === `Bearer ${process.env.CRON_SECRET}` (returning 401 otherwise!).\n3. Add Cache-Control: public, s-maxage=60, stale-while-revalidate=300 on GET /api/stats.\n4. Explicitly set Cache-Control: no-store on /api/auth/* and /api/enrollments/*.\n\nStep-by-Step Instructions:\n1. Write cronHandler.js and cacheHeadersMiddleware.js.\n2. Test calling the cron handler with missing/wrong secret -> 401; with valid CRON_SECRET -> 200.\n\nDeliverables:\n- cronHandler.js and backend/vercel.json crons block.\n\nEvaluation Criteria:\n- Cron route rejects unauthorized public requests with 401.\n- Private user endpoints strictly marked no-store.",
      "lessons": [
        {
          "title": "Scheduled Serverless Cron Jobs in vercel.json",
          "duration": "40m",
          "introduction": "Because Vercel Cron invokes your endpoint over HTTP, anyone who guesses `/api/cron/cleanup` could spam it unless you verify `CRON_SECRET`.",
          "objectives": [
            "Define 5-field cron schedules in vercel.json",
            "Authenticate incoming cron calls with process.env.CRON_SECRET"
          ],
          "notes": "### Securing Cron Endpoints\nVercel automatically sends `Authorization: Bearer <CRON_SECRET>` when invoking cron paths if `CRON_SECRET` is set in your Project Environment Variables. Always verify it using constant-time comparison!",
          "codeExample": "// backend/vercel.json crons section:\n// { \"crons\": [{ \"path\": \"/api/cron/cleanup\", \"schedule\": \"0 3 * * *\" }] }\n\nexport function verifyCronAuth(req, res, next) {\n  const secret = process.env.CRON_SECRET;\n  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {\n    return res.status(401).json({ message: 'Unauthorized cron invocation' });\n  }\n  next();\n}",
          "codeExplanation": "1. Schedule \"0 3 * * *\" runs daily at 03:00 UTC.\n2. verifyCronAuth blocks any unauthenticated caller with 401 Unauthorized.\n\nHow to Run & Expected Output:\nTest with `curl http://localhost:5000/api/cron/cleanup` (returns 401), then with `-H \"Authorization: Bearer $CRON_SECRET\"` (proceeds cleanly).",
          "practiceExercise": "Guided Exercise:\n1. Translate cron expression `*/15 * * * *` (\"every 15 minutes\") vs `0 0 * * 0` (\"midnight every Sunday\").\n\nIndependent Challenge:\nUpgrade `req.headers.authorization !== ...` to use `crypto.timingSafeEqual`.\n\nExpected Result:\nAuthenticated, repeatable background scheduling.",
          "keyTakeaways": [
            "Schedule recurring serverless tasks in vercel.json using standard 5-field cron syntax",
            "Always authenticate cron endpoints with CRON_SECRET so public visitors cannot trigger them"
          ]
        },
        {
          "title": "Stale-While-Revalidate CDN Caching & Cache Control",
          "duration": "35m",
          "introduction": "Public endpoints like /api/stats don’t change every millisecond. Edge CDN caching serves cached JSON in ~15ms while refreshing asynchronously in the background.",
          "objectives": [
            "Use s-maxage + stale-while-revalidate on public non-personalized GET routes",
            "Enforce Cache-Control: no-store on all authenticated/private API routes"
          ],
          "notes": "### `s-maxage` vs. `no-store`\n- **Public shared data** (`/api/stats`): `public, s-maxage=60, stale-while-revalidate=300` caches at Vercel's CDN for 60s and serves stale-while-refreshing for up to 5 minutes!\n- **Private user data** (`/api/auth/me`, `/api/enrollments/my`): **MUST use `no-store`** so a CDN or shared proxy NEVER caches User A's response and serves it to User B!",
          "codeExample": "// Public stats route:\nres.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');\n\n// Private authenticated routes:\nres.setHeader('Cache-Control', 'no-store');",
          "codeExplanation": "1. s-maxage=60 instructs shared CDN caches (not individual browsers) to cache for 60s.\n2. no-store forbids any browser or CDN caching of sensitive user responses.",
          "practiceExercise": "Guided Exercise:\n1. Inspect why `Vary: Authorization` or `no-store` is mandatory on any endpoint reading `req.headers.authorization`.\n\nIndependent Challenge:\nAdd a reusable `noStore` middleware for all `/api/auth/*` and `/api/enrollments/*` routes.\n\nExpected Result:\nBlazing-fast public Edge caching with zero risk of cross-user data leaks.",
          "keyTakeaways": [
            "Use public, s-maxage=..., stale-while-revalidate=... strictly on non-personalized public endpoints",
            "Always set Cache-Control: no-store on authenticated or user-specific API responses"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must a Vercel Cron API endpoint check `Authorization: Bearer <CRON_SECRET>`?",
          "options": [
            "Vercel blocks routes without it",
            "Because cron paths are normal public HTTP URLs that anyone on the internet could otherwise trigger repeatedly",
            "To enable CORS",
            "To compress logs"
          ],
          "correctAnswer": 1,
          "explanation": "Cron endpoints are reachable over HTTPS; verifying CRON_SECRET ensures only Vercel’s scheduler (or authorized ops) can run them."
        },
        {
          "question": "What happens if you accidentally put `Cache-Control: public, s-maxage=60` on `/api/auth/me`?",
          "options": [
            "Nothing — auth headers bypass CDNs automatically",
            "A CDN could cache User A’s private profile response and serve it to User B!",
            "JWTs stop working",
            "MongoDB disconnects"
          ],
          "correctAnswer": 1,
          "explanation": "Never apply public/s-maxage caching to authenticated routes; always use no-store on private user data."
        },
        {
          "question": "What does `stale-while-revalidate=300` achieve on a public CDN-cached API?",
          "options": [
            "Deletes the database after 300 seconds",
            "Serves the slightly stale cached response instantly while refreshing the cache asynchronously in the background",
            "Blocks requests for 300 seconds",
            "Disables HTTPS"
          ],
          "correctAnswer": 1,
          "explanation": "Users get instant CDN latency even as the cache refreshes cleanly in the background."
        },
        {
          "question": "What does the cron expression `0 3 * * *` mean?",
          "options": [
            "Every 3 minutes",
            "Once daily at 03:00 UTC",
            "Every 3rd of the month",
            "Every Sunday at 3 PM"
          ],
          "correctAnswer": 1,
          "explanation": "In 5-field cron (minute hour day-of-month month day-of-week), 0 3 * * * runs at 03:00 UTC every day."
        }
      ]
    },
    {
      "title": "Module 10: Observability, Speed Insights & Production Launch Playbook",
      "duration": "1h 15m",
      "objectives": [
        "Monitor Core Web Vitals (LCP, INP, CLS) and Serverless Function logs effectively",
        "Execute a complete end-to-end Production Launch & Smoke Verification Playbook"
      ],
      "notes": "### Module Introduction & Description\nIn this final Vercel module, you connect **real-user observability** (Function logs, Core Web Vitals) with a repeatable **Production Launch & Smoke Verification Playbook** covering every aspect of decoupled React + Express + MongoDB Atlas deployments.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Interpreting Vercel Function logs & Core Web Vitals and executing full-stack production smoke tests.\n\n### How the Lessons Connect\n- **Lesson 1** covers monitoring Core Web Vitals and diagnosing Serverless Function logs.\n- **Lesson 2** walks through the complete Production Launch & Smoke Audit Capstone.\n\n### Completion Criteria\n- Complete both lessons, deliver the Full-Stack Production Launch Sign-Off assignment, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Full-Stack Production Launch & Smoke Audit:\nProblem Statement:\nExecute a complete pre-launch and post-launch verification audit for a decoupled Vite PWA Frontend + Express Serverless Backend + MongoDB Atlas deployment.\n\nObjectives:\n- Verify all automated checks, build outputs, headers, CORS, /api/health, and PWA /sw.js cleanly.\n\nRequirements:\n1. Write a comprehensive launch_smoke.mjs script checking:\n   - Backend GET /api/health -> 200 { status: 'ok', database: 'connected' }\n   - Backend GET /api/courses -> 200 non-empty array\n   - Backend GET /api/auth/me -> 401 without token\n   - Frontend GET / -> 200 HTML\n   - Frontend GET /courses/test-deep-link -> 200 HTML (SPA rewrite works!)\n   - Frontend GET /sw.js -> 200 with JavaScript content-type and Cache-Control containing no-cache\n2. Document the 3-step Rollback Runbook if any smoke check fails post-deploy.\n\nStep-by-Step Instructions:\n1. Implement launch_smoke.mjs using Node fetch() and node:assert/strict.\n2. Test locally against your preview + backend servers.\n\nDeliverables:\n- launch_smoke.mjs and LAUNCH_RUNBOOK.md.\n\nEvaluation Criteria:\n- Exits with non-zero code on any failure.\n- Explicitly verifies SPA deep-link rewrite AND /sw.js JavaScript MIME type.",
      "lessons": [
        {
          "title": "Monitoring Core Web Vitals & Function Logs on Vercel",
          "duration": "35m",
          "introduction": "Synthetic Lighthouse scores on a fast office laptop don’t reflect real users on budget Android phones over 4G. Real-user Core Web Vitals show actual experience.",
          "objectives": [
            "Interpret LCP (<2.5s), INP (<200ms), and CLS (<0.1) thresholds",
            "Filter Vercel Serverless Function logs by HTTP status (>=500) and requestId"
          ],
          "notes": "### Core Web Vitals Targets (\"Good\" Thresholds)\n- **LCP (Largest Contentful Paint) <= 2.5s**: Speed up by keeping hero images eager + preconnected APIs.\n- **INP (Interaction to Next Paint) <= 200ms**: Keep click/typing handlers fast (use `useTransition`, avoid main-thread blocking).\n- **CLS (Cumulative Layout Shift) <= 0.1**: Reserve image `width`/`height` and match skeleton card heights.",
          "codeExample": "// Quick browser Core Web Vitals check via PerformanceObserver:\n// new PerformanceObserver((list) => {\n//   for (const entry of list.getEntries()) console.log(entry.name, entry.startTime);\n// }).observe({ type: 'largest-contentful-paint', buffered: true });\nexport const CWV_TARGETS = { LCP_MS: 2500, INP_MS: 200, CLS: 0.1 };",
          "codeExplanation": "1. Defines Google's exact \"Good\" Core Web Vitals thresholds monitored in Vercel Speed Insights.",
          "practiceExercise": "Guided Exercise:\n1. Run Lighthouse in Chrome DevTools -> Lighthouse tab (Mobile preset) and record LCP, TBT/INP, and CLS.\n\nIndependent Challenge:\nIdentify one actionable optimization if CLS > 0.1 (e.g., adding explicit width/height or skeleton heights).\n\nExpected Result:\nClear observability metrics tied to concrete fixes.",
          "keyTakeaways": [
            "Target LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1 across real mobile users",
            "Use structured JSON logs with requestId to debug 5xx Serverless Function errors rapidly"
          ]
        },
        {
          "title": "Final Capstone: End-to-End Production Launch & Smoke Audit",
          "duration": "40m",
          "introduction": "Combining every Vercel deployment skill — dual projects, SPA/PWA rewrites, secrets, CORS, Atlas pooling, headers, and smoke tests — into one repeatable launch gate.",
          "objectives": [
            "Run automated post-deploy smoke verification across API and PWA endpoints",
            "Keep rollback readiness verified before every release"
          ],
          "notes": "### Complete Vercel Deployment Mastery Checklist\n1. Dual projects (`frontend/` CDN + `backend/` Serverless) with matching `vercel.json` rewrites.\n2. Zero secrets in `VITE_*`; normalized `CLIENT_URL` CORS allowlist; cached Atlas connections.\n3. `/sw.js` excluded from SPA rewrites and served `no-cache`; private APIs `no-store`.\n4. Automated tests + build + smoke verification passing after final edits.",
          "codeExample": "// Minimal smoke test check for /sw.js MIME type\nasync function verifyServiceWorker(appUrl) {\n  const res = await fetch(`${appUrl}/sw.js`);\n  const ct = res.headers.get('content-type') || '';\n  if (!res.ok || !ct.includes('javascript')) {\n    throw new Error(`Invalid /sw.js response: ${res.status} (${ct})`);\n  }\n  return true;\n}",
          "codeExplanation": "1. Catches the most common Vercel SPA rewrite bug where /sw.js accidentally returns text/html instead of JavaScript.\n\nHow to Run & Expected Output:\nRun against `http://localhost:4173` while `vite preview` is running -> returns `true`.",
          "practiceExercise": "Guided Exercise:\n1. Run `verifyServiceWorker('http://localhost:4173')` locally against `npm run preview`.\n\nIndependent Challenge:\nAdd checks for `/api/health` and `/courses/sample-id` (expect 200 HTML) to complete your launch smoke script.\n\nExpected Result:\nConfident, repeatable, zero-surprise production deployments.",
          "keyTakeaways": [
            "Always verify /sw.js returns JavaScript (never text/html) after deploying a Vite PWA",
            "Combine automated unit tests, production builds, and live smoke checks on every release"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which Core Web Vital measures unexpected visual page jumping as images or fonts load?",
          "options": [
            "LCP",
            "INP",
            "CLS (Cumulative Layout Shift)",
            "TTFB"
          ],
          "correctAnswer": 2,
          "explanation": "CLS measures unexpected layout shifts (target <= 0.1), fixed by explicit image dimensions and matching skeletons."
        },
        {
          "question": "What is the Google \"Good\" threshold for Largest Contentful Paint (LCP)?",
          "options": [
            "<= 10 seconds",
            "<= 2.5 seconds",
            "<= 50 milliseconds",
            ">= 5 seconds"
          ],
          "correctAnswer": 1,
          "explanation": "LCP should occur within 2.5 seconds of page load start for a good user experience."
        },
        {
          "question": "What does a smoke test checking `content-type.includes(\"javascript\")` on `/sw.js` catch?",
          "options": [
            "Slow MongoDB queries",
            "Misconfigured SPA rewrite rules accidentally serving index.html (text/html) instead of the Service Worker script",
            "Missing bcrypt salts",
            "Invalid CSS variables"
          ],
          "correctAnswer": 1,
          "explanation": "If /sw.js returns text/html, browsers reject Service Worker registration silently or with a MIME error."
        },
        {
          "question": "If a newly deployed Vercel release fails a post-deploy smoke test, what is the fastest recovery action?",
          "options": [
            "Delete the GitHub repository",
            "Trigger Vercel Instant Rollback to the previous healthy immutable deployment, then fix forward on a branch",
            "Disable HTTPS",
            "Drop MongoDB indexes"
          ],
          "correctAnswer": 1,
          "explanation": "Instant Rollback restores the prior healthy snapshot in ~1 second while you investigate safely."
        }
      ]
    }
  ]
};
