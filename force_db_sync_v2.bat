@echo off
echo ==========================================
echo      Math Quest - FORCE DATABASE V2
echo ==========================================

echo The previous flag was invalid (my bad!).
echo Retrying "db push" without the flag...
echo.

call heroku run npx prisma db push

echo.
echo ==========================================
echo      IF "The PostgreSQL database... is now in sync"
echo      THEN YOU ARE DONE!
echo ==========================================
echo.
pause
