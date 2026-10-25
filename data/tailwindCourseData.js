export const tailwindCourseData = {
  title: 'Tailwind CSS Essentials',
  description: 'Design stunning websites rapidly using utility-first CSS without leaving your HTML. Build modern responsive UIs.',
  thumbnail: 'tailwind',
  totalDuration: '5h 40m',
  modules: [
    {
      title: 'Utility-First Fundamentals',
      duration: '2h 00m',
      notes: `### What is Tailwind CSS?
Tailwind is a **utility-first** CSS framework. Unlike Bootstrap, which gives you pre-built components (like buttons and cards), Tailwind gives you tiny, single-purpose classes (like \`flex\`, \`pt-4\`, \`text-center\`).

You build your design by combining these utility classes directly in your HTML.

### Why use it?
1.  **No more naming things**: You don't have to invent class names like \`.header-wrapper-inner\`.
2.  **No more context switching**: You don't need to jump between HTML and CSS files.
3.  **Speed**: Once you memorize the classes, you can build a UI 10x faster than writing custom CSS.

### Common Utility Classes
*   **Padding & Margin**: \`p-4\` (padding all sides), \`px-2\` (padding x-axis), \`mt-8\` (margin top).
*   **Colors**: \`bg-blue-500\`, \`text-white\`, \`border-gray-200\`.
*   **Typography**: \`text-xl\`, \`font-bold\`, \`text-center\`, \`uppercase\`.
*   **Flexbox**: \`flex\`, \`justify-between\`, \`items-center\`.

### Example
\`\`\`html
<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-800">Hello Tailwind</h2>
  <p class="text-gray-500 mt-2">This is a styled card.</p>
</div>
\`\`\``,
      codeExample: '<button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">\n  Click Me\n</button>',
      quiz: [{ question: 'What is the Tailwind approach called?', options: ['Component-first', 'Utility-first', 'CSS-in-JS', 'Sass'], correctAnswer: 1 }]
    },
    {
      title: 'Responsive Design with Tailwind',
      duration: '1h 40m',
      notes: `### Mobile First
Tailwind is built **mobile-first**. This means the base classes you write apply to mobile screens. To target larger screens, you use **breakpoint prefixes**.

### Breakpoints
*   \`sm:\` (640px) - Small tablets
*   \`md:\` (768px) - Tablets
*   \`lg:\` (1024px) - Laptops
*   \`xl:\` (1280px) - Desktops
*   \`2xl:\` (1536px) - Large screens

### How it works
If you write \`text-center md:text-left\`, it means:
*   On mobile: The text is centered.
*   On screens 768px and wider: The text is left-aligned.

### Responsive Grid Example
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4">Card 1</div>
  <div class="bg-white p-4">Card 2</div>
  <div class="bg-white p-4">Card 3</div>
</div>
\`\`\`
On mobile, the cards stack vertically (1 column). On tablets, they split into 2 columns. On laptops, 3 columns.`,
      codeExample: '<div class="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-100">\n  <h1 class="text-xl font-bold mb-4 md:mb-0">Logo</h1>\n  <nav class="flex gap-4">\n    <a href="#" class="text-blue-500">Home</a>\n    <a href="#" class="text-gray-700">About</a>\n  </nav>\n</div>',
      quiz: [{ question: 'What does the "md:" prefix do?', options: ['Makes it medium size', 'Applies styles on screens 768px and wider', 'Adds margin', 'Makes it dark mode'], correctAnswer: 1 }]
    },
    {
      title: 'Customizing the Config',
      duration: '2h 00m',
      notes: `### The tailwind.config.js file
While Tailwind provides hundreds of colors and sizes out of the box, every brand has its own specific colors and fonts. You customize this in the \`tailwind.config.js\` file.

### Extending the Theme
\`\`\`javascript
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#FDFBF7',
          dark: '#1C1C1C',
          orange: '#FF8C42',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    }
  }
}
\`\`\`

### Using Custom Classes
Once you add these to the config, you can use them in your HTML!
\`\`\`html
<h1 class="text-brand-orange font-serif">Custom Color</h1>
\`\`\`

### Arbitrary Values
If you need a specific value just once, you don't need to add it to the config. Use square brackets:
\`\`\`html
<div class="w-[320px] bg-[#1da1f2]">Specific Width & Color</div>
\`\`\``,
      codeExample: '// tailwind.config.js\nmodule.exports = {\n  content: ["./src/**/*.{js,jsx}"],\n  theme: {\n    extend: {\n      colors: {\n        cortex: "#FF8C42",\n      },\n      spacing: {\n        "128": "32rem",\n      }\n    },\n  },\n  plugins: [],\n}',
      quiz: [{ question: 'Where do you customize Tailwind colors?', options: ['In index.css', 'In package.json', 'In tailwind.config.js', 'In the HTML file'], correctAnswer: 2 }]
    }
  ]
};