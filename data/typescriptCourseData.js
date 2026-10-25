export const typescriptCourseData = {
  title: 'TypeScript Fundamentals',
  description: 'Add type safety to your JavaScript. Stop runtime errors before they happen. Master interfaces, generics, and React integration.',
  thumbnail: 'typescript',
  totalDuration: '7h 20m',
  modules: [
    {
      title: 'Why TypeScript?',
      duration: '1h 30m',
      notes: `### The Problem with JavaScript
JavaScript is **dynamically typed**. This means you can declare a variable as a number, and later assign a string to it. The browser won't complain until it tries to run the code and crashes.

\`\`\`javascript
let age = 25;
age = "Twenty Five"; // Valid in JS, but will break your math logic later!
\`\`\`

### Enter TypeScript
TypeScript is a **superset** of JavaScript. It adds **static typing**. You tell the code what type a variable should be, and TypeScript catches errors *while you type in VS Code*, before you even run the code.

\`\`\`typescript
let age: number = 25;
age = "Twenty Five"; // ERROR: Type 'string' is not assignable to type 'number'.
\`\`\`

### Does the browser understand TypeScript?
No. Browsers only understand JavaScript. TypeScript must be compiled into JavaScript before it goes to the browser. (Tools like Vite and Next.js handle this compilation automatically for you).`,
      codeExample: '// TypeScript catches errors early\nfunction addNumbers(a: number, b: number) {\n  return a + b;\n}\n\nconsole.log(addNumbers(5, 10)); // 15\n// console.log(addNumbers("5", 10)); // Compile Error!',
      quiz: [{ question: 'When does TypeScript catch errors?', options: ['At runtime', 'While you are typing code', 'Never', 'After deployment'], correctAnswer: 1 }]
    },
    {
      title: 'Basic Types and Interfaces',
      duration: '2h 15m',
      notes: `### Basic Types
TypeScript introduces explicit types for standard data:
*   \`string\`: Text.
*   \`number\`: Integers and floats.
*   \`boolean\`: true/false.
*   \`any\`: Opts out of type checking (avoid this!).
*   \`unknown\`: Safer version of \`any\`.
*   \`void\`: Used for functions that return nothing.

### Arrays and Objects
\`\`\`typescript
let names: string[] = ["Anas", "John"];
let user: { name: string; age: number } = { name: "Anas", age: 21 };
\`\`\`

### Interfaces (The Powerhouse)
Interfaces are used to define the shape of an object. They make your code incredibly readable and reusable.

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // The '?' means this property is optional
}

const newUser: User = {
  id: 1,
  name: "Anas",
  email: "anas@test.com"
};
\`\`\``,
      codeExample: 'interface Course {\n  title: string;\n  duration: string;\n  isPublished: boolean;\n}\n\nfunction printCourse(course: Course) {\n  console.log(`${course.title} is ${course.duration} long.`);\n}\n\nprintCourse({ title: "React", duration: "10h", isPublished: true });',
      quiz: [{ question: 'How do you make a property optional in an interface?', options: ['!', '?', '*', 'optional'], correctAnswer: 1 }]
    },
    {
      title: 'TypeScript with React',
      duration: '3h 35m',
      notes: `### Typing Props
In React, data is passed down via props. TypeScript allows you to strictly define what props a component accepts.

\`\`\`tsx
interface ButtonProps {
  text: string;
  color?: string;
  onClick: () => void;
}

const Button = ({ text, color = "blue", onClick }: ButtonProps) => {
  return <button style={{ backgroundColor: color }} onClick={onClick}>{text}</button>;
};
\`\`\`

### Typing useState
You can pass a type to \`useState\` to tell React what kind of data it will hold.

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null); // Can be a User or null
\`\`\`

### Typing Events
When handling form submissions or button clicks, you need to type the event object.

\`\`\`tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
}
\`\`\``,
      codeExample: 'import { useState } from "react";\n\ninterface UserProfile {\n  name: string;\n  role: string;\n}\n\nexport default function Profile() {\n  const [user, setUser] = useState<UserProfile | null>({ name: "Anas", role: "Dev" });\n\n  return (\n    <div>\n      <h1>{user ? user.name : "Guest"}</h1>\n    </div>\n  );\n}',
      quiz: [{ question: 'How do you type an empty state that will hold a User object later?', options: ['useState<User>()', 'useState<User | null>(null)', 'useState(any)', 'useState<User = null>()'], correctAnswer: 1 }]
    }
  ]
};