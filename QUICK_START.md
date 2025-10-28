# 🚀 Quick Start Guide

## Setup (First Time)

```bash
# Option 1: Automated setup (recommended)
./setup.sh

# Option 2: Manual setup
cd backend && npm install
cd ../frontend && npm install
```

## Development

```bash
# Start both backend and frontend
npm run dev

# Or start separately:
cd backend && npm run start:dev    # Backend only
cd frontend && npm run dev         # Frontend only
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs

## Environment Setup

### Backend (.env)
```env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=reporter
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_email_key
```

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:3000
```

## Common Commands

```bash
# Install packages
npm run install:all              # All projects
cd backend && npm install       # Backend only
cd frontend && npm install      # Frontend only

# Development
npm run dev                      # Both
npm run dev:backend             # Backend
npm run dev:frontend            # Frontend

# Build
npm run build                    # Both
npm run build:backend           # Backend
npm run build:frontend          # Frontend

# Format code
npm run format                   # Both
```

## Database Setup

```sql
-- Create database
CREATE DATABASE reporter;

-- The app will auto-create tables on first run
```

## Troubleshooting

```bash
# Port in use
lsof -ti:3000 | xargs kill -9   # Backend
lsof -ti:5173 | xargs kill -9   # Frontend

# Reinstall dependencies
rm -rf backend/node_modules frontend/node_modules
npm run install:all
```

## Project Structure

```
reporter/
├── backend/        # NestJS API
├── frontend/       # React App
├── package.json    # Root scripts
└── setup.sh        # Setup script
```

## Features Available

✅ Login / Register / Email Verification
✅ User Profile (view & edit)
✅ Protected Routes
✅ Toast Notifications
✅ Error Handling
✅ JWT Authentication
✅ Password Security (never exposed)
✅ API Documentation (Swagger)

## Support

- API Docs: http://localhost:3000/api/docs
- Full Documentation: See README.md
- Implementation Details: See IMPLEMENTATION_SUMMARY.md
