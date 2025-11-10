# PowerShell script to push project to GitHub
# Make sure Git is installed before running this script

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin https://github.com/zakaryabelgaid/students.git

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit: Teacher Platform with First Year/Second Year levels"

Write-Host "Setting main branch..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Yellow
git push -u origin main

Write-Host "Done! Check your repository at https://github.com/zakaryabelgaid/students" -ForegroundColor Green

