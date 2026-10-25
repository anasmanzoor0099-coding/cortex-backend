export const vercelCourseData = {
  title: 'Vercel Deployment Guide',
  description: 'Take your apps from localhost to production. A beginner-friendly, step-by-step guide to deploying frontends, backends, and databases.',
  thumbnail: 'vercel',
  totalDuration: '4h 15m',
  modules: [
    {
      title: 'Understanding Deployment & Cloud Hosting',
      duration: '45m',
      notes: `### What does "Deploying" mean?
Right now, your app is running on \`localhost:5173\`. This means it only exists on your personal computer. If you send that link to a friend, it won't work for them. 

**Deployment** is the process of uploading your code to a server on the internet so anyone in the world can access it via a public URL (like \`www.myapp.com\`).

### What is Vercel?
Vercel is a cloud platform specifically designed for frontend frameworks (like React/Next.js) and serverless backends. It is incredibly fast, offers free SSL (HTTPS), and makes deployment as easy as pushing to GitHub.

### The 3 Parts of a Full-Stack App
To deploy a MERN stack app, you need to deploy three separate things:
1.  **Frontend** (React) -> Hosted on Vercel.
2.  **Backend** (Node/Express API) -> Hosted on Vercel (as Serverless functions).
3.  **Database** (MongoDB) -> Hosted on MongoDB Atlas (Cloud).

> **Important:** If you deploy the frontend but forget the backend, your website will load, but logging in, fetching courses, and enrolling will fail!`,
      codeExample: '// Environment Variables are the bridge between local and production\n// Local: http://localhost:5000\n// Production: https://cortex-api.vercel.app\n\nconst API_URL = import.meta.env.VITE_API_URL;',
      quiz: [{ question: 'What is deployment?', options: ['Writing code', 'Uploading code to a public server', 'Deleting localhost', 'Buying a domain'], correctAnswer: 1 }]
    },
    {
      title: 'Deploying the Frontend (React) to Vercel',
      duration: '1h 00m',
      notes: `### Step 1: Push to GitHub
Vercel deploys directly from GitHub. 
1. Open your terminal in your **frontend** folder.
2. Run \`git init\`, \`git add .\`, and \`git commit -m "Deploying frontend"\`.
3. Go to GitHub, create a new repository named \`cortex-frontend\`.
4. Link and push: \`git remote add origin <your-github-url>\` and \`git push -u origin main\`.

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New"** -> **"Project"**.
3. Find your \`cortex-frontend\` repo and click **Import**.
4. **Framework Preset**: Vercel will automatically detect Vite.
5. **Root Directory**: Leave it as \`./\` (since the frontend is the root of this repo).

### Step 3: Environment Variables (CRITICAL)
Before you click Deploy, look at the "Environment Variables" section.
You must add:
*   **Key**: \`VITE_API_URL\`
*   **Value**: The URL of your backend API (we will deploy the backend in the next module, so you can put a placeholder for now, or come back and update this later).

Click **Deploy**. In 30 seconds, your frontend is live! Every time you push to GitHub, Vercel will automatically redeploy your site.`,
      codeExample: '// In your frontend code, make sure you are using the env variable!\nconst API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";\n\naxios.get(`${API_URL}/api/courses`);',
      quiz: [{ question: 'Where do you add secrets like API URLs in Vercel?', options: ['In the code', 'In the Vercel Project Settings -> Environment Variables', 'In a text file', 'In package.json'], correctAnswer: 1 }]
    },
    {
      title: 'Deploying the Backend API to Vercel',
      duration: '1h 30m',
      notes: `### Step 1: Prepare the Backend
Vercel hosts backends as **Serverless Functions**. We need to make sure our Express app is ready.
1. Ensure your \`backend/api/index.js\` file exports the Express app: \`export default app;\`
2. Ensure you have a \`vercel.json\` file in the backend root:
\`\`\`json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/api/index.js" }
  ]
}
\`\`\`
3. Push your backend folder to a **new** GitHub repository (e.g., \`cortex-backend\`).

### Step 2: Import Backend to Vercel
1. In Vercel, click **"Add New"** -> **"Project"**.
2. Import your \`cortex-backend\` repo.

### Step 3: The Backend Environment Variables
In the Environment Variables section, add ALL the variables from your local \`.env\` file:
*   \`MONGO_URI\`: Your MongoDB Atlas connection string.
*   \`JWT_SECRET\`: Your secret string.
*   \`EMAIL_USER\`: Your Gmail.
*   \`EMAIL_PASS\`: Your 16-digit app password.
*   \`INSTRUCTOR_SECRET_CODE\`: \`anas2026\`
*   \`CLIENT_URL\`: Your live Vercel frontend URL (e.g., \`https://cortex-frontend.vercel.app\`).

Click **Deploy**. 
> **Note:** Once deployed, Vercel will give you a backend URL (like \`https://cortex-api.vercel.app\`). Copy this URL.

### Step 4: Update Frontend API URL
Go back to your frontend project on Vercel. Go to Settings -> Environment Variables. Update \`VITE_API_URL\` with your new live backend URL. Go to Deployments and click "Redeploy" so the frontend uses the new backend link.`,
      codeExample: '// backend/vercel.json\n{\n  "version": 2,\n  "rewrites": [\n    {\n      "source": "/(.*)",\n      "destination": "/api/index.js"\n    }\n  ]\n}',
      quiz: [{ question: 'What file tells Vercel where your Express app is?', options: ['package.json', 'index.html', 'vercel.json', '.env'], correctAnswer: 2 }]
    },
    {
      title: 'Whitelisting Vercel IPs in MongoDB Atlas',
      duration: '1h 00m',
      notes: `### The "Connection Timeout" Error
When you deploy your backend, it might crash with an error saying \`MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster\`.

This happens because MongoDB Atlas blocks all IP addresses by default for security. Your local computer's IP is whitelisted, but Vercel's servers have different IPs.

### How to Fix It
Because Vercel uses dynamic, changing IPs for serverless functions, you cannot whitelist a single IP. You have to allow access from anywhere.

1. Log in to **MongoDB Atlas**.
2. On the left sidebar, click **Network Access**.
3. Click the green **"+ Add IP Address"** button.
4. Click **"Allow Access from Anywhere"**.
5. It will automatically enter \`0.0.0.0/0\` (which means all IPs).
6. Click **Confirm**.

> **Security Warning:** This makes your database accessible from the internet. This is safe **ONLY IF** you have a very strong database password. Never use \`password123\` for a production database!`,
      codeExample: '// If your database password contains special characters like @, #, or %,\n// you MUST URL-encode them in the connection string.\n// Example: Password = my@pass\n// String: mongodb+srv://user:my%40pass@cluster...',
      quiz: [{ question: 'What IP address allows access from anywhere in MongoDB?', options: ['127.0.0.1', '0.0.0.0/0', '255.255.255.255', 'localhost'], correctAnswer: 1 }]
    }
  ]
};