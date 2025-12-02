#!/bin/bash

# BabyBliss - Installation & Run Script
# =====================================

set -e  # Exit on error

echo "🎨 BabyBliss PWA - Enhanced with Animations"
echo "==========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) found${NC}"

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB connection...${NC}"
if ! nc -z localhost 27017 2>/dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB is not running on localhost:27017${NC}"
    echo -e "${YELLOW}   Please start MongoDB or update MONGODB_URI in server/.env${NC}"
    echo ""
fi

# Install server dependencies
echo ""
echo -e "${PURPLE}📦 Step 1: Installing server dependencies...${NC}"
cd server
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Server dependencies installed${NC}"
else
    echo -e "${BLUE}ℹ️  Server dependencies already installed${NC}"
fi

# Install client dependencies
echo ""
echo -e "${PURPLE}📦 Step 2: Installing client dependencies (including animation libraries)...${NC}"
cd ../client
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Client dependencies installed${NC}"
    echo -e "${GREEN}   - framer-motion (animations)${NC}"
    echo -e "${GREEN}   - three (3D graphics)${NC}"
    echo -e "${GREEN}   - @react-three/fiber (React Three.js)${NC}"
    echo -e "${GREEN}   - @react-three/drei (Three.js helpers)${NC}"
else
    echo -e "${BLUE}ℹ️  Client dependencies already installed${NC}"
fi

cd ..

# Seed database
echo ""
echo -e "${PURPLE}🌱 Step 3: Seeding database...${NC}"
cd server
if npm run seed > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database seeded with 12 products${NC}"
else
    echo -e "${YELLOW}⚠️  Database seeding failed or already seeded${NC}"
fi

cd ..

# Final instructions
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${PURPLE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 To start the application:${NC}"
echo -e "${PURPLE}═══════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Terminal 1 - Backend API:${NC}"
echo "   cd server && npm start"
echo ""
echo -e "${YELLOW}Terminal 2 - Frontend (with animations):${NC}"
echo "   cd client && npm run dev"
echo ""
echo -e "${PURPLE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}🎨 Enhanced Features:${NC}"
echo -e "${PURPLE}═══════════════════════════════════════${NC}"
echo ""
echo "✨ Framer Motion animations on all components"
echo "🌐 Three.js 3D background (floating spheres)"
echo "🔍 Real-time product search"
echo "❤️  Wishlist functionality"
echo "📱 Smooth mobile menu animations"
echo "👀 Scroll-triggered animations"
echo "🎯 Interactive hover effects"
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo "   - QUICK_START.md      - Getting started guide"
echo "   - ANIMATION_FEATURES.md - Animation details"
echo "   - ENHANCEMENTS_SUMMARY.md - What's new"
echo ""
echo -e "${GREEN}Open http://localhost:5173 after starting both servers!${NC}"
echo ""
