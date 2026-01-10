@echo off
echo ==========================================
echo      Math Quest - FIXING BUILD ERROR
echo ==========================================

echo [1/3] Adding the fix to Git...
git add next.config.mjs
git commit -m "Fix minification error on Heroku"

echo.
echo [2/3] Redeploying to Heroku...
echo (This will take 2-3 minutes to rebuild)
call git push heroku main

echo.
echo ==========================================
echo      DEPLOYING FIX...
echo ==========================================
echo.
echo Once this finishes, wait 30 seconds and refresh your site.
echo.
pause
