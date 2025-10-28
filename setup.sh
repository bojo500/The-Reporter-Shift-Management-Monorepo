#!/bin/bash

echo "🚀 Setting up Reporter Application..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v18 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"

# Check npm
echo -e "${YELLOW}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v) found${NC}"
echo ""

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Check for .env files
echo -e "${YELLOW}Checking environment files...${NC}"
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
    echo -e "${YELLOW}Creating template backend/.env file...${NC}"
    cat > backend/.env << EOL
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=reporter

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Application
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EOL
    echo -e "${GREEN}✅ Template backend/.env created${NC}"
    echo -e "${RED}⚠️  Please update backend/.env with your actual values!${NC}"
else
    echo -e "${GREEN}✅ backend/.env exists${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env not found${NC}"
    echo -e "${YELLOW}Creating template frontend/.env file...${NC}"
    cat > frontend/.env << EOL
VITE_API_BASE=http://localhost:3000
EOL
    echo -e "${GREEN}✅ Template frontend/.env created${NC}"
else
    echo -e "${GREEN}✅ frontend/.env exists${NC}"
fi
echo ""

echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update backend/.env with your database credentials"
echo "2. Create the MySQL database: CREATE DATABASE reporter;"
echo "3. Start the application:"
echo "   - npm run dev (both backend and frontend)"
echo "   - or cd backend && npm run start:dev (backend only)"
echo "   - or cd frontend && npm run dev (frontend only)"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
