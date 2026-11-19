export const htmlCourseData = {
  "title": "HTML & CSS Masterclass",
  "description": "Go from zero web experience to building accessible, responsive, production-grade websites from scratch. Master semantic HTML5, forms, CSS specificity, the Box Model, Flexbox, CSS Grid, animations, and responsive architecture.",
  "thumbnail": "html-css",
  "totalDuration": "16h 00m",
  "category": "Frontend Development",
  "difficulty": "Beginner",
  "tags": [
    "HTML5",
    "CSS3",
    "Flexbox",
    "CSS Grid",
    "Responsive Design",
    "Accessibility"
  ],
  "learningOutcomes": [
    "Structure accessible, SEO-friendly web pages using semantic HTML5 landmarks and proper heading hierarchy",
    "Build interactive, validated HTML5 forms with native constraints and accessible labels",
    "Control layout geometry with precision using the CSS Box Model, units, and specificity rules",
    "Design complex one-dimensional and two-dimensional layouts with Flexbox and CSS Grid",
    "Implement mobile-first responsive designs with media queries, clamp(), and CSS custom properties",
    "Add smooth transitions, keyframe animations, and dark/light theme tokens"
  ],
  "prerequisites": [
    "Basic computer literacy — no prior coding experience required"
  ],
  "targetAudience": "Complete beginners and aspiring frontend engineers who want a deep, self-contained mastery of HTML5 and modern CSS3.",
  "practicalProject": "Build a complete multi-section Developer Portfolio Website featuring a sticky responsive navbar, CSS Grid project showcase, pricing/skills table, and accessible contact form.",
  "modules": [
    {
      "title": "Module 1: How the Web Works & Semantic HTML5 Foundations",
      "duration": "2h 30m",
      "objectives": [
        "Understand how browsers parse HTML into the Document Object Model (DOM)",
        "Write a valid HTML5 boilerplate with essential head metadata",
        "Use semantic landmarks (<header>, <nav>, <main>, <article>, <footer>) correctly",
        "Structure accessible heading hierarchies, links, and responsive media"
      ],
      "notes": "### Module Introduction\nEvery web application — whether a personal portfolio, a SaaS dashboard, or an e-commerce store — starts as plain HTML text sent over HTTP and parsed by the browser. Writing clean, semantic HTML5 is the foundation of accessibility, Search Engine Optimization (SEO), and maintainable CSS.\n\n### Prerequisites\n- A modern web browser (Chrome, Edge, or Firefox) and a text editor such as VS Code.\n- No prior coding experience is required.\n\n### How the Lessons Connect\n- **Lesson 1** teaches what happens inside the browser when an HTML file loads and how to write a standards-compliant HTML5 boilerplate.\n- **Lesson 2** builds on that skeleton by replacing generic `<div>` tags with meaningful semantic landmarks, accessible headings, links, and media.\n\n### Module Summary\nBy the end of this module, you will understand the browser's DOM tree, know why metadata in `<head>` matters on mobile devices, and build multi-section documents that screen readers and search engines can navigate effortlessly.\n\n### Completion Criteria\n- Read both lessons and complete the hands-on HTML structure exercises.\n- Build the semantic studio `about.html` assignment.\n- Score 100% on the Module 1 Knowledge Check.",
      "assignment": "Problem Statement:\nA fictional software studio, \"Northstar Digital\", needs an accessible, SEO-ready \"About Us\" web page. Currently they have no structured markup, so screen readers and search engines cannot identify their navigation, main story, team spotlight, or footer links.\n\nObjectives:\n- Build a valid HTML5 document from scratch using proper Standards Mode boilerplate.\n- Organize page regions using semantic landmarks rather than generic <div> wrappers.\n- Enforce a strict, logical heading hierarchy without skipping levels.\n\nRequirements:\n1. Create a file named about.html with <!DOCTYPE html>, <html lang=\"en\">, <head> (including UTF-8 charset, viewport meta tag, and descriptive <title>), and <body>.\n2. Include <header> containing the studio name/logo and a <nav> with at least 3 internal/external links.\n3. Wrap the primary content inside a single <main> element containing:\n   - An introductory <section> with the page's single <h1> and mission statement.\n   - A second <section> containing at least one <article> highlighting a flagship project or studio milestone, complete with an <img> that has descriptive alt text and explicit width/height attributes.\n   - An <aside> listing studio office hours or quick facts.\n4. End with a <footer> containing copyright info and a contact link.\n\nStep-by-Step Instructions:\n1. Open VS Code, create about.html, and write the HTML5 boilerplate manually (or inspect Emmet's ! expansion line by line).\n2. Map out the heading outline on paper first: <h1> -> <h2> -> <h3>. Never jump from <h1> to <h3>.\n3. Add the <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> elements.\n4. Open about.html in Chrome/Edge, right-click -> Inspect, and verify the DOM tree in DevTools.\n5. Check the Accessibility tree in DevTools to confirm landmarks and headings appear cleanly.\n\nDeliverables:\n- A single self-contained about.html file that renders cleanly in any browser with zero unclosed tags.\n\nEvaluation Criteria:\n- Valid HTML5 boilerplate with charset and viewport metadata.\n- Exactly one <h1> and zero skipped heading levels.\n- Every image includes meaningful alt text (or alt=\"\" if purely decorative).\n- Landmark tags (<header>, <nav>, <main>, <footer>) are used properly.\n\nHints:\n- Only one <main> element should be visible on a page.\n- <nav> is intended for major navigation blocks, not every single link in a paragraph.",
      "lessons": [
        {
          "title": "The Anatomy of an HTML5 Document & the DOM",
          "duration": "45m",
          "introduction": "Every website you visit — from a simple blog to a complex web app — begins as an HTML document. Before writing tags, you need to understand what the browser does with them.",
          "objectives": [
            "Explain the role of <!DOCTYPE html>, <html>, <head>, and <body>",
            "Understand elements, opening/closing tags, attributes, and nesting",
            "Recognize how the browser builds the DOM tree from HTML source",
            "Distinguish normal container elements from void elements"
          ],
          "notes": "### What Is HTML & Why Does It Matter?\n**HTML (HyperText Markup Language)** is not a programming language with loops or math — it is a **markup language** that describes the *structure and meaning* of content. When a server sends an `index.html` file to your browser over HTTP, the browser's HTML parser reads the characters from top to bottom and constructs an in-memory tree of objects called the **DOM (Document Object Model)**.\n\nEverything you later do with CSS (styling) and JavaScript (interactivity) operates on that live DOM tree, not on the raw text file.\n\n### Step-by-Step: The HTML5 Boilerplate\n1. **`<!DOCTYPE html>`**: Must appear on line 1. Without it, browsers fall back to **Quirks Mode**, emulating 1990s layout bugs for backwards compatibility. With it, the browser uses **Standards Mode**.\n2. **`<html lang=\"en\">`**: The root element wrapping the entire document. The `lang` attribute tells screen readers which pronunciation rules to use and tells translation tools and search engines the page's primary language.\n3. **`<head>`**: Holds **metadata** (data *about* the document) that is not rendered inside the page canvas:\n   - `<meta charset=\"UTF-8\" />`: Ensures emojis, accents, and international characters render properly instead of garbled symbols.\n   - `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />`: Instructs mobile browsers to match the layout width to the device's physical CSS pixels instead of zooming out a 980px desktop canvas.\n   - `<title>`: Sets the browser tab label, bookmark name, and search engine result headline.\n4. **`<body>`**: Holds all visible content — headings, paragraphs, buttons, images, and forms.\n\n### Elements, Attributes & Void Elements\n- **Container element**: `<p class=\"intro\">Hello</p>` has an opening tag (`<p>`), an attribute (`class=\"intro\"`), text content, and a closing tag (`</p>`).\n- **Nesting**: Elements inside other elements form parent-child relationships in the DOM. Children must always close *before* their parent closes.\n- **Void elements**: Elements that cannot hold child content and therefore have **no closing tag**, such as `<meta>`, `<img>`, `<br>`, `<hr>`, and `<input>`.\n\n### Real-World Application\nForgetting the viewport meta tag is one of the most common reasons beginner sites look tiny and unreadable on smartphones. Similarly, omitting `charset=\"UTF-8\"` causes currency symbols, em-dashes, and non-English names to break in production.\n\n### Common Mistakes & Solutions\n- **Mistake**: Overlapping tags like `<p><strong>Important</p></strong>`.\n  - **Solution**: Close inner tags in reverse order of opening: `<p><strong>Important</strong></p>`.\n- **Mistake**: Placing visible `<h1>` or `<div>` tags inside `<head>`.\n  - **Solution**: Keep `<head>` strictly for metadata, styles, and titles; place visible UI inside `<body>`.\n\n### Lesson Summary\n- Browsers parse HTML into the **DOM tree**.\n- `<!DOCTYPE html>` activates **Standards Mode**.\n- `<head>` configures metadata (UTF-8, viewport, title); `<body>` renders visible content.",
          "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"description\" content=\"Personal introduction page built with valid HTML5.\" />\n    <title>HTML5 Boilerplate Demo</title>\n  </head>\n  <body>\n    <h1>Welcome to Semantic Web Development</h1>\n    <p>\n      This document is parsed by the browser into a <strong>DOM tree</strong>\n      running in Standards Mode.\n    </p>\n    <hr />\n    <p>Line breaks<br />use void elements with no closing tag.</p>\n  </body>\n</html>",
          "codeExplanation": "1. Line 1 (<!DOCTYPE html>) forces modern Standards Mode across all browsers.\n2. <html lang=\"en\"> sets English as the root language for assistive technologies.\n3. Inside <head>, UTF-8 encoding, mobile viewport scaling, meta description, and the tab <title> are configured without rendering anything on screen.\n4. Inside <body>, <h1> and <p> form sibling nodes, while <strong> is nested inside the first <p>.\n5. <hr /> and <br /> demonstrate void elements that carry no children.\n\nHow to Run & Expected Output:\nSave as index.html and double-click to open in Chrome/Edge. You will see \"HTML5 Boilerplate Demo\" in the browser tab, a large bold heading, a paragraph with \"DOM tree\" bolded, a horizontal divider line, and two lines separated by <br />.",
          "practiceExercise": "Guided Exercise:\n1. Create a file named profile.html and type the full HTML5 boilerplate from scratch without copy-pasting.\n2. Add a <title> with your name, a <h1> heading, two <p> paragraphs, and a <hr /> divider.\n3. Open Chrome DevTools (F12 -> Elements tab) and expand <html>, <head>, and <body> to inspect the live DOM tree.\n\nIndependent Challenge:\nDeliberately remove <!DOCTYPE html> and check DevTools Console or document.compatMode in the Console (it will report \"BackCompat\" for Quirks Mode). Restore <!DOCTYPE html> and confirm document.compatMode returns \"CSS1Compat\" (Standards Mode).\n\nHints:\n- If you see strange characters like Ã© instead of é, check that <meta charset=\"UTF-8\" /> is inside <head>.",
          "keyTakeaways": [
            "Always start every HTML file with <!DOCTYPE html> to enable Standards Mode",
            "Use <html lang=\"en\"> (or your page language) for screen readers and SEO",
            "Keep <meta charset=\"UTF-8\"> and the viewport meta tag inside <head>",
            "Every container element must close in strict reverse order of opening"
          ]
        },
        {
          "title": "Semantic Landmarks, Headings, Links & Media",
          "duration": "1h 15m",
          "introduction": "Two pages can look identical visually while one is completely unusable for blind users or search engines. Semantic HTML gives your markup real meaning.",
          "objectives": [
            "Replace generic <div> soup with semantic HTML5 landmarks",
            "Build an accessible heading outline (<h1> through <h6>) without skipping levels",
            "Create safe external links and accessible, layout-stable images",
            "Use figure/figcaption and relative vs. absolute URLs accurately"
          ],
          "notes": "### Why Semantic HTML Matters\nA `<div>` tells the browser and screen reader nothing about what is inside it. **Semantic elements** describe their role:\n- **`<header>`**: Introductory content, brand logo, or page banner.\n- **`<nav>`**: Primary navigation links.\n- **`<main>`**: The dominant, unique content of the page (only one visible `<main>` per page).\n- **`<section>`**: A thematic grouping of content, ideally with its own heading.\n- **`<article>`**: Self-contained content that makes sense if syndicated elsewhere (blog post, product card, forum comment).\n- **`<aside>`**: Tangentially related content (sidebar, callout, glossary).\n- **`<footer>`**: Copyright, legal links, author metadata.\n\nScreen reader users frequently press keyboard shortcuts to jump directly from landmark to landmark or heading to heading. Using semantic tags makes your site navigable in seconds.\n\n### Heading Hierarchy Rules\n1. Use **one `<h1>`** per page for the main topic.\n2. Step down sequentially: `<h1>` -> `<h2>` -> `<h3>`. Never skip from `<h1>` to `<h4>` just because you want smaller text — use CSS `font-size` for visual size!\n\n### Links & Security (`rel=\"noopener noreferrer\"`)\nWhen linking to an external site in a new tab with `target=\"_blank\"`, pair it with `rel=\"noopener noreferrer\"`. Modern browsers imply `noopener`, but writing it explicitly prevents older browsers from exposing `window.opener` (reverse tabnabbing) and avoids leaking referrer metadata.\n\n### Accessible & Performant Media\n- Always provide descriptive `alt` text on `<img>` describing what the image conveys. If an image is purely decorative (e.g., an abstract background flourish), use `alt=\"\"` so screen readers skip it instead of reading the filename.\n- Always include `width` and `height` attributes on `<img>` so the browser reserves the aspect-ratio box before the image finishes downloading, preventing **Cumulative Layout Shift (CLS)**.\n\n### Common Mistakes & Solutions\n- **Mistake**: Putting `alt=\"image\"` or `alt=\"photo123.jpg\"`.\n  - **Solution**: Write concise, contextual descriptions: `alt=\"Developer reviewing CSS Grid layout on a laptop\"`.\n- **Mistake**: Using `<div class=\"button\">` instead of `<button>` or `<a>`.\n  - **Solution**: Use `<a>` for navigation (URLs) and `<button>` for actions (submitting, toggling modals).",
          "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Semantic Blog Article</title>\n  </head>\n  <body>\n    <header>\n      <a href=\"/\">Cortex Journal</a>\n      <nav aria-label=\"Primary Navigation\">\n        <ul>\n          <li><a href=\"#articles\">Articles</a></li>\n          <li><a href=\"https://developer.mozilla.org\" target=\"_blank\" rel=\"noopener noreferrer\">MDN Docs</a></li>\n        </ul>\n      </nav>\n    </header>\n\n    <main id=\"articles\">\n      <article>\n        <header>\n          <h1>Why Semantic HTML Still Wins in 2026</h1>\n          <p>Published on <time datetime=\"2026-05-10\">May 10, 2026</time></p>\n        </header>\n\n        <figure>\n          <img\n            src=\"https://via.placeholder.com/800x400\"\n            alt=\"Diagram comparing a div-heavy DOM tree with a semantic landmark DOM tree\"\n            width=\"800\"\n            height=\"400\"\n          />\n          <figcaption>Semantic landmarks expose a clean outline to assistive tools.</figcaption>\n        </figure>\n\n        <section>\n          <h2>1. Accessibility Out of the Box</h2>\n          <p>Screen readers announce landmarks automatically without extra JavaScript.</p>\n        </section>\n      </article>\n    </main>\n\n    <footer>\n      <p>&copy; 2026 Cortex Journal</p>\n    </footer>\n  </body>\n</html>",
          "codeExplanation": "1. <header> wraps the brand link and <nav aria-label=\"Primary Navigation\"> so screen readers announce the navigation region clearly.\n2. External links opening in a new tab include rel=\"noopener noreferrer\" for security and privacy.\n3. <main> holds the primary <article>, which uses <time datetime=\"2026-05-10\"> for machine-readable dates.\n4. <figure> and <figcaption> semantically pair the image with its caption, while width=\"800\" height=\"400\" prevent layout jump while loading.\n5. Heading levels flow cleanly: <h1> for article title, <h2> for section heading.\n\nHow to Run & Expected Output:\nSave as semantic.html and open in a browser. You will see a structured header with links, a main article with heading, placeholder image + caption, sub-section, and footer.",
          "practiceExercise": "Guided Exercise:\n1. Build a semantic news page using <header>, <nav>, <main>, two <article> blocks, an <aside> for \"Trending Stories\", and <footer>.\n2. Add an internal anchor link (#trending) in <nav> that jumps smoothly to the <aside id=\"trending\">.\n\nIndependent Challenge:\nInspect your page in Chrome DevTools -> Lighthouse (or Accessibility panel) and verify that every landmark and heading level is detected with zero skipped levels.\n\nHints:\n- Remember: <aside> works both inside <main> (for related sidebar content) or beside <main> at the body level.",
          "keyTakeaways": [
            "Use <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> instead of generic <div>s",
            "Maintain one <h1> per page and never skip heading levels",
            "Include descriptive alt text (or alt=\"\" for decorative images) and width/height on <img>",
            "Use <a> for navigation and <button> for interactive actions"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why must <!DOCTYPE html> be placed on the very first line of an HTML5 document?",
          "options": [
            "It imports default CSS styles from the W3C",
            "It instructs the browser to render in Standards Mode rather than Quirks Mode",
            "It enables JavaScript execution inside the browser",
            "It compresses the HTML file during network transfer"
          ],
          "correctAnswer": 1,
          "explanation": "Without <!DOCTYPE html>, browsers enter Quirks Mode and emulate legacy 1990s layout bugs. Placing it on line 1 ensures predictable Standards Mode rendering."
        },
        {
          "question": "Which element should wrap the unique, primary content of a web page?",
          "options": [
            "<section>",
            "<div id=\"wrapper\">",
            "<main>",
            "<article>"
          ],
          "correctAnswer": 2,
          "explanation": "<main> identifies the dominant, unique content of the document so screen readers can skip repeated headers and navigation."
        },
        {
          "question": "What is the purpose of <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">?",
          "options": [
            "It locks the user from scrolling horizontally",
            "It matches the layout viewport width to the device screen width on mobile",
            "It loads high-resolution Retina images automatically",
            "It enables dark mode on mobile browsers"
          ],
          "correctAnswer": 1,
          "explanation": "Without the viewport meta tag, mobile browsers render pages at a ~980px desktop width and zoom out, making text tiny and unreadable."
        },
        {
          "question": "How should you mark up a purely decorative background icon image for screen readers?",
          "options": [
            "Omit the alt attribute completely",
            "Set alt=\"decorative icon\"",
            "Set alt=\"\" (empty string)",
            "Replace <img> with <h1>"
          ],
          "correctAnswer": 2,
          "explanation": "An empty alt=\"\" tells screen readers to skip the decorative image. Omitting alt altogether often causes screen readers to read out the raw filename."
        }
      ]
    },
    {
      "title": "Module 2: Accessible HTML5 Forms, Tables & Validation",
      "duration": "2h 30m",
      "objectives": [
        "Connect <label> elements to inputs using for/id for accessibility and larger click targets",
        "Use semantic HTML5 input types (email, tel, date, number, password) and native validation attributes",
        "Group related form controls cleanly with <fieldset> and <legend>",
        "Build accessible data tables using <thead>, <tbody>, <th scope=\"col|row\">, and <caption>"
      ],
      "notes": "### Module Introduction\nInteractive web applications rely on forms to collect user input (sign-ups, checkouts, search) and tables to present structured datasets (invoices, pricing comparisons, analytics). When built poorly, forms frustrate mobile users and block assistive technologies.\n\n### Prerequisites\n- Completion of Module 1 (HTML5 boilerplate, semantic elements, attributes).\n\n### How the Lessons Connect\n- **Lesson 1** covers accessible form architecture, native HTML5 input types, and built-in browser validation before JavaScript even runs.\n- **Lesson 2** teaches how to structure genuine tabular data with `<thead>`, `<tbody>`, `<caption>`, and `scope` attributes — while explaining why tables must never be used for page layouts.\n\n### Module Summary\nYou will master accessible form controls, keyboard-friendly labeling, native validation constraints, and semantic data tables.\n\n### Completion Criteria\n- Complete both lessons and build the practice form & table exercises.\n- Deliver the Event Registration Form assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nA developer conference needs an accessible Event Registration Page that collects attendee information and displays ticket tier comparisons clearly.\n\nObjectives:\n- Build a multi-section accessible HTML5 form with native client-side validation.\n- Present ticket pricing tiers in a semantic, screen-reader-friendly data table.\n\nRequirements:\n1. Create register.html with a <form action=\"/register\" method=\"POST\">.\n2. Group attendee details inside a <fieldset> with a <legend> (\"Attendee Information\"):\n   - Full Name (text, required, minlength=\"2\")\n   - Email Address (email, required, autocomplete=\"email\")\n   - Ticket Quantity (number, min=\"1\", max=\"10\", value=\"1\")\n   - Dietary Preference (<select> with at least 4 options)\n3. Group ticket tier selection in a second <fieldset> using radio buttons sharing the same name attribute.\n4. Every input MUST have an explicit <label for=\"...\"> matching its id.\n5. Add a semantic <table> comparing Standard, Pro, and Student passes using <caption>, <thead>, <tbody>, and <th scope=\"col\"> / <th scope=\"row\">.\n\nStep-by-Step Instructions:\n1. Build the HTML5 skeleton in register.html.\n2. Create the ticket comparison table first, verifying header scopes.\n3. Build the registration form with two <fieldset> groups and native validation attributes.\n4. Test clicking each label text in the browser to confirm it focuses the matching input.\n5. Test submitting the form empty and with an invalid email to observe native browser validation tooltips.\n\nDeliverables:\n- A complete, valid register.html file.\n\nEvaluation Criteria:\n- 100% of inputs paired with <label for=\"...\">.\n- Radio buttons mutually exclusive via identical name attributes.\n- Native validation attributes (required, type=\"email\", min, max) present.\n- Table uses <thead>, <tbody>, and scope attributes.",
      "lessons": [
        {
          "title": "Form Architecture, Labels & Native Validation",
          "duration": "1h 15m",
          "introduction": "Forms are the primary bridge between users and servers. Native HTML5 inputs provide mobile keyboards, accessibility hooks, and instant validation for free.",
          "objectives": [
            "Pair <label> and form controls properly via for and id",
            "Select appropriate HTML5 input types (email, url, number, date, password)",
            "Apply native validation attributes (required, minlength, min, max, pattern)",
            "Group radio buttons and checkboxes semantically with <fieldset> and <legend>"
          ],
          "notes": "### How Forms Work\nA `<form>` element collects user inputs and prepares them for submission:\n- **`action`**: The destination URL where the form data is sent (e.g., `/api/contact`).\n- **`method`**: Usually `GET` (for search/filters, puts data in the URL query string) or `POST` (for login, signup, payments, puts data in the HTTP request body).\n- **`name` attribute**: Every input *must* have a `name` attribute, otherwise its value is omitted when the form submits!\n\n### Why Explicit `<label>` Elements Are Mandatory\nNever rely on `placeholder` text as a replacement for a `<label>`. Placeholders disappear as soon as the user types, have low contrast, and are not announced reliably by screen readers.\nPairing `<label for=\"user-email\">` with `<input id=\"user-email\">` gives two huge benefits:\n1. Screen readers announce the label when the user focuses the input.\n2. Clicking or tapping the label text automatically focuses the input (or toggles a checkbox/radio), creating a much larger touch target.\n\n### Choosing the Right Input Type\nUsing `type=\"email\"`, `type=\"tel\"`, or `type=\"number\"` doesn't just validate — on smartphones it automatically switches the virtual keyboard (showing `@` for email, or a numeric keypad for `tel`/`number`).\n\n### Native HTML5 Validation\nBefore writing a single line of JavaScript, HTML5 supports:\n- `required`: Prevents submission if empty.\n- `minlength` / `maxlength`: Enforces character counts.\n- `min` / `max`: Enforces numeric or date ranges.\n- `pattern`: Validates text against a Regular Expression (e.g., postal codes).\n*(Note: Always re-validate on the backend server too, because client-side HTML attributes can be bypassed in DevTools.)*\n\n### Common Mistakes & Solutions\n- **Mistake**: Giving radio buttons different `name` attributes.\n  - **Solution**: All radio buttons in a mutually exclusive group must share the *exact same* `name`, while having different `value` and `id` attributes.\n- **Mistake**: Using `<input type=\"submit\">` without a `<form>` wrapper or using `<div>` as a submit button.\n  - **Solution**: Place `<button type=\"submit\">Send</button>` inside `<form>`.",
          "codeExample": "<form action=\"/api/signup\" method=\"POST\">\n  <fieldset>\n    <legend>Create Your Cortex Account</legend>\n\n    <div>\n      <label for=\"full-name\">Full Name</label>\n      <input\n        id=\"full-name\"\n        name=\"fullName\"\n        type=\"text\"\n        required\n        minlength=\"2\"\n        autocomplete=\"name\"\n        placeholder=\"Ada Lovelace\"\n      />\n    </div>\n\n    <div>\n      <label for=\"work-email\">Email Address</label>\n      <input\n        id=\"work-email\"\n        name=\"email\"\n        type=\"email\"\n        required\n        autocomplete=\"email\"\n        placeholder=\"ada@example.com\"\n      />\n    </div>\n\n    <div>\n      <label for=\"experience-years\">Years of Experience</label>\n      <input\n        id=\"experience-years\"\n        name=\"experienceYears\"\n        type=\"number\"\n        min=\"0\"\n        max=\"50\"\n        value=\"1\"\n      />\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>Preferred Track</legend>\n    <label>\n      <input type=\"radio\" name=\"track\" value=\"frontend\" required /> Frontend\n    </label>\n    <label>\n      <input type=\"radio\" name=\"track\" value=\"fullstack\" /> Full-Stack\n    </label>\n  </fieldset>\n\n  <button type=\"submit\">Create Account</button>\n</form>",
          "codeExplanation": "1. <fieldset> and <legend> group related controls both visually and for screen readers.\n2. Each <label for=\"...\"> matches an input's id, while name=\"...\" defines the key sent to the server.\n3. autocomplete=\"name\" and autocomplete=\"email\" allow browsers and password managers to autofill accurately.\n4. Both radio buttons share name=\"track\" so selecting one deselects the other, and required ensures one must be chosen.\n\nHow to Run & Expected Output:\nWrap this snippet in an HTML5 boilerplate and open in a browser. Clicking \"Full Name\" focuses the text box; clicking \"Create Account\" with empty fields triggers native validation messages.",
          "practiceExercise": "Guided Exercise:\n1. Add a Password input (<input type=\"password\" minlength=\"8\" required>) with a matching <label>.\n2. Add a Terms & Conditions checkbox (<input type=\"checkbox\" required>) with a <label>.\n\nIndependent Challenge:\nAdd a <select id=\"country\" name=\"country\"> dropdown with an initial disabled placeholder <option value=\"\">Select a country...</option> and 4 country options. Test that native validation blocks submission until a real country is chosen.\n\nHints:\n- If an <option> has value=\"\", the required attribute on <select> treats it as unselected!",
          "keyTakeaways": [
            "Always pair <label for=\"...\"> with input id=\"...\" — never use placeholder as a label",
            "Every form input needs a name attribute to be included in form submissions",
            "Use <fieldset> and <legend> to group radio buttons and related form sections",
            "Client-side HTML5 validation improves UX, but always validate again on the server"
          ]
        },
        {
          "title": "Semantic Data Tables vs. Layout Abuse",
          "duration": "1h 15m",
          "introduction": "HTML tables are designed for two-dimensional tabular data — spreadsheets, schedules, and comparison matrices. Understanding their semantic tags keeps complex data crystal clear.",
          "objectives": [
            "Structure tables properly with <caption>, <thead>, <tbody>, and <tfoot>",
            "Use <th scope=\"col\"> and <th scope=\"row\"> for screen reader navigation",
            "Merge cells cleanly with colspan and rowspan when needed",
            "Explain why HTML tables must never be used for page layouts"
          ],
          "notes": "### Anatomy of an Accessible Data Table\nA proper table uses clear structural sections:\n- **`<caption>`**: Placed immediately after `<table>`. Acts as the table's title so screen reader users know what data they are entering.\n- **`<thead>`**: Wraps the column header row(s).\n- **`<tbody>`**: Wraps the main data rows.\n- **`<tfoot>`**: Optional summary/totals row at the bottom.\n- **`<th>` vs. `<td>`**: `<th>` marks a header cell; `<td>` marks a data cell.\n\n### Why `scope` Matters\nWhen a blind user navigates down a table with a screen reader, `<th scope=\"col\">` tells the reader \"this header applies to the entire column below\", and `<th scope=\"row\">` tells it \"this header applies to the entire row across\". Without `scope`, users hear raw numbers with no context!\n\n### Why Never Use Tables for Page Layout?\nIn the 1990s, developers built entire website layouts inside giant `<table>` grids because Flexbox and CSS Grid didn't exist. Using tables for layout today causes severe problems:\n1. Screen readers announce \"row 2, column 3\" for normal navigation links and paragraphs.\n2. Tables are rigid and extremely hard to rearrange responsively on mobile screens.\n3. Always use CSS **Flexbox** and **CSS Grid** for layout, and reserve `<table>` strictly for tabular data.\n\n### Common Mistakes & Solutions\n- **Mistake**: Using `<td><strong>Price</strong></td>` instead of `<th scope=\"col\">Price</th>`.\n  - **Solution**: Always use `<th>` for headers so semantics match visual styling.",
          "codeExample": "<table>\n  <caption>Q1 Cloud Hosting Plan Comparison</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Plan</th>\n      <th scope=\"col\">Monthly Price</th>\n      <th scope=\"col\">Storage</th>\n      <th scope=\"col\">Support</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">Starter</th>\n      <td>$0</td>\n      <td>5 GB</td>\n      <td>Community</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Pro</th>\n      <td>$19</td>\n      <td>100 GB</td>\n      <td>24/7 Email</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope=\"row\" colspan=\"3\">Annual Billing Discount</th>\n      <td>20% Off</td>\n    </tr>\n  </tfoot>\n</table>",
          "codeExplanation": "1. <caption> titles the table (\"Q1 Cloud Hosting Plan Comparison\").\n2. <thead> defines four column headers with scope=\"col\".\n3. <tbody> rows use <th scope=\"row\"> for the plan name (\"Starter\", \"Pro\") so each row has a clear label.\n4. <tfoot> uses colspan=\"3\" to span the label across three columns while aligning \"20% Off\" under the fourth column.\n\nHow to Run & Expected Output:\nSave inside an HTML5 document and open in a browser. The table renders with bold centered headers and aligned rows; adding simple CSS border-collapse makes cell boundaries crisp.",
          "practiceExercise": "Guided Exercise:\n1. Build a 4-column weekly study schedule table using <caption>, <thead>, and <tbody>.\n2. Use <th scope=\"col\"> for Day, Topic, Duration, and Status.\n\nIndependent Challenge:\nAdd a <tfoot> row that calculates and displays the total study hours across the week using colspan=\"2\".\n\nHints:\n- Make sure the total column count (including colspan values) is identical in every row.",
          "keyTakeaways": [
            "Use <table> strictly for 2D tabular data, never for page layouts",
            "Always include <caption>, <thead>, and <tbody> for structure",
            "Add scope=\"col\" and scope=\"row\" to <th> elements for screen reader clarity",
            "Use colspan and rowspan carefully while keeping row cell counts consistent"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which attribute pairs an explicit <label> with a specific <input> element?",
          "options": [
            "name on <label> matching class on <input>",
            "for on <label> matching id on <input>",
            "id on <label> matching value on <input>",
            "title on <label> matching name on <input>"
          ],
          "correctAnswer": 1,
          "explanation": "The for attribute on <label> must match the id attribute of the target input to link them for screen readers and click-to-focus behavior."
        },
        {
          "question": "What happens if two radio buttons in a form have different name attributes?",
          "options": [
            "The browser refuses to render the form",
            "Both radio buttons can be selected simultaneously instead of being mutually exclusive",
            "The form automatically converts them into checkboxes",
            "Native validation marks both as invalid"
          ],
          "correctAnswer": 1,
          "explanation": "Radio buttons only act as a mutually exclusive group when they share the exact same name attribute."
        },
        {
          "question": "Which attribute on <th> helps screen readers identify whether a header labels a column or a row?",
          "options": [
            "role",
            "span",
            "scope",
            "group"
          ],
          "correctAnswer": 2,
          "explanation": "scope=\"col\" and scope=\"row\" explicitly associate <th> cells with their corresponding columns or rows."
        },
        {
          "question": "Why should HTML <table> elements never be used to build website page layouts?",
          "options": [
            "Browsers cannot render CSS inside tables",
            "Tables break screen reader navigation and are rigid on responsive mobile screens",
            "Tables are deprecated in HTML5",
            "Tables cannot contain images or links"
          ],
          "correctAnswer": 1,
          "explanation": "Tables announce row/column semantics to assistive technologies and resist responsive reflowing. Flexbox and CSS Grid should be used for layout."
        }
      ]
    },
    {
      "title": "Module 3: CSS Cascade, Specificity, Colors & Typography",
      "duration": "2h 45m",
      "objectives": [
        "Calculate CSS specificity accurately (Inline > ID > Class/Attribute/Pseudo-class > Element)",
        "Understand inheritance and the Cascade order",
        "Define reusable design tokens with CSS Custom Properties (--var)",
        "Choose between px, rem, em, and unitless line-height for accessible typography"
      ],
      "notes": "### Module Introduction\nMany developers struggle with CSS not because CSS is unpredictable, but because they haven't learned the exact algorithm the browser uses to resolve competing rules: **The Cascade** and **Specificity**.\n\n### Prerequisites\n- Completion of Modules 1 & 2 (HTML structure and semantic elements).\n\n### How the Lessons Connect\n- **Lesson 1** explains selectors, combinators, and the 3-column specificity score so you never need `!important` hacks.\n- **Lesson 2** introduces CSS Custom Properties (variables), relative units (`rem` vs `em`), and readable typography scales.\n\n### Module Summary\nYou will write predictable, modular CSS powered by low-specificity class selectors and centralized theme tokens.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Design System Typography & Theme Tokens stylesheet assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nYour team's CSS codebase is full of !important overrides, hardcoded hex colors, and unreadable tiny text on mobile. You must build a clean, token-driven typography and theme stylesheet.\n\nObjectives:\n- Establish reusable CSS Custom Properties in :root for colors, spacing, and typography.\n- Build a readable typographic hierarchy using rem units and unitless line-height.\n- Style interactive states (:hover, :focus-visible) cleanly without using !important.\n\nRequirements:\n1. Create styles.css linked from an index.html showcase page.\n2. In :root, define custom properties for --color-bg, --color-surface, --color-text, --color-accent, and --font-sans.\n3. Add a [data-theme=\"dark\"] override block that updates those CSS variables for dark mode.\n4. Style body with font-size: 1rem, line-height: 1.6, and max-width: 65ch on main article prose.\n5. Style buttons and links with distinct :hover and :focus-visible outlines (never remove focus outlines without replacing them).\n6. Zero !important declarations anywhere in styles.css.\n\nStep-by-Step Instructions:\n1. Set up index.html with sample headings (h1-h3), paragraphs, links, and two buttons (.btn-primary, .btn-secondary).\n2. Create styles.css and define :root design tokens first.\n3. Apply low-specificity class selectors and verify in DevTools Computed tab which rules win.\n4. Temporarily add data-theme=\"dark\" to <html> in DevTools to verify your theme tokens switch seamlessly.\n\nDeliverables:\n- index.html and styles.css demonstrating token-based theming and accessible typography.\n\nEvaluation Criteria:\n- Zero !important rules.\n- Typography scales cleanly when root browser font size changes (using rem).\n- High contrast and clear keyboard :focus-visible rings.",
      "lessons": [
        {
          "title": "Selectors, Specificity & The Cascade",
          "duration": "1h 20m",
          "introduction": "Have you ever written a CSS rule, refreshed the page, and wondered why nothing changed? The answer is almost always Specificity or Cascade order.",
          "objectives": [
            "Use element, class, ID, attribute, and pseudo-class selectors effectively",
            "Compute the 3-part specificity tuple (IDs, Classes, Elements)",
            "Understand how source order and inheritance affect final styles",
            "Avoid !important and overly deep selector chains"
          ],
          "notes": "### How the Browser Picks a Winning Style\nWhen multiple CSS rules target the same element and set the same property (e.g., `color`), the browser resolves the conflict in three stages:\n1. **Importance / Origin**: Inline styles (`style=\"...\"`) beat author stylesheets; `!important` overrides normal rules (avoid it except for utility overrides).\n2. **Specificity**: Calculated as a 3-number score `(A, B, C)`:\n   - **A (IDs)**: `#header` adds `(1, 0, 0)`.\n   - **B (Classes, Attributes, Pseudo-classes)**: `.btn`, `[type=\"email\"]`, `:hover` each add `(0, 1, 0)`.\n   - **C (Elements, Pseudo-elements)**: `p`, `h1`, `::before` each add `(0, 0, 1)`.\n   - The universal selector `*` and combinators (`>`, `+`, `~`) add `(0, 0, 0)`.\n3. **Source Order**: If two selectors have the *exact same* specificity, the rule written **later** in the CSS wins.\n\n### Example Comparison\n- `#nav .link` -> `(1, 1, 0)`\n- `header nav ul li a.link` -> `(0, 1, 5)`\nEven though the second selector lists 6 parts, `(1, 1, 0)` beats `(0, 1, 5)` because 1 ID beats any number of classes or elements!\n\n### Inheritance\nNot all properties inherit from parent to child:\n- **Inherited by default**: Typography & text properties (`color`, `font-family`, `font-size`, `line-height`, `text-align`).\n- **NOT inherited by default**: Box/layout properties (`border`, `padding`, `margin`, `background`, `width`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Styling with IDs like `#card-title` and then struggling to override it with a modifier class `.highlight`.\n  - **Solution**: Keep specificity flat! Style components with single classes (`.card-title`) so a modifier class later in the file (`.card-title.is-featured`) overrides cleanly.",
          "codeExample": "/* Specificity: (0, 0, 1) */\nbutton {\n  background-color: #e5e7eb;\n  color: #111827;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 0.5rem;\n}\n\n/* Specificity: (0, 1, 0) - Beats element selector */\n.btn-primary {\n  background-color: #ff8c42;\n  color: #ffffff;\n}\n\n/* Specificity: (0, 2, 0) - Beats single class */\n.btn-primary:hover {\n  background-color: #e0722b;\n}\n\n/* Accessible keyboard focus ring */\n.btn-primary:focus-visible {\n  outline: 3px solid #1c1c1c;\n  outline-offset: 2px;\n}",
          "codeExplanation": "1. Base button sets sensible defaults with specificity (0, 0, 1).\n2. .btn-primary has specificity (0, 1, 0), overriding the gray background cleanly.\n3. .btn-primary:hover combines a class + pseudo-class for (0, 2, 0).\n4. :focus-visible applies a high-contrast outline only for keyboard Tab navigation, not mouse clicks.\n\nHow to Run & Expected Output:\nLink this CSS to an HTML page with <button class=\"btn-primary\">Save</button>. Hovering darkens the orange button; pressing Tab highlights it with a crisp dark outline.",
          "practiceExercise": "Guided Exercise:\n1. Write two competing rules targeting <p class=\"lead\" id=\"intro\">: one using #intro and one using .lead.intro. Predict which wins before checking in Chrome DevTools.\n\nIndependent Challenge:\nRefactor a deeply nested selector like body main section.hero div.cta a.button into a clean single-class selector .hero-cta without breaking styling.\n\nHints:\n- In Chrome DevTools Styles pane, crossed-out rules show lower specificity or earlier source order.",
          "keyTakeaways": [
            "Specificity is compared left-to-right: IDs > Classes/Pseudo-classes > Elements",
            "When specificity is equal, the rule appearing later in the CSS wins",
            "Typography properties inherit; borders, padding, and margins do not",
            "Prefer flat class selectors over IDs and !important for maintainable CSS"
          ]
        },
        {
          "title": "CSS Custom Properties, Units (px, rem, em) & Typography",
          "duration": "1h 25m",
          "introduction": "Hardcoding pixel sizes and hex codes across hundreds of lines makes theming painful. CSS variables and relative units solve both problems natively.",
          "objectives": [
            "Declare and consume CSS Custom Properties (--token) with fallback values",
            "Contrast px, rem, and em and know when to use each",
            "Set accessible line-height and optimal reading line length (ch)",
            "Implement instant Light/Dark theme switching with variables"
          ],
          "notes": "### CSS Custom Properties (Variables)\nDefined with a double dash inside `:root` (the `<html>` element):\n```css\n:root {\n  --color-brand: #ff8c42;\n  --space-md: 1rem;\n}\n.badge {\n  background: var(--color-brand, orange);\n}\n```\nUnlike Sass variables, CSS custom properties **live in the DOM at runtime**. Changing `--color-brand` inside a media query or `[data-theme=\"dark\"]` immediately updates every element using it!\n\n### Units: `px` vs `rem` vs `em`\n- **`px`**: Fixed physical CSS pixels. If a user increases their browser's default font size from 16px to 24px for readability, `font-size: 16px` **ignores their preference**. Use `px` sparingly (e.g., `1px` borders).\n- **`rem` (Root EM)**: Relative to the `<html>` root font size (usually 16px by default, so `1.5rem = 24px`). Respects user accessibility zoom settings and stays consistent everywhere on the page. **Best choice for font sizes, padding, and spacing.**\n- **`em`**: Relative to the *current element's* font size. Great when you want button padding (`0.5em 1em`) to scale proportionally if you make a button's font larger. Can compound unexpectedly when nested!\n\n### Readable Typography Rules\n- **Line height**: Always use a **unitless** multiplier like `line-height: 1.6` for body text and `1.2` for large headings. Unitless values scale cleanly if a child changes font size.\n- **Measure (Line Length)**: Set `max-width: 65ch` on long-form paragraphs so lines stay 55–75 characters wide — far easier for the eye to track.\n\n### Common Mistakes & Solutions\n- **Mistake**: Setting `html { font-size: 62.5%; }` blindly without resetting `body { font-size: 1.6rem; }`, shrinking third-party components.\n  - **Solution**: Keep the default `1rem = 16px` and use intuitive `rem` values (`0.875rem`, `1rem`, `1.25rem`, `2rem`).",
          "codeExample": ":root {\n  --bg: #fdfbf7;\n  --text: #1c1c1c;\n  --muted: #5a5a5a;\n  --accent: #ff8c42;\n}\n\n[data-theme=\"dark\"] {\n  --bg: #141414;\n  --text: #f4f0ea;\n  --muted: #b0aba3;\n}\n\nbody {\n  background-color: var(--bg);\n  color: var(--text);\n  font-family: system-ui, -apple-system, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6;\n  margin: 0;\n  padding: 2rem;\n}\n\n.article-body {\n  max-width: 65ch;\n}\n\n.article-body h1 {\n  font-size: clamp(1.75rem, 3vw, 2.5rem);\n  line-height: 1.2;\n  margin-bottom: 1rem;\n}",
          "codeExplanation": "1. :root defines global light-mode color tokens; [data-theme=\"dark\"] swaps them when that attribute is present on <html>.\n2. body uses system-ui for fast native font rendering, font-size: 1rem (respecting user zoom), and unitless line-height: 1.6.\n3. max-width: 65ch caps paragraph width at ~65 characters for comfortable reading.\n4. clamp() smoothly scales the h1 size between 1.75rem and 2.5rem based on viewport width.\n\nHow to Run & Expected Output:\nApply to an HTML article. Changing <html lang=\"en\"> to <html lang=\"en\" data-theme=\"dark\"> flips the entire page theme instantly.",
          "practiceExercise": "Guided Exercise:\n1. Create a :root palette with 4 color variables and apply them to a card component.\n2. Wrap an article inside a .prose class with max-width: 65ch and line-height: 1.65.\n\nIndependent Challenge:\nChange your browser's default font size setting to \"Large\" (or set html { font-size: 20px }) and observe how rem-based text and spacing scale together while px elements stay rigid.\n\nHints:\n- Use var(--token, fallback) if a variable might be overridden conditionally.",
          "keyTakeaways": [
            "CSS Custom Properties live in the DOM and enable effortless theming",
            "Use rem for accessible font sizes and layout spacing; avoid px for body text",
            "Use unitless line-height (1.5-1.7 for body, 1.15-1.25 for headings)",
            "Cap long-form prose width around 60ch-70ch for comfortable reading"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which CSS selector has the highest specificity?",
          "options": [
            "header nav ul li a",
            ".navbar .nav-item .nav-link:hover",
            "#main-nav a",
            "body > main > section > p"
          ],
          "correctAnswer": 2,
          "explanation": "#main-nav a has 1 ID selector (1, 0, 1), which outranks any combination of classes, pseudo-classes, or element selectors."
        },
        {
          "question": "Which CSS property is inherited by child elements by default?",
          "options": [
            "border",
            "padding",
            "color",
            "margin"
          ],
          "correctAnswer": 2,
          "explanation": "Text and typography properties like color, font-family, and line-height inherit automatically; box properties like border, padding, and margin do not."
        },
        {
          "question": "Why is rem preferred over px for font-size?",
          "options": [
            "rem loads faster in the browser",
            "rem respects the user’s root browser font-size accessibility preferences",
            "px does not work in Flexbox",
            "rem automatically centers text"
          ],
          "correctAnswer": 1,
          "explanation": "rem scales relative to the root <html> font size, honoring user zoom and browser accessibility settings, whereas px overrides them."
        },
        {
          "question": "What is the main advantage of CSS Custom Properties (--accent) over preprocessor variables?",
          "options": [
            "They only work in Internet Explorer",
            "They exist in the live DOM and can change dynamically at runtime (e.g., dark mode or media queries)",
            "They require a build step to compile",
            "They automatically increase specificity"
          ],
          "correctAnswer": 1,
          "explanation": "Because CSS custom properties are native browser variables in the DOM, updating them on :root or [data-theme=\"dark\"] updates the UI live without recompiling."
        }
      ]
    },
    {
      "title": "Module 4: The CSS Box Model, Positioning & Stacking Contexts",
      "duration": "2h 30m",
      "objectives": [
        "Calculate element dimensions using content, padding, border, and margin",
        "Explain why box-sizing: border-box is a universal best practice",
        "Predict vertical margin collapse and center elements with margin-inline: auto",
        "Use relative, absolute, fixed, and sticky positioning and control z-index stacking contexts"
      ],
      "notes": "### Module Introduction\nEvery HTML element rendered on screen is a rectangular box. Mastering how boxes calculate their dimensions, space themselves apart, and layer above or below one another removes 90% of CSS layout surprises.\n\n### Prerequisites\n- Completion of Module 3 (CSS selectors, specificity, and units).\n\n### How the Lessons Connect\n- **Lesson 1** breaks down the Box Model, `box-sizing: border-box`, and vertical margin collapse.\n- **Lesson 2** takes elements out of normal document flow with `position` and demystifies `z-index` stacking contexts.\n\n### Module Summary\nYou will control exact element sizing without overflow bugs, build sticky headers and floating badges, and debug `z-index` layering issues confidently.\n\n### Completion Criteria\n- Complete both lessons and hands-on Box Model / Positioning exercises.\n- Deliver the Product Card with Floating Badge & Sticky Header assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nAn e-commerce product showcase needs a sticky top navigation bar and product cards featuring a \"NEW\" corner badge. Currently, adding padding breaks card widths and the corner badge floats at the top-right of the browser window instead of the card.\n\nObjectives:\n- Apply box-sizing: border-box globally to prevent width overflow.\n- Anchor an absolutely positioned badge inside a relatively positioned card.\n- Implement a sticky header that remains visible while scrolling and stays above cards via z-index.\n\nRequirements:\n1. Create index.html and styles.css with the universal border-box reset: *, *::before, *::after { box-sizing: border-box; }.\n2. Build a <header class=\"site-header\"> with position: sticky; top: 0; and z-index: 100.\n3. Build a 3-card section where each .product-card has position: relative, padding: 1.5rem, and border: 2px solid.\n4. Inside one card, add <span class=\"badge\">NEW</span> with position: absolute; top: 1rem; right: 1rem;.\n5. Ensure long content scrolls cleanly beneath the sticky header without the badge bleeding above the header.\n\nStep-by-Step Instructions:\n1. Apply the border-box reset at the top of styles.css.\n2. Create the sticky header and give the page enough vertical content (min-height: 200vh or multiple sections) to test scrolling.\n3. Style .product-card with position: relative and place .badge inside it.\n4. Verify in DevTools Box Model diagram that total card width equals the declared width even with padding and border.\n\nDeliverables:\n- Working index.html and styles.css.\n\nEvaluation Criteria:\n- Badge stays pinned to its parent card's top-right corner, not the viewport.\n- Sticky header stays above scrolling cards (z-index works cleanly).\n- Zero horizontal scrollbar caused by padding + width.",
      "lessons": [
        {
          "title": "Box Model, Margin Collapse & border-box",
          "duration": "1h 15m",
          "introduction": "Why does a 300px-wide box with 20px padding suddenly become 340px wide and break your layout? The CSS Box Model explains why.",
          "objectives": [
            "Identify the four layers of the Box Model: content, padding, border, margin",
            "Contrast content-box (default) with border-box",
            "Understand vertical margin collapse between adjacent block elements",
            "Compare block, inline, and inline-block display behavior"
          ],
          "notes": "### The Four Layers of Every Box\nFrom inside out:\n1. **Content**: Your text or image (`width` / `height`).\n2. **Padding**: Transparent breathing room *inside* the border (shows the element's `background`).\n3. **Border**: The visible frame around padding and content.\n4. **Margin**: Transparent space *outside* the border separating this box from neighbors.\n\n### `content-box` vs `border-box`\nBy default, CSS uses `box-sizing: content-box`. That means `width: 300px; padding: 20px; border: 5px solid;` produces a box that is actually **350px wide** (`300 + 20*2 + 5*2`).\nWith `box-sizing: border-box`, `width: 300px` includes content + padding + border — the box stays **exactly 300px wide**! That is why almost every modern CSS reset begins with:\n```css\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n```\n\n### Vertical Margin Collapse\nWhen two vertical block elements meet — say an `<h2>` with `margin-bottom: 24px` followed by a `<p>` with `margin-top: 16px` — the margins **do not add up to 40px**. Instead, they collapse into the larger of the two (**24px**). Note that horizontal margins never collapse, and margins inside **Flexbox** or **Grid** containers never collapse either.\n\n### `block` vs `inline` vs `inline-block`\n- **`block`** (`div`, `p`, `h1`): Starts on a new line, stretches full width, respects `width`, `height`, and all margins/padding.\n- **`inline`** (`span`, `a`, `strong`): Flows inside text, **ignores `width`, `height`, and top/bottom margins**.\n- **`inline-block`**: Flows inline like text, yet respects `width`, `height`, and vertical padding/margins.",
          "codeExample": "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.box-demo {\n  width: 320px;\n  padding: 1.5rem;\n  border: 4px solid #1c1c1c;\n  margin: 2rem auto;\n  background-color: #fdfbf7;\n  border-radius: 0.75rem;\n}\n\n.pill-link {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  margin-top: 1rem;\n  background-color: #ff8c42;\n  color: #ffffff;\n  text-decoration: none;\n  border-radius: 999px;\n}",
          "codeExplanation": "1. The universal border-box rule guarantees .box-demo stays 320px wide total, including its 1.5rem padding and 4px border.\n2. margin: 2rem auto centers the fixed-width block horizontally with 2rem top/bottom spacing.\n3. .pill-link uses display: inline-block so the <a> tag respects top margin and vertical padding without pushing other inline links onto a new line unnecessarily.\n\nHow to Run & Expected Output:\nOpen in Chrome DevTools -> Computed tab to inspect the visual Box Model diagram and confirm the total rendered width is 320px.",
          "practiceExercise": "Guided Exercise:\n1. Create two divs of width: 300px with padding: 24px and border: 4px solid. Give one box-sizing: content-box and the other border-box, then compare their visual widths.\n\nIndependent Challenge:\nPlace two paragraphs stacked vertically with margin-bottom: 30px and margin-top: 20px, and measure the actual gap in DevTools (it will be 30px, not 50px).\n\nHints:\n- Using display: flex; flex-direction: column; gap: 1rem; avoids margin collapse altogether.",
          "keyTakeaways": [
            "Always include *, *::before, *::after { box-sizing: border-box; } in your base CSS",
            "Padding sits inside the border (with background); margin sits outside the border",
            "Adjacent vertical block margins collapse to the larger value",
            "Inline elements ignore width, height, and vertical margins"
          ]
        },
        {
          "title": "CSS Positioning: Relative, Absolute, Fixed & Sticky",
          "duration": "1h 15m",
          "introduction": "Normal document flow stacks blocks top to bottom. CSS positioning lets you pin navbars, anchor notification badges, and layer modals predictably.",
          "objectives": [
            "Distinguish static, relative, absolute, fixed, and sticky positioning",
            "Anchor position: absolute children to a position: relative parent",
            "Understand why position: sticky fails when ancestors use overflow: hidden",
            "Control layering with z-index and recognize stacking contexts"
          ],
          "notes": "### The 5 Position Values\n1. **`static`** (default): Follows normal document flow; `top`/`left`/`z-index` have no effect.\n2. **`relative`**: Stays in normal flow, can be nudged with `top`/`left`, and — most importantly — **creates a positioning anchor** for `absolute` children inside it.\n3. **`absolute`**: Removed from normal flow (takes zero space). Positions itself relative to the **nearest ancestor with `position` other than `static`** (or the viewport if none exists).\n4. **`fixed`**: Removed from normal flow and pinned to the **browser viewport** (stays put during scroll, ideal for modals and floating chat buttons).\n5. **`sticky`**: Acts like `relative` until the user scrolls past a threshold (e.g., `top: 0`), then sticks like `fixed` inside its parent container.\n\n### Why `position: sticky` Sometimes Fails\n- Missing a threshold (`top: 0` is required!).\n- An ancestor element has `overflow: hidden` or `overflow: auto`, which traps the sticky container. Use `overflow-x: clip` instead if you only need to hide horizontal overflow.\n\n### Stacking Contexts & `z-index`\n`z-index` only works on positioned elements (or flex/grid items). Furthermore, `z-index` is **scoped to its stacking context**: if Parent A has `z-index: 1` and Parent B has `z-index: 2`, a child inside Parent A with `z-index: 9999` will **still appear behind** Parent B!",
          "codeExample": ".sticky-nav {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  background: rgba(253, 251, 247, 0.95);\n  border-bottom: 1px solid #eae6df;\n  padding: 1rem 2rem;\n}\n\n.card {\n  position: relative;\n  padding: 2rem;\n  border: 1px solid #eae6df;\n  border-radius: 1rem;\n  background: #ffffff;\n}\n\n.card-badge {\n  position: absolute;\n  top: 0.75rem;\n  right: 0.75rem;\n  background: #ff8c42;\n  color: #ffffff;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n}",
          "codeExplanation": "1. .sticky-nav sticks to the top edge (top: 0) as the user scrolls, staying above cards via z-index: 50.\n2. .card sets position: relative so it becomes the coordinate origin for .card-badge.\n3. .card-badge uses position: absolute with top and right offsets to float neatly in the card's top-right corner.\n\nHow to Run & Expected Output:\nRender a page with .sticky-nav and several .card blocks inside a tall body. Scrolling keeps the navbar pinned at the top while card badges stay anchored to their respective cards.",
          "practiceExercise": "Guided Exercise:\n1. Create a .card with a .badge inside it. Remove position: relative from .card and observe where the badge jumps (to the viewport corner!). Restore position: relative.\n\nIndependent Challenge:\nBuild a centered modal overlay using position: fixed; inset: 0; with a backdrop and z-index: 1000 so it covers even sticky headers.\n\nHints:\n- inset: 0 is modern shorthand for top: 0; right: 0; bottom: 0; left: 0;.",
          "keyTakeaways": [
            "position: absolute anchors to the nearest non-static ancestor",
            "position: sticky requires a threshold (such as top: 0) and fails if an ancestor has overflow: hidden",
            "position: fixed pins elements to the viewport regardless of scroll",
            "z-index only compares elements within the same stacking context"
          ]
        }
      ],
      "quiz": [
        {
          "question": "With box-sizing: border-box, what is the total rendered width of an element with width: 200px, padding: 20px, and border: 5px solid?",
          "options": [
            "250px",
            "240px",
            "200px",
            "210px"
          ],
          "correctAnswer": 2,
          "explanation": "border-box includes content, padding, and border inside the declared width, so the total rendered width remains 200px."
        },
        {
          "question": "Two stacked paragraphs have margin-bottom: 30px on the first and margin-top: 20px on the second. How much vertical space appears between them?",
          "options": [
            "50px",
            "30px",
            "20px",
            "10px"
          ],
          "correctAnswer": 1,
          "explanation": "Adjacent vertical block margins collapse to the larger of the two values (30px) rather than adding together."
        },
        {
          "question": "To keep an absolutely positioned badge pinned inside a card rather than the browser window, what must the card have?",
          "options": [
            "display: block",
            "position: relative (or any non-static position)",
            "z-index: 10",
            "float: left"
          ],
          "correctAnswer": 1,
          "explanation": "An absolute element positions itself relative to the nearest ancestor with a non-static position."
        },
        {
          "question": "What is a common reason position: sticky stops sticking?",
          "options": [
            "The element has a background color",
            "An ancestor element has overflow: hidden or no top/bottom offset was set",
            "The element uses border-box",
            "The page uses Semantic HTML5 tags"
          ],
          "correctAnswer": 1,
          "explanation": "Sticky positioning requires a threshold (like top: 0) and is broken if a parent container sets overflow: hidden/auto."
        }
      ]
    },
    {
      "title": "Module 5: Modern Layouts with Flexbox & CSS Grid",
      "duration": "3h 00m",
      "objectives": [
        "Align and distribute items along main and cross axes using Flexbox",
        "Use flex-wrap, flex: 1, and gap cleanly without margin hacks",
        "Build two-dimensional page and card layouts with CSS Grid (fr, repeat, minmax)",
        "Create zero-media-query responsive grids with auto-fit and minmax()"
      ],
      "notes": "### Module Introduction\nModern CSS layouts rely on two complementary superpowers: **Flexbox** (one-dimensional rows or columns) and **CSS Grid** (two-dimensional rows *and* columns simultaneously). Together, they replace fragile floats and table hacks completely.\n\n### Prerequisites\n- Completion of Module 4 (Box Model, border-box, sizing).\n\n### How the Lessons Connect\n- **Lesson 1** teaches Flexbox's main/cross axes, alignment, wrapping, and sizing (`flex: 1`).\n- **Lesson 2** teaches CSS Grid tracks, `fr` units, `grid-template-areas`, and responsive `auto-fit` card grids.\n\n### Module Summary\nYou will know exactly when to choose Flexbox vs. Grid and how to combine them into clean, responsive interfaces.\n\n### Completion Criteria\n- Complete both lessons and hands-on layout exercises.\n- Deliver the Responsive Dashboard Shell & Card Grid assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild a responsive SaaS Dashboard Shell featuring a navigation header, a sidebar + main content area, and a responsive project card grid that adapts automatically from 1 column on mobile to 3 columns on desktop.\n\nObjectives:\n- Combine Flexbox (1D navigation/card internals) with CSS Grid (2D page layout and card grid).\n- Eliminate brittle margin spacing by using gap.\n\nRequirements:\n1. Build the top navbar using display: flex, justify-content: space-between, and align-items: center.\n2. Build the outer dashboard shell using CSS Grid (grid-template-columns: 240px 1fr on desktop, collapsing to 1fr on mobile).\n3. Inside <main>, build a .card-grid using display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;.\n4. Inside each card, use display: flex; flex-direction: column; and flex: 1 on the card description so all card action buttons align cleanly at the bottom regardless of text length.\n\nStep-by-Step Instructions:\n1. Create dashboard.html with header, aside (sidebar), and main containing 6 cards of varying description lengths.\n2. Style the navbar with Flexbox first.\n3. Add the outer Grid shell and responsive card grid.\n4. Resize the browser window from 1280px down to 375px and verify zero horizontal overflow.\n\nDeliverables:\n- dashboard.html and styles.css.\n\nEvaluation Criteria:\n- Buttons inside cards align horizontally across each row even when descriptions have different line counts.\n- Card grid wraps smoothly without overlapping or overflowing on 375px screens.",
      "lessons": [
        {
          "title": "Flexbox Mastery: Axes, Wrapping & Alignment",
          "duration": "1h 30m",
          "introduction": "Flexbox is designed for one-dimensional layouts — a row of navbar links, a stack of form fields, or a centered hero button group.",
          "objectives": [
            "Distinguish the Main Axis and Cross Axis when flex-direction changes",
            "Align items with justify-content and align-items",
            "Prevent squished items using flex-wrap: wrap and gap",
            "Understand flex: 1 (flex-grow, flex-shrink, flex-basis)"
          ],
          "notes": "### The Golden Rule of Flexbox: Two Axes\nWhen you set `display: flex` on a parent container:\n- **Main Axis** (controlled by `justify-content`): Horizontal (`row`, default) or Vertical (`column`).\n- **Cross Axis** (controlled by `align-items`): Perpendicular to the main axis.\n*(If you switch `flex-direction: column`, `justify-content` now controls vertical spacing and `align-items` controls horizontal alignment!)*\n\n### Essential Container Properties\n- `gap: 1rem;`: Adds clean space *between* flex children without adding extra outer margin on the edges.\n- `flex-wrap: wrap;`: Allows items to wrap onto a new line when space runs out instead of shrinking awkwardly or overflowing.\n- `justify-content: space-between | center | flex-start | flex-end`\n- `align-items: center | stretch | flex-start`\n\n### Essential Child Properties (`flex: 1`)\n`flex: 1` is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`. It tells a flex child: \"grow to fill any leftover space equally.\" Using `flex: 1` on a card's body paragraph pushes the card's footer/button straight to the bottom!\n\n### Common Mistakes & Solutions\n- **Mistake**: Forgetting `min-width: 0` on a flex child containing a long `<pre>` code block or long URL, causing the flex item to push past the screen width.\n  - **Solution**: Add `min-width: 0` on flex children that hold scrollable code blocks or truncated text.",
          "codeExample": ".navbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  background: #ffffff;\n  border-bottom: 1px solid #eae6df;\n}\n\n.nav-links {\n  display: flex;\n  gap: 1.25rem;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.feature-card {\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  border: 1px solid #eae6df;\n  border-radius: 1rem;\n}\n\n.feature-card p {\n  flex: 1;\n}",
          "codeExplanation": "1. .navbar uses space-between and align-items: center to pin the logo left and links right, while flex-wrap: wrap ensures links wrap cleanly on narrow phones.\n2. .nav-links is itself a nested flex container spacing list items evenly with gap.\n3. .feature-card uses flex-direction: column and flex: 1 on its paragraph so any button placed after <p> always aligns at the bottom of the card.\n\nHow to Run & Expected Output:\nApply to a header and a card with a short or long paragraph + button. Resize the browser to see navbar links wrap without overflowing.",
          "practiceExercise": "Guided Exercise:\n1. Center a login card both horizontally and vertically inside a 100vh container using display: flex, justify-content: center, and align-items: center.\n\nIndependent Challenge:\nBuild a tag cloud of 10 skill pills using display: flex; flex-wrap: wrap; gap: 0.5rem;.\n\nHints:\n- Remember gap works in both row and column directions.",
          "keyTakeaways": [
            "justify-content aligns along the Main Axis; align-items aligns along the Cross Axis",
            "Use gap instead of child margins to avoid edge-spacing bugs",
            "Use flex-wrap: wrap so horizontal rows wrap gracefully on mobile screens",
            "flex: 1 lets a child expand to consume remaining space"
          ]
        },
        {
          "title": "CSS Grid: 2D Layouts, Areas & Auto-Fit Magic",
          "duration": "1h 30m",
          "introduction": "While Flexbox excels along a single line, CSS Grid controls both rows and columns at once — making full-page layouts and responsive card grids remarkably concise.",
          "objectives": [
            "Define rows and columns using fr units and repeat()",
            "Build intrinsic responsive grids with repeat(auto-fit, minmax(260px, 1fr))",
            "Name layout regions cleanly with grid-template-areas",
            "Decide clearly when to use Flexbox vs. CSS Grid"
          ],
          "notes": "### Flexbox vs. CSS Grid: Which One?\n- **Use Flexbox** when content size should drive a 1D row or column (navbars, button groups, icon + text alignment).\n- **Use CSS Grid** when you want to impose a structured 2D grid (card galleries, dashboards, magazine layouts).\n\n### The `fr` Unit\n`1fr` means \"one fraction of the remaining available space\" after fixed tracks and `gap` are subtracted. For example:\n`grid-template-columns: 240px 1fr;` gives a fixed 240px sidebar and stretches the main area across all remaining width without needing `calc()`.\n\n### Responsive Grid Without Media Queries\nThis one line is one of the most useful patterns in modern CSS:\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));\n  gap: 1.5rem;\n}\n```\nNotice `min(100%, 260px)`: it guarantees that even on a super-narrow 240px viewport, a column never overflows 100% width, while on wider screens it fits as many 260px+ columns as possible and stretches them evenly!\n\n### `grid-template-areas`\nFor page shells, you can draw an ASCII map right in CSS:\n```css\ngrid-template-areas:\n  \"header header\"\n  \"sidebar main\"\n  \"footer footer\";\n```\nAnd assign children with `grid-area: sidebar;`.",
          "codeExample": ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));\n  gap: 1.5rem;\n}\n\n.page-shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n  min-height: 100vh;\n  gap: 1rem;\n}\n\n.page-header { grid-area: header; }\n.page-sidebar { grid-area: sidebar; }\n.page-main { grid-area: main; min-width: 0; }\n.page-footer { grid-area: footer; }",
          "codeExplanation": "1. .card-grid automatically adjusts column count (1, 2, 3, 4+) based on container width with zero media queries.\n2. min(100%, 260px) prevents horizontal overflow on screens narrower than 260px.\n3. .page-shell defines a full-viewport 2D layout using readable grid-template-areas and min-height: 100vh.\n4. min-width: 0 on .page-main ensures wide code blocks inside main don't blow out the 1fr track.\n\nHow to Run & Expected Output:\nWrap 6 card elements in .card-grid and resize the browser window. Cards smoothly reflow from 3 columns to 2 columns to 1 column.",
          "practiceExercise": "Guided Exercise:\n1. Build a 6-card gallery using .card-grid with repeat(auto-fit, minmax(min(100%, 240px), 1fr)).\n\nIndependent Challenge:\nMake one featured card span two columns on wider screens using grid-column: span 2; inside a @media (min-width: 768px) rule.\n\nHints:\n- Remember grid items stretch to equal row height automatically (align-items: stretch is the default).",
          "keyTakeaways": [
            "Use CSS Grid for 2D layouts and Flexbox for 1D alignment",
            "fr units distribute leftover space after fixed sizes and gaps are subtracted",
            "repeat(auto-fit, minmax(min(100%, 260px), 1fr)) builds fluid responsive grids cleanly",
            "grid-template-areas makes page-level regions easy to read and rearrange on mobile"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When flex-direction is changed to column, which property aligns items horizontally?",
          "options": [
            "justify-content",
            "align-items",
            "flex-wrap",
            "gap"
          ],
          "correctAnswer": 1,
          "explanation": "Changing flex-direction to column rotates the Main Axis vertically, so align-items (Cross Axis) now controls horizontal alignment."
        },
        {
          "question": "What does repeat(auto-fit, minmax(260px, 1fr)) achieve in CSS Grid?",
          "options": [
            "Locks the grid to 2 columns on all screens",
            "Automatically fits as many 260px+ columns as space allows and stretches them equally",
            "Centers a single column vertically",
            "Hides overflowing cards off-screen"
          ],
          "correctAnswer": 1,
          "explanation": "auto-fit + minmax() dynamically computes how many 260px columns fit in the container and distributes extra space equally via 1fr."
        },
        {
          "question": "Which property adds spacing strictly between flex or grid items without adding outer margins?",
          "options": [
            "padding",
            "margin-inline",
            "gap",
            "border-spacing"
          ],
          "correctAnswer": 2,
          "explanation": "gap inserts space only between adjacent tracks/items, avoiding awkward extra margins on container edges."
        },
        {
          "question": "When is Flexbox usually a better choice than CSS Grid?",
          "options": [
            "When building a full 2D page shell with header, sidebar, main, and footer",
            "When aligning a single row of navbar links or centering a button icon",
            "When creating a 12-column magazine layout",
            "When overlapping items across multiple rows and columns"
          ],
          "correctAnswer": 1,
          "explanation": "Flexbox excels at 1D content-driven alignment (rows of links, button groups), whereas Grid excels at 2D structural layouts."
        }
      ]
    },
    {
      "title": "Module 6: Responsive Design, Fluid Typography & CSS Motion",
      "duration": "2h 45m",
      "objectives": [
        "Write mobile-first CSS using min-width media queries",
        "Create fluid typography and spacing with CSS clamp()",
        "Animate UI states smoothly using GPU-friendly transform and opacity transitions",
        "Respect user accessibility preferences with prefers-reduced-motion"
      ],
      "notes": "### Module Introduction\nA modern site must feel crisp on a 375px smartphone, an 800px tablet, and a 1440px desktop monitor — while delivering subtle, accessible motion that never triggers motion sickness or layout jank.\n\n### Prerequisites\n- Completion of Modules 1–5 (HTML5, Specificity, Box Model, Flexbox, and CSS Grid).\n\n### How the Lessons Connect\n- **Lesson 1** covers mobile-first media queries, breakpoint strategy, and fluid `clamp()` sizing.\n- **Lesson 2** teaches smooth `transition` and `@keyframes` animations, compositor performance, and `prefers-reduced-motion`.\n\n### Module Summary\nYou now have all the skills needed to architect complete, accessible, responsive web interfaces from scratch.\n\n### Completion Criteria\n- Complete both lessons and hands-on responsive/motion exercises.\n- Deliver the Capstone Responsive Portfolio Hero & Interactive Card Showcase assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild the flagship Responsive Portfolio Hero & Project Showcase section for your Developer Portfolio. It must adapt cleanly from 375px mobile up to 1440px desktop and include smooth, accessible hover/entrance animations.\n\nObjectives:\n- Apply mobile-first media queries (min-width) rather than overriding desktop styles down.\n- Scale hero typography smoothly using clamp().\n- Implement performant hover transitions and respect prefers-reduced-motion.\n\nRequirements:\n1. Build portfolio.html and styles.css with a mobile-first layout (single-column stack by default).\n2. Add a @media (min-width: 768px) breakpoint that switches the hero layout to a 2-column Grid/Flex split.\n3. Style the hero <h1> with clamp(2rem, 4vw + 1rem, 3.75rem).\n4. Add a 3-card project showcase with smooth transform: translateY(-4px) and box-shadow transitions on hover.\n5. Wrap animations/transitions in @media (prefers-reduced-motion: reduce) to disable motion for users who opt out.\n\nStep-by-Step Instructions:\n1. Write base mobile styles first and test at 375px width in DevTools Device Toolbar.\n2. Add the 768px and 1024px min-width media queries.\n3. Add hover transitions strictly on transform and opacity/box-shadow (never animate width or top/left).\n4. Test prefers-reduced-motion emulation in Chrome DevTools -> Rendering panel.\n\nDeliverables:\n- portfolio.html and styles.css.\n\nEvaluation Criteria:\n- Zero horizontal scroll at 375px, 768px, and 1440px.\n- Smooth 60fps hover transitions on cards/buttons.\n- Reduced-motion media query properly disables animations.",
      "lessons": [
        {
          "title": "Mobile-First Media Queries & Fluid clamp()",
          "duration": "1h 20m",
          "introduction": "Designing for desktop first and trying to cram everything onto a phone later leads to messy CSS overrides. Mobile-first CSS flips that workflow.",
          "objectives": [
            "Write clean mobile-first styles using @media (min-width: ...)",
            "Choose content-driven breakpoints instead of memorizing device widths",
            "Scale headings and padding smoothly with clamp(min, preferred, max)",
            "Prevent horizontal overflow with max-width: 100% on media"
          ],
          "notes": "### Why Mobile-First Wins\nIn a **mobile-first** stylesheet:\n- Base rules (no media query) target narrow screens: single column, comfortable touch targets, readable text.\n- `@media (min-width: 48rem)` (768px) progressively enhances into multi-column grids when extra screen width exists.\nThis means mobile phones download and parse simpler base rules without undoing desktop layouts!\n\n### Fluid Sizing with `clamp()`\nInstead of writing 4 separate media queries to resize an `<h1>`, use:\n```css\nh1 {\n  font-size: clamp(2rem, 4vw + 1rem, 3.75rem);\n}\n```\n- **Minimum (`2rem`)**: Never shrinks smaller than 32px on tiny phones.\n- **Preferred (`4vw + 1rem`)**: Grows smoothly with viewport width (including `1rem` so browser zoom still works!).\n- **Maximum (`3.75rem`)**: Caps at 60px on ultrawide monitors.\n\n### Preventing Accidental Mobile Horizontal Scroll\nAlways add this defensive rule to your CSS reset:\n```css\nimg, picture, video, svg {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n```",
          "codeExample": "img, svg, video {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n\n.hero {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2rem;\n  padding: clamp(2rem, 5vw, 5rem) 1.5rem;\n}\n\n.hero h1 {\n  font-size: clamp(2rem, 4vw + 1rem, 3.5rem);\n  line-height: 1.15;\n}\n\n@media (min-width: 48rem) {\n  .hero {\n    grid-template-columns: 1.2fr 1fr;\n    align-items: center;\n  }\n}",
          "codeExplanation": "1. Responsive media reset ensures images never exceed their container width.\n2. .hero starts as a 1-column mobile stack with fluid padding via clamp().\n3. The h1 includes + 1rem inside the preferred clamp() expression so user browser zoom continues to scale the heading accessibly.\n4. At 48rem (768px) and above, .hero expands into a 2-column layout.\n\nHow to Run & Expected Output:\nOpen in Chrome DevTools Device Toolbar and drag the viewport width smoothly from 375px to 1200px to watch the heading scale continuously and snap into 2 columns at 768px.",
          "practiceExercise": "Guided Exercise:\n1. Build a responsive 2-column section that stacks vertically on mobile and sits side-by-side at min-width: 768px.\n\nIndependent Challenge:\nReplace three font-size media queries on a section heading with a single clamp(1.5rem, 3vw + 0.75rem, 2.75rem) declaration.\n\nHints:\n- Never use only vw (like 5vw) inside clamp()'s middle value, or zooming in with Ctrl/+ won't enlarge the text! Always combine with rem.",
          "keyTakeaways": [
            "Mobile-first CSS uses min-width media queries to progressively enhance layouts",
            "clamp(min, preferred, max) creates smooth fluid typography with fewer breakpoints",
            "Always include a rem term inside clamp() preferred values so browser zoom still works",
            "Set max-width: 100%; height: auto; on images to prevent horizontal overflow"
          ]
        },
        {
          "title": "CSS Transitions, Keyframes & Reduced Motion Accessibility",
          "duration": "1h 25m",
          "introduction": "Thoughtful motion guides user attention and makes interfaces feel alive. Poorly chosen animations cause stuttery frames and discomfort for vestibular-sensitive users.",
          "objectives": [
            "Use transition for interactive state changes (:hover, :focus-visible)",
            "Create multi-step animations with @keyframes and animation",
            "Animate compositor-only properties (transform, opacity) for 60fps smoothness",
            "Respect @media (prefers-reduced-motion: reduce)"
          ],
          "notes": "### `transition` vs `@keyframes`\n- **`transition`**: Interpolates smoothly from State A to State B when triggered (e.g., hovering a button or opening an accordion).\n- **`@keyframes`**: Runs multi-step or looping animations automatically (e.g., loading spinners, subtle entrance fades).\n\n### Performance: Animate `transform` and `opacity`\nAnimating properties like `width`, `height`, `top`, or `margin` forces the browser to recalculate **Layout** (reflow) on every frame — causing visible jank on mobile phones.\nIn contrast, **`transform`** (`translateY`, `scale`, `rotate`) and **`opacity`** run on the GPU compositor thread without triggering Layout or Paint!\n\n### Accessibility: `prefers-reduced-motion`\nSome users experience dizziness or nausea from sliding/bouncing UI animations and enable \"Reduce motion\" in Windows, macOS, or iOS. Always honor that setting:\n```css\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n```",
          "codeExample": ".interactive-card {\n  background: #ffffff;\n  border: 1px solid #eae6df;\n  border-radius: 1rem;\n  padding: 1.5rem;\n  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),\n              box-shadow 220ms ease;\n}\n\n.interactive-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(28, 28, 28, 0.08);\n}\n\n@keyframes fadeSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.reveal {\n  animation: fadeSlideUp 450ms ease-out both;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .interactive-card,\n  .reveal {\n    animation: none;\n    transition: none;\n  }\n}",
          "codeExplanation": "1. .interactive-card transitions only transform and box-shadow for smooth 60fps hover lift.\n2. @keyframes fadeSlideUp animates opacity and translateY cleanly on entrance, using fill-mode: both.\n3. @media (prefers-reduced-motion: reduce) disables both animations and transitions for users who prefer minimal motion.\n\nHow to Run & Expected Output:\nHover over .interactive-card to see a crisp 4px lift. Toggle \"Emulate CSS media feature prefers-reduced-motion: reduce\" in Chrome DevTools Rendering tab to confirm motion stops cleanly.",
          "practiceExercise": "Guided Exercise:\n1. Build a .btn-lift button that scales gently (transform: translateY(-2px)) on hover and presses down (translateY(0)) on :active.\n\nIndependent Challenge:\nCreate a pulsing status dot using @keyframes with transform: scale() and opacity, and wrap it with a prefers-reduced-motion: reduce fallback.\n\nHints:\n- Avoid transition: all — list specific properties (transform, opacity) so unrelated layout changes don't animate accidentally.",
          "keyTakeaways": [
            "Use transition for state changes and @keyframes for multi-step or automatic motion",
            "Animate transform and opacity instead of width, top, or margin for 60fps performance",
            "Avoid transition: all; explicitly name the properties you want to animate",
            "Always support @media (prefers-reduced-motion: reduce) for accessibility"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What defines a mobile-first CSS stylesheet?",
          "options": [
            "Using max-width media queries for phones",
            "Writing base styles for narrow screens first and enhancing upward with min-width media queries",
            "Hiding all images on mobile devices",
            "Using fixed px widths on all containers"
          ],
          "correctAnswer": 1,
          "explanation": "Mobile-first stylesheets start with simple single-column base styles and add @media (min-width: ...) enhancements as screen width grows."
        },
        {
          "question": "Why should clamp() font sizes include a rem term (e.g., clamp(1.5rem, 3vw + 1rem, 3rem))?",
          "options": [
            "Otherwise the browser throws a CSS syntax error",
            "So user browser zoom preferences continue to scale the text accessibly",
            "To force Safari to enable GPU acceleration",
            "To disable line-height inheritance"
          ],
          "correctAnswer": 1,
          "explanation": "Pure vw values ignore browser zoom; adding a rem component ensures text still scales when a user zooms in."
        },
        {
          "question": "Which two CSS properties are cheapest for the browser to animate smoothly at 60fps?",
          "options": [
            "width and height",
            "margin and padding",
            "transform and opacity",
            "top and left"
          ],
          "correctAnswer": 2,
          "explanation": "transform and opacity are handled by the GPU compositor without triggering expensive Layout or Paint recalculations."
        },
        {
          "question": "What does @media (prefers-reduced-motion: reduce) allow you to do?",
          "options": [
            "Reduce image file sizes on slow networks",
            "Disable or tone down animations for users with vestibular/motion sensitivity",
            "Lower the screen brightness automatically",
            "Pause JavaScript timers"
          ],
          "correctAnswer": 1,
          "explanation": "prefers-reduced-motion detects OS/browser accessibility preferences so developers can disable sliding or bouncing animations."
        }
      ]
    },
    {
      "title": "Module 7: Web Accessibility (ARIA, Focus Management & Screen Readers)",
      "duration": "2h 30m",
      "objectives": [
        "Apply the First Rule of ARIA: prefer native HTML elements before adding ARIA attributes",
        "Use aria-label, aria-expanded, aria-controls, and aria-live regions accurately",
        "Build keyboard-accessible skip links and visible :focus-visible indicators"
      ],
      "notes": "### Module Introduction & Description\nRoughly 15% of the global population experiences some form of visual, motor, or cognitive disability. **Web Accessibility (a11y)** ensures your HTML & CSS interfaces work seamlessly with keyboards, screen readers (NVDA, VoiceOver), and high-contrast modes.\n\n### Prerequisites\n- Completion of Modules 1–6 (semantic HTML5, forms, CSS styling).\n\n### Skills Acquired\n- Auditing interactive widgets for WCAG AA compliance, managing keyboard focus, and implementing ARIA states and live announcements.\n\n### How the Lessons Connect\n- **Lesson 1** covers ARIA roles, states, and `aria-live` status announcements without misusing ARIA on non-semantic `<div>`s.\n- **Lesson 2** implements skip-to-content links, focus management, and contrast verification.\n\n### Completion Criteria\n- Complete both lessons, deliver the Accessible Accordion & Skip-Link assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nBuild an accessible FAQ Accordion & Status Notification page where keyboard-only users can skip repeated navigation, toggle FAQ panels with Enter/Space, and hear live status updates announced by screen readers.\n\nObjectives:\n- Use native <button> controls paired with aria-expanded and aria-controls.\n- Implement a visually hidden \"Skip to main content\" link that appears on keyboard focus.\n\nRequirements:\n1. Add <a href=\"#main-content\" class=\"skip-link\">Skip to main content</a> as the first focusable element inside <body>.\n2. Style .skip-link off-screen visually until :focus, then snap visibly into the top-left corner.\n3. Build 3 FAQ items using <button type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-1\"> controlling <div id=\"faq-1\" hidden>.\n4. Add a <div role=\"status\" aria-live=\"polite\"> region that announces \"3 FAQ panels available\" or updates when opened.\n\nStep-by-Step Instructions:\n1. Create a11y.html and styles.css with the skip link and FAQ markup.\n2. Test navigating solely with Tab, Shift+Tab, and Enter without touching your mouse.\n3. Verify focus rings remain clearly visible on every interactive element.\n\nDeliverables:\n- a11y.html and styles.css.\n\nEvaluation Criteria:\n- Zero clickable <div> elements; native <button> used throughout.\n- Skip link moves focus cleanly to <main id=\"main-content\" tabindex=\"-1\">.",
      "lessons": [
        {
          "title": "ARIA Roles, States & Live Regions",
          "duration": "1h 15m",
          "introduction": "ARIA (Accessible Rich Internet Applications) bridges semantic gaps when custom UI widgets like accordions, tabs, or live toast alerts go beyond standard static HTML.",
          "objectives": [
            "Follow the First Rule of ARIA: use native HTML (<button>, <nav>, <main>) first",
            "Wire aria-expanded and aria-controls on expandable panels",
            "Announce dynamic updates non-intrusively with aria-live=\"polite\""
          ],
          "notes": "### The First Rule of ARIA\n> **If you can use a native HTML element (`<button>`, `<a href>`, `<input>`) with built-in keyboard and screen-reader behavior, do NOT use a `<div>` with `role=\"button\"`!**\nNative `<button>` gives you Tab focus, Enter/Space activation, and disabled semantics automatically.\n\n### Essential ARIA Attributes\n- **`aria-label` / `aria-labelledby`**: Names icon-only buttons (e.g., `<button aria-label=\"Close modal\">X</button>`).\n- **`aria-expanded=\"true|false\"` + `aria-controls=\"panel-id\"`**: Tells screen reader users whether an accordion or dropdown menu is currently open or collapsed.\n- **`aria-live=\"polite\"`** (or `role=\"status\"`): Announces dynamic text changes (like *\"Saved!\"* or *\"3 results found\"*) after the user finishes their current action, whereas `aria-live=\"assertive\"` interrupts immediately (reserve for critical errors).\n\n### Common Mistakes & Solutions\n- **Mistake**: Adding `role=\"button\"` to a `<div>` without implementing `tabindex=\"0\"` and `keydown` Enter/Space handlers.\n  - **Solution**: Always use `<button type=\"button\">`.",
          "codeExample": "<button\n  type=\"button\"\n  aria-expanded=\"false\"\n  aria-controls=\"shipping-details\"\n  class=\"accordion-btn\"\n>\n  Shipping & Delivery Times\n</button>\n\n<div id=\"shipping-details\" hidden>\n  <p>Standard orders arrive in 3-5 business days.</p>\n</div>\n\n<p role=\"status\" aria-live=\"polite\" id=\"live-msg\"></p>",
          "codeExplanation": "1. Native <button type=\"button\"> ensures keyboard Tab, Enter, and Space work out of the box.\n2. aria-expanded=\"false\" announces the collapsed state; aria-controls links the button to #shipping-details.\n3. role=\"status\" + aria-live=\"polite\" announces dynamic status text placed inside #live-msg without stealing focus.\n\nHow to Run & Expected Output:\nSave in an HTML page, toggle `hidden` and `aria-expanded` via a small click listener, and inspect the Accessibility Tree in Chrome DevTools -> Elements -> Accessibility.",
          "practiceExercise": "Guided Exercise:\n1. Inspect an icon-only button without `aria-label` in Chrome DevTools Accessibility tab (shows empty accessible name!), then add `aria-label=\"Close dialog\"` and verify it updates.\n\nIndependent Challenge:\nWire a 5-line JavaScript click handler toggling `aria-expanded` and the `hidden` attribute on `#shipping-details`.\n\nExpected Result:\nScreen readers and DevTools Accessibility Tree report exact expanded/collapsed states.",
          "keyTakeaways": [
            "Always prefer native semantic HTML (<button>, <a>, <main>) before reaching for ARIA",
            "Pair aria-expanded and aria-controls on collapsible menus and accordions",
            "Use aria-label on icon-only buttons so screen readers announce their purpose",
            "Use aria-live=\"polite\" (or role=\"status\") for non-intrusive dynamic announcements"
          ]
        },
        {
          "title": "Keyboard Navigation, Skip Links & Contrast Auditing",
          "duration": "1h 15m",
          "introduction": "Power users and assistive-tech users navigate websites entirely via keyboard. A hidden skip link and crisp :focus-visible styling make navigation effortless.",
          "objectives": [
            "Build an accessible Skip to Main Content link",
            "Understand natural DOM tab order vs avoiding positive tabindex (> 0)",
            "Verify WCAG AA color contrast ratios (>= 4.5:1 for normal text)"
          ],
          "notes": "### Skip Links Save Keyboard Users Time\nWithout a skip link, a keyboard user must press `Tab` through 10+ header links on *every single page* before reaching the main article! Placing `<a href=\"#main-content\" class=\"skip-link\">Skip to main content</a>` at the top of `<body>` lets them jump straight to `<main>` in one keypress.\n\n### Tabindex Rules\n- **`tabindex=\"0\"`**: Adds a non-interactive element to natural DOM tab order (rarely needed if using native buttons/links).\n- **`tabindex=\"-1\"`**: Allows JavaScript/anchor focus (`#main-content`) without adding it to the Tab loop.\n- **NEVER use `tabindex=\"1\"` or higher**: Positive tabindex scrambles natural reading order and creates confusing focus jumps!\n\n### Common Mistakes & Solutions\n- **Mistake**: Writing `*:focus { outline: none; }` in a CSS reset.\n  - **Solution**: Style `:focus-visible { outline: 3px solid #ff8c42; outline-offset: 2px; }` so keyboard users always see where they are.",
          "codeExample": ".skip-link {\n  position: absolute;\n  left: -9999px;\n  top: 0;\n  background: #1c1c1c;\n  color: #ffffff;\n  padding: 0.75rem 1.25rem;\n  z-index: 1000;\n  font-weight: 700;\n}\n\n.skip-link:focus {\n  left: 1rem;\n  top: 1rem;\n}\n\n:focus-visible {\n  outline: 3px solid #ff8c42;\n  outline-offset: 3px;\n}",
          "codeExplanation": "1. .skip-link stays off-screen visually until focused via Tab, then slides visibly into the top-left corner.\n2. :focus-visible draws a high-contrast 3px orange outline strictly for keyboard focus.\n\nHow to Run & Expected Output:\nOpen an HTML page with this CSS and press Tab once: \"Skip to main content\" appears at top-left; pressing Enter jumps focus straight to <main id=\"main-content\">.",
          "practiceExercise": "Guided Exercise:\n1. Add the skip link to a page with a 6-link navbar and test pressing Tab -> Enter to jump over the navbar.\n\nIndependent Challenge:\nRun Chrome DevTools Lighthouse Accessibility audit on a sample HTML page and fix any contrast or missing-label warnings.\n\nExpected Result:\n100% keyboard-navigable page with zero positive tabindex values.",
          "keyTakeaways": [
            "Include a Skip to Main Content link at the top of <body> for keyboard users",
            "Never use positive tabindex (> 0); keep focus order aligned with visual DOM order",
            "Style :focus-visible clearly instead of disabling browser focus outlines"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the First Rule of ARIA?",
          "options": [
            "Add role=\"button\" to every <div>",
            "Use native semantic HTML elements (<button>, <a>, <nav>) whenever possible before adding ARIA attributes",
            "Put aria-hidden=\"true\" on <main>",
            "Always set tabindex=\"1\""
          ],
          "correctAnswer": 1,
          "explanation": "Native HTML elements include built-in keyboard, focus, and screen reader semantics that custom ARIA on <div> elements cannot easily replicate."
        },
        {
          "question": "Why should positive tabindex values like tabindex=\"5\" be avoided?",
          "options": [
            "They disable CSS Flexbox",
            "They override natural DOM tab order and create unpredictable, confusing keyboard jumps",
            "They prevent clicking with a mouse",
            "They hide elements from screen readers"
          ],
          "correctAnswer": 1,
          "explanation": "Positive tabindex forces a custom tab order that quickly desynchronizes from visual layout; stick to natural order or tabindex=\"0\"/\"-1\"."
        },
        {
          "question": "Which attribute links an icon-only <button> to a readable name for screen readers?",
          "options": [
            "placeholder",
            "aria-label",
            "alt",
            "data-name"
          ],
          "correctAnswer": 1,
          "explanation": "Buttons do not use alt attributes; aria-label gives an icon-only button a clear accessible name."
        },
        {
          "question": "When should aria-live=\"polite\" be used instead of aria-live=\"assertive\"?",
          "options": [
            "Never — assertive is always better",
            "For non-urgent status updates (like \"Saved\" or \"5 results\") so the screen reader finishes its current sentence first",
            "Only inside <head>",
            "To hide decorative images"
          ],
          "correctAnswer": 1,
          "explanation": "aria-live=\"polite\" waits for a pause before speaking, whereas assertive interrupts immediately and should be reserved for urgent alerts."
        }
      ]
    },
    {
      "title": "Module 8: Modern CSS Selectors, Container Queries & Cascade Layers",
      "duration": "2h 30m",
      "objectives": [
        "Use :is(), :where(), and parent-relational :has() selectors cleanly",
        "Design truly modular components with CSS Container Queries (@container)",
        "Manage third-party vs custom CSS specificity predictably with @layer"
      ],
      "notes": "### Module Introduction & Description\nModern CSS3 has evolved dramatically: you can now style a parent card based on its children (`:has()`), make components adapt to their **own container width** rather than the whole browser window (`@container`), and organize specificity cleanly with `@layer`.\n\n### Prerequisites\n- Completion of Modules 3–6 (Specificity, Flexbox, Grid, Media Queries).\n\n### Skills Acquired\n- Relational CSS selection, container-based responsive components, and zero-conflict Cascade Layer ordering.\n\n### How the Lessons Connect\n- **Lesson 1** masters `:is()`, `:where()`, and `:has()` without specificity bloat.\n- **Lesson 2** builds intrinsic components using `container-type: inline-size` and `@container`, plus `@layer`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Container-Responsive Card assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nA reusable Product Card component needs to look great both inside a narrow 260px sidebar AND a wide 700px main grid — without duplicating CSS classes for \"sidebar-card\" vs \"main-card\".\n\nObjectives:\n- Use CSS Container Queries (@container) so the card adapts to its parent container width automatically.\n- Use :has() to highlight a card automatically when its inner checkbox is checked.\n\nRequirements:\n1. Wrap cards in containers with container-type: inline-size;.\n2. Write a @container (min-width: 450px) rule switching .card-inner from vertical stack to horizontal 2-column grid.\n3. Add .card:has(input[type=\"checkbox\"]:checked) { border-color: #ff8c42; background: #fff9f2; }.\n4. Wrap base reset rules in @layer base { ... } and components in @layer components { ... }.\n\nStep-by-Step Instructions:\n1. Place the exact same .card HTML inside a 280px aside and a 720px main column.\n2. Verify the sidebar card stays vertical while the main-area card switches horizontal automatically!\n3. Check the checkbox inside one card to watch :has() style the parent card with zero JavaScript.\n\nDeliverables:\n- container-cards.html and styles.css.\n\nEvaluation Criteria:\n- Same .card markup adapts purely via @container width.\n- :has() highlights parent card on check without JS.",
      "lessons": [
        {
          "title": ":has(), :is(), :where() & Relational Styling",
          "duration": "1h 15m",
          "introduction": "For 25 years CSS could only look downward from parent to child. Today, :has() lets a parent style itself based on what is inside it.",
          "objectives": [
            "Group repetitive selectors cleanly with :is() and zero-specificity :where()",
            "Style parent cards, forms, and labels conditionally with :has()"
          ],
          "notes": "### `:is()` vs. `:where()`\n- **`:is(h1, h2, h3) a`**: Groups selectors concisely; its specificity equals the **highest** selector inside its list.\n- **`:where(h1, h2, h3) a`**: Identical grouping, **except its specificity is always `(0, 0, 0)`** — perfect for CSS resets so component classes override effortlessly!\n\n### Parent Selection with `:has()`\n`:has()` checks whether an element contains a matching descendant or sibling:\n- `.form-group:has(input:invalid:not(:placeholder-shown)) label { color: crimson; }`\n- `.card:has(img) { padding-top: 0; }` (automatically removes top padding only when the card includes an image!).\n\n### Common Mistakes & Solutions\n- **Mistake**: Writing 6 long repeated selectors like `.card h2, .card h3, .card h4`.\n  - **Solution**: Simplify to `.card :is(h2, h3, h4)`.",
          "codeExample": "/* Zero-specificity reset using :where() */\n:where(ul, ol)[class] {\n  list-style: none;\n  padding: 0;\n}\n\n/* Parent styling via :has() without JavaScript */\n.select-card {\n  border: 2px solid #eae6df;\n  border-radius: 1rem;\n  padding: 1rem;\n  transition: border-color 150ms ease, background-color 150ms ease;\n}\n\n.select-card:has(input:checked) {\n  border-color: #ff8c42;\n  background-color: #fff9f2;\n}",
          "codeExplanation": "1. :where(ul, ol)[class] strips default list padding/bullets with 0 specificity so any utility class overrides it easily.\n2. .select-card:has(input:checked) highlights the entire outer card border and background whenever its nested radio/checkbox is checked.\n\nHow to Run & Expected Output:\nWrap an <input type=\"checkbox\"> inside <label class=\"select-card\"> and click it in Chrome/Firefox/Safari: the outer card highlights orange immediately with zero JS.",
          "practiceExercise": "Guided Exercise:\n1. Build a `.field:has(input:focus)` rule that highlights the `<label>` color when the user clicks inside its input.\n\nIndependent Challenge:\nUse `.article:has(img)` vs `.article:not(:has(img))` to adjust grid columns dynamically based on whether an image exists.\n\nExpected Result:\nClean parent-aware styling without adding extra JS toggle classes.",
          "keyTakeaways": [
            "Use :where() for zero-specificity base/reset rules and :is() to group selectors cleanly",
            "Use :has() to style parent elements based on child states (:checked, :invalid, presence of <img>)"
          ]
        },
        {
          "title": "Container Queries (@container) & @layer Architecture",
          "duration": "1h 15m",
          "introduction": "Media queries check the whole browser window, which breaks when a component moves into a narrow sidebar. Container Queries check the component’s own parent width.",
          "objectives": [
            "Set container-type: inline-size on parent wrappers and write @container rules",
            "Establish deterministic cascade priority using @layer base, components, utilities"
          ],
          "notes": "### Container Queries (`@container`)\n1. Mark the parent wrapper as a size container: `container-type: inline-size;` (and optionally `container-name: card;`).\n2. Write `@container (min-width: 420px) { .card-body { display: grid; grid-template-columns: 160px 1fr; } }`.\nNow the *exact same component* renders vertically in a 280px sidebar and horizontally in a 700px main column!\n\n### Cascade Layers (`@layer`)\n`@layer base, components, utilities;` locks in layer precedence at the top of your CSS: rules in `utilities` **always** beat `components`, which **always** beat `base`, regardless of selector specificity!\n\n### Common Mistakes & Solutions\n- **Mistake**: Applying `@container` rules directly to the element that has `container-type: inline-size`.\n  - **Solution**: A container cannot query itself — always query a **child** inside the container!",
          "codeExample": "@layer base, components;\n\n@layer base {\n  body { margin: 0; font-family: system-ui, sans-serif; }\n}\n\n@layer components {\n  .card-slot {\n    container-type: inline-size;\n  }\n\n  .promo-card {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1.25rem;\n    border: 1px solid #eae6df;\n    border-radius: 1rem;\n  }\n\n  @container (min-width: 420px) {\n    .promo-card {\n      flex-direction: row;\n      align-items: center;\n    }\n  }\n}",
          "codeExplanation": "1. @layer base, components establishes deterministic layer order upfront.\n2. .card-slot sets container-type: inline-size so .promo-card inside it can respond to .card-slot's width via @container (min-width: 420px).\n\nHow to Run & Expected Output:\nPlace one .card-slot inside a 260px column and another inside a 600px column. On the same desktop screen, the first renders stacked vertically and the second renders horizontally.",
          "practiceExercise": "Guided Exercise:\n1. Resize the parent `.card-slot` width from `300px` to `500px` in DevTools and watch `.promo-card` flip from column to row.\n\nIndependent Challenge:\nAdd a third `@layer utilities` layer and verify `.p-0` inside `utilities` overrides `.promo-card { padding: 1.25rem }` even with lower specificity.\n\nExpected Result:\nComponent-scoped responsiveness and predictable cascade layering.",
          "keyTakeaways": [
            "Container Queries (@container) adapt components to their parent slot width instead of the viewport",
            "Never query the container element itself — style children inside container-type: inline-size",
            "Declare @layer order upfront to make base/component/utility precedence 100% predictable"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the key difference between :is(h1, h2) and :where(h1, h2) in CSS?",
          "options": [
            ":where() only works in Flexbox",
            ":where() always has zero (0,0,0) specificity, whereas :is() takes the highest specificity of its arguments",
            ":is() is deprecated",
            ":where() cannot match class selectors"
          ],
          "correctAnswer": 1,
          "explanation": ":where() contributes 0 specificity, making it ideal for base resets that component classes can easily override."
        },
        {
          "question": "Why must container-type: inline-size be placed on a parent wrapper rather than the element being styled inside @container?",
          "options": [
            "CSS forbids inline-size on divs",
            "A container cannot query its own size — @container rules match descendants inside the container",
            "container-type disables Flexbox",
            "It only works on <body>"
          ],
          "correctAnswer": 1,
          "explanation": "To avoid circular layout loops, @container queries always inspect an ancestor container."
        },
        {
          "question": "What does `.card:has(input:checked)` accomplish without JavaScript?",
          "options": [
            "Checks all inputs inside .card automatically",
            "Applies styles to the parent .card whenever a nested input inside it is checked",
            "Submits the form",
            "Hides unchecked inputs"
          ],
          "correctAnswer": 1,
          "explanation": ":has() acts as a relational parent selector, styling .card conditionally when it contains a checked input."
        },
        {
          "question": "How do CSS Cascade Layers (@layer base, components, utilities) resolve conflicts between layers?",
          "options": [
            "Alphabetical order of class names",
            "Layer declaration order wins first — later layers override earlier layers regardless of selector specificity",
            "Inline styles are ignored",
            "IDs always beat later layers"
          ],
          "correctAnswer": 1,
          "explanation": "Unlayered rules beat layered rules, and among declared layers, later layers in the order always take precedence."
        }
      ]
    },
    {
      "title": "Module 9: Responsive Images, SVGs & Core Web Vitals Optimization",
      "duration": "2h 15m",
      "objectives": [
        "Serve appropriately sized images per device with srcset, sizes, and <picture>",
        "Prevent Cumulative Layout Shift (CLS) using explicit width/height and aspect-ratio",
        "Embed crisp, themeable inline SVGs and lazy-load below-the-fold media"
      ],
      "notes": "### Module Introduction & Description\nUnoptimized 4 MB hero PNGs and jumping layouts ruin mobile performance and Google Core Web Vitals (**LCP** and **CLS**). Modern HTML5 gives you native attributes to serve crisp, fast media with zero JavaScript overhead.\n\n### Prerequisites\n- Completion of Modules 1–6.\n\n### Skills Acquired\n- Resolution-switching `srcset`/`sizes`, art-direction `<picture>`, native `loading=\"lazy\"`, `aspect-ratio`, and accessible inline SVGs.\n\n### How the Lessons Connect\n- **Lesson 1** covers responsive images (`srcset`, `sizes`, `<picture>`) and `loading=\"lazy\"` vs `fetchpriority=\"high\"`.\n- **Lesson 2** covers crisp inline SVG icons and preventing layout shift (CLS).\n\n### Completion Criteria\n- Complete both lessons, deliver the Zero-CLS Responsive Media Gallery assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nAn online magazine's homepage loads 3 MB desktop hero images on 375px mobile phones and shifts text downward as images finish downloading (poor LCP & CLS scores).\n\nObjectives:\n- Serve smaller image files to mobile screens using srcset and sizes.\n- Reserve exact layout space with width, height, and CSS aspect-ratio to achieve zero layout shift.\n\nRequirements:\n1. Build a hero image with width, height, fetchpriority=\"high\" (NO loading=\"lazy\" on the above-the-fold hero!), srcset (480w, 960w, 1440w), and sizes.\n2. Build a 4-card below-the-fold gallery using loading=\"lazy\", decoding=\"async\", and CSS aspect-ratio: 16 / 9; object-fit: cover;.\n3. Include an accessible inline <svg> brand logo with viewBox, aria-hidden=\"true\" (when paired with text) or role=\"img\" + <title>.\n\nStep-by-Step Instructions:\n1. Create media-gallery.html and styles.css.\n2. Simulate \"Slow 3G\" in Chrome DevTools Network tab and reload to confirm the hero placeholder box never jumps while loading!\n\nDeliverables:\n- media-gallery.html and styles.css.\n\nEvaluation Criteria:\n- Above-the-fold hero is eager (not lazy-loaded); below-the-fold images use loading=\"lazy\".\n- Explicit dimensions / aspect-ratio eliminate layout jumps.",
      "lessons": [
        {
          "title": "Responsive Images (srcset, sizes, <picture>) & Lazy Loading",
          "duration": "1h 10m",
          "introduction": "Shipping a 1600px wide photo to a 375px phone wastes 80% of the user’s mobile data. Native HTML srcset lets the browser pick the optimal file automatically.",
          "objectives": [
            "Configure srcset with width descriptors (480w, 960w) and sizes",
            "Use <picture> for modern format fallbacks (AVIF/WebP -> JPEG) or art direction",
            "Apply loading=\"lazy\" below the fold while keeping LCP hero images eager"
          ],
          "notes": "### `srcset` + `sizes`\nList available image widths in `srcset`, and tell the browser how wide the image will render at each breakpoint in `sizes`:\n`sizes=\"(max-width: 768px) 100vw, 50vw\"`\nThe browser multiplies rendered width by device pixel ratio (e.g., 2x Retina) and downloads only the smallest matching file!\n\n### Critical Core Web Vitals Rule: Don't Lazy-Load Your Hero!\n- **Below-the-fold images**: Add `loading=\"lazy\"` so off-screen images don't delay initial page load.\n- **Above-the-fold Hero / LCP image**: **NEVER** put `loading=\"lazy\"` on it — that delays Largest Contentful Paint! Use `fetchpriority=\"high\"` instead.\n\n### Common Mistakes & Solutions\n- **Mistake**: Putting `loading=\"lazy\"` on every `<img>` including the main hero banner.\n  - **Solution**: Keep above-the-fold hero eager with `fetchpriority=\"high\"`.",
          "codeExample": "<!-- Above-the-fold Hero: eager + high priority + format fallback -->\n<picture>\n  <source srcset=\"hero-960.webp 960w, hero-1600.webp 1600w\" type=\"image/webp\" />\n  <img\n    src=\"hero-960.jpg\"\n    srcset=\"hero-480.jpg 480w, hero-960.jpg 960w, hero-1600.jpg 1600w\"\n    sizes=\"(max-width: 768px) 100vw, 1200px\"\n    alt=\"Developer workspace with clean responsive layout\"\n    width=\"1600\"\n    height=\"900\"\n    fetchpriority=\"high\"\n  />\n</picture>",
          "codeExplanation": "1. <picture> lets browsers supporting WebP pick the smaller .webp source while older browsers fall back cleanly to .jpg.\n2. srcset + sizes let mobile phones download 480w instead of 1600w.\n3. width=\"1600\" height=\"900\" reserve aspect ratio upfront; fetchpriority=\"high\" speeds up LCP.\n\nHow to Run & Expected Output:\nInspect in Chrome DevTools Network -> Img tab while resizing/throttling to verify responsive source selection and zero layout shift.",
          "practiceExercise": "Guided Exercise:\n1. Build a below-the-fold card `<img>` with `loading=\"lazy\"`, `decoding=\"async\"`, `width=\"800\"`, and `height=\"450\"`.\n\nIndependent Challenge:\nUse `<picture>` with `<source media=\"(min-width: 768px)\" srcset=\"banner-wide.jpg\">` to swap between a square mobile crop and a wide desktop banner.\n\nExpected Result:\nOptimal image weight per device and fast LCP.",
          "keyTakeaways": [
            "Use srcset + sizes to serve smaller image files to smaller viewports",
            "Use <picture> for AVIF/WebP fallbacks or art-directed crops across breakpoints",
            "Use loading=\"lazy\" below the fold, and never lazy-load your main above-the-fold LCP hero"
          ]
        },
        {
          "title": "Inline SVGs, Icon Systems & Preventing CLS",
          "duration": "1h 05m",
          "introduction": "Inline SVGs stay razor-sharp at any zoom level, weigh a few hundred bytes, and inherit CSS currentColor automatically — while aspect-ratio locks layout geometry.",
          "objectives": [
            "Use viewBox and currentColor on inline SVGs",
            "Mark decorative SVGs with aria-hidden=\"true\" and standalone SVGs with role=\"img\"",
            "Eliminate Cumulative Layout Shift (CLS) with aspect-ratio and object-fit"
          ],
          "notes": "### Why Inline SVGs Beat Icon Fonts & PNGs\n- **Vector Crispness**: Sharp on 1x, 2x, and 4K displays.\n- **`currentColor`**: Setting `stroke=\"currentColor\"` or `fill=\"currentColor\"` lets an icon automatically match its parent button's text color on `:hover`!\n- **Accessibility**: When an icon sits next to text (`<button><svg aria-hidden=\"true\">...</svg> Save</button>`), hide the SVG from screen readers with `aria-hidden=\"true\"` so they don't read raw shapes!\n\n### Locking Layout Geometry (`aspect-ratio`)\nAdding `aspect-ratio: 16 / 9; width: 100%; height: auto; object-fit: cover;` prevents cards from collapsing to 0px tall before images load.",
          "codeExample": "<style>\n  .thumb {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n    object-fit: cover;\n    border-radius: 0.75rem;\n    background: #eae6df;\n  }\n</style>\n\n<button type=\"button\" class=\"icon-btn\">\n  <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\">\n    <path d=\"M5 12h14M12 5l7 7-7 7\" />\n  </svg>\n  <span>Next Lesson</span>\n</button>",
          "codeExplanation": "1. .thumb reserves an exact 16:9 box with a subtle #eae6df placeholder background before the image downloads (zero CLS).\n2. Inline <svg> uses stroke=\"currentColor\" to match button text color and aria-hidden=\"true\" because \"Next Lesson\" already labels the button.\n\nHow to Run & Expected Output:\nRender in a browser; hovering .icon-btn to change text color automatically recolors the SVG arrow as well.",
          "practiceExercise": "Guided Exercise:\n1. Build a standalone brand logo SVG (no adjacent text) using `role=\"img\"` and an inner `<title>Cortex Logo</title>`.\n\nIndependent Challenge:\nApply `aspect-ratio: 1 / 1; object-fit: cover; border-radius: 999px;` to a rectangular avatar photo so it crops cleanly into a circle without stretching.\n\nExpected Result:\nCrisp theme-aware SVGs and zero layout shift on image cards.",
          "keyTakeaways": [
            "Use stroke=\"currentColor\" / fill=\"currentColor\" so inline SVGs inherit CSS text color",
            "Add aria-hidden=\"true\" on decorative icons paired with visible text labels",
            "Combine width/height attributes with CSS aspect-ratio and object-fit: cover to eliminate CLS"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why should you NEVER add loading=\"lazy\" to your main above-the-fold hero image?",
          "options": [
            "Browsers refuse to render lazy images in <header>",
            "It delays fetching the Largest Contentful Paint (LCP) image until layout completes, hurting perceived load speed",
            "It breaks alt text",
            "It disables srcset"
          ],
          "correctAnswer": 1,
          "explanation": "Above-the-fold hero images should load eagerly (often with fetchpriority=\"high\"); loading=\"lazy\" is for below-the-fold media."
        },
        {
          "question": "How do HTML width and height attributes on <img> prevent Cumulative Layout Shift (CLS)?",
          "options": [
            "They compress the image file",
            "They let the browser compute the aspect ratio and reserve the exact box height before the image finishes downloading",
            "They force fixed pixel sizing on mobile",
            "They convert PNG to WebP"
          ],
          "correctAnswer": 1,
          "explanation": "Combined with max-width: 100%; height: auto;, width and height let browsers reserve the exact aspect-ratio box immediately."
        },
        {
          "question": "What does stroke=\"currentColor\" do inside an inline <svg>?",
          "options": [
            "Locks the icon to black",
            "Makes the SVG stroke inherit the CSS color property of its parent element",
            "Adds a drop shadow",
            "Enables lazy loading"
          ],
          "correctAnswer": 1,
          "explanation": "currentColor binds SVG fill/stroke to the computed CSS text color, automatically adapting to hover states and dark mode."
        },
        {
          "question": "When is <picture> preferred over a plain <img srcset=\"...\">?",
          "options": [
            "When you need to serve modern formats (AVIF/WebP) with JPEG fallback or different art-directed crops per breakpoint",
            "For every single icon on the page",
            "Only inside tables",
            "When you want to omit alt text"
          ],
          "correctAnswer": 0,
          "explanation": "<picture> supports multiple <source type=\"...\"> format fallbacks and media-query art direction."
        }
      ]
    },
    {
      "title": "Module 10: CSS Architecture, Print Styles & Capstone Portfolio Integration",
      "duration": "2h 30m",
      "objectives": [
        "Structure scalable CSS files (reset/base, tokens, layout, components, utilities)",
        "Add clean @media print stylesheets for resumes, invoices, and documentation",
        "Integrate Modules 1–9 into a complete, accessible, responsive Developer Portfolio"
      ],
      "notes": "### Module Introduction & Description\nIn this final module, you bring together semantic HTML5, accessible forms, design tokens, Box Model discipline, Flexbox, CSS Grid, Container Queries, ARIA, and responsive media into a **complete multi-section Developer Portfolio**.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Multi-file CSS architecture, `@media print` resume/article styling, and end-to-end HTML/CSS pre-launch auditing.\n\n### How the Lessons Connect\n- **Lesson 1** covers scalable CSS file organization and clean `@media print` rules.\n- **Lesson 2** walks through integrating and auditing the complete Developer Portfolio Capstone.\n\n### Completion Criteria\n- Complete both lessons, deliver the Final Developer Portfolio Website Capstone, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — Complete Developer Portfolio Website:\nProblem Statement:\nBuild a complete, responsive, accessible multi-section Developer Portfolio website bringing together every HTML5 and CSS3 skill from Modules 1–10.\n\nObjectives:\n- Combine semantic HTML5 landmarks, accessible forms, design tokens, Flexbox, CSS Grid, responsive media, and accessibility.\n\nRequirements:\n1. Semantic structure: Skip link, sticky <header> + <nav>, <main> with Hero, About, Projects (CSS Grid auto-fit showcase), Skills/Experience table, and accessible Contact <form>, plus <footer>.\n2. Design System: :root CSS Custom Properties + [data-theme=\"dark\"] support + fluid clamp() headings.\n3. Accessibility: Single <h1>, zero skipped headings, :focus-visible rings, aria-labels where needed, WCAG AA contrast, and prefers-reduced-motion support.\n4. Print-friendly @media print rule hiding the navbar/contact form and keeping text black on white.\n5. Zero horizontal scroll across 375px, 768px, and 1440px.\n\nStep-by-Step Instructions:\n1. Organize CSS into clear layers/sections (tokens -> base -> layout -> components -> print).\n2. Build index.html and styles.css cleanly.\n3. Audit in Chrome DevTools across 375px mobile, 768px tablet, 1440px desktop, and Print preview (Ctrl+P).\n\nDeliverables:\n- index.html and styles.css forming a complete portfolio website.\n\nEvaluation Criteria:\n- Complete semantic landmarks and accessible form validation.\n- Clean responsive Grid/Flexbox layouts with zero 375px overflow.\n- Print stylesheet produces a clean readable resume/portfolio printout.",
      "lessons": [
        {
          "title": "Organizing Scalable CSS Tokens & Print Stylesheets",
          "duration": "1h 15m",
          "introduction": "Good CSS architecture stays easy to edit 6 months later — and adding 15 lines of @media print makes resumes, invoices, and articles print cleanly on paper or PDF.",
          "objectives": [
            "Organize stylesheets into predictable sections (tokens -> reset -> layout -> components -> print)",
            "Write @media print rules hiding navigation chrome and preserving ink contrast"
          ],
          "notes": "### Scalable CSS Organization\nWhether in one well-organized `styles.css` or split partials:\n1. **Tokens (`:root`)**: Colors, spacing, typography scales.\n2. **Base / Reset**: `box-sizing: border-box`, responsive `img`, body defaults.\n3. **Layout Primitives**: Container (`.container`), Grid/Flex shells.\n4. **Components**: `.btn`, `.card`, `.badge`, `.form-field`.\n5. **Utilities & Print**: `.sr-only`, `@media print`, `@media (prefers-reduced-motion: reduce)`.\n\n### Clean `@media print` Rules\nWhen someone prints your portfolio or saves it as PDF (`Ctrl+P`), hide sticky navbars and decorative buttons, force dark text on white background, and avoid awkward page breaks inside cards with `break-inside: avoid;`!",
          "codeExample": "@media print {\n  header,\n  nav,\n  .no-print {\n    display: none !important;\n  }\n\n  body {\n    background: #ffffff;\n    color: #000000;\n    font-size: 12pt;\n  }\n\n  .project-card {\n    break-inside: avoid;\n    border: 1px solid #cccccc;\n  }\n}",
          "codeExplanation": "1. Hides navigation bars and interactive-only buttons (.no-print) when printing or exporting PDF.\n2. Resets background to white and text to crisp black at 12pt.\n3. break-inside: avoid keeps individual project cards from splitting awkwardly across two printed pages.\n\nHow to Run & Expected Output:\nAdd to any portfolio HTML page and press Ctrl+P (or open DevTools -> Rendering -> Emulate CSS media type: print) to preview the clean printout.",
          "practiceExercise": "Guided Exercise:\n1. Test `Emulate CSS media type: print` in Chrome DevTools Rendering panel on a sample page and verify the navbar disappears cleanly.\n\nIndependent Challenge:\nAdd `a[href^=\"http\"]::after { content: \" (\" attr(href) \")\"; font-size: 0.85em; }` inside `@media print` so external links show their full URLs on paper!\n\nExpected Result:\nClean, readable print/PDF output with zero wasted ink or split cards.",
          "keyTakeaways": [
            "Organize CSS predictably: tokens -> base reset -> layout -> components -> print/a11y",
            "Use @media print with break-inside: avoid to produce clean PDF/paper exports",
            "Keep interactive-only navbars and buttons hidden in print view"
          ]
        },
        {
          "title": "Final Capstone: Multi-Section Accessible Portfolio Website",
          "duration": "1h 15m",
          "introduction": "Let’s tie all 10 modules together with a clean full-page shell and final pre-launch HTML & CSS quality audit.",
          "objectives": [
            "Assemble Header, Hero, Project Grid, Contact Form, and Footer into one cohesive site",
            "Run a structured pre-launch check across semantics, responsiveness, and contrast"
          ],
          "notes": "### Pre-Launch HTML & CSS Checklist\n1. **Semantics**: Valid `<!DOCTYPE html>`, `lang=\"en\"`, viewport meta, one `<h1>`, zero skipped headings, skip link.\n2. **Forms & Tables**: Explicit `<label for>`, native validation attributes, `scope` on table `<th>`.\n3. **Layouts**: `border-box`, `min-w-0` on Flex/Grid code/table tracks, zero horizontal scroll at `375px`.\n4. **Polish**: `clamp()` typography, `prefers-reduced-motion`, `@media print`, and WCAG AA contrast.",
          "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Ada Lovelace — Frontend Engineer</title>\n  </head>\n  <body>\n    <a href=\"#main\" class=\"skip-link\">Skip to main content</a>\n    <header class=\"site-header\">\n      <a href=\"/\" class=\"brand\">Ada.dev</a>\n      <nav aria-label=\"Main Navigation\">\n        <a href=\"#projects\">Projects</a>\n        <a href=\"#contact\">Contact</a>\n      </nav>\n    </header>\n    <main id=\"main\" tabindex=\"-1\">\n      <section class=\"hero\">\n        <h1>Building Fast, Accessible Web Interfaces</h1>\n        <p>Frontend engineer specializing in semantic HTML5 and modern CSS3.</p>\n      </section>\n    </main>\n    <footer><p>&copy; 2026 Ada Lovelace</p></footer>\n  </body>\n</html>",
          "codeExplanation": "1. Combines skip link, labeled <nav>, single <main id=\"main\" tabindex=\"-1\">, single <h1> hero, and semantic <footer> into a clean capstone skeleton.",
          "practiceExercise": "Guided Exercise:\n1. Connect your Portfolio CSS (tokens, Grid showcase, Flexbox navbar, @media print) to this skeleton and test at 375px, 768px, and 1440px.\n\nIndependent Challenge:\nRun Chrome Lighthouse (Accessibility & Best Practices) on your completed portfolio and target a 95+ Accessibility score.\n\nExpected Result:\nProduction-ready, accessible, responsive multi-section portfolio website.",
          "keyTakeaways": [
            "Combine semantic HTML5 landmarks, accessible forms, CSS Grid/Flexbox, and fluid typography cohesively",
            "Audit every finished site across 375px mobile, keyboard-only navigation, print preview, and Lighthouse"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What does `break-inside: avoid;` do inside a `@media print` rule on `.project-card`?",
          "options": [
            "Hides the card when printing",
            "Prevents a card from being sliced in half across a page boundary when printing or saving to PDF",
            "Makes the card 100% wider",
            "Removes borders"
          ],
          "correctAnswer": 1,
          "explanation": "break-inside: avoid instructs the print layout engine to move the whole card to the next page rather than splitting it."
        },
        {
          "question": "Why add `tabindex=\"-1\"` to `<main id=\"main-content\">` when pairing it with a skip link?",
          "options": [
            "So Tab stops on every paragraph",
            "So clicking the skip link programmatically moves keyboard focus into <main> across all browsers without adding <main> to the normal Tab sequence",
            "To hide <main> from screen readers",
            "To disable CSS Grid"
          ],
          "correctAnswer": 1,
          "explanation": "tabindex=\"-1\" allows anchor/script focus transfer to <main> while keeping <main> out of normal Tab stops."
        },
        {
          "question": "In a well-structured stylesheet, in what order should layers/sections typically appear?",
          "options": [
            "Print -> Components -> Tokens -> Base Reset",
            "Tokens (:root) -> Base Reset -> Layout -> Components -> Utilities & Print/Reduced-Motion",
            "Random alphabetical order",
            "Components before Reset"
          ],
          "correctAnswer": 1,
          "explanation": "Putting tokens and base resets first lets layout and component classes build cleanly on top without specificity wars."
        },
        {
          "question": "Which Chrome DevTools feature lets you verify @media print styles without wasting paper?",
          "options": [
            "Network Offline mode",
            "Rendering panel -> Emulate CSS media type: print (or Ctrl+P Print Preview)",
            "Application -> Service Workers",
            "Performance Monitor"
          ],
          "correctAnswer": 1,
          "explanation": "DevTools Rendering panel can emulate print media live so you can inspect printed CSS rules directly."
        }
      ]
    }
  ]
};
