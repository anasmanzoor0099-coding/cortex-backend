export const gitCourseData = {
  "title": "Git & GitHub Mastery",
  "description": "Go from zero version-control experience to collaborating like a senior engineer. Master snapshots, staging, branching, merging, rebasing, conflict resolution, Pull Requests, and emergency recovery with git reflog.",
  "thumbnail": "git",
  "totalDuration": "10h 00m",
  "category": "Developer Tools",
  "difficulty": "Beginner",
  "tags": [
    "Git",
    "GitHub",
    "Version Control",
    "Branching",
    "Pull Requests"
  ],
  "learningOutcomes": [
    "Understand how Git stores snapshots, trees, and commit history under the hood",
    "Stage selective changes and craft clean, atomic Conventional Commits",
    "Create, merge, rebase, and clean up feature branches without losing work",
    "Resolve merge conflicts methodically and verify builds before committing",
    "Collaborate on GitHub using forks, remotes, Pull Requests, and code reviews",
    "Recover safely from mistakes using git restore, git revert, git reset, and git reflog"
  ],
  "prerequisites": [
    "Basic familiarity with opening a terminal / command line"
  ],
  "targetAudience": "Developers at any stage who want rock-solid confidence with Git and team GitHub workflows.",
  "practicalProject": "Manage a multi-branch repository: create feature branches, rebase onto updated main, resolve a deliberate merge conflict, open a Pull Request, and tag v1.0.0.",
  "modules": [
    {
      "title": "Module 1: Version Control Foundations & The Three Git Areas",
      "duration": "1h 30m",
      "objectives": [
        "Explain why Git stores snapshots instead of file diffs",
        "Configure user identity, default branch name, and line endings",
        "Navigate the Working Directory, Staging Area (Index), and Local Repository",
        "Craft clean atomic commits and protect secrets with .gitignore"
      ],
      "notes": "### Module Introduction\nGit is the universal version-control system of modern software engineering. Understanding Git's **three local areas** and **snapshot model** turns confusing error messages into crystal-clear mental models.\n\n### Prerequisites\n- Ability to open a terminal (PowerShell, Terminal, or Git Bash) and run basic commands (`cd`, `mkdir`, `ls`).\n\n### How the Lessons Connect\n- **Lesson 1** explains Git's internal snapshot object model and first-time configuration.\n- **Lesson 2** walks through staging changes, writing atomic Conventional Commits, and preventing secret leaks with `.gitignore`.\n\n### Module Summary\nYou will initialize repositories cleanly, inspect diffs before committing, and keep `.env` secrets and `node_modules` out of Git history forever.\n\n### Completion Criteria\n- Read both lessons and run the terminal exercises locally.\n- Complete the Repository Setup & Secret Protection assignment.\n- Pass the Module 1 Knowledge Check with 100%.",
      "assignment": "Problem Statement:\nA new teammate accidentally committed a .env file containing database passwords and 15,000 files from node_modules/ into a project repository. You need to initialize a clean repository from scratch with proper configuration, .gitignore rules, and atomic commits.\n\nObjectives:\n- Initialize a Git repo with main as the default branch.\n- Configure .gitignore BEFORE staging any files.\n- Create two clean, atomic commits following Conventional Commits format.\n\nRequirements:\n1. Create a folder git-practice and run git init -b main.\n2. Create a .gitignore ignoring .env, .env.*, node_modules/, dist/, and .DS_Store.\n3. Create a dummy .env file (with SECRET=test123) and a README.md.\n4. Run git status to verify .env is NOT listed under untracked files.\n5. Stage and commit README.md (\"docs: add project README\") and .gitignore (\"chore: add gitignore rules\") as two separate atomic commits.\n\nStep-by-Step Instructions:\n1. Verify your global Git identity with git config --list.\n2. Initialize the repo and create .gitignore first.\n3. Create .env and README.md, then run git status.\n4. Stage .gitignore alone (git add .gitignore), commit, then stage README.md and commit.\n5. Run git log --oneline --stat to inspect your two clean commits.\n\nDeliverables:\n- Output of git status (showing clean working tree) and git log --oneline --stat.\n\nEvaluation Criteria:\n- .env is completely ignored by Git.\n- Two separate, logical commits rather than one \"initial commit\" dumping everything together.",
      "lessons": [
        {
          "title": "How Git Stores Snapshots & First-Time Setup",
          "duration": "45m",
          "introduction": "Unlike older systems that store lists of line-by-line changes, Git treats every commit like a lightweight photograph of your entire project.",
          "objectives": [
            "Contrast snapshot storage with delta-based version control",
            "Identify the Working Directory, Staging Area (Index), and .git Repository",
            "Configure git config --global user.name, user.email, and init.defaultBranch"
          ],
          "notes": "### Snapshots, Not Diffs\nEvery time you run `git commit`, Git takes a **snapshot** of all tracked files at that moment and computes a unique **SHA-1 hash** (like `a3f91c2`) for the commit. If a file did not change since the last commit, Git doesn't duplicate it — it simply stores a lightweight link to the previous version! That is why switching branches in Git takes milliseconds.\n\n### The Three Git Areas\n1. **Working Directory**: The normal files on your disk that you edit in VS Code.\n2. **Staging Area (Index)**: A preparation zone inside `.git/index`. You choose *exactly* which changes belong in the next snapshot using `git add`.\n3. **Local Repository (`.git/`)**: The permanent history database of committed snapshots.\n\n### Essential First-Time Setup\nBefore your first commit on a new machine, tell Git who you are (stored in `~/.gitconfig`):\n- `git config --global user.name \"Your Name\"`\n- `git config --global user.email \"you@example.com\"`\n- `git config --global init.defaultBranch main`",
          "codeExample": "# Check Git version and current configuration\ngit --version\ngit config --global user.name \"Ada Lovelace\"\ngit config --global user.email \"ada@example.com\"\ngit config --global init.defaultBranch main\n\n# Initialize a new repository\nmkdir cortex-demo && cd cortex-demo\ngit init\n\n# Inspect the hidden .git directory and current status\ngit status",
          "codeExplanation": "1. git config --global sets your author name, email, and default branch ('main') once for all repositories on your computer.\n2. git init creates the hidden .git/ folder that turns a normal directory into a Git repository.\n3. git status reports the current branch, staged changes, unstaged modifications, and untracked files.\n\nHow to Run & Expected Output:\nRun these commands in PowerShell, Terminal, or Git Bash. git status prints: \"On branch main / No commits yet / nothing to commit\".",
          "practiceExercise": "Guided Exercise:\n1. Run git config --list --show-origin in your terminal to see where Git reads system, global, and local settings.\n\nIndependent Challenge:\nInitialize a temporary folder, add a hello.txt file, and check git status before and after running git add hello.txt to watch it move from Untracked to Changes to be committed.\n\nHints:\n- Deleting the hidden .git folder turns a Git repository back into a plain folder (deleting all commit history!).",
          "keyTakeaways": [
            "Git stores lightweight immutable snapshots identified by commit hashes, not file diffs",
            "Work flows through three areas: Working Directory -> Staging Area -> Local Repository",
            "Always configure user.name, user.email, and init.defaultBranch before committing",
            "Run git status frequently to see the exact state of all three areas"
          ]
        },
        {
          "title": "Staging, Atomic Commits & Protecting Secrets with .gitignore",
          "duration": "45m",
          "introduction": "The Staging Area lets you group related edits into clean, reviewable commits — while .gitignore keeps passwords and build artifacts out of history.",
          "objectives": [
            "Inspect exact line changes with git diff and git diff --staged",
            "Write atomic commits using Conventional Commits prefixes",
            "Configure .gitignore and remove accidentally tracked files with git rm --cached"
          ],
          "notes": "### Why Atomic Commits Matter\nAn **atomic commit** represents **one logical change** (e.g., fixing one bug or adding one feature). Avoid dumping 12 unrelated edits into `\"wip stuff\"`. Small atomic commits make code reviews faster and allow `git revert` to undo a single broken feature cleanly.\n\n**Conventional Commits** format:\n- `feat: add password reset endpoint`\n- `fix: prevent crash when cart is empty`\n- `docs: update API setup instructions`\n- `refactor: extract date formatting helper`\n\n### Protecting Secrets with `.gitignore`\nCreate a `.gitignore` file in your repo root **before** running `git add .` so you never leak `.env` API keys or commit huge `node_modules/` folders.\n**Important Gotcha**: `.gitignore` only ignores *untracked* files! If you already committed `.env` earlier, adding it to `.gitignore` will **not** untrack it — you must run `git rm --cached .env` and commit that removal (and rotate any leaked API keys immediately!).",
          "codeExample": "# Create .gitignore before staging anything\necho \".env\" >> .gitignore\necho \"node_modules/\" >> .gitignore\necho \"dist/\" >> .gitignore\n\n# Inspect unstaged and staged diffs\ngit diff\ngit add .gitignore\ngit diff --staged\n\n# Commit with a clear Conventional Commit message\ngit commit -m \"chore: configure gitignore for secrets and build outputs\"\n\n# If a secret file was tracked by mistake, untrack it without deleting locally:\ngit rm --cached .env",
          "codeExplanation": "1. Appending patterns to .gitignore prevents Git from tracking .env, node_modules/, and dist/.\n2. git diff compares Working Directory vs Staging Area; git diff --staged compares Staging Area vs last Commit.\n3. git rm --cached removes a file from Git's index without deleting the file from your local hard drive.\n\nHow to Run & Expected Output:\nRun inside any Git repo. git commit prints the branch, short commit hash, and summary of files changed.",
          "practiceExercise": "Guided Exercise:\n1. Edit two different files in a test repo, stage only ONE of them with git add file1.txt, and run git diff vs git diff --staged.\n\nIndependent Challenge:\nUse git add -p (patch mode) on a file with two separate edits to stage only the first edit and leave the second edit unstaged.\n\nHints:\n- In git add -p, press y to stage a hunk, n to skip it, or s to split a large hunk into smaller pieces.",
          "keyTakeaways": [
            "Keep each commit atomic (one logical change) with a clear Conventional Commit message",
            "Use git diff --staged to review exactly what will enter the next commit",
            "Always create .gitignore before your first git add . to protect .env secrets",
            "Use git rm --cached <file> to untrack a previously committed file without deleting it locally"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which Git area holds changes selected via git add before they are permanently recorded by git commit?",
          "options": [
            "Remote Origin",
            "Staging Area (Index)",
            "Stash Stack",
            "Reflog"
          ],
          "correctAnswer": 1,
          "explanation": "git add places file snapshots into the Staging Area (Index), allowing you to review and group changes before git commit saves them."
        },
        {
          "question": "You accidentally committed .env yesterday. Today you add .env to .gitignore, but Git still tracks changes to .env. Why?",
          "options": [
            ".gitignore only works on Linux",
            ".gitignore only ignores untracked files; you must run git rm --cached .env first",
            ".gitignore requires a reboot",
            "You must rename .env to env.txt"
          ],
          "correctAnswer": 1,
          "explanation": ".gitignore does not untrack already-committed files. Run git rm --cached .env and commit the change to stop tracking it."
        },
        {
          "question": "Which command previews the exact line-by-line changes currently in your Staging Area waiting to be committed?",
          "options": [
            "git status",
            "git diff --staged",
            "git log --oneline",
            "git branch -a"
          ],
          "correctAnswer": 1,
          "explanation": "git diff --staged (or --cached) shows the diff between the Staging Area and the latest commit (HEAD)."
        },
        {
          "question": "What does an \"atomic commit\" mean?",
          "options": [
            "A commit containing every file in the entire repository",
            "A commit representing one complete, self-contained logical change",
            "A commit pushed directly to production without review",
            "A commit with no commit message"
          ],
          "correctAnswer": 1,
          "explanation": "Atomic commits group one logical change per commit, making history readable, bisecting fast, and reverts safe."
        }
      ]
    },
    {
      "title": "Module 2: Branching, Merging & Conflict Resolution",
      "duration": "1h 45m",
      "objectives": [
        "Explain what a Git branch actually is (a lightweight 41-byte pointer to a commit)",
        "Create, switch, and delete feature branches cleanly with git switch",
        "Distinguish Fast-Forward merges from 3-Way Merge Commits",
        "Resolve merge conflicts methodically without losing either side’s work"
      ],
      "notes": "### Module Introduction\nBranching is Git's killer feature. Because a branch is just a movable pointer to a commit, creating a branch to experiment or build a new feature costs almost zero disk space and keeps `main` deployable at all times.\n\n### Prerequisites\n- Completion of Module 1 (commits, staging, status).\n\n### How the Lessons Connect\n- **Lesson 1** covers creating/switching branches with `git switch` and how Fast-Forward vs 3-Way merges work.\n- **Lesson 2** walks step-by-step through causing, reading, and resolving real merge conflicts safely.\n\n### Module Summary\nYou will work confidently on isolated feature branches, merge completed features back to `main`, and resolve conflicting edits without panic.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the Intentional Merge Conflict Resolution assignment.\n- Pass the Module 2 quiz with 100%.",
      "assignment": "Problem Statement:\nTwo developers edited the same configuration file on separate branches (feat/header and feat/footer) while main moved forward. You must simulate this exact scenario locally and resolve the resulting merge conflict cleanly.\n\nObjectives:\n- Create and switch between feature branches using git switch.\n- Trigger a real 3-way merge conflict on the same line of a file.\n- Resolve the conflict cleanly, verify the file works, and complete the merge commit.\n\nRequirements:\n1. Start on main with a file config.json containing { \"theme\": \"light\", \"version\": 1 }.\n2. Create branch feat/dark-theme, change \"theme\" to \"dark\", and commit.\n3. Switch back to main, create branch feat/ocean-theme from main, change \"theme\" to \"ocean\", and commit.\n4. Merge feat/dark-theme into main (Fast-Forward).\n5. Merge feat/ocean-theme into main -> observe the CONFLICT in config.json.\n6. Edit config.json to keep \"ocean-dark\" (removing all <<<<<<<, =======, >>>>>>> markers), validate JSON syntax, stage, and commit the merge.\n7. Delete both merged feature branches with git branch -d.\n\nStep-by-Step Instructions:\n1. Run git switch -c feat/dark-theme, edit config.json, commit.\n2. Run git switch main, then git switch -c feat/ocean-theme, edit the same line, commit.\n3. Run git switch main, merge the first branch, then merge the second branch.\n4. Run git status during the conflict, resolve config.json, run git add config.json, then git commit.\n\nDeliverables:\n- Output of git log --oneline --graph --all showing the merge commit and deleted branches.\n\nEvaluation Criteria:\n- Zero conflict markers left in config.json.\n- Valid JSON syntax verified.\n- Feature branches cleaned up after merge.",
      "lessons": [
        {
          "title": "Branching & Merging Strategies",
          "duration": "50m",
          "introduction": "Never commit experimental half-finished code directly onto main. Feature branches give you a safe sandbox in under a second.",
          "objectives": [
            "Create and switch branches using modern git switch -c",
            "Contrast Fast-Forward merges with 3-Way Merge Commits",
            "Clean up merged branches safely using git branch -d"
          ],
          "notes": "### What Is a Branch Really?\nA branch in Git is simply a **movable pointer** to a specific commit, while `HEAD` is a pointer telling Git which branch you currently have checked out.\n\n### Modern Switching: `git switch`\nHistorically `git checkout` did too many unrelated things (switching branches AND discarding file edits). Modern Git provides clearer commands:\n- `git switch -c feat/login`: Create and switch to a new branch.\n- `git switch main`: Switch back to `main`.\n\n### Fast-Forward vs. 3-Way Merge\n1. **Fast-Forward**: If `main` had *zero* new commits while you worked on `feat/login`, merging `feat/login` into `main` simply slides the `main` pointer forward to match `feat/login`. No extra merge commit is needed!\n2. **3-Way Merge**: If `main` *also* received new commits while you worked on `feat/login`, history diverged. Git compares three snapshots (the common ancestor base, `main` tip, and `feat/login` tip) and creates a new **Merge Commit** combining both lines of work.",
          "codeExample": "# Create and switch to a new feature branch\ngit switch -c feat/search-bar\n\n# Work and commit on the feature branch\necho \"export const search = () => {};\" > search.js\ngit add search.js\ngit commit -m \"feat: add search helper\"\n\n# Switch back to main and merge\ngit switch main\ngit merge feat/search-bar\n\n# Safely delete the merged branch (-d prevents deleting unmerged work)\ngit branch -d feat/search-bar",
          "codeExplanation": "1. git switch -c feat/search-bar creates the branch and moves HEAD onto it.\n2. Commits made now advance feat/search-bar without touching main.\n3. Switching to main and running git merge feat/search-bar brings those commits into main.\n4. git branch -d deletes the branch pointer cleanly (and refuses with a warning if you forgot to merge!).\n\nHow to Run & Expected Output:\nRun in a test repo. git merge reports \"Fast-forward\" if main had no intervening commits.",
          "practiceExercise": "Guided Exercise:\n1. Create a branch feat/a, make 1 commit, switch back to main, make a commit on main, then merge feat/a into main to observe a 3-way merge commit.\n\nIndependent Challenge:\nInspect the resulting history graph using git log --oneline --graph --decorate --all.\n\nHints:\n- Use git branch -D (uppercase D) only when you intentionally want to discard an unmerged experimental branch.",
          "keyTakeaways": [
            "A Git branch is a lightweight pointer to a commit; HEAD tracks your active branch",
            "Use git switch -c <name> to create and switch branches clearly",
            "Fast-forward merges happen when the target branch has not diverged",
            "Use git branch -d to delete merged branches safely"
          ]
        },
        {
          "title": "Resolving Merge Conflicts Step by Step",
          "duration": "55m",
          "introduction": "Merge conflicts are not errors — they are Git politely asking a human to decide which of two competing edits to keep.",
          "objectives": [
            "Understand why merge conflicts occur (same lines edited on two branches)",
            "Read <<<<<<< HEAD, =======, and >>>>>>> conflict markers accurately",
            "Resolve conflicts, verify the code, and complete or abort a merge safely"
          ],
          "notes": "### When Does a Conflict Happen?\nGit merges changes automatically whenever two branches edit *different files* or *different sections* of the same file. A **conflict** only occurs when **both branches modified the exact same lines** (or one deleted a file the other edited).\n\n### Reading Conflict Markers\n```text\n<<<<<<< HEAD\nconst port = 3000;\n=======\nconst port = 8080;\n>>>>>>> feat/custom-port\n```\n- Everything between `<<<<<<< HEAD` and `=======` is **your current branch** (`main`).\n- Everything between `=======` and `>>>>>>> feat/custom-port` is the **incoming branch**.\n\n### The 4-Step Resolution Ritual\n1. **Don't guess blindly**: Inspect both versions and decide whether to keep Current, Incoming, or a combination of both.\n2. **Delete all three marker lines** (`<<<<<<<`, `=======`, `>>>>>>>`).\n3. **Run your tests/build** to make sure the merged code actually compiles and passes!\n4. **Stage and commit**: `git add <file>` followed by `git commit` (or `git merge --abort` anytime before committing if you want to back out cleanly).",
          "codeExample": "# When git merge pauses with CONFLICT:\ngit status\n\n# 1. Open conflicted file, choose/combine code, and remove <<<<<<< ======= >>>>>>> markers\n# 2. Test your code before committing!\n\n# 3. Mark conflict resolved and finish the merge commit\ngit add server.js\ngit commit -m \"merge: resolve port configuration conflict\"\n\n# Need to bail out mid-conflict and start over?\n# git merge --abort",
          "codeExplanation": "1. git status lists every file under \"Unmerged paths\" (\"both modified\").\n2. After editing out the markers and verifying tests pass, git add tells Git the conflict is resolved.\n3. git commit finalizes the 2-parent merge commit. If overwhelmed, git merge --abort restores the pre-merge state cleanly.\n\nHow to Run & Expected Output:\nTrigger a conflict on any shared line between two branches, resolve it, stage, and commit.",
          "practiceExercise": "Guided Exercise:\n1. Trigger a merge conflict on purpose, run git status to see \"both modified\", then run git merge --abort to practice backing out safely.\n\nIndependent Challenge:\nRe-run the merge, combine both lines instead of picking only one, remove all markers, and finish the merge commit.\n\nHints:\n- VS Code shows handy inline buttons (\"Accept Current\", \"Accept Incoming\", \"Accept Both\") above conflict markers!",
          "keyTakeaways": [
            "Conflicts happen when two branches edit the exact same lines differently",
            "<<<<<<< HEAD shows your current branch; >>>>>>> shows the incoming branch",
            "Always remove all conflict markers and test your app before committing",
            "git merge --abort safely cancels an in-progress conflicted merge"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When does Git perform a Fast-Forward merge?",
          "options": [
            "Whenever both branches edited the same file",
            "When the target branch has no new commits since the feature branch diverged",
            "Only when using --force",
            "When merging two remote repositories"
          ],
          "correctAnswer": 1,
          "explanation": "If main has not moved forward since the feature branch was created, Git simply moves main’s pointer forward without creating a merge commit."
        },
        {
          "question": "Inside a merge conflict, what does the block between <<<<<<< HEAD and ======= represent?",
          "options": [
            "The incoming branch changes",
            "Your currently checked-out branch changes",
            "Deleted files from GitHub",
            "The common ancestor commit"
          ],
          "correctAnswer": 1,
          "explanation": "HEAD always represents your currently checked-out branch; the incoming branch appears between ======= and >>>>>>>."
        },
        {
          "question": "Which command safely cancels an in-progress conflicted merge and restores your working tree?",
          "options": [
            "git reset --hard HEAD~5",
            "git merge --abort",
            "git branch -D",
            "git rm --cached"
          ],
          "correctAnswer": 1,
          "explanation": "git merge --abort cleanly stops the merge and restores the branch to its state before git merge was started."
        },
        {
          "question": "Why use lowercase -d in git branch -d feat/login instead of -D?",
          "options": [
            "-d pushes the branch to GitHub first",
            "-d refuses to delete the branch if it contains unmerged commits, preventing accidental data loss",
            "-d deletes remote branches automatically",
            "-d renames the branch"
          ],
          "correctAnswer": 1,
          "explanation": "-d is a safe delete that checks whether commits are already merged; -D force-deletes even unmerged work."
        }
      ]
    },
    {
      "title": "Module 3: Remote Repositories, GitHub & Pull Requests",
      "duration": "1h 45m",
      "objectives": [
        "Connect local repositories to GitHub remotes using origin and upstream",
        "Distinguish git fetch (safe inspection) from git pull (fetch + merge)",
        "Push branches safely using -u tracking and avoid force-pushing shared branches",
        "Open clear Pull Requests and conduct constructive code reviews"
      ],
      "notes": "### Module Introduction\nLocal commits live only on your laptop until you sync with a remote server like GitHub. Mastering remotes, `fetch` vs `pull`, and Pull Requests turns solo coding into smooth team collaboration.\n\n### Prerequisites\n- Completion of Modules 1 & 2 (commits, branches, merging).\n\n### How the Lessons Connect\n- **Lesson 1** covers `origin`, `git fetch`, `git pull`, and `git push -u`.\n- **Lesson 2** covers team collaboration on GitHub: Forks vs Branches, Pull Requests (PRs), and Code Review etiquette.\n\n### Module Summary\nYou will sync local and remote branches confidently, inspect incoming commits before merging, and submit well-documented Pull Requests.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the GitHub Remote Sync & Pull Request Simulation assignment.\n- Pass the Module 3 quiz with 100%.",
      "assignment": "Problem Statement:\nYou are contributing a bug fix to a team repository hosted on GitHub. You must sync your local main branch, create a clean fix branch, push it with upstream tracking, and draft a professional Pull Request description.\n\nObjectives:\n- Inspect remote tracking branches safely with git fetch before merging.\n- Push a feature branch with -u origin <branch>.\n- Write a clear PR description explaining Context, Changes, and Testing.\n\nRequirements:\n1. Verify remote URLs with git remote -v (or create a local bare repo to simulate a remote if offline).\n2. Run git fetch origin and inspect incoming commits with git log main..origin/main --oneline.\n3. Update local main cleanly with git pull --ff-only origin main.\n4. Create branch fix/navbar-overflow, make a commit, and push with git push -u origin fix/navbar-overflow.\n5. Draft a PR summary markdown document containing: What Changed, Why, How Tested, and Screenshots/Checklist.\n\nStep-by-Step Instructions:\n1. Check existing remotes and tracking branches with git branch -vv.\n2. Fetch first before pulling so you never get surprised by an unexpected merge.\n3. Create the fix branch, commit, and push with -u.\n\nDeliverables:\n- Terminal log of fetch/pull/push commands and the drafted PR description.\n\nEvaluation Criteria:\n- Uses git fetch + inspection before merging.\n- Sets upstream tracking with -u on first push.\n- Clear, reviewer-friendly PR checklist.",
      "lessons": [
        {
          "title": "Remotes, Fetch, Pull & Push",
          "duration": "50m",
          "introduction": "Many developers run git pull blindly and get hit by sudden merge conflicts. Learning git fetch first puts you in complete control.",
          "objectives": [
            "Understand origin and remote-tracking branches like origin/main",
            "Contrast git fetch with git pull",
            "Use git push -u origin <branch> to establish upstream tracking"
          ],
          "notes": "### Remote-Tracking Branches (`origin/main`)\n`origin` is simply the default nickname for your GitHub repository URL. Git keeps local read-only snapshots of remote branches named `origin/main` so you can compare your work offline.\n\n### `git fetch` vs. `git pull`\n- **`git fetch origin`**: Downloads new commits from GitHub into `origin/main` **without touching your local files or working branch**. Completely safe! You can inspect what teammates pushed with `git log HEAD..origin/main`.\n- **`git pull`**: Literally runs `git fetch` **followed immediately by `git merge`** (or rebase) into your active branch. Using `git pull --ff-only` prevents messy unexpected merge commits if your local branch diverged.\n\n### Pushing Branches\nOn the first push of a new branch:\n`git push -u origin feat/profile`\nThe `-u` (`--set-upstream`) flag links your local branch to `origin/feat/profile`, so future `git push` and `git pull` commands need no extra arguments.",
          "codeExample": "# Inspect configured remote URLs\ngit remote -v\n\n# Safely download remote updates without altering local working files\ngit fetch origin\n\n# See commits on origin/main that you don't have locally yet\ngit log HEAD..origin/main --oneline\n\n# Fast-forward local main cleanly\ngit switch main\ngit pull --ff-only origin main\n\n# Push a new local branch and set upstream tracking\ngit switch -c feat/contact-form\ngit push -u origin feat/contact-form",
          "codeExplanation": "1. git remote -v displays fetch and push URLs for origin.\n2. git fetch origin updates origin/* references safely without modifying your working tree.\n3. HEAD..origin/main lists commits present on GitHub that aren't in your local branch yet.\n4. git pull --ff-only aborts safely instead of creating an unintended merge commit if branches diverged.\n\nHow to Run & Expected Output:\nRun in any repo connected to a GitHub remote. git branch -vv will show [origin/feat/contact-form] tracking after push -u.",
          "practiceExercise": "Guided Exercise:\n1. Run git branch -vv in a cloned repository to see which remote branches your local branches track.\n\nIndependent Challenge:\nSimulate two clones of the same bare repository locally (git init --bare remote.git) and practice pushing from clone A, fetching in clone B, and inspecting git log HEAD..origin/main.\n\nHints:\n- Never use git push --force on shared branches like main — if you must force-push your own feature branch after a rebase, use --force-with-lease.",
          "keyTakeaways": [
            "origin is the default alias for your primary remote repository URL",
            "git fetch downloads remote commits safely without modifying your working files",
            "git pull is fetch + merge; use --ff-only to avoid accidental merge commits on main",
            "Use git push -u origin <branch> on first push to configure tracking"
          ]
        },
        {
          "title": "Pull Requests, Forks & Code Review Etiquette",
          "duration": "55m",
          "introduction": "A Pull Request is not just a merge button — it is an engineering conversation that catches bugs, shares knowledge, and documents why code exists.",
          "objectives": [
            "Choose between Feature Branches (teammates) and Forks (open-source contributors)",
            "Structure a high-signal Pull Request description",
            "Give and receive constructive, actionable code review feedback"
          ],
          "notes": "### Branches vs. Forks\n- **Same-Repo Branches**: Used inside a company or team where everyone has write access to the repo.\n- **Fork + `upstream`**: Used in open-source projects where you don't have write access. You **Fork** the repo to your own GitHub account (`origin`), add the original repo as `upstream`, and open a PR from your fork back to `upstream`.\n\n### Anatomy of a Great Pull Request\n1. **Small & Focused**: Keep PRs under ~300 lines when possible. Reviewers catch far more bugs in focused PRs than in 2,000-line mega-PRs.\n2. **Clear Summary**: Explain *why* the change is needed and *how* you tested it.\n3. **Self-Review First**: Read your own \"Files changed\" diff on GitHub before requesting reviewers to catch stray `console.log`s or typos.\n\n### Code Review Etiquette\n- Critique **the code, never the person**: say *\"Could we extract this into a helper?\"* instead of *\"Why did you write this badly?\"*.\n- Distinguish **blocking bugs** from optional **nitpicks** (`nit: optional rename`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Pushing or merging without reviewing `git status` and `git diff` first.\n  - **Solution**: Always inspect your diff and verify tests/builds pass before pushing or merging.",
          "codeExample": "# Open-Source Fork Workflow:\n# 1. Clone YOUR fork (automatically named 'origin')\ngit clone https://github.com/your-user/awesome-lib.git\ncd awesome-lib\n\n# 2. Add the original repository as 'upstream'\ngit remote add upstream https://github.com/original-org/awesome-lib.git\n\n# 3. Sync your local main with upstream before branching\ngit fetch upstream\ngit switch main\ngit merge --ff-only upstream/main\n\n# 4. Create a focused feature branch and push to YOUR origin fork\ngit switch -c fix/typo-in-readme\ngit push -u origin fix/typo-in-readme",
          "codeExplanation": "1. Cloning your fork sets origin to your personal GitHub copy.\n2. Adding upstream points to the original maintainers' repository so you can pull their latest changes.\n3. Merging upstream/main keeps your base clean before creating your PR branch.\n4. Pushing to origin lets you open a cross-repository Pull Request on GitHub.\n\nHow to Run & Expected Output:\nRun the Git commands sequentially in your terminal inside a practice repository and verify the updated branch/commit state with `git status` and `git log --oneline`.",
          "practiceExercise": "Guided Exercise:\n1. Write a PR template (.github/pull_request_template.md) with sections for Summary, Testing Done, and Checklist.\n\nIndependent Challenge:\nPractice reviewing a commit diff locally with git show <hash> and write 3 constructive review comments (1 bug/edge case, 1 readability suggestion, 1 positive note).\n\nHints:\n- Adding \"Closes #42\" in a GitHub PR description automatically closes Issue #42 when the PR merges!",
          "keyTakeaways": [
            "Use feature branches for team repos and forks + upstream remote for open-source contributions",
            "Keep Pull Requests small, focused, and self-reviewed before requesting feedback",
            "Include What Changed, Why, and How Tested in every PR description",
            "Keep code reviews collaborative, specific, and focused on the code"
          ]
        }
      ],
      "quiz": [
        {
          "question": "How does git fetch differ from git pull?",
          "options": [
            "git fetch deletes local branches",
            "git fetch downloads remote updates into origin/* without modifying your working branch, while git pull also merges them",
            "git pull only works for tags",
            "They are identical aliases"
          ],
          "correctAnswer": 1,
          "explanation": "git fetch safely updates remote-tracking branches (origin/main) so you can inspect changes before merging; git pull runs fetch + merge immediately."
        },
        {
          "question": "In an open-source Fork workflow, what does the remote named \"upstream\" typically point to?",
          "options": [
            "Your local backup folder",
            "The original maintainers’ repository that you forked from",
            "Your personal fork on GitHub",
            "The production web server"
          ],
          "correctAnswer": 1,
          "explanation": "origin points to your fork; upstream points to the original source repository so you can sync future updates."
        },
        {
          "question": "What does the -u flag do in git push -u origin feat/auth?",
          "options": [
            "Unstages all files after pushing",
            "Links the local branch to origin/feat/auth as its upstream tracking branch",
            "Force-overwrites the remote branch",
            "Creates a GitHub Release automatically"
          ],
          "correctAnswer": 1,
          "explanation": "-u (--set-upstream) configures branch tracking so future git push and git pull commands know the target remote branch."
        },
        {
          "question": "Why should Pull Requests be kept small and focused?",
          "options": [
            "GitHub rejects PRs over 500 lines",
            "Smaller PRs are easier to review thoroughly, catch more bugs, and merge with fewer conflicts",
            "Large PRs cannot run CI checks",
            "Small PRs skip code review"
          ],
          "correctAnswer": 1,
          "explanation": "Focused PRs reduce reviewer fatigue, surface edge cases faster, and minimize merge conflicts."
        }
      ]
    },
    {
      "title": "Module 4: Rebase, Interactive Rebase & Clean History",
      "duration": "1h 45m",
      "objectives": [
        "Compare Merge (preserving branch topology) vs. Rebase (linear history)",
        "Follow the Golden Rule of Rebasing to never break teammates’ branches",
        "Clean up messy WIP commits with Interactive Rebase (squash, fixup, reword)",
        "Force-push safely after rebasing personal feature branches using --force-with-lease"
      ],
      "notes": "### Module Introduction\nAs you commit rapidly during feature development, your branch often accumulates noisy commits like `\"wip\"`, `\"fix typo\"`, and `\"try again\"`. **Rebasing** lets you replay your branch cleanly on top of the latest `main` and polish those commits before teammates review your PR.\n\n### Prerequisites\n- Completion of Modules 1–3 (branches, merge commits, remotes).\n\n### How the Lessons Connect\n- **Lesson 1** compares `git merge` vs `git rebase` and teaches the Golden Rule of Rebasing.\n- **Lesson 2** demonstrates Interactive Rebase (`git rebase -i`) to squash, reword, and reorder local commits cleanly.\n\n### Module Summary\nYou will keep feature branch history linear, readable, and safe without ever rewriting shared public history.\n\n### Completion Criteria\n- Complete both lessons and exercises.\n- Deliver the History Cleanup with Interactive Rebase assignment.\n- Pass the Module 4 quiz with 100%.",
      "assignment": "Problem Statement:\nYour local feature branch feat/pricing has 4 messy commits (\"wip card\", \"fix typo\", \"oops missing semi\", \"finish pricing\"), while main has moved ahead by 2 commits. Clean up the branch before opening a PR.\n\nObjectives:\n- Replay your feature branch linearly onto the latest main using git rebase.\n- Squash the 4 messy commits into 1 clean Conventional Commit using git rebase -i.\n\nRequirements:\n1. Create a test repo with 2 commits on main.\n2. Branch feat/pricing from commit 1 of main (or create 4 commits on feat/pricing while adding another commit to main).\n3. Run git rebase main while on feat/pricing.\n4. Run git rebase -i HEAD~4 to squash/fixup the 4 commits into a single commit titled \"feat: add pricing tier cards\".\n5. Verify with git log --oneline --graph --all that history is a clean straight line.\n\nStep-by-Step Instructions:\n1. Set up the diverged branch and 4 small commits.\n2. Run git rebase main first.\n3. Run git rebase -i HEAD~4, keep the top commit as pick (or reword), and change the remaining 3 to fixup (f) or squash (s).\n4. Inspect git log --oneline to verify only 1 feature commit sits atop main.\n\nDeliverables:\n- Before and after git log --oneline --graph outputs.\n\nEvaluation Criteria:\n- Linear history on feat/pricing atop main.\n- 4 messy commits condensed into 1 clean Conventional Commit.",
      "lessons": [
        {
          "title": "Merge vs. Rebase & The Golden Rule",
          "duration": "50m",
          "introduction": "Rebase replays your commits one by one onto a newer base commit — creating a clean straight line of history instead of criss-crossing merge commits.",
          "objectives": [
            "Understand how git rebase rewrites commit parent hashes",
            "Apply the Golden Rule of Rebasing: never rebase shared public branches",
            "Use git push --force-with-lease safely after rebasing a personal PR branch"
          ],
          "notes": "### What `git rebase main` Does\nImagine you branched `feat/auth` from `main` yesterday, and today `main` has 3 new commits from teammates.\nRunning `git rebase main` (while on `feat/auth`):\n1. Temporarily lifts your `feat/auth` commits off the old base.\n2. Moves `feat/auth` to the latest tip of `main`.\n3. Replays your commits one by one, generating **brand-new commit hashes**!\n\n### The Golden Rule of Rebasing\n> **Never rebase commits that exist on a shared branch (like `main`) that other people have already pulled.**\nBecause rebasing creates *new* commit hashes, rewriting shared history forces teammates' repositories out of sync and creates duplicate commits.\n- **Safe**: Rebase your **own local or personal PR branch** onto `main`.\n- **Unsafe**: Rebasing `main` itself or a branch a teammate is actively committing to.\n\n### Safe Force Push: `--force-with-lease`\nIf you already pushed your personal PR branch and then rebased it locally, a normal `git push` will be rejected because hashes changed. Never use blind `--force`! Use `git push --force-with-lease`, which aborts if someone else pushed a new commit to that branch while you were rebasing.",
          "codeExample": "# Update local main first\ngit switch main\ngit pull --ff-only origin main\n\n# Replay your personal feature branch onto updated main\ngit switch feat/auth\ngit rebase main\n\n# If you already pushed feat/auth earlier, update your PR branch safely:\ngit push --force-with-lease origin feat/auth",
          "codeExplanation": "1. Switching to main and pulling ensures you have the latest base commits.\n2. git rebase main replays feat/auth commits cleanly atop main.\n3. --force-with-lease checks that the remote branch hasn't changed unexpectedly before updating your PR branch.\n\nHow to Run & Expected Output:\nRun on a local branch behind main. git log --oneline --graph shows your branch sitting cleanly on top of main with zero merge commits.",
          "practiceExercise": "Guided Exercise:\n1. Create a repo where main and feat/a diverge, then run git rebase main from feat/a and compare git log --oneline --graph before and after.\n\nIndependent Challenge:\nTrigger a conflict during git rebase main, resolve it, stage with git add, and continue with git rebase --continue (or cancel with git rebase --abort).\n\nHints:\n- During a rebase conflict, HEAD is actually main (the new base), and the incoming change is your replayed commit!",
          "keyTakeaways": [
            "Rebase replays your branch commits onto a new base, producing a linear history",
            "Because rebase creates new commit hashes, never rebase shared public branches like main",
            "Use git rebase --continue after resolving a rebase conflict, or --abort to cancel",
            "Always prefer git push --force-with-lease over --force on personal PR branches"
          ]
        },
        {
          "title": "Squashing & Rewording with Interactive Rebase",
          "duration": "55m",
          "introduction": "Interactive Rebase (git rebase -i) is your commit-history editor — turning five \"wip\" and \"typo\" commits into one polished, reviewable commit.",
          "objectives": [
            "Launch interactive rebase for the last N commits with git rebase -i HEAD~N",
            "Use pick, reword, squash, fixup, and drop actions cleanly",
            "Keep commit history clean without altering code behavior"
          ],
          "notes": "### Interactive Rebase Actions\nRunning `git rebase -i HEAD~3` opens your editor listing your last 3 commits (oldest at top, newest at bottom). Change the word before any commit:\n- **`pick` (`p`)**: Keep the commit as-is.\n- **`reword` (`r`)**: Keep the changes, pause to edit the commit message.\n- **`squash` (`s`)**: Merge this commit's changes into the commit above it AND combine both commit messages.\n- **`fixup` (`f`)**: Merge this commit's changes into the commit above it and **discard** its noisy message (perfect for `\"fix typo\"`!).\n- **`drop` (`d`)**: Delete the commit completely.\n\n### Best Practice\nWork freely on your local branch — commit often as checkpoints! Then, right before opening a Pull Request, run `git rebase -i` to squash noisy WIP commits into clean, logical commits.\n\n### Common Mistakes & Solutions\n- **Mistake**: Pushing or merging without reviewing `git status` and `git diff` first.\n  - **Solution**: Always inspect your diff and verify tests/builds pass before pushing or merging.",
          "codeExample": "# Edit the last 3 local commits\ngit rebase -i HEAD~3\n\n# Example editor plan (oldest commit at top):\n# pick   a1b2c3d feat: add user profile card\n# fixup  d4e5f6g fix: typo in CSS class\n# squash 9h8i7j6 add responsive mobile padding\n\n# Check the cleaned history:\ngit log -n 3 --oneline",
          "codeExplanation": "1. HEAD~3 targets the last 3 commits on your current branch.\n2. Keeping the first commit as pick (or reword), marking the typo fix as fixup, and squashing the third merges all three snapshots into one clean commit.\n3. git log confirms the polished history.\n\nHow to Run & Expected Output:\nMake 3 small commits in a test repo and run git rebase -i HEAD~3. After saving, git log --oneline shows 1 combined commit.",
          "practiceExercise": "Guided Exercise:\n1. Make two commits (\"feat: step 1\" and \"wip typo\"), then run git rebase -i HEAD~2 and change the second to fixup.\n\nIndependent Challenge:\nUse reword on an older commit (2 commits back) to fix a misspelled commit message without changing any files.\n\nHints:\n- If VS Code is configured as your Git editor (git config --global core.editor \"code --wait\"), interactive rebase opens cleanly in a VS Code tab.",
          "keyTakeaways": [
            "git rebase -i HEAD~N edits your last N unpushed commits",
            "fixup merges changes into the previous commit while discarding the noisy message",
            "reword lets you fix typos in older commit messages cleanly",
            "Interactive rebase only rewrites local/unshared history cleanly before opening a PR"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the Golden Rule of Rebasing?",
          "options": [
            "Always rebase main onto feature branches",
            "Never rebase commits on a shared public branch that teammates have already pulled",
            "Never run git rebase more than once",
            "Always use --force instead of --force-with-lease"
          ],
          "correctAnswer": 1,
          "explanation": "Rebasing rewrites commit hashes; rebasing a shared branch desynchronizes teammates’ repositories."
        },
        {
          "question": "In git rebase -i, which command combines a commit into the one above it and discards the noisy commit message?",
          "options": [
            "pick",
            "reword",
            "fixup",
            "drop"
          ],
          "correctAnswer": 2,
          "explanation": "fixup (f) folds the commit’s file changes into the previous commit and discards its message — ideal for \"fix typo\" commits."
        },
        {
          "question": "Why is git push --force-with-lease safer than git push --force?",
          "options": [
            "It skips CI tests",
            "It aborts the push if the remote branch received unexpected new commits from someone else",
            "It compresses files twice as much",
            "It pushes all local branches at once"
          ],
          "correctAnswer": 1,
          "explanation": "--force-with-lease verifies your local tracking ref matches the remote before overwriting, preventing accidental deletion of a teammate’s push."
        },
        {
          "question": "Which command lets you edit the last 4 commits on your current branch?",
          "options": [
            "git merge -i HEAD~4",
            "git rebase -i HEAD~4",
            "git log -i 4",
            "git switch -i 4"
          ],
          "correctAnswer": 1,
          "explanation": "git rebase -i HEAD~4 opens an interactive rebase plan for the 4 most recent commits."
        }
      ]
    },
    {
      "title": "Module 5: Undoing Mistakes & Emergency Recovery",
      "duration": "1h 45m",
      "objectives": [
        "Choose accurately between git restore, git reset, and git revert",
        "Understand soft, mixed, and hard reset modes",
        "Recover \"lost\" commits or deleted branches using git reflog",
        "Shelve unfinished work cleanly using git stash"
      ],
      "notes": "### Module Introduction\nEveryone makes Git mistakes — committing to the wrong branch, staging an unintended file, or running `git reset --hard` too eagerly. Knowing Git's undo tools and `git reflog` safety net means you almost never lose committed work.\n\n### Prerequisites\n- Completion of Modules 1–4 (commits, staging, branching, rebasing).\n\n### How the Lessons Connect\n- **Lesson 1** clarifies when to use `restore` (uncommitted files), `reset` (local unpushed commits), or `revert` (shared/pushed commits).\n- **Lesson 2** teaches emergency time-travel recovery with `git reflog` and context-switching with `git stash`.\n\n### Module Summary\nYou will undo mistakes safely on both local and shared branches and rescue commits even after an accidental hard reset.\n\n### Completion Criteria\n- Complete both lessons and recovery drills.\n- Deliver the Emergency Recovery & Safe Revert Drill assignment.\n- Pass the Module 5 quiz with 100%.",
      "assignment": "Problem Statement:\nYou just ran git reset --hard HEAD~1 by accident and wiped out an important local feature commit, AND separately you discovered a buggy commit already pushed to main. Perform both recoveries safely.\n\nObjectives:\n- Rescue an \"erased\" commit using git reflog.\n- Safely undo a pushed commit on main using git revert without rewriting shared history.\n\nRequirements:\n1. Create a test repo with 3 commits: C1, C2, and \"feat: critical work\" (C3).\n2. Simulate an accidental wipe: run git reset --hard HEAD~1 so C3 disappears from git log.\n3. Run git reflog, locate C3's commit hash, and restore it cleanly (via git reset --hard <hash> or git switch -c rescue <hash>).\n4. On main, safely undo C2 using git revert <C2-hash> so a new inverse commit appears instead of erasing history.\n\nStep-by-Step Instructions:\n1. Create the 3 commits and note C3's short hash.\n2. Run git reset --hard HEAD~1 and confirm git log only shows C1 and C2.\n3. Run git reflog to find C3's hash and recover it.\n4. Run git revert <C2-hash> and inspect git log --oneline.\n\nDeliverables:\n- Terminal output of git reflog showing the recovery and git log --oneline showing the revert commit.\n\nEvaluation Criteria:\n- C3 fully recovered via reflog.\n- C2 undone via an additive revert commit rather than history rewrite.",
      "lessons": [
        {
          "title": "Restore, Reset & Revert: Choosing the Right Undo",
          "duration": "55m",
          "introduction": "Choosing the wrong undo command can either wipe uncommitted work or break teammates’ branches. This decision guide makes the right choice obvious.",
          "objectives": [
            "Discard working directory edits or unstage files with git restore",
            "Move local branch pointers with git reset (--soft, --mixed, --hard)",
            "Undo pushed/shared commits safely with git revert"
          ],
          "notes": "### Decision Guide: Which Undo Command?\n1. **File not committed yet?** -> Use **`git restore`**:\n   - `git restore --staged app.js`: Unstages `app.js` (keeps your edits in Working Directory!).\n   - `git restore app.js`: Discards uncommitted edits in `app.js` back to the last commit (**destructive** to unsaved edits!).\n2. **Committed locally, NOT pushed yet?** -> Use **`git reset`**:\n   - `git reset --soft HEAD~1`: Undoes the commit, keeps changes **staged** (great for fixing a commit message or adding a forgotten file).\n   - `git reset --mixed HEAD~1` (default): Undoes the commit and unstages changes, keeping your edits in the Working Directory.\n   - `git reset --hard HEAD~1`: Undoes the commit AND **wipes** working directory changes.\n3. **Already pushed to a shared branch (`main`)?** -> Use **`git revert <hash>`**:\n   - Creates a **brand-new commit** that applies the exact opposite changes of `<hash>`. History moves forward cleanly without breaking anyone's clone!",
          "codeExample": "# 1. Unstage a file without losing edits\ngit restore --staged secret.txt\n\n# 2. Undo last local commit, keeping changes staged to amend\ngit reset --soft HEAD~1\n\n# 3. Safely undo a bad commit already pushed to main\ngit revert a1b2c3d",
          "codeExplanation": "1. git restore --staged removes a file from the Staging Area while keeping your edits on disk.\n2. git reset --soft HEAD~1 moves the branch pointer back one commit while preserving all staged changes.\n3. git revert creates a new inverse commit, making it completely safe for shared branches like main.\n\nHow to Run & Expected Output:\nTest each command on a disposable commit in a practice repo and check git status / git log after each step.",
          "practiceExercise": "Guided Exercise:\n1. Make a commit with a typo in a file, run git reset --soft HEAD~1, inspect git status (still staged!), fix the file, and re-commit.\n\nIndependent Challenge:\nMake 3 commits, then run git revert HEAD~1 to undo the middle commit without removing the newest commit.\n\nHints:\n- Never run git reset --hard if you have uncommitted work you might want back — uncommitted edits are NOT in reflog!",
          "keyTakeaways": [
            "Use git restore --staged to unstage files safely without losing edits",
            "Use git reset (--soft / --mixed / --hard) only on local, unpushed commits",
            "Use git revert <hash> to safely undo commits already pushed to shared branches",
            "git reset --hard discards uncommitted working directory changes permanently"
          ]
        },
        {
          "title": "Time Travel Recovery with git reflog & git stash",
          "duration": "50m",
          "introduction": "Think you lost a commit forever after git reset --hard or deleting a branch? As long as it was committed once, git reflog probably still has it.",
          "objectives": [
            "Use git reflog to inspect recent HEAD movements and recover \"lost\" commits",
            "Temporarily shelve unfinished work with git stash push, list, and pop",
            "Move stashed changes onto a new branch cleanly"
          ],
          "notes": "### `git reflog`: Your Time-Travel Safety Net\nWhile `git log` shows the current branch's commit graph, **`git reflog`** records a private local log of **every single place `HEAD` pointed** on your machine over the last ~30–90 days (commits, checkouts, resets, rebases).\nEven if you ran `git reset --hard HEAD~3` or `git branch -D feat/experiment`, the commits remain in `.git/objects` until garbage collection runs! Find the hash in `git reflog` and run `git switch -c recovered <hash>`.\n\n### Context Switching with `git stash`\nNeed to switch branches urgently to fix a bug, but your current edits aren't ready to commit?\n- `git stash push -u -m \"wip nav\"`: Shelves modified AND untracked (`-u`) files cleanly.\n- `git stash list`: Shows saved stashes.\n- `git stash pop`: Re-applies the latest stash and removes it from the stash stack (use `apply` to keep a copy in the stash).",
          "codeExample": "# View local HEAD movement history to rescue lost commits\ngit reflog -n 10\n# Example recovery: git switch -c rescue-branch a1b2c3d\n\n# Shelve unfinished work (including new untracked files with -u)\ngit stash push -u -m \"wip: sidebar layout\"\ngit stash list\n\n# Restore stashed work later\ngit stash pop",
          "codeExplanation": "1. git reflog -n 10 lists the last 10 HEAD states with their commit hashes.\n2. git switch -c rescue-branch <hash> restores a \"lost\" commit onto a safe branch.\n3. git stash push -u saves both tracked modifications and untracked files with a descriptive message.\n\nHow to Run & Expected Output:\nCreate an untracked file, stash it with -u, verify git status is clean, then run git stash pop to bring it back.",
          "practiceExercise": "Guided Exercise:\n1. Stash an edited file with git stash push -m \"test stash\", switch to another branch, switch back, and run git stash pop.\n\nIndependent Challenge:\nCreate a branch temp, make a commit, switch to main, force-delete it with git branch -D temp, then use git reflog to recover temp's commit onto a new branch.\n\nHints:\n- If you realize you started coding on main by mistake, you can run git stash, git switch -c feat/my-feature, and git stash pop!",
          "keyTakeaways": [
            "git reflog tracks local HEAD history and rescues committed work after accidental resets or branch deletions",
            "Uncommitted edits that were never committed or stashed cannot be recovered by reflog",
            "git stash push -u shelves uncommitted work (including untracked files) cleanly",
            "git stash pop restores the stash and removes it; git stash apply keeps it in the stash list"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which command safely undoes a buggy commit that was already pushed to a shared main branch?",
          "options": [
            "git reset --hard HEAD~1",
            "git revert <commit-hash>",
            "git rebase -i HEAD~1",
            "git branch -D main"
          ],
          "correctAnswer": 1,
          "explanation": "git revert creates a new inverse commit on top of main without rewriting shared history."
        },
        {
          "question": "What does git reset --soft HEAD~1 do?",
          "options": [
            "Deletes all your uncommitted files permanently",
            "Undoes the last commit while keeping all its changes in the Staging Area",
            "Reverts a commit on GitHub",
            "Clears git reflog"
          ],
          "correctAnswer": 1,
          "explanation": "--soft moves the branch pointer back one commit and leaves the changes staged so you can edit or recommit immediately."
        },
        {
          "question": "You accidentally ran git reset --hard HEAD~2 and erased two local commits. How can you recover them?",
          "options": [
            "They are permanently gone",
            "Run git reflog to find the previous commit hash and check it out onto a branch",
            "Run git restore --staged .",
            "Run git pull --ff-only"
          ],
          "correctAnswer": 1,
          "explanation": "git reflog records recent HEAD positions locally, allowing you to locate and recover previously committed snapshots."
        },
        {
          "question": "Which flag makes git stash include brand-new untracked files?",
          "options": [
            "-a",
            "-u (or --include-untracked)",
            "-f",
            "-r"
          ],
          "correctAnswer": 1,
          "explanation": "By default git stash only saves tracked files; adding -u (--include-untracked) includes new untracked files too."
        }
      ]
    },
    {
      "title": "Module 6: Semantic Versioning, Tags & Professional Workflows",
      "duration": "1h 30m",
      "objectives": [
        "Version software releases cleanly using Semantic Versioning (MAJOR.MINOR.PATCH)",
        "Create and push annotated Git tags (v1.0.0)",
        "Find the exact commit that introduced a regression in O(log n) steps with git bisect",
        "Apply GitHub Flow with protected main branches and automated CI checks"
      ],
      "notes": "### Module Introduction\nShipping reliable software requires clear release milestones, fast bug isolation, and team guardrails. In this final module, you will learn how professional engineering teams tag releases, hunt regressions with binary search, and run GitHub Flow.\n\n### Prerequisites\n- Completion of Modules 1–5.\n\n### How the Lessons Connect\n- **Lesson 1** covers Semantic Versioning (SemVer), annotated release tags, and `git bisect`.\n- **Lesson 2** ties everything together into **GitHub Flow** and CI/CD branch protection.\n\n### Module Summary\nYou now possess end-to-end mastery of Git & GitHub — from your first `git init` to production release tagging and emergency recovery.\n\n### Completion Criteria\n- Complete both lessons.\n- Deliver the Release Tagging & Bisect Investigation assignment.\n- Pass the Module 6 quiz with 100%.",
      "assignment": "Problem Statement:\nYour team is ready to ship v1.0.0 of the Cortex CLI tool, and also needs to track down which commit among 8 recent commits broke a calculation test.\n\nObjectives:\n- Create and verify an annotated SemVer tag (v1.0.0).\n- Use git bisect to isolate a broken commit via binary search.\n\nRequirements:\n1. In a test repository, create 8 sequential commits (C1 through C8) where C1..C4 are good and C5..C8 contain a deliberate bug in a file.\n2. Run git bisect start, mark HEAD as bad (git bisect bad), and C1 as good (git bisect good <C1-hash>).\n3. Step through the binary search until Git identifies C5 as the first bad commit, then run git bisect reset.\n4. Fix the bug in C9, commit, and create an annotated tag: git tag -a v1.0.0 -m \"Release v1.0.0: initial stable release\".\n\nStep-by-Step Instructions:\n1. Build the 8-commit history (you can script or make quick commits).\n2. Run git bisect and test each checked-out midpoint.\n3. Always finish with git bisect reset so HEAD returns to your branch.\n4. Create the annotated tag and inspect it with git show v1.0.0.\n\nDeliverables:\n- Terminal output showing git bisect identifying the first bad commit and git show v1.0.0.\n\nEvaluation Criteria:\n- Annotated tag (git tag -a) used instead of lightweight tag.\n- git bisect reset executed cleanly at the end.",
      "lessons": [
        {
          "title": "Tags, SemVer & Debugging with git bisect",
          "duration": "45m",
          "introduction": "Tags mark permanent release milestones in history, while git bisect uses binary search to pinpoint the exact commit that broke your build.",
          "objectives": [
            "Apply Semantic Versioning rules (MAJOR.MINOR.PATCH)",
            "Create annotated tags (-a) and push them to GitHub",
            "Run git bisect start / good / bad / reset to isolate regressions fast"
          ],
          "notes": "### Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`\n- **MAJOR** (`2.0.0`): Breaking API changes that require callers to update code.\n- **MINOR** (`1.1.0`): New backwards-compatible features.\n- **PATCH** (`1.0.1`): Backwards-compatible bug fixes.\n\n### Annotated Tags vs. Lightweight Tags\nAlways use **annotated tags** (`git tag -a v1.0.0 -m \"...\"`) for releases — they store the tagger name, date, and release message, unlike lightweight tags. Note that `git push` does **not** push tags automatically; run `git push origin v1.0.0` (or `git push --tags`).\n\n### Binary Search Debugging with `git bisect`\nSuppose a feature worked 200 commits ago and is broken today. Checking 200 commits one by one takes forever. `git bisect` uses **binary search** (`log2(200) ≈ 8 steps`) to jump right to the midpoint, ask you if it's `good` or `bad`, and pinpoint the exact culprit commit in seconds!",
          "codeExample": "# Create an annotated release tag\ngit tag -a v1.2.0 -m \"Release v1.2.0: add dark mode support\"\ngit push origin v1.2.0\n\n# Binary search for a regression bug\ngit bisect start\ngit bisect bad HEAD            # Current commit is broken\ngit bisect good v1.0.0         # v1.0.0 was known working\n# Test midpoint -> mark 'git bisect good' or 'git bisect bad'\n# When finished, ALWAYS return to your branch:\ngit bisect reset",
          "codeExplanation": "1. git tag -a creates a full annotated tag object storing author, timestamp, and message.\n2. git push origin v1.2.0 publishes that release tag to GitHub.\n3. git bisect narrows down the exact breaking commit in O(log n) steps; git bisect reset returns HEAD to normal.\n\nHow to Run & Expected Output:\nRun git show v1.2.0 to see tag metadata alongside the tagged commit.",
          "practiceExercise": "Guided Exercise:\n1. Create an annotated tag v0.1.0 on a test repo and inspect it with git show v0.1.0.\n\nIndependent Challenge:\nRun git bisect run npm test (or a quick shell script) to let Git automate the binary search across commits with zero manual typing!\n\nHints:\n- Don't forget git bisect reset when done, otherwise you remain in a detached HEAD state.",
          "keyTakeaways": [
            "SemVer encodes breaking changes (MAJOR), features (MINOR), and bug fixes (PATCH)",
            "Use annotated tags (git tag -a) for releases and push them explicitly",
            "git bisect finds regression-introducing commits in O(log n) steps",
            "Always run git bisect reset when finished to exit detached HEAD"
          ]
        },
        {
          "title": "Team Workflows: GitHub Flow & CI Checks",
          "duration": "45m",
          "introduction": "How do modern web teams deploy dozens of times a day without breaking production? GitHub Flow + automated CI checks.",
          "objectives": [
            "Describe the 5-step GitHub Flow lifecycle",
            "Configure branch protection rules and required CI status checks conceptually",
            "Keep main always deployable"
          ],
          "notes": "### GitHub Flow in 5 Steps\n1. **`main` is always deployable**: Never commit broken or untested code directly to `main`.\n2. **Branch off `main`**: Create a descriptively named branch (`feat/checkout`, `fix/auth-timeout`).\n3. **Commit & Push**: Make small atomic commits and push to your branch.\n4. **Open a Pull Request + Run CI**: Automated **Continuous Integration (CI)** (like GitHub Actions) runs linters, unit tests, and production builds on every push, while teammates review the diff.\n5. **Merge & Deploy**: Once CI passes and reviews approve, merge to `main` (often via **Squash and Merge** for a super-clean `main` log) and delete the feature branch.\n\n### Common Mistakes & Solutions\n- **Mistake**: Pushing or merging without reviewing `git status` and `git diff` first.\n  - **Solution**: Always inspect your diff and verify tests/builds pass before pushing or merging.",
          "codeExample": "# Typical daily GitHub Flow loop:\ngit switch main\ngit pull --ff-only origin main\ngit switch -c feat/export-csv\n\n# ...implement & test locally...\ngit add -A\ngit commit -m \"feat: add CSV export for student progress\"\ngit push -u origin feat/export-csv\n# Open PR on GitHub -> CI passes -> Review approves -> Squash & Merge -> Delete branch",
          "codeExplanation": "1. Start from an up-to-date main branch.\n2. Isolate work in a descriptive feature branch.\n3. Commit atomically, push with -u, and let GitHub Actions CI + code review validate the PR before merging back to main.\n\nHow to Run & Expected Output:\nRun the Git commands sequentially in your terminal inside a practice repository and verify the updated branch/commit state with `git status` and `git log --oneline`.",
          "practiceExercise": "Guided Exercise:\n1. Outline a checklist of 3 automated CI checks (lint, unit tests, build) that should block merging a PR if they fail.\n\nIndependent Challenge:\nCompare Merge Commit vs. Squash & Merge vs. Rebase & Merge on GitHub and write down when a team would prefer each.\n\nHints:\n- Squash & Merge is widely favored for keeping main readable (1 PR = 1 clean commit on main).",
          "keyTakeaways": [
            "GitHub Flow keeps main continuously deployable via short-lived feature branches and PRs",
            "Automated CI checks (lint, test, build) catch regressions before code ever reaches main",
            "Delete merged feature branches promptly to keep the repository tidy",
            "Squash & Merge keeps main history clean and easy to revert"
          ]
        }
      ],
      "quiz": [
        {
          "question": "According to Semantic Versioning (v2.4.1), which number increments when you introduce a breaking API change?",
          "options": [
            "PATCH (1)",
            "MINOR (4)",
            "MAJOR (2)",
            "All three reset to 0"
          ],
          "correctAnswer": 2,
          "explanation": "In MAJOR.MINOR.PATCH, MAJOR increments for breaking changes (and resets MINOR and PATCH to 0)."
        },
        {
          "question": "Why must you run git bisect reset after locating a regression commit?",
          "options": [
            "To delete the bad commit automatically",
            "To exit detached HEAD bisect mode and return to your normal branch",
            "To push the fix to GitHub",
            "To clear your .gitignore rules"
          ],
          "correctAnswer": 1,
          "explanation": "git bisect checks out historical commits in detached HEAD mode; git bisect reset returns you cleanly to your original branch."
        },
        {
          "question": "In GitHub Flow, what is the core rule about the main branch?",
          "options": [
            "Only senior engineers may write code",
            "main should always remain tested, stable, and deployable via Pull Requests and CI checks",
            "Features are developed directly on main for weeks",
            "Branches are never deleted"
          ],
          "correctAnswer": 1,
          "explanation": "GitHub Flow ensures main is always deployable by isolating work on branches and requiring CI + PR review before merging."
        },
        {
          "question": "Why are annotated tags (git tag -a) preferred over lightweight tags for software releases?",
          "options": [
            "Lightweight tags cannot use numbers",
            "Annotated tags store tagger identity, date, and a release message as full Git objects",
            "Annotated tags run unit tests automatically",
            "Lightweight tags are deleted on git pull"
          ],
          "correctAnswer": 1,
          "explanation": "Annotated tags store rich metadata (author, date, message) and are ideal for official release milestones."
        }
      ]
    },
    {
      "title": "Module 7: Cherry-Picking, Worktrees & History Investigation",
      "duration": "1h 45m",
      "objectives": [
        "Backport a specific hotfix commit cleanly across branches using git cherry-pick",
        "Investigate who/when/why code changed using git log -S (pickaxe) and git blame",
        "Work on two branches simultaneously without stashing using git worktree"
      ],
      "notes": "### Module Introduction & Description\nReal-world maintenance sometimes requires applying one urgent bugfix from `main` onto a `release/v1.x` branch without merging 40 unfinished features, or finding the exact commit that added or deleted a function 6 months ago.\n\n### Prerequisites\n- Completion of Modules 1–6 (branching, merging, rebasing, reflog).\n\n### Skills Acquired\n- Selective commit backporting (`cherry-pick`), code-archaeology (`git log -S`, `git blame`), and parallel checkouts (`git worktree`).\n\n### How the Lessons Connect\n- **Lesson 1** teaches `git cherry-pick` safely with `-x` provenance notes.\n- **Lesson 2** teaches `git log -S`, `git blame`, and `git worktree`.\n\n### Completion Criteria\n- Complete both lessons, deliver the Hotfix Backport & Code Archaeology assignment, and pass the Module 7 quiz with 100%.",
      "assignment": "Problem Statement:\nA production release branch (release/v1) needs a single critical bugfix commit that already landed on main, without pulling in 3 new experimental feature commits from main. Also investigate which commit introduced a specific function name.\n\nObjectives:\n- Apply a single commit cleanly across branches using git cherry-pick -x.\n- Locate the commit that introduced a symbol using git log -S \"<symbol>\".\n\nRequirements:\n1. Create a repo with branch release/v1, then add 3 commits on main (2 features + 1 bugfix).\n2. Switch to release/v1 and run git cherry-pick -x <bugfix-hash>.\n3. Run git log -S \"calculateTax\" --oneline to find the commit that added or removed \"calculateTax\".\n4. Inspect git show <hash> to confirm the change.\n\nStep-by-Step Instructions:\n1. Build the 2-branch history cleanly.\n2. Use cherry-pick -x so the commit message records \"(cherry picked from commit ...)\" for auditability.\n\nDeliverables:\n- Output of git log --oneline on release/v1 and git log -S output.\n\nEvaluation Criteria:\n- Only the single bugfix commit lands on release/v1 (none of the 2 feature commits).",
      "lessons": [
        {
          "title": "Selective Backporting with git cherry-pick",
          "duration": "50m",
          "introduction": "When you need ONE specific commit from another branch without merging the whole branch, git cherry-pick copies that exact commit onto your current branch.",
          "objectives": [
            "Copy a single commit or range onto another branch with git cherry-pick",
            "Record source commit provenance with -x",
            "Resolve or abort cherry-pick conflicts cleanly"
          ],
          "notes": "### How `git cherry-pick` Works\n`git cherry-pick -x <commit-hash>` computes the diff of `<commit-hash>` relative to its parent and applies it as a **new commit** on your current branch.\n- Adding **`-x`** appends `(cherry picked from commit <hash>)` to the commit message — invaluable when auditing release branches!\n- Just like merge/rebase, if a conflict occurs, resolve -> `git add` -> `git cherry-pick --continue` (or `--abort`).\n\n### Common Mistakes & Solutions\n- **Mistake**: Overusing `cherry-pick` instead of `merge`/`PR` for normal feature integration, creating duplicate commits with different hashes.\n  - **Solution**: Reserve `cherry-pick` for hotfix backports or rescuing a commit made on the wrong branch.",
          "codeExample": "# On release/v1, backport only commit a1b2c3d from main:\ngit switch release/v1\ngit cherry-pick -x a1b2c3d\n\n# Verify the new commit and provenance line:\ngit log -n 1",
          "codeExplanation": "1. Switches to release/v1 and applies only commit a1b2c3d's changes.\n2. -x appends the original commit SHA so teammates can trace where the backport came from.\n\nHow to Run & Expected Output:\nRun in a 2-branch practice repo. `git log -n 1` shows the backported commit with \"(cherry picked from commit ...)\" in its body.",
          "practiceExercise": "Guided Exercise:\n1. Make a commit on `main` by mistake, switch to `feat/fix`, `git cherry-pick` it over, then `git reset --hard HEAD~1` on local `main`.\n\nIndependent Challenge:\nCherry-pick a commit without committing immediately using `git cherry-pick -n <hash>` so you can inspect or combine edits before committing.\n\nExpected Result:\nClean selective commit transfer without merging unrelated branch history.",
          "keyTakeaways": [
            "git cherry-pick applies a single commit’s diff onto the current branch as a new commit",
            "Use -x when backporting hotfixes to record the original commit hash",
            "Use git cherry-pick --abort if a conflict occurs and you want to cancel"
          ]
        },
        {
          "title": "Clean History Searches with git log -S, git blame & Worktrees",
          "duration": "55m",
          "introduction": "Ever wonder \"Why was this weird if-check added 8 months ago?\" Git’s pickaxe search and worktrees let you investigate history in seconds without losing your current work.",
          "objectives": [
            "Search history for when a string/function was added or removed with git log -S",
            "Check line-by-line authorship and commit context with git blame",
            "Check out a second branch in a parallel folder with git worktree"
          ],
          "notes": "### Code Archaeology Tools\n- **`git log -S \"myFunction\" --oneline`** (Pickaxe search): Finds only the commits where the **count of `\"myFunction\"` changed** (when it was introduced or deleted!).\n- **`git blame -L 10,25 app.js`**: Shows which commit last touched lines 10–25 so you can run `git show <hash>` to read the *why* in the commit message.\n- **`git worktree add ../hotfix-dir main`**: Checks out `main` into a separate sibling folder sharing the same `.git` database — letting you run tests or fix a bug on `main` without touching or stashing your active feature folder!",
          "codeExample": "# Find which commit added or removed 'verifyToken'\ngit log -S \"verifyToken\" --oneline\n\n# Inspect commit rationale for lines 1-20 of a file\ngit blame -L 1,20 server.js\n\n# Open a second branch in a parallel directory without stashing\ngit worktree add ../cortex-hotfix main\n# Remove when finished:\ngit worktree remove ../cortex-hotfix",
          "codeExplanation": "1. -S filters history strictly to commits that changed occurrences of 'verifyToken'.\n2. git blame -L scopes authorship output to a specific line range.\n3. git worktree lets you keep two branches checked out simultaneously in separate directories.\n\nHow to Run & Expected Output:\nRun `git log -S` against any symbol in your repository; prints only the exact commits that introduced or removed that symbol.",
          "practiceExercise": "Guided Exercise:\n1. Run `git log -S \"useState\" --oneline` in a React repo to see when state hooks were added.\n\nIndependent Challenge:\nCreate a temporary worktree for a second branch, verify `git worktree list`, then clean it up with `git worktree remove`.\n\nExpected Result:\nFast history lookup and zero-stash parallel branch workflows.",
          "keyTakeaways": [
            "Use git log -S \"<text>\" to find the exact commits that added or deleted a symbol",
            "Use git blame followed by git show <hash> to understand why code exists",
            "Use git worktree to work on two branches simultaneously in separate folders"
          ]
        }
      ],
      "quiz": [
        {
          "question": "When is `git cherry-pick -x <hash>` most appropriate?",
          "options": [
            "For merging an entire 20-commit feature branch",
            "When backporting a single urgent bugfix commit onto a release branch without merging unfinished features",
            "To delete remote branches",
            "To initialize a new repository"
          ],
          "correctAnswer": 1,
          "explanation": "cherry-pick copies one specific commit cleanly, and -x records the original commit hash for auditability."
        },
        {
          "question": "What does `git log -S \"calculateProgress\"` search for?",
          "options": [
            "Commits whose commit message contains \"calculateProgress\"",
            "Commits that added or removed occurrences of \"calculateProgress\" in the code diff",
            "Branches named calculateProgress",
            "Stashed files"
          ],
          "correctAnswer": 1,
          "explanation": "The -S (pickaxe) option finds commits where the number of occurrences of that string changed."
        },
        {
          "question": "What problem does `git worktree add ../hotfix main` solve?",
          "options": [
            "It compresses .git size",
            "It lets you check out main in a separate folder simultaneously without stashing or interrupting your current branch",
            "It pushes tags automatically",
            "It resolves merge conflicts automatically"
          ],
          "correctAnswer": 1,
          "explanation": "Worktrees allow multiple branches to be checked out at once in separate directories sharing one .git repository."
        },
        {
          "question": "How can you undo a cherry-pick that paused due to a merge conflict if you decide to cancel?",
          "options": [
            "git cherry-pick --abort",
            "git reset --soft",
            "git rm -rf .",
            "git bisect reset"
          ],
          "correctAnswer": 0,
          "explanation": "git cherry-pick --abort cancels the in-progress cherry-pick and restores your branch cleanly."
        }
      ]
    },
    {
      "title": "Module 8: Git Hooks, Husky, Commitlint & Automated Guardrails",
      "duration": "1h 30m",
      "objectives": [
        "Understand client-side Git hooks inside .git/hooks (pre-commit, commit-msg, pre-push)",
        "Share reproducible hooks across a team using Husky and lint-staged",
        "Enforce Conventional Commits and block accidental .env commits automatically"
      ],
      "notes": "### Module Introduction & Description\nRelying on memory to run Prettier, ESLint, or tests before every commit eventually fails when you're in a hurry. **Git Hooks** run scripts automatically right before commits or pushes — catching broken formatting or bad commit messages locally in 2 seconds.\n\n### Prerequisites\n- Completion of Modules 1–7.\n\n### Skills Acquired\n- Configuring `.git/hooks`, sharing team hooks via Husky + `lint-staged`, and validating commit messages.\n\n### How the Lessons Connect\n- **Lesson 1** explains native Git hooks inside `.git/hooks/`.\n- **Lesson 2** configures shareable team hooks with Husky and Commitlint.\n\n### Completion Criteria\n- Complete both lessons, deliver the Pre-Commit & Commitlint Guardrail assignment, and pass the Module 8 quiz with 100%.",
      "assignment": "Problem Statement:\nTeam members keep pushing unformatted code and vague commit messages (\"asdf\", \"wip\") that break CI 5 minutes later. Set up local automated pre-commit and commit-msg guardrails.\n\nObjectives:\n- Create a working commit-msg hook (native or Husky) that enforces Conventional Commits prefixes.\n- Understand why .git/hooks/ is not committed to Git and how Husky solves sharing.\n\nRequirements:\n1. Write a commit-msg script checking the first line against ^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .{3,}.\n2. Exit with code 1 and a helpful error message if the commit message doesn't match.\n3. Configure a lint-staged JSON block running eslint --fix / prettier --write only on staged *.{js,jsx} files.\n\nStep-by-Step Instructions:\n1. Test the commit-msg regex with both \"wip\" (must reject with exit 1) and \"feat: add dark mode\" (must accept with exit 0).\n2. Document why client-side hooks must always be paired with server-side CI checks (since --no-verify can bypass local hooks).\n\nDeliverables:\n- commit-msg hook script and package.json lint-staged configuration.\n\nEvaluation Criteria:\n- Rejects vague messages with clear formatting guidance.\n- Explains --no-verify bypass limitation.",
      "lessons": [
        {
          "title": "Client-Side Git Hooks (pre-commit, commit-msg)",
          "duration": "45m",
          "introduction": "Inside every repository’s hidden .git/hooks/ directory sit lifecycle scripts that Git invokes automatically before commits and pushes.",
          "objectives": [
            "Distinguish pre-commit, commit-msg, and pre-push hook lifecycle stages",
            "Return non-zero exit codes to abort bad commits cleanly"
          ],
          "notes": "### Key Client-Side Hook Stages\n1. **`pre-commit`**: Runs *before* the commit message editor opens. Ideal for linting/formatting staged files or blocking `.env`/secret patterns. Exiting non-zero (`exit 1`) aborts the commit!\n2. **`commit-msg`**: Receives the path to the temporary commit message file as `$1`. Ideal for enforcing Conventional Commits.\n3. **`pre-push`**: Runs before `git push` transfers commits — great for running fast unit tests.\n\n### Important Limitation\nBecause `.git/hooks/` is **local and not cloned** when teammates run `git clone`, teams use tools like **Husky** (or `core.hooksPath`) to version hooks in Git. Also, `git commit --no-verify` skips local hooks, so **always run CI checks on GitHub too**!",
          "codeExample": "#!/bin/sh\n# .husky/commit-msg\nMSG_FILE=\"$1\"\nFIRST_LINE=$(head -n 1 \"$MSG_FILE\")\n\nif ! echo \"$FIRST_LINE\" | grep -Eq \"^(feat|fix|docs|refactor|test|chore)(\\(.+\\))?: .{3,}\"; then\n  echo \"ERROR: Commit message must follow Conventional Commits (e.g., 'feat: add login')\"\n  exit 1\nfi",
          "codeExplanation": "1. Reads the first line of the commit message file passed as $1.\n2. Uses an extended regex to require prefixes like feat:, fix:, docs:, etc.\n3. Exits with status 1 to block the commit cleanly if invalid.\n\nHow to Run & Expected Output:\nMake executable (`chmod +x`) inside `.git/hooks/commit-msg`. Running `git commit -m \"wip\"` aborts with the helpful error message; `git commit -m \"fix: handle null\"` succeeds.",
          "practiceExercise": "Guided Exercise:\n1. Test the `commit-msg` hook in a practice repo with an invalid message and a valid Conventional Commit message.\n\nIndependent Challenge:\nWrite a `pre-commit` hook check using `git diff --cached --name-only` that blocks committing any file named `.env`.\n\nExpected Result:\nInvalid commit messages and accidental secret files are blocked before entering history.",
          "keyTakeaways": [
            "Git hooks abort commits/pushes when they exit with a non-zero status code",
            ".git/hooks/ is not tracked by Git — use Husky or core.hooksPath to share hooks across a team",
            "Local hooks can be skipped with --no-verify, so always enforce critical checks in GitHub CI too"
          ]
        },
        {
          "title": "Enforcing Formatting & Conventional Commits with Husky",
          "duration": "45m",
          "introduction": "Running ESLint across 500 files on every commit is slow. Combining Husky with lint-staged checks ONLY the files you actually staged.",
          "objectives": [
            "Configure lint-staged to run linters/formatters only on staged files",
            "Understand how Husky hooks into package.json prepare script"
          ],
          "notes": "### Why `lint-staged`?\nInstead of linting the entire repository on every tiny commit, `lint-staged` runs ESLint/Prettier **strictly on files in the Staging Area** — finishing in <1 second so developers don't get frustrated and pass `--no-verify`.",
          "codeExample": "// package.json excerpt\n{\n  \"scripts\": {\n    \"prepare\": \"husky\"\n  },\n  \"lint-staged\": {\n    \"*.{js,jsx,ts,tsx}\": [\n      \"eslint --fix\",\n      \"prettier --write\"\n    ]\n  }\n}",
          "codeExplanation": "1. \"prepare\": \"husky\" automatically configures Git hooks whenever a teammate runs npm install.\n2. \"lint-staged\" scopes eslint and prettier strictly to staged JS/TS files.\n\nHow to Run & Expected Output:\nRunning `npx lint-staged` formats and lints only files currently staged via `git add`.",
          "practiceExercise": "Guided Exercise:\n1. Add a `\"*.md\": [\"prettier --write\"]` entry to a sample `lint-staged` config.\n\nIndependent Challenge:\nExplain why fast (<2s) pre-commit hooks paired with full CI test suites give the best developer experience.\n\nExpected Result:\nConsistent code formatting and clean commit messages across the entire team.",
          "keyTakeaways": [
            "Husky shares Git hooks cleanly across team clones via npm install / prepare",
            "lint-staged runs formatters and linters only on staged files for instant feedback"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why aren’t scripts placed directly in `.git/hooks/` automatically shared when a teammate clones your repository?",
          "options": [
            "Git compresses hooks",
            "The .git/ directory is local repository state and is never pushed or cloned; tools like Husky store hooks in tracked folders",
            "Windows blocks .git/hooks",
            "GitHub deletes hooks"
          ],
          "correctAnswer": 1,
          "explanation": "Nothing inside .git/ is pushed to remotes; Husky stores hooks in .husky/ (tracked by Git) and wires core.hooksPath on npm install."
        },
        {
          "question": "Why must teams still run lint and tests in GitHub Actions CI even when Husky pre-commit hooks are configured?",
          "options": [
            "Husky only runs on Tuesdays",
            "Developers can bypass local hooks anytime with `git commit --no-verify`",
            "CI cannot run without Husky",
            "Husky deletes tests"
          ],
          "correctAnswer": 1,
          "explanation": "Client-side hooks are helpful guardrails, not security gates, because --no-verify skips them locally."
        },
        {
          "question": "What does `lint-staged` optimize during a `pre-commit` hook?",
          "options": [
            "It skips linting completely",
            "It runs linters and formatters strictly on currently staged files instead of the entire codebase",
            "It pushes directly to main",
            "It minifies images"
          ],
          "correctAnswer": 1,
          "explanation": "Scoping checks to staged files keeps pre-commit hooks fast (<1-2 seconds)."
        },
        {
          "question": "What exit code must a Git hook script return to abort a commit?",
          "options": [
            "0",
            "Any non-zero code (e.g., 1)",
            "-0",
            "200"
          ],
          "correctAnswer": 1,
          "explanation": "Exit 0 signals success; any non-zero exit code tells Git to abort the commit or push."
        }
      ]
    },
    {
      "title": "Module 9: GitHub Actions CI/CD, Dependabot & Security Scanning",
      "duration": "1h 45m",
      "objectives": [
        "Write a GitHub Actions YAML workflow running install, lint, test, and build on every PR",
        "Protect main branches with required status checks and CODEOWNERS",
        "Automate dependency updates and secret scanning on GitHub"
      ],
      "notes": "### Module Introduction & Description\nAutomated **Continuous Integration (CI)** guarantees that every Pull Request compiles and passes all tests in a clean cloud runner — eliminating *\"it works on my machine\"* merges forever.\n\n### Prerequisites\n- Completion of Modules 1–8.\n\n### Skills Acquired\n- Authoring `.github/workflows/ci.yml`, configuring branch protection rules, `CODEOWNERS`, and Dependabot.\n\n### How the Lessons Connect\n- **Lesson 1** writes a real Node/Vite GitHub Actions CI workflow.\n- **Lesson 2** locks down `main` with Branch Protection, `CODEOWNERS`, and Secret Scanning.\n\n### Completion Criteria\n- Complete both lessons, deliver the GitHub Actions CI & CODEOWNERS assignment, and pass the Module 9 quiz with 100%.",
      "assignment": "Problem Statement:\nConfigure automated CI for a full-stack React + Node.js monorepo on GitHub so every Pull Request targeting main automatically runs backend tests, frontend tests, and the Vite production build before a human ever clicks Merge.\n\nObjectives:\n- Author a valid .github/workflows/ci.yml workflow using actions/checkout and actions/setup-node with npm caching.\n- Define a .github/CODEOWNERS file routing security-sensitive auth changes to senior reviewers.\n\nRequirements:\n1. Trigger workflow on push to main and pull_request targeting main.\n2. Set explicit minimal permissions: permissions: { contents: read }.\n3. Run steps: checkout -> setup Node 20 -> npm ci (never npm install in CI!) -> npm test -> npm run build.\n4. Create .github/CODEOWNERS assigning /backend/middleware/ and /backend/controllers/auth* to @security-team.\n\nStep-by-Step Instructions:\n1. Write .github/workflows/ci.yml and .github/CODEOWNERS.\n2. Validate YAML indentation carefully (2 spaces, no tabs).\n\nDeliverables:\n- .github/workflows/ci.yml and .github/CODEOWNERS.\n\nEvaluation Criteria:\n- Uses npm ci for deterministic lockfile installs.\n- Minimal least-privilege permissions: contents: read.",
      "lessons": [
        {
          "title": "Building Automated Test & Build Workflows in GitHub Actions",
          "duration": "55m",
          "introduction": "GitHub Actions spins up a fresh Ubuntu VM on every Pull Request, runs your tests and build from scratch, and posts a green checkmark or red X right on the PR.",
          "objectives": [
            "Structure triggers (on: push / pull_request), jobs, and steps in YAML",
            "Use npm ci instead of npm install for reproducible CI builds",
            "Cache npm dependencies with actions/setup-node"
          ],
          "notes": "### Why `npm ci` Instead of `npm install` in CI?\n- `npm install` may silently update packages or modify `package-lock.json`.\n- **`npm ci`** (Clean Install) deletes `node_modules` and installs the **exact** versions locked in `package-lock.json`, failing immediately if `package.json` and `package-lock.json` are out of sync!\n\n### Least-Privilege Workflow Permissions\nAlways declare `permissions: { contents: read }` at the top of read/test workflows so a compromised third-party step cannot push commits or modify releases.",
          "codeExample": "name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - run: npm test\n      - run: npm run build",
          "codeExplanation": "1. Triggers on pushes to main and PRs targeting main.\n2. Restricts GITHUB_TOKEN to read-only contents.\n3. Checks out code, sets up Node 20 with npm cache, runs deterministic npm ci, tests, and builds.\n\nHow to Run & Expected Output:\nSave as `.github/workflows/ci.yml` and push a PR branch to GitHub: the Actions tab runs all steps and reports green checkmarks on the PR.",
          "practiceExercise": "Guided Exercise:\n1. Extend the YAML with `working-directory: ./backend` and `./frontend` for a monorepo with separate folders.\n\nIndependent Challenge:\nAdd a `concurrency: { group: ${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true }` block so rapid force-pushes cancel obsolete CI runs automatically!\n\nExpected Result:\nFast, deterministic CI verification on every Pull Request.",
          "keyTakeaways": [
            "Use npm ci in CI workflows for reproducible lockfile-exact installs",
            "Scope workflow permissions to contents: read whenever write access isn’t needed",
            "Run tests AND production builds in CI before allowing PR merges"
          ]
        },
        {
          "title": "Secret Scanning, Branch Protection & Codeowners",
          "duration": "50m",
          "introduction": "CI checks only protect main if GitHub is configured to block merging when checks fail — and CODEOWNERS ensures critical auth files always get expert review.",
          "objectives": [
            "Configure Branch Protection Rules on main (require PR, require passing CI checks)",
            "Route sensitive file reviews automatically with .github/CODEOWNERS",
            "Enable Dependabot alerts and Secret Scanning"
          ],
          "notes": "### Branch Protection Rules on `main`\nEnable:\n1. **Require a Pull Request before merging** (blocks accidental direct `git push origin main`).\n2. **Require status checks to pass** (select your `verify` CI job).\n3. **Require review from Code Owners** (paired with `.github/CODEOWNERS`).\n\n### Secret Scanning & Push Protection\nGitHub Secret Scanning detects leaked API keys, AWS tokens, and MongoDB credentials — and **Push Protection** blocks the `git push` *before* the secret ever enters the remote repo!",
          "codeExample": "# .github/CODEOWNERS\n# Default owner for everything\n* @core-maintainers\n\n# Require security review on auth & middleware edits\n/backend/middleware/ @security-leads\n/backend/controllers/authController.js @security-leads\n/.github/workflows/ @devops-leads",
          "codeExplanation": "1. GitHub matches changed PR file paths from top to bottom (last matching rule wins).\n2. Modifying authController.js automatically requests review from @security-leads.",
          "practiceExercise": "Guided Exercise:\n1. Draft a `.github/dependabot.yml` config checking `npm` dependencies weekly.\n\nIndependent Challenge:\nExplain what to do immediately if you accidentally push an API key to a public repo (1. Revoke/rotate the key FIRST, 2. Rewrite history only after rotating!).\n\nExpected Result:\nProtected main branch with automated security & reviewer guardrails.",
          "keyTakeaways": [
            "Enable Branch Protection on main requiring PRs and passing CI status checks",
            "Use .github/CODEOWNERS to auto-assign expert reviewers to sensitive paths",
            "If a secret ever hits a remote repo, revoke and rotate the credential immediately"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is `npm ci` preferred over `npm install` inside GitHub Actions CI workflows?",
          "options": [
            "npm ci skips installing dependencies",
            "npm ci installs exact versions from package-lock.json deterministically and fails if lockfile is out of sync",
            "npm install only works on Windows",
            "npm ci runs unit tests automatically"
          ],
          "correctAnswer": 1,
          "explanation": "npm ci guarantees reproducible installs matching package-lock.json without mutating lockfiles."
        },
        {
          "question": "What does `.github/CODEOWNERS` automate when a Pull Request is opened?",
          "options": [
            "It merges the PR automatically",
            "It automatically requests reviews from designated teams/users whenever specific file paths are modified",
            "It encrypts environment variables",
            "It deploys to Vercel"
          ],
          "correctAnswer": 1,
          "explanation": "CODEOWNERS maps file paths to teams/maintainers so critical areas like auth or workflows always receive expert review."
        },
        {
          "question": "If an API key is accidentally pushed to GitHub, what is the VERY FIRST thing you must do?",
          "options": [
            "Delete the local branch",
            "Revoke and rotate the leaked credential immediately at the provider, since bots scrape public commits in seconds",
            "Run git commit --amend without rotating",
            "Rename the .env file"
          ],
          "correctAnswer": 1,
          "explanation": "Once pushed, assume the secret is compromised; always revoke/rotate it first before cleaning up history."
        },
        {
          "question": "Why set `permissions: { contents: read }` in a CI test workflow?",
          "options": [
            "To hide console logs",
            "To enforce least privilege so the workflow token cannot modify repository contents or releases",
            "To disable caching",
            "To allow force-pushing"
          ],
          "correctAnswer": 1,
          "explanation": "Least-privilege GITHUB_TOKEN permissions reduce blast radius if any workflow step is compromised."
        }
      ]
    },
    {
      "title": "Module 10: Open-Source Maintainer Workflows & Release Engineering",
      "duration": "1h 45m",
      "objectives": [
        "Generate structured Changelogs and GitHub Releases from Conventional Commits",
        "Manage PR etiquette, issue templates, and contributing guides cleanly",
        "Execute an end-to-end team release simulation integrating Modules 1–10"
      ],
      "notes": "### Module Introduction & Description\nOpen-source and team repositories thrive on clarity: clear `CONTRIBUTING.md` guides, structured issue templates, clean release notes, and repeatable release workflows.\n\n### Prerequisites\n- Completion of Modules 1–9.\n\n### Skills Acquired\n- Release engineering, changelog generation, repository governance (`CONTRIBUTING.md`, issue templates), and end-to-end GitHub Flow execution.\n\n### How the Lessons Connect\n- **Lesson 1** covers changelogs, release notes, and repository documentation.\n- **Lesson 2** walks through a complete end-to-end Team Release Simulation.\n\n### Completion Criteria\n- Complete both lessons, deliver the End-to-End Release Engineering Capstone assignment, and pass the Module 10 quiz with 100%.",
      "assignment": "Final Capstone Assignment — End-to-End Team Release Simulation:\nProblem Statement:\nSimulate a complete v1.1.0 release cycle for a team repository: feature branching, interactive rebase cleanup, CI check verification, annotated SemVer tagging, and structured Release Notes.\n\nObjectives:\n- Apply Conventional Commits, clean PRs, annotated SemVer tags, and changelog generation end-to-end.\n\nRequirements:\n1. Create CONTRIBUTING.md documenting branch naming (feat/, fix/), Conventional Commits, and PR testing expectations.\n2. Simulate a 2-commit feature branch, squash/clean it with git rebase -i, merge cleanly into main, and tag v1.1.0 (git tag -a v1.1.0 -m \"...\").\n3. Generate a structured CHANGELOG.md section for v1.1.0 grouping Features and Bug Fixes from git log v1.0.0..v1.1.0 --oneline.\n\nStep-by-Step Instructions:\n1. Write CONTRIBUTING.md and CHANGELOG.md.\n2. Execute the branch -> commit -> rebase -> merge -> annotated tag flow in a practice repo.\n\nDeliverables:\n- CONTRIBUTING.md, CHANGELOG.md, and git log --oneline --decorate output.\n\nEvaluation Criteria:\n- Clean linear/merged release history with annotated v1.1.0 tag.\n- Accurate changelog derived from actual commit range.",
      "lessons": [
        {
          "title": "Changelogs, Release Notes & Monorepo Collaboration",
          "duration": "50m",
          "introduction": "Users upgrading from v1.0.0 to v1.1.0 shouldn’t have to read 80 raw commits to know what changed or whether anything broke.",
          "objectives": [
            "Generate release commit summaries using git log <prevTag>..<newTag>",
            "Write clear Breaking Changes, Features, and Fixes release notes"
          ],
          "notes": "### Clean Release Notes Structure\nUsing `git log v1.0.0..HEAD --oneline`, group changes into:\n- **Breaking Changes** (MAJOR)\n- **Features** (`feat:`, MINOR)\n- **Bug Fixes** (`fix:`, PATCH)\nPair this with a crisp `CONTRIBUTING.md` so new contributors know how to run tests and format commits before opening their first PR.",
          "codeExample": "# List all commits since v1.0.0 cleanly\ngit log v1.0.0..HEAD --oneline --no-merges\n\n# Tag the new minor release and push\ngit tag -a v1.1.0 -m \"Release v1.1.0: export CSV & accessibility improvements\"\ngit push origin v1.1.0",
          "codeExplanation": "1. --no-merges filters out noisy merge commits when building release notes.\n2. Annotated tag v1.1.0 records author, timestamp, and release summary.\n\nHow to Run & Expected Output:\nRun inside a tagged repo: prints clean list of commits since v1.0.0 and creates annotated tag v1.1.0.",
          "practiceExercise": "Guided Exercise:\n1. Run `git log --oneline -n 10 --no-merges` in any repository and group those 10 commits into Features vs Fixes.\n\nIndependent Challenge:\nWrite a `.github/ISSUE_TEMPLATE/bug_report.yml` or markdown template asking for Steps to Reproduce, Expected Behavior, and Actual Behavior.\n\nExpected Result:\nClear contributor onboarding and readable release notes.",
          "keyTakeaways": [
            "Use git log <oldTag>..HEAD --oneline --no-merges to assemble accurate release changelogs",
            "Highlight Breaking Changes prominently at the top of release notes",
            "Provide CONTRIBUTING.md and issue templates to reduce maintainer back-and-forth"
          ]
        },
        {
          "title": "Final Integration: End-to-End Team Release Simulation",
          "duration": "55m",
          "introduction": "Pulling all 10 modules together: clean local dev, hooks, feature branch, rebase cleanup, PR + CI, merge, and annotated SemVer release.",
          "objectives": [
            "Execute the complete professional Git & GitHub lifecycle smoothly",
            "Verify clean repository state before and after tagging a release"
          ],
          "notes": "### Complete Release Checklist\n1. Pull latest `main` (`git pull --ff-only`).\n2. Branch -> atomic Conventional Commits -> local tests/hooks pass.\n3. Clean WIP commits with `git rebase -i` -> push with `-u` (or `--force-with-lease` if rebased).\n4. Open PR -> CI passes -> Codeowners review -> Merge -> Delete feature branch.\n5. Tag annotated SemVer release -> publish Changelog.",
          "codeExample": "# Complete release verification sequence\ngit switch main\ngit pull --ff-only origin main\ngit status                  # Must be clean working tree\ngit tag -a v1.1.0 -m \"Release v1.1.0\"\ngit show v1.1.0 --stat",
          "codeExplanation": "1. Ensures main is synced and working tree is clean before tagging a permanent release milestone.\n\nHow to Run & Expected Output:\nRun in a practice repo: `git show v1.1.0 --stat` displays tag metadata and release commit diff summary.",
          "practiceExercise": "Guided Exercise:\n1. Walk through the 5-step release checklist on a local bare-remote practice repo from feature branch to tagged release.\n\nIndependent Challenge:\nVerify `git branch --merged main` lists no leftover merged feature branches.\n\nExpected Result:\nRepeatable, error-free team release execution.",
          "keyTakeaways": [
            "Verify clean working tree and passing tests before tagging any release",
            "Combine GitHub Flow, CI checks, CODEOWNERS, and SemVer tags into one cohesive workflow"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which command lists commits added since v1.0.0 while omitting merge commits?",
          "options": [
            "git status --short",
            "git log v1.0.0..HEAD --oneline --no-merges",
            "git diff v1.0.0",
            "git branch -a"
          ],
          "correctAnswer": 1,
          "explanation": "v1.0.0..HEAD scopes commits after v1.0.0, and --no-merges hides merge commits for cleaner changelogs."
        },
        {
          "question": "What belongs in a repository’s `CONTRIBUTING.md` file?",
          "options": [
            "Database passwords",
            "Instructions for local setup, running tests, branch naming, and commit/PR conventions",
            "Compiled dist/ bundles",
            "User email addresses"
          ],
          "correctAnswer": 1,
          "explanation": "CONTRIBUTING.md helps teammates and open-source contributors submit clean, testable Pull Requests."
        },
        {
          "question": "Before creating a release tag on `main`, what should `git status` confirm?",
          "options": [
            "At least 5 untracked files",
            "A clean working tree with all intended commits merged and tested",
            "Detached HEAD state",
            "Active merge conflicts"
          ],
          "correctAnswer": 1,
          "explanation": "Always tag a clean, tested, up-to-date main branch."
        },
        {
          "question": "Why highlight Breaking Changes at the very top of Release Notes?",
          "options": [
            "Because alphabetical order puts B first",
            "So teams upgrading know immediately what code changes or migrations are required before updating",
            "GitHub requires it to compile",
            "To hide new features"
          ],
          "correctAnswer": 1,
          "explanation": "Prominent Breaking Changes prevent surprise production outages during dependency upgrades."
        }
      ]
    }
  ]
};
