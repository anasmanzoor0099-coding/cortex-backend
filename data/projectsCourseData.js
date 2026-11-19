export const projectsCourseData = {
  "title": "Practical Full-Stack Development Projects",
  "description": "Bridge the gap between isolated tutorials and shipping real full-stack software. Learn system architecture, API contract design, end-to-end authenticated workflows, edge-case hardening, automated testing, and production launch verification.",
  "thumbnail": "projects",
  "totalDuration": "16h 00m",
  "category": "Full-Stack Projects",
  "difficulty": "Advanced",
  "tags": [
    "Full-Stack",
    "MERN",
    "System Design",
    "Testing",
    "Security",
    "Production"
  ],
  "learningOutcomes": [
    "Translate product requirements into MongoDB schemas, REST API contracts, and React routes",
    "Build synchronized end-to-end authenticated CRUD workflows with proper loading/error states",
    "Eliminate real-world full-stack bugs: orphaned records, NaN progress, race conditions, and stale UI state",
    "Write automated backend unit and integration tests using node:test",
    "Conduct thorough security, accessibility, and mobile responsiveness audits",
    "Execute a production launch checklist across Vercel and MongoDB Atlas"
  ],
  "prerequisites": [
    "HTML & CSS",
    "Modern JavaScript",
    "React.js",
    "Node.js & Express",
    "MongoDB"
  ],
  "targetAudience": "Learners who know the individual stack pieces and want to architect, build, test, and ship complete commercial-grade full-stack applications.",
  "practicalProject": "Architect, build, test, and deploy a complete Full-Stack Capstone Application (Team Issue & Learning Tracker) with RBAC, search/filters, automated tests, and production hardening.",
  "modules": [
    {
      "title": "Module 1: System Design & API Contract Engineering",
      "duration": "2h 30m",
      "objectives": [
        "Decompose product requirements into entities, relationships, and indexes",
        "Define clear REST API request/response contracts before writing UI or backend code",
        "Design all four UI states (Loading, Empty, Error, Success) for every async screen"
      ],
      "notes": "### Module Introduction\nJumping straight into `npx create-vite` without designing your **Data Models**, **API Contracts**, and **UI States** guarantees painful rewrites halfway through a project. Senior engineers spend 30 minutes upfront locking down contracts so frontend and backend fit together on the first try.\n\n### Prerequisites\n- Completion of React, Node/Express, and MongoDB fundamentals.\n\n### How the Lessons Connect\n- **Lesson 1** turns product requirements into MongoDB entities, unique indexes, and REST API contracts.\n- **Lesson 2** designs all **4 UI states** (Loading, Empty, Error, Populated) for every screen before writing JSX.\n\n### Module Summary\nYou will produce clear architecture specs and resilient UI state machines before writing feature code.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 1: System Architecture & API Contract Spec.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Capstone Milestone 1 — Team Issue & Learning Tracker (Architecture & Contract):\nProblem Statement:\nDesign the complete system architecture for a portfolio-grade full-stack \"Team Issue & Learning Tracker\" (supporting Workspaces, Issues/Tasks, Assignees, and Activity Comments).\n\nObjectives:\n- Define entities, relationships (embed vs reference), and database indexes.\n- Specify REST API contracts and all 4 UI states per page.\n\nFeatures & Architecture:\n- Entities: User (name, email, passwordHash, role), Project (title, ownerId, members), Issue (projectId, title, status: open|in_progress|done, priority, assigneeId).\n- Architecture: React SPA + Express REST API + MongoDB Atlas.\n\nMilestones & Step-by-Step Tasks:\n1. Write a data-model spec deciding Embed vs Reference for Issues and Comments (justify via 16 MB limit!).\n2. Document 6 REST endpoints (POST /api/auth/login, GET/POST /api/projects, GET/POST/PATCH/DELETE /api/projects/:id/issues) with exact request bodies, response JSON shapes, and HTTP status codes (200, 201, 400, 401, 403, 404).\n3. Sketch the 4 UI states (Loading skeleton, Empty state with CTA, Error banner with Retry button, Populated board) for the Issue Board view.\n\nTesting Requirements:\n- Peer/self-review check: every endpoint includes auth requirement and failure status codes.\n\nDeliverables & Final Outcome:\n- ARCHITECTURE.md containing ERD/schema notes, API contract table, and 4-state UI matrix.",
      "lessons": [
        {
          "title": "From Product Requirements to Database & API Contracts",
          "duration": "1h 15m",
          "introduction": "Agreeing on exact JSON field names, status codes, and MongoDB indexes upfront prevents \"frontend expects userName, backend sends fullName\" mismatches.",
          "objectives": [
            "Extract entities and ownership boundaries from user stories",
            "Specify exact REST request/response JSON shapes and error codes"
          ],
          "notes": "### Why Contract-First Architecture Prevents Rewrites\nWhen frontend and backend are built ad-hoc without written contracts, bugs multiply: the UI expects `createdAt` while the API sends `created_at`; the UI assumes `200` returns an array while the API wraps it in `{ items: [] }`.\nSpending 30 minutes upfront to lock down **Entities, Ownership, Indexes, and API Contracts** aligns every layer:\n1. **Entities & Relationships**: Decide Embed (bounded subdocs) vs Reference (unbounded collections like Issues or Enrollments).\n2. **Ownership & Auth**: Mark every route as Public, Authenticated, or Owner/Member-only.\n3. **Request/Response & Error Shapes**: Standardize `{ message }` on all 4xx/5xx responses.\n\n### Common Mistakes & Solutions\n- **Mistake**: Changing JSON response keys midway without updating all frontend callers.\n  - **Solution**: Document contracts in `ARCHITECTURE.md` or shared TypeScript types before coding.",
          "codeExample": "// Shared API Contract Spec (example JSDoc / TypeScript contract)\n/**\n * POST /api/projects/:projectId/issues\n * Auth: Bearer JWT (must be project member)\n * Request:  { title: string, priority: 'low' | 'medium' | 'high' }\n * 201 JSON: { _id: string, projectId: string, title: string, status: 'open', priority: string }\n * 400 JSON: { message: 'Title must be 3-120 characters' }\n * 403 JSON: { message: 'Not a member of this project' }\n */\nexport const ISSUE_PRIORITIES = ['low', 'medium', 'high'];",
          "codeExplanation": "1. The JSDoc contract specifies HTTP method, URL, Auth requirement, Request body, 201 Success JSON, and exact 400/403 error shapes.\n2. Exporting ISSUE_PRIORITIES ensures enum values match schema validation.\n\nHow to Run & Expected Output:\nImport `ISSUE_PRIORITIES` in both route validators and UI dropdowns so invalid enum values like `'urgent'` are rejected consistently.",
          "practiceExercise": "Guided Exercise:\n1. Write a complete contract block for `PATCH /api/issues/:id` specifying 200, 400 (invalid status), 403 (non-member), and 404 (not found).\n\nIndependent Challenge:\nDesign the compound MongoDB index for `Issue` if the board filters by `{ projectId, status }` and sorts by `createdAt: -1` using the ESR rule.\n\nExpected Result:\nUnambiguous API contracts ready for parallel frontend and backend development.",
          "keyTakeaways": [
            "Define database schemas, indexes, and REST contracts before coding features",
            "Standardize error responses ({ message }) across all endpoints",
            "Document auth and ownership requirements on every route"
          ]
        },
        {
          "title": "Designing the Four UI States on Every Screen",
          "duration": "1h 15m",
          "introduction": "Most beginner projects only design the happy \"Success with 5 items\" state — leaving users staring at blank screens during loading, empty results, or API outages.",
          "objectives": [
            "Handle Loading, Error, Empty, and Populated states explicitly on every async view",
            "Provide actionable Retry buttons on recoverable network errors"
          ],
          "notes": "### Every Async Screen Has Four States\nDevelopers naturally design the **Populated** state (\"list of 5 issues\") and forget the other three states until users hit blank white screens or confusing flashes:\n1. **Loading**: Render geometry-matched skeletons (or spinner) with `aria-busy=\"true\"`.\n2. **Error**: Render `role=\"alert\"` with a clear message and a **Retry** button (never trap offline users!).\n3. **Empty**: Render a friendly explanation and a primary CTA (\"Create your first issue\" or \"Reset filters\").\n4. **Populated**: Render the list/board.\n\n### Common Mistakes & Solutions\n- **Mistake**: Checking `if (issues.length === 0)` *before* `if (loading)`, causing \"No issues found\" to flash briefly on every page load!\n  - **Solution**: Strictly order guards: `loading` -> `error` -> `empty` -> `data`.",
          "codeExample": "export function IssueBoardState({ loading, error, issues, onRetry }) {\n  if (loading) return <div aria-busy=\"true\">Loading board skeletons...</div>;\n  if (error) {\n    return (\n      <div role=\"alert\">\n        <p>{error}</p>\n        <button type=\"button\" onClick={onRetry}>Retry</button>\n      </div>\n    );\n  }\n  if (issues.length === 0) return <p>No issues match your filter yet.</p>;\n  return <ul>{issues.map((i) => <li key={i._id}>{i.title}</li>)}</ul>;\n}",
          "codeExplanation": "1. IssueBoardState checks loading first, then error (with Retry button), then empty, then populated list.\n2. role=\"alert\" announces errors to assistive screen readers immediately.\n\nHow to Run & Expected Output:\nRender <IssueBoardState /> in React passing `loading={true}`, then `error=\"Offline\"`, then `issues={[]}`, then populated items. Each state renders cleanly with zero flicker.",
          "practiceExercise": "Guided Exercise:\n1. Swap the `loading` and `issues.length === 0` checks temporarily to observe the false \"No issues\" flash, then restore the proper guard order.\n\nIndependent Challenge:\nEnhance the Error state to show a distinct offline hint when `!navigator.onLine`.\n\nExpected Result:\nZero blank screens or false empty flashes across all network conditions.",
          "keyTakeaways": [
            "Always design Loading, Error (with Retry), Empty (with CTA), and Populated states",
            "Check loading before empty so users never see a false \"No items found\" flash"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should Loading state be checked before Empty state (issues.length === 0)?",
          "options": [
            "React requires it",
            "Because issues starts as [] before fetch resolves; checking empty first flashes \"No items found\" while loading",
            "Empty arrays crash .map()",
            "Error state only works after Empty"
          ],
          "correctAnswer": 1,
          "explanation": "Checking loading first prevents a jarring false \"No items\" flash before the initial API response arrives."
        },
        {
          "question": "What must every recoverable Error state UI include for users (especially on flaky mobile networks)?",
          "options": [
            "Raw server stack traces",
            "A clear human-readable message and a Retry button",
            "Automatic localStorage deletion",
            "A redirect to login"
          ],
          "correctAnswer": 1,
          "explanation": "A clear error message with a Retry action lets users recover immediately without refreshing the whole tab."
        },
        {
          "question": "Why define API request/response contracts before building frontend and backend code?",
          "options": [
            "It replaces database indexes",
            "It prevents mismatched field names, missing validation errors, and rework between UI and server",
            "It disables CORS",
            "It generates CSS automatically"
          ],
          "correctAnswer": 1,
          "explanation": "Locking JSON shapes, status codes, and auth rules upfront keeps frontend and backend aligned."
        },
        {
          "question": "Which four states should every data-fetching screen handle?",
          "options": [
            "GET, POST, PUT, DELETE",
            "Loading, Error, Empty, and Populated",
            "Desktop, Tablet, Mobile, Print",
            "Login, Signup, Reset, Logout"
          ],
          "correctAnswer": 1,
          "explanation": "Handling Loading, Error, Empty, and Populated guarantees a polished UX under all network and data conditions."
        }
      ]
    },
    {
      "title": "Module 2: End-to-End Authenticated Workflows",
      "duration": "2h 45m",
      "objectives": [
        "Hydrate auth sessions safely on app boot and handle 401 token expiration cleanly",
        "Prevent duplicate mutations with double-submit guards and optimistic/resynced state",
        "Keep React UI state synchronized with MongoDB after create/update/delete actions"
      ],
      "notes": "### Module Introduction\nLogging in is only half of auth — your app must also restore sessions cleanly on browser refresh, log out gracefully when a JWT expires with `401`, and prevent double-clicks from creating duplicate records.\n\n### Prerequisites\n- Completion of Module 1.\n\n### How the Lessons Connect\n- **Lesson 1** handles session hydration on boot (`GET /api/auth/me`) and global 401 handling without wiping offline PWA state needlessly.\n- **Lesson 2** adds double-submit button guards and clean server-confirmed state updates.\n\n### Module Summary\nYou will build rock-solid authenticated CRUD flows that stay synchronized with the backend.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 2: Authenticated CRUD & Session Lifecycle.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Capstone Milestone 2 — Authenticated CRUD & Double-Submit Protection:\nProblem Statement:\nBuild the end-to-end authentication & issue creation workflow for the Team Issue Tracker, ensuring sessions hydrate on refresh, expired 401 tokens trigger logout cleanly, and rapid double-clicks on \"Create Issue\" never create duplicate database records.\n\nObjectives:\n- Hydrate user state on app mount using /api/auth/me before rendering protected routes.\n- Guard all mutation buttons with submitting state + server-side idempotency/unique checks.\n\nFeatures & Architecture:\n- Frontend AuthContext hydrating from token + axios interceptor handling 401 (ignoring network offline errors!).\n- Backend /api/auth/login, /api/auth/me, and POST /api/projects/:id/issues.\n\nMilestones & Step-by-Step Tasks:\n1. Implement AuthContext hydration with loading flag so ProtectedRoute waits before redirecting.\n2. Add an axios response interceptor that clears auth ONLY on genuine HTTP 401 responses (NOT on network errors when offline!).\n3. Implement CreateIssueForm with isSubmitting state disabling the button while POST is in flight and updating React state from the 201 response.\n\nTesting Requirements:\n- Verify refreshing /dashboard stays logged in.\n- Verify tampered JWT triggers 401 -> clean redirect to /login.\n- Verify rapid double-clicking Submit fires only 1 POST request.\n\nDeliverables & Final Outcome:\n- AuthContext.jsx and CreateIssueForm.jsx.",
      "lessons": [
        {
          "title": "Token Lifecycle, Hydration & 401 Handling",
          "duration": "1h 20m",
          "introduction": "Refreshing the browser wipes React memory — so your app must re-verify its stored token on startup without flashing /login or logging users out when briefly offline.",
          "objectives": [
            "Hydrate user session via GET /api/auth/me on mount while holding authLoading = true",
            "Log out only on genuine HTTP 401 responses, never on offline network errors"
          ],
          "notes": "### Surviving Browser Refresh & Token Expiration\nReact state disappears on every browser refresh. On app mount, `AuthProvider` must read any persisted token and call `GET /api/auth/me` while holding `authLoading = true`:\n- If `authLoading` starts as `false`, refreshing `/dashboard` immediately sees `user === null` and bounces a logged-in user to `/login`!\n- In your global Axios response interceptor, **only** clear the token and log out on genuine **HTTP `401`** responses. If `err.response` is `undefined` (the user is offline or the server briefly restarted), keep the session and let the page show a retryable offline error!\n\n### Common Mistakes & Solutions\n- **Mistake**: Logging users out whenever *any* API call fails (including offline `Network Error` or `500`).\n  - **Solution**: Check `if (err.response?.status === 401)` strictly.",
          "codeExample": "// Axios 401 interceptor example\napi.interceptors.response.use(\n  (res) => res,\n  (err) => {\n    if (err.response?.status === 401) {\n      localStorage.removeItem('token');\n      window.dispatchEvent(new Event('auth:expired'));\n    }\n    return Promise.reject(err);\n  }\n);",
          "codeExplanation": "1. Axios response interceptor inspects err.response?.status === 401 before clearing localStorage and dispatching 'auth:expired'.\n2. Network errors (err.response undefined) pass through to component error states without destroying the user's session.\n\nHow to Run & Expected Output:\nSimulate a 401 response in tests or DevTools: token clears and 'auth:expired' fires. Simulate Offline: token stays intact and UI shows retryable error.",
          "practiceExercise": "Guided Exercise:\n1. Add a `useEffect` listener in `AuthProvider` for `window.addEventListener('auth:expired', ...)` that resets `setUser(null)` and removes the listener on unmount.\n\nIndependent Challenge:\nVerify why `GET /api/auth/me` must NOT be cached by the PWA Service Worker (stale auth!).\n\nExpected Result:\nSeamless refresh hydration and accurate 401 expiration handling.",
          "keyTakeaways": [
            "Hold ProtectedRoute on a loading spinner until /api/auth/me hydration finishes",
            "Only clear auth tokens on genuine HTTP 401 responses, not offline network errors"
          ]
        },
        {
          "title": "Mutation Safety: Double-Submit Guards & State Sync",
          "duration": "1h 25m",
          "introduction": "A user on slow mobile 3G clicks \"Submit\" twice — creating two identical orders or issues. Disabling the button during flight + awaiting server truth fixes it.",
          "objectives": [
            "Disable submit buttons with isSubmitting state inside try/finally",
            "Sync UI lists using the server’s returned 201 document rather than guessing IDs"
          ],
          "notes": "### Preventing Duplicate Creations & Stale UI State\nOn slow mobile connections, users often tap \"Create\" twice when nothing happens in the first 200ms — firing two identical `POST` requests and creating duplicate database records!\n1. **Double-Submit Guard**: Track `submitting` boolean state, return early if `if (submitting) return;`, disable the button (`disabled={submitting}`), and **always** reset `setSubmitting(false)` inside `finally`.\n2. **Server-Confirmed State Sync**: Append the exact object returned by the `201 Created` API response (which contains MongoDB's `_id` and `createdAt`) rather than inventing a temporary client object without an ID.\n\n### Common Mistakes & Solutions\n- **Mistake**: Calling `setSubmitting(false)` only after `await api.post(...)`, leaving the button permanently frozen if the server returns `400`.\n  - **Solution**: Always reset `submitting` in `finally`.",
          "codeExample": "const handleCreate = async (e) => {\n  e.preventDefault();\n  if (submitting) return;\n  setSubmitting(true);\n  setError('');\n  try {\n    const { data } = await api.post(`/api/projects/${projectId}/issues`, { title });\n    setIssues((prev) => [data, ...prev]);\n    setTitle('');\n  } catch (err) {\n    setError(err.response?.data?.message || 'Could not create issue');\n  } finally {\n    setSubmitting(false);\n  }\n};",
          "codeExplanation": "1. Early return + disabled button prevent duplicate POSTs while a request is in flight.\n2. finally guarantees submitting resets even when catch handles a 400 or 500 error.\n3. Prepending data from the 201 response keeps _id and timestamps synchronized with MongoDB.\n\nHow to Run & Expected Output:\nSubmit the form in React: button disables during request, re-enables in finally, and the new server-confirmed issue appears at the top of the list.",
          "practiceExercise": "Guided Exercise:\n1. Change button text dynamically to `{submitting ? 'Creating...' : 'Create Issue'}` while in flight.\n\nIndependent Challenge:\nAdd a server-side idempotency or compound unique check so even two concurrent network retries cannot duplicate the same record.\n\nExpected Result:\nZero duplicate submissions and synchronized client/server IDs.",
          "keyTakeaways": [
            "Guard every mutation with submitting state + try/finally cleanup",
            "Update React state from the server’s confirmed response so IDs and timestamps stay accurate"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should an axios 401 interceptor check `err.response?.status === 401` rather than logging out on any error?",
          "options": [
            "Axios only throws 401",
            "When a user is offline, err.response is undefined — logging out on network errors would erase valid sessions during brief connectivity drops",
            "500 errors mean invalid password",
            "401 means CORS succeeded"
          ],
          "correctAnswer": 1,
          "explanation": "Only an explicit HTTP 401 from the server means the token is invalid/expired; network timeouts have no err.response."
        },
        {
          "question": "Why must `setSubmitting(false)` always go inside a `finally` block?",
          "options": [
            "To clear the form inputs",
            "So the submit button re-enables even if the API request throws a 400 or 500 error",
            "To skip validation",
            "To trigger a page reload"
          ],
          "correctAnswer": 1,
          "explanation": "If setSubmitting(false) only ran after await, any rejected API call would leave the button permanently disabled."
        },
        {
          "question": "What happens if ProtectedRoute renders before `/api/auth/me` finishes checking an existing token?",
          "options": [
            "It caches the token",
            "It sees user === null temporarily and prematurely redirects a logged-in user to /login on page refresh",
            "It logs the user in faster",
            "Nothing"
          ],
          "correctAnswer": 1,
          "explanation": "Holding on an authLoading spinner until hydration completes prevents false redirects on refresh."
        },
        {
          "question": "Why append the server’s 201 response object to React state instead of a client-guessed object without `_id`?",
          "options": [
            "React forbids objects without _id",
            "Subsequent Edit or Delete clicks need the real MongoDB _id generated by the server",
            "Client objects cannot be serialized",
            "It reduces CSS size"
          ],
          "correctAnswer": 1,
          "explanation": "Immediate follow-up actions (toggle, edit, delete) require the authoritative _id and timestamps created by the backend."
        }
      ]
    },
    {
      "title": "Module 3: Edge-Case Hardening & Data Integrity",
      "duration": "2h 30m",
      "objectives": [
        "Prevent NaN, division-by-zero, and stale-ID progress calculation bugs",
        "Maintain cascading referential integrity when parent records or child modules change",
        "Handle empty, null, and deleted-reference edge cases gracefully in React"
      ],
      "notes": "### Module Introduction\nReal users find edge cases you never imagined: a course with 0 modules causing `0 / 0 = NaN%` progress, a deleted module ID lingering in an enrollment's `completedModules` array pushing progress to `125%`, or a deleted author leaving `item.author.name` crashing JSX!\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** teaches defensive math (clamping `0..100`, guarding zero denominators) and null-safe rendering.\n- **Lesson 2** keeps derived progress and cascading deletes consistent across collections.\n\n### Module Summary\nYou will eliminate `NaN%`, `>100%`, and null-dereference crashes across full-stack features.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 3: Defensive Progress & Cascade Cleanup.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Capstone Milestone 3 — Edge-Case Hardening:\nProblem Statement:\nIn a Project/LMS tracker, deleting 1 of 4 tasks while a user still has that deleted ID in completedIds causes progress to calculate 4 / 3 = 133%, and 0-task projects show NaN%. Fix both server-side and client-side.\n\nObjectives:\n- Compute progress strictly by intersecting completedIds with currently existing valid IDs.\n- Guard 0-item denominators and clamp percentages to [0, 100].\n\nFeatures & Architecture:\n- Pure computeProgress(validIds, completedIds) helper shared conceptually between backend and UI.\n- Cascading cleanup pulling deleted task/module IDs from enrollments/summaries.\n\nMilestones & Step-by-Step Tasks:\n1. Write computeProgress(validIds, completedIds):\n   - If validIds.length === 0, return 0 (never divide by 0!).\n   - Build a Set of validIds (as strings) and count only completedIds present in that Set.\n   - Return Math.min(100, Math.round((validCompleted / validIds.length) * 100)).\n2. Write cleanDeletedReference(EnrollmentModel, deletedModuleId) using $pull: { completedModules: deletedModuleId }.\n\nTesting Requirements:\n- Unit test computeProgress([], ['a']) === 0.\n- Unit test computeProgress(['a', 'b'], ['a', 'b', 'deleted_id']) === 100 (NOT 150!).\n\nDeliverables & Final Outcome:\n- progressHelper.js and cascadeCleanup.js with passing node:test assertions.",
      "lessons": [
        {
          "title": "Defensive Math & Null-Safe Rendering",
          "duration": "1h 15m",
          "introduction": "Division by zero in JavaScript doesn’t throw an error — it silently produces NaN or Infinity and renders \"NaN% Complete\" right in your dashboard!",
          "objectives": [
            "Guard zero denominators and clamp percentages to 0..100",
            "Intersect completed IDs against active IDs to prevent >100% progress",
            "Render deleted/nullable references safely (user?.name ?? \"Deleted User\")"
          ],
          "notes": "### Why `0 / 0` Breaks Dashboards Silently\nIn JavaScript, dividing `0 / 0` does **not** throw an exception — it evaluates to `NaN`, and `1 / 0` evaluates to `Infinity`. Rendering `${progress}%` directly puts **\"NaN%\"** on a student's dashboard!\nSimilarly, if a module is deleted after a student completed it, leaving that deleted ID in `completedModules` makes `completed.length / active.length` exceed **100%**!\n\n### Three Defensive Rules\n1. Guard `if (!activeIds.length) return 0;` before dividing.\n2. Intersect `completedIds` against a `Set` of currently valid `activeIds` and clamp to `0..100`.\n3. Guard deleted populated references with optional chaining: `comment.author?.name ?? 'Former Member'`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Trusting `completedIds.length` without deduplicating or checking against `activeIds`.\n  - **Solution**: Always intersect via `Set`.",
          "codeExample": "export function calculateSafeProgress(activeModuleIds, completedIds) {\n  if (!Array.isArray(activeModuleIds) || activeModuleIds.length === 0) {\n    return 0;\n  }\n  const validSet = new Set(activeModuleIds.map(String));\n  const uniqueCompleted = new Set(\n    (completedIds || []).map(String).filter((id) => validSet.has(id))\n  );\n  const pct = Math.round((uniqueCompleted.size / validSet.size) * 100);\n  return Math.min(100, Math.max(0, pct));\n}\n\nconsole.log(calculateSafeProgress([], ['m1']));              // 0 (no NaN!)\nconsole.log(calculateSafeProgress(['m1', 'm2'], ['m1', 'm1', 'old'])); // 50",
          "codeExplanation": "1. Empty activeModuleIds immediately returns 0 instead of 0/0 (NaN).\n2. Set deduplicates accidental duplicate IDs and filters out stale 'old' IDs not in activeModuleIds.\n3. Math.min(100, Math.max(0, pct)) clamps the percentage safely.\n\nHow to Run & Expected Output:\nRun `node progress.js`. Prints `0` for empty modules and `50` for `['m1', 'm2']` with `['m1', 'm1', 'old']`.",
          "practiceExercise": "Guided Exercise:\n1. Run `calculateSafeProgress(['a', 'b'], ['a', 'b', 'deleted'])` in Node and verify it returns `100`, not `150`.\n\nIndependent Challenge:\nWrite a `safePercent(part, total)` helper handling negative numbers, `NaN`, `Infinity`, and `total <= 0`.\n\nExpected Result:\nZero `NaN%` or `>100%` progress bugs under any data state.",
          "keyTakeaways": [
            "Always guard total === 0 before dividing to prevent NaN% or Infinity%",
            "Intersect completed IDs with active IDs using a Set and clamp to 0..100",
            "Use optional chaining + fallbacks for populated references that may be null"
          ]
        },
        {
          "title": "Cascading Cleanup & State Consistency",
          "duration": "1h 15m",
          "introduction": "When a module or project is deleted, leaving stale IDs in other collections slowly corrupts analytics and user dashboards.",
          "objectives": [
            "Clean up child references with $pull and deleteMany inside transactions",
            "Recompute affected summary stats after cascading deletions"
          ],
          "notes": "### Maintaining Cross-Collection Integrity\nWhen a parent record or child module is deleted, orphan IDs left behind in other collections cause subtle bugs (progress > 100%, broken links, inflated stats).\nUse MongoDB's **`$pull`** operator inside the same transaction as the deletion to scrub the deleted ID from all referencing arrays atomically:\n`Enrollment.updateMany({ courseId }, { $pull: { completedModules: moduleId } }, { session })`\n\n### Common Mistakes & Solutions\n- **Mistake**: Deleting a Course or Project without deleting its child Modules/Issues/Enrollments, leaving orphan documents consuming storage and breaking aggregations.\n  - **Solution**: Always run cascading deletes inside `session.withTransaction()`.",
          "codeExample": "// Clean stale module reference from all enrollments of that course\nexport async function scrubModuleFromEnrollments(EnrollmentModel, courseId, moduleId, session) {\n  await EnrollmentModel.updateMany(\n    { courseId },\n    { $pull: { completedModules: moduleId } },\n    { session }\n  );\n}",
          "codeExplanation": "1. $pull removes every occurrence of moduleId from completedModules across all enrollments for that course in one database command.\n2. Passing { session } binds the cleanup to the enclosing ACID transaction.\n\nHow to Run & Expected Output:\nExecute inside a Mongoose transaction when deleting a module; all enrollments immediately drop the deleted moduleId from completedModules.",
          "practiceExercise": "Guided Exercise:\n1. Verify why `$pull` is idempotent (safe to run even if some enrollments didn't contain `moduleId`).\n\nIndependent Challenge:\nAlso scrub lesson-level keys (`\"${moduleId}:0\"`, `\"${moduleId}:1\"`) from `completedLessons` using `$pull` with regex or `$in`.\n\nExpected Result:\nClean cross-collection consistency with zero orphan IDs.",
          "keyTakeaways": [
            "Scrub deleted child IDs from referencing arrays using MongoDB $pull",
            "Wrap multi-collection deletions in transactions to prevent partial orphan states"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What does `Math.round((0 / 0) * 100)` evaluate to in JavaScript if you forget to guard total === 0?",
          "options": [
            "0",
            "NaN",
            "100",
            "Throws ZeroDivisionError"
          ],
          "correctAnswer": 1,
          "explanation": "0 / 0 produces NaN in JavaScript rather than throwing an error, causing \"NaN%\" to appear in the UI."
        },
        {
          "question": "How can a student’s course progress exceed 100% if an instructor deletes a module?",
          "options": [
            "React adds extra percentages",
            "If completedModules still contains the deleted module’s ID while total active modules shrank, unless you intersect/scrub IDs",
            "MongoDB rounds up",
            "CSS scales the bar"
          ],
          "correctAnswer": 1,
          "explanation": "Always intersect completed IDs with currently active IDs (and $pull deleted IDs on module deletion)."
        },
        {
          "question": "Which MongoDB update operator removes a deleted moduleId from every enrollment’s completedModules array?",
          "options": [
            "$push",
            "$pull",
            "$unset",
            "$inc"
          ],
          "correctAnswer": 1,
          "explanation": "$pull removes all instances of a specified value from an existing array field."
        },
        {
          "question": "What happens in React JSX if you render `{comment.author.name}` when that author’s User document was deleted?",
          "options": [
            "It renders \"Anonymous\"",
            "It crashes with TypeError: Cannot read properties of null (reading \"name\")",
            "MongoDB recreates the user",
            "JSX skips the component"
          ],
          "correctAnswer": 1,
          "explanation": "Mongoose .populate() sets missing references to null, so always use comment.author?.name ?? \"Deleted User\"."
        }
      ]
    },
    {
      "title": "Module 4: Automated Testing & Quality Assurance",
      "duration": "2h 45m",
      "objectives": [
        "Write fast unit and integration tests for backend logic using node:test",
        "Verify frontend components with Vitest + React Testing Library",
        "Execute a thorough manual & mobile (375px / 768px / 1440px) QA checklist"
      ],
      "notes": "### Module Introduction\nManual clicking catches surface bugs, yet regressions sneak back in the moment you refactor a helper or CSS rule. Automated backend + frontend tests paired with a structured mobile/desktop QA pass give you genuine confidence to ship.\n\n### Prerequisites\n- Completion of Modules 1–3.\n\n### How the Lessons Connect\n- **Lesson 1** builds automated `node:test` suites for domain logic, validators, and middleware.\n- **Lesson 2** walks through an end-to-end QA & responsive testing checklist across desktop, tablet, and 375px mobile.\n\n### Module Summary\nYou will automate core regression tests and verify responsive layouts systematically.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 4: Automated Test Suite & Mobile QA Report.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Capstone Milestone 4 — Automated Test Suite & QA Verification:\nProblem Statement:\nBefore launching your Team Issue Tracker, build an automated regression test suite and run a structured multi-viewport QA audit.\n\nObjectives:\n- Write >= 6 automated tests covering progress math, input validation, RBAC middleware, and UI rendering.\n- Verify zero console errors and zero horizontal overflow across 375px, 768px, and 1280px.\n\nFeatures & Architecture:\n- Backend tests in backend/tests/tracker.test.js (node:test).\n- Frontend component test in frontend/src/tests/IssueBoard.test.jsx (Vitest + Testing Library).\n\nMilestones & Step-by-Step Tasks:\n1. Write 4 backend tests: calculateSafeProgress edge cases (0 items, stale IDs), priority enum validation, and member-only RBAC guard (403).\n2. Write 2 frontend tests: IssueBoard renders Loading state and Error state with Retry button click.\n3. Run both test suites and record exact pass/fail counts.\n4. Inspect every page at 375px mobile width in Chrome DevTools verifying zero horizontal scroll.\n\nTesting Requirements:\n- All 6 tests must pass with zero skipped or relaxed assertions.\n\nDeliverables & Final Outcome:\n- tracker.test.js, IssueBoard.test.jsx, and QA pass log.",
      "lessons": [
        {
          "title": "Automated Backend Testing with node:test",
          "duration": "1h 20m",
          "introduction": "Testing pure functions and middleware takes milliseconds and catches subtle edge-case regressions every time you run npm test.",
          "objectives": [
            "Structure Arrange-Act-Assert tests with node:test and node:assert/strict",
            "Test edge cases (empty inputs, invalid IDs, unauthorized roles) systematically"
          ],
          "notes": "### Automated Backend Testing with `node:test`\nNode 18+ ships with a fast, zero-dependency test runner (`node:test` + `node:assert/strict`). Following the **Arrange -> Act -> Assert** pattern lets you test validation, math helpers, and Express RBAC middleware in milliseconds without spinning up a browser:\n- **Arrange**: Prepare valid, boundary, and invalid inputs.\n- **Act**: Invoke the target function or middleware.\n- **Assert**: Verify exact return values, HTTP status codes, or thrown errors.\n\n### Common Mistakes & Solutions\n- **Mistake**: Deleting or skipping a failing test to make CI green.\n  - **Solution**: Treat every failing test as a signal to fix the bug (or update the spec if requirements intentionally changed).",
          "codeExample": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst clampLimit = (raw) => Math.min(50, Math.max(1, Number.parseInt(raw, 10) || 12));\n\ndescribe('clampLimit', () => {\n  it('defaults invalid input to 12', () => {\n    assert.equal(clampLimit('abc'), 12);\n  });\n  it('clamps oversized values to 50', () => {\n    assert.equal(clampLimit('9999'), 50);\n  });\n  it('clamps negative values to 1', () => {\n    assert.equal(clampLimit('-5'), 1);\n  });\n});",
          "codeExplanation": "1. describe and it group test cases cleanly in native Node.js.\n2. clampLimit is tested against invalid strings ('abc' -> 12), oversized limits ('9999' -> 50), and negative limits ('-5' -> 1).\n\nHow to Run & Expected Output:\nSave as `clamp.test.js` and run `node --test clamp.test.js`. Output: `tests 3 / pass 3 / fail 0`.",
          "practiceExercise": "Guided Exercise:\n1. Run the 3 tests with `node --test` and verify all 3 pass.\n2. Add a 4th test for `clampLimit('25') === 25`.\n\nIndependent Challenge:\nWrite a test using `assert.throws(() => parseRole('superuser'), /Invalid role/)` for a role validator helper.\n\nExpected Result:\nFast, deterministic unit tests catching boundary regressions.",
          "keyTakeaways": [
            "Follow Arrange -> Act -> Assert in every unit test",
            "Test boundary conditions (empty, negative, oversized, invalid types) explicitly",
            "Never skip or weaken assertions just to make a failing test pass"
          ]
        },
        {
          "title": "End-to-End QA & Mobile Responsiveness Checklist",
          "duration": "1h 25m",
          "introduction": "Over 50% of web traffic is mobile. A feature that only works on your 27-inch monitor is only half built.",
          "objectives": [
            "Audit Console errors, Network 4xx/5xx failures, and layout overflow",
            "Test 375px mobile, 768px tablet, and 1280px+ desktop viewports systematically"
          ],
          "notes": "### Structured Multi-Viewport QA\nAutomated unit tests verify logic, while a structured QA pass verifies real browser layout, console health, and keyboard accessibility across **375px mobile**, **768px tablet**, and **1280px desktop**:\n1. **Console & Network**: Zero uncaught JS errors and zero unexpected 5xx responses.\n2. **375px Overflow Check**: `document.documentElement.scrollWidth <= window.innerWidth` must be `true` on every route (watch out for `<pre>` code blocks and wide tables!).\n3. **Keyboard & Touch**: Modals close on `Escape`, forms submit on `Enter`, and mobile buttons have comfortable `>= 44px` tap height.\n\n### Common Mistakes & Solutions\n- **Mistake**: Only testing on a 1920px desktop monitor and missing horizontal overflow on mobile phones.\n  - **Solution**: Check 375px in DevTools Device Toolbar on every PR.",
          "codeExample": "// Quick browser Console layout overflow check:\nconst hasOverflow = document.documentElement.scrollWidth > window.innerWidth;\nconsole.log('Horizontal overflow detected:', hasOverflow);",
          "codeExplanation": "1. Comparing documentElement.scrollWidth against window.innerWidth programmatically detects any element overflowing the horizontal viewport.\n\nHow to Run & Expected Output:\nOpen Chrome DevTools at 375x812 width and paste the snippet into Console. Expected output: `Horizontal overflow detected: false`.",
          "practiceExercise": "Guided Exercise:\n1. Run the overflow check across Home, Courses, CourseDetail (with code blocks), and Login at 375px width.\n\nIndependent Challenge:\nNavigate an entire form + modal using strictly `Tab`, `Shift+Tab`, `Enter`, and `Escape` without touching your mouse.\n\nExpected Result:\nZero console errors, zero mobile horizontal scroll, and full keyboard usability.",
          "keyTakeaways": [
            "Verify Console errors, failed Network requests, and horizontal overflow at 375px, 768px, and 1280px",
            "Test keyboard navigation (Tab / Enter / Escape) on forms, navbars, and modals"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What are the three phases of a well-structured unit test?",
          "options": [
            "Build, Deploy, Monitor",
            "Arrange, Act, Assert",
            "Fetch, Parse, Render",
            "Create, Read, Delete"
          ],
          "correctAnswer": 1,
          "explanation": "Arrange sets up inputs/mocks, Act executes the unit under test, and Assert verifies the expected outcome."
        },
        {
          "question": "What should you do if an automated test fails after a code refactor?",
          "options": [
            "Delete or skip the test",
            "Investigate whether the refactor introduced a bug or requirements legitimately changed, and fix the root cause",
            "Change assert.equal to console.log",
            "Disable CI"
          ],
          "correctAnswer": 1,
          "explanation": "Never relax or skip failing tests to hide bugs — fix the underlying issue or update expectations only when requirements genuinely changed."
        },
        {
          "question": "Which viewport width is a standard baseline for testing small mobile phone layouts?",
          "options": [
            "1920px",
            "1024px",
            "375px",
            "150px"
          ],
          "correctAnswer": 2,
          "explanation": "375px represents common compact smartphones and quickly exposes overflowing text, code blocks, and cramped buttons."
        },
        {
          "question": "What does `document.documentElement.scrollWidth > window.innerWidth` detect?",
          "options": [
            "Slow API responses",
            "Unintended horizontal page overflow on the current viewport",
            "Missing alt text",
            "Expired JWT tokens"
          ],
          "correctAnswer": 1,
          "explanation": "When scrollWidth exceeds innerWidth, content is overflowing horizontally off-screen."
        }
      ]
    },
    {
      "title": "Module 5: Security & Performance Auditing",
      "duration": "2h 45m",
      "objectives": [
        "Audit full-stack applications against OWASP Top 10 risks (IDOR, XSS, Injection, Auth)",
        "Profile and optimize slow MongoDB queries and oversized React/Vite bundles"
      ],
      "notes": "### Module Introduction\nBefore shipping any real application, run dedicated **Security** and **Performance** passes. Finding an IDOR bug or an unindexed `COLLSCAN` before launch takes 10 minutes; fixing a data breach in production takes weeks.\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** audits applications systematically against OWASP Top 10 risks.\n- **Lesson 2** profiles slow queries (`.lean()`, indexes, N+1 removal) and oversized JS chunks (`manualChunks`, `React.lazy`).\n\n### Module Summary\nYou will conduct structured security and performance audits on any MERN/full-stack codebase.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 5: Security & Performance Audit Report.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Capstone Milestone 5 — Security & Performance Audit:\nProblem Statement:\nConduct a pre-launch Security & Performance Audit on your Team Issue Tracker across authentication, authorization, input sanitization, bundle size, and database queries.\n\nObjectives:\n- Verify zero IDOR, XSS, NoSQL injection, or secret exposure vulnerabilities.\n- Confirm fast bundle sizes and indexed/lean DB reads.\n\nFeatures & Architecture:\n- Full audit covering Frontend (React/Vite) + Backend (Express/MongoDB).\n\nMilestones & Step-by-Step Tasks:\n1. Security Audit:\n   - Confirm passwords use bcrypt (rounds >= 10) and select: false.\n   - Confirm every user-owned route checks ownership (IDOR defense).\n   - Confirm zero secrets in frontend VITE_* variables and zero raw innerHTML with user strings.\n   - Confirm strict CORS allowlist + rate limiting on /api/auth/*.\n2. Performance Audit:\n   - Confirm list endpoints use .lean() and .select() with zero N+1 loops.\n   - Confirm React.lazy() + manualChunks keep initial JS bundle lean.\n\nTesting Requirements:\n- Document concrete verification steps for each audit item (e.g., grep checks, npm run build output, 403 IDOR test).\n\nDeliverables & Final Outcome:\n- AUDIT_REPORT.md with Pass/Fail findings and remediation commits.",
      "lessons": [
        {
          "title": "Auditing for OWASP Top 10 Risks",
          "duration": "1h 25m",
          "introduction": "Most real-world web breaches exploit the same handful of mistakes: missing ownership checks (IDOR), leaked secrets, XSS, or missing rate limits.",
          "objectives": [
            "Check Broken Access Control (IDOR + RBAC) on every mutating and private read endpoint",
            "Verify XSS protection, NoSQL sanitization, and secret isolation"
          ],
          "notes": "### Practical OWASP Top 10 Developer Audit\nMost web application breaches trace back to 5 preventable mistakes:\n1. **Broken Access Control (IDOR)**: Authenticated user modifies another user's resource because ownership wasn't checked.\n2. **Broken Auth / Missing Rate Limits**: Unlimited brute-force attempts on `/login` or `/forgot-password`, or plain-text reset tokens in DB.\n3. **Injection**: Unescaped `$regex` (ReDoS) or raw `req.body` objects containing `$ne`/`$gt` passed to MongoDB.\n4. **XSS**: Rendering untrusted user HTML via `innerHTML` / `dangerouslySetInnerHTML` or unescaped email templates.\n5. **Secret Exposure**: `.env` committed to Git or secrets prefixed with `VITE_`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Checking `protect` (authentication) on `DELETE /api/projects/:id` while forgetting ownership check (`ownerId === req.user._id`).\n  - **Solution**: Always check both authentication AND ownership/membership.",
          "codeExample": "// Example: Safe ownership + validation check on PATCH /api/issues/:id\nexport function assertProjectMember(project, userId) {\n  const isOwner = String(project.ownerId) === String(userId);\n  const isMember = project.members.some((m) => String(m) === String(userId));\n  if (!isOwner && !isMember) {\n    const err = new Error('Forbidden: not a member of this project');\n    err.statusCode = 403;\n    throw err;\n  }\n}",
          "codeExplanation": "1. assertProjectMember verifies whether userId matches project.ownerId or appears in project.members using String() comparison.\n2. Throws a 403 Forbidden error if unauthorized, blocking IDOR attacks cleanly.\n\nHow to Run & Expected Output:\nTest with a non-member userId -> throws Error with `statusCode: 403`. Test with ownerId -> succeeds cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Audit 3 mutating routes in a backend project for ObjectId validation, allowlisted fields, and ownership checks.\n\nIndependent Challenge:\nVerify password reset tokens are hashed with SHA-256 before storing in MongoDB so raw tokens never sit in database backups.\n\nExpected Result:\nDefense-in-depth protection across auth, ownership, input validation, and secrets.",
          "keyTakeaways": [
            "Verify authentication AND resource ownership on every private endpoint (IDOR defense)",
            "Escape/sanitize untrusted inputs across HTML, emails, and MongoDB queries",
            "Keep all secrets out of Git history and frontend VITE_* variables"
          ]
        },
        {
          "title": "Performance Profiling: Bundle & Query Speed",
          "duration": "1h 20m",
          "introduction": "Measure before optimizing: Chrome DevTools Network/Lighthouse and MongoDB explain() show you exactly where milliseconds are spent.",
          "objectives": [
            "Identify oversized frontend chunks in Vite build output",
            "Spot N+1 database queries and missing indexes on the backend"
          ],
          "notes": "### Profiling Before Optimizing\nNever guess where latency comes from — measure **Frontend bundle chunks** (`vite build`) and **Backend query counts**:\n- **Backend**: Replace sequential `await` waterfalls with `Promise.all`, replace N+1 loops with `$in` or Aggregation Pipelines, and add `.lean()`, `.select()`, and compound ESR indexes on read endpoints.\n- **Frontend**: Split heavy vendor packages (`manualChunks`) and lazy-load secondary routes (`React.lazy`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Awaiting two unrelated MongoDB queries one after another, doubling endpoint latency unnecessarily.\n  - **Solution**: Run independent queries concurrently with `Promise.all([...])`.",
          "codeExample": "// Fast parallel dashboard loader (zero sequential waterfalls!)\nexport async function loadProjectSummary(ProjectModel, IssueModel, projectId) {\n  const [project, statusCounts] = await Promise.all([\n    ProjectModel.findById(projectId).select('title ownerId').lean(),\n    IssueModel.aggregate([\n      { $match: { projectId } },\n      { $group: { _id: '$status', count: { $sum: 1 } } }\n    ])\n  ]);\n  return { project, statusCounts };\n}",
          "codeExplanation": "1. Promise.all executes the project lookup (.lean() + .select()) and the Issue status aggregation concurrently in one parallel wait.\n\nHow to Run & Expected Output:\nExecute against a seeded Project/Issue collection; returns `{ project, statusCounts }` in roughly the time of the single slower query rather than their sum.",
          "practiceExercise": "Guided Exercise:\n1. Run `npm run build` in `frontend/` and check if any chunk exceeds 500 KB uncompressed.\n\nIndependent Challenge:\nAdd a compound ESR index `{ projectId: 1, status: 1, createdAt: -1 }` to `IssueSchema` and explain how it accelerates both board filtering and aggregation `$match`.\n\nExpected Result:\nLean frontend chunks and fast, parallelized indexed backend queries.",
          "keyTakeaways": [
            "Eliminate sequential await waterfalls with Promise.all on independent queries/fetches",
            "Combine .lean(), .select(), and compound indexes on hot backend read paths",
            "Use React.lazy() + manualChunks to keep initial frontend JavaScript fast"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which OWASP vulnerability occurs when User A can read or delete User B’s private issue just by changing the `:id` in the URL?",
          "options": [
            "CSS Specificity Conflict",
            "Broken Object-Level Authorization (IDOR)",
            "DNS Cache Poisoning",
            "Tree Shaking"
          ],
          "correctAnswer": 1,
          "explanation": "IDOR (Broken Object-Level Authorization) happens when an API checks login status without checking record ownership."
        },
        {
          "question": "Why should password reset tokens stored in MongoDB be hashed (e.g., SHA-256) before saving?",
          "options": [
            "MongoDB cannot store random strings",
            "If a read-only database backup leaks, attackers still cannot use hashed tokens to hijack accounts",
            "Hashing makes emails arrive faster",
            "SHA-256 replaces JWTs"
          ],
          "correctAnswer": 1,
          "explanation": "Hashing reset tokens in DB ensures raw tokens only ever exist in the user’s email link."
        },
        {
          "question": "What is the quickest way to cut latency when an endpoint needs two independent MongoDB queries?",
          "options": [
            "Run them inside a setTimeout",
            "Run both concurrently with Promise.all([...])",
            "Disable .lean()",
            "Remove indexes"
          ],
          "correctAnswer": 1,
          "explanation": "Promise.all executes independent database queries in parallel instead of waiting sequentially."
        },
        {
          "question": "Which React practice reduces initial JavaScript download size on the landing page?",
          "options": [
            "Importing all admin charts at the top of App.jsx",
            "Code-splitting secondary/heavy routes with React.lazy() and Suspense",
            "Using innerHTML",
            "Disabling strict mode"
          ],
          "correctAnswer": 1,
          "explanation": "React.lazy defers downloading secondary route chunks until the user navigates to them."
        }
      ]
    },
    {
      "title": "Module 6: Capstone Launch & Continuous Improvement",
      "duration": "2h 45m",
      "objectives": [
        "Write clear README documentation, environment setup guides, and operational runbooks",
        "Execute a final Pre-Launch Sign-Off and deploy cleanly",
        "Plan post-launch monitoring, error tracking, and iterative feature roadmaps"
      ],
      "notes": "### Module Introduction\nShipping v1.0.0 is the beginning of a product's life, not the end. Great engineers leave behind clear READMEs, repeatable deployment runbooks, and structured monitoring so any teammate can operate and extend the system safely.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** covers documentation, runbooks, and final launch sign-off.\n- **Lesson 2** covers post-launch monitoring, user feedback loops, and iterative roadmaps.\n\n### Module Summary\nYou now have the complete architectural, engineering, testing, security, and operational toolkit to build and ship full-stack applications professionally.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver Capstone Milestone 6: Final Launch Package & README.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Capstone Milestone 6 — Final Launch Package & README:\nProblem Statement:\nPrepare the complete Team Issue & Learning Tracker Capstone for public portfolio presentation and production operation.\n\nObjectives:\n- Document architecture, local setup, environment variables, testing, and deployment cleanly.\n- Complete the final Launch Sign-Off verification.\n\nFeatures & Architecture:\n- Complete MERN/Vite full-stack application with auth, RBAC, search, automated tests, and PWA support.\n\nMilestones & Step-by-Step Tasks:\n1. Write a portfolio-grade README.md with:\n   - Project Overview & Key Engineering Highlights\n   - Tech Stack & Architecture Diagram (text/mermaid)\n   - Local Setup Steps (without exposing real secrets — reference .env.example!)\n   - Running Tests (backend node:test + frontend Vitest)\n   - Production Deployment Notes (Vercel + MongoDB Atlas)\n2. Run final verification: backend tests, frontend tests, production build, and smoke check.\n\nTesting Requirements:\n- All automated tests passing and production build succeeding with zero errors.\n\nDeliverables & Final Outcome:\n- Complete README.md and verified Launch Sign-Off checklist.",
      "lessons": [
        {
          "title": "Documentation, Runbooks & Launch Sign-Off",
          "duration": "1h 20m",
          "introduction": "A portfolio project or production service without a clear README and setup instructions looks unfinished to recruiters and teammates alike.",
          "objectives": [
            "Write concise READMEs covering architecture, env setup, and test commands",
            "Document operational runbooks for common incidents (rollback, DB connection, SMTP)",
            "Verify all automated tests and production builds right after your final edit"
          ],
          "notes": "### Engineering Documentation & Launch Sign-Off\nGreat software is maintainable by the next engineer who opens the repository:\n- **README.md**: Concise overview, key architecture decisions, setup steps referencing `.env.example` (zero real secrets!), and exact test/build commands.\n- **Incident Runbooks**: 3-step recovery checklists for common failures (check `/api/health` -> inspect function logs -> Instant Rollback if caused by latest deploy).\n- **Strict Verification Rule**: Never report tests or builds as passing unless you ran them **after your final edit** and observed zero failures!\n\n### Common Mistakes & Solutions\n- **Mistake**: Running tests, making \"one tiny last-minute edit,\" and deploying without re-running tests.\n  - **Solution**: Always re-run backend tests, frontend tests, and `npm run build` after the very last edit.",
          "codeExample": "# Final Pre-Launch Command Checklist\ncd backend && npm test          # Verify all backend unit & integration tests pass\ncd ../frontend && npm test      # Verify all frontend Vitest component tests pass\nnpm run build                   # Verify production Vite + PWA sw.js build succeeds",
          "codeExplanation": "1. Runs the complete pre-launch verification sequence across backend tests, frontend Vitest suite, and Vite + Workbox production build.\n\nHow to Run & Expected Output:\nRun each command in order after your final edit. All test suites must report 0 failures and `dist/sw.js` must be generated cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Review your project's `README.md` to verify a teammate can run `npm install` and `npm test` using only `.env.example`.\n\nIndependent Challenge:\nWrite a 3-step Incident Runbook for \"Contact form returns 503 after deploy\".\n\nExpected Result:\nClear onboarding docs and verified post-edit test/build gates.",
          "keyTakeaways": [
            "Include clear architecture notes, .env.example setup, and test commands in README.md",
            "Always re-run tests and production builds after your final edit before signing off",
            "Prepare simple incident runbooks (health check -> logs -> rollback) before launch"
          ]
        },
        {
          "title": "Post-Launch Monitoring & Iterative Roadmap",
          "duration": "1h 25m",
          "introduction": "Once real users arrive, uptime monitors, error tracking, and small focused iterations keep quality high without risky rewrites.",
          "objectives": [
            "Monitor /api/health uptime and structured error logs post-launch",
            "Prioritize bug fixes and incremental improvements via small PRs and regression tests"
          ],
          "notes": "### Operating Software After Launch\nShipping v1.0.0 is day one:\n1. **Health Monitoring**: Ping `GET /api/health` every 5 minutes with an uptime monitor so database or host outages trigger alerts immediately.\n2. **Regression-Test Every Bug**: Whenever a user hits a bug in production, write a failing automated test reproducing that exact input *first*, fix the bug, and keep that test forever so it never regresses!\n3. **Iterative Roadmap**: Ship small, low-risk PRs via GitHub Flow rather than risky mega-rewrites.\n\n### Common Mistakes & Solutions\n- **Mistake**: Fixing a production edge case manually without adding a regression test, only to reintroduce the exact same bug 2 months later.\n  - **Solution**: Every bugfix PR includes a regression test.",
          "codeExample": "// Regression test habit: reproduce the bug first!\nimport { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\n\ndescribe('regression: empty search query', () => {\n  it('returns all items instead of throwing on whitespace query', () => {\n    const normalizeQuery = (q) => (typeof q === 'string' ? q.trim() : '');\n    assert.equal(normalizeQuery('   '), '');\n    assert.equal(normalizeQuery(null), '');\n  });\n});",
          "codeExplanation": "1. Reproduces a whitespace/null search query edge case inside node:test to lock down the fix permanently.\n\nHow to Run & Expected Output:\nSave as `regression.test.js` and run `node --test regression.test.js`. Output: `tests 1 / pass 1 / fail 0`.",
          "practiceExercise": "Guided Exercise:\n1. Write a regression test for a real edge case you encountered (e.g., trailing slash in `CLIENT_URL` or `0 / 0` progress).\n\nIndependent Challenge:\nDefine 3 Week-1 post-launch metrics (uptime %, 5xx error count, p95 API latency) and target thresholds.\n\nExpected Result:\nPermanent regression safety net and disciplined post-launch iteration.",
          "keyTakeaways": [
            "Monitor /api/health and 5xx error rates continuously after launch",
            "Turn every fixed production bug into a permanent regression test",
            "Ship v1.1+ enhancements via small, focused PRs with CI verification"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When are you allowed to report that all automated tests and production builds pass?",
          "options": [
            "If they passed yesterday before your final edits",
            "Only after running them following your very last edit and observing zero failures",
            "If only 1 test file passed",
            "Whenever Vite dev server starts"
          ],
          "correctAnswer": 1,
          "explanation": "Any edit after a test run can break code; always re-run tests and builds after your final edit."
        },
        {
          "question": "What should you do whenever you fix a real user bug in production?",
          "options": [
            "Delete related tests",
            "Add a permanent regression test reproducing that bug so it can never silently return",
            "Disable error logging",
            "Rewrite the entire app"
          ],
          "correctAnswer": 1,
          "explanation": "Regression tests lock in fixes permanently across future refactors."
        },
        {
          "question": "What is the safest way for a README to document required environment variables?",
          "options": [
            "Paste your real MongoDB URI and JWT_SECRET into README.md",
            "Reference .env.example with placeholder variable names and descriptions",
            "Skip mentioning environment variables",
            "Store secrets in package.json"
          ],
          "correctAnswer": 1,
          "explanation": "Document variable names via .env.example while keeping real credentials strictly out of Git."
        },
        {
          "question": "Why point an uptime monitor at GET /api/health after launch?",
          "options": [
            "To keep CSS cached",
            "To detect API or database outages within minutes rather than hearing about them from users hours later",
            "To speed up React rendering",
            "To bypass CORS"
          ],
          "correctAnswer": 1,
          "explanation": "Automated health-check monitoring alerts you immediately when Express or MongoDB becomes unreachable."
        }
      ]
    },
    {
      "title": "Module 7: Real-Time Collaboration, Activity Logs & Optimistic UI",
      "duration": "2h 30m",
      "objectives": [
        "Design immutable Activity Audit Logs recording who changed what and when",
        "Implement Optimistic UI updates safely with clean catch-block rollback"
      ],
      "notes": "### Module Introduction & Description\nModern collaborative apps (Linear, Jira, Notion) feel instantaneous because status toggles update immediately via **Optimistic UI** while recording a clear **Activity Audit Log** on the backend — and rolling back gracefully if the server rejects the change!\n\n### Prerequisites\n- Completion of Modules 1–6.\n\n### Skills Acquired\n- Immutable audit trail schema design and safe optimistic state updates with rollback.\n\n### How the Lessons Connect\n- **Lesson 1** designs immutable Activity Audit Logs.\n- **Lesson 2** implements Optimistic UI status toggling with snapshot rollback.\n\n### Completion Criteria\n- Complete both lessons, deliver Capstone Milestone 7: Activity Feed & Optimistic Toggle, and pass the Module 7 quiz with 100%.",
      "assignment": "Capstone Milestone 7 — Activity Feed & Optimistic Status Toggle:\nProblem Statement:\nUsers toggling an issue status from 'open' -> 'in_progress' wait 600ms before the UI moves, AND team leads have no audit log of who closed an issue. Add Optimistic UI with rollback + an immutable ActivityLog collection.\n\nObjectives:\n- Update React state immediately on click while storing the previous snapshot for rollback on API error.\n- Record an immutable ActivityLog entry on the backend inside the same workflow.\n\nFeatures & Architecture:\n- Frontend optimistic toggleIssueStatus(id, nextStatus) with rollback + error toast.\n- Backend ActivityLog schema ({ projectId, issueId, actorId, action, fromStatus, toStatus, createdAt }).\n\nMilestones & Step-by-Step Tasks:\n1. Capture const previous = issues; before calling setIssues(...) optimistically.\n2. In catch, restore setIssues(previous) and show a clear error banner.\n3. On backend status update, insert an immutable ActivityLog document (never update/delete audit logs in normal flows!).\n\nTesting Requirements:\n- Simulate a 500 error in DevTools/mock -> verify the issue snaps back cleanly to its previous status and displays the error!\n\nDeliverables & Final Outcome:\n- optimisticToggle.js and ActivityLogSchema.js.",
      "lessons": [
        {
          "title": "Designing Activity Audit Logs & Notifications",
          "duration": "1h 15m",
          "introduction": "Audit logs answer \"Who changed this status to Done at 3 PM?\" — and keeping them append-only prevents tampering.",
          "objectives": [
            "Model append-only ActivityLog documents with indexed (projectId, createdAt) lookups",
            "Never store mutable user names inside logs without IDs — or snapshot display info intentionally"
          ],
          "notes": "### Append-Only Audit Trail Design\n1. Index `{ projectId: 1, createdAt: -1 }` so the recent-activity feed loads in single-digit milliseconds.\n2. Keep audit records **immutable** (only `createdAt: true`, no `PUT /api/activity/:id` route!).",
          "codeExample": "const activityEntry = {\n  projectId: 'p1',\n  issueId: 'i42',\n  actorId: 'u7',\n  action: 'STATUS_CHANGED',\n  meta: { from: 'open', to: 'done' },\n  createdAt: new Date().toISOString()\n};\nconsole.log(JSON.stringify(activityEntry));",
          "codeExplanation": "1. Captures project, issue, actor, structured action enum, and before/after metadata in an immutable event record.\n\nHow to Run & Expected Output:\nRun in Node -> prints structured JSON audit entry ready for MongoDB insertion.",
          "practiceExercise": "Guided Exercise:\n1. Design the ESR compound index for fetching the latest 20 activities of a specific project (`{ projectId: 1, createdAt: -1 }`).\n\nIndependent Challenge:\nAdd a MongoDB TTL index of 90 days (`expireAfterSeconds: 90 * 86400`) if audit logs should auto-prune after 90 days.\n\nExpected Result:\nFast, tamper-resistant project activity timeline.",
          "keyTakeaways": [
            "Keep audit logs append-only with structured action enums and before/after metadata",
            "Index { projectId: 1, createdAt: -1 } for instant activity feed reads"
          ]
        },
        {
          "title": "Implementing Optimistic Status Updates Safely",
          "duration": "1h 15m",
          "introduction": "Optimistic UI feels magical when the server succeeds — and turns into silent data corruption if you forget to roll back when the server rejects!",
          "objectives": [
            "Snapshot previous state before applying an optimistic update",
            "Roll back accurately and notify the user if the API call fails"
          ],
          "notes": "### The 3-Step Optimistic Contract\n1. **Snapshot**: Save the old list/item (or use functional updater rollback targeting that specific item `id`!).\n2. **Apply Optimistically**: Update UI immediately.\n3. **Rollback on Error**: In `catch`, revert that item's status back to `prevStatus` and show a visible error alert!",
          "codeExample": "export async function optimisticStatusChange({\n  id,\n  prevStatus,\n  nextStatus,\n  setIssues,\n  apiPatch,\n  onError\n}) {\n  setIssues((list) => list.map((i) => (i.id === id ? { ...i, status: nextStatus } : i)));\n  try {\n    await apiPatch(id, nextStatus);\n  } catch (err) {\n    setIssues((list) => list.map((i) => (i.id === id ? { ...i, status: prevStatus } : i)));\n    onError(err.message || 'Failed to update status');\n  }\n}",
          "codeExplanation": "1. Updates only the matching issue ID optimistically via functional setIssues(list => ...).\n2. On API failure, reverts strictly that item back to prevStatus (so concurrent edits to *other* issues aren't wiped out!).\n\nHow to Run & Expected Output:\nTest with a rejecting `apiPatch` mock in Node/Vitest: item temporarily changes to `nextStatus`, then cleanly reverts to `prevStatus` and calls `onError`.",
          "practiceExercise": "Guided Exercise:\n1. Write a unit test passing a rejecting `apiPatch` mock and asserting the issue reverts to `prevStatus`.\n\nIndependent Challenge:\nExplain why reverting just the single item by `id` is safer than `setIssues(snapshot)` if two different items were toggled rapidly!\n\nExpected Result:\nSnappy 0ms UI feedback with bulletproof error rollback.",
          "keyTakeaways": [
            "Always provide a catch rollback path for every optimistic UI update",
            "Revert by item ID rather than overwriting the entire list snapshot when concurrent edits can occur"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the #1 bug when developers implement Optimistic UI updates without a `catch` rollback?",
          "options": [
            "CSS stops animating",
            "If the server rejects the request (403/500/offline), the UI shows fake success while the database never saved it!",
            "React throws a key warning",
            "localStorage gets cleared"
          ],
          "correctAnswer": 1,
          "explanation": "Without rollback in catch, failed mutations leave the UI lying to the user about persisted state."
        },
        {
          "question": "Why is reverting a single failed item by `id` safer than `setItems(oldSnapshot)` when multiple items are toggled quickly?",
          "options": [
            "Snapshots don’t work in arrays",
            "Overwriting the whole list with an older snapshot could accidentally undo another item’s successful update!",
            "setItems(snapshot) is async",
            "IDs change on every render"
          ],
          "correctAnswer": 1,
          "explanation": "Item-level rollback preserves concurrent updates to other items in the list."
        },
        {
          "question": "Which compound index best supports fetching the 20 newest ActivityLog records for a specific `projectId`?",
          "options": [
            "{ createdAt: 1 }",
            "{ projectId: 1, createdAt: -1 }",
            "{ actorId: 1 }",
            "{ action: \"text\" }"
          ],
          "correctAnswer": 1,
          "explanation": "Following ESR: Equality on projectId first, Sort on createdAt descending second."
        },
        {
          "question": "Why should ActivityLog records normally have NO `PUT` or `PATCH` update routes?",
          "options": [
            "MongoDB forbids updating logs",
            "Audit logs must remain immutable append-only historical evidence of what actually happened",
            "Express only supports GET for logs",
            "Virtuals require immutability"
          ],
          "correctAnswer": 1,
          "explanation": "Making audit logs append-only preserves trustworthiness and prevents history tampering."
        }
      ]
    },
    {
      "title": "Module 8: Data Exports, File Validation & Background Processing",
      "duration": "2h 15m",
      "objectives": [
        "Generate safe CSV exports immune to CSV Formula Injection (=, +, -, @)",
        "Validate file uploads and isolate long-running tasks cleanly"
      ],
      "notes": "### Module Introduction & Description\n\"Add an Export to CSV button\" sounds trivial until a student enters `=CMD(...)` as their name and Excel executes a formula when an admin opens the CSV! Learning **CSV Formula Sanitization** and clean file streaming protects both users and servers.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Escaping CSV cells & neutralizing CSV formula injection, plus safe upload/export validation.\n\n### How the Lessons Connect\n- **Lesson 1** teaches safe CSV generation and Formula Injection defense.\n- **Lesson 2** covers upload validation & asynchronous job patterns.\n\n### Completion Criteria\n- Complete both lessons, deliver Capstone Milestone 8: Formula-Safe CSV Export, and pass the Module 8 quiz with 100%.",
      "assignment": "Capstone Milestone 8 — Formula-Safe CSV Export & Upload Guard:\nProblem Statement:\nBuild a CSV Export helper for your Team Issue Tracker that safely quotes commas/newlines AND neutralizes CSV Formula Injection (=, +, -, @, \\t, \\r) when opened in Excel or Google Sheets.\n\nObjectives:\n- Implement csvEscapeCell(val) handling both RFC 4180 quoting and formula-prefix neutralization.\n\nFeatures & Architecture:\n- Pure CSV formatter usable in Node streams or browser Blob downloads.\n\nMilestones & Step-by-Step Tasks:\n1. Write csvEscapeCell(value):\n   - Convert null/undefined to ''.\n   - If trimmed/raw string starts with =, +, -, @, \\t, or \\r, prepend a single quote (')!\n   - Wrap in double quotes and double any internal quotes (\" -> \"\") if cell contains comma, quote, or newline.\n2. Write exportIssuesCsv(issues) returning header + formatted rows.\n\nTesting Requirements:\n- Unit test `csvEscapeCell('=1+1')` -> starts with `\"'` (neutralized!).\n- Unit test `csvEscapeCell('Fix, \"bug\"')` -> `\"Fix, \"\"bug\"\"\"`.\n\nDeliverables & Final Outcome:\n- csvExport.js and csvExport.test.js passing under `node --test`.",
      "lessons": [
        {
          "title": "CSV/JSON Report Exports & Formula Injection Defense",
          "duration": "1h 10m",
          "introduction": "Simply running `row.join(\",\")` breaks on the first title containing a comma — and leaves admins vulnerable to CSV Formula Injection in Excel.",
          "objectives": [
            "Quote commas, newlines, and double-quotes per RFC 4180",
            "Neutralize leading =, +, -, @ formula triggers safely"
          ],
          "notes": "### CSV Formula Injection\nIf a user sets their name to `=HYPERLINK(\"https://evil.test\",\"Click\")`, Excel evaluates `=` as a formula! Prepending a leading apostrophe `'` when a cell begins with `=`, `+`, `-`, `@`, `\\t`, or `\\r` forces spreadsheets to treat it strictly as harmless plain text.",
          "codeExample": "export function csvEscapeCell(value) {\n  let str = value == null ? '' : String(value);\n  if (/^[=+\\-@\\t\\r]/.test(str)) {\n    str = \"'\" + str; // Neutralize spreadsheet formula execution\n  }\n  if (/[\",\\r\\n]/.test(str)) {\n    return `\"${str.replaceAll('\"', '\"\"')}\"`;\n  }\n  return str;\n}\n\nconsole.log(csvEscapeCell('=SUM(A1:A5)')); // '=SUM(A1:A5)\nconsole.log(csvEscapeCell('Bug, \"urgent\"')); // \"Bug, \"\"urgent\"\"\"",
          "codeExplanation": "1. Checks leading formula trigger characters and prefixes ' to neutralize them.\n2. Wraps cells containing quotes, commas, or newlines in double quotes with escaped \"\" internal quotes.\n\nHow to Run & Expected Output:\nRun `node csvEscape.js`. Prints `'=SUM(A1:A5)` and `\"Bug, \"\"urgent\"\"\"`.",
          "practiceExercise": "Guided Exercise:\n1. Test `csvEscapeCell(null)` and `csvEscapeCell('Line 1\\nLine 2')` in Node.\n\nIndependent Challenge:\nWrite `toCsv(headers, rows)` mapping each row through `csvEscapeCell` and joining with `\\r\\n`.\n\nExpected Result:\nRFC 4180 compliant, spreadsheet-safe CSV exports.",
          "keyTakeaways": [
            "Never build CSVs with naive row.join(\",\") — always escape quotes, commas, and newlines",
            "Prefix leading =, +, -, @ characters with an apostrophe to block CSV Formula Injection"
          ]
        },
        {
          "title": "Handling Uploads & Long-Running Tasks Cleanly",
          "duration": "1h 05m",
          "introduction": "Never block an HTTP request for 45 seconds generating a huge report or resizing 20 images — validate early, enforce limits, and offload heavy work.",
          "objectives": [
            "Enforce strict MIME allowlists, size limits, and UUID filenames",
            "Return 202 Accepted + status polling for genuinely slow background jobs"
          ],
          "notes": "### HTTP Request Timeouts & Background Jobs\nServerless platforms cap HTTP requests (10s–60s). Validate inputs synchronously (`400` if invalid), and for heavy async jobs (bulk PDFs, video encoding), return `202 Accepted` with a `jobId` and let the client poll `GET /api/jobs/:id` (or listen via SSE)!",
          "codeExample": "// 202 Accepted async job pattern\nexport function startReportJob(enqueueJob) {\n  return async (req, res) => {\n    const jobId = await enqueueJob({ userId: req.user.id });\n    res.status(202).json({ jobId, status: 'queued' });\n  };\n}",
          "codeExplanation": "1. Enqueues work quickly and responds 202 Accepted instead of timing out the HTTP connection.",
          "practiceExercise": "Guided Exercise:\n1. List 3 tasks that should run synchronously in the request vs 2 tasks better suited for a 202 background queue.\n\nIndependent Challenge:\nCombine `prepareSafeUpload` from Node Module 7 with a `202` thumbnail-processing queue design.\n\nExpected Result:\nResilient API endpoints that never hit serverless request timeouts.",
          "keyTakeaways": [
            "Use 202 Accepted + jobId polling/SSE for heavy multi-second background jobs",
            "Always enforce strict size, MIME, and filename guards on uploads"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must a CSV exporter prefix cells starting with `=`, `+`, `-`, or `@` with a single quote (`'`)?",
          "options": [
            "To sort alphabetically",
            "To neutralize CSV Formula Injection so Excel/Sheets won’t execute malicious formulas when opening the file",
            "To convert strings to numbers",
            "RFC 4180 requires single quotes on all strings"
          ],
          "correctAnswer": 1,
          "explanation": "Leading =, +, -, @ characters are interpreted as spreadsheet formulas unless neutralized."
        },
        {
          "question": "How does RFC 4180 require a double-quote (`\"`) inside a quoted CSV cell to be escaped?",
          "options": [
            "With \\\"",
            "By doubling it (`\"\"`)",
            "By deleting it",
            "With %22"
          ],
          "correctAnswer": 1,
          "explanation": "CSV escapes literal quotes inside quoted fields by doubling them: \"Say \"\"Hi\"\"\"."
        },
        {
          "question": "Which HTTP status code is most appropriate when an API accepts a heavy background export job to process asynchronously?",
          "options": [
            "200 OK (after waiting 5 minutes)",
            "202 Accepted",
            "404 Not Found",
            "301 Moved Permanently"
          ],
          "correctAnswer": 1,
          "explanation": "202 Accepted indicates the request was valid and queued for asynchronous processing."
        },
        {
          "question": "What breaks if you export CSV rows with naive `row.join(\",\")` without quoting?",
          "options": [
            "Numbers turn into strings",
            "Any field containing a comma (like \"Austin, TX\") splits into two broken columns!",
            "Files become too small",
            "UTF-8 fails"
          ],
          "correctAnswer": 1,
          "explanation": "Unquoted commas inside field values shift all subsequent columns to the right."
        }
      ]
    },
    {
      "title": "Module 9: Accessibility (WCAG AA), SEO & PWA Offline Readiness",
      "duration": "2h 15m",
      "objectives": [
        "Audit full-stack applications for WCAG AA keyboard navigation, ARIA, and color contrast",
        "Design honest offline/online indicators and safe PWA caching in full-stack apps"
      ],
      "notes": "### Module Introduction & Description\nA commercial-grade web app works for **every** user (keyboard, screen reader, low-vision) AND behaves honestly when a commuter's train goes through a tunnel (offline PWA shell without fake \"Saved!\" lies!).\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- End-to-end WCAG AA accessibility auditing and honest offline-aware PWA UX design.\n\n### How the Lessons Connect\n- **Lesson 1** audits keyboard navigation, ARIA landmarks, and WCAG AA contrast.\n- **Lesson 2** builds honest offline/online status detection and safe PWA boundaries.\n\n### Completion Criteria\n- Complete both lessons, deliver Capstone Milestone 9: A11y & Offline Resilience Audit, and pass the Module 9 quiz with 100%.",
      "assignment": "Capstone Milestone 9 — WCAG AA Accessibility & Offline PWA Audit:\nProblem Statement:\nVerify your full-stack Team Issue Tracker meets WCAG AA accessibility standards and handles browser offline mode honestly without caching private auth responses or faking mutations.\n\nObjectives:\n- Audit landmarks, focus visibility, form labels, and contrast across all pages.\n- Implement a clean useOnlineStatus() hook showing an honest offline banner when disconnected.\n\nFeatures & Architecture:\n- Accessible landmarks + skip link + keyboard modals.\n- useOnlineStatus() React hook listening to window 'online' / 'offline' events.\n\nMilestones & Step-by-Step Tasks:\n1. Build useOnlineStatus.js using navigator.onLine + online/offline event listeners (cleaned up on unmount).\n2. Render a polite role=\"status\" banner when !isOnline: \"You are offline — cached pages remain readable; saving changes requires reconnection.\"\n3. Run Chrome Lighthouse Accessibility audit and fix any warnings.\n\nTesting Requirements:\n- Toggle DevTools Network -> Offline and verify banner appears immediately and mutations show honest network errors!\n\nDeliverables & Final Outcome:\n- useOnlineStatus.js and A11Y_OFFLINE_AUDIT.md.",
      "lessons": [
        {
          "title": "Auditing Keyboard Navigation, ARIA Landmarks & Contrast",
          "duration": "1h 05m",
          "introduction": "Accessibility isn’t a final checkbox — a 10-minute keyboard + Lighthouse audit catches 80% of real barriers before launch.",
          "objectives": [
            "Verify logical Tab order, visible focus rings, and modal Escape handling",
            "Confirm every form input has a <label> and every icon button has an aria-label"
          ],
          "notes": "### 5-Minute Full-Stack A11y Audit\n1. Put your mouse aside and complete Login -> Search -> Open Issue -> Close Modal using **only** `Tab`, `Enter`, `Space`, and `Escape`.\n2. Verify every error banner uses `role=\"alert\"` or `aria-live=\"polite\"`.\n3. Check secondary text contrast in DevTools (`>= 4.5:1`).",
          "codeExample": "// Accessible icon-only close button + live error banner\n<div role=\"alert\" className=\"bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex justify-between items-center\">\n  <span>Could not save changes. Please retry.</span>\n  <button type=\"button\" aria-label=\"Dismiss error\" onClick={onDismiss}>X</button>\n</div>",
          "codeExplanation": "1. role=\"alert\" announces the error to screen readers as soon as it mounts.\n2. aria-label=\"Dismiss error\" gives the icon-only X button a clear accessible name.",
          "practiceExercise": "Guided Exercise:\n1. Inspect a modal and navbar in Chrome DevTools -> Accessibility panel to verify every button shows a non-empty Accessible Name.\n\nIndependent Challenge:\nAudit a form for missing `<label htmlFor=\"...\">` associations.\n\nExpected Result:\nWCAG AA compliant, keyboard-navigable user flows.",
          "keyTakeaways": [
            "Test critical user flows keyboard-only (Tab, Enter, Space, Escape) before every release",
            "Use role=\"alert\" for error banners and aria-label on icon-only buttons"
          ]
        },
        {
          "title": "Offline Resilience & Honest Sync Indicators in Full-Stack PWAs",
          "duration": "1h 10m",
          "introduction": "When a user goes offline, your PWA should still load cached public pages cleanly — while honestly telling them when live API actions need a connection.",
          "objectives": [
            "Track connectivity with navigator.onLine and online/offline window events",
            "Never fake API success or cache private auth tokens/responses in Cache Storage"
          ],
          "notes": "### Honest Offline UX Rules\n1. Public shell (Home, Courses, cached UI assets) loads offline from Workbox precache.\n2. Private API routes (`/api/auth/*`, `/api/enrollments/*`) stay **NetworkOnly** — never cached in Service Worker!\n3. When offline, show a clear banner and fail mutations honestly with Retry rather than pretending data saved to MongoDB.",
          "codeExample": "import { useState, useEffect } from 'react';\n\nexport function useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(() =>\n    typeof navigator !== 'undefined' ? navigator.onLine : true\n  );\n\n  useEffect(() => {\n    const goOnline = () => setIsOnline(true);\n    const goOffline = () => setIsOnline(false);\n    window.addEventListener('online', goOnline);\n    window.addEventListener('offline', goOffline);\n    return () => {\n      window.removeEventListener('online', goOnline);\n      window.removeEventListener('offline', goOffline);\n    };\n  }, []);\n\n  return isOnline;\n}",
          "codeExplanation": "1. Initializes from navigator.onLine safely (SSR-safe check).\n2. Subscribes to browser online/offline events and cleans up both listeners on unmount.\n\nHow to Run & Expected Output:\nToggle Offline in DevTools Network tab: `useOnlineStatus()` immediately flips from `true` to `false`.",
          "practiceExercise": "Guided Exercise:\n1. Render `{!isOnline && <div role=\"status\">Offline mode — live syncing paused</div>}` in your app header.\n\nIndependent Challenge:\nDisable submit buttons or show a clear offline prompt when `!isOnline` on network-required forms.\n\nExpected Result:\nHonest, resilient offline PWA experience.",
          "keyTakeaways": [
            "Listen to window online/offline events with cleanup to inform users honestly",
            "Keep private authenticated API routes out of Service Worker caches"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must a PWA NOT return a fake \"200 Saved!\" response when the user is offline and submits a form without background sync?",
          "options": [
            "Because Service Workers cannot return 200",
            "Fake success misleads users into thinking data reached MongoDB when it was never persisted",
            "Offline mode disables React",
            "It breaks CSS"
          ],
          "correctAnswer": 1,
          "explanation": "Honest offline error states with Retry protect users from losing work silently."
        },
        {
          "question": "What does adding `role=\"alert\"` to an error banner achieve?",
          "options": [
            "Colors the box red",
            "Instructs screen readers to announce the error message automatically when it appears",
            "Blocks form submission",
            "Reloads the page"
          ],
          "correctAnswer": 1,
          "explanation": "role=\"alert\" creates an assertive live region so assistive technologies announce critical errors immediately."
        },
        {
          "question": "Why must `window.removeEventListener(\"online\", ...)` be returned from `useEffect` in `useOnlineStatus`?",
          "options": [
            "To keep navigator.onLine true",
            "To prevent memory leaks and duplicate listeners if the component unmounts and remounts",
            "React requires it for CSS",
            "To clear localStorage"
          ],
          "correctAnswer": 1,
          "explanation": "Cleaning up global window listeners on unmount prevents leaks and stale callbacks."
        },
        {
          "question": "What is the simplest way to test your app’s keyboard accessibility without specialized tools?",
          "options": [
            "Unplug your monitor",
            "Navigate the entire critical flow using only Tab, Shift+Tab, Enter, Space, and Escape",
            "Run npm install",
            "Switch to Dark Mode"
          ],
          "correctAnswer": 1,
          "explanation": "Keyboard-only walkthroughs immediately expose missing focus rings, trapped modals, and clickable <div>s."
        }
      ]
    },
    {
      "title": "Module 10: Portfolio Presentation, Case Studies & Technical Walkthrough",
      "duration": "2h 15m",
      "objectives": [
        "Write a compelling Engineering Case Study explaining tradeoffs, not just tech buzzwords",
        "Prepare a crisp 3-minute live technical demo and architecture walkthrough for interviews"
      ],
      "notes": "### Module Introduction & Description\nBuilding a great full-stack project is half the win — **explaining your engineering decisions clearly** to recruiters, senior engineers, and clients is what turns a portfolio project into job offers!\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Writing high-signal architecture case studies, presenting tradeoffs, and executing a final end-to-end portfolio sign-off.\n\n### How the Lessons Connect\n- **Lesson 1** structures Engineering Case Studies around Problem -> Constraints -> Tradeoffs -> Verified Outcomes.\n- **Lesson 2** ties together the Final Portfolio Showcase & Production Sign-Off.\n\n### Completion Criteria\n- Complete both lessons, deliver Capstone Milestone 10: Engineering Case Study & Final Portfolio Sign-Off, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Engineering Case Study & Portfolio Showcase:\nProblem Statement:\nPackage your completed Team Issue & Learning Tracker (or Cortex-scale LMS project) with a recruiter-ready Engineering Case Study and verified final release checks.\n\nObjectives:\n- Articulate concrete architectural tradeoffs (why compound unique indexes, why decoupled CDN + Serverless, why pure reducers/state, how N+1 queries were eliminated).\n\nRequirements:\n1. Write CASE_STUDY.md covering:\n   - Problem & Target Users\n   - System Architecture Diagram (text/Mermaid)\n   - 3 Key Engineering Challenges & Tradeoffs (e.g., race-condition prevention with unique index, N+1 elimination with Aggregation, XSS/IDOR hardening)\n   - Measurable Verification Results (test counts, build size, Lighthouse/overflow checks — strictly factual!).\n2. Re-run all backend tests, frontend tests, and production build after your final edit and record exact pass counts.\n\nStep-by-Step Instructions:\n1. Write CASE_STUDY.md with zero exaggerated metrics.\n2. Practice a 3-minute walkthrough: Live Demo -> Architecture -> Security/Performance Highlight -> Tests.\n\nDeliverables:\n- CASE_STUDY.md and final verified test/build log.\n\nEvaluation Criteria:\n- Focuses on concrete engineering tradeoffs and verified facts rather than generic buzzwords.",
      "lessons": [
        {
          "title": "Structuring Architecture Case Studies for Technical Interviews",
          "duration": "1h 05m",
          "introduction": "Saying \"I built a MERN app with React and MongoDB\" sounds like everyone else. Explaining WHY you added a compound unique index and how you eliminated N+1 queries stands out immediately.",
          "objectives": [
            "Frame engineering stories using Situation -> Problem -> Tradeoff -> Verified Outcome",
            "Avoid exaggerated or unverified claims in technical summaries"
          ],
          "notes": "### High-Signal Portfolio Framing\nInstead of listing 15 library names, highlight **real problems solved**:\n- *\"Prevented concurrent duplicate enrollments using a MongoDB compound unique index on `{ studentId, courseId }` + `11000` conflict handling.\"*\n- *\"Replaced N+1 module-count queries with a single `$match`/`$group` Aggregation Pipeline.\"*\n- *\"Added `AbortController` cleanup in React `useEffect` to eliminate search race conditions.\"*",
          "codeExample": "// Case Study Highlight Template (Markdown):\n// ### Challenge: Eliminating N+1 Queries on Course Catalog\n// - Symptom: 1 query for courses + N queries for module counts.\n// - Solution: Single Module.aggregate([$match, $group]) + O(1) Map merge.\n// - Verification: Verified 2 constant DB queries in integration tests.\nexport const CASE_STUDY_SECTIONS = ['Problem', 'Tradeoffs', 'Implementation', 'Verification'];",
          "codeExplanation": "1. Demonstrates concise, verifiable engineering storytelling focused on root causes and measurable fixes.",
          "practiceExercise": "Guided Exercise:\n1. Write 2 bullet points like the template above describing real improvements you implemented (e.g., IDOR ownership check or Optimistic rollback).\n\nIndependent Challenge:\nPrepare answers for \"What would you improve next if you had 2 more weeks?\" (e.g., Redis rate limiting, Playwright E2E CI).\n\nExpected Result:\nClear, interview-ready architectural storytelling.",
          "keyTakeaways": [
            "Lead with engineering problems solved and architectural tradeoffs, not just library lists",
            "Cite only exact, verified test counts, bundle sizes, and behaviors you directly observed"
          ]
        },
        {
          "title": "Final Capstone: Production Sign-Off & Portfolio Showcase",
          "duration": "1h 10m",
          "introduction": "Executing the final end-to-end verification across all 10 Practical Projects modules before presenting your work.",
          "objectives": [
            "Run full backend, frontend, build, and smoke checks after the very last edit",
            "Deliver a clean, documented, responsive, secure full-stack project"
          ],
          "notes": "### Final Sign-Off Gate\n1. Backend tests pass (`npm test`).\n2. Frontend tests pass (`npm test`).\n3. Production build succeeds (`npm run build`) with PWA `dist/sw.js` generated.\n4. Zero secrets in Git; isolated test DB untouched from production.",
          "codeExample": "// Final local verification workflow:\n// 1. cd backend && npm test\n// 2. cd frontend && npm test\n// 3. cd frontend && npm run build\nexport const FINAL_GATES_PASSED = true;",
          "codeExplanation": "1. Confirms the exact 3-command local verification sequence run after final edits.",
          "practiceExercise": "Guided Exercise:\n1. Run all 3 commands sequentially in your workspace and record the exact output counts.\n\nIndependent Challenge:\nDo a 3-minute dry run demonstrating your project from User Login -> Feature Action -> Error/Offline Handling -> Passing Tests.\n\nExpected Result:\nComplete, verified, portfolio-grade full-stack engineering project.",
          "keyTakeaways": [
            "Always run backend tests, frontend tests, and production build after your very last edit",
            "Present your work clearly with live demo, architecture tradeoffs, and verified test results"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What makes a portfolio project stand out most to senior engineering interviewers?",
          "options": [
            "Listing 25 buzzwords in the README",
            "Explaining concrete problems solved, architectural tradeoffs (e.g., N+1 fixes, race-condition indexes, security guards), and verified tests",
            "Using neon gradients",
            "Skipping error handling"
          ],
          "correctAnswer": 1,
          "explanation": "Senior engineers evaluate how you reason about tradeoffs, edge cases, data integrity, and verification."
        },
        {
          "question": "When reporting test and build results in a project case study, what is the golden rule?",
          "options": [
            "Estimate approximate pass counts",
            "Report only exact results observed from running tests/builds after your final edit",
            "Exclude failed tests from the count",
            "Copy numbers from last month"
          ],
          "correctAnswer": 1,
          "explanation": "Engineering integrity requires reporting only actual, post-final-edit verified results."
        },
        {
          "question": "In a 3-minute technical demo, which sequence communicates your work most effectively?",
          "options": [
            "Read every line of package.json aloud",
            "Problem & Live Demo -> Architecture Overview -> 1-2 Deep Engineering Highlights -> Verification/Tests",
            "Show only CSS files",
            "Skip the live demo"
          ],
          "correctAnswer": 1,
          "explanation": "Leading with the live user value, then architecture and deep technical highlights, keeps interviewers engaged."
        },
        {
          "question": "What should you always do before concluding local development on a release?",
          "options": [
            "Push straight to production without building",
            "Re-run backend tests, frontend tests, and the production build after the final edit",
            "Delete .gitignore",
            "Clear all database indexes"
          ],
          "correctAnswer": 1,
          "explanation": "Final post-edit verification catches any last-minute regressions or build errors."
        }
      ]
    }
  ]
};
