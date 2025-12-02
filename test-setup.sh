#!/bin/bash

# BabyBliss - System Test & Debug Script
# =======================================

echo "🔍 BabyBliss - System Diagnostics"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check Node.js
echo -e "${BLUE}1. Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}   ✅ Node.js ${NODE_VERSION} installed${NC}"
else
    echo -e "${RED}   ❌ Node.js not found${NC}"
    exit 1
fi

# Check npm
echo -e "${BLUE}2. Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}   ✅ npm ${NPM_VERSION} installed${NC}"
else
    echo -e "${RED}   ❌ npm not found${NC}"
    exit 1
fi

# Check MongoDB
echo -e "${BLUE}3. Checking MongoDB connection...${NC}"
if nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}   ✅ MongoDB running on localhost:27017${NC}"
else
    echo -e "${YELLOW}   ⚠️  MongoDB not detected on localhost:27017${NC}"
    echo -e "${YELLOW}   Using MongoDB Atlas (check server/.env)${NC}"
fi

# Check server dependencies
echo -e "${BLUE}4. Checking server dependencies...${NC}"
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}   ✅ Server dependencies installed${NC}"
else
    echo -e "${YELLOW}   ⚠️  Server dependencies missing${NC}"
    echo -e "${BLUE}   Installing server dependencies...${NC}"
    cd server && npm install && cd ..
fi

# Check client dependencies
echo -e "${BLUE}5. Checking client dependencies...${NC}"
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}   ✅ Client dependencies installed${NC}"
    
    # Check for animation libraries
    if [ -d "client/node_modules/framer-motion" ]; then
        echo -e "${GREEN}   ✅ framer-motion installed${NC}"
    else
        echo -e "${RED}   ❌ framer-motion missing${NC}"
    fi
    
    if [ -d "client/node_modules/three" ]; then
        echo -e "${GREEN}   ✅ three.js installed${NC}"
    else
        echo -e "${RED}   ❌ three.js missing${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  Client dependencies missing${NC}"
    echo -e "${BLUE}   Installing client dependencies...${NC}"
    cd client && npm install && cd ..
fi

# Check environment files
echo -e "${BLUE}6. Checking environment configuration...${NC}"
if [ -f "server/.env" ]; then
    echo -e "${GREEN}   ✅ server/.env exists${NC}"
else
    echo -e "${YELLOW}   ⚠️  server/.env missing${NC}"
fi

if [ -f "client/.env" ]; then
    echo -e "${GREEN}   ✅ client/.env exists${NC}"
    cat client/.env
else
    echo -e "${YELLOW}   ⚠️  client/.env missing${NC}"
fi

# Test API endpoint
echo -e "${BLUE}7. Testing API endpoint...${NC}"
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ API server responding at http://localhost:5000${NC}"
else
    echo -e "${YELLOW}   ⚠️  API server not running${NC}"
    echo -e "${YELLOW}   Start with: cd server && npm start${NC}"
fi

# Check ports
echo -e "${BLUE}8. Checking port availability...${NC}"
if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Port 5000 available for backend${NC}"
else
    echo -e "${YELLOW}   ⚠️  Port 5000 in use${NC}"
fi

if ! lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Port 5173 available for frontend${NC}"
else
    echo -e "${YELLOW}   ⚠️  Port 5173 in use${NC}"
fi

echo ""
echo -e "${BLUE}=================================${NC}"
echo -e "${GREEN}✅ Diagnostics Complete${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Recommendations
echo -e "${BLUE}📋 Next Steps:${NC}"
echo ""

if [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}1. Install dependencies:${NC}"
    echo "   cd server && npm install"
    echo "   cd ../client && npm install"
    echo ""
fi

echo -e "${YELLOW}2. Start the servers:${NC}"
echo "   Terminal 1: cd server && npm start"
echo "   Terminal 2: cd client && npm run dev"
echo ""

echo -e "${YELLOW}3. Open browser:${NC}"
echo "   http://localhost:5173"
echo ""

echo -e "${BLUE}🔧 Troubleshooting:${NC}"
echo "   - If animations not working: npm install in client/"
echo "   - If API failing: Check MongoDB connection in server/.env"
echo "   - If port conflicts: Change ports in vite.config.ts or server.js"
echo ""
