export const reactCourseData = {
  title: 'React.js for Beginners',
  description: 'Build interactive UIs with components, state, props, hooks, and React Router. Learn the most popular frontend library in the world.',
  thumbnail: 'react',
  totalDuration: '10h 20m',
  modules: [
    {
      title: 'Components and JSX',
      duration: '2h 00m',
      notes: `### What is React?
React is a JavaScript library for building user interfaces. It was created by Facebook. Instead of building one massive HTML file, React lets you build small, reusable pieces called **Components**.

### What is JSX?
JSX stands for JavaScript XML. It allows you to write HTML directly inside your JavaScript code. It looks like this:

\`\`\`jsx
const element = <h1>Hello, React!</h1>;
\`\`\`

It might look like HTML, but it's actually JavaScript. Under the hood, Babel converts it to \`React.createElement()\`.

### Your First Component
A component is just a JavaScript function that returns JSX. **The name MUST start with a capital letter.**

\`\`\`jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Or using arrow functions
const Welcome = () => {
  return <h1>Hello, React!</h1>;
}
\`\`\`

### Rules of JSX
1.  **Return a single parent element**. If you have multiple elements, wrap them in a \`<div>\` or an empty fragment \`<>...</>\`.
2.  **className instead of class**. Since JSX is JavaScript, \`class\` is a reserved word, so React uses \`className\`.
3.  **Curly braces for JavaScript**. You can inject variables directly into your HTML using \`{}\`.
    \`\`\`jsx
    const name = "Anas";
    return <h1>Hello, {name}!</h1>;
    \`\`\``,
      codeExample: 'function App() {\n  const user = "Anas";\n  return (\n    <div className="container">\n      <h1>Welcome, {user}!</h1>\n      <p>This is my first React Component.</p>\n    </div>\n  );\n}\n\nexport default App;',
      quiz: [{ question: 'What is JSX?', options: ['A database', 'HTML inside JavaScript', 'A CSS framework', 'A new language'], correctAnswer: 1 }]
    },
    {
      title: 'State and Props',
      duration: '3h 30m',
      notes: `### Props (Properties)
Props are how you pass data from a parent component to a child component. Think of them like arguments in a function.

\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage:
<Greeting name="Anas" />
\`\`\`
**Important:** Props are **read-only**. A child component can never modify the props passed to it.

### State
State is data that can change over time. When state changes, React automatically re-renders the UI to match the new state. 

To use state, we use the \`useState\` hook.
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // count is the current value. setCount is the function to update it.
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

### Props vs State
*   **Props** are passed *into* a component (like function arguments). They are immutable.
*   **State** is managed *inside* a component. It is mutable (via the setter function).`,
      codeExample: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}',
      quiz: [{ question: 'What happens when state changes?', options: ['The page reloads', 'React updates the UI automatically', 'The server restarts', 'Nothing'], correctAnswer: 1 }]
    },
    {
      title: 'The useEffect Hook',
      duration: '2h 15m',
      notes: `### What are Side Effects?
Sometimes your component needs to do things outside of just rendering UI. For example:
*   Fetching data from an API.
*   Setting up a timer.
*   Manually changing the DOM.

These are called **Side Effects**, and we handle them using the \`useEffect\` hook.

### Basic useEffect
\`\`\`jsx
import { useEffect } from 'react';

useEffect(() => {
  // This runs AFTER the component renders
  console.log("Component rendered!");
}, []); // <-- The Dependency Array
\`\`\`

### The Dependency Array
The second argument (the array) tells React *when* to run the effect.
*   **Empty array \`[]\`**: Runs exactly once when the component mounts (loads).
*   **Array with variables \`[count]\`**: Runs on mount AND whenever \`count\` changes.
*   **No array**: Runs after every single render (rarely used, can cause infinite loops).

### Cleanup Function
If you start a timer or a subscription, you need to clean it up when the component unmounts to prevent memory leaks.
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);
  
  return () => clearInterval(timer); // Cleanup
}, []);
\`\`\``,
      codeExample: 'import { useState, useEffect } from "react";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n\n    // Cleanup function\n    return () => clearInterval(interval);\n  }, []);\n\n  return <p>Timer: {seconds}s</p>;\n}',
      quiz: [{ question: 'What does an empty dependency array [] in useEffect mean?', options: ['Run on every render', 'Run once on mount', 'Never run', 'Run only on state change'], correctAnswer: 1 }]
    }
  ]
};