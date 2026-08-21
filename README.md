# Wayfarer — Frontend (React + Vite)

A React single-page app for browsing and booking guided tours, built to pair with the `tour-app-backend` API.

## Features
- Home page with hero search and featured tours
- Tour listing with keyword/destination/difficulty filters, sorting, pagination
- Tour detail page with booking panel and reviews
- Auth: register/login (JWT stored in localStorage), protected routes
- "My Bookings" page for travelers (view/cancel)
- Admin dashboard: create/edit/delete tours, manage all bookings
- Distinctive "expedition journal / boarding pass" visual theme

## Tech Stack
React 18, React Router v6, Axios, Vite

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set `VITE_API_URL` to point at your backend (default `http://localhost:5000/api`).

### 3. Run the dev server
```bash
npm run dev
```
The app runs at `http://localhost:5173` by default. Make sure the backend server is running as well.

### 4. Build for production
```bash
npm run build
npm run preview
```

## Project Structure
```
tour-app-frontend/
├── public/
├── src/
│   ├── api/axios.js         # Axios instance w/ auth interceptor
│   ├── components/          # Navbar, Footer, TourCard, PrivateRoute
│   ├── context/AuthContext.jsx
│   ├── pages/                # Home, Tours, TourDetail, Login, Register,
│   │                          #   MyBookings, AdminDashboard, NotFound
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Design tokens & global styles
├── index.html
└── vite.config.js
```

## Notes
- Login as the seeded admin (`admin@tourapp.com` / `admin1234`, after running `npm run seed` in the backend) to access `/admin`.
- All API calls go through `src/api/axios.js`, which automatically attaches the JWT from `localStorage`.
