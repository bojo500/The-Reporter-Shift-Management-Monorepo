# Reporter - Shift Management System

A full-stack application for managing shifts, reports, and user accounts.

## 📁 Project Structure

```
reporter/
├── backend/           # NestJS backend API
├── frontend/          # React + Vite frontend
├── package.json       # Root package.json for monorepo scripts
└── docker-compose.yml # Docker configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MySQL database

### Installation

#### Option 1: Install All at Once
```bash
npm run install:all
```

#### Option 2: Install Separately
```bash
# Install root dependencies (optional)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

#### Backend Environment Variables
Create `backend/.env`:
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=reporter

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Application
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

#### Frontend Environment Variables
Create `frontend/.env`:
```env
VITE_API_BASE=http://localhost:3000
```

## 🏃 Running the Application

### Development Mode

#### Run Both Backend and Frontend
```bash
npm run dev
```

#### Run Backend Only
```bash
npm run dev:backend
# or
cd backend && npm run start:dev
```

#### Run Frontend Only
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

### Production Mode

#### Build Both
```bash
npm run build
```

#### Build Backend
```bash
npm run build:backend
```

#### Build Frontend
```bash
npm run build:frontend
```

#### Start Production Server
```bash
# Backend
npm run start:backend

# Frontend
npm run start:frontend
```

## 📚 API Documentation

Once the backend is running, access Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🏗️ Technology Stack

### Backend
- **Framework**: NestJS 11
- **Database**: MySQL + TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator, class-transformer
- **Email**: Resend
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Forms**: React Hook Form

## 📂 Key Features

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Password hashing with bcrypt
- ✅ Automatic token refresh

### User Management
- ✅ User profile view and edit
- ✅ CRUD operations for users
- ✅ Password exclusion from API responses
- ✅ Input validation and sanitization

### Error Handling
- ✅ Global exception filter
- ✅ Custom error responses
- ✅ Toast notifications (success, error, warning, info)
- ✅ Form validation

### Security
- ✅ Password never exposed in API responses
- ✅ CORS configuration
- ✅ Input validation and whitelisting
- ✅ SQL injection prevention
- ✅ XSS prevention

## 🛠️ Development Scripts

### Root Level
```bash
npm run dev              # Run both backend and frontend
npm run build            # Build both projects
npm run format           # Format code in both projects
```

### Backend
```bash
npm run start:dev        # Development mode with hot reload
npm run build            # Build for production
npm run start:prod       # Run production build
npm run format           # Format code with Prettier
npm run lint             # Lint code with ESLint
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:cov         # Run tests with coverage
```

### Frontend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run format           # Format code with Prettier
```

## 🗄️ Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE reporter;
```

2. The application will automatically create tables on first run using TypeORM synchronization.

3. **Production Note**: Set `synchronize: false` in TypeORM config and use migrations.

## 📋 Available Endpoints

### Auth
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/verify-email` - Email verification

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Reports
- `POST /reports/:shiftId` - Create report
- `GET /reports/:shiftId` - Get reports by shift

### Shifts
- `POST /shifts` - Create shift
- `GET /shifts` - Get all shifts

### CCS
- `POST /ccs` - Create CCS record
- `GET /ccs` - Get all CCS records
- `GET /ccs/:id` - Get CCS by ID

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use strong JWT secrets** - Generate with `openssl rand -base64 32`
3. **Change default passwords** - Especially for production
4. **Enable HTTPS** - In production environments
5. **Regular updates** - Keep dependencies up to date

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (port 3000)
lsof -ti:3000 | xargs kill -9

# Frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Issues
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf backend/node_modules frontend/node_modules
npm run install:all
```

## 📝 License

This project is private and unlicensed.

## 👥 Authors

- Mohamed Khaled

## 📞 Support

For issues and questions, please open an issue in the repository.
