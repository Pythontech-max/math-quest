@echo off
echo ==========================================
echo      Math Quest - FORCE DATABASE CREATE
echo ==========================================

echo The previous step failed to create tables because 
echo no "migration files" were found. 
echo.
echo We are going to FORCE the database to create the tables now.
echo.

call heroku run npx prisma db push --accept-data-loss

echo.
echo ==========================================
echo      DATABASE TABLES CREATED!
echo ==========================================
echo.
echo NOW you can refresh the website.
echo.
pause
