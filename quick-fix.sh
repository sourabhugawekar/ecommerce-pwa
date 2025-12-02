#!/bin/bash

# Quick Fix Script - Common BabyBliss Issues
# ==========================================

echo "🔧 BabyBliss Quick Fix"
echo "====================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}This script will:${NC}"
echo "1. Install missing dependencies"
echo "2. Seed the database"
echo "3. Clear build caches"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Fix 1: Install server dependencies
echo ""
echo -e "${BLUE}Step 1: Installing server dependencies...${NC}"
cd server
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Server dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Server dependencies already installed${NC}"
fi

# Fix 2: Install client dependencies (including animations)
echo ""
echo -e "${BLUE}Step 2: Installing client dependencies...${NC}"
cd ../client
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Client dependencies installed${NC}"
else
    # Check if animation libraries exist
    if [ ! -d "node_modules/framer-motion" ] || [ ! -d "node_modules/three" ]; then
        echo -e "${YELLOW}Installing missing animation libraries...${NC}"
        npm install framer-motion three @react-three/fiber @react-three/drei
        echo -e "${GREEN}✅ Animation libraries installed${NC}"
    else
        echo -e "${GREEN}✅ Client dependencies already installed${NC}"
    fi
fi

# Fix 3: Clear Vite cache
echo ""
echo -e "${BLUE}Step 3: Clearing build cache...${NC}"
rm -rf .vite dist
echo -e "${GREEN}✅ Cache cleared${NC}"

# Fix 4: Seed database
echo ""
echo -e "${BLUE}Step 4: Seeding database...${NC}"
cd ../server
npm run seed
echo -e "${GREEN}✅ Database seeded${NC}"

cd ..

echo ""
echo -e "${GREEN}✅ All fixes applied!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Start backend:  cd server && npm start"
echo "2. Start frontend: cd client && npm run dev"
echo "3. Open: http://localhost:5173"
echo ""
