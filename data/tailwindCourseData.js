export const tailwindCourseData = {
  "title": "Tailwind CSS Design Systems",
  "description": "Build refined, responsive, accessible user interfaces at high speed with Tailwind CSS v3. Master utility-first architecture, custom theme tokens, Flexbox & Grid layouts, interactive states, dark/brand theming, and mobile-safe dashboard patterns.",
  "thumbnail": "tailwind",
  "totalDuration": "10h 00m",
  "category": "Frontend Development",
  "difficulty": "Beginner",
  "tags": [
    "Tailwind CSS",
    "Design Systems",
    "Responsive UI",
    "Accessibility",
    "Dashboards"
  ],
  "learningOutcomes": [
    "Understand Tailwind's JIT compiler and why utility-first CSS scales cleanly",
    "Configure custom brand colors, typography, and spacing tokens in tailwind.config.js",
    "Build mobile-first responsive grids and sticky layouts without horizontal overflow",
    "Style accessible interactive states (hover, focus-visible, disabled, group-hover)",
    "Design polished modals, responsive data tables, and navigation bars",
    "Avoid common Tailwind anti-patterns like dynamic class string interpolation"
  ],
  "prerequisites": [
    "HTML & CSS fundamentals"
  ],
  "targetAudience": "Frontend and full-stack developers who want to build consistent, commercial-grade UIs rapidly.",
  "practicalProject": "Build a responsive SaaS Learning Dashboard with sticky navigation, stat cards, course filter bar, accessible modal, and mobile-scrollable table.",
  "modules": [
    {
      "title": "Module 1: Utility-First Architecture & Custom Theme Tokens",
      "duration": "1h 45m",
      "objectives": [
        "Explain how Tailwind's JIT engine scans content globs and purges unused CSS",
        "Extend tailwind.config.js with brand colors, fonts, and spacing tokens",
        "Avoid dynamic string interpolation traps by mapping full static class names"
      ],
      "notes": "### Module Introduction\nTailwind CSS is not inline styles — it is a **constrained design system** compiled at build time by a **Just-In-Time (JIT)** engine. Instead of inventing hundreds of fragile BEM class names (`.card__header--muted`), you compose tested spacing, color, and typography tokens directly in JSX/HTML.\n\n### Prerequisites\n- Basic HTML & CSS familiarity.\n\n### How the Lessons Connect\n- **Lesson 1** explains how Tailwind's JIT scanner works and how to extend `tailwind.config.js` with custom brand tokens.\n- **Lesson 2** exposes the #1 Tailwind production bug — dynamic template string class names like `bg-${color}-500` — and shows the safe static lookup-map pattern.\n\n### Module Summary\nYou will configure custom design tokens cleanly and write Tailwind classes that always survive production CSS purging.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Brand Token Config & Safe Variant Badge assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nA team's Tailwind buttons and status badges work inconsistently or disappear in production builds because someone wrote bg-${statusColor}-500 dynamically and hardcoded hex colors everywhere.\n\nObjectives:\n- Configure custom brand colors and font families in tailwind.config.js under theme.extend.\n- Replace dynamic string-interpolated Tailwind classes with a complete static lookup object.\n\nRequirements:\n1. Update tailwind.config.js with content globs covering ./index.html and ./src/**/*.{js,jsx,ts,tsx}, plus theme.extend.colors (brand.primary, brand.surface, brand.ink).\n2. Create a <StatusBadge status=\"success|warning|danger\" /> component using a static VARIANT_CLASSES object containing full Tailwind strings (e.g. 'bg-emerald-50 text-emerald-700 border-emerald-200').\n3. Zero dynamic class concatenation (bg-${...}) anywhere.\n\nStep-by-Step Instructions:\n1. Configure tailwind.config.js inside theme.extend (never overwrite theme.colors directly unless intentionally removing defaults!).\n2. Build StatusBadge.jsx with a safe fallback default variant.\n3. Run a production build and verify every badge color exists in the compiled CSS.\n\nDeliverables:\n- tailwind.config.js and StatusBadge.jsx.\n\nEvaluation Criteria:\n- Full static class strings visible to Tailwind's JIT scanner.\n- theme.extend preserves Tailwind's default palette alongside custom brand tokens.",
      "lessons": [
        {
          "title": "How Tailwind Works & Extending tailwind.config.js",
          "duration": "55m",
          "introduction": "Why is a production Tailwind CSS bundle often under 15 KB even though Tailwind has thousands of utility classes? The JIT static scanner explains it.",
          "objectives": [
            "Understand how Tailwind scans content files for complete utility tokens",
            "Use theme.extend vs theme in tailwind.config.js",
            "Understand why Tailwind CSS stops growing as your app gets larger"
          ],
          "notes": "### Why Utility-First CSS Scales Cleanly\nTraditional CSS grows linearly as an application grows: every new feature spawns `.sidebar-card-title-v2`, leading to dead rules nobody dares delete. **Tailwind CSS** flips that model with a fixed, constrained vocabulary of single-purpose utility classes (`px-4`, `rounded-xl`, `text-stone-900`). Once your project reaches ~15 KB of CSS, adding 50 more pages barely adds 1 KB!\n\n### How the JIT Compiler Works Under the Hood\nDuring `npm run dev` and `npm run build`, Tailwind's **Just-In-Time (JIT)** engine scans every file matching the `content` glob patterns in `tailwind.config.js`:\n1. It extracts every token that looks like a complete class name (`bg-orange-500`, `md:grid-cols-3`).\n2. It matches those tokens against your theme configuration.\n3. It emits **only** the CSS rules actually used — automatically purging thousands of unused classes.\n\n### Extending `tailwind.config.js`: `theme` vs. `theme.extend`\n- **Inside `theme` directly**: Replaces Tailwind's entire default scale for that key. Putting `colors: { brand: '#FF8C42' }` directly under `theme` **deletes** `bg-white`, `text-gray-600`, and `bg-red-500`!\n- **Inside `theme.extend`**: Merges your brand tokens alongside Tailwind's full default palette, giving you both `bg-cortex-accent` and `bg-emerald-500`.\n\n### Common Mistakes & Solutions\n- **Mistake**: Forgetting `./src/**/*.jsx` in `content` globs, causing styles to work in one folder and vanish in another.\n  - **Solution**: Always verify `content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}']`.\n- **Mistake**: Overwriting `theme.fontFamily` without including fallback system fonts.\n  - **Solution**: Always end custom font stacks with `'system-ui', 'sans-serif'`.\n\n### Real-World Application\nEvery commercial design system (such as Cortex LMS's cream `#FDFBF7` background, charcoal `#1C1C1C` ink, and warm orange `#FF8C42` accent) defines brand tokens once in `tailwind.config.js` so every engineer uses identical shades.",
          "codeExample": "// tailwind.config.js\nexport default {\n  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],\n  theme: {\n    extend: {\n      colors: {\n        cortex: {\n          cream: '#FDFBF7',\n          ink: '#1C1C1C',\n          accent: '#FF8C42'\n        }\n      },\n      fontFamily: {\n        serif: ['Georgia', 'serif'],\n        sans: ['Inter', 'system-ui', 'sans-serif']\n      }\n    }\n  },\n  plugins: []\n};",
          "codeExplanation": "1. content tells Tailwind's static scanner to inspect index.html and all JS/JSX/TS/TSX files inside src/.\n2. theme.extend.colors.cortex registers semantic utilities (bg-cortex-cream, text-cortex-ink, bg-cortex-accent) while preserving all built-in Tailwind colors.\n3. theme.extend.fontFamily adds serif and sans stacks with safe native fallbacks.\n\nHow to Run & Expected Output:\nSave in tailwind.config.js inside a Vite + Tailwind project and apply className=\"bg-cortex-cream text-cortex-ink\" to a container. Running `npm run build` compiles only used classes into dist/assets/*.css.",
          "practiceExercise": "Guided Exercise:\n1. Add a custom boxShadow token `card: '0 8px 30px rgba(0, 0, 0, 0.06)'` inside `theme.extend.boxShadow` and apply `shadow-card` to a div.\n2. Inspect the element in Chrome DevTools Styles pane to confirm the generated CSS variable and shadow rule.\n\nIndependent Challenge:\nTemporarily move `cortex` from `theme.extend.colors` directly into `theme.colors` and observe why `bg-red-500` stops working — then restore it to `theme.extend.colors`.\n\nExpected Result:\nBoth custom `bg-cortex-cream` and built-in `bg-red-500` utilities render properly.",
          "keyTakeaways": [
            "Tailwind’s JIT compiler scans content files statically and generates only used utilities",
            "Always add custom colors and fonts inside theme.extend so built-in defaults remain available",
            "Keep content globs accurate so production builds never purge active component classes"
          ]
        },
        {
          "title": "The Dynamic Class Name Trap & Conditional Styling",
          "duration": "50m",
          "introduction": "Writing `bg-${color}-500` looks clever in JavaScript, yet it silently breaks in production builds because Tailwind does not execute JS during CSS scanning.",
          "objectives": [
            "Explain why string-interpolated Tailwind classes fail to compile",
            "Replace dynamic interpolation with static variant lookup maps",
            "Combine conditional classes cleanly with template arrays or clsx"
          ],
          "notes": "### The #1 Tailwind Production Bug: Dynamic String Interpolation\nTailwind's JIT scanner reads your source files as **plain text**, not executed JavaScript. That means writing:\n```jsx\n// BROKEN IN PRODUCTION!\n<span className={`bg-${color}-500 text-${color}-900`}>Status</span>\n```\nfails completely! The scanner sees `bg-` and `-500`, **never** `bg-green-500` or `bg-red-500`, so those CSS rules are never emitted into your bundle.\n\n### The Safe Pattern: Complete Static Lookup Maps\nAlways write **complete, unbroken class strings** in an object map or ternary expression so the static scanner sees every possible class verbatim:\n```js\nconst VARIANT_STYLES = {\n  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',\n  warning: 'bg-amber-50 text-amber-800 border-amber-200'\n};\n```\n\n### Merging Conditional Classes Cleanly\nWhen combining base classes, variant classes, and optional caller `className` overrides, filter out falsy values cleanly:\n`const cn = (...parts) => parts.filter(Boolean).join(' ');`\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `style={{ backgroundColor: ... }}` for everything because dynamic Tailwind classes failed.\n  - **Solution**: Keep styling in Tailwind via static lookup objects; reserve inline `style` only for truly continuous dynamic values (like a `width: `${percent}%`` progress bar).\n- **Mistake**: Forgetting a fallback key when `level` comes from an API and might be unexpected.\n  - **Solution**: Use `BADGE_VARIANTS[level] ?? BADGE_VARIANTS.beginner`.",
          "codeExample": "const BADGE_VARIANTS = {\n  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',\n  intermediate: 'bg-amber-50 text-amber-800 border-amber-200',\n  advanced: 'bg-rose-50 text-rose-700 border-rose-200'\n};\n\nexport function DifficultyBadge({ level = 'beginner' }) {\n  const classes = BADGE_VARIANTS[level] ?? BADGE_VARIANTS.beginner;\n  return (\n    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>\n      {level}\n    </span>\n  );\n}",
          "codeExplanation": "1. BADGE_VARIANTS maps each difficulty key to a complete, unbroken Tailwind utility string so the JIT scanner compiles every variant.\n2. Nullish coalescing (??) safely falls back to beginner styling if an unknown level string is passed.\n3. All layout, padding, border, and typography classes combine cleanly in JSX.\n\nHow to Run & Expected Output:\nRender <DifficultyBadge level=\"intermediate\" /> and <DifficultyBadge level=\"advanced\" /> inside a React + Tailwind app. Each badge renders with distinct amber or rose pill styling even after `npm run build`.",
          "practiceExercise": "Guided Exercise:\n1. Refactor a broken `className={`p-${size} text-${color}-600`}` component into a static `SIZE_MAP` and `COLOR_MAP`.\n2. Write a small `cn(...classes)` helper and test passing `isActive && 'ring-2 ring-orange-500'`.\n\nIndependent Challenge:\nBuild a `<ProgressBar percent={68} />` component combining static Tailwind classes for the track/bar with `style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}` for the continuous percentage width.\n\nExpected Result:\nAll static variants survive `npm run build` and continuous progress width updates smoothly from 0% to 100%.",
          "keyTakeaways": [
            "Never interpolate partial Tailwind class names like bg-${color}-500",
            "Always write complete, unbroken class strings inside lookup objects or ternaries",
            "Use a lightweight cn(...classes) or clsx helper for clean conditional class merging"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does className={`bg-${themeColor}-500`} often fail to apply any background color in Tailwind?",
          "options": [
            "Tailwind does not support 500 shades",
            "Tailwind scans source files statically as plain text and only generates complete class names it sees verbatim",
            "JSX forbids template literals in className",
            "bg- classes only work on <body>"
          ],
          "correctAnswer": 1,
          "explanation": "Tailwind’s JIT scanner does not evaluate JavaScript expressions, so dynamically concatenated class strings are never detected or generated."
        },
        {
          "question": "What happens if you define colors inside theme: { colors: { brand: \"#ff8c42\" } } instead of theme.extend?",
          "options": [
            "Nothing — they behave identically",
            "It replaces Tailwind’s entire default color palette, removing classes like bg-gray-100 and text-red-600",
            "It doubles the CSS bundle size",
            "It enables dark mode automatically"
          ],
          "correctAnswer": 1,
          "explanation": "Placing keys directly under theme overrides defaults; theme.extend merges your custom tokens with Tailwind’s built-in palette."
        },
        {
          "question": "How should you implement dynamic button variants (primary, secondary, danger) in Tailwind?",
          "options": [
            "Concatenate strings dynamically: `btn-${variant}`",
            "Map each variant key to a complete static string of Tailwind classes in a lookup object",
            "Use inline style={{}} for everything",
            "Import Bootstrap CSS"
          ],
          "correctAnswer": 1,
          "explanation": "Static lookup objects keep full class names intact so the JIT compiler includes every variant reliably."
        },
        {
          "question": "What is the purpose of the content array in tailwind.config.js?",
          "options": [
            "To list API endpoints",
            "To tell Tailwind which HTML/JS/JSX files to scan for used utility classes",
            "To store database schemas",
            "To define responsive breakpoints"
          ],
          "correctAnswer": 1,
          "explanation": "Tailwind scans all paths matched by content globs to discover which utility classes need to be compiled."
        }
      ]
    },
    {
      "title": "Module 2: Mobile-First Responsive Grids & Spacing",
      "duration": "1h 45m",
      "objectives": [
        "Use mobile-first breakpoint prefixes (sm:, md:, lg:, xl:) accurately",
        "Build responsive multi-column grids and equal-height flex cards",
        "Apply readable typography scales, max-w-prose, and line-clamp truncation"
      ],
      "notes": "### Module Introduction\nTailwind uses **mobile-first breakpoints**: unprefixed classes like `grid-cols-1` apply everywhere (starting at 0px), while `md:grid-cols-2` and `lg:grid-cols-3` activate *at or above* those widths.\n\n### Prerequisites\n- Completion of Module 1.\n\n### How the Lessons Connect\n- **Lesson 1** masters responsive grid/flex utilities and equal-height card alignment.\n- **Lesson 2** teaches readable typography scale, `max-w-prose`, and clean text truncation (`truncate`, `line-clamp-2`).\n\n### Module Summary\nYou will build responsive course grids and typography hierarchies that look balanced on phones, tablets, and desktops.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Responsive 3-Column Course Grid assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a responsive Course Catalog Grid in Tailwind CSS that renders 1 column on mobile, 2 columns on tablets (md), and 3 columns on desktop (lg), with aligned card footers and 2-line clamped descriptions.\n\nObjectives:\n- Apply mobile-first grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cleanly.\n- Align card bottom metadata regardless of description length using flex-col + flex-1.\n\nRequirements:\n1. Container uses max-w-7xl mx-auto px-4 sm:px-6 lg:px-8.\n2. Grid uses grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.\n3. Each card uses flex flex-col bg-white border rounded-2xl p-6.\n4. Description uses text-sm text-neutral-600 leading-relaxed line-clamp-2 flex-1.\n5. Footer row sits cleanly at the bottom with mt-4 pt-4 border-t flex items-center justify-between.\n\nStep-by-Step Instructions:\n1. Render 6 sample course cards with varying title and description lengths.\n2. Test at 375px, 768px, and 1280px widths in DevTools.\n3. Verify card footers align horizontally across every row.\n\nDeliverables:\n- ResponsiveCourseGrid.jsx.\n\nEvaluation Criteria:\n- Unprefixed mobile styles first, enhanced upward with md: and lg:.\n- line-clamp-2 prevents tall descriptions from breaking row rhythm.",
      "lessons": [
        {
          "title": "Breakpoint Prefixes & Responsive Grids",
          "duration": "55m",
          "introduction": "A common beginner mistake in Tailwind is writing sm:text-center expecting it to target small mobile phones — when sm: actually means >= 640px!",
          "objectives": [
            "Memorize Tailwind’s mobile-first breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)",
            "Avoid redundant prefixes like grid-cols-1 sm:grid-cols-1 md:grid-cols-2",
            "Build equal-height responsive card grids with flex-col + flex-1"
          ],
          "notes": "### Mobile-First Breakpoints Explained\nEvery unprefixed utility in Tailwind applies from **`0px` upward** (mobile phones first). Prefixing a utility activates it at a `min-width` media query:\n- **Unprefixed**: `0px+` (all screens, starting at mobile)\n- **`sm:`**: `640px+` (large phones / landscape)\n- **`md:`**: `768px+` (tablets)\n- **`lg:`**: `1024px+` (laptops / desktops)\n- **`xl:`**: `1280px+` (large monitors)\n\n### Equal-Height Cards in Responsive Grids\nWhen cards sit side-by-side in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`, one card may have a 1-line description while its neighbor has 3 lines. Putting `flex flex-col` on each `<article>` card and `flex-1` on the description pushes every card's bottom metadata/button row to align cleanly along the bottom edge!\n\n### Common Mistakes & Solutions\n- **Mistake**: Writing `sm:grid-cols-1 md:grid-cols-2` thinking `sm:` means \"small phone\".\n  - **Solution**: `grid-cols-1` (unprefixed) targets small phones; `sm:` targets `640px+`. Never add redundant `sm:` rules that match your base mobile rule.\n- **Mistake**: Hardcoding `w-[400px]` inside a responsive grid, causing horizontal overflow on 375px phones.\n  - **Solution**: Let Grid tracks size cards automatically with `w-full`.",
          "codeExample": "<section className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\">\n  <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">\n    <article className=\"flex flex-col bg-white border border-stone-200 rounded-2xl p-6\">\n      <h3 className=\"text-xl font-bold text-stone-900 mb-2\">React Engineering</h3>\n      <p className=\"text-sm text-stone-600 leading-relaxed flex-1\">\n        Master hooks, routing, and performance patterns.\n      </p>\n      <div className=\"mt-4 pt-4 border-t border-stone-100 flex justify-between text-xs font-semibold\">\n        <span>Intermediate</span>\n        <span>16h 00m</span>\n      </div>\n    </article>\n  </div>\n</section>",
          "codeExplanation": "1. max-w-7xl mx-auto centers the section while px-4 sm:px-6 lg:px-8 scales horizontal gutter padding upward cleanly.\n2. grid-cols-1 md:grid-cols-2 lg:grid-cols-3 stacks 1 column on phones, 2 on tablets, and 3 on desktops.\n3. flex flex-col on <article> paired with flex-1 on <p> forces the bottom footer row to align at the bottom of every card.\n\nHow to Run & Expected Output:\nRender 3+ cards inside this section and resize Chrome DevTools from 375px -> 768px -> 1280px. Columns snap cleanly at 1 -> 2 -> 3 with aligned footers.",
          "practiceExercise": "Guided Exercise:\n1. Build a responsive 2-column hero section using `flex flex-col lg:flex-row items-center gap-10`.\n2. Add a 4-card stats row switching from `grid-cols-2` on mobile to `grid-cols-4` on `md:`.\n\nIndependent Challenge:\nGive one card a 4-line description and another card a 1-line description, and verify their bottom borders still align across the row.\n\nExpected Result:\nZero horizontal overflow at 375px and perfectly aligned card footers across all breakpoints.",
          "keyTakeaways": [
            "Tailwind breakpoints are mobile-first min-width queries (unprefixed = mobile, sm = 640px+)",
            "Use flex flex-col on grid cards with flex-1 on the description to align card footers",
            "Center page sections cleanly with max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ]
        },
        {
          "title": "Typography Scale, Measure & Truncation",
          "duration": "50m",
          "introduction": "Good UI design is 80% typography and spacing. Tailwind gives you harmonious font-size + line-height pairs and built-in multi-line truncation.",
          "objectives": [
            "Pair font sizes with appropriate leading-* and tracking-* utilities",
            "Constrain readable article widths with max-w-prose",
            "Truncate overflowing titles/descriptions cleanly with truncate and line-clamp-*"
          ],
          "notes": "### Readable Typography & Measure (`max-w-prose`)\nLong lines spanning 1,200px across a desktop monitor strain the reader's eyes when jumping to the next line. Tailwind's **`max-w-prose`** utility sets `max-width: 65ch` (~65 characters wide), keeping articles and lesson notes effortless to scan.\n\n### Clean Text Truncation: `truncate` vs. `line-clamp-*`\n- **`truncate`**: Caps text to **one single line** with `...` (`overflow-hidden text-ellipsis whitespace-nowrap`).\n- **`line-clamp-2` / `line-clamp-3`**: Caps multi-line paragraphs to 2 or 3 lines cleanly (built into Tailwind v3.3+ without plugins).\n- **Flexbox Gotcha**: Inside a flex row (`flex items-center justify-between`), `truncate` will **fail** unless the text element (or its flex parent) has **`min-w-0`**, because flex items default to `min-width: auto`.\n\n### Numeric Alignment with `tabular-nums`\nIn dashboards, timers, and progress counters, proportional digits (`1` vs `8`) have different widths, causing numbers to jitter left and right when updating. Adding `tabular-nums` gives every digit equal width!\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `text-xs` (`12px`) for main body paragraphs.\n  - **Solution**: Keep body copy at `text-base` (`16px`) with `leading-relaxed` (`1.625`), reserving `text-xs` strictly for short badges or timestamps.",
          "codeExample": "<div className=\"max-w-prose space-y-3\">\n  <h2 className=\"text-2xl sm:text-3xl font-bold tracking-tight text-stone-900\">\n    Building Accessible Design Systems\n  </h2>\n  <p className=\"text-base text-stone-600 leading-relaxed line-clamp-2\">\n    Learn how consistent spacing scales, clear typographic hierarchy, and semantic tokens keep complex web applications effortless to scan.\n  </p>\n  <span className=\"inline-block font-mono text-sm tabular-nums text-stone-700\">\n    Progress: 87.5%\n  </span>\n</div>",
          "codeExplanation": "1. max-w-prose constrains reading width to ~65 characters.\n2. tracking-tight tightens large heading letter spacing for crisp editorial polish.\n3. line-clamp-2 prevents long descriptions from inflating card height.\n4. tabular-nums aligns numeric progress readouts cleanly.\n\nHow to Run & Expected Output:\nRender in a Tailwind page. The heading wraps comfortably, the paragraph truncates cleanly at 2 lines with \"...\", and digits align uniformly.",
          "practiceExercise": "Guided Exercise:\n1. Create a flex row containing a 40px avatar and a very long email address with `truncate`. Observe it overflowing until you add `min-w-0` to the email span.\n\nIndependent Challenge:\nBuild a 3-row pricing/stats list using `tabular-nums` so right-aligned prices ($9.00, $19.00, $149.00) align digit-for-digit.\n\nExpected Result:\nLong emails truncate cleanly inside flex rows without pushing past container edges.",
          "keyTakeaways": [
            "Use max-w-prose to keep long-form reading paragraphs around 65 characters wide",
            "Use line-clamp-2 / line-clamp-3 for consistent card previews without custom CSS",
            "Add min-w-0 on flex children when using truncate so ellipsis works properly"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which screen widths are targeted by the Tailwind class sm:grid-cols-2?",
          "options": [
            "Only screens smaller than 640px",
            "Screens 640px wide and larger (min-width: 640px)",
            "Only mobile phones under 400px",
            "Screens between 320px and 480px"
          ],
          "correctAnswer": 1,
          "explanation": "Tailwind is mobile-first: sm: applies at min-width: 640px and above, while unprefixed classes apply from 0px up."
        },
        {
          "question": "What utility class caps a paragraph at 2 lines with an ellipsis (...) in Tailwind v3.3+?",
          "options": [
            "truncate-2",
            "line-clamp-2",
            "text-ellipsis-2",
            "max-lines-2"
          ],
          "correctAnswer": 1,
          "explanation": "line-clamp-2 applies WebKit line clamping cleanly in two lines."
        },
        {
          "question": "If truncate is applied inside a flex child and the text still overflows its parent, which class is usually missing on the flex child?",
          "options": [
            "flex-wrap",
            "min-w-0",
            "z-10",
            "block"
          ],
          "correctAnswer": 1,
          "explanation": "Flex items default to min-width: auto, preventing shrinking below content width unless min-w-0 is set."
        },
        {
          "question": "What does max-w-prose set?",
          "options": [
            "max-width: 100%",
            "max-width: 65ch for comfortable reading line length",
            "font-size: 18px",
            "padding: 2rem"
          ],
          "correctAnswer": 1,
          "explanation": "max-w-prose sets max-width: 65ch, the ideal character measure for body copy."
        }
      ]
    },
    {
      "title": "Module 3: Interactive States, Forms & Accessibility",
      "duration": "1h 30m",
      "objectives": [
        "Style hover, active, disabled, group-hover, and focus-visible states cleanly",
        "Build accessible form inputs with clear contrast and keyboard focus rings",
        "Construct centered, scrollable modals with backdrop blur and high z-index"
      ],
      "notes": "### Module Introduction\nA UI only feels finished when buttons respond to hover/press, keyboard users see crisp focus rings, and modals center smoothly without clipping on small screens.\n\n### Prerequisites\n- Completion of Modules 1 & 2.\n\n### How the Lessons Connect\n- **Lesson 1** covers state variants (`hover:`, `focus-visible:`, `disabled:`, `group-hover:`).\n- **Lesson 2** builds accessible centered modals with `fixed inset-0`, `backdrop-blur-sm`, and `max-h-[90vh] overflow-y-auto`.\n\n### Module Summary\nYou will craft tactile, keyboard-accessible interactive controls and responsive modals.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Accessible Confirm Modal & Interactive Card assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an accessible Delete Confirmation Modal + Interactive Course Card using Tailwind state variants, group-hover micro-interactions, and keyboard focus rings.\n\nObjectives:\n- Use group and group-hover: to animate a card arrow icon when hovering anywhere on the card.\n- Build a modal overlay that centers cleanly and scrolls internally on short mobile screens.\n\nRequirements:\n1. Interactive card has className=\"group ...\" and an arrow icon with group-hover:translate-x-1 transition-transform.\n2. Primary action button styles hover:, active:scale-[0.98], disabled:opacity-50 disabled:cursor-not-allowed, and focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2.\n3. Modal uses fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4.\n4. Modal dialog panel uses max-w-md w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6.\n\nStep-by-Step Instructions:\n1. Build the card and modal in a React or HTML file.\n2. Test keyboard Tab navigation to verify focus-visible rings appear cleanly.\n3. Resize browser height to 450px to verify max-h-[90vh] overflow-y-auto keeps the modal buttons reachable!\n\nDeliverables:\n- ModalAndCard.jsx.\n\nEvaluation Criteria:\n- Uses focus-visible:ring-* instead of removing focus outlines.\n- Modal remains scrollable on short viewports.",
      "lessons": [
        {
          "title": "Hover, Group-Hover & Focus-Visible Rings",
          "duration": "45m",
          "introduction": "Never write outline-none without adding a visible focus-visible:ring-* replacement — otherwise keyboard-only users lose all visibility of where they are on the page.",
          "objectives": [
            "Use focus-visible:ring-2 instead of focus:outline-none alone",
            "Coordinate parent-to-child hover animations with group and group-hover:",
            "Style disabled button states clearly with disabled:opacity-50"
          ],
          "notes": "### Accessible Focus Rings: `focus:` vs. `focus-visible:`\nRemoving browser focus outlines with `outline-none` without providing a replacement violates WCAG accessibility and leaves keyboard-only users completely blind to which button is selected!\n- **`focus:ring-2`**: Shows a ring even when clicked with a mouse.\n- **`focus-visible:ring-2`**: Shows a crisp ring **strictly during keyboard Tab navigation**, keeping mouse clicks visually clean while staying 100% keyboard accessible!\n\n### Coordinated Hover with `group` and `group-hover:`\nWhen hovering a card or button that contains an icon + label, you often want the icon to animate when the user hovers *anywhere* on the card. Add `group` to the parent and `group-hover:translate-x-1` (or `group-hover:text-orange-500`) to the child!\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `disabled:opacity-50` while forgetting `disabled:pointer-events-none`, allowing hover styles to still trigger on disabled buttons.\n  - **Solution**: Pair `disabled:opacity-50 disabled:pointer-events-none` (or `disabled:cursor-not-allowed`).\n- **Mistake**: Using `transition-all` everywhere.\n  - **Solution**: Prefer `transition-colors` or `transition-transform` so unrelated layout properties never animate accidentally.",
          "codeExample": "<button\n  type=\"button\"\n  className=\"group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-orange-500 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none\"\n>\n  <span>Continue Learning</span>\n  <span className=\"transition-transform group-hover:translate-x-1\">-&gt;</span>\n</button>",
          "codeExplanation": "1. group on the <button> enables group-hover:translate-x-1 on the arrow span whenever any part of the button is hovered.\n2. active:scale-[0.98] gives tactile press feedback on click/tap.\n3. focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 renders a clear keyboard focus ring without cluttering mouse clicks.\n\nHow to Run & Expected Output:\nRender the button in a browser. Hovering slides the arrow right; pressing Tab highlights the button with an offset orange ring; clicking with a mouse gives subtle press scale without leaving a stuck ring.",
          "practiceExercise": "Guided Exercise:\n1. Test Tabbing onto the button vs clicking it with a mouse to observe `focus-visible` behavior.\n2. Add `disabled` to the button and verify `disabled:opacity-50 disabled:pointer-events-none` prevents hover effects.\n\nIndependent Challenge:\nUse Tailwind's `peer` and `peer-checked:` utilities on a visually hidden radio input + `<label>` to style a selectable pricing tier card without JavaScript.\n\nExpected Result:\nFull keyboard focus visibility and coordinated hover micro-interactions.",
          "keyTakeaways": [
            "Use focus-visible:ring-* instead of bare outline-none for keyboard accessibility",
            "Use group on a parent and group-hover:* on children for coordinated hover effects",
            "Combine disabled:opacity-50 and disabled:pointer-events-none for clear disabled buttons"
          ]
        },
        {
          "title": "Building Clean Modals & Backdrop Overlays",
          "duration": "45m",
          "introduction": "A modal that looks great on a 1080p monitor often clips its Save button off-screen on a 667px phone unless you constrain max-h-[90vh] and overflow-y-auto.",
          "objectives": [
            "Center modal dialogs cleanly with fixed inset-0 flex items-center justify-center p-4",
            "Add subtle backdrop dimming and blur with bg-black/50 backdrop-blur-sm",
            "Prevent modal clipping on short screens with max-h-[90vh] overflow-y-auto"
          ],
          "notes": "### Designing Bulletproof Responsive Modals\nModals look deceptively simple on a 1440x900 desktop monitor, then break badly on a 375x667 phone or short landscape laptop screen where the bottom \"Confirm\" button gets clipped off-screen!\nFollow this 4-part Tailwind modal architecture:\n1. **Backdrop**: `fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4` (`p-4` keeps the modal off phone screen edges).\n2. **Scroll-Safe Panel**: `w-full max-w-md max-h-[90vh] overflow-y-auto` guarantees tall content scrolls *inside* the modal instead of clipping!\n3. **ARIA Semantics**: Add `role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\"`.\n4. **Backdrop & Escape Close**: Close when `e.target === e.currentTarget` or on `Escape` keydown.\n\n### Common Mistakes & Solutions\n- **Mistake**: Forgetting `max-h-[90vh] overflow-y-auto` on modals with forms.\n  - **Solution**: Always cap modal height at `90vh` with `overflow-y-auto`.",
          "codeExample": "<div\n  role=\"dialog\"\n  aria-modal=\"true\"\n  aria-labelledby=\"modal-title\"\n  className=\"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4\"\n>\n  <div className=\"w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-stone-200 shadow-2xl p-6\">\n    <h2 id=\"modal-title\" className=\"text-xl font-bold text-stone-900 mb-2\">\n      Confirm Enrollment\n    </h2>\n    <p className=\"text-sm text-stone-600 mb-6\">\n      You will gain immediate access to all modules and quizzes.\n    </p>\n    <div className=\"flex justify-end gap-3\">\n      <button className=\"px-4 py-2 rounded-lg border border-stone-200 text-sm font-medium\">Cancel</button>\n      <button className=\"px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold\">Enroll</button>\n    </div>\n  </div>\n</div>",
          "codeExplanation": "1. fixed inset-0 z-50 covers the entire viewport above sticky headers.\n2. bg-black/50 backdrop-blur-sm dims and blurs underlying content subtly.\n3. max-h-[90vh] overflow-y-auto ensures action buttons remain reachable on short mobile screens.\n\nHow to Run & Expected Output:\nRender the modal over a page and resize Chrome DevTools height to 400px. The modal stays centered with 16px outer padding and scrolls smoothly inside without clipping.",
          "practiceExercise": "Guided Exercise:\n1. Add 8 paragraphs inside the modal body and test scrolling at 375x450 viewport dimensions.\n\nIndependent Challenge:\nWire React `onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}` on the backdrop overlay and a `useEffect` `keydown` Escape listener.\n\nExpected Result:\nClicking outside the white dialog or pressing Escape closes the modal; clicking inside the dialog keeps it open.",
          "keyTakeaways": [
            "Use fixed inset-0 z-50 flex items-center justify-center p-4 for responsive centered modals",
            "Add max-h-[90vh] overflow-y-auto on the dialog panel so content never clips on short screens",
            "Include role=\"dialog\" and aria-modal=\"true\" for screen reader accessibility"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is focus-visible:ring-2 preferred over focus:ring-2 for buttons?",
          "options": [
            "focus:ring-2 is deprecated in Tailwind v3",
            "focus-visible shows the ring for keyboard Tab users while avoiding distracting focus rings on mouse clicks",
            "focus-visible disables hover states",
            "focus-visible only works in Firefox"
          ],
          "correctAnswer": 1,
          "explanation": "focus-visible matches :focus-visible, giving keyboard users clear visual focus while keeping mouse interactions clean."
        },
        {
          "question": "How do you animate a child icon when the user hovers anywhere on its parent card in Tailwind?",
          "options": [
            "Put parent-hover on the child",
            "Add group to the parent card and group-hover:translate-x-1 to the child icon",
            "Use hover: on the body tag",
            "Use inline JavaScript"
          ],
          "correctAnswer": 1,
          "explanation": "Tailwind’s group marker on an ancestor enables group-hover:* utilities on any descendant."
        },
        {
          "question": "Why add max-h-[90vh] overflow-y-auto to a centered modal panel?",
          "options": [
            "To make the modal full screen",
            "To ensure tall modal content scrolls internally instead of clipping off-screen on short viewports",
            "To blur the background",
            "To increase z-index"
          ],
          "correctAnswer": 1,
          "explanation": "Constraining max height to 90vh with overflow-y-auto keeps action buttons reachable on small mobile or landscape screens."
        },
        {
          "question": "What does bg-black/50 mean in Tailwind v3?",
          "options": [
            "Black background with 50px padding",
            "Black background with 50% opacity (rgba(0,0,0,0.5))",
            "50% darker gray",
            "50% width"
          ],
          "correctAnswer": 1,
          "explanation": "The slash opacity modifier (/50) sets the alpha channel of the color utility cleanly."
        }
      ]
    },
    {
      "title": "Module 4: Sticky Navigation, Mobile Bars & Overflow Prevention",
      "duration": "1h 30m",
      "objectives": [
        "Build responsive desktop top navbars paired with mobile bottom/drawer navigation",
        "Prevent horizontal page overflow caused by wide <pre> code blocks and tables",
        "Use sticky sidebars safely with self-start and overflow-x-clip"
      ],
      "notes": "### Module Introduction\nNothing breaks a mobile site's polish faster than a 10px horizontal wiggle caused by a wide code block or table — or a sticky sidebar that mysteriously refuses to stick.\n\n### Prerequisites\n- Completion of Modules 1–3.\n\n### How the Lessons Connect\n- **Lesson 1** designs responsive desktop + mobile navigation patterns.\n- **Lesson 2** fixes sticky sidebar traps (`self-start`, `overflow-x-clip`) and wide `<pre>`/`<table>` overflow inside Flex/Grid layouts.\n\n### Module Summary\nYou will eliminate horizontal scroll bugs on 375px mobile viewports and build reliable sticky navigation layouts.\n\n### Completion Criteria\n- Complete both lessons and mobile-width audits.\n- Deliver the Overflow-Proof Lesson Reader Layout assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nA Lesson Viewer layout with a sticky sidebar and a wide <pre> code block has two bugs: (1) on desktop, the sidebar stretches full height so sticky doesn't move; (2) on 375px mobile, the wide <pre> block forces the entire page to scroll horizontally. Fix both!\n\nObjectives:\n- Fix sticky Grid/Flex sidebars using lg:sticky lg:top-24 lg:self-start.\n- Contain wide <pre> and <table> blocks cleanly with min-w-0 and overflow-x-auto.\n\nRequirements:\n1. Outer layout: grid grid-cols-1 lg:grid-cols-12 gap-8.\n2. Sidebar: lg:col-span-4 lg:sticky lg:top-24 lg:self-start.\n3. Main content column: lg:col-span-8 min-w-0.\n4. Code container: w-full max-w-full overflow-x-auto rounded-xl bg-stone-900 p-4.\n5. Page wrapper uses overflow-x-clip (NEVER overflow-x-hidden if sticky is inside!).\n\nStep-by-Step Instructions:\n1. Reproduce the wide-code-block bug with a 120-character unbroken line inside <pre>.\n2. Add min-w-0 to the main column and overflow-x-auto to <pre>.\n3. Test at 375px mobile and 1280px desktop in DevTools.\n\nDeliverables:\n- LessonLayout.jsx.\n\nEvaluation Criteria:\n- Zero horizontal page scroll at 375px (document.documentElement.scrollWidth <= window.innerWidth).\n- Sticky sidebar scrolls smoothly on desktop.",
      "lessons": [
        {
          "title": "Desktop Top Nav + Mobile Bottom App Bar",
          "duration": "45m",
          "introduction": "Squeezing 6 desktop nav links into a 375px phone header creates cramped wrapping. Clean responsive visibility utilities (hidden md:flex) solve this.",
          "objectives": [
            "Hide/show navigation variants cleanly with hidden md:flex and md:hidden",
            "Add pb-20 md:pb-0 on main content when using a fixed mobile bottom bar",
            "Use backdrop-blur-md for modern translucent sticky headers"
          ],
          "notes": "### Responsive Navigation Architecture\nDesktop headers comfortably fit 5–6 links horizontally, whereas a 375px mobile header quickly crowds or wraps awkwardly. Tailwind's display utilities (`hidden md:flex` and `md:hidden`) let you render a clean desktop navbar alongside a mobile hamburger drawer or thumb-friendly bottom app bar.\n\n### Preventing Fixed-Bar Overlap\nWhenever you add a fixed mobile bottom bar (`fixed bottom-0 inset-x-0 h-16 md:hidden`), remember to add matching bottom padding to your page wrapper (`pb-20 md:pb-0`), otherwise the bottom bar permanently covers the footer and bottom action buttons!\n\n### Common Mistakes & Solutions\n- **Mistake**: Using opaque `bg-white` on sticky headers so scrolling content pops harshly at the edge.\n  - **Solution**: Use `bg-[#FDFBF7]/90 backdrop-blur-md` for a refined translucent sticky header.",
          "codeExample": "<header className=\"sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200\">\n  <div className=\"max-w-7xl mx-auto px-4 h-16 flex items-center justify-between\">\n    <a href=\"/\" className=\"font-serif text-xl font-bold\">Cortex</a>\n    <nav className=\"hidden md:flex items-center gap-6 text-sm font-medium\">\n      <a href=\"/courses\" className=\"hover:text-orange-500\">Courses</a>\n      <a href=\"/dashboard\" className=\"hover:text-orange-500\">Dashboard</a>\n    </nav>\n    <button className=\"md:hidden px-3 py-1.5 rounded-lg border text-sm\">Menu</button>\n  </div>\n</header>",
          "codeExplanation": "1. sticky top-0 z-40 keeps the header pinned at the top while scrolling.\n2. hidden md:flex hides desktop nav links on mobile phones and reveals them at 768px+.\n3. md:hidden displays the mobile Menu button only below 768px.\n\nHow to Run & Expected Output:\nResize viewport across 768px: below 768px only logo + Menu button show; at 768px+ horizontal nav links appear cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Add a fixed mobile bottom navigation bar (`md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t`) with 4 links.\n2. Add `pb-20 md:pb-0` to `<main>` and verify you can scroll to the very bottom of the footer on mobile.\n\nIndependent Challenge:\nAdd `aria-expanded={menuOpen}` and `aria-label=\"Toggle navigation menu\"` to the mobile Menu button.\n\nExpected Result:\nClean navigation across mobile and desktop with zero covered footer content.",
          "keyTakeaways": [
            "Use hidden md:flex and md:hidden to swap between desktop links and mobile menus cleanly",
            "Remember to add bottom padding (pb-20 md:pb-0) when using a fixed mobile bottom bar",
            "Pair sticky headers with bg-*/90 and backdrop-blur-md for crisp readability"
          ]
        },
        {
          "title": "Fixing Sticky Sidebars & Code Block Overflow",
          "duration": "45m",
          "introduction": "Why do Grid and Flex columns suddenly blow past 100% viewport width when they hold a <pre> code block? Because Grid/Flex tracks default to min-width: auto!",
          "objectives": [
            "Prevent Grid/Flex track blowout using min-w-0",
            "Fix sticky sidebars in Grid/Flex containers with self-start",
            "Use overflow-x-clip instead of overflow-x-hidden around sticky elements"
          ],
          "notes": "### Why Sticky Sidebars Break & Code Blocks Overflow\nTwo of the most frustrating CSS bugs happen inside Flexbox and CSS Grid layouts:\n1. **Grid/Flex Horizontal Blowout**: By default, Grid and Flex items have `min-width: auto`, meaning a single long unbroken URL inside a `<pre>` code block forces the entire `lg:col-span-8` column wider than the 375px phone screen!\n   - **Fix**: Add **`min-w-0`** to the Grid/Flex column and **`overflow-x-auto`** to the `<pre>` wrapper!\n2. **Broken `position: sticky`**: Grid/Flex items stretch to match their tallest sibling by default (`align-items: stretch`), leaving a sticky sidebar zero vertical room to slide. Also, `overflow-x-hidden` on an ancestor breaks sticky!\n   - **Fix**: Add **`lg:self-start`** to the sticky sidebar and use **`overflow-x-clip`** on any outer wrapper.\n\n### Common Mistakes & Solutions\n- **Mistake**: Putting `overflow-hidden` on `<body>` or `<main>` to hide a rogue scrollbar, unknowingly breaking every `sticky` sidebar and header inside it.\n  - **Solution**: Always fix the overflowing child with `min-w-0` + `overflow-x-auto`, and use `overflow-x-clip` if needed.",
          "codeExample": "<div className=\"max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-x-clip\">\n  <aside className=\"lg:col-span-4 lg:sticky lg:top-24 lg:self-start bg-white border rounded-2xl p-5\">\n    <h3 className=\"font-bold mb-2\">Syllabus</h3>\n    <p className=\"text-sm text-stone-600\">Stays pinned while scrolling!</p>\n  </aside>\n\n  <main className=\"lg:col-span-8 min-w-0 space-y-6\">\n    <div className=\"w-full max-w-full overflow-x-auto rounded-xl bg-stone-900 p-4 text-stone-100 font-mono text-sm\">\n      <pre>const veryLongUnbrokenLine = \"https://api.example.com/v1/courses/65f000000000000000000001/modules/lessons\";</pre>\n    </div>\n  </main>\n</div>",
          "codeExplanation": "1. overflow-x-clip clips stray visual overflow without disabling sticky positioning inside.\n2. lg:self-start shrinks the aside height to its own content so lg:sticky lg:top-24 slides smoothly alongside tall main content.\n3. min-w-0 on <main> lets the code block scroll internally via overflow-x-auto instead of stretching the mobile page.\n\nHow to Run & Expected Output:\nOpen at 375px mobile width in DevTools: the long URL scrolls horizontally *inside* the dark code box while `document.documentElement.scrollWidth === window.innerWidth`. At 1280px, the sidebar sticks smoothly on scroll.",
          "practiceExercise": "Guided Exercise:\n1. Temporarily delete `min-w-0` from `<main>` at 375px width and watch the entire page gain a horizontal scrollbar — then restore `min-w-0`.\n2. Temporarily delete `lg:self-start` at 1280px and watch the sidebar stop sticking — then restore it.\n\nIndependent Challenge:\nWrap a wide 6-column HTML `<table>` in `<div className=\"w-full overflow-x-auto\">` inside `<main className=\"min-w-0\">` and verify mobile table scrolling.\n\nExpected Result:\nZero page-level horizontal overflow on mobile and reliable sticky sidebar on desktop.",
          "keyTakeaways": [
            "Add min-w-0 to Flex/Grid children containing <pre> code blocks or wide tables",
            "Add self-start to sticky sidebars inside Flex/Grid layouts so they don’t stretch full height",
            "Prefer overflow-x-clip over overflow-x-hidden on wrappers containing sticky elements"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why does a sticky sidebar inside a CSS Grid row often fail to stick as you scroll?",
          "options": [
            "CSS Grid forbids position: sticky",
            "Grid items stretch to match the tallest column by default, leaving no room to slide unless self-start is added",
            "top-24 is invalid in Tailwind",
            "Sidebars must use fixed instead of sticky"
          ],
          "correctAnswer": 1,
          "explanation": "Adding self-start shrinks the sidebar to its content height so it can stick within the taller grid track."
        },
        {
          "question": "Which utility fixes a Flex or Grid column from expanding wider than the mobile screen when it contains a wide <pre> code block?",
          "options": [
            "max-w-none",
            "min-w-0",
            "flex-1",
            "overflow-visible"
          ],
          "correctAnswer": 1,
          "explanation": "min-w-0 overrides default min-width: auto on Flex/Grid items so inner overflow-x-auto containers scroll instead of blowing out the page."
        },
        {
          "question": "Why should you use overflow-x-clip instead of overflow-x-hidden on a page wrapper that contains sticky elements?",
          "options": [
            "overflow-x-hidden disables Flexbox",
            "overflow-x-hidden creates a scroll container that breaks position: sticky, whereas overflow-x-clip does not",
            "overflow-x-clip adds a scrollbar",
            "They are identical"
          ],
          "correctAnswer": 1,
          "explanation": "overflow-x-clip clips horizontal overflow visually without breaking sticky positioning."
        },
        {
          "question": "When adding a fixed mobile bottom navigation bar (h-16), what should you add to <main>?",
          "options": [
            "mt-16",
            "pb-20 md:pb-0 so bottom page content isn’t hidden behind the mobile bar",
            "z-50",
            "hidden"
          ],
          "correctAnswer": 1,
          "explanation": "Bottom padding on mobile ensures users can scroll the footer and bottom buttons completely above the fixed bar."
        }
      ]
    },
    {
      "title": "Module 5: Component Extraction, clsx Patterns & Skeletons",
      "duration": "1h 30m",
      "objectives": [
        "Keep Tailwind JSX clean by extracting reusable React/UI components instead of overusing @apply",
        "Build smooth loading skeletons with animate-pulse and designed empty states"
      ],
      "notes": "### Module Introduction\nAs projects grow, repeating 15-class button strings in 30 files becomes noisy. Tailwind's philosophy is **extract UI components** (e.g., `<Button variant=\"primary\" />`), rather than recreating giant custom CSS files with `@apply`.\n\n### Prerequisites\n- Completion of Modules 1–4.\n\n### How the Lessons Connect\n- **Lesson 1** explains Component Extraction vs `@apply` tradeoffs and clean variant APIs.\n- **Lesson 2** designs calm `animate-pulse` loading skeletons and helpful empty states.\n\n### Module Summary\nYou will keep Tailwind templates clean, DRY, and resilient across loading and empty data states.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Button Design System & Skeleton Card Loader assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nA project has duplicated 14-class button strings across 20 files and shows a jarring blank screen while courses load. Extract a clean <Button /> component and build a matching <CourseCardSkeleton /> loader.\n\nObjectives:\n- Extract reusable React components with static variant/size maps instead of @apply.\n- Match skeleton dimensions to real cards to prevent Cumulative Layout Shift (CLS).\n\nRequirements:\n1. Build Button.jsx supporting variant ('primary' | 'secondary' | 'ghost') and size ('sm' | 'md' | 'lg').\n2. Build CourseCardSkeleton.jsx using animate-pulse and neutral-200 placeholders matching CourseCard height/padding.\n3. Build an EmptyState.jsx component with icon slot, title, description, and optional reset/CTA button.\n\nStep-by-Step Instructions:\n1. Define static VARIANTS and SIZES maps in Button.jsx.\n2. Render 3 CourseCardSkeleton items inside the same 3-column responsive grid while loading.\n\nDeliverables:\n- Button.jsx, CourseCardSkeleton.jsx, and EmptyState.jsx.\n\nEvaluation Criteria:\n- Zero @apply abuse; clean React component composition.\n- Skeleton matches real card geometry to minimize layout jump.",
      "lessons": [
        {
          "title": "Keeping Tailwind Clean via Component Extraction",
          "duration": "45m",
          "introduction": "Newcomers often try to clean up long Tailwind class strings with @apply in CSS files — accidentally recreating the exact CSS maintenance problems Tailwind solved.",
          "objectives": [
            "Prefer extracting React/UI components over overusing @apply",
            "Combine base classes, variant maps, and consumer className overrides cleanly"
          ],
          "notes": "### Component Extraction Over `@apply`\nWhen you notice yourself repeating the same 12 Tailwind classes on buttons across 15 pages, resist the urge to dump `@apply` into `index.css`.\n- **`@apply`** recreates custom CSS maintenance headaches and duplicates utility rules in your compiled CSS.\n- **Extracting a React/UI Component (`<Button variant=\"primary\" />`)** gives you **one** source of truth, prop autocomplete, static JIT safety, and zero duplicate CSS!\nReserve `@apply` strictly for styling raw HTML you don't control (like CMS/Markdown prose).\n\n### Forwarding Props & Custom `className`\nAlways spread `...props` (so `type=\"submit\"`, `disabled`, and `onClick` pass through) and append `${className}` at the end so callers can add layout spacing like `mt-4` when needed.",
          "codeExample": "const VARIANTS = {\n  primary: 'bg-orange-500 text-white hover:bg-orange-600',\n  secondary: 'bg-white text-stone-900 border border-stone-200 hover:bg-stone-50'\n};\n\nexport function Button({ variant = 'primary', className = '', children, ...props }) {\n  return (\n    <button\n      className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n}",
          "codeExplanation": "1. VARIANTS stores full static Tailwind class strings so every button style compiles reliably.\n2. Defaulting variant = 'primary' and spreading ...props makes <Button> ergonomic across forms and toolbars.\n3. Appending ${className} lets callers pass spacing utilities without modifying Button.jsx.\n\nHow to Run & Expected Output:\nRender <Button variant=\"primary\">Save</Button> and <Button variant=\"secondary\" className=\"ml-2\">Cancel</Button>. Both render with crisp consistent padding, rounded corners, and hover transitions.",
          "practiceExercise": "Guided Exercise:\n1. Add a `SIZES` lookup map supporting `sm`, `md`, and `lg` padding/font sizes to `Button.jsx`.\n\nIndependent Challenge:\nBuild an `<InputField label=\"...\" error=\"...\" />` component extracting shared border, padding, focus-visible, and red error-state Tailwind classes.\n\nExpected Result:\nClean, DRY JSX across pages with zero `@apply` CSS bloat.",
          "keyTakeaways": [
            "Extract reusable UI components instead of duplicating long class strings or overusing @apply",
            "Use static variant/size lookup maps for predictable styling",
            "Forward ...props and append custom className overrides cleanly"
          ]
        },
        {
          "title": "Loading Skeletons & Empty States",
          "duration": "45m",
          "introduction": "Blank screens feel broken. Matching skeleton placeholders reduce perceived wait time and prevent layout jumps when data arrives.",
          "objectives": [
            "Build geometry-matched loading skeletons with animate-pulse",
            "Design clear Empty States with an actionable next step"
          ],
          "notes": "### Why Loading Skeletons Beat Spinners\nA centered spinner on a blank page makes users wait blindly and causes a sudden visual jump (**Cumulative Layout Shift / CLS**) when 6 course cards pop in at once.\n**Geometry-matched Skeletons** mirror the exact card grid, padding (`p-6`), and approximate heights using soft neutral blocks (`bg-stone-200 rounded`) and Tailwind's `motion-safe:animate-pulse`.\n\n### Designing Helpful Empty States\nWhen a search or filter matches 0 courses, never show an empty white box! Render a clear **Empty State** explaining *why* nothing appears (\"No courses matched 'Rust'\") paired with a clear action button (\"Reset Filters\").\n\n### Common Mistakes & Solutions\n- **Mistake**: Leaving skeleton divs visible to screen readers without an announcement.\n  - **Solution**: Put `aria-hidden=\"true\"` on decorative skeleton placeholders and a single `<span className=\"sr-only\">Loading courses...</span>` on the container.",
          "codeExample": "export function CourseCardSkeleton() {\n  return (\n    <div className=\"bg-white border border-stone-200 rounded-2xl p-6 animate-pulse\" aria-hidden=\"true\">\n      <div className=\"h-5 w-24 bg-stone-200 rounded-full mb-4\" />\n      <div className=\"h-6 w-3/4 bg-stone-200 rounded mb-3\" />\n      <div className=\"h-4 w-full bg-stone-200 rounded mb-2\" />\n      <div className=\"h-4 w-5/6 bg-stone-200 rounded mb-6\" />\n      <div className=\"pt-4 border-t border-stone-100 flex justify-between\">\n        <div className=\"h-4 w-16 bg-stone-200 rounded\" />\n        <div className=\"h-4 w-12 bg-stone-200 rounded\" />\n      </div>\n    </div>\n  );\n}",
          "codeExplanation": "1. CourseCardSkeleton mirrors a real card's border, padding, badge, heading, description lines, and footer divider to eliminate layout shift.\n2. animate-pulse (or motion-safe:animate-pulse) provides gentle loading feedback.\n3. aria-hidden=\"true\" prevents screen readers from announcing empty placeholder divs.\n\nHow to Run & Expected Output:\nRender 3 <CourseCardSkeleton /> components inside a 3-column grid while `loading === true`, then swap to real cards once data arrives.",
          "practiceExercise": "Guided Exercise:\n1. Replace `animate-pulse` with `motion-safe:animate-pulse` so users with OS Reduce Motion enabled see calm static skeletons.\n\nIndependent Challenge:\nCreate an `<EmptyState title=\"No matches\" description=\"...\" actionLabel=\"Clear Filters\" onAction={reset} />` component and render it when `filteredCourses.length === 0`.\n\nExpected Result:\nSmooth skeleton-to-card transition with minimal layout shift and a clear Empty State recovery flow.",
          "keyTakeaways": [
            "Match loading skeleton dimensions to real cards to prevent Cumulative Layout Shift",
            "Use aria-hidden=\"true\" on decorative skeleton bars",
            "Always design helpful Empty States with a clear recovery action (e.g., Clear Filters)"
          ]
        }
      ],
      "quiz": [
        {
          "question": "In a React + Tailwind codebase, what is the recommended way to avoid repeating a 12-class button string across 25 pages?",
          "options": [
            "Use @apply in CSS for every single component",
            "Extract a reusable <Button /> React component with static variant/size maps",
            "Use inline style objects",
            "Copy and paste the classes"
          ],
          "correctAnswer": 1,
          "explanation": "Component extraction keeps your CSS tiny, avoids @apply bloat, and gives clean prop APIs."
        },
        {
          "question": "Why should loading skeletons match the approximate height and grid layout of real cards?",
          "options": [
            "To make the API respond faster",
            "To prevent jarring Cumulative Layout Shift (CLS) when real data replaces the skeletons",
            "Tailwind requires equal heights",
            "To disable scrolling"
          ],
          "correctAnswer": 1,
          "explanation": "Matching skeleton geometry keeps surrounding elements from jumping once data arrives."
        },
        {
          "question": "Which Tailwind prefix ensures animate-pulse only runs for users who have NOT enabled \"Reduce Motion\"?",
          "options": [
            "reduced:animate-pulse",
            "motion-safe:animate-pulse",
            "a11y:animate-pulse",
            "safe:animate-pulse"
          ],
          "correctAnswer": 1,
          "explanation": "motion-safe: applies animations only when prefers-reduced-motion is not set to reduce."
        },
        {
          "question": "Why add aria-hidden=\"true\" to decorative skeleton placeholder divs?",
          "options": [
            "To hide them visually",
            "So screen readers skip empty placeholder boxes rather than announcing meaningless layout divs",
            "To pause animate-pulse",
            "To improve CSS specificity"
          ],
          "correctAnswer": 1,
          "explanation": "Decorative loading shapes convey no text to screen readers and should be marked aria-hidden=\"true\"."
        }
      ]
    },
    {
      "title": "Module 6: Dashboard Capstone & Production Polish",
      "duration": "2h 00m",
      "objectives": [
        "Apply consistent spacing rhythm, visual hierarchy, and >= 44px touch targets",
        "Audit production CSS size and contrast ratios before shipping"
      ],
      "notes": "### Module Introduction\nThe difference between a \"template\" UI and a premium commercial product comes down to **visual hierarchy, consistent spacing rhythm, accessible color contrast, and touch-friendly controls**.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** teaches visual hierarchy, 4px/8px spacing rhythm, and 44px+ mobile touch targets.\n- **Lesson 2** walks through auditing compiled Vite CSS bundles and WCAG contrast before launch.\n\n### Module Summary\nYou now have a complete Tailwind CSS workflow for building crisp, accessible, production-grade design systems.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the SaaS Dashboard Capstone Polish assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nPerform a final design-system polish pass on a SaaS Learning Dashboard (Header + Stat Cards + Course Grid + Mobile Table) ensuring WCAG AA contrast, >= 44px touch targets on mobile, and clean production CSS output.\n\nObjectives:\n- Enforce consistent spacing rhythm (p-6, gap-6, space-y-8) and clear typographic hierarchy.\n- Wrap data tables in overflow-x-auto for mobile safety.\n\nRequirements:\n1. Audit all interactive buttons/links on mobile to ensure minimum ~44px tap height (py-2.5 px-4 or min-h-[44px]).\n2. Ensure muted text uses >= text-stone-600 on light backgrounds for WCAG AA >= 4.5:1 contrast (never light gray text-stone-300 for readable body copy!).\n3. Wrap any dashboard table in <div className=\"w-full overflow-x-auto rounded-2xl border\">.\n4. Run npm run build and inspect the generated dist/assets/*.css size.\n\nStep-by-Step Instructions:\n1. Build or review your dashboard layout across 375px, 768px, and 1440px.\n2. Check text contrast in Chrome DevTools Inspect tooltip.\n3. Verify zero horizontal scroll on mobile.\n\nDeliverables:\n- Polished Dashboard.jsx and production CSS build size report.\n\nEvaluation Criteria:\n- All body/muted text passes WCAG AA contrast.\n- Touch targets >= 44px on mobile.\n- Clean visual spacing hierarchy.",
      "lessons": [
        {
          "title": "Visual Hierarchy, Spacing Rhythm & Touch Targets",
          "duration": "1h 00m",
          "introduction": "Great dashboards guide the user’s eye effortlessly from the primary metric down to supporting actions using contrast, weight, and whitespace.",
          "objectives": [
            "Establish clear 3-level visual hierarchy (Heading -> Body -> Metadata)",
            "Maintain a consistent 8px-grid spacing rhythm (gap-4, gap-6, p-6, py-12)",
            "Size mobile buttons and links to at least 44x44px touch targets"
          ],
          "notes": "### 3-Level Visual Hierarchy & Spacing Rhythm\nCommercial interfaces feel calm and scannable because every card establishes a clear **3-level hierarchy**:\n1. **Eyebrow / Metadata** (`text-xs font-bold uppercase tracking-wider text-stone-500`): Subtle context.\n2. **Primary Metric / Title** (`text-3xl font-bold tabular-nums text-stone-900`): Immediately draws the eye.\n3. **Supporting Copy & Action** (`text-sm text-stone-600` + high-contrast button).\nStick to a consistent spacing rhythm (`p-6`, `gap-6`, `space-y-4`) rather than mixing arbitrary `p-3`, `p-5`, `p-7` values.\n\n### Touch Targets & WCAG Contrast\n- **44x44px Touch Targets**: On mobile touchscreens, buttons shorter than `44px` cause mis-taps. Use `min-h-[44px]` or `py-2.5 px-4` on mobile interactive controls.\n- **Contrast**: Light gray text (`text-stone-300` or `text-gray-400`) on white backgrounds fails WCAG AA `4.5:1` contrast! Always use `text-stone-600` or darker for readable body/secondary text.",
          "codeExample": "<div className=\"bg-white border border-stone-200 rounded-2xl p-6 space-y-4\">\n  <div className=\"flex items-center justify-between\">\n    <span className=\"text-xs font-bold uppercase tracking-wider text-stone-500\">\n      Completed Modules\n    </span>\n    <span className=\"text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700\">\n      +2 this week\n    </span>\n  </div>\n  <p className=\"text-3xl font-bold tabular-nums text-stone-900\">18 / 24</p>\n  <button className=\"w-full min-h-[44px] rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-orange-500 transition-colors\">\n    Resume Next Lesson\n  </button>\n</div>",
          "codeExplanation": "1. Stat card uses clear 3-tier hierarchy: uppercase muted label -> bold 3xl tabular-nums metric -> full-width min-h-[44px] action button.\n2. Consistent p-6 and space-y-4 create balanced breathing room.\n\nHow to Run & Expected Output:\nInspect the card in Chrome DevTools: button height measures >= 44px, and hovering text colors in DevTools Inspect tooltip confirms WCAG AA contrast pass.",
          "practiceExercise": "Guided Exercise:\n1. Check every button and nav link in a dashboard at 375px width to verify none are shorter than 44px in tap height.\n\nIndependent Challenge:\nAudit secondary text shades across a page and upgrade any `text-gray-400` readable labels to `text-gray-600`.\n\nExpected Result:\nReadable WCAG AA contrast and comfortable mobile touch targets throughout.",
          "keyTakeaways": [
            "Use size, weight, and color contrast intentionally to establish a clear 3-level hierarchy",
            "Keep mobile interactive controls >= 44px tall for comfortable tapping",
            "Avoid low-contrast light gray text for readable descriptions (target WCAG AA >= 4.5:1)"
          ]
        },
        {
          "title": "Auditing Production CSS Output",
          "duration": "1h 00m",
          "introduction": "Before shipping a Tailwind app, a 2-minute production build audit verifies that unused utilities were purged and no dynamic class names slipped through.",
          "objectives": [
            "Inspect Vite’s compiled dist/assets/*.css bundle size",
            "Verify dynamic variant classes appear in the final build",
            "Confirm zero unintended horizontal overflow across mobile and desktop"
          ],
          "notes": "### Why Production Build Audits Are Mandatory\nIn `npm run dev`, Vite may serve styles fast without revealing subtle production issues. Running `npm run build` + `npm run preview` before launch catches:\n1. **Purged Dynamic Classes**: Any interpolated class name (`bg-${x}-500`) that slipped past code review will disappear in `dist/`!\n2. **Oversized CSS Bundles**: A healthy Tailwind v3 production CSS file typically gzips to **4–12 KB**. If yours is 200 KB+, check for accidental custom CSS duplication or missing purge config.\n3. **Mobile Overflow Regressions**: Test `document.documentElement.scrollWidth <= window.innerWidth` at `375px` width on the live preview build.\n\n### Common Mistakes & Solutions\n- **Mistake**: Only testing `npm run dev` and deploying blindly.\n  - **Solution**: Always run `npm run build && npm run preview` locally before pushing a release.",
          "codeExample": "# Build production bundle and inspect generated CSS size\nnpm run build\n# Look for dist/assets/index-*.css in Vite output (typically ~20-40 kB, ~5-9 kB gzip)\n\n# Serve production build locally to verify purged classes\nnpm run preview",
          "codeExplanation": "1. `npm run build` invokes Vite + PostCSS + Tailwind JIT to purge unused styles and emit hashed assets in dist/.\n2. `npm run preview` serves the exact production dist/ folder locally so you can verify styles, fonts, and responsive layouts identically to production.\n\nHow to Run & Expected Output:\nRun `npm run build` in a Tailwind + Vite project. Terminal prints dist/assets/index-*.css (typically ~20-45 kB raw, ~5-9 kB gzip).",
          "practiceExercise": "Guided Exercise:\n1. Run `npm run build` and inspect the exact CSS chunk size printed in the Vite summary.\n2. Launch `npm run preview`, open DevTools Console at 375px width, and run `document.documentElement.scrollWidth <= window.innerWidth` (expect `true`).\n\nIndependent Challenge:\nToggle a conditional error/success badge on the preview build to prove all variant classes survived production purging.\n\nExpected Result:\nCompact gzipped CSS bundle, zero missing variant styles, and zero horizontal overflow on 375px mobile.",
          "keyTakeaways": [
            "Always test the production build (npm run preview) to catch any purged dynamic classes",
            "Healthy Tailwind production CSS bundles typically gzip to under 10 KB",
            "Verify zero horizontal overflow at 375px mobile width before shipping"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the recommended minimum touch-target height for interactive buttons on mobile screens?",
          "options": [
            "20px",
            "28px",
            "44px (e.g., min-h-[44px])",
            "100px"
          ],
          "correctAnswer": 2,
          "explanation": "Accessibility guidelines (WCAG / Apple HIG) recommend at least 44x44px touch targets for comfortable, accurate tapping."
        },
        {
          "question": "Why should you always inspect the production build (npm run preview) in addition to dev mode?",
          "options": [
            "Dev mode disables Flexbox",
            "Production builds purge/compile only statically detected classes, exposing any dynamic class interpolation bugs",
            "Dev mode hides images",
            "Preview mode runs backend tests"
          ],
          "correctAnswer": 1,
          "explanation": "Production builds reveal whether any dynamic class names failed static detection."
        },
        {
          "question": "Why should text-gray-400 on white backgrounds be avoided for readable body descriptions?",
          "options": [
            "It is not supported in Chrome",
            "It fails WCAG AA contrast ratios (~4.5:1), making text hard to read on bright screens or for low-vision users",
            "It increases CSS bundle size",
            "It breaks line-clamp"
          ],
          "correctAnswer": 1,
          "explanation": "Use darker shades like text-gray-600 or text-stone-600 on light backgrounds to meet WCAG AA readability."
        },
        {
          "question": "How can you quickly verify in Chrome DevTools Console that a page has zero horizontal overflow at 375px mobile width?",
          "options": [
            "Check window.scrollY === 0",
            "Check document.documentElement.scrollWidth <= window.innerWidth",
            "Check document.title.length > 0",
            "Check navigator.onLine"
          ],
          "correctAnswer": 1,
          "explanation": "If scrollWidth exceeds innerWidth, an element is overflowing horizontally and creating a horizontal scrollbar."
        }
      ]
    },
    {
      "title": "Module 7: Dark Mode Architecture & Multi-Theme CSS Variables",
      "duration": "1h 45m",
      "objectives": [
        "Configure class-based Dark Mode (`darkMode: \"class\"`) in tailwind.config.js",
        "Combine Tailwind utilities with CSS Custom Properties for multi-theme palettes",
        "Prevent flash of wrong theme (FOUC) on page load cleanly"
      ],
      "notes": "### Module Introduction & Description\nSupporting Dark Mode or multi-brand themes without duplicating every component is effortless when you combine Tailwind's **`dark:` variant** with **CSS Custom Properties** (`rgb(var(--color-bg) / <alpha-value>)`).\n\n### Prerequisites\n- Completion of Modules 1–6 (Tailwind config, responsive grids, states).\n\n### Skills Acquired\n- Class-based Dark Mode toggling, CSS-variable-backed Tailwind color tokens with opacity modifier support, and FOUC prevention.\n\n### How the Lessons Connect\n- **Lesson 1** sets up `darkMode: 'class'` and `dark:` state utilities.\n- **Lesson 2** backs Tailwind theme tokens with CSS variables supporting `/50` opacity modifiers.\n\n### Completion Criteria\n- Complete both lessons, deliver the Multi-Theme Dark/Light Card Showcase assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nAn LMS interface needs a seamless Light / Dark theme toggle that remembers the user's choice in localStorage, respects OS prefers-color-scheme on first visit, and supports Tailwind opacity modifiers (bg-surface/90).\n\nObjectives:\n- Configure darkMode: 'class' and CSS-variable color tokens in tailwind.config.js.\n- Style surfaces, borders, and text cleanly across both themes.\n\nRequirements:\n1. Set darkMode: 'class' in tailwind.config.js.\n2. Define semantic CSS variables (--bg-surface, --text-ink) in :root and .dark { ... } using space-separated RGB channels (e.g., 253 251 247).\n3. Register `surface: 'rgb(var(--bg-surface) / <alpha-value>)'` in theme.extend.colors.\n4. Build a card + navbar using bg-surface/90 text-ink and verify toggling .dark on <html> updates all colors instantly!\n\nStep-by-Step Instructions:\n1. Configure tailwind.config.js and index.css variables.\n2. Toggle document.documentElement.classList.toggle('dark') via a button and test bg-surface/90 opacity.\n\nDeliverables:\n- tailwind.config.js, index.css, and ThemeToggleDemo.jsx.\n\nEvaluation Criteria:\n- Opacity modifiers (/90, /50) work cleanly on CSS variable colors.\n- High contrast maintained in both Light and Dark modes.",
      "lessons": [
        {
          "title": "Class-Based Dark Mode (dark:) & System Preference Sync",
          "duration": "50m",
          "introduction": "By default Tailwind uses OS-level media queries for dark mode. Switching to `darkMode: \"class\"` gives users an explicit toggle button too.",
          "objectives": [
            "Configure darkMode: \"class\" in tailwind.config.js",
            "Pair light and dark utilities cleanly (bg-white dark:bg-stone-900)"
          ],
          "notes": "### `media` vs. `class` Dark Mode\n- `media` (default): Follows OS setting only — users can't toggle manually on your site.\n- **`class`**: Activates `dark:` classes whenever `<html class=\"dark\">` is present — letting you sync with OS preference initially AND let users override with a toggle button saved to `localStorage`!",
          "codeExample": "// tailwind.config.js: darkMode: 'class'\n<article className=\"bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6\">\n  <h3 className=\"text-stone-900 dark:text-stone-100 font-bold\">Dark-Ready Card</h3>\n  <p className=\"text-stone-600 dark:text-stone-400 text-sm mt-1\">\n    Adapts cleanly when .dark is toggled on &lt;html&gt;.\n  </p>\n</article>",
          "codeExplanation": "1. Every light color pairs with an explicit dark: counterpart for background, border, heading, and muted text.\n\nHow to Run & Expected Output:\nToggle `document.documentElement.classList.toggle('dark')` in DevTools Console: the card transitions cleanly to dark charcoal surfaces with crisp light text.",
          "practiceExercise": "Guided Exercise:\n1. Write a 5-line initializer checking `localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)`.\n\nIndependent Challenge:\nCheck WCAG contrast of `dark:text-stone-400` on `dark:bg-stone-900` in Chrome DevTools.\n\nExpected Result:\nReliable Light/Dark toggling synced with user preference.",
          "keyTakeaways": [
            "Use darkMode: \"class\" when providing an interactive Light/Dark toggle button",
            "Pair light and dark colors explicitly on surfaces, borders, and text"
          ]
        },
        {
          "title": "Combining Tailwind Tokens with CSS Variables for Multi-Brand Themes",
          "duration": "55m",
          "introduction": "Writing `dark:` on 400 elements gets repetitive. Backing semantic Tailwind color tokens with CSS variables swaps entire themes with zero extra `dark:` classes!",
          "objectives": [
            "Define space-separated RGB CSS variables so Tailwind <alpha-value> opacity works",
            "Create semantic tokens like bg-surface and text-ink"
          ],
          "notes": "### Supporting Opacity Modifiers (`bg-surface/90`) with CSS Variables\nIf you define `--surface: #FDFBF7;`, then `bg-surface/90` **breaks**! Instead, store **space-separated RGB numbers**:\n`--surface: 253 251 247;`\nAnd in `tailwind.config.js`:\n`surface: 'rgb(var(--surface) / <alpha-value>)'`\nNow `bg-surface`, `bg-surface/90`, and `bg-surface/50` all work natively!",
          "codeExample": "/* index.css */\n:root { --surface: 253 251 247; --ink: 28 28 28; }\n.dark { --surface: 24 24 27; --ink: 244 244 245; }\n\n/* tailwind.config.js */\n// colors: { surface: 'rgb(var(--surface) / <alpha-value>)', ink: 'rgb(var(--ink) / <alpha-value>)' }\n// Usage: <header className=\"bg-surface/90 text-ink backdrop-blur-md\">",
          "codeExplanation": "1. Space-separated RGB channels allow Tailwind's <alpha-value> placeholder to inject opacity (0.9 for /90).\n2. Changing .dark updates every bg-surface and text-ink across the whole app automatically.",
          "practiceExercise": "Guided Exercise:\n1. Add a third `.theme-ocean` class overriding `--surface` and `--ink` with zero changes to JSX!\n\nIndependent Challenge:\nVerify `bg-surface/80 backdrop-blur-md` renders translucent over scrolling cards in both themes.\n\nExpected Result:\nZero-duplication semantic theming with full Tailwind opacity support.",
          "keyTakeaways": [
            "Store space-separated RGB channels in CSS variables and use <alpha-value> in tailwind.config.js so /50 and /90 opacity modifiers work",
            "Semantic tokens (bg-surface, text-ink) eliminate repetitive dark: classes"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why store space-separated RGB values (`--surface: 253 251 247`) instead of hex (`#FDFBF7`) when pairing CSS variables with Tailwind?",
          "options": [
            "Tailwind forbids hex codes",
            "So Tailwind’s `<alpha-value>` placeholder can support opacity modifiers like `bg-surface/90`",
            "Hex codes don’t work in dark mode",
            "RGB variables load faster"
          ],
          "correctAnswer": 1,
          "explanation": "rgb(var(--surface) / <alpha-value>) lets Tailwind inject alpha opacity values cleanly for /50, /80, /90 modifiers."
        },
        {
          "question": "What does setting `darkMode: \"class\"` in `tailwind.config.js` change?",
          "options": [
            "It disables dark mode completely",
            "dark:* utilities activate when a `dark` class is present on an ancestor (typically <html>) rather than relying solely on OS preference",
            "It forces dark mode on everyone",
            "It generates CSS at runtime in JS"
          ],
          "correctAnswer": 1,
          "explanation": "Class-based dark mode lets users toggle themes manually while still allowing initial OS-preference detection."
        },
        {
          "question": "What is the main benefit of semantic theme tokens (`bg-surface`, `text-ink`) over raw `bg-white dark:bg-stone-900`?",
          "options": [
            "They require more typing",
            "You define theme mappings once in CSS variables and support Light, Dark, and custom brand themes with one class name",
            "They skip PostCSS",
            "They disable hover states"
          ],
          "correctAnswer": 1,
          "explanation": "Semantic tokens centralize theme definitions in CSS variables so JSX stays clean across multiple themes."
        },
        {
          "question": "Where should the `.dark` class normally be toggled to affect the entire page?",
          "options": [
            "On <footer>",
            "On document.documentElement (<html>)",
            "On <head>",
            "On every <p>"
          ],
          "correctAnswer": 1,
          "explanation": "Toggling .dark on <html> ensures all descendants (including modals/portals mounted in <body>) inherit dark styles."
        }
      ]
    },
    {
      "title": "Module 8: Container Queries, Arbitrary Values & Custom Utilities",
      "duration": "1h 30m",
      "objectives": [
        "Build component-responsive cards with @tailwindcss/container-queries (@container, @md:)",
        "Use arbitrary values ([...]) responsibly for one-off measurements without polluting config"
      ],
      "notes": "### Module Introduction & Description\nSometimes a component needs to adapt to its parent sidebar vs main grid (`@container`), or you need a single one-off `max-h-[85vh]` value without adding a permanent token to `tailwind.config.js`.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Tailwind Container Queries (`@container`, `@md:`), responsible arbitrary values (`min-h-[44px]`), and arbitrary CSS variants.\n\n### How the Lessons Connect\n- **Lesson 1** covers `@container` and `@md:` component-level responsiveness.\n- **Lesson 2** covers arbitrary values `[...]` and when to promote repeated values into `tailwind.config.js`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Container-Aware Widget assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a CoursePreviewCard component that stacks vertically in a narrow 260px sidebar and switches to a horizontal layout inside a 500px+ main column using Tailwind container queries.\n\nObjectives:\n- Apply @container on the card wrapper and @md: utilities on inner layout elements.\n\nRequirements:\n1. Wrap the card in <div className=\"@container\">.\n2. Inside, use flex flex-col @md:flex-row gap-4 p-5.\n3. Use an arbitrary value cleanly where justified (e.g., @md:w-[220px] shrink-0 on the thumbnail).\n\nStep-by-Step Instructions:\n1. Render the exact same CoursePreviewCard inside a 260px sidebar and a 640px main slot.\n2. Verify layout adaptation without viewport media queries.\n\nDeliverables:\n- ContainerCard.jsx.\n\nEvaluation Criteria:\n- Uses @container + @md: rather than viewport md: breakpoints.",
      "lessons": [
        {
          "title": "Component-Driven Layouts with @tailwindcss/container-queries",
          "duration": "45m",
          "introduction": "Viewport breakpoints (md:) fail when a card is placed inside a narrow sidebar on a 1440px desktop. Tailwind container queries solve that cleanly.",
          "objectives": [
            "Mark container wrappers with @container (and named @container/card)",
            "Apply @sm:, @md:, @lg: prefixes based on container width"
          ],
          "notes": "### How Tailwind Container Queries Work\nAdd `@container` on a parent wrapper, then use `@md:flex-row` or `@lg:grid-cols-2` on children! Because `@md:` measures the **container's** width (448px+), your component adapts seamlessly whether placed in a sidebar, modal, or main grid.",
          "codeExample": "<div className=\"@container\">\n  <div className=\"flex flex-col @md:flex-row items-start @md:items-center gap-4 p-5 bg-white border rounded-2xl\">\n    <div className=\"w-full @md:w-40 h-28 bg-orange-100 rounded-xl shrink-0\" />\n    <div>\n      <h3 className=\"font-bold text-stone-900\">Container-Aware Card</h3>\n      <p className=\"text-sm text-stone-600\">Stacks in sidebars, widens in main grids.</p>\n    </div>\n  </div>\n</div>",
          "codeExplanation": "1. @container establishes an inline-size container on the outer wrapper.\n2. @md:flex-row switches the inner flex layout horizontally once the container itself is >= 28rem (448px).\n\nHow to Run & Expected Output:\nRender inside a 280px column and a 600px column simultaneously: first is vertical, second is horizontal.",
          "practiceExercise": "Guided Exercise:\n1. Use a named container `@container/sidebar` and target it with `@md/sidebar:grid-cols-2`.\n\nIndependent Challenge:\nPlace a `<CourseCard />` inside a narrow modal (`max-w-sm`) and confirm `@container` keeps it cleanly stacked.\n\nExpected Result:\nTruly portable, slot-independent UI components.",
          "keyTakeaways": [
            "Use @container on parent wrappers and @sm:/@md:/@lg: on children for container-based responsiveness",
            "Named containers (@container/name) prevent nested container ambiguity"
          ]
        },
        {
          "title": "Arbitrary Values ([...]), Custom Utilities & Plugins",
          "duration": "45m",
          "introduction": "Need a one-off `grid-cols-[240px_1fr]` or `min-h-[44px]`? Tailwind’s square-bracket arbitrary syntax generates exact one-off utilities without writing custom CSS.",
          "objectives": [
            "Write arbitrary values safely (spaces become underscores: grid-cols-[240px_1fr])",
            "Know when to promote repeated arbitrary values into tailwind.config.js tokens"
          ],
          "notes": "### Arbitrary Syntax Rules\n- **Spaces -> Underscores**: Inside `[...]`, HTML class attributes split on spaces! Write `grid-cols-[240px_1fr]` instead of spaces.\n- **When to Stop**: If you type `bg-[#FF8C42]` more than twice, promote it into `tailwind.config.js` as `bg-brand-accent`!",
          "codeExample": "<div className=\"grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 min-h-[calc(100vh-4rem)]\">\n  <aside className=\"bg-stone-50 p-4 rounded-xl\">Fixed 260px Sidebar</aside>\n  <main className=\"min-w-0 bg-white p-6 rounded-xl\">Fluid 1fr Content</main>\n</div>",
          "codeExplanation": "1. lg:grid-cols-[260px_1fr] generates an exact 260px sidebar + 1fr main column using an underscore in place of a space.\n2. min-h-[calc(100vh-4rem)] subtracts a 4rem navbar height cleanly.\n\nHow to Run & Expected Output:\nRender at 1024px+ width: sidebar locks to 260px while main fills all remaining space.",
          "practiceExercise": "Guided Exercise:\n1. Replace `bg-[#FF8C42]` with a named token in `tailwind.config.js` and compare readability.\n\nIndependent Challenge:\nUse an arbitrary selector variant `[&>li]:py-2` on a `<ul>` to space direct list-item children cleanly.\n\nExpected Result:\nClean one-off precision without custom CSS files.",
          "keyTakeaways": [
            "Replace spaces with underscores inside Tailwind arbitrary values ([260px_1fr])",
            "Promote repeated arbitrary colors or spacing values into tailwind.config.js tokens"
          ]
        }
      ],
      "quiz": [
        {
          "question": "How do you write an arbitrary CSS Grid template with spaces (`260px 1fr`) in a Tailwind class?",
          "options": [
            "grid-cols-[260px 1fr]",
            "grid-cols-[260px_1fr] (replacing spaces with underscores)",
            "grid-cols-(260px,1fr)",
            "grid-cols-260-1fr"
          ],
          "correctAnswer": 1,
          "explanation": "HTML splits class attributes on spaces, so Tailwind uses underscores inside [...] to represent spaces."
        },
        {
          "question": "When should an arbitrary value like `bg-[#FF8C42]` be moved into `tailwind.config.js`?",
          "options": [
            "Never",
            "As soon as it is reused across multiple components so it becomes a consistent named design token",
            "Only for margins",
            "Only in dark mode"
          ],
          "correctAnswer": 1,
          "explanation": "Repeated magic hex codes should be promoted to semantic theme tokens in tailwind.config.js."
        },
        {
          "question": "What does `@md:flex-row` respond to inside a `@container` wrapper?",
          "options": [
            "The full browser window width",
            "The width of the nearest `@container` ancestor",
            "Screen height",
            "Print paper width"
          ],
          "correctAnswer": 1,
          "explanation": "Container query prefixes (@sm:, @md:, @lg:) measure the @container parent width rather than the viewport."
        },
        {
          "question": "Why must `@container` be placed on a parent wrapper rather than directly on the element using `@md:flex-row`?",
          "options": [
            "Tailwind forbids it on flex containers",
            "CSS container queries cannot query the element’s own size; they query an ancestor container",
            "It breaks dark mode",
            "It disables gap"
          ],
          "correctAnswer": 1,
          "explanation": "Just like native CSS @container, Tailwind @container must wrap the descendant elements styled with @md:."
        }
      ]
    },
    {
      "title": "Module 9: Complex Data Tables, Forms & SVG Icon Styling",
      "duration": "1h 45m",
      "objectives": [
        "Build mobile-scrollable data tables with sticky headers, zebra striping, and tabular-nums",
        "Style accessible custom checkboxes, switches, and inline SVG icons cleanly"
      ],
      "notes": "### Module Introduction & Description\nReal SaaS apps live on data tables (grades, enrollments, invoices) and rich forms. Styling them cleanly on mobile without breaking table semantics or accessibility takes just a handful of Tailwind utilities.\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Mobile-safe responsive tables, `odd:bg-*` zebra striping, `peer`-driven toggle switches, and `size-*` SVG styling.\n\n### How the Lessons Connect\n- **Lesson 1** builds responsive, readable data tables.\n- **Lesson 2** styles custom accessible toggle switches and SVG icons.\n\n### Completion Criteria\n- Complete both lessons, deliver the Responsive Gradebook Table & Toggle Switch assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a Student Progress Table with mobile horizontal scrolling, zebra striping, right-aligned tabular numeric columns, and an accessible CSS-only \"Show Completed Only\" toggle switch using Tailwind's peer utilities.\n\nObjectives:\n- Keep semantic <table> markup intact while scrolling safely on 375px screens.\n- Style a custom toggle switch backed by a real <input type=\"checkbox\" class=\"sr-only peer\" />.\n\nRequirements:\n1. Wrap <table> in <div className=\"w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white\">.\n2. Use divide-y divide-stone-200 and even:bg-stone-50/60 on rows.\n3. Align numeric Score / Progress columns with text-right tabular-nums.\n4. Build the toggle switch using sr-only peer + peer-checked:bg-orange-500 + peer-focus-visible:ring-2.\n\nStep-by-Step Instructions:\n1. Implement ProgressTable.jsx and verify horizontal scroll on 375px without blowing out the page.\n2. Test toggling the switch via Spacebar on keyboard to confirm peer-focus-visible:ring-2 appears!\n\nDeliverables:\n- ProgressTable.jsx.\n\nEvaluation Criteria:\n- Zero page-level overflow on mobile.\n- Toggle switch remains 100% keyboard and screen-reader accessible via sr-only (never display: none / hidden!).",
      "lessons": [
        {
          "title": "Responsive Data Tables, Sticky Columns & Zebra Striping",
          "duration": "50m",
          "introduction": "Never turn a <table> into stacked <div>s unless needed — a simple overflow-x-auto wrapper keeps full table accessibility while scrolling smoothly on phones.",
          "objectives": [
            "Wrap semantic tables in overflow-x-auto containers",
            "Apply even:/odd: striping, hover: row highlights, and tabular-nums alignment"
          ],
          "notes": "### Table Styling Essentials\n- Wrap `<table className=\"w-full text-left border-collapse\">` inside `<div className=\"w-full overflow-x-auto rounded-2xl border\">`.\n- Use `whitespace-nowrap` on `<th>` headers so multi-word column titles don't squash vertically.\n- Right-align numbers with `text-right tabular-nums`.",
          "codeExample": "<div className=\"w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white\">\n  <table className=\"w-full text-left border-collapse text-sm\">\n    <thead className=\"bg-stone-50 border-b border-stone-200 text-xs uppercase text-stone-500\">\n      <tr>\n        <th className=\"px-4 py-3 whitespace-nowrap\">Course</th>\n        <th className=\"px-4 py-3 whitespace-nowrap text-right\">Progress</th>\n      </tr>\n    </thead>\n    <tbody className=\"divide-y divide-stone-100\">\n      <tr className=\"even:bg-stone-50/50 hover:bg-orange-50/40 transition-colors\">\n        <td className=\"px-4 py-3 font-medium text-stone-900\">TypeScript</td>\n        <td className=\"px-4 py-3 text-right tabular-nums font-semibold\">100%</td>\n      </tr>\n    </tbody>\n  </table>\n</div>",
          "codeExplanation": "1. overflow-x-auto lets wide tables scroll sideways inside their rounded card border on narrow phones.\n2. even:bg-stone-50/50 + hover:bg-orange-50/40 make rows effortless to scan.\n\nHow to Run & Expected Output:\nRender with 5+ columns at 375px width: the table swipes horizontally inside its border while page scrollWidth stays 375px.",
          "practiceExercise": "Guided Exercise:\n1. Add a `sticky left-0 bg-white` first column on a 6-column table so student names stay pinned while scrolling scores horizontally.\n\nIndependent Challenge:\nAdd `caption-top` and a `<caption className=\"p-4 text-left font-bold\">` inside the table.\n\nExpected Result:\nAccessible, readable, mobile-safe data tables.",
          "keyTakeaways": [
            "Wrap semantic <table> elements in w-full overflow-x-auto for mobile safety",
            "Use tabular-nums and text-right on numeric columns"
          ]
        },
        {
          "title": "Styling Custom Checkboxes, Switches & SVG Icons Cleanly",
          "duration": "55m",
          "introduction": "Never hide a checkbox with `hidden` (`display: none`) when building a custom toggle switch — `sr-only` keeps it focusable by keyboards and screen readers!",
          "objectives": [
            "Build accessible custom switches using sr-only + peer + peer-checked:",
            "Size and color SVG icons cleanly with size-5 and text-*/stroke-*"
          ],
          "notes": "### `sr-only` + `peer` = Accessible Custom Controls\n`hidden` (`display: none`) removes an input from keyboard Tab order and screen readers completely. Using **`sr-only peer`** hides it visually while keeping Tab, Spacebar, and screen reader state 100% intact, letting `peer-checked:` and `peer-focus-visible:` style your custom switch!",
          "codeExample": "<label className=\"inline-flex items-center gap-3 cursor-pointer\">\n  <input type=\"checkbox\" className=\"sr-only peer\" />\n  <span className=\"relative w-11 h-6 bg-stone-300 rounded-full transition-colors peer-checked:bg-orange-500 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5\" />\n  <span className=\"text-sm font-medium text-stone-800\">Completed Only</span>\n</label>",
          "codeExplanation": "1. sr-only keeps the real <input type=\"checkbox\"> keyboard-focusable and screen-reader-accessible.\n2. peer-checked:bg-orange-500 and peer-checked:after:translate-x-5 animate the switch thumb with zero JavaScript styling code!\n\nHow to Run & Expected Output:\nRender inside a browser and press Tab -> Spacebar: focus ring highlights the switch and the knob slides smoothly.",
          "practiceExercise": "Guided Exercise:\n1. Replace `sr-only` with `hidden` temporarily and try Tabbing to the switch — notice keyboard focus skips it completely! Restore `sr-only`.\n\nIndependent Challenge:\nStyle an inline SVG icon with `size-5 text-stone-500 group-hover:text-orange-500 transition-colors`.\n\nExpected Result:\nFully keyboard-accessible custom form controls with zero JS animation overhead.",
          "keyTakeaways": [
            "Always use sr-only (never hidden) on native inputs behind custom switches/checkboxes",
            "Combine peer, peer-checked:, and peer-focus-visible: for pure-CSS interactive controls"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must a custom toggle switch hide its native `<input type=\"checkbox\">` using `sr-only` instead of `hidden` (`display: none`)?",
          "options": [
            "hidden breaks CSS rounded-full",
            "display: none removes the input from keyboard Tab order and screen readers, whereas sr-only keeps it accessible",
            "sr-only checks the box automatically",
            "hidden disables peer-checked"
          ],
          "correctAnswer": 1,
          "explanation": "sr-only hides the checkbox visually while keeping it focusable via Tab/Space and readable by assistive tech."
        },
        {
          "question": "Which Tailwind class gives numbers in a table column uniform width so percentages align vertically?",
          "options": [
            "font-serif",
            "tabular-nums",
            "tracking-widest",
            "truncate"
          ],
          "correctAnswer": 1,
          "explanation": "tabular-nums applies font-variant-numeric: tabular-nums so every digit occupies equal horizontal width."
        },
        {
          "question": "How do you make a wide 7-column `<table>` usable on a 375px mobile screen without overflowing the page?",
          "options": [
            "Hide 5 columns with hidden",
            "Wrap the table in `<div className=\"w-full overflow-x-auto\">`",
            "Set font-size: 6px",
            "Use position: fixed"
          ],
          "correctAnswer": 1,
          "explanation": "Wrapping the table in overflow-x-auto keeps semantic table markup intact while enabling smooth horizontal swipe on mobile."
        },
        {
          "question": "What does `even:bg-stone-50` do on `<tr>` elements inside `<tbody>`?",
          "options": [
            "Colors only the first row",
            "Applies a subtle alternating background color to every even-numbered row (zebra striping)",
            "Hides odd rows",
            "Sorts the table"
          ],
          "correctAnswer": 1,
          "explanation": "Tailwind’s even: modifier targets :nth-child(even) rows for clean zebra striping."
        }
      ]
    },
    {
      "title": "Module 10: Editorial Typography & Final SaaS Dashboard Capstone",
      "duration": "1h 45m",
      "objectives": [
        "Style Markdown/CMS prose cleanly using @tailwindcss/typography (prose) or custom prose utilities",
        "Integrate all 10 Tailwind CSS modules into a multi-theme, accessible SaaS Learning Dashboard"
      ],
      "notes": "### Module Introduction & Description\nLong-form lesson notes, blog posts, and documentation rendered from Markdown need balanced heading margins, list markers, blockquotes, and scrollable code blocks. In this final module, you style rich prose and assemble the **Complete SaaS Learning Dashboard Capstone**.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Styling Markdown prose (`prose`, `prose-stone`, `dark:prose-invert`) and delivering a cohesive, audited Tailwind CSS design system.\n\n### How the Lessons Connect\n- **Lesson 1** covers styling Markdown & long-form prose cleanly.\n- **Lesson 2** integrates all 10 modules into the Final Multi-Theme SaaS Learning Dashboard Capstone.\n\n### Completion Criteria\n- Complete both lessons, deliver the Complete Multi-Theme SaaS Dashboard Capstone, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Multi-Theme SaaS Learning Dashboard:\nProblem Statement:\nBuild a complete, responsive, Light/Dark-themed SaaS Learning Dashboard bringing together custom tailwind.config.js tokens, CSS variable theming, responsive grids, @container cards, accessible modal, sr-only peer filter switch, and mobile-scrollable progress table.\n\nObjectives:\n- Integrate every Tailwind CSS design-system pattern from Modules 1–10 into one polished dashboard.\n\nRequirements:\n1. Custom tokens + darkMode: 'class' with CSS variable surface/ink tokens supporting /90 opacity.\n2. Sticky frosted navbar + responsive mobile navigation + 3-tier stat cards.\n3. Responsive Course Grid (1 -> 2 -> 3 cols) with Geometry-Matched Skeletons + Empty State.\n4. Accessible Portal/Fixed Modal + sr-only peer toggle switch + overflow-x-auto Progress Table.\n5. Zero dynamic interpolated class names (bg-${...}); all buttons >= 44px on mobile; WCAG AA contrast in both Light and Dark mode.\n\nStep-by-Step Instructions:\n1. Assemble the dashboard components cleanly using extracted <Button />, <Card />, and <Badge /> components.\n2. Run `npm run build` and inspect the final compiled CSS bundle size.\n3. Verify at 375px, 768px, and 1280px in both Light and Dark modes.\n\nDeliverables:\n- Complete Dashboard UI components and tailwind.config.js.\n\nEvaluation Criteria:\n- Compact production CSS output with zero missing purged classes.\n- Passes 375px overflow check and WCAG AA contrast in both themes.",
      "lessons": [
        {
          "title": "Styling Markdown & Long-Form Prose Cleanly",
          "duration": "50m",
          "introduction": "Because Tailwind’s Preflight reset strips default margins from <h1>, <p>, and <ul>, raw Markdown HTML renders flat unless styled with prose utilities.",
          "objectives": [
            "Use @tailwindcss/typography (prose, prose-lg, dark:prose-invert) or explicit ReactMarkdown element classes",
            "Keep code blocks inside Markdown prose constrained with overflow-x-auto"
          ],
          "notes": "### Why Preflight Strips Heading & List Styles\nTailwind's base reset removes default browser margins and list bullets intentionally so UI cards don't have surprise spacing. For long-form articles or Markdown lesson notes, either:\n1. Install `@tailwindcss/typography` and wrap content in `<article className=\"prose prose-stone dark:prose-invert max-w-prose\">`, OR\n2. Pass explicit Tailwind classes into `ReactMarkdown`'s `components` prop (as Cortex LMS does in `CourseDetail.jsx`)!",
          "codeExample": "<article className=\"prose prose-stone dark:prose-invert max-w-prose prose-headings:font-serif prose-a:text-orange-600\">\n  <h2>Understanding CSS Design Systems</h2>\n  <p>Consistent spacing and clear typographic rhythm make complex documentation effortless to read.</p>\n  <ul>\n    <li>Keep measure around 65ch</li>\n    <li>Preserve strong heading hierarchy</li>\n  </ul>\n</article>",
          "codeExplanation": "1. prose applies balanced vertical margins, list bullets, and heading sizes automatically.\n2. dark:prose-invert flips prose text and code colors cleanly in dark mode.\n3. Element modifiers like prose-a:text-orange-600 customize links inline.\n\nHow to Run & Expected Output:\nRender inside a Tailwind project with @tailwindcss/typography (or styled ReactMarkdown): headings, bullets, and links render with editorial spacing.",
          "practiceExercise": "Guided Exercise:\n1. Customize `prose-pre:overflow-x-auto` and `prose-code:text-orange-600` on a Markdown article container.\n\nIndependent Challenge:\nCompare `prose` vs passing custom `components={{ h2, p, ul, pre }}` to `ReactMarkdown` — note when `ReactMarkdown` components give even finer mobile control over `<table>` and `<pre>`!\n\nExpected Result:\nCrisp, readable long-form typography in both Light and Dark themes.",
          "keyTakeaways": [
            "Tailwind Preflight strips default heading/list styles; restore them in articles using prose or ReactMarkdown component classes",
            "Use dark:prose-invert and max-w-prose for comfortable Light/Dark long-form reading"
          ]
        },
        {
          "title": "Final Capstone: Complete Multi-Theme SaaS Learning Dashboard",
          "duration": "55m",
          "introduction": "Reviewing the complete Tailwind CSS production workflow from design tokens to final bundle & accessibility sign-off.",
          "objectives": [
            "Verify Light/Dark contrast, 44px touch targets, and 375px zero-overflow across all dashboard sections",
            "Audit final compiled CSS size after npm run build"
          ],
          "notes": "### Final Tailwind Production Sign-Off\n1. **Static Safety**: Zero dynamic `bg-${x}-500` class interpolation.\n2. **Responsiveness**: Mobile-first unprefixed -> `sm:` -> `md:` -> `lg:`, `min-w-0` on Flex/Grid tracks with `<pre>` or `<table>`.\n3. **Accessibility**: `focus-visible:ring-2`, `sr-only peer` controls, `motion-safe:animate-*`, `>= 44px` tap targets, WCAG AA contrast in Light & Dark.",
          "codeExample": "// Complete Dashboard Shell Pattern\n<div className=\"min-h-screen bg-surface text-ink overflow-x-clip\">\n  <header className=\"sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800\">\n    {/* Navbar + Theme Toggle */}\n  </header>\n  <main className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0\">\n    {/* Stat Cards + Responsive Course Grid + Overflow-Safe Table */}\n  </main>\n</div>",
          "codeExplanation": "1. Combines semantic surface/ink theme tokens, overflow-x-clip (preserving sticky header), frosted backdrop blur, and min-w-0 main container.\n\nHow to Run & Expected Output:\nRun `npm run build && npm run preview`; inspect dist/assets/*.css (~4–10 KB gzipped) and test 375px/1280px in Light & Dark modes.",
          "practiceExercise": "Guided Exercise:\n1. Run `npm run build` and verify your compiled CSS file gzips cleanly under ~15 KB.\n\nIndependent Challenge:\nToggle Dark Mode and reduced motion in DevTools while testing every dashboard widget (cards, modal, toggle switch, table).\n\nExpected Result:\nPolished, accessible, multi-theme production Tailwind UI.",
          "keyTakeaways": [
            "Combine semantic CSS-variable tokens, @container cards, and accessible peer controls for scalable design systems",
            "Always verify the production build (npm run preview) across mobile, desktop, and Light/Dark modes"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why do raw HTML `<h1>` and `<ul>` tags rendered from Markdown look unstyled inside Tailwind unless wrapped in `prose` or custom component classes?",
          "options": [
            "Markdown deletes CSS",
            "Tailwind’s Preflight base reset removes default heading font sizes, margins, and list bullets intentionally",
            "Browsers ignore Markdown",
            "React strips CSS from headings"
          ],
          "correctAnswer": 1,
          "explanation": "Preflight normalizes elements so UI components start clean; prose or ReactMarkdown component classes restore editorial typography."
        },
        {
          "question": "Which modifier flips `@tailwindcss/typography` prose colors cleanly for Dark Mode?",
          "options": [
            "dark:prose-dark",
            "dark:prose-invert",
            "prose-black",
            "invert-prose"
          ],
          "correctAnswer": 1,
          "explanation": "dark:prose-invert switches prose headings, paragraphs, borders, and inline code to dark-mode-appropriate colors."
        },
        {
          "question": "Why use `overflow-x-clip` instead of `overflow-x-hidden` on the outer dashboard wrapper?",
          "options": [
            "overflow-x-clip disables scrolling everywhere",
            "overflow-x-hidden breaks sticky headers/sidebars inside, while overflow-x-clip clips stray horizontal overflow safely",
            "overflow-x-clip is required by Vite",
            "They behave identically"
          ],
          "correctAnswer": 1,
          "explanation": "overflow-x-clip avoids creating a scroll container that traps position: sticky elements."
        },
        {
          "question": "What is the typical gzipped size of a well-configured production Tailwind CSS bundle?",
          "options": [
            "500 KB - 1 MB",
            "4 KB - 12 KB",
            "2 MB",
            "0 bytes"
          ],
          "correctAnswer": 1,
          "explanation": "Because Tailwind purges all unused utilities at build time, production CSS usually gzips to just a few kilobytes."
        }
      ]
    }
  ]
};
