@echo off
echo ==========================================
echo      Math Quest - Heroku Deployment FINAL
echo ==========================================

echo [1/6] Configuring Git Identity (Required)...
git config user.email "deploy@example.com"
git config user.name "Deploy Bot"

echo.
echo [2/6] Cleaning up previous attempts...
git remote remove heroku
REM We ignore errors here if remote didn't exist

echo.
echo [3/6] Committing Code...
git init
git checkout -b main
git add .
git commit -m "Final Deploy Commit"

echo.
echo [4/6] Logging into Heroku...
call heroku login

echo.
echo [5/6] Creating/Linking App...
REM This creates a NEW app to ensure a clean start with correct remote
call heroku create

echo.
echo [6/6] Adding Database & Deploying...
call heroku addons:create heroku-postgresql:essential-0
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYMENT COMPLETE!
echo ==========================================
echo.
pause
