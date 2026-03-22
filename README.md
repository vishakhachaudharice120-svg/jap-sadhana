# Jap Sadhana

Jap Sadhana is a full-stack MERN mantra chanting tracker. Users can sign in, log daily jap counts for four mantras, review analytics, and admins can export Excel reports.

## Stack

- Frontend: React, Vite, React Router, Axios, Recharts, React Calendar, Tailwind CSS
- Backend: Node.js, Express, Passport, JWT
- Database: MongoDB with Mongoose
- Reports: ExcelJS

## Project Structure

- `frontend/` contains the React client
- `backend/` contains the Express API
- `TASKS.md` tracks build progress
- `JapSadhana.postman_collection.json` contains importable API requests

## Backend Setup

1. Open `jap-sadhana/backend`.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env`.
4. Fill in MongoDB, JWT, and Google OAuth values.
5. Start the backend with `npm start`.

## Frontend Setup

1. Open `jap-sadhana/frontend`.
2. Install dependencies with `npm install`.
3. Optionally create a `.env` file with `VITE_API_BASE_URL=http://localhost:5000`.
4. Start the frontend with `npm run dev`.

## Available Routes

- Frontend
- `/login`
- `/chants`
- `/analytics`
- `/reports`

- API
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/me`
- `POST /api/chants`
- `GET /api/chants`
- `GET /api/chants/date/:date`
- `GET /api/analytics/summary`
- `GET /api/analytics/monthly`
- `GET /api/reports/summary`
- `GET /api/reports/download`

## Notes

- Production startup validates required backend environment variables before the server boots.
- The admin report endpoint currently supports Excel downloads.
