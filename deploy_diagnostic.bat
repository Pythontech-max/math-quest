@echo off
echo ==========================================
echo      Math Quest - DIAGNOSTIC DEPLOY
echo ==========================================

echo [1/2] Disabling Middleware...
git add middleware.ts
git add middleware.bak
git commit -m "Diagnostic: Disable middleware to test Guest Mode"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOY COMPLETE
echo ==========================================
echo.
echo Please try "Continue as Guest" one more time.
echo.
pause
