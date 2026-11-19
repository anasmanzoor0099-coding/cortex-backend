export const jsCourseData = {
  "title": "Modern JavaScript (ES6+)",
  "description": "Master JavaScript from first principles to asynchronous web engineering. Learn variables, control flow, functions, closures, array pipelines, DOM manipulation, Fetch API, and error handling.",
  "thumbnail": "javascript",
  "totalDuration": "18h 00m",
  "category": "Programming Languages",
  "difficulty": "Beginner",
  "tags": [
    "JavaScript",
    "ES6+",
    "DOM",
    "Async/Await",
    "Closures",
    "Fetch API"
  ],
  "learningOutcomes": [
    "Write clean ES6+ code using const/let, strict equality, template literals, and arrow functions",
    "Master scope, closures, hoisting, and higher-order functions",
    "Transform complex datasets declaratively with map, filter, reduce, and destructuring",
    "Build interactive browser UIs with DOM manipulation, event delegation, and localStorage",
    "Consume REST APIs using Promises, async/await, Promise.all, and try/catch error handling",
    "Organize multi-file JavaScript applications using ES Modules (import/export)"
  ],
  "prerequisites": [
    "Basic familiarity with HTML & CSS"
  ],
  "targetAudience": "Beginners and web developers ready to build genuinely interactive, data-driven web applications.",
  "practicalProject": "Build an interactive Task & Habit Manager web app featuring filtering, localStorage persistence, event delegation, and live API quote fetching.",
  "modules": [
    {
      "title": "Module 1: JavaScript Foundations, Types & Strict Equality",
      "duration": "2h 30m",
      "objectives": [
        "Declare bindings safely with const and let and understand why var is avoided",
        "Distinguish JavaScript primitives from objects/arrays passed by reference",
        "Avoid implicit coercion bugs using strict equality (===) and explicit conversion",
        "Write clean control flow with early returns, nullish coalescing (??), and loops"
      ],
      "notes": "### Module Introduction\nJavaScript powers every interactive web browser and runs on servers via Node.js. Before building apps, you need a rock-solid mental model of how JavaScript stores values in memory, converts types, and evaluates conditions.\n\n### Prerequisites\n- Basic HTML & CSS familiarity.\n- Access to Node.js or a browser DevTools Console to execute snippets.\n\n### How the Lessons Connect\n- **Lesson 1** explains `const` vs `let`, primitive vs reference values, and why mutating objects differs from reassigning bindings.\n- **Lesson 2** covers operators, truthy/falsy rules, `==` vs `===`, nullish coalescing (`??`), and structured control flow.\n\n### Module Summary\nYou will write bug-free variable declarations, copy objects without accidental shared-reference mutations, and eliminate type coercion surprises.\n\n### Completion Criteria\n- Read both lessons and run the code examples in Node or browser Console.\n- Complete the Expense Calculator CLI/Console assignment.\n- Score 100% on the Module 1 Knowledge Check.",
      "assignment": "Problem Statement:\nA fintech startup needs a clean, bug-free Shopping Cart & Tax Calculator utility in JavaScript. Their previous script used var, loose equality (==), and mutated shared product arrays accidentally.\n\nObjectives:\n- Use const by default and let only when rebinding is required.\n- Safely calculate line-item totals without mutating the original cart array.\n- Handle missing discounts and zero values accurately with nullish coalescing (??).\n\nRequirements:\n1. Define an array of cart items: [{ name, priceCents, qty, discountCents }].\n2. Write a function calculateCartSummary(items, taxRate = 0.08) that:\n   - Never mutates the input items array or any item object inside it.\n   - Uses strict equality (===) for any type/state checks.\n   - Uses discountCents ?? 0 so a 0 discount is treated as 0, not missing.\n   - Returns { subtotalCents, taxCents, totalCents, formattedTotal }.\n3. Format currency cleanly in dollars (e.g., \"$42.50\") using (cents / 100).toFixed(2).\n\nStep-by-Step Instructions:\n1. Create cart.js and define a sample cart array with at least 3 items (one with discountCents: 0, one with discountCents: undefined).\n2. Loop over items with for...of to compute subtotalCents (using Math.max(0, item.priceCents - (item.discountCents ?? 0)) * item.qty).\n3. Compute taxCents using Math.round(subtotalCents * taxRate) to avoid floating-point drift (0.1 + 0.2 !== 0.3).\n4. Run node cart.js and print the summary object plus the original array to verify zero mutation.\n\nDeliverables:\n- cart.js executable in Node.js with sample test cases including an empty cart [].\n\nEvaluation Criteria:\n- Zero var declarations and zero == / != operators.\n- Integer cents math used to avoid floating-point rounding bugs.\n- Handles undefined discountCents and empty cart gracefully.",
      "lessons": [
        {
          "title": "Variables, Data Types & Reference Semantics",
          "duration": "1h 15m",
          "introduction": "Many subtle JavaScript bugs come from misunderstanding what const actually locks — and what happens when two variables point to the same object or array.",
          "objectives": [
            "Choose const vs let intentionally and avoid var",
            "Identify all 7 primitive types plus objects and arrays",
            "Predict copy-by-value vs copy-by-reference behavior",
            "Create shallow copies safely using spread syntax ({ ...obj }, [ ...arr ])"
          ],
          "notes": "### `const`, `let`, and Why `var` Is Retired\n- **`const`**: Creates a **block-scoped** binding that cannot be reassigned (`x = 2` throws a `TypeError`). Use `const` for 95% of your variables.\n- **`let`**: Block-scoped (`{ ... }`), used only when a variable must be reassigned (like a loop counter or running sum).\n- **`var`**: Legacy function-scoped declaration that leaks out of `if`/`for` blocks and hoists as `undefined`. Avoid it in modern JS.\n\n### Primitives vs. Objects (Reference Semantics)\nJavaScript has **7 primitive types**: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, and `symbol`.\n- Primitives are **immutable** and copied **by value**. If `let a = 10; let b = a; b = 20;`, `a` is still `10`.\n- **Objects and Arrays** are stored on the heap and copied **by reference**. If `const userA = { name: 'Ada' }; const userB = userA; userB.name = 'Grace';`, **both `userA.name` and `userB.name` become `'Grace'`** because both variables hold the memory address of the exact same object!\n\n### What `const` Actually Protects\n`const` prevents **reassigning the variable binding** (`userA = {}` fails), NOT mutating properties inside an object (`userA.name = 'Grace'` succeeds!). To avoid accidental mutations, create a fresh shallow copy with spread syntax: `const userB = { ...userA, name: 'Grace' };`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Checking `typeof null` and expecting `\"null\"`.\n  - **Solution**: Due to a 1995 engine quirk, `typeof null === \"object\"`. Always check `value === null` directly.\n- **Mistake**: Checking `typeof []` and expecting `\"array\"`.\n  - **Solution**: Arrays are objects; use `Array.isArray(value)`.",
          "codeExample": "// Primitives: copied by value\nlet scoreA = 100;\nlet scoreB = scoreA;\nscoreB = 150;\nconsole.log({ scoreA, scoreB }); // { scoreA: 100, scoreB: 150 }\n\n// Objects: copied by reference\nconst original = { role: 'student', points: 10 };\nconst alias = original;\nalias.points = 99;\nconsole.log('Mutated original:', original.points); // 99!\n\n// Safe shallow copy with spread\nconst safeCopy = { ...original, points: 200 };\nconsole.log('Original unchanged:', original.points, 'Copy:', safeCopy.points);\n\n// Type checks\nconsole.log(typeof null);            // \"object\" (quirk)\nconsole.log(Array.isArray([1, 2]));  // true",
          "codeExplanation": "1. scoreA and scoreB hold independent primitive numbers, so updating scoreB leaves scoreA at 100.\n2. alias = original copies the object reference, so mutating alias.points also mutates original.points.\n3. { ...original, points: 200 } allocates a brand-new object and overrides points without touching original.\n4. Array.isArray() reliably distinguishes arrays from plain objects.\n\nHow to Run & Expected Output:\nRun with `node demo.js` or paste in DevTools Console. Output shows scoreA=100, original.points=99 after alias mutation, then safeCopy.points=200 while original stays 99.",
          "practiceExercise": "Guided Exercise:\n1. Create an array const colors = ['red', 'green']; and copy it with const copy = [...colors, 'blue'];. Verify colors.length is still 2.\n\nIndependent Challenge:\nWrite a function updateCity(user, newCity) that returns a new user object with updated address.city without mutating the original nested user.address object.\n\nHints:\n- Spread syntax is shallow! For nested objects, spread both the outer object and the nested address object.",
          "keyTakeaways": [
            "Default to const; use let only when reassignment is necessary; never use var",
            "Primitives copy by value; objects and arrays copy by reference",
            "const prevents variable reassignment, not property mutation",
            "Use Array.isArray(x) for arrays and x === null for null checks"
          ]
        },
        {
          "title": "Operators, Type Coercion & Control Flow",
          "duration": "1h 15m",
          "introduction": "Loose equality (==) and silent type coercion are behind classic JavaScript memes like [] == ![]. Learning strict operators makes your logic rock solid.",
          "objectives": [
            "Use strict equality (=== / !==) to prevent implicit type coercion",
            "List the exact 7 falsy values in JavaScript",
            "Use nullish coalescing (??) accurately instead of || for 0 and \"\" defaults",
            "Write clean functions with guard clauses (early returns) and for...of loops"
          ],
          "notes": "### Strict Equality (`===`) vs. Loose Equality (`==`)\n- **`===`** checks **both value and type** without converting anything (`5 === '5'` is `false`).\n- **`==`** performs complex implicit type conversion (`'' == 0` is `true`, `null == undefined` is `true`). Always use `===` and `!==`, converting types explicitly with `Number(str)` or `String(num)` when needed.\n\n### The 7 Falsy Values\nIn an `if (value)` condition, **only these 7 values** evaluate to `false`:\n1. `false`\n2. `0` (and `-0`)\n3. `0n` (BigInt zero)\n4. `\"\"` (empty string)\n5. `null`\n6. `undefined`\n7. `NaN`\nEverything else — including `\"0\"`, `\"false\"`, `[]`, and `{}` — is **truthy**!\n\n### Nullish Coalescing (`??`) vs. Logical OR (`||`)\n- `count || 10` replaces **any falsy** value — so if `count` is legitimately `0`, `0 || 10` accidentally returns `10`!\n- `count ?? 10` only falls back when `count` is **`null` or `undefined`**, preserving `0`, `false`, and `\"\"`.\n\n### Guard Clauses (Early Returns)\nInstead of nesting 4 levels of `if/else`, validate invalid cases at the top and `return` early. Your main happy-path logic stays flat and easy to read.",
          "codeExample": "function getDiscountedPrice(price, discountPercent) {\n  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {\n    throw new Error('Price must be a non-negative number');\n  }\n\n  // ?? preserves 0% discount instead of falling back like || would\n  const safeDiscount = discountPercent ?? 10;\n  return Number((price * (1 - safeDiscount / 100)).toFixed(2));\n}\n\nconsole.log(getDiscountedPrice(100, 0));         // 100 (0% respected!)\nconsole.log(getDiscountedPrice(100, undefined)); // 90  (default 10% applied)\nconsole.log(5 === '5');                          // false (strict)",
          "codeExplanation": "1. The guard clause at the top validates price immediately and throws a descriptive Error if invalid.\n2. discountPercent ?? 10 ensures an explicit 0% discount stays 0 rather than falling back to 10.\n3. Number.isNaN(price) safely checks for NaN (note that NaN === NaN is always false in JS!).\n\nHow to Run & Expected Output:\nRun with `node coercion.js`. Logs 100, 90, and false.",
          "practiceExercise": "Guided Exercise:\n1. Test 0 || 5 vs 0 ?? 5 and \"\" || \"Guest\" vs \"\" ?? \"Guest\" in Node/Console to see the difference firsthand.\n\nIndependent Challenge:\nRefactor a nested if/else access check (check user exists -> check user.isActive -> check user.role === 'admin') into flat guard clauses with early returns.\n\nHints:\n- Guard clauses check the negative condition first: if (!user) return 'Denied';",
          "keyTakeaways": [
            "Always use === and !== instead of == and !=",
            "Only 7 values are falsy: false, 0, 0n, \"\", null, undefined, NaN",
            "Use ?? when 0, false, or \"\" are valid inputs and only null/undefined should fall back",
            "Prefer flat guard clauses over deeply nested if/else pyramids"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens if you declare const user = { name: \"Ada\" } and then run user.name = \"Grace\"?",
          "options": [
            "JavaScript throws a TypeError because const objects are deeply frozen",
            "user.name updates to \"Grace\" because const only prevents reassigning the variable binding",
            "The property is silently ignored",
            "user becomes undefined"
          ],
          "correctAnswer": 1,
          "explanation": "const locks the variable binding (you cannot do user = {}), not the internal properties of an object."
        },
        {
          "question": "Which expression evaluates to 0 instead of 10?",
          "options": [
            "0 || 10",
            "0 ?? 10",
            "undefined ?? 10",
            "null ?? 10"
          ],
          "correctAnswer": 1,
          "explanation": "Nullish coalescing (??) only falls back for null or undefined, so 0 is preserved."
        },
        {
          "question": "What does typeof [] return in JavaScript?",
          "options": [
            "\"array\"",
            "\"list\"",
            "\"object\"",
            "\"undefined\""
          ],
          "correctAnswer": 2,
          "explanation": "Arrays are specialized objects in JavaScript, so typeof [] returns \"object\". Use Array.isArray() to check for arrays."
        },
        {
          "question": "Which of the following values is TRUTHY in an if (...) statement?",
          "options": [
            "\"\"",
            "0",
            "[]",
            "NaN"
          ],
          "correctAnswer": 2,
          "explanation": "Empty arrays ([]) and empty objects ({}) are objects and always evaluate as truthy in JavaScript."
        }
      ]
    },
    {
      "title": "Module 2: Functions, Lexical Scope & Closures",
      "duration": "2h 45m",
      "objectives": [
        "Compare function declarations, expressions, and arrow functions (including implicit returns)",
        "Understand the Scope Chain and why inner scopes can read outer variables",
        "Explain and build practical closures for state encapsulation, counters, and memoization",
        "Pass functions as arguments (callbacks / higher-order functions)"
      ],
      "notes": "### Module Introduction\nFunctions are first-class citizens in JavaScript: you can store them in variables, pass them into other functions, and return them from functions. That capability unlocks **closures** and **higher-order functions**, the backbone of React hooks, event handlers, and middleware.\n\n### Prerequisites\n- Completion of Module 1 (variables, types, control flow).\n\n### How the Lessons Connect\n- **Lesson 1** covers function declarations vs arrow syntax, default parameters, and rest arguments.\n- **Lesson 2** dives into lexical scope and closures — showing how a function remembers its birthplace environment even after the outer function finishes running.\n\n### Module Summary\nYou will write clean arrow functions, build higher-order utilities, and harness closures intentionally for private state and function factories.\n\n### Completion Criteria\n- Complete both lessons and hands-on closure exercises.\n- Deliver the Rate-Limited / Stateful Counter & Formatter Factory assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nAn analytics module needs a reusable event tracker that remembers private counts per event type without exposing global variables that any script can overwrite.\n\nObjectives:\n- Use closures to encapsulate private state safely.\n- Build a configurable function factory using default parameters and arrow functions.\n\nRequirements:\n1. Write createTracker(prefix = 'APP') that returns an object with three methods:\n   - track(eventName): increments a private Map/object counter for that event and returns the new count.\n   - getCount(eventName): returns the current count (defaulting to 0).\n   - summary(): returns a shallow copy of all counts (so callers cannot mutate internal state!).\n2. Write a higher-order helper once(fn) that ensures fn only executes on the first call and caches/returns that first result on subsequent calls.\n3. Demonstrate two independent trackers (e.g., authTracker and uiTracker) proving their private states never collide.\n\nStep-by-Step Instructions:\n1. Define createTracker in tracker.js with a local const counts = {} inside the outer function.\n2. Return the public API methods that close over counts and prefix.\n3. Implement once(fn) using two closed-over variables: called = false and result.\n4. Run node tracker.js with assertions verifying independent counts and single-execution behavior.\n\nDeliverables:\n- tracker.js with working test output.\n\nEvaluation Criteria:\n- Internal counts cannot be mutated directly from outside createTracker.\n- summary() returns a fresh copy ({ ...counts }).\n- once(fn) executes fn at most one time.",
      "lessons": [
        {
          "title": "Functions, Arrow Syntax & Default Parameters",
          "duration": "1h 15m",
          "introduction": "Choosing the right function syntax and parameter defaults eliminates boilerplate checks and makes callbacks effortless to read.",
          "objectives": [
            "Contrast hoisted function declarations with arrow function expressions",
            "Use concise implicit returns (and wrap object literals in parentheses)",
            "Configure default parameters and rest parameters (...args)"
          ],
          "notes": "### Three Ways to Define a Function\n1. **Function Declaration** (`function add(a, b) { return a + b; }`): Hoisted to the top of its scope, so it can be called before its line of definition. Great for top-level named utilities.\n2. **Function Expression** (`const add = function(a, b) { ... };`): Not hoisted; behaves like any `const` variable.\n3. **Arrow Function** (`const add = (a, b) => a + b;`): Compact syntax ideal for callbacks (`items.map(x => x * 2)`). Arrow functions also inherit `this` lexically from their surrounding scope instead of rebinding it dynamically.\n\n### Implicit Returns & Object Literals\nWhen an arrow function has a single expression without `{}`, it returns automatically:\n- `const double = n => n * 2;`\n- **Gotcha**: Returning an object literal implicitly requires parentheses so JS doesn't mistake `{}` for a function body block:\n  `const makeUser = name => ({ name, active: true });`\n\n### Default & Rest Parameters\n- **Defaults**: `function greet(name = 'Guest')` activates when `name` is `undefined`.\n- **Rest (`...args`)**: Collects any remaining arguments into a real Array: `function sum(...nums) { ... }`.",
          "codeExample": "// Hoisted declaration\nfunction formatCurrency(amount, currency = 'USD') {\n  return `${currency} ${amount.toFixed(2)}`;\n}\n\n// Arrow function returning an object literal (needs parentheses!)\nconst createItem = (title, price = 0) => ({\n  title,\n  price,\n  createdAt: new Date().toISOString()\n});\n\n// Rest parameters\nconst sumAll = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);\n\nconsole.log(formatCurrency(19.5));\nconsole.log(createItem('Notebook', 12));\nconsole.log(sumAll(5, 10, 15)); // 30",
          "codeExplanation": "1. formatCurrency uses a default parameter ('USD') so callers can omit the second argument.\n2. createItem wraps its returned object in ({ ... }) so JavaScript parses it as an object literal rather than a code block.\n3. sumAll gathers an arbitrary number of arguments into the numbers array using ...numbers.\n\nHow to Run & Expected Output:\nRun with `node functions.js`. Prints \"USD 19.50\", the created item object, and 30.",
          "practiceExercise": "Guided Exercise:\n1. Convert a 4-line function expression into a single-line arrow function returning an object { id, label }.\n\nIndependent Challenge:\nWrite a higher-order function applyTwice(fn, value) that calls fn(fn(value)) and test it with an arrow function x => x + 3.\n\nHints:\n- Remember: ({ key: val }) needs parentheses for implicit object return.",
          "keyTakeaways": [
            "Function declarations are hoisted; const arrow functions are not",
            "Arrow functions with single expressions implicitly return without needing the return keyword",
            "Wrap implicit object literal returns in parentheses: () => ({ a: 1 })",
            "Use default parameters and ...rest parameters instead of the legacy arguments object"
          ]
        },
        {
          "title": "Lexical Scope & Closures in Practice",
          "duration": "1h 30m",
          "introduction": "Closures sound intimidating, yet you use them every time you write a callback or React hook. Here is how they actually work under the hood.",
          "objectives": [
            "Trace variable lookup up the Lexical Scope Chain",
            "Explain what a closure is: a function bundled with its lexical environment",
            "Build private state, function factories, and memoizers with closures"
          ],
          "notes": "### Lexical Scope\n\"Lexical\" means **determined by where code is written in the source file**, not where a function is called. An inner function can always read variables from its outer enclosing functions, whereas outer functions cannot peek inside inner functions.\n\n### What Is a Closure?\nNormally, when a function finishes running, its local variables are garbage-collected.\nHowever, if an outer function returns (or passes elsewhere) an **inner function** that references one of the outer function's local variables, JavaScript keeps that outer variable alive in memory!\nThat bundle — **function + remembered outer variables** — is a **closure**.\n\n### Practical Uses of Closures\n1. **Private State / Encapsulation**: Hide `let balance = 0` inside `createBankAccount()` so outside code can only modify it via `deposit()` and `withdraw()` — never `account.balance = 999999`.\n2. **Function Factories**: `const multiplyBy = factor => num => num * factor;` creates specialized functions like `const double = multiplyBy(2)`.\n3. **Memoization / Caching**: Cache expensive function outputs in a closed-over `Map`.",
          "codeExample": "function createCounter(initialValue = 0) {\n  let count = initialValue; // Private variable enclosed by returned functions\n\n  return {\n    increment: (step = 1) => {\n      count += step;\n      return count;\n    },\n    decrement: (step = 1) => {\n      count -= step;\n      return count;\n    },\n    value: () => count\n  };\n}\n\nconst counterA = createCounter(10);\nconst counterB = createCounter(0);\n\nconsole.log(counterA.increment(5)); // 15\nconsole.log(counterB.increment());  // 1 (completely independent!)\nconsole.log(counterA.value());      // 15",
          "codeExplanation": "1. createCounter initializes a local let count = initialValue.\n2. When createCounter(10) finishes, its returned object methods retain a live closure over that specific count variable.\n3. Calling createCounter(0) creates a brand-new execution scope, so counterA and counterB never interfere with each other.\n\nHow to Run & Expected Output:\nRun with `node closures.js`. Prints 15, 1, and 15.",
          "practiceExercise": "Guided Exercise:\n1. Write makeGreeter(greeting) that returns (name) => `${greeting}, ${name}!`. Create sayHello = makeGreeter('Hello') and test it.\n\nIndependent Challenge:\nBuild a simple memoize(fn) wrapper that stores previous results in a closed-over Map keyed by the argument and logs \"Cache hit\" when called with the same input twice.\n\nHints:\n- cache.has(arg) checks if a key exists even when the cached value is 0 or false.",
          "keyTakeaways": [
            "Lexical scope is determined by where functions are written, not where they are called",
            "A closure lets an inner function keep live access to outer variables after the outer function returns",
            "Each call to a factory function creates a separate, isolated closure environment",
            "Closures power private state encapsulation, callbacks, debouncers, and memoization"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does const makePoint = (x, y) => { x, y }; return undefined?",
          "options": [
            "Arrow functions cannot return objects",
            "JavaScript treats { x, y } as a function body block unless wrapped in parentheses ({ x, y })",
            "const variables cannot hold arrow functions",
            "The parameters must be named a and b"
          ],
          "correctAnswer": 1,
          "explanation": "Curly braces after => open a function block. Wrap an object literal in parentheses () => ({ x, y }) for an implicit object return."
        },
        {
          "question": "What is a closure in JavaScript?",
          "options": [
            "A syntax error caused by a missing closing brace",
            "A function combined with its surrounding lexical environment, remembering outer variables after the outer function returns",
            "A built-in method that freezes an object",
            "A loop that runs backwards"
          ],
          "correctAnswer": 1,
          "explanation": "A closure preserves access to outer lexical variables even after the outer function has finished executing."
        },
        {
          "question": "If you call const a = createCounter(); const b = createCounter();, how do a and b behave?",
          "options": [
            "They share the same internal counter variable",
            "Each receives its own independent enclosed count variable",
            "b overwrites a in memory",
            "Both throw a ReferenceError"
          ],
          "correctAnswer": 1,
          "explanation": "Every invocation of createCounter creates a new lexical environment, giving a and b independent private state."
        },
        {
          "question": "When does a default parameter like function greet(name = \"Guest\") take effect?",
          "options": [
            "Whenever name is falsy (including \"\" or 0)",
            "Only when name is omitted or explicitly undefined",
            "Only when name is null",
            "Only in strict mode"
          ],
          "correctAnswer": 1,
          "explanation": "Default parameters activate when an argument is undefined (omitted or passed as undefined). Passing null keeps null."
        }
      ]
    },
    {
      "title": "Module 3: Arrays, Objects, Destructuring & Functional Data Pipelines",
      "duration": "3h 00m",
      "objectives": [
        "Transform arrays cleanly without mutation using map, filter, find, some, every, and reduce",
        "Avoid accidental in-place mutation from .sort() and .reverse() using .toSorted() or spread copies",
        "Extract nested values concisely with object and array destructuring",
        "Handle nullable properties safely with optional chaining (?.) and nullish coalescing (??)"
      ],
      "notes": "### Module Introduction\nReal-world JavaScript applications spend most of their time transforming JSON data from APIs — filtering active users, mapping items into UI cards, computing totals, and safely reading optional fields.\n\n### Prerequisites\n- Completion of Modules 1 & 2 (objects, reference semantics, arrow functions).\n\n### How the Lessons Connect\n- **Lesson 1** teaches declarative array pipelines (`map`, `filter`, `find`, `reduce`) and immutability.\n- **Lesson 2** covers destructuring, spread/rest merging, optional chaining (`?.`), and `Object.entries`.\n\n### Module Summary\nYou will write concise, readable data pipelines that never corrupt shared state or crash on missing nested properties.\n\n### Completion Criteria\n- Complete both lessons and hands-on dataset exercises.\n- Deliver the E-Commerce Order Analytics Pipeline assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nAn e-commerce analytics dashboard receives a raw array of order objects from an API. Some orders are cancelled, some lack a coupon object, and the dashboard needs grouped metrics without mutating the source array.\n\nObjectives:\n- Chain filter, map, and reduce cleanly without mutating the original orders array.\n- Use optional chaining (?.) and nullish coalescing (??) for missing nested fields.\n\nRequirements:\n1. Given an array of >= 6 order objects: { id, customer: { name, tier }, status: 'paid'|'cancelled', items: [{ title, price, qty }], coupon?: { discount } }.\n2. Filter only 'paid' orders.\n3. Compute each paid order's net total (sum of price * qty minus coupon?.discount ?? 0, floored at 0).\n4. Compute grandRevenue using reduce.\n5. Group total revenue by customer.tier (e.g., { free: ..., pro: ... }) using reduce.\n6. Return top orders sorted descending by total without mutating the filtered array (use [...arr].sort(...) or toSorted()).\n\nStep-by-Step Instructions:\n1. Create analytics.js with sample realistic order data (include at least one order with coupon: undefined).\n2. Write pure helper functions: getOrderTotal(order), getPaidRevenue(orders), groupRevenueByTier(orders).\n3. Print all results and assert the original orders array order is unchanged.\n\nDeliverables:\n- analytics.js runnable via node analytics.js.\n\nEvaluation Criteria:\n- Original orders array remains untouched.\n- Zero TypeError crashes when coupon is undefined.\n- Clean functional chaining without manual push() loops.",
      "lessons": [
        {
          "title": "map, filter, find & reduce Without Mutation",
          "duration": "1h 30m",
          "introduction": "Instead of writing verbose for loops that mutate temporary arrays, modern JS chains declarative array methods that read like plain English.",
          "objectives": [
            "Use .map() for 1-to-1 transformations and .filter() for subset selection",
            "Use .find(), .some(), and .every() to short-circuit searches early",
            "Aggregate arrays into totals or lookup objects with .reduce()",
            "Avoid mutating arrays with .sort() by cloning first or using .toSorted()"
          ],
          "notes": "### The Big Four Immutable Methods\n- **`map(fn)`**: Always returns a **new array of the exact same length**, transforming each element.\n- **`filter(fn)`**: Returns a **new array** containing only elements where `fn` returns truthy.\n- **`find(fn)`**: Returns the **first matching element** (or `undefined`) and stops immediately — faster than `filter(...)[0]`.\n- **`reduce(fn, initialValue)`**: Folds an array down into a single value (a number sum, a grouped object, or a Map). **Always pass an `initialValue`** (like `0` or `{}`) so empty arrays don't throw a `TypeError`.\n\n### Watch Out for Mutating Methods!\nUnlike `map` and `filter`, **`array.sort()`** and **`array.reverse()`** mutate the original array *in place*! In React or Redux, mutating state breaks change detection.\n- **Safe solution**: Copy first with `[...items].sort((a, b) => a.price - b.price)` (or use ES2023 `items.toSorted(...)`).",
          "codeExample": "const courses = [\n  { title: 'HTML & CSS', price: 0, enrolled: true },\n  { title: 'JavaScript', price: 49, enrolled: true },\n  { title: 'TypeScript', price: 59, enrolled: false }\n];\n\n// Chain filter -> map cleanly\nconst enrolledTitles = courses\n  .filter((c) => c.enrolled)\n  .map((c) => c.title);\n\n// Reduce to total revenue of paid courses\nconst totalPaidValue = courses.reduce((sum, c) => sum + c.price, 0);\n\n// Non-mutating sort by price descending\nconst byPriceDesc = [...courses].sort((a, b) => b.price - a.price);\n\nconsole.log(enrolledTitles); // ['HTML & CSS', 'JavaScript']\nconsole.log(totalPaidValue); // 108\nconsole.log(byPriceDesc[0].title); // 'TypeScript'",
          "codeExplanation": "1. filter keeps only enrolled courses; map extracts just their titles into a new string array.\n2. reduce starts from initialValue 0 and accumulates c.price.\n3. [...courses].sort(...) clones the array first so the original courses order stays intact.\n\nHow to Run & Expected Output:\nRun with `node pipelines.js`. Prints ['HTML & CSS', 'JavaScript'], 108, and 'TypeScript'.",
          "practiceExercise": "Guided Exercise:\n1. Given const nums = [3, 12, 7, 25, 8], filter numbers >= 10, double them with map, and sum them with reduce.\n\nIndependent Challenge:\nUse reduce to convert [{ id: 'a1', name: 'Ana' }, { id: 'b2', name: 'Bo' }] into a fast lookup object { a1: 'Ana', b2: 'Bo' }.\n\nHints:\n- Start reduce with {} as the initialValue and return { ...acc, [item.id]: item.name } (or mutate acc locally inside reduce).",
          "keyTakeaways": [
            "map transforms every item; filter selects matching items; find returns the first match",
            "Always provide an initialValue to reduce() to handle empty arrays safely",
            "Use some() / every() for boolean checks instead of filtering the whole array",
            "Clone with [...arr] before calling .sort() or .reverse() (or use .toSorted())"
          ]
        },
        {
          "title": "Destructuring, Spread, Rest & Optional Chaining",
          "duration": "1h 30m",
          "introduction": "Reading deeply nested API JSON safely without 10 lines of if (a && a.b && a.b.c) checks is effortless with ES6+ destructuring and optional chaining.",
          "objectives": [
            "Destructure objects and arrays with renaming and default values",
            "Merge objects immutably using spread (...) and extract remainders with rest",
            "Prevent TypeError crashes on nullable paths using optional chaining (?.)",
            "Iterate key-value pairs cleanly with Object.entries()"
          ],
          "notes": "### Object & Array Destructuring\nExtract values directly into local constants:\n```js\nconst { name: userName, role = 'member' } = user;\nconst [first, second, ...others] = scores;\n```\nNotice `name: userName` renames `user.name` to `userName`, and `role = 'member'` provides a default if `user.role` is `undefined`.\n\n### Optional Chaining (`?.`) + Nullish Coalescing (`??`)\nBefore ES2020, reading `user.profile.avatar.url` crashed with `Cannot read properties of undefined` if `profile` was missing.\nNow:\n`const avatarUrl = user?.profile?.avatar?.url ?? '/default-avatar.png';`\nIf any link before `?.` is `null` or `undefined`, JavaScript short-circuits to `undefined` cleanly, and `??` supplies the fallback.\n\n### Immutable Updates with Spread\n`const updated = { ...user, settings: { ...user.settings, theme: 'dark' } };`\nLater keys override earlier keys, leaving `user` completely untouched.",
          "codeExample": "const apiResponse = {\n  id: 42,\n  profile: { handle: '@ada' }\n  // billing is omitted\n};\n\n// Safe nested read with fallback\nconst plan = apiResponse?.billing?.plan ?? 'free';\n\n// Destructuring with rename and default\nconst { id: userId, role = 'student' } = apiResponse;\n\n// Immutable merge\nconst updatedUser = {\n  ...apiResponse,\n  role: 'mentor',\n  profile: { ...apiResponse.profile, verified: true }\n};\n\nconsole.log({ userId, role, plan, updatedUser });",
          "codeExplanation": "1. apiResponse?.billing?.plan safely evaluates to undefined without throwing, and ?? 'free' provides the fallback.\n2. Destructuring extracts id as userId and defaults role to 'student'.\n3. Spread creates updatedUser with a nested verified: true flag without mutating apiResponse.profile.\n\nHow to Run & Expected Output:\nRun with `node destructuring.js`. Prints userId: 42, role: 'student', plan: 'free', and updatedUser with verified: true.",
          "practiceExercise": "Guided Exercise:\n1. Destructure the first two items and the remaining items from const queue = ['task1', 'task2', 'task3', 'task4'].\n\nIndependent Challenge:\nUse Object.entries(scores) combined with .map() to format { math: 95, js: 100 } into ['math: 95', 'js: 100'].\n\nHints:\n- Inside .map(([subject, score]) => ...), destructure the [key, value] tuple directly in the parameter list!",
          "keyTakeaways": [
            "Destructuring extracts and renames object/array values with optional defaults",
            "Optional chaining (?.) short-circuits null/undefined paths instead of throwing TypeError",
            "Spread ({ ...a, ...b }) merges shallowly; nested objects must also be spread to stay immutable",
            "Object.entries(obj) pairs cleanly with map/filter for object transformations"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which array method stops iterating immediately as soon as it locates the first matching item?",
          "options": [
            ".filter()",
            ".map()",
            ".find()",
            ".reduce()"
          ],
          "correctAnswer": 2,
          "explanation": ".find() short-circuits and returns the first matching element (or undefined), whereas .filter() always scans the entire array."
        },
        {
          "question": "Why is calling items.sort((a, b) => a - b) directly on React state dangerous?",
          "options": [
            "sort() only works on strings",
            "sort() mutates the original array in place instead of returning a new array",
            "sort() is asynchronous",
            "sort() deletes duplicate numbers"
          ],
          "correctAnswer": 1,
          "explanation": "Array.prototype.sort() mutates the array in place. Clone first with [...items].sort(...) or use .toSorted()."
        },
        {
          "question": "What does user?.address?.city ?? \"Unknown\" return when user.address is undefined?",
          "options": [
            "Throws a TypeError",
            "undefined",
            "\"Unknown\"",
            "null"
          ],
          "correctAnswer": 2,
          "explanation": "Optional chaining (?.) short-circuits to undefined when address is missing, and ?? falls back to \"Unknown\"."
        },
        {
          "question": "What happens if you call [].reduce((acc, n) => acc + n) without an initialValue?",
          "options": [
            "It returns 0",
            "It returns undefined",
            "It throws a TypeError",
            "It returns NaN"
          ],
          "correctAnswer": 2,
          "explanation": "Calling reduce on an empty array without an initialValue throws TypeError: Reduce of empty array with no initial value."
        }
      ]
    },
    {
      "title": "Module 4: DOM Manipulation, Events & Browser Storage",
      "duration": "3h 00m",
      "objectives": [
        "Query and update DOM elements safely using textContent instead of innerHTML for user input",
        "Build and insert elements dynamically with document.createElement",
        "Handle dynamic lists efficiently with Event Bubbling and Event Delegation",
        "Persist JSON state across page reloads using localStorage with try/catch safety"
      ],
      "notes": "### Module Introduction\nIn the browser, JavaScript interacts with HTML through the **DOM API**. Writing secure, fast DOM code means avoiding Cross-Site Scripting (XSS) vulnerabilities, using **Event Delegation** instead of attaching hundreds of listeners, and persisting user state in `localStorage`.\n\n### Prerequisites\n- Completion of Modules 1–3 (functions, closures, arrays, objects).\n\n### How the Lessons Connect\n- **Lesson 1** teaches safe DOM querying, creating nodes with `createElement`, and why `textContent` prevents XSS.\n- **Lesson 2** covers Event Bubbling, `e.target.closest()`, and safe `localStorage` JSON serialization.\n\n### Module Summary\nYou will build dynamic, interactive browser interfaces that stay fast as lists grow and remember state after refresh.\n\n### Completion Criteria\n- Complete both lessons and hands-on DOM exercises.\n- Deliver the Interactive Bookmark / Reading List Manager assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an interactive Reading List web app (index.html + app.js) where users can add book titles, toggle read/unread status, delete items, and reload the page without losing their list.\n\nObjectives:\n- Prevent XSS by rendering user-entered titles strictly via textContent.\n- Use a single delegated click listener on the <ul> rather than one listener per list item.\n- Persist and hydrate state safely using localStorage.\n\nRequirements:\n1. Create index.html with a <form>, text <input>, and <ul id=\"book-list\">.\n2. Handle form submit with e.preventDefault(), validate non-empty trimmed input, and append to state.\n3. Render list items using document.createElement('li') and textContent (never innerHTML with user strings).\n4. Attach ONE click listener on #book-list using e.target.closest('[data-action]') to handle Toggle and Delete buttons.\n5. Save state to localStorage via JSON.stringify and load on startup inside try/catch.\n\nStep-by-Step Instructions:\n1. Build the HTML structure and link app.js with defer (<script src=\"app.js\" defer></script>).\n2. Implement loadBooks() and saveBooks(books) with try/catch around JSON.parse.\n3. Implement render() clearing the <ul> with replaceChildren() and appending newly created <li> nodes.\n4. Test adding <script>alert(1)</script> as a book title to confirm it renders harmlessly as plain text!\n\nDeliverables:\n- index.html and app.js.\n\nEvaluation Criteria:\n- Entering HTML/script tags renders safely as literal text (zero XSS).\n- Clicking Toggle or Delete works on newly added items via event delegation.\n- Refreshing the browser preserves all books and read states.",
      "lessons": [
        {
          "title": "Safe DOM Manipulation & Creating Elements",
          "duration": "1h 30m",
          "introduction": "Updating the DOM directly powers interactive UIs, but careless use of innerHTML opens your site to Cross-Site Scripting (XSS) attacks.",
          "objectives": [
            "Select single and multiple elements with querySelector and querySelectorAll",
            "Explain why textContent is safe against XSS while innerHTML is dangerous for user input",
            "Create and batch-insert DOM nodes cleanly with createElement and replaceChildren"
          ],
          "notes": "### Selecting Elements\n- **`document.querySelector('.card')`**: Returns the **first** matching element (or `null`).\n- **`document.querySelectorAll('.card')`**: Returns a static `NodeList` (supports `.forEach()`, or convert to an Array with `[...list]` for `.map()`/`.filter()`).\n- **`<script src=\"app.js\" defer>`**: Always put `defer` on scripts in `<head>` so the browser downloads in parallel and executes *after* the HTML DOM is parsed.\n\n### `textContent` vs `innerHTML` (Security!)\nIf a user submits their name as `<img src=\"x\" onerror=\"stealCookies()\">`:\n- Setting `el.innerHTML = userInput` **executes that malicious JavaScript**! That is an **XSS attack**.\n- Setting `el.textContent = userInput` treats it strictly as **harmless plain text**. Always use `textContent` (or `createElement`) for any user-supplied or API-supplied text.\n\n### Efficient Updates\nUse `element.classList.toggle('is-active')` for styling changes, and `list.replaceChildren(...nodes)` to swap a container's children cleanly in one call.",
          "codeExample": "const listEl = document.querySelector('#task-list');\n\nfunction renderTasks(tasks) {\n  const nodes = tasks.map((task) => {\n    const li = document.createElement('li');\n    li.dataset.id = task.id;\n    li.className = task.done ? 'task done' : 'task';\n\n    const span = document.createElement('span');\n    // SAFE: textContent prevents HTML/script injection\n    span.textContent = task.title;\n\n    const btn = document.createElement('button');\n    btn.type = 'button';\n    btn.dataset.action = 'delete';\n    btn.textContent = 'Delete';\n\n    li.append(span, btn);\n    return li;\n  });\n\n  listEl.replaceChildren(...nodes);\n}",
          "codeExplanation": "1. document.createElement builds <li>, <span>, and <button> nodes safely in memory.\n2. dataset.id and dataset.action attach data-id and data-action HTML attributes cleanly.\n3. span.textContent safely escapes any <script> characters in task.title.\n4. listEl.replaceChildren(...nodes) clears old items and inserts all new items in a single DOM update.\n\nHow to Run & Expected Output:\nInclude inside an HTML page with <ul id=\"task-list\"></ul> and call renderTasks([{ id: '1', title: 'Learn DOM', done: false }]).",
          "practiceExercise": "Guided Exercise:\n1. Build a renderAlert(message) helper using createElement and textContent, and test passing \"<b>Hello</b>\" to confirm tags appear literally.\n\nIndependent Challenge:\nUse DocumentFragment (or replaceChildren) to append 100 numbered list items in a single DOM commit.\n\nHints:\n- li.append(span, btn) can insert multiple nodes (and strings) at once, unlike older appendChild.",
          "keyTakeaways": [
            "Use <script defer> so the DOM is ready before your JavaScript runs",
            "Always use textContent for untrusted/user text — never innerHTML",
            "Use classList.add/remove/toggle and dataset attributes for clean state hooks",
            "replaceChildren(...nodes) cleanly updates a container in one operation"
          ]
        },
        {
          "title": "Event Bubbling, Event Delegation & localStorage",
          "duration": "1h 30m",
          "introduction": "Attaching a separate click listener to every button in a 500-item list wastes memory and breaks when new items are added. Event Delegation solves both.",
          "objectives": [
            "Trace the Event Bubbling phase from target element up to document",
            "Implement Event Delegation using e.target.closest()",
            "Stop unwanted form reloads with e.preventDefault()",
            "Persist and parse JSON safely in localStorage"
          ],
          "notes": "### Event Bubbling & Event Delegation\nWhen you click a `<button>` inside an `<li>` inside a `<ul>`, the click event doesn't stop at the button — it **bubbles upward** through `<li>`, `<ul>`, `<body>`, and `document`.\n**Event Delegation** takes advantage of bubbling: instead of adding 100 listeners to 100 buttons, attach **one listener** to the parent `<ul>`, then check what was clicked with:\n`const btn = e.target.closest('button[data-action]');`\nUsing `.closest()` is critical because if the user clicks an `<svg>` icon *inside* the button, `e.target` is the `<svg>`, whereas `e.target.closest('button')` reliably finds the button!\n\n### `localStorage` Best Practices\n`localStorage` only stores **strings** (up to ~5MB per origin) synchronously:\n- Save: `localStorage.setItem('tasks', JSON.stringify(tasks));`\n- Load: Wrap `JSON.parse(localStorage.getItem('tasks') || '[]')` inside `try { ... } catch { return []; }` so corrupted storage data never crashes your app.\n- **Never store passwords, JWT secrets, or sensitive PII in `localStorage`** if avoidable, since any script on the page can read it.",
          "codeExample": "const STORAGE_KEY = 'cortex_notes_v1';\n\nfunction loadNotes() {\n  try {\n    const raw = localStorage.getItem(STORAGE_KEY);\n    return raw ? JSON.parse(raw) : [];\n  } catch {\n    return [];\n  }\n}\n\nfunction saveNotes(notes) {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));\n}\n\n// Single delegated listener handles all current AND future buttons\ndocument.querySelector('#notes-list')?.addEventListener('click', (e) => {\n  const actionBtn = e.target.closest('button[data-action]');\n  if (!actionBtn) return;\n\n  const itemEl = actionBtn.closest('li[data-id]');\n  if (!itemEl) return;\n\n  console.log('Action:', actionBtn.dataset.action, 'on ID:', itemEl.dataset.id);\n});",
          "codeExplanation": "1. loadNotes wraps JSON.parse in try/catch so malformed storage never breaks app startup.\n2. saveNotes serializes arrays/objects into a JSON string via JSON.stringify.\n3. The single click listener on #notes-list uses e.target.closest(...) to handle dynamically created buttons without re-binding listeners.\n\nHow to Run & Expected Output:\nAttach to an HTML page with <ul id=\"notes-list\"><li data-id=\"7\"><button data-action=\"remove\">X</button></li></ul>. Clicking the button logs Action: remove on ID: 7.",
          "practiceExercise": "Guided Exercise:\n1. Build a theme toggle button that saves 'light' or 'dark' in localStorage and restores it on page load.\n\nIndependent Challenge:\nAdd a form submit listener that calls e.preventDefault(), reads input.value.trim(), ignores empty strings, and resets the form with form.reset().\n\nHints:\n- If an event handler is inside a form and a button has no type, browsers default <button> to type=\"submit\"! Use type=\"button\" for non-submit buttons.",
          "keyTakeaways": [
            "Events bubble up from the clicked element through its ancestors",
            "Event delegation attaches one listener on a parent and checks e.target.closest()",
            "Call e.preventDefault() on form submit events to handle submissions in JS without page reload",
            "Always JSON.stringify/JSON.parse localStorage values inside try/catch"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should you use element.textContent instead of element.innerHTML when displaying user-submitted text?",
          "options": [
            "textContent automatically translates text",
            "textContent prevents Cross-Site Scripting (XSS) by treating HTML/script tags as literal plain text",
            "innerHTML only works inside <div> tags",
            "textContent is asynchronous"
          ],
          "correctAnswer": 1,
          "explanation": "Setting innerHTML with untrusted text can execute injected HTML/JavaScript (XSS), whereas textContent renders everything safely as plain text."
        },
        {
          "question": "Why is e.target.closest(\"button\") safer than checking e.target.tagName === \"BUTTON\" in event delegation?",
          "options": [
            "closest() works even if the user clicks an icon or <span> nested inside the button",
            "tagName is deprecated in ES6",
            "closest() stops event bubbling automatically",
            "e.target is always null without closest()"
          ],
          "correctAnswer": 0,
          "explanation": "If a button contains an icon or <span>, e.target may be that inner child; closest(\"button\") walks up the DOM to find the enclosing button."
        },
        {
          "question": "What data type does localStorage store?",
          "options": [
            "JavaScript objects directly",
            "Strings only (so objects/arrays must be serialized with JSON.stringify)",
            "Binary Blobs only",
            "Numbers and booleans without conversion"
          ],
          "correctAnswer": 1,
          "explanation": "localStorage is a string-only key-value store, requiring JSON.stringify when saving and JSON.parse when reading objects/arrays."
        },
        {
          "question": "What does calling e.preventDefault() inside a form submit listener do?",
          "options": [
            "Deletes the form inputs",
            "Stops the browser from performing a full-page reload/navigation on submit",
            "Clears localStorage",
            "Disables all CSS transitions"
          ],
          "correctAnswer": 1,
          "explanation": "e.preventDefault() cancels the browser’s default form submission reload so your JavaScript can validate and handle the data via Fetch/state."
        }
      ]
    },
    {
      "title": "Module 5: Asynchronous JavaScript, Promises & Fetch API",
      "duration": "3h 30m",
      "objectives": [
        "Explain how the Call Stack, Web APIs, Microtask Queue, and Event Loop coordinate async code",
        "Consume Promises cleanly with async/await and try/catch error handling",
        "Check response.ok explicitly when using fetch() because HTTP 404/500 do not reject Promises",
        "Run parallel requests with Promise.all / Promise.allSettled and cancel stale requests with AbortController"
      ],
      "notes": "### Module Introduction\nJavaScript runs on a **single main thread**, yet it handles network requests, timers, and UI clicks without freezing the browser. Understanding the **Event Loop**, **Promises**, and **`fetch()`** is essential for any frontend or Node.js developer.\n\n### Prerequisites\n- Completion of Modules 1–4 (functions, closures, destructuring, DOM).\n\n### How the Lessons Connect\n- **Lesson 1** demystifies the Event Loop and teaches `async/await` + `fetch()` with proper `response.ok` checks.\n- **Lesson 2** scales up to parallel API calls (`Promise.all`, `Promise.allSettled`) and cancelling stale fetches with `AbortController`.\n\n### Module Summary\nYou will write resilient async data-fetching code that handles network failures, HTTP errors, parallel requests, and timeouts gracefully.\n\n### Completion Criteria\n- Complete both lessons and async exercises.\n- Deliver the Weather / GitHub Profile Fetcher with Timeout & Parallel Requests assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an async GitHub User & Repositories Fetcher module (githubClient.js) that fetches a user's profile and their latest repositories in parallel, handles HTTP 404 errors cleanly, and enforces a 5-second timeout.\n\nObjectives:\n- Avoid sequential waterfall awaits by using Promise.all.\n- Treat HTTP 404/500 responses as explicit errors using response.ok.\n- Cancel slow requests using AbortController + setTimeout (or AbortSignal.timeout).\n\nRequirements:\n1. Write fetchGitHubBundle(username, timeoutMs = 5000).\n2. Inside, create an AbortController and pass signal to both fetch() calls:\n   - https://api.github.com/users/<username>\n   - https://api.github.com/users/<username>/repos?per_page=5&sort=updated\n3. Run both requests concurrently with Promise.all.\n4. Throw a descriptive Error if !res.ok (e.g., \"User not found (404)\").\n5. Always clear the timeout in a finally block so timers don't leak.\n\nStep-by-Step Instructions:\n1. Create githubClient.js and write a reusable fetchJson(url, signal) helper.\n2. Wrap the Promise.all call in try { ... } finally { clearTimeout(timerId); }.\n3. Test with a valid username (e.g., 'octocat') and a nonexistent username to verify both success and error paths.\n\nDeliverables:\n- githubClient.js runnable in Node 18+ (which has native fetch) or browser.\n\nEvaluation Criteria:\n- Profile and repos requests start simultaneously via Promise.all.\n- HTTP 404 triggers catch/error handling properly.\n- Timeout aborts pending requests and cleans up timer in finally.",
      "lessons": [
        {
          "title": "The Event Loop, Promises & async/await",
          "duration": "1h 45m",
          "introduction": "Why does console.log(\"A\"); setTimeout(..., 0); Promise.resolve().then(...); console.log(\"D\"); print A, D, Promise, Timeout? The Event Loop explains it.",
          "objectives": [
            "Trace Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout)",
            "Explain the three Promise states: pending, fulfilled, rejected",
            "Write clean async/await functions with try/catch/finally",
            "Remember to check response.ok with fetch() because 404/500 do not reject"
          ],
          "notes": "### How the Event Loop Works\n1. **Call Stack**: Executes synchronous JS line by line.\n2. **Web APIs / Node APIs**: Handle timers (`setTimeout`) and network requests (`fetch`) outside the main thread.\n3. **Microtask Queue**: Holds resolved **Promise callbacks** (`.then`, `await` continuations).\n4. **Task (Macrotask) Queue**: Holds `setTimeout`, DOM events, etc.\n**Rule**: Whenever the Call Stack becomes empty, the Event Loop drains **ALL Microtasks** before taking the next Macrotask!\n\n### `async / await` & The `fetch()` Trap\n`async` functions always return a Promise. `await` pauses only that `async` function (never blocking the browser UI!) until the awaited Promise settles.\n**Critical `fetch()` Gotcha**: `fetch()` **only rejects on network failure** (offline, DNS failure). If the server replies with **404 Not Found** or **500 Server Error**, `fetch()` **resolves** with `response.ok === false`!\nTherefore, **always** write:\n```js\nconst res = await fetch(url);\nif (!res.ok) {\n  throw new Error(`HTTP error ${res.status}`);\n}\nconst data = await res.json();\n```",
          "codeExample": "async function fetchUserProfile(userId) {\n  try {\n    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);\n    if (!res.ok) {\n      throw new Error(`Request failed with status ${res.status}`);\n    }\n    const user = await res.json();\n    return { name: user.name, email: user.email };\n  } catch (err) {\n    console.error('Could not load user:', err.message);\n    return null;\n  } finally {\n    console.log('Fetch attempt finished (hide loading spinner here)');\n  }\n}\n\nfetchUserProfile(1).then((profile) => console.log(profile));",
          "codeExplanation": "1. async function fetchUserProfile always returns a Promise resolving to the profile object or null.\n2. if (!res.ok) manually throws an Error on 4xx/5xx responses so execution jumps to catch.\n3. finally always runs whether the request succeeded or failed — ideal for turning off loading indicators.\n\nHow to Run & Expected Output:\nRun in Node 18+ (`node fetchDemo.js`). Logs the finally message and { name: 'Leanne Graham', email: '...' }.",
          "practiceExercise": "Guided Exercise:\n1. Predict the exact console output order of:\n   console.log('1');\n   setTimeout(() => console.log('2'), 0);\n   Promise.resolve().then(() => console.log('3'));\n   console.log('4');\n   Run it in Node to verify (1, 4, 3, 2).\n\nIndependent Challenge:\nWrite a helper sleep(ms) returning new Promise(resolve => setTimeout(resolve, ms)) and await it inside an async countdown function.\n\nHints:\n- Remember: await can only be used inside an async function (or top-level ES module).",
          "keyTakeaways": [
            "Microtasks (Promises) always run before the next Macrotask (setTimeout) once the Call Stack clears",
            "async functions always return a Promise; wrap await calls in try/catch/finally",
            "fetch() does NOT reject on HTTP 404 or 500 — always check if (!res.ok)",
            "Use finally to clean up loading spinners regardless of success or error"
          ]
        },
        {
          "title": "Concurrency with Promise.all & AbortController",
          "duration": "1h 45m",
          "introduction": "Awaiting independent API calls one after another doubles loading times. Running them concurrently and cancelling stale requests makes apps feel instant.",
          "objectives": [
            "Eliminate sequential waterfalls using Promise.all",
            "Compare Promise.all (fail-fast) with Promise.allSettled (collect all outcomes)",
            "Cancel in-flight fetch requests cleanly with AbortController"
          ],
          "notes": "### Sequential Waterfall vs. Parallel `Promise.all`\nIf Request A takes 400ms and Request B takes 400ms:\n- `const a = await fetchA(); const b = await fetchB();` takes **800ms** (waterfall).\n- `const [a, b] = await Promise.all([fetchA(), fetchB()]);` starts both at once and finishes in **400ms**!\n\n### `Promise.all` vs `Promise.allSettled`\n- **`Promise.all`**: **Fail-fast**. If *any* Promise rejects, the entire `Promise.all` rejects immediately. Great when all pieces are required.\n- **`Promise.allSettled`**: Waits for **every** Promise to finish and returns an array of `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`. Great for dashboards where one failing widget shouldn't break the other widgets!\n\n### Cancelling Requests with `AbortController`\nIn search boxes or React `useEffect`, if a user types fast or navigates away, an old slow request might resolve *after* a newer one. Pass `controller.signal` to `fetch(url, { signal })` and call `controller.abort()` to cancel it cleanly.",
          "codeExample": "async function loadDashboard(signal) {\n  const urls = [\n    'https://jsonplaceholder.typicode.com/users/1',\n    'https://jsonplaceholder.typicode.com/posts?userId=1'\n  ];\n\n  const [userRes, postsRes] = await Promise.all(\n    urls.map((url) => fetch(url, { signal }))\n  );\n\n  if (!userRes.ok || !postsRes.ok) {\n    throw new Error('Failed to load dashboard bundle');\n  }\n\n  const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);\n  return { user: user.name, postCount: posts.length };\n}\n\nconst controller = new AbortController();\nsetTimeout(() => controller.abort(), 5000); // 5s safety timeout\n\nloadDashboard(controller.signal)\n  .then(console.log)\n  .catch((err) => {\n    if (err.name === 'AbortError') console.log('Request timed out / cancelled');\n    else console.error(err.message);\n  });",
          "codeExplanation": "1. Both fetch() calls are launched simultaneously inside Promise.all, cutting total wait time roughly in half.\n2. controller.signal links both requests to a single AbortController so a 5-second timeout can cancel them together.\n3. Catching err.name === 'AbortError' distinguishes intentional cancellation from genuine network bugs.\n\nHow to Run & Expected Output:\nRun in Node 18+. Prints { user: 'Leanne Graham', postCount: 10 }.",
          "practiceExercise": "Guided Exercise:\n1. Test Promise.allSettled([Promise.resolve('OK'), Promise.reject(new Error('Boom'))]) and inspect the status objects returned.\n\nIndependent Challenge:\nWrite a search handler that stores let currentController = null; aborts any previous controller before starting a new fetch, and ignores AbortError.\n\nHints:\n- Call currentController?.abort(); before creating new AbortController().",
          "keyTakeaways": [
            "Use Promise.all to run independent async operations concurrently instead of awaiting sequentially",
            "Use Promise.allSettled when partial failures are acceptable and you want every result",
            "Pass an AbortController signal to fetch() to implement timeouts and cancel stale requests",
            "Handle err.name === \"AbortError\" gracefully so cancellations are not logged as crashes"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens when fetch() receives an HTTP 404 Not Found response from a server?",
          "options": [
            "The returned Promise automatically rejects and enters catch()",
            "The returned Promise resolves with response.ok set to false",
            "The browser retries the request 3 times",
            "response.json() returns an empty array automatically"
          ],
          "correctAnswer": 1,
          "explanation": "fetch() only rejects on network failures. HTTP 404 and 500 still resolve, so you must check if (!response.ok) throw new Error(...)."
        },
        {
          "question": "Which runs first after synchronous Call Stack code finishes?",
          "options": [
            "setTimeout(..., 0) callback",
            "Resolved Promise .then() microtask",
            "requestAnimationFrame callback",
            "Click event listener"
          ],
          "correctAnswer": 1,
          "explanation": "The Event Loop drains the Microtask Queue (Promise callbacks) completely before picking up the next Macrotask (like setTimeout)."
        },
        {
          "question": "When should you prefer Promise.allSettled() over Promise.all()?",
          "options": [
            "When you want to run requests sequentially one by one",
            "When you need results from all independent requests even if one or more fail",
            "When you want to cancel a pending fetch",
            "When you only have one Promise"
          ],
          "correctAnswer": 1,
          "explanation": "Promise.all fails fast on the first rejection; Promise.allSettled waits for every Promise and reports each individual status."
        },
        {
          "question": "What API allows you to cancel an in-flight fetch() request?",
          "options": [
            "Promise.cancel()",
            "AbortController",
            "clearInterval()",
            "Error.captureStackTrace()"
          ],
          "correctAnswer": 1,
          "explanation": "Passing controller.signal to fetch(url, { signal }) lets you cancel the request by calling controller.abort()."
        }
      ]
    },
    {
      "title": "Module 6: ES Modules, Error Architecture & Capstone Project",
      "duration": "3h 15m",
      "objectives": [
        "Split JavaScript applications cleanly using ES Modules (export / import)",
        "Distinguish named exports from default exports",
        "Create custom Error subclasses and handle failures at system boundaries",
        "Architect and build the Task & Habit Manager capstone application"
      ],
      "notes": "### Module Introduction\nReal applications cannot live in a single 2,000-line script file. **ES Modules (ESM)** give JavaScript a standardized way to split code into focused files with explicit dependencies, while structured **Error classes** keep debugging fast and predictable.\n\n### Prerequisites\n- Completion of Modules 1–5 (variables, closures, array pipelines, DOM, localStorage, async/await).\n\n### How the Lessons Connect\n- **Lesson 1** teaches ES Modules (`import`/`export`) and custom `Error` classes.\n- **Lesson 2** brings the entire course together into the **Task & Habit Manager** capstone architecture.\n\n### Module Summary\nYou can now design modular, resilient, interactive JavaScript applications from scratch.\n\n### Completion Criteria\n- Complete both lessons.\n- Build and test the full Task & Habit Manager Capstone Assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild the complete Capstone Application: a modular Task & Habit Manager web app split across ES modules (storage.js, state.js, ui.js, main.js).\n\nObjectives:\n- Organize code into single-responsibility ES modules with explicit imports/exports.\n- Combine DOM manipulation, event delegation, array pipelines, localStorage, and Fetch API with error boundaries.\n\nRequirements:\n1. Create storage.js exporting loadTasks() and saveTasks(tasks) with try/catch.\n2. Create state.js exporting pure functions: addTask(tasks, title), toggleTask(tasks, id), deleteTask(tasks, id), filterTasks(tasks, filter).\n3. Create ui.js exporting renderTasks(container, tasks) using createElement and textContent (zero XSS).\n4. Create main.js wiring:\n   - Form submission to add tasks\n   - Delegated click listener on the task list for toggle/delete\n   - Filter buttons (All, Active, Completed)\n   - An async \"Daily Motivation Quote\" loader using fetch() + AbortController timeout + graceful fallback text if offline.\n5. Load main.js with <script type=\"module\" src=\"./main.js\"></script>.\n\nStep-by-Step Instructions:\n1. Scaffold index.html and the 4 JS modules in one folder.\n2. Serve the folder via a local static server (e.g., npx serve or VS Code Live Server — note ES modules require HTTP, not file://, due to CORS).\n3. Test adding, toggling, deleting, filtering, and refreshing the page.\n4. Test offline behavior in DevTools Network tab to confirm the fallback quote renders without crashing the task manager.\n\nDeliverables:\n- index.html, storage.js, state.js, ui.js, and main.js.\n\nEvaluation Criteria:\n- Clean ES module separation with zero global window variables.\n- Pure immutable state helpers in state.js.\n- Graceful offline/error fallback for the motivation quote widget.",
      "lessons": [
        {
          "title": "ES Modules (import/export) & Custom Errors",
          "duration": "1h 30m",
          "introduction": "ES Modules isolate file scope automatically, eliminate global variable collisions, and make dependencies explicit at the top of every file.",
          "objectives": [
            "Use named exports/imports and default exports/imports accurately",
            "Understand that ES modules execute in strict mode with file-level scope",
            "Extend the built-in Error class for domain-specific errors (ValidationError, ApiError)"
          ],
          "notes": "### ES Modules (ESM)\nEvery file loaded with `<script type=\"module\">` (or `\"type\": \"module\"` in Node `package.json`) gets its own private scope and runs in **strict mode** automatically.\n- **Named Exports** (recommended for utilities/services):\n  `export const TAX_RATE = 0.08;`\n  `export function calcTotal() { ... }`\n  Imported with exact names: `import { TAX_RATE, calcTotal } from './math.js';`\n- **Default Export** (max one per file, common for a single component/class):\n  `export default class ApiClient { ... }`\n  Imported without braces: `import ApiClient from './ApiClient.js';`\n\n### Custom Error Classes\nThrowing plain strings (`throw \"bad input\"`) loses stack traces! Instead, extend `Error`:\n```js\nexport class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n```\nCallers can then check `if (err instanceof ValidationError)` to highlight the exact form field in red while letting unexpected bugs surface normally!",
          "codeExample": "// errors.js\nexport class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\nexport function validateTaskTitle(title) {\n  const cleaned = (title ?? '').trim();\n  if (cleaned.length < 2) {\n    throw new ValidationError('Task title must be at least 2 characters', 'title');\n  }\n  return cleaned;\n}\n\n// Usage in caller:\ntry {\n  validateTaskTitle(' ');\n} catch (err) {\n  if (err instanceof ValidationError) {\n    console.warn(`Field [${err.field}]: ${err.message}`);\n  } else {\n    throw err; // Re-throw unexpected bugs\n  }\n}",
          "codeExplanation": "1. ValidationError extends built-in Error, preserving stack traces via super(message) and attaching a custom field property.\n2. validateTaskTitle trims input and throws ValidationError if too short.\n3. The catch block handles ValidationError specifically and re-throws any unexpected runtime bugs.\n\nHow to Run & Expected Output:\nRun in an ESM Node context or module script. Prints: Field [title]: Task title must be at least 2 characters.",
          "practiceExercise": "Guided Exercise:\n1. Split validateTaskTitle into validators.js and import it into app.js using import { validateTaskTitle } from './validators.js'.\n\nIndependent Challenge:\nCreate an HttpError(status, message) subclass of Error and use it inside a fetchJson(url) helper when !res.ok.\n\nHints:\n- Always include the .js file extension in browser and native Node ESM relative imports!",
          "keyTakeaways": [
            "ES Modules provide file-level scope and automatic strict mode",
            "Use named exports for collections of helpers and default exports for a primary class/component",
            "Always throw Error instances (or custom Error subclasses) rather than strings",
            "Check err instanceof CustomError in catch blocks and re-throw unknown errors"
          ]
        },
        {
          "title": "Capstone Architecture: Task & Habit Manager",
          "duration": "1h 45m",
          "introduction": "Let’s combine everything from Modules 1–6 into a clean, scalable client-side architecture separating State, Storage, UI Rendering, and Event Wiring.",
          "objectives": [
            "Separate pure state transformations from DOM side effects",
            "Keep a single source of truth in memory synced to localStorage",
            "Render UI declaratively from state after every action"
          ],
          "notes": "### Why Separate State, Storage, and UI?\nBeginners often mix `document.querySelector`, `localStorage`, and business logic inside one giant click handler. That makes bugs hard to find and code impossible to unit test.\nInstead, use a clean 3-layer architecture:\n1. **`state.js` (Pure Logic)**: Functions like `addTask(tasks, title)` take an array and return a **new array**. Zero DOM references — easy to test in Node!\n2. **`storage.js` (Persistence)**: `loadTasks()` and `saveTasks(tasks)` isolate `localStorage` and `JSON.parse` `try/catch`.\n3. **`ui.js` & `main.js` (DOM & Events)**: `render(tasks)` draws the current state cleanly; event handlers update state -> save -> re-render.\n\n### Common Mistakes & Solutions\n- **Mistake**: Mixing `document.querySelector` DOM calls directly inside state calculation functions.\n  - **Solution**: Keep `state.js` 100% pure so business rules can be tested in Node without a browser.",
          "codeExample": "// state.js - Pure, testable state transitions (no DOM!)\nexport function addTask(tasks, title) {\n  const cleanTitle = title.trim();\n  if (!cleanTitle) return tasks;\n  return [\n    ...tasks,\n    { id: crypto.randomUUID(), title: cleanTitle, done: false }\n  ];\n}\n\nexport function toggleTask(tasks, id) {\n  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));\n}\n\nexport function deleteTask(tasks, id) {\n  return tasks.filter((t) => t.id !== id);\n}\n\n// Quick test in Node:\nlet state = addTask([], 'Ship Cortex Capstone');\nstate = toggleTask(state, state[0].id);\nconsole.log(state);",
          "codeExplanation": "1. addTask uses crypto.randomUUID() for unique IDs and spread [...tasks, newTask] to avoid mutating the existing array.\n2. toggleTask maps over tasks and clones only the matching task with done flipped.\n3. deleteTask filters out the matching ID cleanly.\n4. Notice zero DOM calls exist here, so you can test all business rules directly in Node!\n\nHow to Run & Expected Output:\nRun with `node state.js`. Prints an array containing one task object with done: true.",
          "practiceExercise": "Guided Exercise:\n1. Add a filterTasks(tasks, mode) function to state.js supporting 'all', 'active', and 'completed'.\n\nIndependent Challenge:\nAdd a clearCompleted(tasks) function and a completedCount(tasks) selector, then wire them into your Capstone UI.\n\nHints:\n- Keeping state functions pure means you never have to manually hunt down and patch individual <li> elements on toggle/delete.",
          "keyTakeaways": [
            "Separate pure state logic from DOM rendering and localStorage persistence",
            "Use a unidirectional flow: Event -> Update State -> Save -> Re-render",
            "crypto.randomUUID() generates collision-free client IDs natively",
            "Pure state functions can be tested directly in Node without a browser"
          ]
        }
      ],
      "quiz": [
        {
          "question": "How do you import a named export named formatDate from ./utils.js?",
          "options": [
            "import formatDate from \"./utils.js\";",
            "import { formatDate } from \"./utils.js\";",
            "require(\"./utils.js\").formatDate;",
            "import * from \"./utils.js\";"
          ],
          "correctAnswer": 1,
          "explanation": "Named exports must be imported inside curly braces { formatDate } matching the exported identifier."
        },
        {
          "question": "Why should you throw new Error(\"...\") instead of throw \"...\"?",
          "options": [
            "Strings cannot be caught by catch blocks",
            "Error instances preserve a stack trace and type metadata for debugging and instanceof checks",
            "throw \"...\" causes an infinite loop",
            "Error instances automatically send reports to the server"
          ],
          "correctAnswer": 1,
          "explanation": "Throwing an Error (or custom Error subclass) captures the call stack trace and supports instanceof checks."
        },
        {
          "question": "Why should pure state functions like addTask(tasks, title) avoid touching document.querySelector?",
          "options": [
            "document is undefined in ES Modules",
            "Keeping state logic pure makes it predictable, reusable, and easy to unit test without a browser",
            "querySelector is slower inside functions",
            "ES Modules disallow DOM calls"
          ],
          "correctAnswer": 1,
          "explanation": "Separating pure state transitions from DOM rendering makes code modular, bug-resistant, and testable in Node."
        },
        {
          "question": "What happens automatically inside every <script type=\"module\"> file?",
          "options": [
            "All variables become global on window",
            "Code runs in strict mode with private module-level scope",
            "jQuery is loaded automatically",
            "localStorage is cleared"
          ],
          "correctAnswer": 1,
          "explanation": "ES Modules run in strict mode automatically and keep top-level declarations scoped to that module rather than polluting window."
        }
      ]
    },
    {
      "title": "Module 7: Prototypes, Classes, `this` Binding & Object-Oriented JS",
      "duration": "2h 30m",
      "objectives": [
        "Predict what `this` points to across regular calls, method calls, arrow functions, and .bind()",
        "Explain JavaScript’s prototype chain and how ES6 class syntax builds on prototypes",
        "Use ES6 classes, inheritance (extends/super), and private fields (#balance) cleanly"
      ],
      "notes": "### Module Introduction & Description\nJavaScript is a **prototype-based** object-oriented language. Understanding `this` binding rules and how ES6 `class` syntax wraps prototypes eliminates mysterious `Cannot read properties of undefined` errors inside event handlers and callbacks.\n\n### Prerequisites\n- Completion of Modules 1–6 (functions, closures, objects, ES Modules).\n\n### Skills Acquired\n- Mastering `this` resolution, `.bind()/.call()/.apply()`, prototype lookup, and modern ES6 classes with `#private` encapsulation.\n\n### How the Lessons Connect\n- **Lesson 1** demystifies `this` binding and the prototype chain.\n- **Lesson 2** applies ES6 `class`, `extends`, `super`, and private `#fields`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Encapsulated Wallet & Account Hierarchy assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an Object-Oriented Account & SavingsAccount hierarchy in ES6+ JavaScript using private #balance fields so external code cannot tamper with balances directly, and verify method callbacks retain proper `this` binding.\n\nObjectives:\n- Encapsulate sensitive state using ES2022 private class fields (#balance).\n- Use extends and super() cleanly for inheritance.\n\nRequirements:\n1. Create class Account with private #balance = 0, constructor(owner, initialBalance = 0), deposit(amount), withdraw(amount), and getter balance.\n2. Validate amount > 0 and sufficient funds in withdraw(), throwing descriptive Errors.\n3. Create class SavingsAccount extends Account adding interestRate and applyInterest().\n4. Demonstrate extracting a bound method (const dep = acc.deposit.bind(acc)) vs an unbound arrow wrapper.\n\nStep-by-Step Instructions:\n1. Create accounts.js and implement Account and SavingsAccount.\n2. Verify accessing acc.#balance from outside throws a SyntaxError, while acc.balance returns the read-only value.\n\nDeliverables:\n- accounts.js runnable via node accounts.js.\n\nEvaluation Criteria:\n- True #private encapsulation; zero _balance pseudo-private fields.\n- Clean super() constructor forwarding.",
      "lessons": [
        {
          "title": "Understanding `this`, .bind/.call/.apply & Prototypes",
          "duration": "1h 15m",
          "introduction": "Why does passing `user.greet` directly into `setTimeout(user.greet, 100)` lose `user.name`? Because in regular functions, `this` depends on HOW a function is called, not where it is defined.",
          "objectives": [
            "Apply the 4 `this` rules (method call, standalone call, explicit call/apply/bind, arrow lexical `this`)",
            "Explain how prototype delegation (Object.getPrototypeOf) looks up shared methods"
          ],
          "notes": "### The 4 Rules of `this`\n1. **Method call** (`user.greet()`): `this` is the object **left of the dot** (`user`).\n2. **Standalone call** (`const fn = user.greet; fn()`): In strict mode / ES modules, `this` is **`undefined`**!\n3. **Explicit binding**: `fn.call(obj, a, b)`, `fn.apply(obj, [a, b])` invoke immediately with `this = obj`; `const bound = fn.bind(obj)` returns a permanently bound function.\n4. **Arrow functions**: Have **NO `this` of their own** — they inherit `this` lexically from the enclosing scope!\n\n### Common Mistakes & Solutions\n- **Mistake**: Passing `btn.addEventListener('click', timer.start)` and losing `timer` as `this`.\n  - **Solution**: Pass `() => timer.start()` or `timer.start.bind(timer)`.",
          "codeExample": "const mentor = {\n  name: 'Ada',\n  introduce(topic) {\n    return `Hi, I am ${this.name}, teaching ${topic}.`;\n  }\n};\n\nconsole.log(mentor.introduce('Prototypes')); // 'this' is mentor\n\nconst detached = mentor.introduce;\n// detached('JS') -> TypeError in strict mode ('this' is undefined!)\n\nconst boundIntro = mentor.introduce.bind(mentor);\nconsole.log(boundIntro('Closures')); // Works cleanly!",
          "codeExplanation": "1. mentor.introduce() binds this to mentor because mentor sits left of the dot.\n2. Extracting detached = mentor.introduce loses the dot context, so .bind(mentor) locks this permanently.\n\nHow to Run & Expected Output:\nRun with `node thisDemo.js`. Prints both introduction strings cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Test `mentor.introduce.call({ name: 'Grace' }, 'Compilers')` to see explicit `this` injection.\n\nIndependent Challenge:\nWrite a `Timer` constructor or object with a `start()` method using an arrow callback inside `setTimeout` vs a regular function to see why arrow callbacks preserve `this`.\n\nExpected Result:\nAccurate prediction of `this` across method, detached, bound, and arrow calls.",
          "keyTakeaways": [
            "For regular functions, `this` is determined at call time (usually the object left of the dot)",
            "Arrow functions inherit `this` lexically from their surrounding scope and cannot be rebound",
            "Use .bind() or arrow wrappers when passing object methods as callbacks"
          ]
        },
        {
          "title": "ES6 Classes, Inheritance, Private Fields (#) & Static Methods",
          "duration": "1h 15m",
          "introduction": "ES6 classes provide clean, familiar syntax over JavaScript prototypes — and modern #private fields enforce real encapsulation at the engine level.",
          "objectives": [
            "Define constructors, instance methods, getters, and static helpers in ES6 classes",
            "Use #private fields for true runtime encapsulation",
            "Extend classes cleanly with extends and super()"
          ],
          "notes": "### Modern ES6+ Class Features\n- **`#privateField`**: Prefixing a property with `#` makes it **strictly inaccessible** outside the class body (unlike older `_balance` naming conventions).\n- **`get balance()`**: Exposes read-only computed access cleanly (`acc.balance`) without parentheses.\n- **`static` methods**: Utility factories attached to the Class itself (`Account.fromJson(data)`) rather than instances.\n- **`extends` + `super()`**: Subclass constructors **must** call `super(...)` before touching `this`.",
          "codeExample": "class Wallet {\n  #balance = 0;\n\n  constructor(owner, initial = 0) {\n    this.owner = owner;\n    if (initial > 0) this.#balance = initial;\n  }\n\n  deposit(amount) {\n    if (amount <= 0) throw new Error('Deposit must be positive');\n    this.#balance += amount;\n    return this.#balance;\n  }\n\n  get balance() {\n    return this.#balance;\n  }\n}\n\nconst w = new Wallet('Ada', 50);\nw.deposit(25);\nconsole.log(w.owner, w.balance); // Ada 75",
          "codeExplanation": "1. #balance is genuinely private inside Wallet; external code cannot mutate w.#balance = 9999.\n2. get balance() exposes safe read-only access.\n\nHow to Run & Expected Output:\nRun with `node wallet.js`. Prints `Ada 75`.",
          "practiceExercise": "Guided Exercise:\n1. Add a `withdraw(amount)` method to `Wallet` throwing `Error('Insufficient funds')` if `amount > this.#balance`.\n\nIndependent Challenge:\nCreate `RewardsWallet extends Wallet` that adds a `points` field and awards 1 point per $10 deposited via `super.deposit(amount)`.\n\nExpected Result:\nTrue private state encapsulation and clean inheritance.",
          "keyTakeaways": [
            "ES6 classes are syntactic sugar over JavaScript’s prototype chain",
            "Use #fieldName for true engine-enforced private properties",
            "Call super() in subclass constructors before accessing `this`"
          ]
        }
      ],
      "quiz": [
        {
          "question": "In an ES module (strict mode), what is `this` when you extract `const fn = obj.method; fn();`?",
          "options": [
            "window / globalThis",
            "obj",
            "undefined",
            "null"
          ],
          "correctAnswer": 2,
          "explanation": "Detaching a method loses its left-of-the-dot receiver; in strict mode/ESM, standalone calls bind `this` to undefined."
        },
        {
          "question": "How does an arrow function determine its `this` value?",
          "options": [
            "From the object left of the dot when called",
            "Lexically from its enclosing outer scope where it was defined",
            "Always null",
            "From arguments[0]"
          ],
          "correctAnswer": 1,
          "explanation": "Arrow functions do not bind their own `this`; they inherit `this` from the surrounding lexical scope."
        },
        {
          "question": "What is the advantage of `#balance` over `_balance` in a JavaScript class?",
          "options": [
            "#balance makes the property global",
            "#balance is enforced by the JS engine and cannot be accessed or mutated outside the class",
            "_balance is faster",
            "#balance converts numbers to strings"
          ],
          "correctAnswer": 1,
          "explanation": "_balance is just a naming convention; #balance enforces real runtime privacy."
        },
        {
          "question": "In a subclass `class Dog extends Animal`, what must happen inside `constructor()` before using `this`?",
          "options": [
            "Call super(...)",
            "Call Dog.init()",
            "Return this",
            "Nothing"
          ],
          "correctAnswer": 0,
          "explanation": "Subclass constructors must invoke super() to initialize the parent prototype state before referencing `this`."
        }
      ]
    },
    {
      "title": "Module 8: Advanced Data Structures (Map, Set) & Regular Expressions",
      "duration": "2h 30m",
      "objectives": [
        "Choose Map over plain Objects for dynamic keys, preserved order, and O(1) .size",
        "Deduplicate arrays and perform fast O(1) membership checks with Set",
        "Write readable, safe Regular Expressions for validation and text extraction"
      ],
      "notes": "### Module Introduction & Description\nPlain objects `{}` and `Array.includes()` work for small lists, yet degrade or hit key-collision bugs (`__proto__`, non-string keys) at scale. **`Map`**, **`Set`**, and **Regular Expressions** give you O(1) lookups, effortless deduplication, and concise pattern matching.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Choosing `Map`/`Set`/`WeakMap` appropriately and writing maintainable regex patterns without catastrophic backtracking.\n\n### How the Lessons Connect\n- **Lesson 1** covers `Map`, `Set`, and `WeakMap` patterns.\n- **Lesson 2** teaches practical Regular Expressions with character classes, quantifiers, groups, and safety limits.\n\n### Completion Criteria\n- Complete both lessons, deliver the Log Word-Frequency & Validator assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a Tag Deduplicator & Text Log Analyzer using Set, Map, and safe Regular Expressions to extract unique hashtags, count word frequencies, and validate course slugs.\n\nObjectives:\n- Deduplicate tags cleanly in O(n) using Set.\n- Count frequencies with Map (supporting arbitrary string keys safely, even \"constructor\" or \"__proto__\").\n- Validate slugs using an anchored RegExp.\n\nRequirements:\n1. Write uniqueTags(tags) using [...new Set(tags.map(t => t.trim().toLowerCase()))].\n2. Write countWords(text) returning a Map of normalized word -> count.\n3. Write isValidSlug(slug) using /^[a-z0-9]+(?:-[a-z0-9]+)*$/.\n4. Test edge cases: empty string, repeated tags with mixed case, and words like \"constructor\".\n\nStep-by-Step Instructions:\n1. Create textTools.js implementing all three functions.\n2. Run node textTools.js and verify outputs.\n\nDeliverables:\n- textTools.js.\n\nEvaluation Criteria:\n- Uses Map instead of {} for arbitrary user-text frequency counting (immune to prototype key collisions!).\n- Anchored regex (^...$) prevents partial substring false positives.",
      "lessons": [
        {
          "title": "Map, Set, WeakMap & Deduplication Patterns",
          "duration": "1h 15m",
          "introduction": "Checking `if (!arr.includes(item))` inside a loop over 50,000 items is O(n^2) slow. A Set turns that check into instant O(1).",
          "objectives": [
            "Deduplicate arrays in one line with [...new Set(arr)]",
            "Use Map.get / Map.set / Map.has safely for dynamic keys and non-string keys",
            "Understand WeakMap for garbage-collection-friendly object metadata"
          ],
          "notes": "### `Set` for Uniqueness & Fast Lookup\n- `const unique = [...new Set(items)];` removes duplicates while preserving insertion order.\n- `set.has(val)` runs in **O(1)** average time compared to `array.includes(val)` O(n).\n\n### `Map` vs. Plain Object `{}`\n- `Map` accepts **any key type** (even objects or numbers), has an instant `.size` property, preserves insertion order, and **never collides with `Object.prototype` keys** like `\"toString\"` or `\"constructor\"`!\n- `WeakMap` holds object keys weakly — if the object is no longer referenced elsewhere, JavaScript can garbage-collect it automatically (zero memory leaks!).",
          "codeExample": "const rawTags = ['JS', 'react', 'js', 'Node', 'React'];\nconst cleanTags = [...new Set(rawTags.map((t) => t.toLowerCase()))];\n\nconst wordCounts = new Map();\nfor (const word of ['constructor', 'js', 'js', 'map']) {\n  wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);\n}\n\nconsole.log(cleanTags);           // ['js', 'react', 'node']\nconsole.log(wordCounts.size);     // 3\nconsole.log(wordCounts.get('js')); // 2",
          "codeExplanation": "1. Set deduplicates normalized lowercase tags in O(n) while keeping insertion order.\n2. Map safely counts 'constructor' (which would collide with Object.prototype.constructor on a plain {}!).\n\nHow to Run & Expected Output:\nRun with `node collections.js`. Prints `['js', 'react', 'node']`, `3`, and `2`.",
          "practiceExercise": "Guided Exercise:\n1. Build a `hasIntersection(arrA, arrB)` helper using `const setA = new Set(arrA); return arrB.some(x => setA.has(x));`.\n\nIndependent Challenge:\nDeduplicate an array of user objects `[{ id: 1, name: 'Ada' }, { id: 1, name: 'Ada' }]` by `id` using a `Map`.\n\nExpected Result:\nO(n) deduplication and collision-free key counting.",
          "keyTakeaways": [
            "Use Set for O(1) membership checks and array deduplication",
            "Prefer Map over plain objects {} when keys are dynamic user strings or non-strings",
            "WeakMap prevents memory leaks when attaching metadata to DOM nodes or objects"
          ]
        },
        {
          "title": "Practical Regular Expressions for Validation & Parsing",
          "duration": "1h 15m",
          "introduction": "Regular Expressions look cryptic until you break them into 4 simple building blocks: anchors, character classes, quantifiers, and capture groups.",
          "objectives": [
            "Anchor validation regexes with ^ and $ so partial matches don’t sneak past",
            "Use named capture groups (?<name>...) and String.prototype.matchAll",
            "Avoid nested catastrophic backtracking patterns (ReDoS)"
          ],
          "notes": "### Always Anchor Validation Regexes (`^...$`)\nWriting `/[a-z0-9-]+/.test(\"valid-slug!!!\")` returns **`true`** because `\"valid-slug\"` matched *part* of the string! Always wrap full-string validators with `^` (start) and `$` (end).\n\n### Named Capture Groups & `matchAll`\nInstead of counting `match[1]`, `match[2]`, name your groups:\n`/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/`\nThen read `match.groups.year`!",
          "codeExample": "const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;\nconsole.log(SLUG_RE.test('html-css-101')); // true\nconsole.log(SLUG_RE.test('bad slug!'));    // false\n\nconst DATE_RE = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;\nconst text = 'Launch: 2026-05-01, Review: 2026-06-15';\nfor (const m of text.matchAll(DATE_RE)) {\n  console.log(m.groups);\n}",
          "codeExplanation": "1. SLUG_RE anchors both ends (^...$) and requires alphanumeric segments separated by single hyphens.\n2. matchAll(DATE_RE) extracts every date match along with clean named groups ({ year, month, day }).\n\nHow to Run & Expected Output:\nRun with `node regexDemo.js`. Prints true, false, and both { year, month, day } objects.",
          "practiceExercise": "Guided Exercise:\n1. Test `SLUG_RE` against `\"-leading\"`, `\"trailing-\"`, and `\"double--dash\"` to verify all three return `false`.\n\nIndependent Challenge:\nWrite a regex extracting all `#hashtag` tokens from a post string using `matchAll(/#([a-zA-Z0-9_]+)/g)`.\n\nExpected Result:\nAccurate anchored validation and clean named extraction.",
          "keyTakeaways": [
            "Always use ^ and $ anchors when validating entire strings with RegExp",
            "Use named capture groups (?<key>...) with matchAll() for readable extraction",
            "Keep regex patterns simple without nested ambiguous quantifiers like (a+)+"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is `new Map()` safer than a plain `{}` object when counting frequencies of arbitrary user-entered words?",
          "options": [
            "Plain objects cannot store numbers",
            "Map has no inherited prototype keys like \"toString\" or \"constructor\" that can collide with user words",
            "Map sorts keys alphabetically automatically",
            "Plain objects do not support strings"
          ],
          "correctAnswer": 1,
          "explanation": "Plain objects inherit properties from Object.prototype (unless created with Object.create(null)), whereas Map is completely collision-free."
        },
        {
          "question": "What is the time complexity of `mySet.has(value)` compared to `myArray.includes(value)`?",
          "options": [
            "Both are O(n)",
            "Set.has() is O(1) average time, while Array.includes() is O(n) linear scan",
            "Set.has() is O(n^2)",
            "Array.includes() is faster for 100,000 items"
          ],
          "correctAnswer": 1,
          "explanation": "Sets use hash-based lookup for O(1) average membership checks."
        },
        {
          "question": "Why did `/[a-z]+/.test(\"abc123\")` return `true` even though \"123\" is not lowercase letters?",
          "options": [
            "JavaScript ignores numbers in regex",
            "Without ^ and $ anchors, .test() returns true if ANY substring matches",
            "+ means optional",
            "test() only checks the first character"
          ],
          "correctAnswer": 1,
          "explanation": "Unanchored regexes match anywhere inside the string; wrap full-string validators with ^...$."
        },
        {
          "question": "What is the unique advantage of `WeakMap` over `Map` when attaching metadata to DOM elements or objects?",
          "options": [
            "WeakMap can use string keys",
            "WeakMap keys are held weakly, allowing garbage collection once the object is no longer referenced elsewhere",
            "WeakMap has a .size property",
            "WeakMap serializes directly to JSON"
          ],
          "correctAnswer": 1,
          "explanation": "WeakMap prevents memory leaks by allowing unused key objects to be garbage-collected automatically."
        }
      ]
    },
    {
      "title": "Module 9: Iterators, Generators, Debouncing & Performance Patterns",
      "duration": "2h 30m",
      "objectives": [
        "Implement debounce and throttle utilities using closures and timers",
        "Prevent memory leaks from uncleaned intervals, listeners, and detached DOM nodes",
        "Build custom lazy sequences with Symbol.iterator and generator functions (function*)"
      ],
      "notes": "### Module Introduction & Description\nTyping into a search box or scrolling a page can fire **hundreds of events per second**. Learning **debouncing**, **throttling**, **timer cleanup**, and **lazy generators** keeps interactive web apps silky-smooth and leak-free.\n\n### Prerequisites\n- Completion of Modules 1–8 (closures, functions, timers).\n\n### Skills Acquired\n- Writing reusable `debounce()` / `throttle()` utilities, avoiding timer/listener memory leaks, and generating lazy sequences with `function*` + `yield`.\n\n### How the Lessons Connect\n- **Lesson 1** implements `debounce` and `throttle` with closures and demonstrates memory-leak prevention.\n- **Lesson 2** teaches custom iterators and generator functions (`function*` / `yield`).\n\n### Completion Criteria\n- Complete both lessons, deliver the Debounced Search & Paginated ID Generator assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nA live search bar fires an API call on every keystroke, and a batch processor tries to pre-allocate 1,000,000 sequential IDs in an array upfront. Fix both with a closure-based debounce() utility and a lazy generator function.\n\nObjectives:\n- Implement debounce(fn, delayMs) returning a wrapped function with a .cancel() method.\n- Implement a lazy function* idGenerator(prefix = 'ID') yielding formatted IDs on demand.\n\nRequirements:\n1. debounce(fn, wait = 300) clears any pending timer on each call and schedules a new setTimeout.\n2. Attach debounced.cancel = () => clearTimeout(timerId) for cleanup on unmount.\n3. Implement function* idGenerator(prefix = 'ITEM') { let n = 1; while (true) { yield `${prefix}-${n++}`; } }.\n4. Demonstrate pulling 5 IDs cleanly without creating an infinite loop!\n\nStep-by-Step Instructions:\n1. Create perfHelpers.js with debounce and idGenerator.\n2. Test debounce in Node using rapid calls followed by a short delay, confirming fn runs only once!\n\nDeliverables:\n- perfHelpers.js.\n\nEvaluation Criteria:\n- debounce forwards arguments (...args) and supports .cancel().\n- Generator yields lazily without hanging.",
      "lessons": [
        {
          "title": "Debouncing, Throttling & Memory Leak Prevention",
          "duration": "1h 15m",
          "introduction": "Closures + setTimeout power two of the most practical performance helpers in frontend engineering: debounce and throttle.",
          "objectives": [
            "Contrast debounce (wait until activity pauses) with throttle (at most once per interval)",
            "Implement a clean debounce(fn, delay) utility",
            "Clean up setInterval and global event listeners to prevent memory leaks"
          ],
          "notes": "### Debounce vs. Throttle\n- **Debounce**: *\"Wait until the user stops typing for 300ms, then run ONCE.\"* Ideal for search inputs and window resize recalculations.\n- **Throttle**: *\"Run at most once every 100ms while activity continues.\"* Ideal for scroll progress bars or mouse-tracking analytics.\n\n### Common Memory Leaks in JS\n1. Leaving `setInterval` running after a widget is removed from the page.\n2. Adding `window.addEventListener('resize', handler)` repeatedly without `removeEventListener`.",
          "codeExample": "export function debounce(fn, delayMs = 300) {\n  let timerId = null;\n\n  const debounced = (...args) => {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn(...args);\n    }, delayMs);\n  };\n\n  debounced.cancel = () => clearTimeout(timerId);\n  return debounced;\n}\n\nconst logSearch = debounce((q) => console.log('Fetching:', q), 200);\nlogSearch('r');\nlogSearch('re');\nlogSearch('react'); // Only 'Fetching: react' runs!",
          "codeExplanation": "1. timerId lives in the closure created by debounce().\n2. Each rapid call cancels the previous timer and starts a fresh 200ms countdown.\n3. debounced.cancel() lets callers clean up pending timers on unmount.\n\nHow to Run & Expected Output:\nRun with `node debounceDemo.js`. After 200ms, prints `Fetching: react` exactly once.",
          "practiceExercise": "Guided Exercise:\n1. Add a `throttle(fn, limitMs)` helper tracking `let lastRun = 0` (or `inThrottle` boolean).\n\nIndependent Challenge:\nCall `logSearch.cancel()` right after `logSearch('react')` and verify nothing prints.\n\nExpected Result:\nZero wasted calls during rapid bursts and clean cancellation.",
          "keyTakeaways": [
            "Debounce delays execution until rapid calls pause (search inputs)",
            "Throttle limits execution to at most once per time window (scroll/drag events)",
            "Always provide cleanup/cancel hooks for timers and global event listeners"
          ]
        },
        {
          "title": "Custom Iterators, Symbols & Generators (function*)",
          "duration": "1h 15m",
          "introduction": "Generators let a function pause mid-execution with `yield` and resume later — making infinite or huge sequences effortless in O(1) memory.",
          "objectives": [
            "Write generator functions with function* and yield",
            "Consume generators lazily using for...of or manual .next()",
            "Implement [Symbol.iterator]() on custom classes"
          ],
          "notes": "### How Generators Work\nCalling `function* range(start, end)` does **not** execute the body immediately — it returns a lazy **Generator** object! Each `.next()` (or `for...of` step) runs until the next `yield value` and pauses with all local variables preserved.",
          "codeExample": "function* range(start, end, step = 1) {\n  for (let i = start; i <= end; i += step) {\n    yield i;\n  }\n}\n\nfor (const num of range(2, 10, 2)) {\n  console.log(num);\n}\n\nconst gen = range(1, 3);\nconsole.log(gen.next()); // { value: 1, done: false }",
          "codeExplanation": "1. function* marks range as a generator function.\n2. Each iteration of for...of pulls one value lazily via yield without ever building an array in memory.\n\nHow to Run & Expected Output:\nRun with `node generators.js`. Prints 2, 4, 6, 8, 10, then `{ value: 1, done: false }`.",
          "practiceExercise": "Guided Exercise:\n1. Write a `function* chunk(arr, size)` generator yielding slices of `arr` lazily without copying the entire array of chunks upfront.\n\nIndependent Challenge:\nImplement `[Symbol.iterator]()` on a `Deck` class using a generator method `*[Symbol.iterator]()` so `for (const card of deck)` works natively.\n\nExpected Result:\nLazy iteration with clean `for...of` compatibility.",
          "keyTakeaways": [
            "Generators (function* + yield) produce values lazily on demand in O(1) memory",
            "Any object implementing [Symbol.iterator]() works with for...of and spread [...obj]"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When should you choose `debounce` instead of `throttle`?",
          "options": [
            "For continuous 60fps scroll animations",
            "For a search input where you want to wait until the user stops typing for 300ms before calling the API",
            "For sorting arrays",
            "For hashing passwords"
          ],
          "correctAnswer": 1,
          "explanation": "Debounce waits until calls stop for the delay window; throttle fires periodically during continuous activity."
        },
        {
          "question": "What happens when you call a generator function `const g = range(1, 5);`?",
          "options": [
            "It runs the entire loop immediately and returns an array",
            "It returns a paused Generator iterator without executing the body until .next() or for...of pulls values",
            "It blocks the Event Loop",
            "It throws a TypeError"
          ],
          "correctAnswer": 1,
          "explanation": "Calling a generator function returns a suspended generator object; execution advances step-by-step up to each yield."
        },
        {
          "question": "Why attach a `.cancel()` method to a debounced callback in a SPA?",
          "options": [
            "To delete localStorage",
            "To clear any pending setTimeout if the user navigates away before the timer fires",
            "To speed up CSS",
            "To convert Promises to callbacks"
          ],
          "correctAnswer": 1,
          "explanation": "Cancelling pending timers on unmount prevents callbacks from running against unmounted UI or leaking memory."
        },
        {
          "question": "Which Symbol makes a custom class iterable with `for...of` and `[...instance]`?",
          "options": [
            "Symbol.toStringTag",
            "Symbol.iterator",
            "Symbol.async",
            "Symbol.for"
          ],
          "correctAnswer": 1,
          "explanation": "Implementing [Symbol.iterator]() makes any object follow JavaScript’s iteration protocol."
        }
      ]
    },
    {
      "title": "Module 10: Browser APIs, Automated Testing & Final JavaScript Integration",
      "duration": "2h 30m",
      "objectives": [
        "Use IntersectionObserver, Clipboard API, and History API cleanly with feature checks",
        "Write automated unit tests for pure JavaScript modules using node:test",
        "Integrate Modules 1–10 into a tested, modular JavaScript application"
      ],
      "notes": "### Module Introduction & Description\nModern browsers expose powerful zero-dependency APIs — **`IntersectionObserver`** (lazy-loading and scroll animations without slow scroll listeners) and **`navigator.clipboard`** (one-click code copy) — while Node's built-in **`node:test`** lets you verify your pure JS modules automatically.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Modern Browser Web APIs with graceful fallbacks, automated `node:test` assertions, and full-project integration.\n\n### How the Lessons Connect\n- **Lesson 1** introduces `IntersectionObserver` and `navigator.clipboard` safely.\n- **Lesson 2** tests pure JavaScript modules with `node:test` and ties the entire JavaScript curriculum together.\n\n### Completion Criteria\n- Complete both lessons, deliver the Tested JS Utilities & Observer Integration assignment, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Tested JavaScript Modules & Modern Browser Integration:\nProblem Statement:\nUpgrade your Task & Habit Manager (or build a Snippet Manager) with one-click Clipboard copy, IntersectionObserver scroll reveal (respecting prefers-reduced-motion), and an automated node:test suite covering all pure state/utility functions.\n\nObjectives:\n- Combine pure testable ES modules with modern browser APIs.\n- Achieve 100% passing unit tests on state, filtering, validation, and formatting helpers.\n\nRequirements:\n1. Pure state & validator module (state.js): addItem, toggleItem, deleteItem, filterItems, validateTitle.\n2. Automated test suite (state.test.js) using node:test and node:assert/strict with >= 6 unit tests covering happy paths and edge cases.\n3. Browser integration helper (uiEffects.js):\n   - copySnippet(text) using navigator.clipboard.writeText(text) inside try/catch.\n   - observeReveals(elements) using IntersectionObserver and calling observer.unobserve(entry.target) once revealed!\n\nStep-by-Step Instructions:\n1. Write state.js and state.test.js first; run `node --test state.test.js` until all 6+ tests pass.\n2. Implement copySnippet and observeReveals in uiEffects.js with feature-detection checks.\n\nDeliverables:\n- state.js, state.test.js, and uiEffects.js.\n\nEvaluation Criteria:\n- node --test passes 100% with zero DOM dependencies in state.js.\n- IntersectionObserver unobserves revealed targets and cleans up properly.",
      "lessons": [
        {
          "title": "IntersectionObserver, Clipboard & History APIs",
          "duration": "1h 15m",
          "introduction": "Listening to raw `window.onscroll` fires dozens of times per second on the main thread. IntersectionObserver lets the browser notify you asynchronously only when an element enters the viewport.",
          "objectives": [
            "Observe element visibility efficiently with IntersectionObserver",
            "Copy text asynchronously with navigator.clipboard.writeText() + error handling"
          ],
          "notes": "### `IntersectionObserver` Over Scroll Listeners\nInstead of calling `getBoundingClientRect()` on every scroll pixel (causing layout thrashing), create an `IntersectionObserver`! Once `entry.isIntersecting` is `true`, apply your `.is-visible` class and call `observer.unobserve(entry.target)` so it stops watching!\n\n### `navigator.clipboard.writeText()`\nReturns a **Promise** and requires a secure context (HTTPS or `localhost`). Always wrap in `try/catch` so denied clipboard permissions show a friendly message rather than an unhandled rejection.",
          "codeExample": "export async function copyToClipboard(text) {\n  if (!navigator.clipboard?.writeText) {\n    throw new Error('Clipboard API unavailable in this context');\n  }\n  await navigator.clipboard.writeText(text);\n  return true;\n}\n\nexport function createRevealObserver(onReveal) {\n  return new IntersectionObserver((entries, observer) => {\n    for (const entry of entries) {\n      if (entry.isIntersecting) {\n        onReveal(entry.target);\n        observer.unobserve(entry.target);\n      }\n    }\n  }, { threshold: 0.15 });\n}",
          "codeExplanation": "1. copyToClipboard feature-checks navigator.clipboard?.writeText before awaiting writeText().\n2. createRevealObserver triggers onReveal once 15% of an element is visible and immediately unobserves it for zero wasted work.\n\nHow to Run & Expected Output:\nAttach in a browser page; scrolling elements into view triggers onReveal once per element, and clicking a Copy button writes text to your OS clipboard.",
          "practiceExercise": "Guided Exercise:\n1. Test `copyToClipboard('Hello Cortex')` on `localhost` and paste into a text editor to confirm it copied cleanly.\n\nIndependent Challenge:\nGuard `createRevealObserver` so if `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, all elements reveal immediately without waiting for scroll!\n\nExpected Result:\nSmooth, battery-friendly scroll reveals and reliable async clipboard copy.",
          "keyTakeaways": [
            "Use IntersectionObserver instead of scroll listeners for lazy loading and scroll reveals",
            "Unobserve elements once one-time reveals complete, and disconnect observers on cleanup",
            "Feature-check navigator.clipboard.writeText() and wrap it in try/catch"
          ]
        },
        {
          "title": "Testing Pure JS Modules with node:test & Final Integration",
          "duration": "1h 15m",
          "introduction": "Because you kept your state, validation, and formatting logic pure (free of DOM dependencies), you can run comprehensive automated tests directly in Node in milliseconds.",
          "objectives": [
            "Write Arrange-Act-Assert unit tests using node:test and node:assert/strict",
            "Test immutability, edge cases, and error throws systematically"
          ],
          "notes": "### What to Test in Every Pure JS Module\n1. **Happy paths**: Adding, toggling, filtering items.\n2. **Immutability**: Verify the original input array was NOT mutated (`assert.equal(original.length, 0)`).\n3. **Edge cases & Errors**: Empty strings, `null`/`undefined`, invalid numbers throwing expected `Error`s via `assert.throws`.",
          "codeExample": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\n\nconst addItem = (list, title) => {\n  const clean = (title ?? '').trim();\n  if (!clean) throw new Error('Title required');\n  return [...list, { title: clean, done: false }];\n};\n\ndescribe('addItem', () => {\n  it('appends trimmed item without mutating input', () => {\n    const initial = [];\n    const next = addItem(initial, '  Learn JS  ');\n    assert.equal(initial.length, 0);\n    assert.deepStrictEqual(next, [{ title: 'Learn JS', done: false }]);\n  });\n\n  it('throws on blank title', () => {\n    assert.throws(() => addItem([], '   '), /Title required/);\n  });\n});",
          "codeExplanation": "1. Tests both immutability (initial stays empty) and trimmed output using assert.deepStrictEqual.\n2. Tests validation failure using assert.throws with a regex match.\n\nHow to Run & Expected Output:\nSave as `state.test.js` and run `node --test state.test.js`. Output: `tests 2 / pass 2 / fail 0`.",
          "practiceExercise": "Guided Exercise:\n1. Run `node --test state.test.js` and deliberately break `.trim()` to watch the test catch the regression immediately, then restore it.\n\nIndependent Challenge:\nAdd unit tests for `toggleItem(list, id)` and `deleteItem(list, id)` verifying immutability.\n\nExpected Result:\nFast, deterministic automated test coverage across your JS application logic.",
          "keyTakeaways": [
            "Pure JavaScript modules test cleanly in milliseconds with node:test and node:assert/strict",
            "Explicitly assert immutability and error-throwing boundary cases"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is IntersectionObserver preferred over window.addEventListener(\"scroll\", ...) for scroll-reveal animations?",
          "options": [
            "Scroll events do not work on mobile",
            "IntersectionObserver runs asynchronously off the hot scroll path and avoids repeated layout-thrashing getBoundingClientRect() calls",
            "IntersectionObserver automatically animates CSS",
            "Scroll listeners cannot read classes"
          ],
          "correctAnswer": 1,
          "explanation": "IntersectionObserver avoids synchronous layout measurements on every scroll frame, keeping scrolling smooth."
        },
        {
          "question": "Why should a one-time reveal observer call `observer.unobserve(entry.target)` after revealing?",
          "options": [
            "Otherwise the element disappears again",
            "To stop tracking already-revealed elements and save CPU/memory",
            "To delete the DOM node",
            "IntersectionObserver requires it or throws"
          ],
          "correctAnswer": 1,
          "explanation": "Unobserving finished elements releases observation work once the one-time reveal has fired."
        },
        {
          "question": "What does `assert.throws(() => fn(), /Title required/)` verify in `node:test`?",
          "options": [
            "That fn() returns the string \"Title required\"",
            "That calling fn() throws an Error whose message matches /Title required/",
            "That fn() is async",
            "That fn() logs to console"
          ],
          "correctAnswer": 1,
          "explanation": "assert.throws catches the expected exception and validates its message or error class."
        },
        {
          "question": "What environment requirement applies to `navigator.clipboard.writeText()`?",
          "options": [
            "It only works in Node.js",
            "It requires a secure context (HTTPS or localhost) and returns a Promise",
            "It works synchronously without await",
            "It requires jQuery"
          ],
          "correctAnswer": 1,
          "explanation": "Modern Clipboard APIs are Promise-based and restricted to secure contexts (HTTPS/localhost) for user privacy."
        }
      ]
    }
  ]
};
