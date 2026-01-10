@echo off
echo ==========================================
echo      Math Quest - FIXING GIT TRACKING
echo ==========================================

echo [1/3] Removing node_modules from Git (keeping local files)...
git rm -r --cached node_modules
git rm -r --cached .next

echo.
echo [2/3] Adding .gitignore and committing...
git add .gitignore
git commit -m "Fix: Remove node_modules from git tracking"

echo.
echo [3/3] Redeploying to Heroku...
call git push heroku main

echo.
echo ==========================================
echo      FIX DEPLOYED!
echo ==========================================
echo.
pause
