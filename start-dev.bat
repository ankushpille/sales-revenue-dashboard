@echo off
REM Sales Analytics Dashboard - Development Start Script for Windows

echo.
echo 🚀 Starting Sales Analytics Dashboard...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo 📦 Installing frontend dependencies...
    call npm install
)

if not exist "backend\node_modules\" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if .env files exist
if not exist ".env" (
    echo ⚠️  Frontend .env file not found. Creating from example...
    copy .env.example .env
    echo ✏️  Please edit .env file with your configuration
)

if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found. Creating from example...
    copy backend\.env.example backend\.env
    echo ✏️  Please edit backend\.env file with your MongoDB URI
)

echo.
echo 🎯 Starting servers...
echo.
echo 📡 Backend will run on: http://localhost:5000
echo 🌐 Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop the servers
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "npm start"

echo.
echo ✅ Both servers are starting in separate windows
echo.
pause
