@echo off
echo ==========================================
echo      Math Quest - AUTH URL FIX
echo ==========================================

echo Setting AUTH_URL to match your browser URL...
echo (It seems you have a special long-form URL)

call heroku config:set AUTH_URL="https://boiling-basin-83961-1ec2d864303e.herokuapp.com"

echo.
echo ==========================================
echo      AUTH URL UPDATED!
echo ==========================================
echo.
pause
