@echo off
echo ==========================================
echo   Fixing NextAuth Constructor Error
echo ==========================================
echo.
echo The error "next_request is not a constructor" is caused by
echo the AUTH_URL environment variable conflicting with trustHost mode.
echo.
echo SOLUTION: Remove AUTH_URL from Heroku config vars
echo.
echo Please do this manually in Heroku Dashboard:
echo 1. Go to Settings tab
echo 2. Reveal Config Vars
echo 3. Find AUTH_URL and click the X button to delete it
echo 4. Keep trustHost: true in auth.ts (already set)
echo.
echo After removing AUTH_URL, the app will restart and auth should work!
echo.
pause
