# HealthUP (FitAI) – Adaptive Fitness Intelligence Platform

HealthUP is an AI-powered adaptive fitness platform that combines workout planning, diet guidance, progress tracking, analytics, and chatbot support in a single full-stack application. It is built to move beyond static fitness templates by adjusting recommendations from user activity, progress history, and AI-driven coaching logic.

## Overview

The application is organized around a continuous fitness loop:

Profile -> Plan -> Execute -> Track -> Analyze -> Adjust -> Coach -> Repeat

That loop is implemented through a React frontend, an Express/MongoDB backend, and AI services for plan generation, chat assistance, and adaptive recommendations.

## Current Working Scope

The project currently includes:

* Public pages for Home, About, Contact, Login, and Signup.
* A protected user dashboard with overview, plan, progression, analytics, progress, profile, goal, and support views.
* AI chat for logged-in users and a separate guest chat flow with limits.
* Workout and diet plan generation through backend AI endpoints.
* Progress logging for weight, workouts, and daily check-ins.
* Goal tracking, streak tracking, badges, dashboards, reports, and analytics.
* Premium coaching endpoints for macro customization, meal swaps, meal adjustments, and recovery insights.
* Ticket creation and ticket listing for support workflows.
* Email-based OTP and password recovery flow.
* Cloudinary-backed image upload for profile photos.
* Weekly plan adjustment scheduler on the backend.

## Contributors

| Name | Role |
| --- | --- |
| Rakhi Rani | Full Stack Developer |
| Nitish Kumar | Full Stack Developer |

## What the App Does

HealthUP helps a user:

* register and log in securely,
* manage a personal fitness profile and goal,
* generate or regenerate workout and diet plans,
* chat with an AI fitness assistant,
* log progress and review analytics,
* receive premium coaching style adjustments,
* track monthly fitness reports and habit trends,
* raise support tickets when needed.

The backend is built to adapt based on user progress rather than only storing static plan data.

## Architecture

### Frontend

The frontend is a Vite + React application. It handles routing, dashboard navigation, toast notifications, AI chat entry points, and the user experience for plan/progress pages.

### Backend

The backend is an Express server that exposes authentication, user management, progress tracking, AI generation, contact, and ticket routes. It also connects to MongoDB, Cloudinary, and email services.

### Data Layer

MongoDB stores users, goals, plans, progress records, streaks, badges, tickets, chat history, and related fitness data.

## Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion
* Recharts
* React Hot Toast
* React Icons
* lucide-react

### Backend

* Node.js
* Express
* MongoDB with Mongoose
* JWT authentication
* bcrypt
* Cloudinary
* Nodemailer
* Groq SDK
* multer
* cookie-parser
* cors
* morgan
* pdfkit

## Frontend Routes

The current React routes are:

* / - Home
* /about - About page
* /contact - Contact page
* /login - Login page
* /signup - Signup page
* /user-dashboard - Protected dashboard
* /user-dashboard/ai-chat - AI chat view

The dashboard contains sections for overview, plan, progression, analytics, progress, profile, goal, and support. A floating button opens the AI chat screen.

## Backend Routes

### Public Routes

Mounted at /public:

* POST /public/contactMessage
* POST /public/ai-chat

### Authentication Routes

Mounted at /auth:

* POST /auth/login
* POST /auth/register
* GET /auth/logout
* POST /auth/genOtp
* POST /auth/verifyOtp
* POST /auth/forgetPassword

### User Routes

Mounted at /user:

* PATCH /user/resetPassword
* PATCH /user/updateProfile
* PATCH /user/changePhoto
* PUT /user/setGoal
* PUT /user/completeGoal
* GET /user/goal
* POST /user/chat
* POST /user/premium/chat
* POST /user/regenerate-plan
* POST /user/generatePlan
* POST /user/plan/evaluate
* POST /user/premium/coaching-layer
* POST /user/premium/macros
* POST /user/premium/meal-swap
* POST /user/premium/meal-adjustments
* POST /user/premium/recovery-insights
* POST /user/progress
* GET /user/progress-graph
* GET /user/mytickets

### Progress Routes

Mounted at /api/v1/progress:

* POST /api/v1/progress/weight
* POST /api/v1/progress/workouts
* POST /api/v1/progress/checkin
* GET /api/v1/progress/timeline/weight
* GET /api/v1/progress/streak
* GET /api/v1/progress/goal-progress
* GET /api/v1/progress/insights/latest
* GET /api/v1/progress/analytics/weekly
* GET /api/v1/progress/analytics/monthly
* GET /api/v1/progress/analytics/advanced
* GET /api/v1/progress/plan/progression
* GET /api/v1/progress/plan/week/:week
* GET /api/v1/progress/badges
* GET /api/v1/progress/dashboard
* GET /api/v1/progress/report/monthly
* GET /api/v1/progress/report/monthly/pdf
* GET /api/v1/progress/overview-graph

### AI Routes

Mounted at /api/ai:

* POST /api/ai/diet
* POST /api/ai/workout

### Ticket Routes

Mounted at /api/ticket:

* POST /api/ticket/createTicket
* GET /api/ticket/mytickets

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd NavKalpana-RICR-NK-0029
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a backend .env file with the required values:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GMAIL_USER=
GMAIL_PASSCODE=
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a frontend .env file:

```env
VITE_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Scripts

### Backend

* npm run dev - start the server with nodemon
* npm start - start the server with node

### Frontend

* npm run dev - start Vite dev server
* npm run build - create production build
* npm run lint - run ESLint
* npm run preview - preview the production build

## How It Works

1. A user opens the frontend and signs up or logs in.
2. The backend issues a secure session using JWT cookies.
3. The dashboard loads profile, goals, plan data, and progress analytics.
4. The user can log weight, workouts, and check-ins.
5. AI services generate or adjust workout and diet recommendations.
6. The app tracks streaks, badges, reports, and monthly analytics.
7. Support tickets and contact messages can be submitted when needed.
8. A weekly backend scheduler keeps plan adjustments active over time.

## Deployment Notes

The frontend is deployed on Vercel, backend on Render while MongoDB Atlas is used as the managed database.

## Future Improvements

* Mobile app version
* Smarter nutrition suggestions
* More advanced health monitoring
* Richer predictive analytics
* Automated coaching recommendations

## License

This project is intended for educational, research, and hackathon use.
