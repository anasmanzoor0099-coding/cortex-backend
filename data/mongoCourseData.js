export const mongoCourseData = {
  title: 'MongoDB & Mongoose',
  description: 'Learn NoSQL database design, CRUD operations, advanced querying, and data modeling with Mongoose.',
  thumbnail: 'mongodb',
  totalDuration: '6h 30m',
  modules: [
    {
      title: 'What is MongoDB?',
      duration: '1h 30m',
      notes: `### SQL vs NoSQL
Traditional databases (like MySQL, PostgreSQL) are **SQL** (relational). They store data in tables with rows and columns. You must define the schema (columns) before inserting data.

**MongoDB is NoSQL** (non-relational). It stores data in **Documents**. A document is essentially a JSON object. 
\`\`\`json
{
  "name": "Anas",
  "age": 21,
  "skills": ["JS", "React", "Node"]
}
\`\`\`

### Why MongoDB?
*   **Flexible Schema**: You don't have to define every field upfront. Different documents in the same collection can have different fields.
*   **Scales easily**: Built for horizontal scaling (adding more servers) rather than vertical scaling (buying a bigger server).
*   **JSON-like structure**: JavaScript developers feel right at home.

### Collections and Documents
*   **Document**: A single record (like a row in SQL).
*   **Collection**: A group of documents (like a table in SQL).
*   **Database**: A group of collections.

### MongoDB Atlas
Instead of installing MongoDB on your computer, we use **MongoDB Atlas**. It is a fully-managed cloud database. It gives you a connection string (URI) that you put in your \`.env\` file.`,
      codeExample: '// Example of a MongoDB Document\n{\n  "_id": "60d5ecb8b392d715b8a3c4a1",\n  "title": "Learn Node",\n  "author": "Anas",\n  "tags": ["backend", "api"],\n  "published": true\n}',
      quiz: [{ question: 'How does MongoDB store data?', options: ['Tables', 'Documents (JSON)', 'Excel sheets', 'Text files'], correctAnswer: 1 }]
    },
    {
      title: 'Mongoose Schemas & Models',
      duration: '2h 30m',
      notes: `### Why Mongoose?
While MongoDB is schema-less, you don't want to just dump random data into it. You want structure and validation. **Mongoose** is an ODM (Object Data Modeling) library for MongoDB and Node.js.

### Defining a Schema
A Schema defines the shape of your documents, default values, and validators.

\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    unique: true,
    lowercase: true 
  },
  age: { 
    type: Number, 
    min: 18 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});
\`\`\`

### Creating a Model
A Model is a wrapper around the schema. It provides an interface to the database for CRUD operations.

\`\`\`javascript
const User = mongoose.model('User', userSchema);
\`\`\`
*(Note: Mongoose will automatically pluralize 'User' to 'users' as the collection name).*

### Data Types in Mongoose
Mongoose supports several types: \`String\`, \`Number\`, \`Date\`, \`Buffer\`, \`Boolean\`, \`Mixed\`, \`ObjectId\`, \`Array\`, \`Decimal128\`.`,
      codeExample: 'const mongoose = require("mongoose");\n\nconst courseSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  price: { type: Number, default: 0 },\n  isPublished: { type: Boolean, default: false },\n  modules: [String] // Array of strings\n});\n\nconst Course = mongoose.model("Course", courseSchema);\n\n// Usage\n// const newCourse = new Course({ title: "React Bootcamp" });\n// await newCourse.save();',
      quiz: [{ question: 'What does Mongoose do?', options: ['Styles the page', 'Enforces structure on MongoDB data', 'Creates HTML', 'Replaces Node.js'], correctAnswer: 1 }]
    },
    {
      title: 'CRUD Operations with Mongoose',
      duration: '2h 30m',
      notes: `### CRUD (Create, Read, Update, Delete)
Mongoose provides beautiful, chainable methods to interact with MongoDB.

### Create
\`\`\`javascript
const newUser = await User.create({ 
  name: "Anas", 
  email: "anas@test.com" 
});
\`\`\`

### Read (Querying)
*   Find all: \`const users = await User.find();\`
*   Find with condition: \`const user = await User.findOne({ email: "anas@test.com" });\`
*   Find by ID: \`const user = await User.findById(id);\`
*   **Advanced querying**:
    \`\`\`javascript
    const users = await User.find({ age: { $gt: 18 } }) // Age greater than 18
      .sort({ createdAt: -1 }) // Newest first
      .limit(10); // Only 10 results
    \`\`\`

### Update
\`\`\`javascript
// Find and update (returns the old document by default)
await User.findByIdAndUpdate(id, { name: "New Name" });

// If you want the updated document returned, pass { new: true }
await User.findByIdAndUpdate(id, { name: "New Name" }, { new: true });
\`\`\`

### Delete
\`\`\`javascript
await User.findByIdAndDelete(id);
// Or delete many:
await User.deleteMany({ isActive: false });
\`\`\``,
      codeExample: 'async function runDatabaseOps() {\n  // 1. CREATE\n  const user = await User.create({ name: "Tester", email: "t@t.com" });\n\n  // 2. READ\n  const foundUser = await User.findById(user._id);\n\n  // 3. UPDATE\n  foundUser.name = "Senior Tester";\n  await foundUser.save();\n\n  // 4. DELETE\n  await User.findByIdAndDelete(user._id);\n}',
      quiz: [{ question: 'Which operator in MongoDB means "greater than"?', options: ['$lt', '$gt', '$eq', '$ne'], correctAnswer: 1 }]
    }
  ]
};