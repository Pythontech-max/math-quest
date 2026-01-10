@echo off
echo ==========================================
echo      Math Quest - FIXING GUEST MODE
echo ==========================================

echo [1/2] Updating Middleware Exclusions...
git add middleware.ts
git commit -m "Fix: Exclude /play from middleware to allow guest access"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYMENT COMPLETE
echo ==========================================
echo.
echo Please try "Continue as Guest" again.
echo.
echo If Google Sign-In still fails, run 'show_logs.bat' immediately.
echo.
pause
