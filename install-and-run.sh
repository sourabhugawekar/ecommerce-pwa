#!/bin/bash

echo "🚀 BabyBliss - Complete Setup Script"
echo "===================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Install Server Dependencies
echo -e "\n${BLUE}📦 Installing server dependencies...${NC}"
cd server
npm install
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Server dependencies installation failed. Continuing...${NC}"
fi
cd ..

# Install Client Dependencies
echo -e "\n${BLUE}📦 Installing client dependencies...${NC}"
cd client
npm install
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Client dependencies installation failed. Continuing...${NC}"
fi
cd ..

echo -e "\n${GREEN}✅ Installation complete!${NC}"

# Provide instructions
echo -e "\n${BLUE}📝 Next Steps:${NC}"
echo "1. Start MongoDB (if not running): mongod"
echo "2. Seed the database: cd server && npm run seed"
echo "3. Start the server: cd server && npm start"
echo "4. In a new terminal, start the client: cd client && npm run dev"
echo -e "\nOr use the convenience script: ${GREEN}./start.sh${NC}"

