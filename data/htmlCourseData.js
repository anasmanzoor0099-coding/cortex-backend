export const htmlCourseData = {
  title: 'HTML & CSS Masterclass',
  description: 'Build beautiful, responsive layouts from scratch. Master the box model, Flexbox, Grid, and modern CSS design systems.',
  thumbnail: 'html-css',
  totalDuration: '8h 30m',
  modules: [
    {
      title: 'The Absolute Basics of HTML',
      duration: '2h 00m',
      notes: `### What is HTML?
HTML stands for **HyperText Markup Language**. It is the skeleton of the web. If a website were a human body, HTML would be the bones, CSS would be the skin and clothes, and JavaScript would be the brain.

### The Anatomy of an HTML Tag
HTML uses "tags" to define elements. A tag is enclosed in angle brackets. Most tags come in pairs: an opening tag and a closing tag.

\`\`\`html
<p>This is a paragraph of text.</p>
\`\`\`

*   \`<p>\` is the opening tag.
*   \`This is a paragraph of text.\` is the content.
*   \`</p>\` is the closing tag.

### Essential HTML Tags You Must Know
Here are the core tags you will use every single day:

1.  **Headings**: \`<h1>\` to \`<h6>\`. \`<h1>\` is the biggest and most important (usually the page title), and \`<h6>\` is the smallest.
2.  **Paragraphs**: \`<p>\` is used for blocks of text.
3.  **Links**: \`<a>\` stands for anchor. It creates a clickable link. You must use the \`href\` attribute to tell it where to go.
    \`\`\`html
    <a href="https://google.com">Click here to go to Google</a>
    \`\`\`
4.  **Images**: \`<img>\` displays a picture. It is a self-closing tag. It uses \`src\` for the image path and \`alt\` for a text description.
    \`\`\`html
    <img src="cat.jpg" alt="A cute cat">
    \`\`\`

### The Boilerplate
Every HTML document has a standard structure:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome to my website!</h1>
  <p>This is where the visible content goes.</p>
</body>
</html>
\`\`\`
The \`<head>\` contains invisible information (like the title on the browser tab), and the \`<body>\` contains everything you actually see on the page.`,
      codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>This is my first website.</p>\n</body>\n</html>',
      quiz: [{ question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language', 'None'], correctAnswer: 0 }]
    },
    {
      title: 'CSS Basics: Styling Your HTML',
      duration: '2h 15m',
      notes: `### Why CSS?
If HTML is the skeleton, **CSS (Cascading Style Sheets)** is the paint, the clothes, and the makeup. It controls colors, fonts, spacing, and the entire layout of your page. Without CSS, every website would look like a boring document from 1995.

### CSS Syntax
CSS is made up of rules. A rule consists of a **selector** and a **declaration block**.

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`
*   **Selector (\`h1\`)**: Targets the HTML element you want to style.
*   **Property (\`color\`)**: The feature you want to change.
*   **Value (\`blue\`)**: The specific setting for that feature.

### How to Add CSS to Your Page
There are three ways to add CSS:
1.  **Inline CSS**: Directly inside the HTML tag (bad practice, avoid this).
    \`<h1 style="color: red;">Hello</h1>\`
2.  **Internal CSS**: Inside a \`<style>\` tag in the \`<head>\` of your HTML.
3.  **External CSS (Best Practice)**: In a separate file (like \`style.css\`) linked to your HTML.
    \`<link rel="stylesheet" href="style.css">\`

### The Box Model (Crucial Concept)
Every single element in CSS is a box. Understanding this box is the secret to layout mastery. The box has four layers, from inside out:

1.  **Content**: The text or image itself.
2.  **Padding**: Space *inside* the box, between the content and the border.
3.  **Border**: The line around the padding.
4.  **Margin**: Space *outside* the box, pushing other elements away.

If you want space between text and a border, use \`padding\`. If you want space between two different boxes, use \`margin\`.`,
      codeExample: '/* styles.css */\nbody {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n  margin-top: 50px;\n}\n\np {\n  padding: 20px;\n  border: 1px solid black;\n  line-height: 1.6;\n}',
      quiz: [{ question: 'What is the space INSIDE the border called?', options: ['Margin', 'Padding', 'Content', 'Border'], correctAnswer: 1 }]
    },
    {
      title: 'Responsive Layouts with Flexbox',
      duration: '2h 15m',
      notes: `### The Problem Before Flexbox
Before Flexbox, centering a div or placing items side-by-side was a nightmare. Developers used floats, tables, and crazy margins. It was frustrating.

### Enter Flexbox
Flexbox is a modern CSS layout model that makes aligning items incredibly easy. To use it, you just set \`display: flex;\` on a parent container. Suddenly, its children become "flex items" and line up in a row automatically.

### The Flex Container Properties
Once you have \`display: flex;\`, you get access to these superpowers:

*   **flex-direction**: Controls the main axis. \`row\` (default) puts items left-to-right. \`column\` puts them top-to-bottom.
*   **justify-content**: Aligns items along the main axis (horizontally if row).
    *   \`flex-start\`: Left aligned.
    *   \`flex-end\`: Right aligned.
    *   \`center\`: Centered.
    *   \`space-between\`: First item on start, last item on end, equal space between.
*   **align-items**: Aligns items along the cross axis (vertically if row).
    *   \`center\`: Centers them vertically.
    *   \`stretch\`: Makes them fill the height.

### The Most Famous CSS Trick
How do you center a div perfectly in the middle of the screen? Flexbox solves it in 3 lines:
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`
This is used on almost every modern website.`,
      codeExample: '.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 20px;\n  background-color: #333;\n  color: white;\n}\n\n.nav-links {\n  display: flex;\n  gap: 15px; /* Space between links */\n}',
      quiz: [{ question: 'Which property centers items vertically in Flexbox?', options: ['justify-content', 'align-items', 'text-align', 'vertical-align'], correctAnswer: 1 }]
    },
    {
      title: 'CSS Grid: The Ultimate Layout Tool',
      duration: '2h 00m',
      notes: `### Grid vs Flexbox
Flexbox is great for one-dimensional layouts (a row OR a column). **CSS Grid** is for two-dimensional layouts (rows AND columns at the same time). 

### Grid Basics
To create a grid, you set \`display: grid;\` and define your columns using \`grid-template-columns\`.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
  gap: 20px;
}
\`\`\`

The \`fr\` unit stands for "fraction". So \`1fr 1fr 1fr\` means 3 columns that share the space equally.

> **Note:** If you want a responsive grid that automatically adjusts to mobile, use \`repeat(auto-fit, minmax(250px, 1fr))\`. This is a magic line of CSS that creates a fully responsive grid without any media queries!`,
      codeExample: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n\n.grid-item {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n}',
      quiz: [{ question: 'What does the "fr" unit stand for?', options: ['Free', 'Frame', 'Fraction', 'Front'], correctAnswer: 2 }]
    }
  ]
};