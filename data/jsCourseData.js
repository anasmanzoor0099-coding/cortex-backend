export const jsCourseData = {
  title: 'Modern JavaScript (ES6+)',
  description: 'Master the language of the web. Go from absolute beginner to advanced developer with closures, Promises, Async/Await, and DOM manipulation.',
  thumbnail: 'javascript',
  totalDuration: '12h 15m',
  modules: [
    {
      title: 'Variables, Data Types, and Scope',
      duration: '2h 30m',
      notes: `### JavaScript: The Brain of the Web
While HTML provides the structure (the skeleton) and CSS provides the styling (the skin and clothes), **JavaScript is the brain**. It is a high-level, interpreted programming language that makes websites interactive. When you click a "Like" button, submit a form, or see an animated dropdown menu, JavaScript is the engine working behind the scenes.

### Variables: Storing Information
Imagine you are moving houses. You have cardboard boxes, and you write a label on each box so you know what is inside. In JavaScript, a **variable** is exactly that: a labeled box where you store data in the computer's memory.

In modern JavaScript (ES6+), we have two main ways to declare a variable:

1.  **\`let\`**: Use this when you expect the value inside the box to change over time. For example, a user's score in a game.
    \`\`\`javascript
    let score = 0;
    console.log(score); // Output: 0
    
    score = 10; 
    console.log(score); // Output: 10
    \`\`\`
2.  **\`const\`**: Stands for "constant". Use this when the value should **never** change. If you try to reassign a \`const\`, JavaScript will throw an error. This is great for things like a user's birth year, API keys, or mathematical constants.
    \`\`\`javascript
    const birthYear = 2000;
    // birthYear = 2001; // ERROR: Assignment to constant variable.
    \`\`\`

> **Golden Rule of Modern JS:** Always use \`const\` by default. Only switch to \`let\` if you realize you absolutely need to reassign the value. Avoid \`var\` entirely (it's old and has confusing scoping rules).

### Primitive Data Types
JavaScript is a dynamically typed language, meaning you don't have to explicitly say what type of data a variable holds. It figures it out automatically. The main data types are:

*   **String**: A sequence of characters used for text. It must be wrapped in quotes (single, double, or backticks).
    \`\`\`javascript
    const name = "Anas";
    const greeting = 'Hello';
    const template = \`Welcome, \${name}\`; // Backticks allow variable interpolation!
    \`\`\`
*   **Number**: Used for both integers and decimals. There is no separate "float" type like in other languages.
    \`\`\`javascript
    const age = 21;
    const price = 19.99;
    \`\`\`
*   **Boolean**: Represents a logical entity and can only have two values: \`true\` or \`false\`. Used heavily for conditions (if/else).
    \`\`\`javascript
    const isLoggedIn = true;
    const isAdmin = false;
    \`\`\`
*   **Undefined & Null**: 
    *   \`undefined\` means a variable has been declared but hasn't been assigned a value yet.
    *   \`null\` is an intentional assignment of "nothing" or "empty".

### Reference Data Types (Objects & Arrays)
Unlike primitive types, objects and arrays can hold multiple values.

*   **Arrays**: A list of items, enclosed in square brackets \`[]\`. They are zero-indexed (the first item is at position 0).
    \`\`\`javascript
    const hobbies = ["coding", "gaming", "reading"];
    console.log(hobbies[0]); // Output: "coding"
    \`\`\`
*   **Objects**: A collection of key-value pairs, enclosed in curly braces \`{}\`. They are used to model real-world entities.
    \`\`\`javascript
    const user = {
      firstName: "Anas",
      lastName: "Manzoor",
      age: 21,
      isStudent: true
    };
    console.log(user.firstName); // Output: "Anas"
    \`\`\`

### Scope: Where do variables live?
Scope determines where a variable can be accessed.
*   **Global Scope**: Declared outside of any function. Accessible everywhere.
*   **Function Scope**: Declared inside a function. Only accessible inside that function.
*   **Block Scope**: \`let\` and \`const\` are block-scoped. If you declare them inside an \`if\` statement or a \`for\` loop, they cannot be accessed outside of it.`,
      codeExample: '// Template Literals\nconst user = "Anas";\nconst role = "Developer";\n\n// Old way (string concatenation)\nconsole.log("Hello " + user + ", you are a " + role);\n\n// Modern way (template literals)\nconsole.log(`Hello ${user}, you are a ${role}`);\n\n// Arrays and Objects\nconst skills = ["JavaScript", "React", "Node"];\nconst portfolio = {\n  owner: user,\n  skills: skills,\n  isHired: false\n};\n\nconsole.log(portfolio.skills[0]); // "JavaScript"',
      quiz: [
        { question: 'Which variable keyword allows reassignment?', options: ['const', 'let', 'static', 'fixed'], correctAnswer: 1 },
        { question: 'What is the index of the first item in an array?', options: ['1', '0', '-1', 'undefined'], correctAnswer: 1 }
      ]
    },
    {
      title: 'Functions and Arrow Functions',
      duration: '3h 00m',
      notes: `### What is a Function?
A function is a reusable block of code designed to perform a specific task. Imagine you have a recipe for baking a cake. Instead of writing out all the steps every time you want to bake, you just say "Bake Cake!" and follow the recipe. Functions are exactly like that.

### Traditional Function Declarations
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Anas")); // "Hello, Anas"
\`\`\`
*   **Parameters**: \`name\` is a placeholder.
*   **Arguments**: \`"Anas"\` is the actual value passed in.
*   **Return**: The keyword that outputs the result and stops the function.

### Arrow Functions (ES6)
ES6 introduced a much shorter syntax for writing functions. They are used everywhere in modern frameworks like React.

\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name;
}
\`\`\`

If the function body is just a single expression, you can use an **implicit return**. You can delete the curly braces and the \`return\` keyword:
\`\`\`javascript
const greet = (name) => "Hello, " + name;
\`\`\`

If there is only one parameter, you can even remove the parentheses:
\`\`\`javascript
const double = num => num * 2;
\`\`\`

### The "this" Keyword
The biggest difference between traditional functions and arrow functions is how they handle the \`this\` keyword. 
*   Traditional functions define their own \`this\` based on *how they are called*.
*   Arrow functions do **not** define their own \`this\`. They inherit it from the surrounding scope (lexical scope). This makes them perfect for callbacks inside methods.

### Array Methods (The Real Power)
Functions are often passed as arguments into array methods. These are essential for manipulating data in React:
*   **\`.map()\`**: Loops through an array and creates a *new* array by transforming each item.
*   **\`.filter()\`**: Loops through an array and creates a *new* array with only items that pass a test.
*   **\`.find()\`**: Returns the *first* item that matches a condition.
*   **\`.reduce()\`**: Reduces the whole array to a single value (like summing up a cart total).`,
      codeExample: 'const numbers = [1, 2, 3, 4, 5];\n\n// 1. Map: Double every number\nconst doubled = numbers.map(num => num * 2); \n// Result: [2, 4, 6, 8, 10]\n\n// 2. Filter: Keep only even numbers\nconst evens = numbers.filter(num => num % 2 === 0);\n// Result: [2, 4]\n\n// 3. Reduce: Sum of all numbers\nconst sum = numbers.reduce((accumulator, currentValue) => {\n  return accumulator + currentValue;\n}, 0);\n// Result: 15',
      quiz: [
        { question: 'Which array method creates a new array by transforming each item?', options: ['filter', 'map', 'reduce', 'forEach'], correctAnswer: 1 },
        { question: 'Do arrow functions have their own "this" keyword?', options: ['Yes', 'No, they inherit it', 'Only in strict mode', 'Depends on the browser'], correctAnswer: 1 }
      ]
    },
    {
      title: 'The DOM: Manipulating the Page',
      duration: '3h 15m',
      notes: `### What is the DOM?
DOM stands for **Document Object Model**. When your HTML loads in the browser, the browser converts it into a tree of objects. JavaScript can access and change this tree, which instantly updates what the user sees on the screen.

### Selecting Elements
To change something on the page, you first need to grab it.
\`\`\`javascript
// Gets a single element by its ID
const title = document.getElementById("my-title");

// Gets the FIRST element matching a CSS selector
const button = document.querySelector(".btn");

// Gets ALL elements matching a CSS selector (returns a NodeList)
const allLinks = document.querySelectorAll("a");
\`\`\`

### Changing Content
Once you have the element, you can change its text, HTML, or styles:
\`\`\`javascript
title.innerText = "New Title!"; // Changes text
title.innerHTML = "<span>New Title</span>"; // Changes HTML
title.style.color = "red"; // Changes CSS directly
title.classList.add("active"); // Adds a CSS class
\`\`\`

### Event Listeners (Making it Interactive)
This is how you make things happen when a user clicks, types, or scrolls.
\`\`\`javascript
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  // 'event' contains info about the click (like coordinates)
  console.log("Button was clicked!");
  document.body.style.backgroundColor = "black";
});
\`\`\`

### Creating and Appending Elements
You can create new HTML elements entirely with JavaScript:
\`\`\`javascript
const newDiv = document.createElement("div");
newDiv.innerText = "I was created by JS!";
newDiv.classList.add("box");

// Add it to the body
document.body.appendChild(newDiv);
\`\`\``,
      codeExample: 'const btn = document.getElementById("myBtn");\nconst text = document.getElementById("myText");\n\n// Listen for a click\nbtn.addEventListener("click", () => {\n  // Change the text\n  text.innerText = "You clicked the button!";\n  text.style.color = "#FF8C42";\n  \n  // Disable the button after click\n  btn.disabled = true;\n});',
      quiz: [
        { question: 'What does DOM stand for?', options: ['Data Object Model', 'Document Object Model', 'Digital Ordinance Model', 'None'], correctAnswer: 1 },
        { question: 'Which method selects the first element matching a CSS selector?', options: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementsByClassName'], correctAnswer: 1 }
      ]
    },
    {
      title: 'Async/Await and Promises',
      duration: '3h 30m',
      notes: `### The Problem with Synchronous Code
JavaScript is single-threaded. It can only do one thing at a time. If you fetch data from a slow server (which takes 3 seconds), the entire browser freezes for 3 seconds. This is terrible user experience.

### Asynchronous JavaScript
To solve this, JS uses asynchronous operations. This means it can start a task (like fetching data) in the background and continue running other code while it waits.

### Promises
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It has three states:
1.  **Pending**: Still waiting.
2.  **Fulfilled**: The operation completed successfully.
3.  **Rejected**: The operation failed.

\`\`\`javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Data loaded!");
  else reject("Error loading data");
});
\`\`\`

### Async / Await (The Modern Way)
ES2017 introduced \`async\` and \`await\` to make Promises much easier to read. It allows you to write asynchronous code that *looks* like synchronous code.

*   **\`async\`**: You put this keyword before a function declaration. It automatically makes the function return a Promise.
*   **\`await\`**: You put this inside an \`async\` function. It pauses the execution of the function until the Promise settles (resolves or rejects).

> **Warning:** You can only use \`await\` inside a function that is declared with \`async\`.

### Try / Catch Error Handling
When dealing with APIs, things go wrong (no internet, server down). Always wrap your \`await\` calls in a \`try...catch\` block.
\`\`\`javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
\`\`\``,
      codeExample: 'async function fetchUserData(userId) {\n  try {\n    console.log("Fetching user...");\n    \n    // Simulate a network request that takes 2 seconds\n    const response = await fetch(`https://api.github.com/users/${userId}`);\n    \n    if (!response.ok) {\n      throw new Error("User not found");\n    }\n    \n    const data = await response.json();\n    console.log(`User: ${data.name}`);\n    \n  } catch (error) {\n    console.error("Error:", error.message);\n  }\n}\n\nfetchUserData("anasmanzoor");',
      quiz: [
        { question: 'What does "await" do?', options: ['Pauses the function until the promise resolves', 'Stops the server', 'Creates a new thread', 'Deletes the data'], correctAnswer: 0 },
        { question: 'Where can you use the "await" keyword?', options: ['Anywhere in the code', 'Inside an async function', 'Only in the global scope', 'Inside a loop'], correctAnswer: 1 }
      ]
    }
  ]
};