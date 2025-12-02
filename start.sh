#!/bin/bash

echo "🚀 BabyBliss PWA - Quick Start Script"
echo "======================================"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   OR"
    echo "   mongod"
    echo ""
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "   Dependencies already installed"
fi

# Seed database
echo "🌱 Seeding database..."
npm run seed

echo ""
echo "✅ Backend setup complete!"
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "   Dependencies already installed"
fi

echo ""
echo "✅ Client setup complete!"
echo ""

echo "🎉 Setup complete! Starting servers..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Start both servers concurrently
cd ../server
npm run dev &
SERVER_PID=$!

cd ../client
npm run dev &
CLIENT_PID=$!

# Wait for both processes
wait $SERVER_PID $CLIENT_PID
