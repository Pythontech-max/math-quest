@echo off
echo ==========================================
echo      Math Quest - FIXING MINIFICATION
echo ==========================================

echo [1/2] Updating Next.js Config...
git add next.config.mjs
git commit -m "Fix: Exclude Prisma from minification bundle"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYMENT REQUESTED
echo ==========================================
echo.
pause
