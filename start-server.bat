@echo off
rem Double-click to run the MitsuCap reference site at http://localhost:3000/
start "" "http://localhost:3000/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" %*
pause
