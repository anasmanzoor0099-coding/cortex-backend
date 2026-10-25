export const projectsCourseData = {
  title: 'Full-Stack Project Ideas',
  description: 'A curated list of project briefs with tech stacks and requirements to build your portfolio and get hired.',
  thumbnail: 'projects',
  totalDuration: '0h 00m',
  modules: [
    {
      title: 'Why Build Projects?',
      duration: '30m',
      notes: `### The Portfolio Problem
In today's job market, having a degree or a certificate is not enough. Recruiters want to see that you can actually **build things**. 

A portfolio with 3 impressive, full-stack projects is worth more than 50 small tutorial clones.

### What makes a good project?
1.  **Solves a real problem** (Even a small one).
2.  **Has Authentication** (Login/Signup, different user roles).
3.  **Uses a Database** (CRUD operations).
4.  **Looks good** (Responsive UI, not just raw HTML).
5.  **Is deployed** (Live URL).

### Project 1: E-Commerce Store
**Tech Stack:** React, Node, Express, MongoDB, Stripe.
**Features:**
*   Product catalog with search and filtering.
*   Shopping cart (using React Context API or Redux).
*   User authentication and order history.
*   Admin dashboard to add products.
*   Stripe API for checkout.`,
      codeExample: '// Example data model for an E-Commerce Order\n{\n  _id: "order123",\n  user: "user456",\n  items: [\n    { productId: "prod1", quantity: 2, price: 29.99 },\n    { productId: "prod2", quantity: 1, price: 49.99 }\n  ],\n  totalAmount: 109.97,\n  status: "processing"\n}',
      quiz: [{ question: 'What is the most important thing to show in a portfolio project?', options: ['Complex backend code', 'That you can actually build something functional', 'The number of files', 'The color scheme'], correctAnswer: 1 }]
    },
    {
      title: 'Project 2: Real-Time Chat App',
      duration: '45m',
      notes: `### The Challenge
Most CRUD apps use HTTP requests (Request -> Response). But chat apps need **WebSockets**. You need the server to push data to the client instantly without the client asking for it.

**Tech Stack:** React, Node, Express, MongoDB, Socket.io.
**Features:**
*   Real-time messaging (instantly appears on the other screen).
*   Online/Offline status indicators.
*   Typing indicators ("Anas is typing...").
*   Group chats.
*   Image sharing (using Cloudinary or AWS S3).

### How Socket.io works
1. The client connects to the server via WebSocket.
2. The server keeps that connection open.
3. When User A sends a message, the server instantly broadcasts it to User B.

> **Tip:** This project looks incredibly impressive in an interview because WebSockets are seen as "advanced" by many beginners.`,
      codeExample: '// Server-side Socket.io setup\nconst io = require("socket.io")(server, { cors: { origin: "*" } });\n\nio.on("connection", (socket) => {\n  console.log("A user connected");\n  \n  socket.on("send_message", (data) => {\n    // Broadcast to everyone else\n    socket.broadcast.emit("receive_message", data);\n  });\n});',
      quiz: [{ question: 'Which technology is used for real-time bidirectional communication?', options: ['REST API', 'WebSockets (Socket.io)', 'GraphQL', 'FTP'], correctAnswer: 1 }]
    },
    {
      title: 'Project 3: Project Management Tool',
      duration: '45m',
      notes: `### The Challenge
Build a tool like Trello or Asana. This tests your ability to handle complex state, drag-and-drop UI, and relational data (Users -> Projects -> Tasks).

**Tech Stack:** React (with @hello-pangea/dnd for drag and drop), Node, Express, MongoDB.
**Features:**
*   Multiple projects per user.
*   Kanban board (To Do, In Progress, Done).
*   Drag and drop tasks between columns.
*   Assign tasks to other team members.
*   Comment sections on tasks.

### Database Design
For this project, you will learn how to structure **relational data** in a NoSQL database.
*   A **User** can have many Projects.
*   A **Project** can have many Tasks.
*   A **Task** belongs to a Project and is assigned to a User.`,
      codeExample: '// Drag and Drop setup with @hello-pangea/dnd\nimport { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";\n\n<DragDropContext onDragEnd={handleOnDragEnd}>\n  <Droppable droppableId="tasks">\n    {(provided) => (\n      <ul {...provided.droppableProps} ref={provided.innerRef}>\n        {tasks.map((task, index) => (\n          <Draggable key={task.id} draggableId={task.id} index={index}>\n            {(provided) => (\n              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>\n                {task.title}\n              </li>\n            )}\n          </Draggable>\n        ))}\n      </ul>\n    )}\n  </Droppable>\n</DragDropContext>',
      quiz: [{ question: 'What is the primary UI pattern used in tools like Trello?', options: ['Carousel', 'Kanban Board with Drag and Drop', 'Infinite Scroll', 'Modal'], correctAnswer: 1 }]
    }
  ]
};