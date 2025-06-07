# Git & GitHub — Quick Reference 🚀

## 1. 📥 Download and Prepare the Project

Visit GitHub and download the repository as a .zip.

Extract it to a location of your choice.

Open the project folder using Git Bash and run:

    git init

## 2. 🛠️ Initial Configuration

Set your global identity:

    git config --global user.name "YourName"
    git config --global user.email "youremail@example.com"

Configure line endings based on your OS:

Windows:

    git config --global core.autocrlf true

macOS/Linux:

    git config --global core.autocrlf input

### 💡 Pro tip


To have git fetch always remove stale remote references, set:

    git config --global fetch.prune true

## 3. 🌐 Connect to the Remote Repository

Copy the HTTPS URL of the remote repo.

Add it as the origin:

    git remote add origin <HTTPS-URL-HERE>
    git remote -v  # Verify the remote settings

## 4. 🧠 Working with Branches

### 4.1 View and Switch Branches

    git branch           # List local branches
    git checkout <branch> # Switch to an existing branch

If git checkout fails, try: (☢️This is the branch dosent exist☢️)

    git fetch origin NAME OF BRANCH

### 4.2 Create a Branch and Push It

    git checkout -b <new-branch>
    git push origin <new-branch>

### 4.3 Merge a Branch into main

From the main branch:

    git merge origin/<your-branch>
    git push origin main

### 4.4 Delete a Remote Branch

    git push origin --delete <branch>

5. 🔄 Keep Your Repo in Sync

Working alone 🚹:

    git pull origin main

If you see 👀:

    fatal: refusing to merge unrelated histories

run ◀️:

    git pull origin main --allow-unrelated-histories

Then resolve any conflicts, and check status:

    git status  # or git status -s

Working with a team 🤼‍♂️:

Check current branch:

    git status

Stage changes:

    git add .

    # or add specific files:

    git add <file>

Commit your changes:

    git commit -m "Descriptive message"

Push your branch:

    git push origin <your-branch>

To get updates from others into main:

    git checkout main
    git fetch origin/main
    git merge origin/main


## 6. 🔒 Optional: SSH Setup for Secure Access (☢️This is your working in your own PC☢️)
Generate your SSH key:

    ssh-keygen -t ed25519 -C "youremail@example.com"

Start the SSH agent and add your key:

    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519

Copy your public key:

    cat ~/.ssh/id_ed25519.pub

In GitHub: go to Settings → SSH and GPG keys → New SSH key, and paste your public key.

Test the connection:

    ssh -T git@github.com

# Extra 😎

## 1. ⏪⏩git revert and git reset

🔁 git reset

What it does:

Moves the current branch pointer (HEAD) back to a chosen commit.

Ideal for rewriting local history on branches that haven't been shared.

Modes:
--soft: keep changes staged, HEAD moves only.

--mixed (default): unstages changes; working directory remains intact.

--hard: discards all changes up to that commit, including your working directory

Use cases:

Undo local commits: e.g. remove your last two commits:

    git reset --mixed HEAD~2

Unstage files:

    git reset HEAD <file>

Start over from history (dangerous!):

    git reset --hard HEAD~1

Warning: --hard can permanently delete work — avoid if unsure

## 2. 🔄 git revert

What it does:

Does not change history or remove commits.

Creates a new commit that undoes a previous one 

Use cases:
Safely undo changes on public/shared branches:

    git revert <commit-hash>

Revert without editing message:

    git revert --no-edit <commit-hash>

This adds a reverse commit to preserve the history while removing the effects of a past commit.

## 🧽 Deleting Remote and Local Branches in Git

When you delete a branch on GitHub (remote), it doesn't remove the branch from your local repository. Here's how to clean up both remote-tracking references and your own local branch safely:

🔹 Step 1: Switch to a safe branch
First, make sure you're not on the branch you want to delete. Switch to a stable branch like main or develop:

    git checkout main

🔹 Step 2: Remove the local branch

To delete your local branch only if it’s already merged:

    git branch -d branch-name

If the branch has unmerged commits and you still want to delete, you can force it (use with caution):

    git branch -D branch-name

🔹 Step 3: Prune remote-tracking references

Deleting the branch remotely (on GitHub) doesn't update your local metadata—you’ll still see something like origin/branch-name. To clean up those stale references:

    git fetch --prune

Or use this equivalent command:

    git remote prune origin

This removes any local references to remote branches that no longer exist 

# 🛡️ Common Error & Fix
Error:

    fatal: refusing to merge unrelated histories

Fix:

    git pull origin main --allow-unrelated-histories

Then save and close the editor (e.g., in Vim: press i, write your message, then Esc, followed by :wq).
