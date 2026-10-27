@echo off
chcp 65001 >nul
title DDMAI - GitHub Push to DDMAIafiliate
color 0A
cd /d "%~dp0"

echo ================================================================
echo   DDMAI OFFICIAL GITHUB SYNC & PUSH UTILITY
echo   Repository : https://github.com/pankaj34700-lgtm/DDMAIafiliate.git
echo   Branch     : main
echo   Founder    : Veteran PankajBhai Umesh Gupta
echo ================================================================
echo.
echo [1/3] Checking Git Status...
git status -s
echo.
echo [2/3] Connecting and Pushing to GitHub (origin main)...
echo.
echo ----------------------------------------------------------------
echo * If a GitHub / Git Credential Manager login window appears:
echo   - Click "Sign in with your browser"
echo   - OR enter your GitHub Personal Access Token (PAT)
echo ----------------------------------------------------------------
echo.

git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ================================================================
    echo   [SUCCESS] All files uploaded to GitHub successfully!
    echo   Live Repository URL:
    echo   https://github.com/pankaj34700-lgtm/DDMAIafiliate
    echo ================================================================
) else (
    echo ================================================================
    echo   [FAILED] Push could not complete.
    echo   Please check your GitHub permissions or Personal Access Token.
    echo ================================================================
)

echo.
echo Press any key to close this window...
pause >nul
