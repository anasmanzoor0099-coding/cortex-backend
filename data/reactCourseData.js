export const reactCourseData = {
  "title": "React.js for Modern Frontend Engineering",
  "description": "Master React 18 from first principles to production architecture. Learn JSX, component composition, immutable state, useEffect & AbortController, custom hooks, Context API, React Router, and performance optimization.",
  "thumbnail": "react",
  "totalDuration": "16h 00m",
  "category": "Frontend Development",
  "difficulty": "Intermediate",
  "tags": [
    "React",
    "Hooks",
    "React Router",
    "Context API",
    "Custom Hooks",
    "Performance"
  ],
  "learningOutcomes": [
    "Compose clean, reusable UI components with JSX, props, and children composition",
    "Manage local, form, and complex state immutably with useState and useReducer",
    "Synchronize with external APIs safely using useEffect, cleanup functions, and AbortController",
    "Extract reusable logic into Custom Hooks (useFetch, useDebounce)",
    "Share global authentication and theme state via Context API without prop drilling",
    "Build multi-page SPAs with React Router v6, protected routes, and React.lazy code splitting"
  ],
  "prerequisites": [
    "Modern JavaScript (ES6+)",
    "HTML & CSS fundamentals"
  ],
  "targetAudience": "JavaScript developers ready to build scalable, component-driven Single Page Applications.",
  "practicalProject": "Build a full-featured Course Discovery & Learning Tracker SPA with search, debounced filtering, Context auth state, dynamic routes, and lazy-loaded views.",
  "modules": [
    {
      "title": "Module 1: Components, JSX, Props & Composition",
      "duration": "2h 30m",
      "objectives": [
        "Build pure functional components and understand JSX compilation",
        "Follow JSX syntax rules (className, htmlFor, single root / Fragment)",
        "Pass data down via props and compose flexible wrappers with children",
        "Render dynamic lists safely with stable unique key props"
      ],
      "notes": "### Module Introduction\nReact shifts UI development from imperative DOM surgery (`document.createElement`, `appendChild`) to **declarative UI**: you describe what the UI should look like for any given state, and React efficiently updates the real DOM when data changes.\n\n### Prerequisites\n- Modern JavaScript (ES6+ destructuring, `map`, arrow functions, modules).\n\n### How the Lessons Connect\n- **Lesson 1** explains JSX compilation, component purity, and why components must stay side-effect free during render.\n- **Lesson 2** covers props, `children` composition (avoiding prop-drilling), and why list `key`s must be stable IDs rather than array indices.\n\n### Module Summary\nYou will compose clean, predictable functional components and render dynamic lists without reconciliation bugs.\n\n### Completion Criteria\n- Read both lessons and build the practice components.\n- Deliver the Reusable Card & Course Catalog Grid assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nBuild a reusable <CourseCard /> and <Badge /> component library for an online learning catalog, demonstrating props destructuring, children composition, conditional rendering, and proper list keys.\n\nObjectives:\n- Build pure functional components with zero side effects during render.\n- Compose layout containers using the children prop.\n- Render a dynamic list of courses with stable id keys.\n\nRequirements:\n1. Create <Badge variant=\"beginner|intermediate|advanced\">{children}</Badge>.\n2. Create <CardShell header={...} footer={...}>{children}</CardShell> using composition slots.\n3. Render an array of 4 courses using courses.map(c => <CourseCard key={c.id} course={c} />).\n4. Conditionally render a \"Free\" tag only when course.price === 0 (never render a stray 0 on screen!).\n\nStep-by-Step Instructions:\n1. Define a courses array with unique string id values.\n2. Build Badge.jsx and CardShell.jsx using JSX and className.\n3. Combine them in CourseGrid.jsx and verify in React DevTools that every CourseCard has a stable key.\n\nDeliverables:\n- Badge.jsx, CardShell.jsx, and CourseGrid.jsx.\n\nEvaluation Criteria:\n- Uses key={course.id}, never key={index}.\n- Avoids the {count && <Tag />} zero-rendering pitfall by using explicit boolean checks ({course.price === 0 && <Tag />}).",
      "lessons": [
        {
          "title": "Declarative UI, JSX Rules & Component Purity",
          "duration": "1h 15m",
          "introduction": "JSX looks like HTML inside JavaScript, yet under the hood Vite/Babel compiles every tag into plain JavaScript function calls.",
          "objectives": [
            "Understand how JSX compiles to React.createElement / jsx() calls",
            "Follow JSX attribute rules (className, htmlFor, camelCase events)",
            "Keep component render bodies pure (same props + state = same JSX)"
          ],
          "notes": "### What Is JSX?\nJSX is syntactic sugar for JavaScript object creation. `<h1 className=\"title\">Hi</h1>` compiles into `jsx('h1', { className: 'title', children: 'Hi' })`.\nBecause JSX is JavaScript:\n- Use `className` instead of `class`, and `htmlFor` instead of `for`.\n- Embed any JS **expression** inside curly braces `{user.name}`, `{items.length > 0 ? 'Ready' : 'Empty'}`. (Statements like `if` or `for` cannot go directly inside `{}` — use ternaries, `&&`, or `.map()`.)\n- Return a single root element or a **Fragment** (`<>...</>`) to avoid extra wrapper `<div>`s in the DOM.\n\n### Component Purity\nA React component should behave like a **pure mathematical function** during render:\n1. Do not mutate props or external variables while rendering.\n2. Do not start network fetches or timers directly inside the component body (that belongs in `useEffect` or event handlers).\nIn development, React's `<StrictMode>` intentionally calls your component function **twice** to help you catch impure render bugs early!\n\n### Watch Out for the `0 && <Component />` Trap!\nIn JavaScript, `0 && <Badge />` evaluates to `0`, and React **renders the number `0`** onto the screen! Always coerce the left side to a strict boolean: `items.length > 0 && <List />`.",
          "codeExample": "export function StatusBanner({ unreadCount, userName }) {\n  return (\n    <>\n      <h2>Welcome back, {userName}</h2>\n      {unreadCount > 0 ? (\n        <p className=\"alert\">You have {unreadCount} unread notifications.</p>\n      ) : (\n        <p className=\"muted\">You are all caught up.</p>\n      )}\n    </>\n  );\n}",
          "codeExplanation": "1. <>...</> (React Fragment) groups <h2> and <p> without inserting an unnecessary wrapper <div> into the DOM.\n2. {unreadCount > 0 ? ... : ...} uses a strict boolean comparison so unreadCount === 0 renders \"You are all caught up.\" instead of leaking \"0\".\n3. Component receives props via destructuring and computes JSX purely with zero mutations.\n\nHow to Run & Expected Output:\nRender <StatusBanner unreadCount={0} userName=\"Ada\" /> inside a React app. Displays \"Welcome back, Ada\" and \"You are all caught up.\"",
          "practiceExercise": "Guided Exercise:\n1. Rewrite a component that uses <div className=\"wrapper\"> into a Fragment <>...</> and inspect the resulting HTML in Chrome DevTools Elements tab.\n\nIndependent Challenge:\nFix a buggy snippet {notifications.length && <NotificationBell />} so it renders nothing when notifications.length is 0.\n\nHints:\n- Use Boolean(notifications.length) or notifications.length > 0.",
          "keyTakeaways": [
            "JSX compiles to JavaScript function calls; use className, htmlFor, and {} for expressions",
            "Use React Fragments (<>...</>) to return multiple elements without extra DOM wrappers",
            "Keep render functions pure: never mutate props or trigger side effects directly during render",
            "Always use explicit booleans (count > 0 && ...) so 0 never renders accidentally"
          ]
        },
        {
          "title": "Props, Children Composition & List Keys",
          "duration": "1h 15m",
          "introduction": "Props flow one way — from parent to child. Mastering children composition keeps components flexible without 15 boolean flags.",
          "objectives": [
            "Pass data and callbacks down through props cleanly",
            "Use the children prop to build flexible wrapper/layout components",
            "Explain why list keys must be stable unique IDs rather than array indices"
          ],
          "notes": "### Props Are Read-Only\nComponents receive a single `props` object from their parent. Never mutate `props.items.push(...)` inside a child!\n\n### Composition via `children`\nInstead of creating `<Modal title=\"...\" bodyText=\"...\" buttonText=\"...\" showFooter={true} />`, pass JSX directly via `children`:\n```jsx\n<Modal title=\"Confirm Delete\">\n  <p>Are you sure you want to delete this module?</p>\n  <Button variant=\"danger\">Delete</Button>\n</Modal>\n```\nEverything between `<Modal>` and `</Modal>` becomes `props.children`, making `Modal` reusable for any content.\n\n### Why List `key`s Matter\nWhen rendering arrays with `.map()`, React uses each item's `key` to track which DOM node corresponds to which data item across renders.\n**Why avoid `key={index}`?** If you insert, delete, or reorder items in a list with `key={index}`, React matches the wrong component state (like checkbox ticks or input text) to the wrong item! Always use a stable database/unique ID like `key={item.id}`.",
          "codeExample": "export function Panel({ title, children }) {\n  return (\n    <section className=\"panel\">\n      <h3>{title}</h3>\n      <div className=\"panel-body\">{children}</div>\n    </section>\n  );\n}\n\nexport function ModuleList({ modules }) {\n  return (\n    <Panel title=\"Course Modules\">\n      <ul>\n        {modules.map((mod) => (\n          <li key={mod.id}>{mod.title}</li>\n        ))}\n      </ul>\n    </Panel>\n  );\n}",
          "codeExplanation": "1. Panel acts as a reusable layout shell rendering whatever JSX is passed inside <Panel>...</Panel> via props.children.\n2. ModuleList maps over modules and assigns key={mod.id} (a stable unique identifier) to each <li>.\n\nHow to Run & Expected Output:\nPass an array [{ id: 'm1', title: 'JSX' }, { id: 'm2', title: 'State' }] to <ModuleList />. Renders a titled panel with a clean <ul> list and zero key warnings.",
          "practiceExercise": "Guided Exercise:\n1. Build an <AlertBox type=\"info|warning\">{children}</AlertBox> component and render two alerts with rich JSX (bold text and links) inside.\n\nIndependent Challenge:\nDemonstrate the key={index} bug: create a list of 3 items with <input /> boxes, prepend a new item at index 0, and compare key={index} vs key={item.id}.\n\nHints:\n- Keys only need to be unique among siblings in the same .map() array, not globally across the entire app.",
          "keyTakeaways": [
            "Props flow downward and must be treated as immutable read-only inputs",
            "Use the children prop for flexible container/layout composition instead of rigid prop flags",
            "Always assign stable, unique IDs as key props in .map() lists — avoid array index for dynamic lists"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why can {items.length && <ItemList items={items} />} cause a visual bug when items is empty?",
          "options": [
            "JSX throws a syntax error on &&",
            "items.length is 0, and React renders the number 0 onto the screen",
            "ItemList still mounts with undefined props",
            "JavaScript converts 0 to true"
          ],
          "correctAnswer": 1,
          "explanation": "In JS, 0 && <Component /> short-circuits to 0, which React renders literally as text \"0\". Use items.length > 0 && ... instead."
        },
        {
          "question": "Why should you avoid using the array index as a React key in a list that can be reordered or have items deleted?",
          "options": [
            "React forbids numeric keys",
            "Indices shift when items are inserted/deleted, causing React to mismatch component state with the wrong item",
            "Index keys slow down CSS animations",
            "Index keys disable onClick handlers"
          ],
          "correctAnswer": 1,
          "explanation": "React tracks element identity by key. If indices shift, React reuses old DOM/state for different data items."
        },
        {
          "question": "What is the purpose of React Fragments (<>...</>)?",
          "options": [
            "To fetch data asynchronously",
            "To group multiple sibling JSX elements without adding an extra wrapper node to the DOM",
            "To memoize expensive calculations",
            "To create global state"
          ],
          "correctAnswer": 1,
          "explanation": "Fragments satisfy JSX’s single-root rule without polluting the DOM with unnecessary <div> wrappers."
        },
        {
          "question": "Which prop automatically receives whatever JSX is nested between <Card> and </Card>?",
          "options": [
            "slot",
            "content",
            "children",
            "inner"
          ],
          "correctAnswer": 2,
          "explanation": "React passes nested JSX between opening and closing component tags as props.children."
        }
      ]
    },
    {
      "title": "Module 2: State, Immutability & Controlled Forms",
      "duration": "2h 45m",
      "objectives": [
        "Manage local component state with useState and functional updaters (prev => ...)",
        "Update objects and arrays immutably so React detects state changes reliably",
        "Build controlled form inputs with validation and submission handling",
        "Avoid storing redundant derived state when values can be computed during render"
      ],
      "notes": "### Module Introduction\nState is a component's memory across renders. Understanding **how React batches state updates**, why **immutability** triggers re-renders, and how to **derive values** instead of duplicating state eliminates the most common React bugs.\n\n### Prerequisites\n- Completion of Module 1 (components, JSX, props).\n\n### How the Lessons Connect\n- **Lesson 1** covers `useState`, functional updater callbacks (`prev => ...`), state batching, and immutable array/object updates.\n- **Lesson 2** covers controlled form inputs and computing derived values cleanly during render.\n\n### Module Summary\nYou will manage interactive form and list state without stale-closure bugs or accidental mutations.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Multi-Field Signup Form & Live Filtered List assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an interactive Course Enrollment & Feedback Form component with live character count, category filter, and validation feedback.\n\nObjectives:\n- Manage form fields in a single clean state object (or individual controlled states).\n- Compute derived metrics (character count remaining, form validity) directly during render without extra useState.\n\nRequirements:\n1. Controlled inputs: name, email, track (<select>), and bio (<textarea>).\n2. Display live \"Remaining characters: X / 200\" derived directly from bio.length.\n3. Validate on submit (prevent empty name, invalid email without @) and display field-specific inline errors.\n4. Maintain an immutable list of submitted entries rendered below the form with a Delete button per entry.\n\nStep-by-Step Instructions:\n1. Initialize form state with useState({ name: '', email: '', track: 'frontend', bio: '' }).\n2. Write a single reusable handleChange(e) using computed property names: setForm(prev => ({ ...prev, [e.target.name]: e.target.value })).\n3. Use functional updater setEntries(prev => [...prev, newEntry]) on submit and prev.filter(...) on delete.\n\nDeliverables:\n- EnrollmentForm.jsx component.\n\nEvaluation Criteria:\n- Zero direct array/object mutation (no .push() or .splice()).\n- Derived values (remainingChars, isValid) are calculated during render, not stored in redundant useState.",
      "lessons": [
        {
          "title": "useState, Batching & Immutable Updates",
          "duration": "1h 20m",
          "introduction": "Why does calling setCount(count + 1) three times in a row only add 1? Understanding React state snapshots and batching explains everything.",
          "objectives": [
            "Use functional updater form setCount(prev => prev + 1) when new state depends on old state",
            "Understand state snapshots and React 18 automatic batching",
            "Update arrays (add, remove, update item) and nested objects immutably"
          ],
          "notes": "### State Is a Snapshot per Render\nInside a single render, `count` is a constant snapshot (say `0`). Calling `setCount(count + 1)` three times in the same click handler schedules `setCount(0 + 1)` three times — resulting in `1`!\nTo update based on the **latest queued state**, pass an **updater function**:\n`setCount(prev => prev + 1);`\n\n### Why Immutability Is Required\nReact compares the previous state reference with the next state reference using `Object.is`. If you run `items.push(newItem); setItems(items);`, the array reference is identical, so **React skips re-rendering**!\nInstead, always produce a fresh copy:\n- **Add**: `setItems(prev => [...prev, newItem])`\n- **Remove**: `setItems(prev => prev.filter(item => item.id !== id))`\n- **Update one item**: `setItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item))`",
          "codeExample": "import { useState } from 'react';\n\nexport function TodoQuickList() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: 'Learn useState', done: false }\n  ]);\n\n  const toggleTodo = (id) => {\n    setTodos((prev) =>\n      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))\n    );\n  };\n\n  const addThree = () => {\n    setTodos((prev) => [\n      ...prev,\n      { id: Date.now(), text: 'New Task', done: false }\n    ]);\n  };\n\n  return (\n    <div>\n      <button onClick={addThree}>Add Task</button>\n      <ul>\n        {todos.map((t) => (\n          <li key={t.id} onClick={() => toggleTodo(t.id)}>\n            {t.done ? '[Done] ' : ''}{t.text}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
          "codeExplanation": "1. toggleTodo uses prev => prev.map(...) and clones only the matching object with { ...todo, done: !todo.done }.\n2. addThree uses [...prev, newTodo] so React receives a brand-new array reference and re-renders immediately.\n\nHow to Run & Expected Output:\nMount <TodoQuickList />. Clicking \"Add Task\" appends a task; clicking any item toggles \"[Done] \".",
          "practiceExercise": "Guided Exercise:\n1. Build a counter with a \"+3\" button that calls setCount(prev => prev + 1) three times and verify it increments by 3.\n\nIndependent Challenge:\nWrite an immutable state update for a nested profile object { name: 'Ada', prefs: { dark: false } } toggling prefs.dark without mutating prefs.\n\nHints:\n- Spread both outer and inner objects: setUser(prev => ({ ...prev, prefs: { ...prev.prefs, dark: !prev.prefs.dark } })).",
          "keyTakeaways": [
            "Use functional updaters setState(prev => ...) whenever the next state depends on the previous state",
            "Never mutate arrays or objects in state directly — React relies on new references to detect updates",
            "Use spread (...), map(), and filter() for clean immutable state updates"
          ]
        },
        {
          "title": "Controlled Forms & Avoiding Derived State",
          "duration": "1h 25m",
          "introduction": "Controlled inputs keep React state as the single source of truth — and learning what NOT to put in useState keeps your components half as long and bug-free.",
          "objectives": [
            "Wire controlled inputs using value + onChange",
            "Handle multi-field forms cleanly with e.target.name",
            "Eliminate redundant derived state by computing values during render"
          ],
          "notes": "### Controlled Components\nIn a **controlled input**, React state drives the input's `value`, and `onChange` updates state on every keystroke:\n```jsx\n<input value={email} onChange={(e) => setEmail(e.target.value)} />\n```\nBecause React controls `value`, you can format input, disable Submit dynamically, or reset the form with `setEmail('')`.\n\n### Don't Mirror Props or Compute State in `useEffect`!\nA classic React anti-pattern is storing `filteredItems` in a second `useState` and syncing it with `useEffect` whenever `search` changes. That causes an unnecessary extra render and sync bugs!\nInstead, **derive it directly during render**:\n```js\nconst filteredItems = items.filter(item =>\n  item.name.toLowerCase().includes(query.toLowerCase())\n);\n```\nWhenever `items` or `query` changes, the component re-renders and `filteredItems` is guaranteed to be 100% in sync.",
          "codeExample": "import { useState } from 'react';\n\nconst COURSES = ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'Python'];\n\nexport function CourseSearch() {\n  const [query, setQuery] = useState('');\n\n  // Derived directly during render — no extra useState or useEffect needed!\n  const matches = COURSES.filter((c) =>\n    c.toLowerCase().includes(query.trim().toLowerCase())\n  );\n\n  return (\n    <div>\n      <input\n        type=\"search\"\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        placeholder=\"Filter courses...\"\n      />\n      <p>Showing {matches.length} of {COURSES.length}</p>\n      <ul>\n        {matches.map((name) => <li key={name}>{name}</li>)}\n      </ul>\n    </div>\n  );\n}",
          "codeExplanation": "1. query is the only piece of state needed.\n2. matches is derived inline during render from query and COURSES, eliminating synchronization bugs and extra render passes.\n\nHow to Run & Expected Output:\nType \"js\" or \"react\" into the search box; the count and list update instantaneously.",
          "practiceExercise": "Guided Exercise:\n1. Add a \"Clear\" button next to the search input that resets query to ''.\n\nIndependent Challenge:\nBuild a controlled checkbox \"Show only free courses\" and combine both filters during render without adding a filteredCourses useState.\n\nHints:\n- If you can calculate it from existing props or state, don't put it in useState!",
          "keyTakeaways": [
            "Controlled inputs bind value={state} and onChange={...} so React is the single source of truth",
            "Use [e.target.name]: e.target.value to share one change handler across multiple inputs",
            "Never duplicate derivable data (like filtered lists or totals) in separate useState + useEffect"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does calling setCount(count + 1) three times in one click handler only increment count by 1?",
          "options": [
            "React ignores duplicate state updates",
            "count is a fixed snapshot for that render, so all three calls queue the exact same value",
            "useState only accepts strings",
            "React limits updates to 1 per second"
          ],
          "correctAnswer": 1,
          "explanation": "State variables act as constants within a render. Pass a functional updater setCount(prev => prev + 1) to chain updates."
        },
        {
          "question": "What happens if you run items.push(\"new\"); setItems(items); in React?",
          "options": [
            "React throws a compile error",
            "React sees the same array reference and may skip re-rendering the component",
            "React automatically clones the array",
            "The page reloads"
          ],
          "correctAnswer": 1,
          "explanation": "React uses Object.is reference comparison; mutating the existing array keeps the same reference, so React thinks nothing changed."
        },
        {
          "question": "How should you compute filteredItems from items and searchQuery?",
          "options": [
            "Store filteredItems in a second useState and sync it inside useEffect",
            "Compute filteredItems directly during render from items and searchQuery",
            "Store it in localStorage first",
            "Use document.getElementById"
          ],
          "correctAnswer": 1,
          "explanation": "Deriving values directly during render avoids redundant state, extra render cycles, and out-of-sync bugs."
        },
        {
          "question": "What makes an <input> a \"controlled component\" in React?",
          "options": [
            "It uses defaultValue instead of value",
            "Its value prop is driven by React state and updated via onChange",
            "It has the required HTML attribute",
            "It is wrapped in a <div>"
          ],
          "correctAnswer": 1,
          "explanation": "A controlled input’s displayed value is explicitly controlled by React state via value and onChange."
        }
      ]
    },
    {
      "title": "Module 3: Side Effects, Data Fetching & Custom Hooks",
      "duration": "2h 45m",
      "objectives": [
        "Use useEffect strictly for synchronizing with external systems (APIs, timers, DOM listeners)",
        "Configure dependency arrays accurately and avoid stale closures or infinite loops",
        "Prevent race conditions and memory leaks with cleanup functions and AbortController",
        "Extract reusable stateful logic into Custom Hooks (useFetch, useDebounce)"
      ],
      "notes": "### Module Introduction\n`useEffect` is one of the most misunderstood React hooks. It is **not** for transforming data or handling button clicks — it is an escape hatch to synchronize your component with external systems like network APIs, timers, and browser subscriptions.\n\n### Prerequisites\n- Completion of Modules 1 & 2 (JSX, state, closures) and JS Async/Fetch.\n\n### How the Lessons Connect\n- **Lesson 1** teaches `useEffect` dependency rules, cleanup functions, and cancelling stale fetches with `AbortController`.\n- **Lesson 2** shows how to package reusable effect + state patterns into clean **Custom Hooks** (`useDebounce`, `useFetch`).\n\n### Module Summary\nYou will fetch API data safely without race conditions and build clean custom hooks that keep UI components concise.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Debounced Live API Search assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a live GitHub/User Search input that waits 350ms after the user stops typing (debouncing) and cancels any previous in-flight API request if the user types again before the response arrives.\n\nObjectives:\n- Build a reusable useDebounce(value, delayMs) custom hook with timer cleanup.\n- Fetch data inside useEffect using AbortController to eliminate race conditions.\n\nRequirements:\n1. Implement useDebounce(value, delay = 350) using useState + useEffect + clearTimeout cleanup.\n2. Implement a search component that passes debouncedQuery into a data-fetching useEffect.\n3. Track loading, error, and results states cleanly.\n4. Cancel in-flight requests in the effect cleanup: return () => controller.abort(); and ignore AbortError.\n\nStep-by-Step Instructions:\n1. Create hooks/useDebounce.js and test it with a rapid-typing input.\n2. Wire the debounced value to a fetch effect targeting https://jsonplaceholder.typicode.com/users?q=<query> (or filter locally/API).\n3. Simulate Slow 3G in Chrome DevTools Network tab and type quickly to verify old requests show \"(canceled)\" in the Network panel!\n\nDeliverables:\n- useDebounce.js and SearchUsers.jsx.\n\nEvaluation Criteria:\n- Cleanup clears timeout on every keystroke.\n- AbortController cancels stale requests cleanly without setting error state on AbortError.",
      "lessons": [
        {
          "title": "useEffect Lifecycle, Dependencies & Race Conditions",
          "duration": "1h 25m",
          "introduction": "If a user clicks \"Module 1\" then quickly clicks \"Module 2\", and Module 1’s slower API response arrives last, your UI shows the wrong module! Cleanup + AbortController fixes this.",
          "objectives": [
            "Understand when effects run based on the dependency array ([], [id], omitted)",
            "Write cleanup functions for timers, listeners, and subscriptions",
            "Cancel stale fetch() calls with AbortController inside useEffect cleanup"
          ],
          "notes": "### Dependency Array Rules\n- **`useEffect(fn, [])`**: Runs **once** after initial mount (plus twice in Dev StrictMode to verify cleanup works!).\n- **`useEffect(fn, [userId])`**: Runs on mount and whenever `userId` changes.\n- **No array**: Runs after *every single render* — rarely what you want, and causes infinite loops if it calls `setState`!\n\n### Always Include Every Reactive Value Used Inside\nIf your effect reads `userId` or `API_URL`, include it in the dependency array. Never silence ESLint's `exhaustive-deps` rule blindly — fix the root cause instead.\n\n### Preventing Race Conditions with `AbortController`\nBefore React runs your effect again (because `userId` changed) or unmounts the component, React executes the **cleanup function** you `return` from `useEffect`:\n```js\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch(`/api/users/${userId}`, { signal: controller.signal })\n    ...\n  return () => controller.abort();\n}, [userId]);\n```\nIf `userId` changes from `1` to `2`, React automatically aborts request `1` before starting request `2`!",
          "codeExample": "import { useState, useEffect } from 'react';\n\nexport function UserViewer({ userId }) {\n  const [user, setUser] = useState(null);\n  const [error, setError] = useState('');\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setError('');\n\n    const load = async () => {\n      try {\n        const res = await fetch(\n          `https://jsonplaceholder.typicode.com/users/${userId}`,\n          { signal: controller.signal }\n        );\n        if (!res.ok) throw new Error(`HTTP ${res.status}`);\n        setUser(await res.json());\n      } catch (err) {\n        if (err.name !== 'AbortError') setError(err.message);\n      }\n    };\n\n    load();\n    return () => controller.abort();\n  }, [userId]);\n\n  if (error) return <p>{error}</p>;\n  if (!user) return <p>Loading...</p>;\n  return <h3>{user.name}</h3>;\n}",
          "codeExplanation": "1. Notice the effect callback itself is synchronous; an inner async function load() is defined and called inside it (because useEffect must return either nothing or a cleanup function, not a Promise!).\n2. controller.signal links the fetch to the cleanup function () => controller.abort().\n3. Catching err.name !== 'AbortError' prevents intentional cancellations from flashing an error message.\n\nHow to Run & Expected Output:\nRender <UserViewer userId={1} /> and switch userId rapidly from 1 to 2 to 3; only user 3’s data ever renders.",
          "practiceExercise": "Guided Exercise:\n1. Build a <WindowWidth /> component that subscribes to window.addEventListener('resize', ...) inside useEffect and removes the listener in cleanup.\n\nIndependent Challenge:\nAdd a loading boolean to UserViewer and verify loading resets cleanly when switching userId.\n\nHints:\n- Never write useEffect(async () => ...)! Always declare the async helper inside the effect.",
          "keyTakeaways": [
            "useEffect synchronizes with external systems (APIs, timers, DOM events), not derived state",
            "Never make the useEffect callback itself async — define an async function inside it",
            "Always return a cleanup function to clear timers, listeners, and abort stale fetches",
            "Include all reactive values read by the effect in the dependency array"
          ]
        },
        {
          "title": "Building Reusable Custom Hooks",
          "duration": "1h 20m",
          "introduction": "When two components need the same debouncing, localStorage syncing, or window-size logic, Custom Hooks let you share stateful behavior cleanly.",
          "objectives": [
            "Follow the Rules of Hooks (call only at top level, name starts with use)",
            "Build a reusable useDebounce hook",
            "Understand that each component calling a custom hook gets its own isolated state"
          ],
          "notes": "### What Is a Custom Hook?\nA custom hook is simply a JavaScript function whose name starts with **`use`** (e.g., `useDebounce`, `useLocalStorage`) and that calls built-in hooks (`useState`, `useEffect`) internally.\n\n### The Two Rules of Hooks\n1. **Only call Hooks at the top level**: Never inside `if`, `for`, or nested callbacks. React tracks hooks by their exact call order on every render!\n2. **Only call Hooks from React function components or Custom Hooks**.\n\n### Important Mental Model\nCalling `useDebounce` in Component A and Component B **does NOT share state** between A and B — each call creates completely independent state, just like calling `useState` twice.\n\n### Common Mistakes & Solutions\n- **Mistake**: Breaking React's Rules of Hooks (calling hooks conditionally) or failing to isolate async/render errors.\n  - **Solution**: Keep hooks unconditionally at the top level and use Error Boundaries + `try/catch` at the right boundaries.",
          "codeExample": "import { useState, useEffect } from 'react';\n\nexport function useDebounce(value, delayMs = 300) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const timerId = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delayMs);\n\n    return () => clearTimeout(timerId);\n  }, [value, delayMs]);\n\n  return debouncedValue;\n}",
          "codeExplanation": "1. Whenever value changes, useEffect schedules a timer for delayMs milliseconds.\n2. If value changes again *before* delayMs elapses, React runs the cleanup function clearTimeout(timerId), cancelling the old timer and restarting the countdown.\n3. Only after the user pauses typing for delayMs does debouncedValue update!\n\nHow to Run & Expected Output:\nCall const debouncedQuery = useDebounce(query, 350); inside a search component and watch API calls fire only once after typing pauses.",
          "practiceExercise": "Guided Exercise:\n1. Build a useDocumentTitle(title) custom hook that updates document.title in useEffect and restores the previous title on unmount.\n\nIndependent Challenge:\nBuild useLocalStorage(key, initialValue) that reads from localStorage lazily inside useState(() => ...) and syncs changes back in useEffect.\n\nHints:\n- Passing a function to useState(() => readStorage()) is called lazy initialization — it only runs on the very first mount!",
          "keyTakeaways": [
            "Custom hooks start with \"use\" and encapsulate reusable stateful/effect logic",
            "Never call hooks conditionally or inside loops — React relies on consistent call order",
            "Custom hooks share logic, not state: every component instance gets its own isolated state"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must you NOT pass an async function directly as useEffect(async () => { ... }, [])?",
          "options": [
            "async/await is unsupported in React",
            "An async function returns a Promise instead of a cleanup function (or undefined), breaking React’s cleanup mechanism",
            "It causes an immediate syntax error in Vite",
            "It blocks the browser UI thread"
          ],
          "correctAnswer": 1,
          "explanation": "useEffect expects either undefined or a synchronous cleanup function as its return value, never a Promise."
        },
        {
          "question": "How does AbortController prevent race conditions inside a data-fetching useEffect?",
          "options": [
            "It caches responses in localStorage",
            "The effect cleanup calls controller.abort(), cancelling any older in-flight request when dependencies change",
            "It forces fetch() to run synchronously",
            "It retries failed requests automatically"
          ],
          "correctAnswer": 1,
          "explanation": "Aborting the previous request in the cleanup function ensures an older slow response cannot overwrite a newer selection."
        },
        {
          "question": "What happens if two different components both call your custom hook useCounter()?",
          "options": [
            "They share the same global count variable",
            "Each component receives its own completely independent state and effects",
            "React throws a duplicate hook error",
            "The second component resets the first component"
          ],
          "correctAnswer": 1,
          "explanation": "Custom hooks reuse stateful logic, not state itself; each component instance maintains its own state."
        },
        {
          "question": "Why must Hooks never be called inside an if (...) condition?",
          "options": [
            "Hooks cannot read boolean values",
            "React relies on hooks being called in the exact same order on every render to match state slots",
            "if statements are not allowed in JSX",
            "It disables StrictMode"
          ],
          "correctAnswer": 1,
          "explanation": "React stores hook state in an ordered internal list per component; conditional calls shift the indices and corrupt state."
        }
      ]
    },
    {
      "title": "Module 4: Context API & Global State Architecture",
      "duration": "2h 30m",
      "objectives": [
        "Eliminate deep prop drilling with React.createContext and useContext",
        "Build a clean AuthProvider + custom useAuth() hook pattern",
        "Optimize Context performance by memoizing values and splitting fast/slow contexts",
        "Know when Context is appropriate vs. local state or external state stores"
      ],
      "notes": "### Module Introduction\nPassing `user`, `theme`, or `logout` through 5 layers of intermediate components that don't even use them is called **prop drilling**. React's **Context API** teleports shared values directly to any nested descendant — when designed carefully to avoid unnecessary re-renders.\n\n### Prerequisites\n- Completion of Modules 1–3 (props, state, custom hooks).\n\n### How the Lessons Connect\n- **Lesson 1** builds the production `AuthProvider` + `useAuth()` pattern used across real React apps (including Cortex!).\n- **Lesson 2** explains Context re-render behavior, `useMemo` on Provider values, and splitting separate Providers.\n\n### Module Summary\nYou will architect clean global Auth and Theme providers without prop drilling or sluggish full-tree re-renders.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Theme + Auth Context Provider assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nAn application currently passes user and theme props through 4 layout components. Refactor it using a clean AuthContext + ThemeContext architecture with custom consumer hooks and memoized values.\n\nObjectives:\n- Encapsulate Context creation and Provider state cleanly in dedicated files.\n- Guard consumer hooks so calling them outside a Provider throws a helpful developer error.\n- Avoid unnecessary consumer re-renders by separating ThemeContext from AuthContext and memoizing Provider value objects.\n\nRequirements:\n1. Create ThemeContext.jsx exporting ThemeProvider and useTheme().\n2. Create AuthContext.jsx exporting AuthProvider and useAuth() with login(user) and logout() actions.\n3. Wrap value objects with useMemo and action callbacks with useCallback.\n4. Throw new Error('useAuth must be used inside AuthProvider') if context is null.\n\nStep-by-Step Instructions:\n1. Build ThemeContext.jsx and AuthContext.jsx.\n2. Compose them in App.jsx around a Navbar (reads user & theme) and Dashboard (reads user).\n3. Test toggling theme in React DevTools Profiler to confirm Auth-only consumers don't wastefully re-render when theme flips!\n\nDeliverables:\n- ThemeContext.jsx, AuthContext.jsx, and a small demo App.jsx.\n\nEvaluation Criteria:\n- Separate contexts for independent concerns (theme vs auth).\n- Helpful error thrown when custom hook is used outside Provider.\n- Memoized context value objects.",
      "lessons": [
        {
          "title": "Context API & AuthProvider Pattern",
          "duration": "1h 15m",
          "introduction": "Instead of exporting raw Context objects and calling useContext(AuthContext) in 20 files, wrapping it in a Provider + useAuth() hook creates a clean API.",
          "objectives": [
            "Create a Context with createContext(null)",
            "Encapsulate state inside a dedicated <AuthProvider> component",
            "Expose a custom useAuth() hook with a clear boundary error"
          ],
          "notes": "### The 3-Step Context Pattern\n1. **Create**: `const AuthContext = createContext(null);`\n2. **Provide**: Build an `AuthProvider({ children })` component that holds `useState` for `user` and wraps `{children}` in `<AuthContext.Provider value={...}>`.\n3. **Consume via Custom Hook**: Export `useAuth()` that calls `useContext(AuthContext)` and throws a clear error if used outside `<AuthProvider>`!\n\n### Why Not Put Everything in One Giant AppContext?\nIf you put `user`, `theme`, `cart`, and `searchQuery` into one giant Context, **every consumer re-renders whenever ANY field changes** — typing one letter in search would re-render the footer and sidebar! Keep Contexts focused by domain.\n\n### Common Mistakes & Solutions\n- **Mistake**: Breaking React's Rules of Hooks (calling hooks conditionally) or failing to isolate async/render errors.\n  - **Solution**: Keep hooks unconditionally at the top level and use Error Boundaries + `try/catch` at the right boundaries.",
          "codeExample": "import { createContext, useContext, useState, useMemo, useCallback } from 'react';\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n\n  const login = useCallback((userData) => setUser(userData), []);\n  const logout = useCallback(() => setUser(null), []);\n\n  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);\n\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) {\n    throw new Error('useAuth must be used within an AuthProvider');\n  }\n  return ctx;\n}",
          "codeExplanation": "1. AuthContext starts as null so missing Providers are caught immediately.\n2. AuthProvider wraps login and logout in useCallback and the value object in useMemo so consumers don't re-render when unrelated parent components render.\n3. useAuth() gives every component a single clean import without importing both useContext and AuthContext.\n\nHow to Run & Expected Output:\nWrap <App /> in <AuthProvider> and call const { user, login, logout } = useAuth(); in any nested component.",
          "practiceExercise": "Guided Exercise:\n1. Render a component calling useAuth() *outside* <AuthProvider> temporarily to verify the helpful error message appears.\n\nIndependent Challenge:\nAdd a boolean isAuthenticated: Boolean(user) property to the memoized AuthProvider value object.\n\nHints:\n- Remember to keep <AuthProvider> near the top of your component tree (usually in App.jsx or main.jsx).",
          "keyTakeaways": [
            "Context solves prop drilling for low-frequency global concerns like Auth, Theme, and Locale",
            "Pair every Context with a Provider component and a guarded custom hook (useAuth)",
            "Keep Contexts small and domain-focused rather than one giant global Context"
          ]
        },
        {
          "title": "Context Performance & Splitting Providers",
          "duration": "1h 15m",
          "introduction": "Whenever a Context Provider’s value reference changes, every component calling useContext on it re-renders. Two simple habits keep Context fast.",
          "objectives": [
            "Prevent accidental new-object references on Provider renders using useMemo",
            "Split read-only state and dispatch/actions (or fast vs slow contexts) when needed",
            "Know when local state or URL state is better than Context"
          ],
          "notes": "### Why `value={{ user, login }}` Causes Extra Renders\nIf `AuthProvider`'s parent re-renders and you wrote `<AuthContext.Provider value={{ user, login }}>` inline, `{{ ... }}` creates a **brand-new object reference** on every render — forcing every `useAuth()` consumer to re-render even though `user` didn't change!\nWrapping `value` in `useMemo(() => ({ user, login }), [user, login])` solves that immediately.\n\n### Splitting State vs. Dispatch (or Fast vs. Slow Contexts)\nIf a dashboard header only *reads* `items.length` while an \"Add Item\" button only *calls* `addItem`, splitting `ItemsStateContext` and `ItemsDispatchContext` means the \"Add Item\" button **never re-renders** when items change!\n\n### When NOT to Use Context\nDon't put high-frequency animations, mouse coordinates, or single-form field values in Context — keep those in local `useState` or dedicated stores like Zustand.",
          "codeExample": "import { createContext, useContext, useReducer } from 'react';\n\nconst CartStateContext = createContext(null);\nconst CartDispatchContext = createContext(null);\n\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case 'ADD': return [...state, action.item];\n    case 'CLEAR': return [];\n    default: return state;\n  }\n}\n\nexport function CartProvider({ children }) {\n  const [items, dispatch] = useReducer(cartReducer, []);\n  return (\n    <CartStateContext.Provider value={items}>\n      <CartDispatchContext.Provider value={dispatch}>\n        {children}\n      </CartDispatchContext.Provider>\n    </CartStateContext.Provider>\n  );\n}\n\nexport const useCartItems = () => useContext(CartStateContext);\nexport const useCartDispatch = () => useContext(CartDispatchContext);",
          "codeExplanation": "1. useReducer gives a stable dispatch function whose reference never changes across renders.\n2. CartDispatchContext consumers (like \"Add to Cart\" buttons) never re-render when items change because dispatch is always identical!\n3. CartStateContext consumers (like the navbar badge) re-render only when items actually updates.\n\nHow to Run & Expected Output:\nMount <CartProvider> with a button calling useCartDispatch() and a badge reading useCartItems().",
          "practiceExercise": "Guided Exercise:\n1. Add a 'REMOVE' case to cartReducer that filters out an item by action.id.\n\nIndependent Challenge:\nVerify with console.log inside an AddToCartButton component using useCartDispatch() that it does NOT re-render when items are added.\n\nHints:\n- React guarantees the dispatch function returned by useReducer has a stable identity for the lifetime of the component.",
          "keyTakeaways": [
            "Always memoize inline Provider value objects with useMemo",
            "Splitting State and Dispatch contexts prevents action-only buttons from re-rendering",
            "Avoid putting high-frequency state (like typing or scroll position) into broad Contexts"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens if you pass an inline object value={{ user, logout }} to <AuthContext.Provider> without useMemo?",
          "options": [
            "React throws a syntax error",
            "Every Provider re-render creates a new object reference, forcing all consumers to re-render unnecessarily",
            "Consumers receive undefined",
            "logout stops working"
          ],
          "correctAnswer": 1,
          "explanation": "An inline object literal creates a new reference on every render, triggering re-renders in all context consumers."
        },
        {
          "question": "Why do developers wrap useContext(AuthContext) inside a custom useAuth() hook?",
          "options": [
            "React forbids calling useContext directly in pages",
            "It hides implementation details and can throw a clear error if used outside AuthProvider",
            "It makes network requests faster",
            "It persists state to localStorage automatically"
          ],
          "correctAnswer": 1,
          "explanation": "A custom hook provides a clean import and catches missing-Provider mistakes early with a descriptive error."
        },
        {
          "question": "Why does splitting CartStateContext and CartDispatchContext improve performance?",
          "options": [
            "dispatch from useReducer has a stable reference, so components only using dispatch never re-render when state changes",
            "It doubles the memory limit",
            "It enables server-side rendering",
            "It converts objects to arrays"
          ],
          "correctAnswer": 0,
          "explanation": "Because dispatch never changes identity, components that only trigger actions don’t re-render when cart items update."
        },
        {
          "question": "Which kind of state is a POOR fit for React Context?",
          "options": [
            "Current logged-in user profile",
            "Light/dark theme preference",
            "High-frequency mouse-move coordinates or fast-changing keystrokes across an entire app",
            "Selected UI language (locale)"
          ],
          "correctAnswer": 2,
          "explanation": "Context triggers re-renders in all consumers on every change, making it unsuitable for rapid high-frequency updates."
        }
      ]
    },
    {
      "title": "Module 5: React Router v6, Protected Routes & Code Splitting",
      "duration": "2h 45m",
      "objectives": [
        "Configure client-side routing with BrowserRouter, Routes, Route, and dynamic :id params",
        "Navigate declaratively with Link/NavLink and programmatically with useNavigate",
        "Guard authenticated pages with a ProtectedRoute wrapper and Outlet",
        "Reduce initial bundle size using React.lazy and Suspense"
      ],
      "notes": "### Module Introduction\nMulti-view React applications feel instant because **React Router** swaps views in memory without full browser page reloads — while still supporting browser Back/Forward buttons, shareable URLs, and route-level authentication guards.\n\n### Prerequisites\n- Completion of Modules 1–4 (components, hooks, Context AuthProvider).\n\n### How the Lessons Connect\n- **Lesson 1** sets up React Router v6 dynamic routes (`/courses/:id`), `useParams`, and `ProtectedRoute` guards.\n- **Lesson 2** shrinks initial JavaScript downloads using `React.lazy` and `<Suspense>`.\n\n### Module Summary\nYou will structure scalable multi-page SPAs with protected dashboards and fast lazy-loaded routes.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Multi-Route Protected App Shell assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a multi-page React Router v6 application shell featuring public pages (Home, Courses, CourseDetail with :id), a Login page, a Protected Student Dashboard, a 404 fallback route, and lazy-loaded route chunks.\n\nObjectives:\n- Configure nested/protected routes cleanly using <Outlet /> and <Navigate replace />.\n- Lazy-load heavy pages using React.lazy and <Suspense>.\n\nRequirements:\n1. Routes: /, /courses, /courses/:id, /login, /dashboard (protected), and * (404 NotFound).\n2. ProtectedRoute reads { user, loading } from useAuth(); shows spinner while loading, redirects to /login with state={{ from: location }} if unauthenticated, and renders <Outlet /> if authenticated.\n3. CourseDetail reads const { id } = useParams().\n4. Lazy-load Dashboard and CourseDetail using React.lazy(() => import(...)) inside <Suspense fallback={<Spinner />} />.\n\nStep-by-Step Instructions:\n1. Wrap the app in <BrowserRouter> and <AuthProvider>.\n2. Implement ProtectedRoute.jsx using <Outlet /> and <Navigate to=\"/login\" replace state={{ from: location }} />.\n3. Wrap <Routes> in <Suspense>.\n4. Test visiting /dashboard while logged out -> redirects to /login; log in -> navigates back to /dashboard!\n\nDeliverables:\n- App.jsx and ProtectedRoute.jsx.\n\nEvaluation Criteria:\n- Uses replace on auth redirect so Back button doesn't trap the user.\n- Preserves intended destination via location state.\n- Lazy chunks load cleanly inside Suspense.",
      "lessons": [
        {
          "title": "React Router v6 & Protected Route Guards",
          "duration": "1h 25m",
          "introduction": "Client-side routing lets your Single Page Application feel like a multi-page website while keeping shared navbars and Auth state alive.",
          "objectives": [
            "Read dynamic URL segments with useParams() and query strings with useSearchParams()",
            "Use Link/NavLink instead of <a href> to avoid full-page reloads",
            "Implement ProtectedRoute with <Navigate replace /> and <Outlet />"
          ],
          "notes": "### Client-Side Navigation vs `<a href>`\nUsing `<a href=\"/courses\">` triggers a **full browser reload**, wiping all React state and re-downloading JS! Always use React Router's `<Link to=\"/courses\">` or `<NavLink>` (which automatically receives an `isActive` boolean for styling the active nav link!).\n\n### Dynamic Params & 404s\n- `<Route path=\"/courses/:id\" element={<CourseDetail />} />` -> inside `CourseDetail`, `const { id } = useParams();`.\n- `<Route path=\"*\" element={<NotFound />} />` -> catches any unknown URL cleanly.\n\n### Protected Routes (`<Outlet />` + `replace`)\nA `ProtectedRoute` component checks `useAuth()`:\n1. If auth is still initializing (`loading`), render a loading spinner (don't prematurely redirect!).\n2. If `!user`, return `<Navigate to=\"/login\" replace state={{ from: location }} />`. Adding **`replace`** replaces the protected URL in browser history so pressing the Back button doesn't bounce the user back into a redirect loop!\n3. If `user` exists, return `<Outlet />`, which renders the matched child route.",
          "codeExample": "import { Navigate, Outlet, useLocation } from 'react-router-dom';\nimport { useAuth } from '../context/AuthContext';\n\nexport function ProtectedRoute() {\n  const { user, loading } = useAuth();\n  const location = useLocation();\n\n  if (loading) {\n    return <div className=\"p-8 text-center\">Checking session...</div>;\n  }\n\n  if (!user) {\n    return <Navigate to=\"/login\" replace state={{ from: location }} />;\n  }\n\n  return <Outlet />;\n}\n\n// In App.jsx:\n// <Route element={<ProtectedRoute />}>\n//   <Route path=\"/dashboard\" element={<Dashboard />} />\n// </Route>",
          "codeExplanation": "1. Checking loading first prevents flickering to /login before the token/session check finishes.\n2. <Navigate to=\"/login\" replace state={{ from: location }} /> redirects cleanly without trapping browser Back history and remembers where the user wanted to go.\n3. <Outlet /> renders whichever child route (/dashboard, /settings) matched inside the guard.\n\nHow to Run & Expected Output:\nVisit /dashboard when logged out -> URL changes to /login. Log in and read location.state?.from?.pathname || '/dashboard' to redirect back seamlessly.",
          "practiceExercise": "Guided Exercise:\n1. Build a <Navbar /> using <NavLink to=\"/courses\" className={({ isActive }) => isActive ? 'font-bold text-orange-500' : ''}>.\n\nIndependent Challenge:\nUpdate a Login submit handler to redirect to location.state?.from?.pathname || '/dashboard' using navigate(target, { replace: true }).\n\nHints:\n- Remember SPA hosting servers (like Vercel/Netlify) need a rewrite rule sending all paths to index.html so refreshing /courses/123 directly works!",
          "keyTakeaways": [
            "Use <Link> and <NavLink> for internal SPA navigation instead of <a href>",
            "Read dynamic route parameters with useParams()",
            "Always wait for auth loading to finish before redirecting in ProtectedRoute",
            "Use <Navigate replace /> to avoid Back-button redirect loops"
          ]
        },
        {
          "title": "Code Splitting with React.lazy & Suspense",
          "duration": "1h 20m",
          "introduction": "A user visiting your Home page shouldn’t have to download the heavy Admin Analytics dashboard JavaScript upfront. Code splitting loads routes on demand.",
          "objectives": [
            "Split route bundles dynamically with React.lazy(() => import(...))",
            "Provide fallback loading UIs with <Suspense fallback={...}>",
            "Measure chunk splitting in Vite production builds"
          ],
          "notes": "### Why Code Splitting Matters\nWithout code splitting, Vite bundles every page, chart library, and markdown parser into a single giant `index.js` file. On slower mobile networks, users stare at a blank screen waiting for code they haven't even visited yet!\n\n### Route-Based Splitting with `React.lazy`\n`const Dashboard = React.lazy(() => import('./pages/Dashboard'));`\nVite automatically splits `Dashboard` into its own separate `.js` chunk file. The browser downloads it **only** when the user navigates to `/dashboard`.\nAlways wrap lazy components in `<Suspense fallback={<PageLoader />}>`, which displays your fallback spinner while the chunk downloads.\n\n### Gotcha: Named vs. Default Exports\n`React.lazy` expects the imported module to have a **`default` export** (`export default Dashboard;`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Breaking React's Rules of Hooks (calling hooks conditionally) or failing to isolate async/render errors.\n  - **Solution**: Keep hooks unconditionally at the top level and use Error Boundaries + `try/catch` at the right boundaries.",
          "codeExample": "import { Suspense, lazy } from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport Home from './pages/Home'; // Eagerly loaded for instant first paint\n\nconst Dashboard = lazy(() => import('./pages/Dashboard'));\nconst InstructorPanel = lazy(() => import('./pages/InstructorPanel'));\n\nexport function AppRoutes() {\n  return (\n    <Suspense fallback={<div className=\"p-8 text-center\">Loading page...</div>}>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n        <Route path=\"/instructor\" element={<InstructorPanel />} />\n      </Routes>\n    </Suspense>\n  );\n}",
          "codeExplanation": "1. Home is imported normally so the initial landing page renders immediately with zero extra network round-trip.\n2. Dashboard and InstructorPanel are lazy-loaded via dynamic import(), creating separate Vite build chunks.\n3. <Suspense> catches the pending lazy Promise and renders a clean fallback while the chunk downloads.\n\nHow to Run & Expected Output:\nRun `npm run build` in a Vite project and inspect dist/assets/ — you will see separate JS chunks for Dashboard and InstructorPanel.",
          "practiceExercise": "Guided Exercise:\n1. Convert a heavy modal or secondary page in a React app to React.lazy and wrap it in <Suspense>.\n\nIndependent Challenge:\nInspect Chrome DevTools -> Network -> JS filter while clicking to a lazy route to observe the new chunk downloading on demand.\n\nHints:\n- Don't lazy-load your main Home hero — keep the critical first-paint route in the main bundle!",
          "keyTakeaways": [
            "React.lazy(() => import(...)) splits routes into on-demand JavaScript chunks",
            "Wrap lazy components in <Suspense fallback={...}> to show a loading indicator during download",
            "Keep the landing Home page eager for fast initial paint; lazy-load secondary/heavy routes"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should internal navigation in a React SPA use <Link to=\"/courses\"> instead of <a href=\"/courses\">?",
          "options": [
            "<Link> automatically styles buttons orange",
            "<a href> triggers a full browser reload, wiping React memory/state, whereas <Link> updates the URL via History API without reloading",
            "<a> tags do not work in React 18",
            "<Link> skips React Router completely"
          ],
          "correctAnswer": 1,
          "explanation": "<Link> intercepts clicks to update the URL client-side without tearing down and reloading the entire JavaScript application."
        },
        {
          "question": "In ProtectedRoute, why should you include the replace prop on <Navigate to=\"/login\" replace />?",
          "options": [
            "To delete localStorage",
            "To replace the blocked route in browser history so pressing the Back button doesn’t loop back into the protected redirect",
            "To force a full page refresh",
            "To clear URL query parameters"
          ],
          "correctAnswer": 1,
          "explanation": "replace overwrites the current history entry instead of pushing, preventing an annoying Back-button redirect loop."
        },
        {
          "question": "What does React.lazy(() => import(\"./pages/Dashboard\")) require from Dashboard.jsx?",
          "options": [
            "Dashboard must be a class component",
            "Dashboard.jsx must have a default export",
            "Dashboard.jsx must not use hooks",
            "Dashboard.jsx must be in the public/ folder"
          ],
          "correctAnswer": 1,
          "explanation": "React.lazy expects a dynamic import resolving to a module with a default export."
        },
        {
          "question": "What is the purpose of <Suspense fallback={<Spinner />}>?",
          "options": [
            "To catch runtime JavaScript exceptions",
            "To display a fallback UI while a lazy-loaded component chunk is still downloading",
            "To memoize Context values",
            "To validate form inputs"
          ],
          "correctAnswer": 1,
          "explanation": "Suspense renders its fallback prop while waiting for lazy child components to finish loading."
        }
      ]
    },
    {
      "title": "Module 6: Performance, Error Boundaries & Testing Mindset",
      "duration": "2h 45m",
      "objectives": [
        "Use React.memo, useMemo, and useCallback intentionally — and avoid premature optimization",
        "Protect apps from white-screen crashes using Error Boundaries",
        "Write user-centric component tests with React Testing Library"
      ],
      "notes": "### Module Introduction\nProduction React engineering isn't just making features work on your laptop — it's keeping interfaces snappy at scale, isolating unexpected runtime crashes so the whole page doesn't go blank, and verifying behavior with automated tests.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** teaches when `React.memo`, `useMemo`, and `useCallback` actually help (and when moving state down is better!).\n- **Lesson 2** covers **Error Boundaries** for graceful crash recovery and user-centric component testing principles.\n\n### Module Summary\nYou have completed the React Engineering curriculum — from declarative JSX to production architecture, routing, performance, and resilience.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Resilient Memoized Table & ErrorBoundary Wrapper assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nA data-heavy Analytics Dashboard has two issues: (1) typing in a small clock/note input re-renders an expensive 2,000-row sorted table, and (2) an occasional malformed API widget crashes the entire React app to a blank white screen.\n\nObjectives:\n- Isolate fast-changing state and memoize genuinely expensive computations with useMemo.\n- Wrap risky widgets in a reusable ErrorBoundary with a \"Try Again\" reset button.\n\nRequirements:\n1. Implement <ErrorBoundary fallback={...}> as a React class component implementing getDerivedStateFromError and componentDidCatch, plus a Reset method.\n2. Wrap a deliberate crash-test widget inside <ErrorBoundary> alongside a healthy sibling widget to prove the sibling keeps working!\n3. Demonstrate fixing a slow filter/sort computation on 2,000 items using useMemo(() => ..., [items, sortBy]).\n4. Write 2 unit/component test cases (using Vitest + React Testing Library style assertions) verifying the healthy UI renders and ErrorBoundary catches errors.\n\nStep-by-Step Instructions:\n1. Build ErrorBoundary.jsx with resetError = () => this.setState({ hasError: false }).\n2. Build HeavyTable.jsx with useMemo for sorting/filtering.\n3. Verify in the browser that triggering an error in the widget renders the ErrorBoundary fallback instead of a blank screen.\n\nDeliverables:\n- ErrorBoundary.jsx and HeavyTable.jsx.\n\nEvaluation Criteria:\n- ErrorBoundary isolates crashes to the broken widget only.\n- useMemo dependency array accurately lists every input to the calculation.",
      "lessons": [
        {
          "title": "useMemo, useCallback & Avoiding Premature Optimization",
          "duration": "1h 20m",
          "introduction": "Wrapping every single function in useCallback and every value in useMemo makes code harder to read and can actually make it slower. Here is how to optimize smartly.",
          "objectives": [
            "Profile and fix slow renders first by moving state down (composition) before reaching for memoization",
            "Use useMemo for genuinely expensive calculations or stable object references",
            "Pair useCallback with React.memo children to skip expensive child re-renders"
          ],
          "notes": "### First Try Structural Fixes (Zero Memoization Needed!)\nBefore adding `useMemo`, ask:\n1. **Can I move state down?** If a modal toggle state lives at the top of `App.jsx`, toggling it re-renders the whole app. Move that state into a small `<ModalButton />` component!\n2. **Can I pass slow children as `children`?** A wrapper holding fast-changing scroll state won't re-render `{children}` passed from above!\n\n### When `useMemo` & `useCallback` Actually Help\n- **`useMemo(() => expensiveSort(rows), [rows])`**: Caches the return *value* across renders until dependencies change. Worth it for large datasets (thousands of items) or keeping object identity stable for a `useEffect`/`React.memo` child.\n- **`useCallback(fn, [deps])`**: Caches the *function reference* itself. **Note**: `useCallback` alone does NOTHING if the child isn't wrapped in `React.memo` (or using it in a `useEffect` dependency array)!",
          "codeExample": "import { useState, useMemo, memo } from 'react';\n\nconst ExpensiveChart = memo(function ExpensiveChart({ data }) {\n  console.log('ExpensiveChart rendered');\n  return <div>Data points: {data.length}</div>;\n});\n\nexport function AnalyticsPanel({ rows }) {\n  const [note, setNote] = useState('');\n\n  // Only recomputes when rows changes — typing in 'note' skips sorting!\n  const sortedRows = useMemo(() => {\n    return [...rows].sort((a, b) => b.score - a.score);\n  }, [rows]);\n\n  return (\n    <div>\n      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder=\"Quick note\" />\n      <ExpensiveChart data={sortedRows} />\n    </div>\n  );\n}",
          "codeExplanation": "1. Without useMemo, typing a single character in note would re-sort rows AND create a new sortedRows array reference, forcing ExpensiveChart to re-render!\n2. With useMemo + memo(ExpensiveChart), sortedRows keeps the exact same reference while typing notes, so ExpensiveChart skips re-rendering completely.\n\nHow to Run & Expected Output:\nType into the note input and check the Console: \"ExpensiveChart rendered\" logs once on mount, never on keystrokes.",
          "practiceExercise": "Guided Exercise:\n1. Remove useMemo temporarily from AnalyticsPanel and watch \"ExpensiveChart rendered\" log on every keystroke, then restore useMemo.\n\nIndependent Challenge:\nRefactor a parent component with a ticking timer so the timer state lives in a small <Clock /> child instead of re-rendering the parent.\n\nHints:\n- Measure first with React DevTools Profiler before adding memoization everywhere.",
          "keyTakeaways": [
            "Move fast-changing state down into smaller leaf components before reaching for memoization",
            "useMemo caches a computed value/reference; useCallback caches a function reference",
            "useCallback only prevents child re-renders when paired with React.memo on the child"
          ]
        },
        {
          "title": "Error Boundaries & Graceful Degradation",
          "duration": "1h 25m",
          "introduction": "By default in React, an uncaught JavaScript error inside any single component unmounts your ENTIRE component tree — leaving users staring at a blank white page.",
          "objectives": [
            "Explain why Error Boundaries prevent full-app white-screen crashes",
            "Implement getDerivedStateFromError and componentDidCatch in an ErrorBoundary class",
            "Test components from a user’s perspective using React Testing Library"
          ],
          "notes": "### Error Boundaries\nAn **Error Boundary** is a React class component that catches JavaScript errors anywhere in its child component tree during rendering, lifecycle methods, or constructors — and renders a friendly fallback UI instead of crashing the whole app.\n*(Note: Error Boundaries do NOT catch async errors inside `fetch` or `onClick` handlers — handle those with `try/catch`!)*\n\n### User-Centric Testing Mindset\nWhen writing tests with **Vitest + React Testing Library**:\n- Query elements the way users find them: `screen.getByRole('button', { name: /submit/i })` or `screen.getByLabelText(/email/i)`, not fragile CSS classes or internal state.\n- Test **behavior**, not implementation details: simulate clicks/typing and assert what appears on screen.\n\n### Common Mistakes & Solutions\n- **Mistake**: Breaking React's Rules of Hooks (calling hooks conditionally) or failing to isolate async/render errors.\n  - **Solution**: Keep hooks unconditionally at the top level and use Error Boundaries + `try/catch` at the right boundaries.",
          "codeExample": "import React from 'react';\n\nexport class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, info) {\n    console.error('UI ErrorBoundary caught:', error, info.componentStack);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div role=\"alert\" className=\"p-6 border rounded-xl bg-red-50\">\n          <h3>Something went wrong in this section.</h3>\n          <button onClick={() => this.setState({ hasError: false })}>\n            Try Again\n          </button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}",
          "codeExplanation": "1. getDerivedStateFromError updates state synchronously so the next render displays the fallback UI.\n2. componentDidCatch logs the error and React component stack (ideal for sending to Sentry/monitoring).\n3. \"Try Again\" resets hasError to false so the user can recover without refreshing the whole tab.\n\nHow to Run & Expected Output:\nWrap a component that throws new Error('Test crash') inside <ErrorBoundary>. The page stays alive and displays the alert box with \"Try Again\".",
          "practiceExercise": "Guided Exercise:\n1. Wrap two sibling widgets in separate <ErrorBoundary> components and verify crashing Widget A leaves Widget B fully interactive.\n\nIndependent Challenge:\nWrite a Vitest + React Testing Library test asserting that rendering <ErrorBoundary><Bomb /></ErrorBoundary> shows role=\"alert\" with \"Something went wrong\".\n\nHints:\n- Remember try/catch is still needed inside async functions and click handlers because Error Boundaries only catch render/lifecycle errors.",
          "keyTakeaways": [
            "Error Boundaries catch render-phase errors and prevent blank white-screen crashes",
            "Error Boundaries do NOT catch errors inside event handlers or async callbacks (use try/catch there)",
            "Test components via accessible roles and user interactions rather than internal state"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When does wrapping a handler in useCallback actually prevent a child component from re-rendering?",
          "options": [
            "Always automatically on every child",
            "Only when the child component is wrapped in React.memo (or uses the function in useEffect deps)",
            "Only inside class components",
            "Never — useCallback only works for numbers"
          ],
          "correctAnswer": 1,
          "explanation": "By default React re-renders children whenever their parent renders; useCallback preserves function identity so React.memo can skip re-rendering."
        },
        {
          "question": "What is the cleanest way to stop a ticking 1-second clock from re-rendering an entire Dashboard?",
          "options": [
            "Put the timer inside Context",
            "Move the timer state down into a small dedicated <Clock /> component",
            "Wrap every HTML tag in useMemo",
            "Disable StrictMode"
          ],
          "correctAnswer": 1,
          "explanation": "Colocating fast-changing state inside a small leaf component isolates re-renders naturally without memoization overhead."
        },
        {
          "question": "Which error is NOT caught by a React Error Boundary?",
          "options": [
            "An exception thrown while rendering JSX",
            "An exception thrown inside a constructor",
            "An uncaught error inside an async onClick event handler",
            "An exception thrown inside a child component body"
          ],
          "correctAnswer": 2,
          "explanation": "Error Boundaries catch errors during rendering and lifecycle methods, not inside asynchronous callbacks or event handlers (use try/catch there)."
        },
        {
          "question": "In React Testing Library, which query approach best reflects how real users and assistive tools interact with your UI?",
          "options": [
            "document.querySelector(\".css-123\")",
            "screen.getByRole(\"button\", { name: /save/i })",
            "Checking component internal state variables directly",
            "Snapshot testing every line of CSS"
          ],
          "correctAnswer": 1,
          "explanation": "Querying by accessible role and label tests both UI behavior and accessibility simultaneously."
        }
      ]
    },
    {
      "title": "Module 7: Complex State Machines with useReducer & Immer Patterns",
      "duration": "2h 30m",
      "objectives": [
        "Model complex multi-step UI flows cleanly using useReducer instead of tangled useState flags",
        "Write pure, predictable reducer functions with explicit action types",
        "Combine useReducer + split State/Dispatch Contexts for scalable feature stores"
      ],
      "notes": "### Module Introduction & Description\nWhen a component juggles 5+ interdependent `useState` calls (like a multi-step checkout wizard or quiz engine with `answers`, `submitted`, `score`, `error`, `loading`), scattering `setX` calls across handlers invites impossible states. **`useReducer`** centralizes every valid transition in one pure function!\n\n### Prerequisites\n- Completion of Modules 1–6 (hooks, immutability, Context API).\n\n### Skills Acquired\n- Designing finite-state reducers, pure action transitions, and scalable Context + Reducer stores.\n\n### How the Lessons Connect\n- **Lesson 1** teaches `useReducer` basics and multi-step state transitions.\n- **Lesson 2** pairs `useReducer` with split State/Dispatch Contexts for feature-wide state.\n\n### Completion Criteria\n- Complete both lessons, deliver the Multi-Step Onboarding Wizard Reducer assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a 3-step Course Onboarding Wizard (Step 1: Profile -> Step 2: Track Selection -> Step 3: Review & Confirm) powered by useReducer so invalid state transitions (like jumping to Step 3 with an empty name) are impossible.\n\nObjectives:\n- Centralize all wizard transitions in a pure reducer function testable outside React.\n- Enforce step validation inside transitions cleanly.\n\nRequirements:\n1. Define initialState = { step: 1, name: '', track: 'frontend', submitting: false, error: '' }.\n2. Handle actions: 'UPDATE_FIELD', 'NEXT_STEP', 'PREV_STEP', 'SUBMIT_START', 'SUBMIT_ERROR', 'RESET'.\n3. In 'NEXT_STEP', block advancing from step 1 if state.name.trim().length < 2 and set state.error instead.\n4. Export the pure wizardReducer separately so it can be unit-tested directly.\n\nStep-by-Step Instructions:\n1. Create wizardReducer.js and OnboardingWizard.jsx.\n2. Wire useReducer(wizardReducer, initialState) inside OnboardingWizard.jsx.\n3. Test advancing with empty name vs valid name.\n\nDeliverables:\n- wizardReducer.js and OnboardingWizard.jsx.\n\nEvaluation Criteria:\n- Reducer is 100% pure (never mutates state directly, returns new objects).\n- Throws or ignores unknown actions safely.",
      "lessons": [
        {
          "title": "Modeling Multi-Step Flows with useReducer",
          "duration": "1h 15m",
          "introduction": "A reducer is simply `(currentState, action) => nextState`. Moving state transitions out of JSX click handlers makes complex flows crystal clear.",
          "objectives": [
            "Write pure reducer functions returning new immutable state objects",
            "Dispatch descriptive action objects ({ type, payload }) cleanly"
          ],
          "notes": "### When `useReducer` Beats `useState`\nUse `useReducer` when:\n- One user action updates **multiple related fields simultaneously** (e.g., `SUBMIT_SUCCESS` sets `loading: false`, `error: ''`, `data: payload`).\n- Next state depends heavily on previous state and transition rules.\n- You want to **unit-test your state machine** as a pure JavaScript function without mounting React!\n\n### Common Mistakes & Solutions\n- **Mistake**: Mutating `state.items.push(action.item); return state;` inside a reducer!\n  - **Solution**: Always return a **new** object/array reference so React detects the update.",
          "codeExample": "export const initialQuizState = {\n  answers: {},\n  submitted: false,\n  score: 0\n};\n\nexport function quizReducer(state, action) {\n  switch (action.type) {\n    case 'SELECT_ANSWER':\n      return {\n        ...state,\n        answers: { ...state.answers, [action.qIdx]: action.optIdx }\n      };\n    case 'SUBMIT':\n      return { ...state, submitted: true, score: action.score };\n    case 'RESET':\n      return initialQuizState;\n    default:\n      return state;\n  }\n}",
          "codeExplanation": "1. SELECT_ANSWER clones both state and state.answers immutably.\n2. SUBMIT updates submitted and score atomically in one transition.\n3. Pure quizReducer can be imported and tested directly in Vitest/node:test.\n\nHow to Run & Expected Output:\nCall `quizReducer(initialQuizState, { type: 'SELECT_ANSWER', qIdx: 0, optIdx: 2 })`. Returns `{ answers: { 0: 2 }, submitted: false, score: 0 }` without mutating initialQuizState.",
          "practiceExercise": "Guided Exercise:\n1. Write 2 unit tests calling `quizReducer` directly for `SELECT_ANSWER` and `RESET`.\n\nIndependent Challenge:\nAdd a `SET_ERROR` action that sets `error: action.message` and clears `submitting: false`.\n\nExpected Result:\nPredictable, testable state transitions with zero direct mutations.",
          "keyTakeaways": [
            "useReducer centralizes multi-field state transitions into one pure (state, action) => nextState function",
            "Never mutate state inside a reducer — always return fresh object/array copies",
            "Pure reducers are trivial to unit test without rendering components"
          ]
        },
        {
          "title": "Combining useReducer + Context for Scalable Feature Stores",
          "duration": "1h 15m",
          "introduction": "Pairing useReducer with separate State and Dispatch Contexts gives medium-to-large React features Redux-like clarity with zero external libraries.",
          "objectives": [
            "Provide reducer state and stable dispatch via two split Contexts",
            "Write clean action-dispatching UI components that avoid unnecessary re-renders"
          ],
          "notes": "### Why Split `StateContext` and `DispatchContext`?\nReact guarantees that `dispatch` returned by `useReducer` **never changes identity** across renders. Providing `dispatch` in its own Context means toolbar buttons that only call `dispatch({ type: 'RESET' })` never re-render when `state` updates!",
          "codeExample": "import { createContext, useContext, useReducer } from 'react';\nimport { quizReducer, initialQuizState } from './quizReducer';\n\nconst QuizStateContext = createContext(null);\nconst QuizDispatchContext = createContext(null);\n\nexport function QuizProvider({ children }) {\n  const [state, dispatch] = useReducer(quizReducer, initialQuizState);\n  return (\n    <QuizStateContext.Provider value={state}>\n      <QuizDispatchContext.Provider value={dispatch}>\n        {children}\n      </QuizDispatchContext.Provider>\n    </QuizStateContext.Provider>\n  );\n}\n\nexport const useQuizState = () => useContext(QuizStateContext);\nexport const useQuizDispatch = () => useContext(QuizDispatchContext);",
          "codeExplanation": "1. QuizProvider owns the reducer and exposes state and dispatch through dedicated contexts.\n2. Components calling only useQuizDispatch() stay fast even as answers update frequently.\n\nHow to Run & Expected Output:\nWrap a quiz view in <QuizProvider> and read state with useQuizState() while dispatching selections via useQuizDispatch().",
          "practiceExercise": "Guided Exercise:\n1. Add null guards inside `useQuizState` and `useQuizDispatch` throwing helpful errors if used outside `<QuizProvider>`.\n\nIndependent Challenge:\nAdd a `ResetQuizButton` component consuming only `useQuizDispatch()` and verify via `console.log` it doesn't re-render when answers change.\n\nExpected Result:\nClean feature-level state management with zero prop drilling.",
          "keyTakeaways": [
            "Combine useReducer with split State and Dispatch contexts for scalable feature stores",
            "dispatch has a stable reference for the lifetime of the Provider"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens if a reducer function mutates `state.items.push(x)` and returns `state` directly?",
          "options": [
            "React re-renders twice",
            "React sees the exact same state reference via Object.is and may skip re-rendering the UI",
            "useReducer throws a SyntaxError",
            "The array is reversed"
          ],
          "correctAnswer": 1,
          "explanation": "Reducers must always return a new immutable state reference so React detects the change."
        },
        {
          "question": "Why is a pure reducer easy to unit test?",
          "options": [
            "It runs on the backend",
            "It is a plain JS function `(state, action) => newState` with zero DOM or React rendering required",
            "It automatically mocks fetch()",
            "It uses localStorage"
          ],
          "correctAnswer": 1,
          "explanation": "Pure reducers take plain inputs and return plain outputs, making them testable in milliseconds."
        },
        {
          "question": "Why does React’s `dispatch` from `useReducer` make splitting StateContext and DispatchContext effective?",
          "options": [
            "dispatch is recreated on every render",
            "React guarantees dispatch keeps a stable function reference across renders, so dispatch-only consumers don’t re-render when state changes",
            "dispatch stores data in cookies",
            "Context only accepts functions"
          ],
          "correctAnswer": 1,
          "explanation": "Because dispatch never changes identity, components using only DispatchContext skip re-renders on state updates."
        },
        {
          "question": "When is `useReducer` generally a better choice than `useState`?",
          "options": [
            "For a single boolean modal toggle",
            "When multiple related state fields transition together under clear rules (like wizards, async state machines, or carts)",
            "For static constants",
            "Only in class components"
          ],
          "correctAnswer": 1,
          "explanation": "useReducer shines when multiple interdependent fields update together across distinct named actions."
        }
      ]
    },
    {
      "title": "Module 8: Refs, Portals, Modals & Imperative Browser APIs",
      "duration": "2h 15m",
      "objectives": [
        "Use useRef for both DOM element references (focus, scroll) and mutable non-rendering values (timer IDs)",
        "Understand when NOT to use useRef (never store UI-rendered data in refs)",
        "Render modals and tooltips cleanly outside parent overflow/stacking traps using createPortal"
      ],
      "notes": "### Module Introduction & Description\nReact is declarative, yet occasionally you need to **imperatively focus an input**, store a **timer ID without triggering a re-render**, or render a **modal outside a parent `overflow: hidden` container**. `useRef` and `createPortal` handle these cleanly.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Managing DOM focus/scroll with `useRef`, avoiding `ref.current` reads during render, and escaping stacking contexts with `createPortal`.\n\n### How the Lessons Connect\n- **Lesson 1** covers `useRef` for DOM focus and non-rendering timer/previous-value tracking.\n- **Lesson 2** builds a stacking-context-proof Modal with `createPortal`, Escape key handling, and focus restoration.\n\n### Completion Criteria\n- Complete both lessons, deliver the Accessible Portal Modal with Auto-Focus assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nA Confirm Dialog rendered inside a card with overflow: hidden gets clipped at the card borders, and opening the modal leaves keyboard focus behind on the trigger button. Fix both using createPortal and useRef!\n\nObjectives:\n- Teleport modal DOM nodes into document.body using createPortal.\n- Auto-focus the modal's heading/cancel button on open via useRef.\n\nRequirements:\n1. Build <PortalModal isOpen={...} onClose={...} title=\"...\"> using createPortal(..., document.body).\n2. Use inputRef / closeBtnRef with useEffect(() => { if (isOpen) closeBtnRef.current?.focus(); }, [isOpen]).\n3. Close on Escape keydown (and clean up window keydown listener!).\n4. Prevent body scroll while open (or restore cleanly on unmount).\n\nStep-by-Step Instructions:\n1. Create PortalModal.jsx and mount it inside a parent div that has overflow: hidden and z-index: 1.\n2. Verify in Chrome DevTools Elements tab that the modal DOM renders directly under <body>, completely escaping the overflow: hidden trap!\n\nDeliverables:\n- PortalModal.jsx.\n\nEvaluation Criteria:\n- Escapes parent overflow/stacking contexts via createPortal.\n- Keyboard Escape closes modal and focus moves cleanly into the dialog on open.",
      "lessons": [
        {
          "title": "useRef for DOM Focus, Timers & Non-Rendering Values",
          "duration": "1h 05m",
          "introduction": "Updating useState triggers a re-render; updating ref.current does NOT. Knowing that distinction tells you immediately which hook to pick.",
          "objectives": [
            "Focus inputs or scroll elements imperatively via ref={inputRef}",
            "Store mutable timer IDs or AbortControllers in useRef without causing re-renders",
            "Never read or write ref.current directly during JSX render"
          ],
          "notes": "### `useState` vs. `useRef`\n- **`useState`**: Data that **appears in JSX**. Changing it schedules a re-render.\n- **`useRef`**: An escape-hatch box (`{ current: initialValue }`) that persists across renders **without triggering re-renders** when mutated. Ideal for:\n  1. DOM node references (`inputRef.current?.focus()`).\n  2. Interval/timeout IDs (`timerRef.current = setInterval(...)`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Displaying `{countRef.current}` in JSX and wondering why the screen never updates when you increment it!\n  - **Solution**: Anything rendered in UI belongs in `useState`, not `useRef`.",
          "codeExample": "import { useRef, useEffect } from 'react';\n\nexport function FocusSearchInput({ shouldFocus }) {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    if (shouldFocus) {\n      inputRef.current?.focus();\n    }\n  }, [shouldFocus]);\n\n  return (\n    <input\n      ref={inputRef}\n      type=\"search\"\n      placeholder=\"Press / to search...\"\n    />\n  );\n}",
          "codeExplanation": "1. inputRef starts as { current: null } and React attaches the real <input> DOM node after commit.\n2. useEffect safely calls inputRef.current?.focus() after the DOM updates.\n\nHow to Run & Expected Output:\nMount <FocusSearchInput shouldFocus={true} />; the search box receives keyboard focus automatically on mount.",
          "practiceExercise": "Guided Exercise:\n1. Build a `Stopwatch` component storing `intervalRef.current = setInterval(...)` in `useRef` and clearing it in both Stop and `useEffect` unmount cleanup.\n\nIndependent Challenge:\nAdd a global `keydown` listener for `/` that calls `inputRef.current?.focus()` unless the user is already typing inside an input/textarea.\n\nExpected Result:\nClean DOM focus control and zero-rerender timer tracking.",
          "keyTakeaways": [
            "Mutating ref.current does NOT trigger a re-render — never use refs for UI-rendered state",
            "Use useRef to attach to DOM elements (focus, scrollIntoView) and store timer/observer handles",
            "Only read/write DOM refs inside useEffect or event handlers, not during render"
          ]
        },
        {
          "title": "Building Accessible Modals & Tooltips with createPortal",
          "duration": "1h 10m",
          "introduction": "Even with z-index: 9999, a modal nested inside a parent with transform or overflow: hidden gets trapped! createPortal moves the DOM node cleanly to document.body while keeping React event bubbling intact.",
          "objectives": [
            "Render overlays into document.body using createPortal from react-dom",
            "Understand that React Context and synthetic events still bubble through the React tree!"
          ],
          "notes": "### How `createPortal` Works\n`return createPortal(modalJsx, document.body);`\n- **In the real Browser DOM**: The modal renders directly inside `<body>`, escaping any parent `overflow: hidden` or `z-index` stacking context!\n- **In React**: The component still stays inside its parent in the React tree — meaning **Context (`useAuth`, `useTheme`) still works** and events still bubble to React parents!",
          "codeExample": "import { createPortal } from 'react-dom';\nimport { useEffect } from 'react';\n\nexport function ModalPortal({ isOpen, onClose, children }) {\n  useEffect(() => {\n    if (!isOpen) return;\n    const onKey = (e) => { if (e.key === 'Escape') onClose(); };\n    window.addEventListener('keydown', onKey);\n    return () => window.removeEventListener('keydown', onKey);\n  }, [isOpen, onClose]);\n\n  if (!isOpen) return null;\n\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\" className=\"fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4\">\n      <div className=\"bg-white rounded-2xl p-6 max-w-md w-full\">{children}</div>\n    </div>,\n    document.body\n  );\n}",
          "codeExplanation": "1. createPortal mounts the dialog directly under document.body, bypassing parent overflow/z-index traps.\n2. useEffect registers an Escape key listener only while isOpen is true and removes it in cleanup.\n\nHow to Run & Expected Output:\nMount inside an `overflow-hidden` container and open the modal: it renders full-viewport cleanly centered above everything.",
          "practiceExercise": "Guided Exercise:\n1. Inspect the open modal in Chrome DevTools Elements tab to confirm it sits directly inside `<body>` rather than the parent `<div>`.\n\nIndependent Challenge:\nSave `previousFocus = document.activeElement` when the modal opens and restore `previousFocus?.focus()` when it closes!\n\nExpected Result:\nClipping-proof, keyboard-accessible modal dialogs.",
          "keyTakeaways": [
            "createPortal renders JSX into a different DOM node (like document.body) while preserving React Context and event bubbling",
            "Always support Escape key closing and clean up the keydown listener when closed"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens when you update `myRef.current = 42` in React?",
          "options": [
            "React immediately re-renders the component",
            "React stores the new value without scheduling any re-render",
            "React throws an immutability error",
            "The component unmounts"
          ],
          "correctAnswer": 1,
          "explanation": "useRef holds a mutable container that persists across renders without triggering re-renders."
        },
        {
          "question": "Why use `createPortal(modal, document.body)` for modals and dropdowns?",
          "options": [
            "To skip React state",
            "To escape parent overflow: hidden or z-index stacking-context traps in the DOM while keeping React Context intact",
            "To disable CSS",
            "To make fetch() faster"
          ],
          "correctAnswer": 1,
          "explanation": "Portals place overlay DOM nodes at the top level of document.body so parent clipping/stacking contexts never cut them off."
        },
        {
          "question": "Inside a component rendered via `createPortal`, do React Context hooks like `useAuth()` still work?",
          "options": [
            "No — Portals break Context",
            "Yes — Context follows the React component tree, not the DOM tree",
            "Only in production",
            "Only if using Redux"
          ],
          "correctAnswer": 1,
          "explanation": "Because the Portal stays in the same position in React’s virtual component tree, Context and React event bubbling continue working normally."
        },
        {
          "question": "Where should you call `inputRef.current.focus()`?",
          "options": [
            "Directly inside the component render body",
            "Inside useEffect or an event handler after the DOM node is attached",
            "Inside CSS",
            "Inside index.html"
          ],
          "correctAnswer": 1,
          "explanation": "DOM refs are only populated after React commits to the DOM, so access them in useEffect or event handlers."
        }
      ]
    },
    {
      "title": "Module 9: Advanced React Patterns — Compound Components & Transitions",
      "duration": "2h 30m",
      "objectives": [
        "Build expressive Compound Components (<Tabs>, <Tabs.List>, <Tabs.Panel>) sharing implicit Context",
        "Keep typing responsive during expensive UI filtering with React 18 useTransition / useDeferredValue"
      ],
      "notes": "### Module Introduction & Description\nInstead of passing 12 configuration arrays and boolean props into a monolithic `<Tabs data={[...]} renderTab={...} />`, **Compound Components** let callers compose clean, declarative JSX (`<Tabs><Tabs.Tab /><Tabs.Panel /></Tabs>`) while React 18 **Transitions** keep heavy UI updates responsive.\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Designing Compound Component APIs with private Context and using React 18 `useTransition` for non-urgent UI updates.\n\n### How the Lessons Connect\n- **Lesson 1** builds a reusable Compound Component (`<Tabs>`).\n- **Lesson 2** keeps large lists responsive with `useTransition` and optimistic UI patterns.\n\n### Completion Criteria\n- Complete both lessons, deliver the Compound Accordion/Tabs & Deferred Search assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nReplace a rigid prop-heavy <Tabs items={[{ label, content, disabled, icon }]} /> component with a clean Compound Component API (<Tabs defaultValue=\"notes\"><Tabs.List>...</Tabs.List><Tabs.Panel value=\"notes\">...</Tabs.Panel></Tabs>) and add a smooth useTransition filter on a 2,000-item list.\n\nObjectives:\n- Share activeTab state implicitly between parent <Tabs> and child <Tabs.Trigger> / <Tabs.Panel> via private Context.\n- Keep input typing instant using React 18 useTransition.\n\nRequirements:\n1. Implement <Tabs defaultValue>, <Tabs.Trigger value>, and <Tabs.Panel value>.\n2. Wire role=\"tablist\", role=\"tab\", aria-selected, and role=\"tabpanel\" for full accessibility!\n3. Build a 2,000-item filterable list using useTransition so typing stays 60fps even while filtering heavy rows.\n\nStep-by-Step Instructions:\n1. Create Tabs.jsx using createContext inside the module.\n2. Render <Tabs> in a demo page with 3 tabs and test aria-selected switching.\n\nDeliverables:\n- Tabs.jsx and TransitionFilter.jsx.\n\nEvaluation Criteria:\n- Zero prop-drilling of activeTab/setActiveTab by the consumer.\n- Proper ARIA tablist/tab/tabpanel semantics.",
      "lessons": [
        {
          "title": "Compound Components (<Tabs>, <Accordion>) Architecture",
          "duration": "1h 15m",
          "introduction": "Think of HTML’s <select> and <option>: they work together seamlessly without you passing an array of options. Compound Components bring that same elegance to React.",
          "objectives": [
            "Share implicit parent-child state via a private component Context",
            "Attach subcomponents cleanly (Tabs.Trigger, Tabs.Panel)"
          ],
          "notes": "### Why Compound Components Shine\nCallers can insert headings, badges, or dividers anywhere inside `<Tabs>` without modifying `Tabs.jsx` props! A tiny private `TabsContext` passes `activeTab` and `setActiveTab` automatically to `<Tabs.Trigger>` and `<Tabs.Panel>`.",
          "codeExample": "import { createContext, useContext, useState } from 'react';\n\nconst TabsCtx = createContext(null);\n\nexport function Tabs({ defaultValue, children }) {\n  const [active, setActive] = useState(defaultValue);\n  return <TabsCtx.Provider value={{ active, setActive }}>{children}</TabsCtx.Provider>;\n}\n\nTabs.Trigger = function Trigger({ value, children }) {\n  const { active, setActive } = useContext(TabsCtx);\n  return (\n    <button type=\"button\" role=\"tab\" aria-selected={active === value} onClick={() => setActive(value)}>\n      {children}\n    </button>\n  );\n};\n\nTabs.Panel = function Panel({ value, children }) {\n  const { active } = useContext(TabsCtx);\n  return active === value ? <div role=\"tabpanel\">{children}</div> : null;\n};",
          "codeExplanation": "1. Tabs owns active state and exposes it via private TabsCtx.\n2. Tabs.Trigger and Tabs.Panel read TabsCtx implicitly, keeping consumer JSX super clean.",
          "practiceExercise": "Guided Exercise:\n1. Render `<Tabs defaultValue=\"overview\">` with 2 Triggers and 2 Panels and verify switching works cleanly.\n\nIndependent Challenge:\nThrow a clear error if `<Tabs.Trigger>` is rendered outside `<Tabs>`.\n\nExpected Result:\nExpressive, accessible Compound Component API.",
          "keyTakeaways": [
            "Compound components share implicit state via a private Context just like <select> and <option>",
            "Include proper ARIA roles (tablist, tab, aria-selected, tabpanel) on interactive tab widgets"
          ]
        },
        {
          "title": "Optimistic UI Updates & Concurrent Transitions (useTransition)",
          "duration": "1h 15m",
          "introduction": "When typing in a search box triggers rendering 2,000 heavy cards, keystrokes can stutter. React 18 useTransition lets urgent typing stay instant while marking list filtering as non-urgent.",
          "objectives": [
            "Separate urgent input updates from non-urgent heavy list re-renders with startTransition",
            "Display subtle pending state using isPending from useTransition()"
          ],
          "notes": "### Keeping Input Typing Snappy\n`const [isPending, startTransition] = useTransition();`\nUpdate `setQuery(next)` immediately (urgent), and wrap `startTransition(() => setFilterQuery(next))` (non-urgent) so React can interrupt heavy list rendering whenever a new keystroke arrives!",
          "codeExample": "import { useState, useTransition } from 'react';\n\nexport function FastFilter({ items }) {\n  const [input, setInput] = useState('');\n  const [filterText, setFilterText] = useState('');\n  const [isPending, startTransition] = useTransition();\n\n  const handleChange = (e) => {\n    const val = e.target.value;\n    setInput(val); // Urgent: input stays responsive!\n    startTransition(() => {\n      setFilterText(val); // Non-urgent: interruptible\n    });\n  };\n\n  const visible = items.filter((i) => i.toLowerCase().includes(filterText.toLowerCase()));\n  return (\n    <div>\n      <input value={input} onChange={handleChange} />\n      {isPending && <span> Updating...</span>}\n      <p>{visible.length} matches</p>\n    </div>\n  );\n}",
          "codeExplanation": "1. setInput updates immediately so keystrokes never lag.\n2. startTransition marks setFilterText as interruptible and sets isPending true while rendering catches up.\n\nHow to Run & Expected Output:\nPass an array of 5,000 strings to <FastFilter /> and type rapidly: input responds instantaneously.",
          "practiceExercise": "Guided Exercise:\n1. Test `<FastFilter />` with 10,000 generated strings and watch `isPending` appear briefly during fast typing.\n\nIndependent Challenge:\nCompare `useTransition` with `useDeferredValue(input)` and note when `useDeferredValue` is even simpler (when you receive `input` as a prop!).\n\nExpected Result:\nZero input lag during heavy client-side list updates.",
          "keyTakeaways": [
            "useTransition separates urgent UI updates (typing) from non-urgent heavy re-renders",
            "Use isPending to give subtle feedback without blocking user input"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What problem does the Compound Component pattern (<Tabs><Tabs.Trigger /><Tabs.Panel /></Tabs>) solve?",
          "options": [
            "It replaces CSS completely",
            "It lets callers compose flexible JSX without prop-drilling state or adding dozens of rigid configuration props",
            "It runs on Node.js",
            "It disables Context"
          ],
          "correctAnswer": 1,
          "explanation": "Compound components share state implicitly via Context so consumers have full layout flexibility."
        },
        {
          "question": "In React 18 `useTransition()`, what does wrapping `setFilterText(val)` inside `startTransition(() => ...)` do?",
          "options": [
            "Delays it with a 5-second setTimeout",
            "Marks the state update as non-urgent/interruptible so urgent updates like typing stay responsive",
            "Caches it in localStorage",
            "Runs it in a Web Worker"
          ],
          "correctAnswer": 1,
          "explanation": "Transitions keep urgent interactions (keystrokes, clicks) responsive by allowing React to interrupt non-urgent renders."
        },
        {
          "question": "When is `useDeferredValue(propValue)` preferred over `useTransition()`?",
          "options": [
            "When you don’t control the state setter (e.g., receiving a value as a prop from a parent)",
            "When fetching from MongoDB",
            "Only in class components",
            "Never"
          ],
          "correctAnswer": 0,
          "explanation": "useTransition wraps a state setter you own; useDeferredValue defers a value you receive from above."
        },
        {
          "question": "Which ARIA attribute indicates the currently active tab on `<button role=\"tab\">`?",
          "options": [
            "aria-expanded",
            "aria-selected",
            "aria-live",
            "aria-disabled"
          ],
          "correctAnswer": 1,
          "explanation": "Tabs use role=\"tab\" with aria-selected=\"true|false\" inside a role=\"tablist\" container."
        }
      ]
    },
    {
      "title": "Module 10: Vitest + React Testing Library & Capstone Integration",
      "duration": "2h 30m",
      "objectives": [
        "Write integration-style React component tests with Vitest, React Testing Library, and mocked API calls",
        "Test multi-lesson navigation, quiz submission, and Mark as Complete flows cleanly",
        "Integrate all 10 React modules into a complete, tested SPA architecture"
      ],
      "notes": "### Module Introduction & Description\nIn this final module, you verify your React components automatically with **Vitest + React Testing Library** — testing real user clicks, form typing, and mocked Axios/Fetch responses — and review the complete React SPA architecture.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Writing user-centric Vitest + React Testing Library specs, mocking HTTP calls cleanly, and verifying protected routes and quiz flows.\n\n### How the Lessons Connect\n- **Lesson 1** teaches practical Vitest + React Testing Library patterns (roles, async `waitFor`, mocked Axios).\n- **Lesson 2** ties together the complete Course Discovery & Progress Tracker Capstone.\n\n### Completion Criteria\n- Complete both lessons, deliver the Tested Quiz & Lesson Stepper Capstone assignment, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Tested Course Discovery & Quiz Flow:\nProblem Statement:\nBuild and test the core CourseDetail interactive experience: multi-lesson navigation, server-graded quiz submission unlocking \"Mark as Complete\", and search/difficulty filtering on the Courses page.\n\nObjectives:\n- Combine React Router, Context AuthProvider, controlled filtering, AbortController fetching, and ErrorBoundary.\n- Write >= 3 automated Vitest + React Testing Library tests verifying real user flows.\n\nRequirements:\n1. Test 1: Courses page filters visible cards when typing in the search box and selecting a difficulty.\n2. Test 2: CourseDetail switches from Lesson 1 to Lesson 2 when clicking Next Lesson / Lesson 2 button.\n3. Test 3: Submitting a passing 100% quiz response unlocks the \"Mark as Complete\" button.\n\nStep-by-Step Instructions:\n1. Mock axios.get / axios.post cleanly with vi.mock('axios').\n2. Use userEvent / fireEvent and await screen.findByText(...) for async UI assertions.\n3. Run `npx vitest run` and verify 100% pass rate.\n\nDeliverables:\n- CourseFlows.test.jsx passing under `vitest run`.\n\nEvaluation Criteria:\n- Queries use accessible roles/labels/text (never brittle internal class selectors).\n- Zero skipped or weakened assertions.",
      "lessons": [
        {
          "title": "Testing Forms, Async Fetches & Router Flows with Vitest",
          "duration": "1h 15m",
          "introduction": "Good React tests act like a real user: they find buttons by accessible name, type into labeled inputs, wait for async UI updates, and assert visible outcomes.",
          "objectives": [
            "Mock HTTP clients cleanly in Vitest using vi.mock",
            "Use findBy* and waitFor for async data rendering assertions"
          ],
          "notes": "### User-Centric Testing Rules\n1. Wrap components using `<Link>` or `useParams()` inside `<MemoryRouter>` in tests.\n2. Mock `axios` at the module boundary with `vi.mock('axios')` so tests run fast and offline.\n3. Use `await screen.findByText(...)` when waiting for async `useEffect` data to appear.",
          "codeExample": "import { render, screen, fireEvent } from '@testing-library/react';\nimport { describe, it, expect, vi } from 'vitest';\nimport { MemoryRouter } from 'react-router-dom';\n\nfunction CounterDemo() {\n  const [n, setN] = React.useState(0);\n  return <button onClick={() => setN((v) => v + 1)}>Count: {n}</button>;\n}\n\ndescribe('CounterDemo', () => {\n  it('increments visible count on click', () => {\n    render(<MemoryRouter><CounterDemo /></MemoryRouter>);\n    const btn = screen.getByRole('button', { name: /count: 0/i });\n    fireEvent.click(btn);\n    expect(screen.getByRole('button', { name: /count: 1/i })).toBeInTheDocument();\n  });\n});",
          "codeExplanation": "1. Renders inside MemoryRouter and queries the button by accessible role + text regex.\n2. Simulates a real click and asserts the updated button text appears in the document.\n\nHow to Run & Expected Output:\nRun `npm test` (`vitest run`). Prints `1 passed (1)`.",
          "practiceExercise": "Guided Exercise:\n1. Write a test rendering a Login form with empty fields and asserting an inline validation alert (`role=\"alert\"`) appears on submit.\n\nIndependent Challenge:\nMock `axios.get` with `vi.fn().mockResolvedValue({ data: [...] })` and verify a loading message swaps to course titles via `await screen.findByText('React')`.\n\nExpected Result:\nReliable component tests verifying real user behavior.",
          "keyTakeaways": [
            "Test components like a user: query by role, label, and visible text",
            "Wrap routed components in MemoryRouter and mock network calls at the boundary",
            "Use async findBy* queries for elements rendered after async API calls"
          ]
        },
        {
          "title": "Final Capstone: Course Discovery & Progress Tracker Integration",
          "duration": "1h 15m",
          "introduction": "Bringing together all 10 React modules into a cohesive, accessible, tested Single Page Application architecture.",
          "objectives": [
            "Review full SPA data flow: Router -> ProtectedRoute -> Context -> Custom Hooks -> UI",
            "Verify production build + lazy chunks + automated tests after final edits"
          ],
          "notes": "### Production React Architecture Checklist\n- **Routing**: `BrowserRouter`, `React.lazy` + `<Suspense>`, `ProtectedRoute` waiting on `authLoading`.\n- **State**: Local `useState` / `useReducer` for UI, derived values computed during render, Context split by domain.\n- **Resilience**: `ErrorBoundary` around routes/widgets, `AbortController` on fetches, Vitest tests + `vite build` green.",
          "codeExample": "// Clean top-level App composition pattern\n// <ErrorBoundary>\n//   <AuthProvider>\n//     <BrowserRouter>\n//       <Suspense fallback={<PageLoader />}>\n//         <Routes>...</Routes>\n//       </Suspense>\n//     </BrowserRouter>\n//   </AuthProvider>\n// </ErrorBoundary>\nexport const APP_LAYERS = ['ErrorBoundary', 'AuthProvider', 'BrowserRouter', 'Suspense', 'Routes'];",
          "codeExplanation": "1. Illustrates the clean outer-to-inner provider composition order for production React SPAs.\n\nHow to Run & Expected Output:\nRun `npm test && npm run build` in a React + Vite project; all Vitest specs pass and `dist/` builds cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Trace why `<ErrorBoundary>` sits at the outer edge while `<Suspense>` wraps `<Routes>`.\n\nIndependent Challenge:\nRun `npm test` and `npm run build` on your React app after making a small accessibility improvement and confirm zero errors.\n\nExpected Result:\nProduction-grade, tested React SPA architecture.",
          "keyTakeaways": [
            "Compose ErrorBoundary, AuthProvider, BrowserRouter, and Suspense cleanly at the app root",
            "Always verify both Vitest tests and production vite build after final changes"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why wrap components using `<Link>` or `useNavigate()` inside `<MemoryRouter>` during Vitest tests?",
          "options": [
            "MemoryRouter compiles CSS",
            "Router hooks and <Link> require a Router context provider to resolve routes in memory without changing the real browser URL",
            "Vitest forbids BrowserRouter",
            "MemoryRouter mocks axios automatically"
          ],
          "correctAnswer": 1,
          "explanation": "MemoryRouter provides an isolated in-memory router context ideal for fast component tests."
        },
        {
          "question": "When asserting on UI that appears after an async API call resolves in React Testing Library, which query should you use?",
          "options": [
            "getByText (synchronous)",
            "await screen.findByText(...)",
            "querySelector",
            "console.log"
          ],
          "correctAnswer": 1,
          "explanation": "findBy* retries asynchronously until the element appears or times out cleanly."
        },
        {
          "question": "Why place `<ErrorBoundary>` outside `<Suspense>` and `<Routes>`?",
          "options": [
            "So ErrorBoundary can catch render or lazy-loading failures across any route without crashing the whole tab",
            "Because Suspense cannot render children",
            "To disable lazy loading",
            "To speed up CSS"
          ],
          "correctAnswer": 0,
          "explanation": "Wrapping Suspense/Routes in an ErrorBoundary catches both component render errors and failed dynamic chunk imports."
        },
        {
          "question": "Which React Testing Library query is most resilient to CSS refactoring?",
          "options": [
            "container.querySelector(\".btn-orange-v2\")",
            "screen.getByRole(\"button\", { name: /enroll/i })",
            "getByTestId on every div",
            "XPath queries"
          ],
          "correctAnswer": 1,
          "explanation": "Querying by accessible role and visible name verifies both UI behavior and screen-reader accessibility."
        }
      ]
    }
  ]
};
