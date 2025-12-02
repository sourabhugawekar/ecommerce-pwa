#!/bin/bash

echo "🔍 BabyBliss PWA - Installation Verification"
echo "==========================================="
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Found: $NODE_VERSION"
else
    echo "❌ Not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ Found: v$NPM_VERSION"
else
    echo "❌ Not found. Please install npm"
    exit 1
fi

# Check MongoDB
echo -n "Checking MongoDB... "
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo "✅ Found"
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        echo "   ✅ MongoDB is running"
    else
        echo "   ⚠️  MongoDB is not running. Start with: mongod"
    fi
else
    echo "❌ Not found. Please install MongoDB"
    exit 1
fi

echo ""
echo "📂 Checking Project Structure..."

# Check server files
echo -n "Server files... "
if [ -f "server/package.json" ] && [ -f "server/server.js" ]; then
    echo "✅"
else
    echo "❌ Missing server files"
fi

# Check client files
echo -n "Client files... "
if [ -f "client/package.json" ] && [ -f "client/src/App.tsx" ]; then
    echo "✅"
else
    echo "❌ Missing client files"
fi

# Check PWA files
echo -n "PWA files... "
if [ -f "client/public/manifest.json" ] && [ -f "client/public/sw.js" ]; then
    echo "✅"
else
    echo "❌ Missing PWA files"
fi

echo ""
echo "📦 Checking Dependencies..."

# Check server dependencies
echo -n "Server dependencies... "
if [ -d "server/node_modules" ]; then
    echo "✅ Installed"
else
    echo "⚠️  Not installed. Run: cd server && npm install"
fi

# Check client dependencies
echo -n "Client dependencies... "
if [ -d "client/node_modules" ]; then
    echo "✅ Installed"
else
    echo "⚠️  Not installed. Run: cd client && npm install"
fi

echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Install dependencies (if not already done):"
echo "   cd server && npm install"
echo "   cd client && npm install"
echo ""
echo "2. Seed the database:"
echo "   cd server && npm run seed"
echo ""
echo "3. Start the servers:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "✅ Verification complete!"
