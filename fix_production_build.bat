@echo off
echo ==========================================
echo      Math Quest - FIXING MISSING TOOLS
echo ==========================================

echo Heroku is trying to build without "developer tools" 
echo (like Typescript and Prisma), so it fails.
echo.
echo We will tell Heroku to install EVERYTHING.
echo.

call heroku config:set NPM_CONFIG_PRODUCTION=false

echo.
echo [2/2] Triggering a new deployment...
git commit --allow-empty -m "Retry build with dev dependencies"
call git push heroku main

echo.
echo ==========================================
echo      If you see "Build succeeded!"...
echo      YOU ARE DONE!
echo ==========================================
echo.
pause
