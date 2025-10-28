# The Reporter Backend
A secure, production-ready NestJS backend for shift reporting and user management. It includes JWT authentication, role-based access control (RBAC), seeders for bootstrapping a Super Admin, and interactive API documentation via Swagger.

## User Stories
- Super Admin
  - As a Super Admin, I can sign in and manage system users so that I can control who accesses the platform.
  - As a Super Admin, I can assign roles (super_admin, user) so that permissions are enforced across the app.
  - As a Super Admin, I can view API docs and try endpoints securely using a JWT token.
- User
  - As a User, I can sign in and access my allowed resources so that I can submit and review my reports.
  - As a User, I can only access endpoints permitted by my role so that the system remains secure.

## Core Features
- Authentication: Email/username + password login returning a JWT access token.
- RBAC: Role enum (super_admin, user) and route protection using guards and decorators.
- Security: JWT strategy, guards, and best-practice NestJS structure.
- Seeding: Admin seeder to create an initial Super Admin for first-time setup.
- API Docs: Swagger at /api/docs with built-in JWT auth support.

## Getting Started
### Prerequisites
- Node.js 18+
- npm 9+
- Docker (optional) if using docker-compose

### Quick Start
1. Install dependencies
   - npm install
2. Copy environment template and configure
   - cp .env.example .env
   - Update values (see Environment section below)
3. Run the app (choose one)
   - npm run start:dev (local dev with watch)
   - npm run start (local prod-like)
   - docker-compose up --build (Docker)
4. Open
   - API base: http://localhost:3000
   - Swagger docs: http://localhost:3000/api/docs

## Environment Configuration
Create a .env file with the following keys (example values shown):
- PORT=3000
- JWT_SECRET=change_me
- JWT_EXPIRES_IN=1d
- DATABASE_URL=postgres://user:pass@localhost:5432/reporter
- NODE_ENV=development

Note: Match these keys with your actual configuration (ORM config, modules). If a .env.example is provided in the repo, use it as the source of truth.

## Seeding
A Super Admin seeder is available to bootstrap the system. Typical usage:
- npm run seed
This will create an initial Super Admin account (email and password defined in .env or seeder defaults). Check src/admin/admin.seeder.ts for details.

## API Overview
- Auth
  - POST /auth/login: Authenticate and receive a JWT.
- Documentation
  - GET /api/docs: Swagger UI with all endpoints. Use the Authorize button to paste your JWT.

Role-based endpoints will require the appropriate JWT and role claims. See Role enum in src/common/enums/role.enum.ts.

## Usage Flow (Guided)
1. Seed the Super Admin
   - Run the seeder to create the initial Super Admin.
2. Login as Super Admin
   - POST /auth/login with credentials to get access_token (JWT).
3. Authorize in Swagger
   - Open /api/docs, click Authorize, paste: Bearer <your_token>.
4. Manage Users and Settings
   - Use protected endpoints (visible in Swagger) to invite/manage users and set roles.
5. User Login and Reporting
   - Regular users login and access only allowed endpoints.

## cURL Examples
- Login
  - curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@example.com","password":"your_password"}'

- Authorized request example
  - curl http://localhost:3000/protected/resource \
    -H "Authorization: Bearer YOUR_JWT_TOKEN"

Adjust paths to actual resources exposed by your modules.

## Troubleshooting
- Swagger is not loading
  - Ensure the server is running and /api/docs is accessible. Check src/main.ts for SwaggerModule setup.
- 401 Unauthorized
  - Confirm you included the Authorization: Bearer <token> header and the token is not expired.
- Seeder did not create the Super Admin
  - Review src/admin/admin.seeder.ts and environment variables used by the seeder. Check database connectivity.
- Environment variables not picked up
  - Ensure .env exists and your configuration module loads it before other modules.

## Development Scripts
- npm run start:dev: Start in watch mode
- npm run test: Run unit tests
- npm run test:e2e: Run e2e tests
- npm run lint: Lint the codebase

## Support and Links
- Swagger Docs: http://localhost:3000/api/docs
- NestJS Docs: https://docs.nestjs.com
- Issue Tracker: create an issue in this repository
- Security: Report vulnerabilities via private issue or maintainers' contact

## License
MIT License