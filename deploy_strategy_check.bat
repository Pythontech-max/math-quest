@echo off
echo ==========================================
echo      Math Quest - STRATEGY: NO MINIFY
echo ==========================================

echo [1/2] Adding Health Check & Disabling Minifier...
git add src/app/api/health/route.ts
git add next.config.mjs
git commit -m "Debug: Add health check and disable minification"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYING NEW STRATEGY...
echo ==========================================
echo.
pause
