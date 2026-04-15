@echo off
setlocal
cd /d "%~dp0"
echo Starting Nutri-Vision...
echo Please wait for the server to start, then open http://localhost:3000 in your browser.
start http://localhost:3000
cmd /c "npm.cmd run dev"
pause
