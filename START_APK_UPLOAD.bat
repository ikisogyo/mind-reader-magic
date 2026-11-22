@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title MindMagic - Upload source and start Android APK build
set "RESULT=0"
set "LOCAL_NAME="
set "LOCAL_EMAIL="
set "CURRENT_REMOTE="
set "REPO_URL=https://github.com/ikisogyo/mind-reader-magic.git"
echo =====================================================
echo MindMagic - Upload source to GitHub
echo =====================================================
echo.
echo Target repository: https://github.com/ikisogyo/mind-reader-magic
echo.
where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git for Windows is not installed or not on PATH.
  echo Install Git: https://git-scm.com/download/win
  set "RESULT=1"
  goto FINISH
)
if not exist .github\workflows\android-build.yml (
  echo [ERROR] Android build workflow was not found.
  echo Run this BAT from the extracted MindMagic project folder.
  set "RESULT=1"
  goto FINISH
)
if not exist .git (
  git init
  if errorlevel 1 (
    echo [ERROR] git init failed.
    set "RESULT=1"
    goto FINISH
  )
)
for /f "delims=" %%N in ('git config --local user.name 2^>nul') do set "LOCAL_NAME=%%N"
for /f "delims=" %%E in ('git config --local user.email 2^>nul') do set "LOCAL_EMAIL=%%E"
if not defined LOCAL_NAME git config --local user.name "MindMagic Build"
if not defined LOCAL_EMAIL git config --local user.email "mindmagic-build@users.noreply.github.com"
git branch -M main
if errorlevel 1 (
  echo [ERROR] Could not set branch to main.
  set "RESULT=1"
  goto FINISH
)
git add .
if errorlevel 1 (
  echo [ERROR] git add failed.
  set "RESULT=1"
  goto FINISH
)
git status --short
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "MindMagic source upload/update"
  if errorlevel 1 (
    echo [ERROR] Commit failed.
    set "RESULT=1"
    goto FINISH
  )
)
echo.
echo Checking existing origin remote...
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REPO_URL%"
  if errorlevel 1 (
    echo [ERROR] Could not configure origin remote.
    set "RESULT=1"
    goto FINISH
  )
) else (
  for /f "delims=" %%R in ('git remote get-url origin') do set "CURRENT_REMOTE=%%R"
  if /i not "!CURRENT_REMOTE!"=="%REPO_URL%" (
    echo [ERROR] Existing origin is !CURRENT_REMOTE! and differs from the target repository.
    echo No remote was overwritten. Check the origin URL before continuing.
    set "RESULT=1"
    goto FINISH
  )
)
echo.
echo Pushing source to GitHub main...
echo If GitHub authentication is requested, follow the Git Credential Manager sign-in prompt.
git push -u origin main
if errorlevel 1 (
  echo [ERROR] Push failed. Read the Git error above; authentication may need completion.
  set "RESULT=1"
  goto FINISH
)
echo.
echo [SUCCESS] Source uploaded. GitHub Actions Android debug build should start automatically.
echo Repository Actions page: https://github.com/ikisogyo/mind-reader-magic/actions
echo After a successful run, download the mindmagic-debug-apk artifact.
:FINISH
echo.
if "%RESULT%"=="0" (
  echo Finished successfully.
) else (
  echo Finished with errors. This window will remain open so you can read the message.
)
echo.
pause
exit /b %RESULT%
