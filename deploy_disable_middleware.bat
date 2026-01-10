@echo off
echo ==========================================
echo      Math Quest - DISABLING MIDDLEWARE
echo ==========================================

echo [1/2] Committing Middleware Deletion...
git add middleware.ts
git add middleware.bak
git commit -m "Fix: Disable middleware temporarily to resolve runtime crash"

echo.
echo [2/2] Deploying to Heroku...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOY COMPLETE
echo ==========================================
echo.
echo Now try:
echo 1. "Continue as Guest" (Should work instantly)
echo 2. "Google Sign In" (Should work if DB is connected)
echo.
pause
