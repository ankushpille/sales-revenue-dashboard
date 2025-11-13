#!/bin/bash

# Sales Analytics Dashboard - Development Start Script

echo "🚀 Starting Sales Analytics Dashboard..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "⚠️  Frontend .env file not found. Creating from example..."
    cp .env.example .env
    echo "✏️  Please edit .env file with your configuration"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating from example..."
    cp backend/.env.example backend/.env
    echo "✏️  Please edit backend/.env file with your MongoDB URI"
fi

echo ""
echo "🎯 Starting servers..."
echo ""
echo "📡 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
npm start

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
