@echo off
echo ==========================================
echo      Math Quest - DISABLE MIDDLEWARE
echo ==========================================

echo [1/2] Disabling the "Security Gate" (Middleware)...
git commit -m "Debug: Temporarily disable middleware"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYING WITHOUT MIDDLEWARE...
echo ==========================================
echo.
pause
