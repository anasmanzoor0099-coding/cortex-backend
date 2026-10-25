export const gitCourseData = {
  title: 'Git & GitHub Mastery',
  description: 'Version control explained simply. Never lose your code again. Master branching, merging, pull requests, and team workflows.',
  thumbnail: 'git',
  totalDuration: '4h 45m',
  modules: [
    {
      title: 'Git Basics: Init, Add, Commit',
      duration: '1h 20m',
      notes: `### Why Git?
Imagine writing a 10,000-word essay, saving it as "Essay_Final", then "Essay_Final_v2", then "Essay_Final_REAL". It's a mess. Git is a **Version Control System**. It takes snapshots of your code at specific moments, allowing you to travel back in time if you break something.

### The Three Stages of Git
Git has three main areas:
1.  **Working Directory**: Where you are currently editing your files.
2.  **Staging Area**: A waiting room for your changes.
3.  **Local Repository**: Where Git permanently saves your snapshots (commits).

### The Basic Workflow
1.  **Initialize**: Turn a regular folder into a Git repository.
    \`\`\`bash
    git init
    \`\`\`
2.  **Add**: Move files from the working directory to the staging area.
    \`\`\`bash
    git add index.html
    # Or add everything:
    git add .
    \`\`\`
3.  **Commit**: Save the staged files to the local repository with a message.
    \`\`\`bash
    git commit -m "Added the navigation bar"
    \`\`\`
    
> **Pro Tip:** Write clear commit messages. "Fixed bug" is bad. "Fixed login button alignment on mobile" is good.`,
      codeExample: 'git init\ngit add .\ngit commit -m "Initial commit"',
      quiz: [{ question: 'Which command saves a snapshot of your code?', options: ['git add', 'git save', 'git commit', 'git push'], correctAnswer: 2 }]
    },
    {
      title: 'Branching and Merging',
      duration: '1h 30m',
      notes: `### What is a Branch?
A branch allows you to diverge from the main line of development. Imagine you want to add a new feature (like a dark mode). Instead of doing it directly on the main code (and potentially breaking it), you create a branch.

### Creating and Switching Branches
\`\`\`bash
# Create a new branch
git branch dark-mode

# Switch to it
git checkout dark-mode

# Or do both in one command (modern way):
git switch -c dark-mode
\`\`\`

### Merging
Once you finish your dark mode feature and test it, you want to combine it with the main code. First, switch back to the main branch, then merge.
\`\`\`bash
git switch main
git merge dark-mode
\`\`\`

### Merge Conflicts
Sometimes, you change a line in the main branch, and someone else changes the exact same line in another branch. Git doesn't know which one to keep, so it throws a **Merge Conflict**. 
You will see weird characters like \`<<<<<<<\` in your code. You just have to manually delete the wrong code, save the file, and run \`git add\` and \`git commit\` again.`,
      codeExample: 'git branch new-feature\ngit checkout new-feature\n// make changes...\ngit checkout main\ngit merge new-feature',
      quiz: [{ question: 'Why do we use branches?', options: ['To break the code', 'To work on features safely', 'To delete Git', 'To push to GitHub'], correctAnswer: 1 }]
    },
    {
      title: 'Pushing to GitHub',
      duration: '1h 00m',
      notes: `### Local vs Remote
Git is local on your computer. **GitHub** is a website that hosts your Git repositories in the cloud. Pushing your code means uploading your local commits to GitHub so others can see it or collaborate with you.

### Linking your Local Repo to GitHub
1. Create a new repository on GitHub.com (do NOT initialize it with a README).
2. Copy the URL of the new repo.
3. In your terminal, link it:
\`\`\`bash
git remote add origin https://github.com/yourname/repo.git
\`\`\`

### Pushing your code
\`\`\`bash
# The -u flag sets the upstream, so next time you can just type 'git push'
git push -u origin main
\`\`\`

### Pulling changes
If someone else changed the code on GitHub, you need to pull it down to your local computer:
\`\`\`bash
git pull origin main
\`\`\``,
      codeExample: 'git remote add origin https://github.com/yourname/repo.git\ngit push -u origin main\ngit pull origin main',
      quiz: [{ question: 'What is GitHub?', options: ['A programming language', 'A code editor', 'A cloud platform for hosting Git repos', 'A database'], correctAnswer: 2 }]
    }
  ]
};