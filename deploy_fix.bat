@echo off
echo ==========================================
echo      Math Quest - FINAL FIX
echo ==========================================

echo [1/2] Updating Auth Logic for Heroku...
git add .
git commit -m "Refactor Auth for Edge Runtime & Fix Build"

echo.
echo [2/2] Deploying...
echo (This is the one that will work!)
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYMENT IN PROGRESS
echo ==========================================
echo.
pause
