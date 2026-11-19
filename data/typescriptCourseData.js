export const typescriptCourseData = {
  "title": "TypeScript for Reliable Applications",
  "description": "Eliminate entire classes of runtime crashes before your code ever executes. Master static type inference, interfaces, union narrowing, discriminated unions, generics, utility types, React + TypeScript, and migrating JavaScript codebases to strict TypeScript.",
  "thumbnail": "typescript",
  "totalDuration": "13h 00m",
  "category": "Programming Languages",
  "difficulty": "Intermediate",
  "tags": [
    "TypeScript",
    "Type Safety",
    "Generics",
    "Discriminated Unions",
    "React + TS"
  ],
  "learningOutcomes": [
    "Use type inference cleanly while typing function boundaries and domain models",
    "Replace unsafe `any` with `unknown`, runtime guards, and literal union types",
    "Model async and UI states cleanly with discriminated unions and exhaustive `never` checks",
    "Write reusable type-safe helpers and API clients using Generics and Utility Types",
    "Type React components, props, events, and Context providers cleanly",
    "Migrate an existing JavaScript project to strict TypeScript incrementally"
  ],
  "prerequisites": [
    "Modern JavaScript (ES6+)"
  ],
  "targetAudience": "JavaScript and React developers who want fewer production bugs, confident refactoring, and world-class IDE autocomplete.",
  "practicalProject": "Convert a JavaScript Course & Enrollment API client and React state module into strict TypeScript with discriminated unions, generic fetch wrappers, and zero `any`.",
  "modules": [
    {
      "title": "Module 1: TypeScript Foundations, Inference & Strict Mode",
      "duration": "2h 00m",
      "objectives": [
        "Explain compile-time type checking vs. runtime JavaScript execution",
        "Use TypeScript inference cleanly while typing function parameters and return contracts",
        "Enable strict mode in tsconfig.json and replace unsafe any with unknown"
      ],
      "notes": "### Module Introduction\nTypeScript is **JavaScript with syntax for types**. It checks your code at **compile time** (in VS Code and CI) and then erases all type annotations to emit clean standard JavaScript. Catching typos, missing properties, and `undefined` crashes before code ever runs transforms refactoring from guesswork into certainty.\n\n### Prerequisites\n- Modern JavaScript (ES6+ functions, objects, arrays, `try/catch`).\n\n### How the Lessons Connect\n- **Lesson 1** covers `tsconfig.json` `\"strict\": true`, type inference vs explicit annotations, and `interface`/`type` modeling.\n- **Lesson 2** explains why `any` disables the entire type checker and why `unknown` is the safe way to handle `JSON.parse`, API inputs, and `catch (err)`.\n\n### Module Summary\nYou will configure strict TypeScript cleanly and handle untrusted values safely with zero `any` escapes.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Strict Domain Model & Safe Error Formatter assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nA JavaScript course utility module suffers from silent undefined bugs and uses any everywhere. Rewrite it in strict TypeScript with clean interfaces, inferred locals, explicit function signatures, and safe unknown error handling.\n\nObjectives:\n- Configure strict TypeScript (strict: true) without relying on any.\n- Handle unknown values from JSON.parse and catch (err) safely.\n\nRequirements:\n1. Define a Course interface with id: string, title: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced', and optional tags?: string[].\n2. Write formatCourseLabel(course: Course): string using literal union types and nullish handling for optional tags.\n3. Write getErrorMessage(err: unknown): string handling err instanceof Error, string errors, and fallback objects safely.\n4. Write parseCourseJson(raw: string): Course | null using unknown and runtime validation.\n\nStep-by-Step Instructions:\n1. Create domain.ts and enable \"strict\": true in tsconfig.json.\n2. Implement the interface and functions without a single any or as Course blind cast.\n3. Run npx tsc --noEmit to verify zero compiler errors.\n\nDeliverables:\n- domain.ts and tsconfig.json.\n\nEvaluation Criteria:\n- Zero occurrences of any.\n- Explicit function parameter types and return types.\n- Runtime checks narrow unknown cleanly before property access.",
      "lessons": [
        {
          "title": "Type Inference, Annotations & Interfaces",
          "duration": "1h 00m",
          "introduction": "Good TypeScript does not annotate every single variable — it lets TypeScript infer obvious local variables while enforcing explicit contracts at function boundaries.",
          "objectives": [
            "Let TypeScript infer local primitives and arrays automatically",
            "Annotate function parameters, return types, and object interfaces cleanly",
            "Enable \"strict\": true (strictNullChecks + noImplicitAny) in tsconfig.json"
          ],
          "notes": "### Compile-Time Checking vs. Runtime Execution\nTypeScript adds a static type layer on top of JavaScript. When you run `tsc` or `vite build`, TypeScript verifies every property access, function call, and null check, then **strips all types away** to emit clean standard JavaScript. Zero runtime overhead!\n\n### When to Annotate vs. Let TypeScript Infer\n- **Let TS Infer**: Local variables initialized immediately (`const count = 0;`, `const tags = ['ts'];`). Redundant annotations add noise without extra safety.\n- **Always Annotate**: Function parameters, public return types, and domain interfaces (`CourseSummary`) — this locks down contracts between modules and surfaces errors right at the call site.\n\n### Enabling `\"strict\": true`\nAlways enable `\"strict\": true` in `tsconfig.json`. Most importantly, it activates `strictNullChecks`, preventing `Cannot read properties of undefined` crashes by forcing you to check optional fields (`subtitle?: string`) before using them.\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `String`, `Number`, or `Object` (capitalized wrapper objects) instead of `string`, `number`, `object`.\n  - **Solution**: Always use lowercase primitive types (`string`, `number`, `boolean`).",
          "codeExample": "type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';\n\ninterface CourseSummary {\n  readonly id: string;\n  title: string;\n  difficulty: Difficulty;\n  subtitle?: string;\n}\n\nfunction formatHeadline(course: CourseSummary): string {\n  const extra = course.subtitle ? ` — ${course.subtitle}` : '';\n  return `[${course.difficulty}] ${course.title}${extra}`;\n}\n\nconst sample: CourseSummary = {\n  id: 'ts-101',\n  title: 'TypeScript Reliability',\n  difficulty: 'Intermediate'\n};\n\nconsole.log(formatHeadline(sample));",
          "codeExplanation": "1. Difficulty is a string literal union restricting values to three exact strings rather than any arbitrary string.\n2. readonly id prevents accidental reassignment; subtitle?: string has type string | undefined.\n3. Under strictNullChecks, checking course.subtitle ? ... narrows subtitle from string | undefined to string safely.\n\nHow to Run & Expected Output:\nSave as `demo.ts` and run `npx tsc --noEmit demo.ts --strict` (or execute via `npx tsx demo.ts` / Node 22+ `node --experimental-strip-types demo.ts`). Prints: `[Intermediate] TypeScript Reliability`.",
          "practiceExercise": "Guided Exercise:\n1. Change `difficulty: 'Intermediate'` to `'Expert'` and run `tsc --noEmit` to observe the exact compiler error catching the typo.\n2. Add `readonly tags?: readonly string[]` to `CourseSummary` and verify `.push()` is rejected at compile time.\n\nIndependent Challenge:\nWrite a `calculateTotal(price: number, qty: number, discount?: number): number` function under `strict: true` handling `discount ?? 0` cleanly.\n\nExpected Result:\nZero compiler errors under `--strict` and accurate runtime output.",
          "keyTakeaways": [
            "Enable \"strict\": true in tsconfig.json (especially strictNullChecks)",
            "Let TypeScript infer obvious local variables; annotate function parameters and object models",
            "Use literal union types (e.g., \"Beginner\" | \"Intermediate\") instead of loose string"
          ]
        },
        {
          "title": "Why `unknown` Beats `any` & Typing `catch (err)`",
          "duration": "1h 00m",
          "introduction": "Using `any` turns off TypeScript completely — spreading silent runtime crashes like a virus. `unknown` forces you to verify what a value actually is before touching it.",
          "objectives": [
            "Explain why any disables type safety across callers",
            "Use unknown for untrusted inputs (JSON, APIs, catch blocks)",
            "Narrow unknown cleanly using typeof and instanceof"
          ],
          "notes": "### Why `any` Is Contagious and Dangerous\nTyping a variable as `any` tells TypeScript *\"turn off all type checking for this value — and anything derived from it.\"* Even worse, `any` silently infects return types across callers, letting `undefined.toFixed()` crash in production!\n\n### `unknown`: Type-Safe Handling of Untrusted Data\n`unknown` is the type-safe counterpart to `any`. Any value can be assigned to `unknown`, **but TypeScript forbids accessing properties or calling methods on `unknown`** until you narrow it with `typeof`, `instanceof`, or a type guard!\nSince TypeScript 4.4+, `catch (err)` defaults to `unknown` in strict mode — because in JavaScript, code can `throw \"oops\"` or `throw null`, not just `new Error()`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Writing `catch (err: any) { return err.message; }`, which returns `undefined` if someone threw a string!\n  - **Solution**: Keep `catch (err: unknown)` and narrow with `err instanceof Error`.",
          "codeExample": "export function extractErrorMessage(err: unknown): string {\n  if (err instanceof Error) {\n    return err.message;\n  }\n  if (typeof err === 'string') {\n    return err;\n  }\n  return 'An unexpected error occurred';\n}\n\ntry {\n  throw new Error('Token expired');\n} catch (err: unknown) {\n  console.error(extractErrorMessage(err));\n}",
          "codeExplanation": "1. err is typed as unknown, so reading err.message directly fails to compile.\n2. err instanceof Error narrows err to Error safely inside the first if block.\n3. typeof err === 'string' handles thrown strings cleanly, with a safe fallback string for anything else.\n\nHow to Run & Expected Output:\nRun with `npx tsx errors.ts` or Node 22+ `node errors.ts`. Prints: `Token expired`.",
          "practiceExercise": "Guided Exercise:\n1. Remove `if (err instanceof Error)` temporarily and try returning `err.message` directly to verify TypeScript blocks unsafe access on `unknown`.\n\nIndependent Challenge:\nWrite `parseUserName(rawJson: string): string` that parses `JSON.parse(rawJson)` into `unknown`, checks `typeof data === 'object' && data !== null && 'name' in data && typeof data.name === 'string'`, and returns a fallback otherwise.\n\nExpected Result:\nZero `any` types and safe handling of Error, string, and malformed JSON throws.",
          "keyTakeaways": [
            "Avoid any — it silently disables TypeScript’s safety checks",
            "Use unknown for untrusted data and catch (err) blocks",
            "Narrow unknown with instanceof, typeof, and property checks before accessing fields"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is `unknown` much safer than `any` for untrusted API data or catch (err) variables?",
          "options": [
            "unknown runs faster at runtime",
            "unknown forces you to narrow and verify the value’s type before accessing properties, whereas any disables type checking completely",
            "unknown converts JSON into classes automatically",
            "any is not valid in TypeScript 5"
          ],
          "correctAnswer": 1,
          "explanation": "With unknown, TypeScript blocks unsafe property access until you prove the runtime type via typeof, instanceof, or a type guard."
        },
        {
          "question": "What does strictNullChecks (part of \"strict\": true) enforce?",
          "options": [
            "Variables can never hold null",
            "You must explicitly handle null/undefined before accessing properties or calling methods on nullable values",
            "It deletes null values at runtime",
            "It replaces undefined with 0"
          ],
          "correctAnswer": 1,
          "explanation": "strictNullChecks prevents \"Cannot read properties of undefined\" bugs by tracking null/undefined in the type system."
        },
        {
          "question": "When should you prefer explicit type annotations instead of relying solely on TypeScript inference?",
          "options": [
            "On every const number like const x: number = 1",
            "On function parameters, public return types, and domain interfaces/models",
            "Only inside CSS files",
            "Never — annotations are optional everywhere"
          ],
          "correctAnswer": 1,
          "explanation": "Explicit annotations at function boundaries and interfaces lock down API contracts and produce clear error messages."
        },
        {
          "question": "What happens to TypeScript type annotations and interfaces when code is compiled to JavaScript?",
          "options": [
            "They are converted to runtime if checks automatically",
            "They are completely erased — zero type info exists at runtime",
            "They are stored in localStorage",
            "They turn into JSON schemas"
          ],
          "correctAnswer": 1,
          "explanation": "TypeScript performs static compile-time checking and erases all type annotations during transpilation to JavaScript."
        }
      ]
    },
    {
      "title": "Module 2: Union Narrowing & Discriminated Unions",
      "duration": "2h 00m",
      "objectives": [
        "Narrow union types with typeof, in, Array.isArray, and custom type predicates (x is User)",
        "Model mutually exclusive async/UI states cleanly with Discriminated Unions",
        "Enforce exhaustive switch handling at compile time using the never type"
      ],
      "notes": "### Module Introduction\nBoolean flags like `{ isLoading: true, data: [...], error: 'Failed' }` allow impossible states to exist simultaneously! **Discriminated Unions** make impossible states unrepresentable at the type level, and **`never` exhaustiveness checks** catch missing switch cases at compile time.\n\n### Prerequisites\n- Completion of Module 1.\n\n### How the Lessons Connect\n- **Lesson 1** teaches built-in narrowing and custom user-defined type guards (`val is Course`).\n- **Lesson 2** models async states cleanly with Discriminated Unions and `assertNever(x: never)`.\n\n### Module Summary\nYou will design self-documenting state machines in TypeScript where the compiler verifies every branch is handled.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Async Request State Machine & Exhaustive Renderer assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nA React/TS data loader uses { loading: boolean, error?: string, data?: Course[] }, leading to UI bugs where both loading and error render together. Refactor it into a Discriminated Union with an exhaustive switch renderer.\n\nObjectives:\n- Model mutually exclusive states using a shared literal discriminant (status).\n- Add an assertNever(state: never) helper so adding a new status in the future produces a compile error until handled.\n\nRequirements:\n1. Define AsyncState<T> as a discriminated union:\n   - { status: 'idle' }\n   - { status: 'loading' }\n   - { status: 'success'; data: T }\n   - { status: 'error'; message: string }\n2. Write renderStatusLabel(state: AsyncState<string[]>): string switching on state.status with a default: return assertNever(state).\n3. Write a custom type guard isCoursePayload(val: unknown): val is { id: string; title: string }.\n\nStep-by-Step Instructions:\n1. Implement AsyncState<T>, assertNever, and renderStatusLabel in asyncState.ts.\n2. Temporarily add { status: 'retrying' } to AsyncState and confirm TypeScript flags default: assertNever(state) immediately!\n\nDeliverables:\n- asyncState.ts.\n\nEvaluation Criteria:\n- Impossible states (loading + error simultaneously) are unrepresentable.\n- Exhaustive never guard catches unhandled union members at compile time.",
      "lessons": [
        {
          "title": "Type Narrowing & Custom Type Guards",
          "duration": "1h 00m",
          "introduction": "TypeScript tracks control flow smartly: every if check narrows a broad union type down to the exact remaining possibilities inside that block.",
          "objectives": [
            "Narrow unions using typeof, in, instanceof, and equality checks",
            "Write reusable custom type predicates (arg is Type)"
          ],
          "notes": "### Control-Flow Type Narrowing\nTypeScript's control-flow analyzer tracks `if`, `return`, `typeof`, `instanceof`, and `in` checks automatically:\n- Inside `if (typeof id === 'string')`, `id` narrows from `string | number` to `string`.\n- After an early `return`, the remaining branch automatically excludes the handled types!\n\n### Custom Type Guards (`value is ApiUser`)\nWhen validating external JSON (`unknown`), built-in `typeof` only says `\"object\"`. A **user-defined type guard** is a boolean function whose return type is `value is ApiUser`: if it returns `true`, TypeScript narrows `value` to `ApiUser` in the caller's `if` block!\n\n### Common Mistakes & Solutions\n- **Mistake**: Forgetting that `typeof null === 'object'` in JavaScript!\n  - **Solution**: Always check `typeof value === 'object' && value !== null` before reading properties.",
          "codeExample": "interface ApiUser {\n  id: string;\n  email: string;\n}\n\nexport function isApiUser(value: unknown): value is ApiUser {\n  if (typeof value !== 'object' || value === null) return false;\n  const record = value as Record<string, unknown>;\n  return typeof record.id === 'string' && typeof record.email === 'string';\n}\n\nconst raw: unknown = JSON.parse('{\"id\":\"u1\",\"email\":\"ada@cortex.dev\"}');\nif (isApiUser(raw)) {\n  // TypeScript now knows raw.email is a string!\n  console.log(raw.email.toLowerCase());\n}",
          "codeExplanation": "1. isApiUser returns a type predicate (value is ApiUser), connecting runtime checks to compile-time narrowing.\n2. Checking value !== null prevents null-dereference bugs since typeof null === 'object'.\n3. Inside if (isApiUser(raw)), TypeScript knows raw.email is a string and enables autocomplete.\n\nHow to Run & Expected Output:\nRun with `npx tsx guard.ts`. Prints: `ada@cortex.dev`.",
          "practiceExercise": "Guided Exercise:\n1. Pass `JSON.parse('null')` and `JSON.parse('{\"id\":123}')` into `isApiUser` and confirm both safely return `false` without throwing.\n\nIndependent Challenge:\nWrite a `formatCourseId(id: string | number): string` function using `typeof id === 'number'` narrowing to pad numbers to 4 digits (`String(id).padStart(4, '0')`) and uppercase strings.\n\nExpected Result:\nType-safe narrowing with zero runtime TypeErrors on `null` or malformed inputs.",
          "keyTakeaways": [
            "TypeScript narrows union types automatically inside typeof, instanceof, and \"in\" checks",
            "Custom type guards (val is MyType) bridge runtime validation with compile-time narrowing"
          ]
        },
        {
          "title": "Discriminated Unions & Exhaustive `never` Checks",
          "duration": "1h 00m",
          "introduction": "A Discriminated Union pairs a shared literal tag (like kind or status) with variant-specific data — giving you bulletproof switch exhaustiveness.",
          "objectives": [
            "Design Discriminated Unions with a shared literal discriminant field",
            "Use assertNever(x: never) in switch default branches to catch missed cases at compile time"
          ],
          "notes": "### Making Impossible States Unrepresentable\nConsider `{ loading: boolean; error?: string; data?: Course[] }`. Nothing stops buggy code from setting `loading: true` AND `error: 'Failed'` at the same time, and you have to write `data?.length` everywhere!\nA **Discriminated Union** ties each state's fields to a shared literal tag (`status`):\n- `{ status: 'loading' }`\n- `{ status: 'error'; message: string }`\n- `{ status: 'success'; data: T }`\nInside `case 'success':`, `state.data` is **guaranteed** to exist with zero optional chaining!\n\n### Exhaustive Checking with `never`\nAdding `default: return assertNever(state);` guarantees at **compile time** that every possible `status` is handled. If someone adds `{ status: 'idle' }` next month, TypeScript immediately flags every `switch` that forgot `'idle'`!\n\n### Common Mistakes & Solutions\n- **Mistake**: Adding a broad `default: return 'Unknown';` that silently swallows new union cases.\n  - **Solution**: Always use `assertNever(state)` in `default:` so the compiler catches missed cases.",
          "codeExample": "type LoadState<T> =\n  | { status: 'loading' }\n  | { status: 'error'; message: string }\n  | { status: 'success'; data: T };\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled union variant: ${JSON.stringify(value)}`);\n}\n\nexport function describeState(state: LoadState<string[]>): string {\n  switch (state.status) {\n    case 'loading':\n      return 'Loading items...';\n    case 'error':\n      return `Error: ${state.message}`;\n    case 'success':\n      return `Loaded ${state.data.length} items`;\n    default:\n      return assertNever(state);\n  }\n}",
          "codeExplanation": "1. Switching on the shared discriminant state.status narrows each case automatically.\n2. assertNever accepts never: if all union members are handled, state in default is never; if any member is missed, TypeScript refuses to compile!\n\nHow to Run & Expected Output:\nRun with `npx tsx state.ts` passing `{ status: 'success', data: ['TS', 'React'] }`. Prints: `Loaded 2 items`.",
          "practiceExercise": "Guided Exercise:\n1. Add `| { status: 'idle' }` to `LoadState<T>` and run `npx tsc --noEmit` to watch TypeScript pinpoint `assertNever(state)` immediately, then add `case 'idle':`.\n\nIndependent Challenge:\nModel a `NotificationEvent` discriminated union (`'enrolled'` with `courseTitle`, `'quiz_passed'` with `score`, `'error'` with `reason`) with an exhaustive formatter.\n\nExpected Result:\n100% compile-time exhaustiveness across all union variants.",
          "keyTakeaways": [
            "Discriminated unions eliminate impossible boolean-flag state combinations",
            "Use a shared literal tag (status / kind) so TypeScript narrows each branch automatically",
            "Use assertNever(x: never) in switch default blocks for compile-time exhaustiveness checking"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the main advantage of a Discriminated Union over { loading: boolean, data?: T, error?: string }?",
          "options": [
            "It uses less CSS",
            "It makes impossible states (like loading: true AND error: \"Failed\") unrepresentable and guarantees data exists inside the success branch",
            "It skips JSON.parse",
            "It automatically retries failed requests"
          ],
          "correctAnswer": 1,
          "explanation": "Discriminated unions tie each variant’s fields strictly to its literal status tag, eliminating impossible state combos and optional-chaining guesswork."
        },
        {
          "question": "What does a helper function assertNever(x: never): never achieve in a switch default branch?",
          "options": [
            "It hides runtime errors",
            "It causes a compile-time TypeScript error whenever a new union variant is added and forgotten in the switch",
            "It loops infinitely",
            "It converts unions to arrays"
          ],
          "correctAnswer": 1,
          "explanation": "Only if every variant is handled does x narrow to never; any unhandled variant fails to assign to never at compile time."
        },
        {
          "question": "What does the return type `value is User` indicate on a TypeScript function?",
          "options": [
            "It returns a string \"User\"",
            "It is a custom type guard predicate that narrows value to User when the function returns true",
            "It mutates value into a class",
            "It disables strict mode"
          ],
          "correctAnswer": 1,
          "explanation": "Type predicates (arg is Type) instruct TypeScript’s control-flow analyzer to narrow arg inside true branches."
        },
        {
          "question": "Which operator checks whether a property name exists on an object union in TypeScript narrowing?",
          "options": [
            "typeof",
            "in (e.g., \"error\" in res)",
            "instanceof",
            "delete"
          ],
          "correctAnswer": 1,
          "explanation": "The \"in\" operator (\"prop\" in obj) narrows object union members based on unique property keys."
        }
      ]
    },
    {
      "title": "Module 3: Generics & Built-In Utility Types",
      "duration": "2h 15m",
      "objectives": [
        "Write type-safe reusable functions and API wrappers with Generics (<T>)",
        "Constrain generic type parameters using extends (e.g., <T extends { id: string }>)",
        "Transform existing interfaces cleanly using Partial, Pick, Omit, Record, and Readonly"
      ],
      "notes": "### Module Introduction\nInstead of writing `fetchCourse()`, `fetchUser()`, and `fetchModule()` with duplicated response logic — or falling back to `any` — **Generics (`<T>`)** let you write one reusable function that preserves exact types for every caller. **Utility Types** (`Pick`, `Omit`, `Partial`, `Record`) derive DTOs from your main models without duplicating fields!\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** teaches generic functions, interfaces (`ApiResponse<T>`), and `extends` constraints.\n- **Lesson 2** masters `Partial`, `Pick`, `Omit`, `Record`, and `Readonly`.\n\n### Module Summary\nYou will build DRY, type-safe API wrappers and derive Update/Create DTO types cleanly from core domain interfaces.\n\n### Completion Criteria\n- Complete both lessons and generic exercises.\n- Deliver the Generic Repository & DTO Utility Types assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nAn app duplicates Course, CreateCourseInput, UpdateCourseInput, and CourseCardPreview interfaces manually — so adding one field requires editing 4 interfaces. Refactor with Generics and Utility Types.\n\nObjectives:\n- Derive Create/Update/Preview types from a single Course interface using Omit, Partial, and Pick.\n- Build a generic indexById<T extends { id: string }>(items: T[]): Record<string, T> helper.\n\nRequirements:\n1. Define Course { id: string; title: string; description: string; difficulty: string; createdAt: string }.\n2. Derive CreateCourseDto = Omit<Course, 'id' | 'createdAt'>.\n3. Derive UpdateCourseDto = Partial<CreateCourseDto>.\n4. Derive CourseCardProps = Pick<Course, 'id' | 'title' | 'difficulty'>.\n5. Implement indexById<T extends { id: string }>(items: readonly T[]): Record<string, T>.\n\nStep-by-Step Instructions:\n1. Create genericsAndDtos.ts with the derived types and indexById function.\n2. Verify autocomplete works on indexById(courses)['c1'] and CreateCourseDto rejects id.\n\nDeliverables:\n- genericsAndDtos.ts.\n\nEvaluation Criteria:\n- Zero duplicated field definitions across DTOs.\n- Generic constraint <T extends { id: string }> enforced cleanly.",
      "lessons": [
        {
          "title": "Generics & Generic Constraints",
          "duration": "1h 10m",
          "introduction": "Generics are like function parameters, except for Types instead of Values — letting a helper preserve the exact input type it receives.",
          "objectives": [
            "Declare generic functions (<T>(items: T[]): T[]) and generic interfaces",
            "Constrain generics with <T extends { id: string }> so shared properties are safe to read",
            "Infer generic types automatically from function arguments"
          ],
          "notes": "### Why Generics (`<T>`) Eliminate Duplication\nWithout generics, a helper `first(arr: any[])` erases element types, while writing `firstCourse()`, `firstUser()`, and `firstModule()` duplicates identical code. **Generics** parameterize the type itself: `first<T>(arr: readonly T[]): T | undefined`. Passing `Course[]` automatically infers `T = Course`!\n\n### Constraining Generics with `extends`\nInside `findById<T>(list: T[], id: string)`, TypeScript won't let you read `item.id` because `T` could be `number`. Adding a constraint **`<T extends { id: string }>`** guarantees every `T` has `id: string` while preserving all extra properties (`name`, `price`, etc.) on the returned item!\n\n### Common Mistakes & Solutions\n- **Mistake**: Adding unnecessary type parameters like `function greet<T extends string>(name: T)` when `(name: string)` is simpler and clearer.\n  - **Solution**: Only introduce a generic `<T>` when it connects multiple inputs/outputs (like input array `T[]` -> output item `T`).",
          "codeExample": "export interface PaginatedResult<T> {\n  items: T[];\n  total: number;\n  page: number;\n}\n\nexport function findById<T extends { id: string }>(\n  list: readonly T[],\n  targetId: string\n): T | undefined {\n  return list.find((item) => item.id === targetId);\n}\n\nconst users = [{ id: 'u1', name: 'Ada' }, { id: 'u2', name: 'Grace' }];\nconst found = findById(users, 'u1'); // Inferred as { id: string; name: string } | undefined\nconsole.log(found?.name);",
          "codeExplanation": "1. PaginatedResult<T> reuses one pagination shape across Courses, Users, and Modules.\n2. findById<T extends { id: string }> safely accesses item.id while preserving { id: string; name: string } on the returned object.\n\nHow to Run & Expected Output:\nRun with `npx tsx generics.ts`. Prints: `Ada`.",
          "practiceExercise": "Guided Exercise:\n1. Call `findById([{ title: 'No ID' }], '1')` and verify TypeScript rejects it because the items lack `id: string`.\n\nIndependent Challenge:\nWrite `pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][]` and test `pluck(users, 'name')` (inferred as `string[]`).\n\nExpected Result:\nFull type inference and autocomplete with zero `any`.",
          "keyTakeaways": [
            "Generics (<T>) preserve caller types across reusable wrappers and data structures",
            "Use <T extends ...> to require minimum properties on generic inputs",
            "TypeScript usually infers <T> automatically from the arguments you pass"
          ]
        },
        {
          "title": "Utility Types: Partial, Pick, Omit, Record",
          "duration": "1h 05m",
          "introduction": "TypeScript ships with built-in type transformers so you derive Create, Update, and Summary types from one source-of-truth interface.",
          "objectives": [
            "Use Partial<T> for patch/update payloads",
            "Use Pick<T, Keys> and Omit<T, Keys> to select or exclude fields",
            "Use Record<K, V> for typed dictionaries and lookup maps"
          ],
          "notes": "### Deriving Types Instead of Duplicating Interfaces\nCopying fields across `User`, `PublicUser`, and `UpdateUserDto` causes drift whenever a new field is added. TypeScript's built-in **Utility Types** transform one source interface cleanly:\n- **`Pick<T, 'id' | 'name'>`**: Selects only specific keys.\n- **`Omit<T, 'password'>`**: Excludes sensitive or server-generated keys.\n- **`Partial<T>`**: Makes all properties optional (ideal for `PATCH` updates).\n- **`Readonly<T>`**: Marks all properties `readonly`.\n- **`Record<UnionKey, Value>`**: Guarantees a dictionary defines **every** member of `UnionKey`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Typing lookup maps as `{ [key: string]: string }` when the keys are a known finite union (`'student' | 'instructor'`).\n  - **Solution**: Use `Record<Role, string>` so adding a new role forces you to add its label everywhere!",
          "codeExample": "interface User {\n  id: string;\n  name: string;\n  email: string;\n  role: 'student' | 'instructor';\n}\n\ntype PublicUser = Omit<User, 'email'>;\ntype UserUpdatePatch = Partial<Pick<User, 'name' | 'role'>>;\n\nconst ROLE_LABELS: Record<User['role'], string> = {\n  student: 'Learner',\n  instructor: 'Course Author'\n};\n\nconst patch: UserUpdatePatch = { name: 'Ada Lovelace' };\nconsole.log(ROLE_LABELS.student, patch);",
          "codeExplanation": "1. PublicUser omits email cleanly without re-typing id, name, or role.\n2. UserUpdatePatch composes Partial + Pick so only name and role can be partially updated.\n3. Record<User['role'], string> enforces exhaustive keys for both 'student' and 'instructor'.\n\nHow to Run & Expected Output:\nRun with `npx tsx utilities.ts`. Prints: `Learner { name: 'Ada Lovelace' }`.",
          "practiceExercise": "Guided Exercise:\n1. Remove `instructor` from `ROLE_LABELS` temporarily and run `tsc --noEmit` to confirm `Record` catches the missing key.\n\nIndependent Challenge:\nDerive `CreateCourseDto = Omit<Course, 'id' | 'createdAt'>` and `UpdateCourseDto = Partial<CreateCourseDto>` from a single `Course` interface.\n\nExpected Result:\nSingle source of truth for domain models with zero duplicated field definitions.",
          "keyTakeaways": [
            "Derive Create/Update/Public DTOs from one source interface using Omit, Pick, and Partial",
            "Use Record<UnionKey, Value> to guarantee exhaustive dictionary mappings",
            "Combine utility types (e.g., Partial<Pick<...>>) instead of copy-pasting interfaces"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which utility type derives a new type from User by removing the \"password\" and \"resetToken\" fields?",
          "options": [
            "Partial<User, \"password\">",
            "Omit<User, \"password\" | \"resetToken\">",
            "Pick<User, \"password\">",
            "Record<User, \"password\">"
          ],
          "correctAnswer": 1,
          "explanation": "Omit<T, Keys> constructs a type with all properties of T except the specified keys."
        },
        {
          "question": "Why use <T extends { id: string }> on a generic function?",
          "options": [
            "To convert T into a string",
            "To guarantee every argument passed as T has an id: string property while still preserving all other fields of T",
            "To disable generics",
            "To make id optional"
          ],
          "correctAnswer": 1,
          "explanation": "Generic constraints let the function safely access .id while keeping full type fidelity on the returned T."
        },
        {
          "question": "What does Record<\"free\" | \"pro\", number> enforce on an object?",
          "options": [
            "The object can only be an array",
            "The object must define both \"free\" and \"pro\" keys with numeric values",
            "Keys are optional",
            "Values must be strings"
          ],
          "correctAnswer": 1,
          "explanation": "Record<K, V> requires every key in union K to be present with value type V."
        },
        {
          "question": "Which utility type makes all properties of an interface optional (ideal for PATCH update payloads)?",
          "options": [
            "Required<T>",
            "Readonly<T>",
            "Partial<T>",
            "Pick<T, keyof T>"
          ],
          "correctAnswer": 2,
          "explanation": "Partial<T> marks every top-level property of T as optional (?)."
        }
      ]
    },
    {
      "title": "Module 4: React + TypeScript Patterns",
      "duration": "2h 15m",
      "objectives": [
        "Type React component props, children (ReactNode), and event handlers cleanly",
        "Type useState with explicit union/nullable generics (useState<User | null>(null))",
        "Build a type-safe Context + useAuth() hook without non-null (!) assertions"
      ],
      "notes": "### Module Introduction\nReact + TypeScript catches missing props, typoed event handlers, and null-context bugs directly in your editor before you even switch to the browser.\n\n### Prerequisites\n- Completion of Modules 1–3 and React fundamentals.\n\n### How the Lessons Connect\n- **Lesson 1** covers typing props, `React.ReactNode`, `React.ChangeEvent<HTMLInputElement>`, and `useState<T | null>`.\n- **Lesson 2** builds a clean `createContext<AuthContextValue | null>(null)` pattern guarded by `useAuth()` with zero `!` assertions.\n\n### Module Summary\nYou will write idiomatic, strict React + TypeScript components and Context providers.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Typed Modal, Search Input & AuthContext assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nConvert a JavaScript AuthContext + SearchInput + Card component bundle to strict TypeScript without using React.FC workarounds, any, or non-null (!) assertions.\n\nObjectives:\n- Type component props with explicit interfaces and React.ReactNode for children.\n- Type DOM events (ChangeEvent<HTMLInputElement>, FormEvent<HTMLFormElement>).\n- Guard nullable Context inside a custom hook so consumers receive a non-null type automatically.\n\nRequirements:\n1. Card.tsx: props { title: string; children: React.ReactNode; onSelect?: () => void }.\n2. SearchBox.tsx: controlled input with onChange: (e: React.ChangeEvent<HTMLInputElement>) => void and onSubmit: (e: React.FormEvent<HTMLFormElement>) => void.\n3. AuthContext.tsx: createContext<AuthContextValue | null>(null) + useAuth(): AuthContextValue throwing if null.\n\nStep-by-Step Instructions:\n1. Implement all three files in strict TypeScript.\n2. Verify consumers calling const { user } = useAuth() do NOT need optional chaining on the context object itself!\n\nDeliverables:\n- Card.tsx, SearchBox.tsx, and AuthContext.tsx.\n\nEvaluation Criteria:\n- Zero any, zero ! non-null assertions.\n- Exact DOM element generics on ChangeEvent and FormEvent.",
      "lessons": [
        {
          "title": "Typing Props, Events & Hooks in React",
          "duration": "1h 10m",
          "introduction": "Typing React components cleanly requires knowing just three types: React.ReactNode for children, React.ChangeEvent<HTMLInputElement> for inputs, and explicit generics for nullable useState.",
          "objectives": [
            "Type component props and children using React.ReactNode",
            "Type useState<User | null>(null) when initial state is null",
            "Type form/input events using React.ChangeEvent and React.FormEvent"
          ],
          "notes": "### Essential React + TypeScript Patterns\nTyping React components cleanly requires just three habits:\n1. **Props & Children**: Define a `Props` interface and type `children?: React.ReactNode` (supports JSX, text, fragments, arrays).\n2. **Nullable/Empty `useState`**: Calling `useState(null)` infers type `null` forever, and `useState([])` infers `never[]`! Always supply an explicit generic: `useState<User | null>(null)` and `useState<string[]>([])`.\n3. **DOM Events**: Use `React.ChangeEvent<HTMLInputElement>` for inputs and `React.FormEvent<HTMLFormElement>` for forms.\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `React.FC<Props>` everywhere (historically caused implicit `children` confusion and poor generics).\n  - **Solution**: Write plain typed functions: `export function Card({ title, children }: CardProps)`.",
          "codeExample": "import React, { useState } from 'react';\n\ninterface SearchBarProps {\n  initialQuery?: string;\n  onSearch: (query: string) => void;\n  children?: React.ReactNode;\n}\n\nexport function SearchBar({ initialQuery = '', onSearch, children }: SearchBarProps) {\n  const [query, setQuery] = useState<string>(initialQuery);\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    setQuery(e.target.value);\n  };\n\n  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {\n    e.preventDefault();\n    onSearch(query.trim());\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={query} onChange={handleChange} />\n      {children}\n    </form>\n  );\n}",
          "codeExplanation": "1. SearchBarProps types initialQuery, the onSearch callback signature, and optional React.ReactNode children.\n2. React.ChangeEvent<HTMLInputElement> types e.target.value accurately; React.FormEvent<HTMLFormElement> types form submission.\n\nHow to Run & Expected Output:\nImport <SearchBar onSearch={(q) => console.log(q)} /> in a Vite React + TS app and run `npx tsc --noEmit`. Compiles cleanly with full prop autocomplete.",
          "practiceExercise": "Guided Exercise:\n1. Write `const [tags, setTags] = useState([])` under strict TS to observe the `never[]` error, then fix it to `useState<string[]>([])`.\n\nIndependent Challenge:\nBuild a `CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>` interface adding a `variant?: 'primary' | 'secondary'` prop.\n\nExpected Result:\nType-safe React components with accurate event and state inference.",
          "keyTakeaways": [
            "Use React.ReactNode for children props",
            "Provide an explicit generic to useState<T | null>(null) and useState<T[]>([])",
            "Type input and form handlers with React.ChangeEvent<HTMLInputElement> and React.FormEvent<HTMLFormElement>"
          ]
        },
        {
          "title": "Safe Typed Context Without `!` Assertions",
          "duration": "1h 05m",
          "introduction": "Putting `createContext<AuthCtx>(null!)` with a non-null assertion hides missing-Provider bugs until runtime. Guarding `null` inside `useAuth()` is both safer and cleaner.",
          "objectives": [
            "Create Context typed as <CtxValue | null>(null)",
            "Narrow null away inside a custom consumer hook so callers get a guaranteed non-null value"
          ],
          "notes": "### Why `createContext<AuthCtx>(null!)` Is a Trap\nUsing the non-null assertion `!` on `null!` silences TypeScript by lying to the compiler. If a component calls `useContext(AuthContext)` outside `<AuthProvider>`, TypeScript says everything is fine — and the browser crashes at runtime!\n\n### The Safe Pattern: `createContext<T | null>(null)` + Custom Hook Guard\n1. Initialize `createContext<AuthContextValue | null>(null)`.\n2. Export a custom hook `useAuth(): AuthContextValue` that checks `if (!ctx) throw new Error(...);`.\n3. Because of that `throw`, TypeScript automatically narrows the return type to **non-null `AuthContextValue`**, giving every consumer clean autocomplete with zero `!` assertions!\n\n### Common Mistakes & Solutions\n- **Mistake**: Exporting raw `AuthContext` and repeating `useContext(AuthContext)!` in 15 files.\n  - **Solution**: Keep `AuthContext` private to the file and export only `AuthProvider` + `useAuth`.",
          "codeExample": "import React, { createContext, useContext, useState } from 'react';\n\ninterface User { id: string; name: string; }\ninterface AuthContextValue {\n  user: User | null;\n  login: (u: User) => void;\n  logout: () => void;\n}\n\nconst AuthContext = createContext<AuthContextValue | null>(null);\n\nexport function AuthProvider({ children }: { children: React.ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n  return (\n    <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport function useAuth(): AuthContextValue {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');\n  return ctx;\n}",
          "codeExplanation": "1. AuthContext is typed as AuthContextValue | null so missing Providers are explicitly represented.\n2. useAuth() narrows out null by throwing a clear error, returning a guaranteed AuthContextValue.\n\nHow to Run & Expected Output:\nWrap your app in <AuthProvider> and call `const { user, login } = useAuth();` inside a child component. Calling it outside <AuthProvider> throws a clear developer error immediately.",
          "practiceExercise": "Guided Exercise:\n1. Hover over `useAuth()` in VS Code to confirm its return type is `AuthContextValue` (no `| null`).\n\nIndependent Challenge:\nWrap the `value` object inside `AuthProvider` with `useMemo(() => ({ user, login, logout }), [user])` and verify zero TypeScript warnings.\n\nExpected Result:\nZero non-null `!` assertions and safe Context consumption.",
          "keyTakeaways": [
            "Initialize React Context as createContext<T | null>(null) rather than using null!",
            "Guard null inside a custom hook (useAuth) so all consumers receive a guaranteed non-null T"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What happens under strict TypeScript if you write const [user, setUser] = useState(null); without a generic?",
          "options": [
            "TypeScript infers User automatically",
            "TypeScript infers user as type null, so calling setUser({ name: \"Ada\" }) fails to compile",
            "React throws a runtime error",
            "useState becomes synchronous"
          ],
          "correctAnswer": 1,
          "explanation": "Always specify useState<User | null>(null) when starting with null so TypeScript knows the future state type."
        },
        {
          "question": "Which type should you use for a React component’s children prop?",
          "options": [
            "string",
            "JSX.Element[]",
            "React.ReactNode",
            "HTMLElement"
          ],
          "correctAnswer": 2,
          "explanation": "React.ReactNode accepts JSX elements, strings, numbers, fragments, arrays, and null cleanly."
        },
        {
          "question": "Why is createContext<AuthCtx | null>(null) + a throwing useAuth() hook better than createContext<AuthCtx>(null!)?",
          "options": [
            "null! is a syntax error",
            "Throwing inside useAuth() catches missing Providers immediately with a clear error instead of lying to the type checker with !",
            "null! disables useMemo",
            "useAuth() makes Context faster"
          ],
          "correctAnswer": 1,
          "explanation": "Guarding null in useAuth() gives both compile-time narrowing and clear runtime failure if Provider is missing."
        },
        {
          "question": "Which event type corresponds to an <input onChange={...} /> handler in React + TypeScript?",
          "options": [
            "React.FormEvent<HTMLInputElement>",
            "React.ChangeEvent<HTMLInputElement>",
            "React.MouseEvent<HTMLButtonElement>",
            "EventTarget"
          ],
          "correctAnswer": 1,
          "explanation": "Input onChange handlers receive React.ChangeEvent<HTMLInputElement>, giving typed access to e.target.value."
        }
      ]
    },
    {
      "title": "Module 5: Runtime Validation vs. Compile-Time Types",
      "duration": "2h 15m",
      "objectives": [
        "Explain Type Erasure and why TypeScript alone cannot validate external API JSON at runtime",
        "Bridge compile-time types and runtime safety at API boundaries",
        "Prevent array/dictionary undefined bugs with noUncheckedIndexedAccess"
      ],
      "notes": "### Module Introduction\nTypeScript checks your code at compile time, **then disappears completely**. When your frontend calls `fetch('/api/courses')` and writes `const data = await res.json() as Course[]`, TypeScript blindly trusts you — if the server actually returned `{ error: \"Rate limited\" }`, your app crashes at runtime!\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** teaches Type Erasure and validating external JSON at API boundaries (manually or with schema libraries like Zod).\n- **Lesson 2** introduces `noUncheckedIndexedAccess` so `arr[0]` and `dict[key]` properly include `| undefined`.\n\n### Module Summary\nYou will combine compile-time TypeScript with runtime boundary validation so malformed API payloads never crash your UI.\n\n### Completion Criteria\n- Complete both lessons and boundary validation exercises.\n- Deliver the Runtime-Validated API Client assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nA TypeScript app casts await res.json() as Course[] blindly. When the API returns a 500 error object or missing fields, .map() crashes in production. Fix it with runtime boundary validation and safe indexed lookups.\n\nObjectives:\n- Replace blind \"as Course[]\" casts with a runtime validator function.\n- Handle indexed array/object lookups safely assuming noUncheckedIndexedAccess is enabled.\n\nRequirements:\n1. Write validateCourse(raw: unknown): Course that validates id (string), title (string), and throws a descriptive Error if invalid.\n2. Write fetchCourses(url: string): Promise<Course[]> checking res.ok, parsing as unknown, verifying Array.isArray(raw), and mapping through validateCourse.\n3. Write getFirstTitle(courses: Course[]): string safely handling courses[0] being undefined (as enforced by noUncheckedIndexedAccess).\n\nStep-by-Step Instructions:\n1. Implement apiClient.ts with zero \"as Course\" blind casts.\n2. Test fetchCourses against mocked valid data AND malformed data ({ message: 'oops' }).\n\nDeliverables:\n- apiClient.ts.\n\nEvaluation Criteria:\n- Malformed server payloads fail loudly at the boundary with a clear Error rather than crashing deep inside React JSX.",
      "lessons": [
        {
          "title": "Type Erasure & The API Boundary Problem",
          "duration": "1h 10m",
          "introduction": "TypeScript interfaces do not exist in the browser at runtime. Anything crossing a network, localStorage, or URL boundary must be validated at runtime.",
          "objectives": [
            "Avoid blind `as MyType` assertions on res.json() and JSON.parse()",
            "Validate unknown external payloads at the network boundary"
          ],
          "notes": "### Type Erasure & The Network Boundary\nBecause TypeScript erases all interfaces when compiling to JavaScript, `fetch()` has no idea what shape a server actually sent! Writing:\n`const courses = (await res.json()) as Course[];`\nmerely **silences** the compiler without checking a single field. If the server returns `{ error: \"Database down\" }`, `courses.map()` crashes deep inside React!\n\n### Validating at System Boundaries\nAlways type `const raw: unknown = await res.json();` and run a runtime validator (hand-written type guard or a schema library like **Zod**) right at the API boundary so malformed payloads fail loudly and cleanly.\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `as MyType` casts everywhere to make compiler errors go away.\n  - **Solution**: Treat `as` as a code smell at network/storage boundaries — validate `unknown` instead.",
          "codeExample": "interface CourseDto {\n  id: string;\n  title: string;\n}\n\nfunction parseCourseDto(raw: unknown): CourseDto {\n  if (typeof raw !== 'object' || raw === null) {\n    throw new Error('Expected course object');\n  }\n  const obj = raw as Record<string, unknown>;\n  if (typeof obj.id !== 'string' || typeof obj.title !== 'string') {\n    throw new Error('Invalid CourseDto shape from API');\n  }\n  return { id: obj.id, title: obj.title };\n}\n\nexport async function fetchCourseSafe(url: string): Promise<CourseDto> {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  const raw: unknown = await res.json();\n  return parseCourseDto(raw);\n}",
          "codeExplanation": "1. raw is typed as unknown instead of any.\n2. parseCourseDto validates that raw is a non-null object with string id and title before returning a trusted CourseDto.\n3. fetchCourseSafe checks res.ok before parsing JSON.\n\nHow to Run & Expected Output:\nCall `parseCourseDto({ id: 123, title: 'TS' })` in `npx tsx`. Throws `Error: Invalid CourseDto shape from API` immediately at the boundary instead of crashing UI components later.",
          "practiceExercise": "Guided Exercise:\n1. Test `parseCourseDto(null)` and `parseCourseDto({ id: '1', title: 'TS' })` to verify both invalid and valid paths.\n\nIndependent Challenge:\nWrite `parseCourseArray(raw: unknown): CourseDto[]` verifying `Array.isArray(raw)` and mapping each item through `parseCourseDto`.\n\nExpected Result:\nMalformed API responses are caught cleanly at the network boundary.",
          "keyTakeaways": [
            "TypeScript types are erased at runtime and cannot protect against unexpected API JSON",
            "Never blindly cast res.json() as MyType — parse as unknown and validate at the boundary",
            "Libraries like Zod let you define one schema that gives both runtime validation and TS types"
          ]
        },
        {
          "title": "Strict Index Access (noUncheckedIndexedAccess)",
          "duration": "1h 05m",
          "introduction": "By default in TypeScript, const arr: string[] = []; const x = arr[0]; types x as string — even though x is actually undefined! One tsconfig flag fixes that.",
          "objectives": [
            "Enable noUncheckedIndexedAccess in tsconfig.json",
            "Handle arr[i] and dict[key] returning T | undefined cleanly"
          ],
          "notes": "### The Hidden Array/Record Crash in Default TypeScript\nEven with `\"strict\": true`, TypeScript normally types `const item = arr[0];` as `string` — **not** `string | undefined`! Calling `items[0].toUpperCase()` on an empty array compiles with zero warnings and crashes in production!\n\n### Enabling `\"noUncheckedIndexedAccess\": true`\nAdding `\"noUncheckedIndexedAccess\": true` to `tsconfig.json` fixes this by automatically adding `| undefined` to:\n- Array index reads (`arr[0]` -> `T | undefined`)\n- Dictionary lookups (`dict[key]` -> `V | undefined`)\nThis forces you to handle missing keys and empty arrays with `??` or `if (first)` checks!\n\n### Common Mistakes & Solutions\n- **Mistake**: Indexing `arr[0]` inside `if (arr.length > 0)` and wondering why `arr[0]` is still `T | undefined`.\n  - **Solution**: Assign `const first = arr[0]; if (!first) return ...;` so TypeScript narrows `first` cleanly.",
          "codeExample": "// With noUncheckedIndexedAccess: true\nexport function getBadgeLabel(\n  labels: Record<string, string>,\n  key: string\n): string {\n  // labels[key] has type: string | undefined\n  return labels[key] ?? 'Unknown';\n}\n\nexport function firstModuleTitle(titles: readonly string[]): string {\n  const first = titles[0]; // string | undefined\n  return first ? first.toUpperCase() : 'NO MODULES';\n}",
          "codeExplanation": "1. Under noUncheckedIndexedAccess, labels[key] evaluates to string | undefined, so ?? 'Unknown' handles missing keys safely.\n2. Assigning const first = titles[0] and checking if (first) narrows first to string before calling .toUpperCase().\n\nHow to Run & Expected Output:\nRun `npx tsc --noEmit --strict --noUncheckedIndexedAccess` and execute with `npx tsx`. Calling `getBadgeLabel({}, 'missing')` returns `'Unknown'` and `firstModuleTitle([])` returns `'NO MODULES'`.",
          "practiceExercise": "Guided Exercise:\n1. Enable `\"noUncheckedIndexedAccess\": true` in a `tsconfig.json` and run `tsc --noEmit` to see which unsafe `arr[0]` accesses it catches.\n\nIndependent Challenge:\nRefactor a `for (let i = 0; i < items.length; i++) { use(items[i]); }` loop to `for (const item of items)` (notice `for...of` never suffers from `| undefined`!).\n\nExpected Result:\nZero out-of-bounds `undefined` crashes on array or dictionary lookups.",
          "keyTakeaways": [
            "Standard TypeScript assumes arr[0] and obj[key] always exist unless noUncheckedIndexedAccess is enabled",
            "Enable noUncheckedIndexedAccess: true to catch out-of-bounds and missing-key undefined bugs at compile time"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does `const user = (await res.json()) as User;` NOT guarantee user.name exists at runtime?",
          "options": [
            "fetch() disables TypeScript",
            "TypeScript `as` assertions are compile-time only and erased in JavaScript — they perform zero runtime checks",
            "JSON.parse removes type interfaces",
            "as User only works in React"
          ],
          "correctAnswer": 1,
          "explanation": "Type assertions tell the compiler to trust you without generating any runtime validation code."
        },
        {
          "question": "What does enabling `\"noUncheckedIndexedAccess\": true` in tsconfig.json change?",
          "options": [
            "It forbids all arrays",
            "It adds `| undefined` to indexed lookups like `arr[0]` and `dict[key]` so you must check for undefined",
            "It turns off strictNullChecks",
            "It enables allowJs"
          ],
          "correctAnswer": 1,
          "explanation": "noUncheckedIndexedAccess ensures out-of-bounds array reads and missing dictionary keys are typed as T | undefined."
        },
        {
          "question": "Where should runtime validation of external JSON payloads happen?",
          "options": [
            "Inside CSS files",
            "Right at the system boundary (e.g., inside your fetch wrapper or Express route validator) before data enters core app logic",
            "Only inside React render",
            "Nowhere if strict mode is on"
          ],
          "correctAnswer": 1,
          "explanation": "Validating at boundaries keeps core application functions clean and strongly typed."
        },
        {
          "question": "What type should you assign to `await res.json()` before validating it?",
          "options": [
            "any",
            "unknown",
            "never",
            "void"
          ],
          "correctAnswer": 1,
          "explanation": "Typing raw external JSON as unknown forces your boundary validator to check fields before returning a domain type."
        }
      ]
    },
    {
      "title": "Module 6: Migrating a JavaScript Project to TypeScript",
      "duration": "2h 15m",
      "objectives": [
        "Migrate an existing JS/React/Node codebase to strict TypeScript incrementally without halting feature work",
        "Configure allowJs -> checkJs -> strict: true in phases",
        "Avoid migration anti-patterns like // @ts-ignore abuse and giant any escapes"
      ],
      "notes": "### Module Introduction\nYou rarely get to rewrite a 20,000-line JavaScript app in TypeScript over a weekend. Professional teams migrate **incrementally** — file by file, from leaf utilities inward — while keeping the app building and shipping every single day.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** lays out the 4-phase incremental migration playbook (`allowJs`, leaf-first conversion, enabling `strict`).\n- **Lesson 2** highlights migration traps (`@ts-ignore` vs `@ts-expect-error`, tsconfig `noEmit`) and wraps up the TypeScript curriculum.\n\n### Module Summary\nYou can now architect greenfield TypeScript apps and safely migrate legacy JavaScript repositories to strict TypeScript.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the Incremental JS-to-TS Migration Plan & Converted Module assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nYour team has a working JavaScript + Vite project with 40 files and cannot pause product releases for a full rewrite. Create a phased tsconfig.json migration plan and convert a sample 2-file JS utility + React component cleanly.\n\nObjectives:\n- Configure tsconfig.json with allowJs: true and noEmit: true (for Vite) to allow JS and TS files to coexist.\n- Convert leaf helper files first before higher-level UI pages.\n\nRequirements:\n1. Write a valid tsconfig.json supporting mixed .js and .ts/.tsx files with strict: true.\n2. Convert a sample JS formatter (formatDuration(minutes)) and a React Card component to .ts / .tsx.\n3. Explain why @ts-expect-error is preferred over @ts-ignore if a temporary suppression is ever needed.\n\nStep-by-Step Instructions:\n1. Set up tsconfig.json with allowJs: true, skipLibCheck: true, noEmit: true, strict: true.\n2. Rename leaf helper first to .ts, add types, and run tsc --noEmit.\n3. Rename consumer component to .tsx and verify clean compilation.\n\nDeliverables:\n- tsconfig.json, format.ts, and CourseBadge.tsx.\n\nEvaluation Criteria:\n- Mixed JS/TS coexistence configured properly.\n- Zero @ts-ignore; strict: true enabled.",
      "lessons": [
        {
          "title": "Incremental Migration Playbook (allowJs -> strict)",
          "duration": "1h 10m",
          "introduction": "Trying to rename 100 .js files to .ts at once floods your terminal with 1,500 errors. An incremental leaf-first strategy keeps builds green every day.",
          "objectives": [
            "Configure tsconfig.json with allowJs: true so .js and .ts coexist peacefully",
            "Migrate bottom-up from leaf utilities and domain types toward pages/routes",
            "Run tsc --noEmit in CI to prevent new type regressions"
          ],
          "notes": "### Why Big-Bang Rewrites Fail\nRenaming 60 `.js` files to `.ts` in one afternoon floods your editor with 1,000+ errors and blocks all feature work. Professional teams migrate **incrementally** while keeping the app building every day:\n1. **Setup**: Add `tsconfig.json` with `\"allowJs\": true`, `\"noEmit\": true` (let Vite bundle, let `tsc` typecheck!), and `\"strict\": true`.\n2. **Bottom-Up Leaf Migration**: Convert pure utility functions (`formatters.ts`, `validators.ts`) and shared domain types (`types.ts`) first.\n3. **Components & Routes**: Convert React components and Express controllers one feature at a time, immediately benefiting from typed helpers.\n4. **CI Gate**: Add `\"typecheck\": \"tsc --noEmit\"` to CI so no new type regressions enter `main`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Turning `strict: false` forever \"just to finish faster\", which lets `implicit any` and `null` crashes sneak into new `.ts` files.\n  - **Solution**: Keep `\"strict\": true` for `.ts/.tsx` files while untouched `.js` files coexist via `allowJs: true`.",
          "codeExample": "// tsconfig.json for Vite + React incremental migration\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\",\n    \"jsx\": \"react-jsx\",\n    \"allowJs\": true,\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"skipLibCheck\": true,\n    \"noEmit\": true\n  },\n  \"include\": [\"src\"]\n}",
          "codeExplanation": "1. allowJs: true permits existing .js/.jsx files to live alongside newly migrated .ts/.tsx files.\n2. noEmit: true delegates JS bundling to Vite while tsc checks types cleanly.\n3. strict: true and noUncheckedIndexedAccess enforce high safety on all TypeScript files.\n\nHow to Run & Expected Output:\nPlace this tsconfig.json in a Vite React project and run `npx tsc --noEmit`. Exits with code 0 when all TS files type-check cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Order these 4 files for bottom-up migration: `Dashboard.jsx`, `CourseCard.jsx`, `formatDuration.js`, `courseTypes.js`.\n\nIndependent Challenge:\nAdd `\"typecheck\": \"tsc --noEmit\"` to `package.json` scripts and test running it alongside `npm test`.\n\nExpected Result:\nSmooth coexistence of JS and TS files during incremental migration.",
          "keyTakeaways": [
            "Use allowJs: true and noEmit: true to migrate JS projects to TS incrementally without halting releases",
            "Convert bottom-up from leaf utilities and shared types toward UI pages",
            "Run tsc --noEmit in CI to catch type errors automatically"
          ]
        },
        {
          "title": "Avoiding Migration Anti-Patterns",
          "duration": "1h 05m",
          "introduction": "Silencing errors with // @ts-ignore or casting everything to `as any` defeats the entire purpose of migrating to TypeScript.",
          "objectives": [
            "Prefer // @ts-expect-error over // @ts-ignore when temporary suppressions are unavoidable",
            "Avoid sprinkling `as any` during migrations — use TODO-tagged narrow types instead"
          ],
          "notes": "### Migration Traps That Undermine Type Safety\nEven after converting files to `.ts`, two shortcuts quietly defeat TypeScript:\n1. **`// @ts-ignore`**: Silences the next line's compiler error **forever** — even months later after the underlying bug is fixed, the dead comment stays behind hiding new bugs!\n   - **Better**: If a temporary suppression is genuinely unavoidable (e.g., an outdated third-party `.d.ts` file), use **`// @ts-expect-error`**. TypeScript will fail compilation the moment that line stops erroring, reminding you to delete the comment!\n2. **Sprinkling `as any`**: Replace temporary `any` with `unknown` + a `TODO` or a narrow partial interface.\n\n### Common Mistakes & Solutions\n- **Mistake**: Leaving `@ts-ignore` comments scattered across a codebase.\n  - **Solution**: Run `rg \"@ts-ignore|as any\"` during code reviews and replace with `@ts-expect-error` or proper types.",
          "codeExample": "// Bad: hides bugs forever even after fixed\n// @ts-ignore\n// legacyFn(123);\n\n// Better (only for genuine temporary third-party typing gaps):\n// @ts-expect-error - third-party lib v1 types missing optional flag\nconst result = { ok: true };\nconsole.log(result.ok);",
          "codeExplanation": "1. @ts-expect-error self-cleans by throwing a compiler error (\"Unused '@ts-expect-error' directive\") as soon as the underlying error disappears.\n\nHow to Run & Expected Output:\nPlace `// @ts-expect-error` directly above `const x: number = 1;` and run `npx tsc --noEmit`. Compiler reports `Unused '@ts-expect-error' directive`, proving it never lingers silently.",
          "practiceExercise": "Guided Exercise:\n1. Test `// @ts-expect-error` above a valid statement vs an invalid statement with `npx tsc --noEmit`.\n\nIndependent Challenge:\nAudit a TypeScript folder for `as any` and replace one cast with a proper interface or `unknown` type guard.\n\nExpected Result:\nClean, self-maintaining TypeScript code with zero silent `@ts-ignore` rot.",
          "keyTakeaways": [
            "Never use // @ts-ignore — prefer // @ts-expect-error if a temporary suppression is genuinely needed",
            "Avoid `as any` during migration; narrow with unknown or define partial interfaces instead"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which tsconfig.json option lets .js and .ts files coexist during an incremental TypeScript migration?",
          "options": [
            "strict: false",
            "allowJs: true",
            "noEmit: false",
            "isolatedModules: false"
          ],
          "correctAnswer": 1,
          "explanation": "allowJs: true allows TypeScript to include and import existing .js/.jsx files while you convert file by file."
        },
        {
          "question": "In what order should you convert files when migrating a JavaScript codebase to TypeScript?",
          "options": [
            "Convert top-level App.jsx and pages first",
            "Convert bottom-up from leaf utilities and shared domain types toward components and pages",
            "Convert CSS files first",
            "Convert test files only"
          ],
          "correctAnswer": 1,
          "explanation": "Converting leaf helpers and shared types first gives immediate type safety to components that import them."
        },
        {
          "question": "Why is // @ts-expect-error preferred over // @ts-ignore?",
          "options": [
            "It fixes the bug automatically",
            "TypeScript alerts you to remove @ts-expect-error once the underlying error is fixed, whereas @ts-ignore stays silently forever",
            "@ts-ignore is invalid in TS 5",
            "@ts-expect-error disables strict mode"
          ],
          "correctAnswer": 1,
          "explanation": "@ts-expect-error fails if there is no longer an error on the next line, preventing stale suppressions."
        },
        {
          "question": "In a Vite + TypeScript project, what does running `tsc --noEmit` do?",
          "options": [
            "Deletes dist/",
            "Type-checks the entire project without writing compiled .js files (letting Vite handle bundling)",
            "Runs ESLint",
            "Starts the dev server"
          ],
          "correctAnswer": 1,
          "explanation": "noEmit: true runs full TypeScript type checking while leaving actual bundling to Vite/esbuild."
        }
      ]
    },
    {
      "title": "Module 7: Template Literal Types, Mapped Types & Conditional Types",
      "duration": "2h 15m",
      "objectives": [
        "Transform object keys and properties dynamically using Mapped Types and `as` key remapping",
        "Construct type-safe string patterns with Template Literal Types",
        "Extract inner types from Promises, arrays, or functions using Conditional Types + `infer`"
      ],
      "notes": "### Module Introduction & Description\nAdvanced TypeScript powers libraries like React Router, Prisma, and Zod using **Mapped Types**, **Template Literal Types**, and **Conditional Types (`infer`)** — letting you derive event names, getter objects, and unwrapped return types automatically without manual repetition.\n\n### Prerequisites\n- Completion of Modules 1–6 (generics, utility types, discriminated unions).\n\n### Skills Acquired\n- Key remapping in Mapped Types, Template Literal string unions, and extracting nested types with `infer`.\n\n### How the Lessons Connect\n- **Lesson 1** teaches Mapped Types and `as` key remapping.\n- **Lesson 2** teaches Template Literal Types and Conditional Types with `infer`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Typed Event Map & Unwrap Helper assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a type-level Event Handler Mapper and Async Unwrapper in TypeScript: given a state interface { user: User; theme: string }, automatically derive typed setter keys ({ setUser: (v: User) => void; setTheme: (v: string) => void }) and typed DOM event names ('onUserChange' | 'onThemeChange').\n\nObjectives:\n- Use Mapped Types with `as `set${Capitalize<string & K>}` key remapping.\n- Use Conditional Types with `infer` to extract element/resolved types cleanly.\n\nRequirements:\n1. Define type Setters<T> = { [K in keyof T as `set${Capitalize<string & K>}`]: (val: T[K]) => void }.\n2. Define type UnwrapArray<T> = T extends readonly (infer Item)[] ? Item : T.\n3. Define type EventChannel = `${'course' | 'module'}:${'created' | 'updated' | 'deleted'}`.\n4. Verify autocomplete and compile-time rejection of typos like 'course:archived'.\n\nStep-by-Step Instructions:\n1. Create typeGymnastics.ts and test all three generic types with sample interfaces.\n2. Run `npx tsc --noEmit` to confirm zero errors.\n\nDeliverables:\n- typeGymnastics.ts.\n\nEvaluation Criteria:\n- Zero `any`; clean key remapping and `infer` usage.",
      "lessons": [
        {
          "title": "Mapped Types & Key Remapping (as)",
          "duration": "1h 05m",
          "introduction": "How does TypeScript implement Partial<T> and Readonly<T> under the hood? With Mapped Types — loops over object keys at the type level!",
          "objectives": [
            "Write custom Mapped Types iterating [K in keyof T]",
            "Transform property names cleanly with `as` key remapping and Capitalize<...>"
          ],
          "notes": "### Mapped Types Are Loops Over Keys\n`type ReadonlyCopy<T> = { readonly [K in keyof T]: T[K] };`\nWith TypeScript 4.1+ **key remapping (`as`)**, you can rename keys on the fly (`as `get${Capitalize<string & K>}``) or filter out keys using `never`!",
          "codeExample": "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ninterface Profile {\n  name: string;\n  score: number;\n}\n\nconst profileGetters: Getters<Profile> = {\n  getName: () => 'Ada',\n  getScore: () => 98\n};\n\nconsole.log(profileGetters.getName());",
          "codeExplanation": "1. Iterates over K in keyof Profile ('name' | 'score').\n2. Remaps each key to getName and getScore while preserving exact return types () => string and () => number.\n\nHow to Run & Expected Output:\nRun `npx tsx mapped.ts`. Prints `Ada`.",
          "practiceExercise": "Guided Exercise:\n1. Add `role: 'student' | 'instructor'` to `Profile` and observe TypeScript immediately requiring `getRole: () => ...` on `profileGetters`.\n\nIndependent Challenge:\nWrite `PickByValue<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }` to extract only string properties from an interface!\n\nExpected Result:\nZero-boilerplate derived object contracts.",
          "keyTakeaways": [
            "Mapped types transform every property of an existing type systematically",
            "Use `as` key remapping with Capitalize<...> or conditional `never` to rename or filter keys"
          ]
        },
        {
          "title": "Template Literal Types & Conditional Type Inference (infer)",
          "duration": "1h 10m",
          "introduction": "Template Literal Types bring backtick string interpolation into TypeScript’s type system — catching typoed event names and route strings at compile time.",
          "objectives": [
            "Combine string unions with Template Literal Types",
            "Extract inner types from Promises or functions using `T extends ...<infer R> ? R : ...`"
          ],
          "notes": "### Conditional Types + `infer`\nThink of `T extends U ? X : Y` as a ternary `if` at the type level. Adding **`infer R`** asks TypeScript to capture and name an inner type automatically (just like built-in `Awaited<T>` and `ReturnType<T>` do!).",
          "codeExample": "type Resource = 'course' | 'module';\ntype Action = 'created' | 'deleted';\ntype AuditEvent = `${Resource}:${Action}`;\n\ntype ElementOf<T> = T extends readonly (infer E)[] ? E : never;\n\nconst ev: AuditEvent = 'course:created';\ntype CourseItem = ElementOf<{ id: string }[]>; // { id: string }\nconst sample: CourseItem = { id: 'c1' };\nconsole.log(ev, sample.id);",
          "codeExplanation": "1. AuditEvent expands automatically to 'course:created' | 'course:deleted' | 'module:created' | 'module:deleted'.\n2. ElementOf<T> extracts the inner array element type via infer E.\n\nHow to Run & Expected Output:\nRun `npx tsx inferDemo.ts`. Prints `course:created c1`.",
          "practiceExercise": "Guided Exercise:\n1. Try assigning `'course:updated'` to `AuditEvent` and verify TypeScript rejects it immediately.\n\nIndependent Challenge:\nImplement your own `MyReturnType<F>` using `F extends (...args: any[]) => infer R ? R : never`.\n\nExpected Result:\nCompile-time string pattern safety and automatic type extraction.",
          "keyTakeaways": [
            "Template literal types build exact string unions from smaller literal unions",
            "Conditional types with `infer` extract inner types from arrays, Promises, and function signatures"
          ]
        }
      ],
      "quiz": [
        {
          "question": "How many string literals does `type Key = `${\"a\" | \"b\"}_${1 | 2}`` expand into?",
          "options": [
            "2",
            "4 (\"a_1\" | \"a_2\" | \"b_1\" | \"b_2\")",
            "1",
            "Infinite"
          ],
          "correctAnswer": 1,
          "explanation": "Template literal types compute the Cartesian product of the interpolated unions (2 x 2 = 4 literals)."
        },
        {
          "question": "What does `infer R` do inside `type Unwrap<T> = T extends Promise<infer R> ? R : T`?",
          "options": [
            "Throws a runtime error",
            "Asks TypeScript to capture the resolved inner type of a Promise and assign it to type variable R",
            "Converts a Promise to an array",
            "Disables async/await"
          ],
          "correctAnswer": 1,
          "explanation": "infer declares a local type variable inside a conditional extends clause to extract wrapped types."
        },
        {
          "question": "In a Mapped Type `[K in keyof T as ...]`, what happens when the `as` clause evaluates to `never` for a key?",
          "options": [
            "TypeScript throws a syntax error",
            "That property is filtered out (omitted) from the resulting mapped type",
            "The property becomes required",
            "The property becomes any"
          ],
          "correctAnswer": 1,
          "explanation": "Remapping a key to never omits that key cleanly from the resulting object type."
        },
        {
          "question": "Why intersect `string & K` inside `Capitalize<string & K>` when iterating `keyof T`?",
          "options": [
            "Because keyof T can include number or symbol keys, whereas Capitalize requires string",
            "To convert values to numbers",
            "To make keys optional",
            "It is required for CSS"
          ],
          "correctAnswer": 0,
          "explanation": "keyof T yields string | number | symbol; intersecting with string filters to string keys accepted by Capitalize."
        }
      ]
    },
    {
      "title": "Module 8: TypeScript with Node.js, Express & Shared Contracts",
      "duration": "2h 00m",
      "objectives": [
        "Type Express Request, Response, and NextFunction handlers cleanly",
        "Augment Express.Request safely via module augmentation for req.user",
        "Share TypeScript DTO interfaces across React frontend and Express backend"
      ],
      "notes": "### Module Introduction & Description\nUsing TypeScript on **both** your Express backend and React frontend lets you share one set of API DTOs — so changing a response field on the server immediately highlights every affected React component at compile time!\n\n### Prerequisites\n- Completion of Modules 1–7 and Node/Express fundamentals.\n\n### Skills Acquired\n- Typing Express handlers, extending `Express.Request` via `.d.ts` module augmentation, and sharing frontend/backend contracts.\n\n### How the Lessons Connect\n- **Lesson 1** types Express routes and `req.user` via module augmentation.\n- **Lesson 2** structures shared DTO contracts between React and Express.\n\n### Completion Criteria\n- Complete both lessons, deliver the Typed Express Auth Middleware & Shared DTO assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nAn Express + TypeScript backend currently casts (req as any).user inside every protected controller. Eliminate those any casts with proper Express Request augmentation and shared Course DTO types.\n\nObjectives:\n- Augment Express.Request cleanly in types/express.d.ts so req.user is typed everywhere.\n- Type Request<Params, ResBody, ReqBody> generics on an Express controller.\n\nRequirements:\n1. Create express.d.ts augmenting declare global { namespace Express { interface Request { user?: { id: string; role: 'student' | 'instructor' | 'admin' } } } }.\n2. Write a typed createCourseHandler(req: Request<{}, CourseDto, CreateCourseDto>, res: Response<CourseDto | { message: string }>).\n3. Guard if (!req.user) return res.status(401)... cleanly without any \"as any\" cast.\n\nStep-by-Step Instructions:\n1. Create sharedTypes.ts, express.d.ts, and courseController.ts.\n2. Run `npx tsc --noEmit` confirming zero errors and full autocomplete on `req.user.role`.\n\nDeliverables:\n- sharedTypes.ts, express.d.ts, and courseController.ts.\n\nEvaluation Criteria:\n- Zero `(req as any).user` casts.\n- Explicit Request/Response generic parameters on handlers.",
      "lessons": [
        {
          "title": "Typing Express Request, Response & Custom Locals/User",
          "duration": "1h 00m",
          "introduction": "Casting `(req as any).user` in 20 controllers reintroduces every bug TypeScript was meant to stop. Module augmentation types `req.user` once globally.",
          "objectives": [
            "Use Request<Params, ResBody, ReqBody, Query> generics in Express",
            "Augment Express.Request cleanly without polluting controllers with `any`"
          ],
          "notes": "### Augmenting `Express.Request`\nCreate a `types/express.d.ts` file declaring `user?: AuthUser;` on `Express.Request`. Notice `user` is **optional (`?`)** because unauthenticated public routes don't have `req.user`! After `if (!req.user) return res.status(401)...`, TypeScript narrows `req.user` to guaranteed non-null `AuthUser`.",
          "codeExample": "import type { Request, Response } from 'express';\n\ninterface CreateCourseBody {\n  title: string;\n  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';\n}\n\nexport function createCourseHandler(\n  req: Request<Record<string, string>, unknown, CreateCourseBody>,\n  res: Response<{ id: string; title: string } | { message: string }>\n) {\n  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';\n  if (title.length < 3) {\n    return res.status(400).json({ message: 'Title too short' });\n  }\n  return res.status(201).json({ id: 'c1', title });\n}",
          "codeExplanation": "1. Request<Params, ResBody, ReqBody> types req.body as CreateCourseBody cleanly.\n2. Response<...> constrains res.json() payloads so returning a typoed field fails at compile time.\n\nHow to Run & Expected Output:\nType-check with `npx tsc --noEmit`; attempting `res.status(201).json({ wrongKey: 1 })` immediately fails to compile.",
          "practiceExercise": "Guided Exercise:\n1. Try returning `res.status(201).json({ name: title })` instead of `{ id: 'c1', title }` and observe TypeScript catching the mismatched response key!\n\nIndependent Challenge:\nWrite a typed `errorHandler(err: unknown, req: Request, res: Response, next: NextFunction)` in TypeScript.\n\nExpected Result:\nEnd-to-end typed Express request bodies, responses, and middleware.",
          "keyTakeaways": [
            "Use Express Request<Params, ResBody, ReqBody, Query> generics to type route inputs and outputs",
            "Augment Express.Request with optional `user?: AuthUser` instead of casting `(req as any).user`"
          ]
        },
        {
          "title": "End-to-End Shared Types Between Frontend & Backend",
          "duration": "1h 00m",
          "introduction": "When React and Express share a `shared/contracts.ts` module, renaming a field on the backend immediately flags every React component using it.",
          "objectives": [
            "Organize pure DTO interfaces in a shared contracts file (zero Express/React runtime imports!)",
            "Use `import type` so shared type imports add zero bytes to browser bundles"
          ],
          "notes": "### `import type` Keeps Bundles Pure\nAlways use `import type { CourseDto } from '../../shared/contracts'` in React and Node! `import type` is 100% erased at compile time and guarantees zero accidental runtime dependency leaks between frontend and backend.",
          "codeExample": "// shared/contracts.ts (pure types only - zero runtime dependencies!)\nexport type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';\n\nexport interface CourseDto {\n  id: string;\n  title: string;\n  difficulty: Difficulty;\n  moduleCount: number;\n}\n\n// Frontend usage: import type { CourseDto } from '@shared/contracts';",
          "codeExplanation": "1. Pure interfaces with zero framework imports work seamlessly in both Vite React and Node.js Express.",
          "practiceExercise": "Guided Exercise:\n1. Rename `moduleCount` to `modulesCount` in `CourseDto` and run `tsc --noEmit` across both workspaces to see every affected file highlighted instantly.\n\nIndependent Challenge:\nEnable `\"verbatimModuleSyntax\": true` in `tsconfig.json` so TypeScript enforces `import type` on type-only imports automatically.\n\nExpected Result:\nZero API contract drift between frontend and backend.",
          "keyTakeaways": [
            "Keep shared frontend/backend contracts strictly to pure interfaces and union types",
            "Use `import type` so type imports emit zero JavaScript code"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should `req.user` in Express.Request augmentation be typed as optional (`user?: AuthUser`) rather than required?",
          "options": [
            "Express forbids required properties",
            "Because unauthenticated public routes also use Request, where req.user is legitimately undefined",
            "Optional properties run faster",
            "JWTs don’t have user IDs"
          ],
          "correctAnswer": 1,
          "explanation": "Typing req.user as optional forces protected handlers to verify if (!req.user) before accessing req.user.id."
        },
        {
          "question": "What does `import type { CourseDto } from \"./contracts\"` guarantee?",
          "options": [
            "It bundles contracts.js into the browser",
            "TypeScript erases the import completely at compile time, guaranteeing zero runtime bundle overhead or Node/React cross-imports",
            "It validates JSON at runtime",
            "It enables strict mode"
          ],
          "correctAnswer": 1,
          "explanation": "Type-only imports are stripped completely during compilation."
        },
        {
          "question": "In `Request<Params, ResBody, ReqBody, Query>`, which generic position types `req.body`?",
          "options": [
            "1st (Params)",
            "2nd (ResBody)",
            "3rd (ReqBody)",
            "4th (Query)"
          ],
          "correctAnswer": 2,
          "explanation": "Express’s Request generic order is Params, ResBody, ReqBody, Query."
        },
        {
          "question": "What does `\"verbatimModuleSyntax\": true` enforce in `tsconfig.json`?",
          "options": [
            "Disables ES modules",
            "Requires explicit `import type` when importing types/interfaces so bundlers never emit broken runtime imports",
            "Allows implicit any",
            "Converts TS to CommonJS"
          ],
          "correctAnswer": 1,
          "explanation": "verbatimModuleSyntax prevents bundlers from keeping runtime imports for erased TypeScript interfaces."
        }
      ]
    },
    {
      "title": "Module 9: Function Overloads, Const Generics & Declaration Files (.d.ts)",
      "duration": "2h 00m",
      "objectives": [
        "Write clean Function Overloads when return types depend strictly on input combinations",
        "Preserve literal tuple/array types using TypeScript 5 `const` type parameters",
        "Author ambient `.d.ts` declaration files for untyped third-party JS libraries"
      ],
      "notes": "### Module Introduction & Description\nOccasionally a function's return type changes based on its input arguments (e.g., passing a single ID returns `Course`, passing `string[]` returns `Course[]`), OR you import an older JavaScript npm package lacking TypeScript types. **Function Overloads** and **`.d.ts` Declaration Files** solve both cleanly.\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Authoring function overloads, TS 5 `<const T>` parameters, and minimal ambient `.d.ts` module declarations.\n\n### How the Lessons Connect\n- **Lesson 1** covers Function Overloads and TS 5 `const` type parameters.\n- **Lesson 2** writes ambient `.d.ts` declarations for untyped JS modules.\n\n### Completion Criteria\n- Complete both lessons, deliver the Overloaded Lookup & Ambient .d.ts assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nA utility function getCourses(idOrIds) returns a single Course when given a string ID and Course[] when given a string[] — AND your team uses a tiny untyped JS package 'slugify-mini' that fails TypeScript import checks.\n\nObjectives:\n- Type getCourses accurately using Function Overloads (without returning imprecise Course | Course[]).\n- Create a typed module declaration in types/slugify-mini.d.ts.\n\nRequirements:\n1. Write two overload signatures + one implementation signature for getCourses(id: string): Course and getCourses(ids: string[]): Course[].\n2. Write declare module 'slugify-mini' exporting export default function slugify(text: string): string;.\n3. Create a TS 5 <const T extends readonly string[]> helper returning exact literal union of its input array!\n\nStep-by-Step Instructions:\n1. Implement overloadsAndDts.ts and slugify-mini.d.ts.\n2. Run npx tsc --noEmit confirming callers of getCourses('c1') receive Course directly (not Course | Course[]).\n\nDeliverables:\n- overloadsAndDts.ts and slugify-mini.d.ts.\n\nEvaluation Criteria:\n- Implementation signature is hidden from callers; only overload signatures are exposed.\n- Exact non-widened literal inference on <const T>.",
      "lessons": [
        {
          "title": "Function Overloads & Const Type Parameters",
          "duration": "1h 00m",
          "introduction": "Returning `string | string[]` forces every caller to check `Array.isArray()`. Function overloads give callers the exact return type for each call pattern.",
          "objectives": [
            "Write overload signatures above the private implementation signature",
            "Use TS 5 `<const T>` to infer literal tuple types without callers typing `as const`"
          ],
          "notes": "### How Function Overloads Work\nList 2+ **overload signatures** (no body), followed immediately by the **implementation signature** (which must be broad enough to handle all overloads, and is **invisible** to callers!).\nAnd in TypeScript 5+, `function defineRoutes<const T extends readonly string[]>(routes: T): T` infers `readonly ['/home', '/courses']` instead of widening to `string[]`!",
          "codeExample": "function formatInput(val: string): string;\nfunction formatInput(val: number): string;\nfunction formatInput(val: string | number): string {\n  return typeof val === 'number' ? val.toFixed(2) : val.trim();\n}\n\nfunction defineRoles<const T extends readonly string[]>(roles: T): T {\n  return roles;\n}\n\nconst ROLES = defineRoles(['student', 'instructor']); // readonly ['student', 'instructor']!\nconsole.log(formatInput(12.345), ROLES);",
          "codeExplanation": "1. Callers see only the two clean overload signatures for string and number.\n2. defineRoles uses TS 5 <const T> so ROLES retains exact literal strings 'student' and 'instructor' instead of widening to string[].\n\nHow to Run & Expected Output:\nRun `npx tsx overloads.ts`. Prints `12.35 [ 'student', 'instructor' ]`.",
          "practiceExercise": "Guided Exercise:\n1. Remove `const` from `defineRoles<T>` temporarily and hover over `ROLES` in VS Code to watch it widen to `string[]`, then restore `const`.\n\nIndependent Challenge:\nWrite overloaded `parseIds(raw: string): string[]` and `parseIds(raw: null): []`.\n\nExpected Result:\nExact caller return types with zero manual `as const` noise.",
          "keyTakeaways": [
            "Function overloads expose precise input-to-output signatures while hiding the broader implementation signature",
            "TS 5 <const T> type parameters preserve exact literal and tuple types automatically"
          ]
        },
        {
          "title": "Writing Ambient .d.ts Declarations for Untyped Packages",
          "duration": "1h 00m",
          "introduction": "When an older npm package ships without types (and `@types/pkg` doesn’t exist), a 5-line `.d.ts` file gives you full type safety without turning off `noImplicitAny`.",
          "objectives": [
            "Write module declarations in .d.ts files (declare module \"...\")",
            "Avoid polluting .d.ts files with `any` — type the actual functions you call"
          ],
          "notes": "### Writing Clean `.d.ts` Files\nPlace a `declarations.d.ts` file inside `src/` (included by `tsconfig.json`). Inside, write `declare module 'untyped-pkg' { export function parse(input: string): Record<string, string>; }` so every import across your app is type-checked cleanly!",
          "codeExample": "// src/types/vendor.d.ts\ndeclare module 'tiny-markdown-strip' {\n  export function stripMarkdown(markdown: string): string;\n}\n\n// Note: Vite also provides asset types via /// <reference types=\"vite/client\" />",
          "codeExplanation": "1. Declares exact parameter and return types for an untyped third-party JS package.\n2. Zero runtime code is emitted from .d.ts files.",
          "practiceExercise": "Guided Exercise:\n1. Inspect `vite-env.d.ts` in a Vite + TS template to see `/// <reference types=\"vite/client\" />` in action.\n\nIndependent Challenge:\nWrite an ambient `declare module '*.svg?react'` declaration typing imported SVG React components.\n\nExpected Result:\nZero `Could not find a declaration file` errors under strict mode.",
          "keyTakeaways": [
            "Use .d.ts files with `declare module \"...\"` to type untyped JS packages cleanly",
            "Never emit runtime logic in .d.ts files — keep them strictly declarations"
          ]
        }
      ],
      "quiz": [
        {
          "question": "In a TypeScript overloaded function, can callers invoke the implementation signature directly if it isn’t listed as an overload?",
          "options": [
            "Yes — always",
            "No — callers can only match the public overload signatures declared above the implementation",
            "Only in strict: false",
            "Only inside async functions"
          ],
          "correctAnswer": 1,
          "explanation": "The implementation signature is private to the function body; callers are type-checked strictly against the overload signatures."
        },
        {
          "question": "What does TypeScript 5’s `<const T>` type parameter (`function fn<const T>(x: T)`) accomplish?",
          "options": [
            "Freezes objects at runtime with Object.freeze",
            "Infers narrow literal and readonly tuple types automatically without the caller writing `as const`",
            "Disables generics",
            "Converts strings to numbers"
          ],
          "correctAnswer": 1,
          "explanation": "const type parameters instruct TypeScript to infer the narrowest literal types possible at the call site."
        },
        {
          "question": "What is the purpose of a `.d.ts` declaration file?",
          "options": [
            "To store CSS variables",
            "To provide compile-time TypeScript type definitions for JavaScript modules or assets without emitting runtime JS",
            "To run unit tests",
            "To configure MongoDB"
          ],
          "correctAnswer": 1,
          "explanation": ".d.ts files supply static type information for JS packages, globals, or asset imports like .svg/.css."
        },
        {
          "question": "Why should you avoid writing just `declare module \"some-pkg\";` (shorthand ambient module) long-term?",
          "options": [
            "It causes a syntax error",
            "It silently types every export from \"some-pkg\" as `any`, hiding typos and wrong argument types",
            "It slows down Vite",
            "It disables CSS"
          ],
          "correctAnswer": 1,
          "explanation": "An empty declare module defaults everything to any; declare the specific exports you use for real type safety."
        }
      ]
    },
    {
      "title": "Module 10: Zod Schema Integration & Capstone Type-Safe Client",
      "duration": "2h 00m",
      "objectives": [
        "Derive both runtime validators AND compile-time TypeScript types from a single schema (Zod pattern)",
        "Build a complete, strict, runtime-validated TypeScript API client integrating Modules 1–10"
      ],
      "notes": "### Module Introduction & Description\nIn Module 5 you saw why TypeScript interfaces disappear at runtime. **Schema-first validation** (like **Zod**, Valibot, or TypeBox) lets you write **one** schema that both validates untrusted API/form data at runtime AND infers the exact TypeScript type (`z.infer<typeof CourseSchema>`) automatically!\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Single-source-of-truth runtime + compile-time schemas, typed generic `fetchJson`, and strict TypeScript project sign-off.\n\n### How the Lessons Connect\n- **Lesson 1** teaches single-source-of-truth runtime + static schema patterns (`z.infer` concept).\n- **Lesson 2** builds the Final Capstone Type-Safe Course API Client.\n\n### Completion Criteria\n- Complete both lessons, deliver the Type-Safe Validated API Client Capstone, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Full-Stack Type-Safe Course API Client:\nProblem Statement:\nBuild a complete, strict TypeScript API client (zero any, zero blind `as` casts, noUncheckedIndexedAccess-safe) combining generics, discriminated union results, and runtime schema validation at the network boundary.\n\nObjectives:\n- Eliminate runtime API shape crashes AND compile-time type mismatches in one cohesive module.\n\nRequirements:\n1. Define a reusable Result<T> discriminated union: { ok: true; data: T } | { ok: false; error: string; status?: number }.\n2. Write a generic requestValidated<T>(url: string, parse: (raw: unknown) => T, signal?: AbortSignal): Promise<Result<T>>.\n3. Implement parseCourse and parseCourseArray validators checking every required field (id, title, difficulty enum, moduleCount >= 0).\n4. Handle HTTP errors (!res.ok), JSON parse failures, and validation errors cleanly inside Result<T> without throwing unhandled rejections to UI components!\n\nStep-by-Step Instructions:\n1. Create courseApiClient.ts and verify under `npx tsc --noEmit --strict --noUncheckedIndexedAccess`.\n2. Write a small verification script testing valid JSON, 404 response, and malformed JSON ({ bad: true }).\n\nDeliverables:\n- courseApiClient.ts and verifyClient.ts.\n\nEvaluation Criteria:\n- Zero `any` and zero blind `as Course` casts.\n- Exhaustive discriminated union Result<T> handling.",
      "lessons": [
        {
          "title": "Single-Source-of-Truth Schemas with Zod (z.infer)",
          "duration": "1h 00m",
          "introduction": "Writing a TypeScript interface AND a separate manual `if (typeof obj.title !== \"string\")` validator duplicates work. Schema-first validation derives both from one definition.",
          "objectives": [
            "Understand how `type Course = z.infer<typeof CourseSchema>` eliminates drift between runtime checks and TS types",
            "Use safeParse() to return discriminated { success: true, data } | { success: false, error } results"
          ],
          "notes": "### One Schema = Runtime Guard + Static Type\nWith schema libraries like Zod:\n```ts\nconst CourseSchema = z.object({\n  id: z.string(),\n  title: z.string().min(3),\n  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced'])\n});\ntype Course = z.infer<typeof CourseSchema>;\n```\nChanging `CourseSchema` automatically updates `Course` everywhere in your app AND validates incoming API/form payloads! Even without installing a library, following the exact same `safeParse -> { ok: true, data } | { ok: false, error }` pattern keeps boundaries rock solid.",
          "codeExample": "// Zero-dependency safeParse pattern mirroring Zod's discriminated result:\ntype ParseResult<T> = { ok: true; data: T } | { ok: false; error: string };\n\ninterface Course {\n  id: string;\n  title: string;\n}\n\nexport function safeParseCourse(raw: unknown): ParseResult<Course> {\n  if (typeof raw !== 'object' || raw === null) {\n    return { ok: false, error: 'Payload is not an object' };\n  }\n  const obj = raw as Record<string, unknown>;\n  if (typeof obj.id !== 'string' || typeof obj.title !== 'string') {\n    return { ok: false, error: 'Missing string id or title' };\n  }\n  return { ok: true, data: { id: obj.id, title: obj.title } };\n}\n\nconsole.log(safeParseCourse({ id: '1', title: 'TypeScript' }));",
          "codeExplanation": "1. ParseResult<T> is a generic discriminated union matching Zod's safeParse contract.\n2. Callers check if (res.ok) to narrow res.data to Course cleanly without try/catch boilerplate.\n\nHow to Run & Expected Output:\nRun `npx tsx safeParse.ts`. Prints `{ ok: true, data: { id: '1', title: 'TypeScript' } }`.",
          "practiceExercise": "Guided Exercise:\n1. Test `safeParseCourse({ id: 42 })` and verify it returns `{ ok: false, error: 'Missing string id or title' }`.\n\nIndependent Challenge:\nIf using `zod` in a project, write `LoginSchema = z.object({ email: z.string().email(), password: z.string().min(8) })` and infer `type LoginInput = z.infer<typeof LoginSchema>`.\n\nExpected Result:\nZero divergence between runtime validation and static TypeScript types.",
          "keyTakeaways": [
            "Schema-first libraries like Zod derive both runtime validation and static TS types (z.infer) from one source",
            "Discriminated { ok: true, data } | { ok: false, error } results make boundary validation clean and exhaustive"
          ]
        },
        {
          "title": "Final Capstone: Full-Stack Type-Safe Course API Client",
          "duration": "1h 00m",
          "introduction": "Bringing together all 10 TypeScript modules into a strict, zero-`any`, runtime-validated API client.",
          "objectives": [
            "Combine Generics, Discriminated Unions, unknown boundary validation, and AbortController in one clean helper",
            "Pass tsc --noEmit --strict --noUncheckedIndexedAccess with zero errors"
          ],
          "notes": "### Strict TypeScript Mastery Checklist\n1. `\"strict\": true` + `\"noUncheckedIndexedAccess\": true` + `\"verbatimModuleSyntax\": true`.\n2. Zero `any`, zero `@ts-ignore`, zero blind `as` casts at API boundaries.\n3. Discriminated Unions + `never` exhaustiveness for UI/async states.",
          "codeExample": "type ApiResult<T> =\n  | { ok: true; data: T }\n  | { ok: false; error: string; status?: number };\n\nexport async function fetchValidated<T>(\n  url: string,\n  validate: (raw: unknown) => T,\n  signal?: AbortSignal\n): Promise<ApiResult<T>> {\n  try {\n    const res = await fetch(url, { signal });\n    if (!res.ok) return { ok: false, error: `HTTP ${res.status}`, status: res.status };\n    const raw: unknown = await res.json();\n    return { ok: true, data: validate(raw) };\n  } catch (err: unknown) {\n    const msg = err instanceof Error ? err.message : 'Network error';\n    return { ok: false, error: msg };\n  }\n}",
          "codeExplanation": "1. Generic fetchValidated<T> accepts any boundary validator function and returns a discriminated ApiResult<T>.\n2. Handles HTTP failures, unknown catch errors, and AbortSignal cleanly with zero any.\n\nHow to Run & Expected Output:\nType-check with `npx tsc --noEmit --strict --noUncheckedIndexedAccess`: exits cleanly with code 0.",
          "practiceExercise": "Guided Exercise:\n1. Call `fetchValidated('/api/courses/1', parseCourse)` and switch on `if (result.ok)` in a React or Node script.\n\nIndependent Challenge:\nAdd a `if (err instanceof Error && err.name === 'AbortError')` branch returning `{ ok: false, error: 'Cancelled' }`.\n\nExpected Result:\nBulletproof, strict TypeScript API layer.",
          "keyTakeaways": [
            "Combine generics, discriminated unions, and runtime boundary validators for end-to-end reliability",
            "Run tsc --noEmit in CI to keep strict type safety intact across every PR"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What problem does `type User = z.infer<typeof UserSchema>` solve?",
          "options": [
            "It compiles CSS",
            "It derives the static TypeScript type directly from the runtime validator so they can never drift out of sync",
            "It disables strictNullChecks",
            "It replaces HTTP fetch"
          ],
          "correctAnswer": 1,
          "explanation": "Single-source-of-truth schemas guarantee runtime checks and compile-time types always match."
        },
        {
          "question": "Why does `fetchValidated<T>` accept a `validate: (raw: unknown) => T` callback instead of just returning `await res.json() as T`?",
          "options": [
            "fetch() forbids generics",
            "Because `as T` performs zero runtime checks, whereas `validate(raw)` verifies actual JSON structure at the boundary",
            "Callbacks make JSON parse faster",
            "TypeScript requires callbacks in async functions"
          ],
          "correctAnswer": 1,
          "explanation": "Passing unknown through a runtime validator ensures malformed server payloads fail cleanly at the boundary."
        },
        {
          "question": "In `type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }`, what happens inside `if (res.ok)`?",
          "options": [
            "res.data stays unknown",
            "TypeScript narrows res to { ok: true; data: T }, guaranteeing res.data exists without optional chaining",
            "res.error becomes required",
            "It throws an exception"
          ],
          "correctAnswer": 1,
          "explanation": "Discriminated union narrowing gives exact typed access to data in the ok: true branch and error in ok: false."
        },
        {
          "question": "Which compiler command verifies TypeScript strictness in CI without generating output files?",
          "options": [
            "npx tsc --noEmit",
            "npm run dev",
            "node --version",
            "npx eslint --init"
          ],
          "correctAnswer": 0,
          "explanation": "tsc --noEmit runs full type-checking across the codebase cleanly without emitting JS artifacts."
        }
      ]
    }
  ]
};
