export const nodeCourseData = {
  title: 'Node.js & Express API',
  description: 'Build scalable backend servers, RESTful APIs, handle authentication with JWT, and connect to databases.',
  thumbnail: 'node',
  totalDuration: '9h 10m',
  modules: [
    {
      title: 'Introduction to Node.js & NPM',
      duration: '2h 00m',
      notes: `### What is Node.js?
For decades, JavaScript could only run inside a web browser. If you wanted to build a backend (server), you had to use PHP, Python, Java, or Ruby. 

**Node.js changed everything.** It is a runtime environment that allows you to run JavaScript on the server. This means you can use one language (JavaScript) for both your frontend and backend.

### The V8 Engine
Node.js is built on Chrome's V8 engine. It compiles JavaScript directly into machine code, making it incredibly fast.

### Non-Blocking, Asynchronous I/O
Node.js is single-threaded but highly scalable. How? It uses an **event loop**. Instead of waiting for a database query to finish (blocking), Node.js sends the query, moves on to handle other requests, and comes back when the data is ready.

### NPM (Node Package Manager)
When you install Node.js, you also get NPM. It is the largest ecosystem of open-source libraries in the world.
*   \`npm init -y\`: Creates a \`package.json\` file (the blueprint of your project).
*   \`npm install express\`: Downloads a package and adds it to the \`node_modules\` folder.
*   \`npm install -D nodemon\`: Installs a package as a **Dev Dependency** (only used while coding, not in production).`,
      codeExample: '// Your first Node script (index.js)\nconst fs = require("fs");\n\n// Write to a file asynchronously\nfs.writeFile("test.txt", "Hello Node!", (err) => {\n  if (err) throw err;\n  console.log("File saved!");\n});\n\nconsole.log("This runs FIRST because Node is non-blocking!");',
      quiz: [{ question: 'What is Node.js?', options: ['A programming language', 'A JavaScript runtime environment', 'A database', 'A frontend framework'], correctAnswer: 1 }]
    },
    {
      title: 'Building an Express Server',
      duration: '2h 30m',
      notes: `### Why Express?
Node.js has a built-in \`http\` module to create servers, but it's very low-level and tedious. **Express** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Setting up an Express Server
1. Install Express: \`npm install express\`
2. Require it and create an app instance.
3. Create a route.
4. Listen on a port.

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 5000;

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

### Routing
Routing refers to how an application responds to a client request to a particular endpoint (URI) and a specific HTTP method (GET, POST, PUT, DELETE).
*   \`app.get()\`: Fetch data.
*   \`app.post()\`: Create new data.
*   \`app.put()\`: Update existing data.
*   \`app.delete()\`: Remove data.

### Request (req) and Response (res)
*   **req** contains information about the incoming request (URL parameters, body data, headers).
*   **res** is how you reply to the client (\`res.send()\`, \`res.json()\`, \`res.status(404).send()\`).`,
      codeExample: 'const express = require("express");\nconst app = express();\n\n// Middleware to parse JSON bodies\napp.use(express.json());\n\napp.get("/api/users", (req, res) => {\n  res.json({ name: "Anas", role: "Developer" });\n});\n\napp.post("/api/users", (req, res) => {\n  const newUser = req.body;\n  console.log("Received:", newUser);\n  res.status(201).json({ message: "User created", user: newUser });\n});\n\napp.listen(5000, () => console.log("Server started on 5000"));',
      quiz: [{ question: 'Which HTTP method is used to create new data?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 1 }]
    },
    {
      title: 'Middleware and Error Handling',
      duration: '2h 15m',
      notes: `### What is Middleware?
Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the \`next\` function in the application’s request-response cycle.

Think of it as a checkpoint. When a request comes in, it passes through middleware before hitting your route handler.

### Common Uses of Middleware
1.  **Body Parsing**: \`app.use(express.json())\` converts incoming JSON into a JavaScript object (req.body).
2.  **Logging**: Printing the request method and URL to the console (Morgan).
3.  **Authentication**: Checking if the user has a valid JWT token before letting them access a route.
4.  **CORS**: Allowing your frontend to talk to your backend (\`app.use(cors())\`).

### Custom Middleware
\`\`\`javascript
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // MUST call next() to pass control to the next middleware/route
};

app.use(logger);
\`\`\`

### Error Handling Middleware
If an error happens in a route, Express has a special middleware with 4 arguments to catch it.
\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});
\`\`\``,
      codeExample: 'const express = require("express");\nconst app = express();\n\n// Custom middleware\nconst authCheck = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (token === "secret123") {\n    next(); // Proceed to the route\n  } else {\n    res.status(401).json({ error: "Unauthorized" });\n  }\n};\n\n// Protected route\napp.get("/api/secret", authCheck, (req, res) => {\n  res.json({ data: "Top secret data" });\n});\n\napp.listen(5000);',
      quiz: [{ question: 'What function MUST you call in a middleware to proceed?', options: ['res.send()', 'req.end()', 'next()', 'app.use()'], correctAnswer: 2 }]
    }
  ]
};