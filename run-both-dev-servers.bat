@echo off
echo Starting all development servers...
echo.
echo Main site will run on: http://localhost:8080
echo Brand-O-Vation site will run on: http://localhost:3000
echo Ventura site will run on: http://localhost:4000
echo Paradox Protocol site will run on: http://localhost:5000
echo Capitalyze site will run on: http://localhost:6000
echo.
echo Press Ctrl+C in each window to stop servers
echo.

start "Main Site (Port 8080)" cmd /k "npm run dev"
start "Brand-O-Vation Site (Port 3000)" cmd /k "cd brand-o-vation-site && npm run dev"
start "Ventura Site (Port 4000)" cmd /k "cd ventura-site && npm run dev"
start "Paradox Protocol Site (Port 5000)" cmd /k "cd paradox-protocol-site && npm run dev"
start "Capitalyze Site (Port 6000)" cmd /k "cd capitalyze-site && npm run dev"

echo.
echo All servers are starting in separate windows...
echo Close this window or press any key to exit this launcher.
pause
