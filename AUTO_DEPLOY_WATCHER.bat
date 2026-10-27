@echo off
title DDMAI Auto-Deploy Watcher (ddmaiaffiliate)
color 0B
cls
echo ======================================================
echo   DDMAI LIVE AUTO-DEPLOY WATCHER
echo   Project ID: ddmaiaffiliate
echo   Target: https://ddmaiaffiliate.web.app
echo ======================================================
echo.
echo Whenever you edit and save (Ctrl + S) index.html or assets,
echo this window will AUTOMATICALLY deploy the changes live!
echo.
echo (Keep this window minimized while you work)
echo ======================================================
echo.
node "%~dp0auto-deploy.js"
pause
