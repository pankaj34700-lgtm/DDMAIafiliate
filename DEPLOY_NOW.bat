@echo off
title DDMAI 1-Click Instant Deploy
color 0A
cls
echo ======================================================
echo   DDMAI 1-CLICK INSTANT DEPLOY
echo   Project ID: ddmaiaffiliate
echo ======================================================
echo.
echo Syncing production files to public/...
if not exist "%~dp0public" mkdir "%~dp0public"
copy /Y "%~dp0index.html" "%~dp0public\index.html" >nul
xcopy /E /I /Y "%~dp0assets" "%~dp0public\assets" >nul
echo Deploying to Firebase Hosting...
echo.
cd /d "%~dp0"
call firebase deploy --only hosting --project ddmaiaffiliate
echo.
echo ======================================================
echo   DEPLOYMENT FINISHED!
echo   Website: https://ddmaiaffiliate.web.app
echo ======================================================
echo.
pause
