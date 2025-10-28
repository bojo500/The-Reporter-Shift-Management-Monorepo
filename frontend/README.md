# Reporter Frontend (Vite + React + TypeScript + Tailwind)

## Features
- Vite + React + TypeScript
- TailwindCSS for styling
- JWT stored in localStorage
- Single Login page for all roles
- Role-based protected routes (Super Admin, User)
- Axios instance configured to `VITE_API_BASE` (defaults to http://localhost:3000)

## Quick start
1. `npm install`
2. Create `.env` with `VITE_API_BASE=http://localhost:3000`
3. `npm run dev` and open http://localhost:5173

The backend should expose:
- `POST /auth/login` that returns `{ access_token: string }` (or `token`)
- `GET /auth/me` that returns `{ email: string, role: 'super_admin' | 'user' }`
