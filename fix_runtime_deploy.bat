@echo off
echo ==========================================
echo      Math Quest - FIXING RUNTIME & GUEST
echo ==========================================

echo [1/2] Forcing Node.js Runtime for Auth API...
git add src/app/api/auth/[...nextauth]/route.ts
git commit -m "Fix: Force nodejs runtime for NextAuth API"

echo.
echo [2/2] Deploying...
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYING FIX...
echo ==========================================
echo.
pause
