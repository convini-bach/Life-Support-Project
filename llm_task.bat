@echo off
set "LLM_ARGS=%*"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0llm_task.ps1"
exit /b %errorlevel%
