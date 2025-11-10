# Git Setup and Push Instructions

## Prerequisites
1. Install Git from https://git-scm.com/download/win (if not already installed)
2. Make sure Git is added to your system PATH

## Steps to Push to GitHub

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add Remote Repository
```bash
git remote add origin https://github.com/zakaryabelgaid/students.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: Teacher Platform with First Year/Second Year levels"
```

### 5. Set Main Branch (if needed)
```bash
git branch -M main
```

### 6. Push to GitHub
```bash
git push -u origin main
```

## If You Need to Authenticate

If you're asked for credentials:
- **Username**: Your GitHub username (zakaryabelgaid)
- **Password**: Use a Personal Access Token (not your GitHub password)
  - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate a new token with `repo` permissions
  - Use that token as your password

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop from https://desktop.github.com/
2. Sign in with your GitHub account
3. Add the repository: File → Add Local Repository
4. Select this folder
5. Commit and push through the GUI

## Quick Command Sequence

Once Git is installed, you can run all commands at once:

```bash
git init
git remote add origin https://github.com/zakaryabelgaid/students.git
git add .
git commit -m "Initial commit: Teacher Platform"
git branch -M main
git push -u origin main
```


