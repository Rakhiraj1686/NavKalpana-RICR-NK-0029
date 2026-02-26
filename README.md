# 🏋️ HealthUP (FitAI) – Adaptive Fitness Intelligence Platform

---

## 📌 Overview

**HealthUP** is an AI‑powered adaptive fitness intelligence platform designed to provide personalized workout plans, diet recommendations, habit tracking, and AI coaching. The system continuously adapts based on user progress, health metrics, fatigue levels, and behavioral patterns.

### Adaptive Loop Model

**Profile → Plan → Execute → Track → Analyze → Adjust → Coach → Repeat**

This closed‑loop system helps users build sustainable fitness habits rather than relying on static fitness templates.

---

## 🎯 Project Vision

* Promote sustainable fitness habits
* Provide structured health guidance without a personal trainer
* Use AI for intelligent coaching and adaptation
* Enable long‑term health tracking and transformation

---

## 👥 Team Members & Roles

| Name                 | Role                               |
| -------------------- | ---------------------------------- |
| **Rakhi Rani**       | Full Stack Developer (Team Leader) |
| **Nitish Kumar**     | Full Stack Developer               |
| **Neha Khatun**      | Frontend Developer                 |
| **Md. Musharaf Ali** | Frontend Developer                  |

---

## 🧩 Problem Statement

Most fitness apps provide static workout and diet templates that fail to adapt to individual progress, fatigue, or adherence levels. This often leads to inconsistent results, reduced motivation, and lack of structured guidance.

**HealthUP addresses this by:**

* Personalized adaptive workout & diet plans
* Progress monitoring and analytics
* Habit intelligence scoring
* AI coaching assistance
* Dynamic plan adjustment for safety and sustainability

---

## 🏗️ System Architecture

### Frontend Layer

* User interface & visualization
* Dashboard & analytics
* AI chat interface

### Backend Layer

* REST API services
* Authentication & security
* Adaptive fitness logic
* AI integration

### Database Layer

* User profiles
* Fitness logs
* Plans & analytics

---

## ⚙️ Tech Stack

### 🖥️ Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion
* React Hot Toast
* React Icons

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt Password Hashing
* Cloudinary Media Storage
*
* Nodemailer Email Integration
* Groq SDK (AI Chat)
* CORS & Cookie Parser
* Morgan Logger
* dotenv Environment Config
* UUID

---

## ✨ Core Features

### 🔐 Authentication & Security

* Secure login/signup
* JWT session handling
* Password encryption

### 🧠 Adaptive Fitness Planning

* Personalized workout plans
* AI diet planning
* Calorie and BMI calculations

### 📊 Progress Tracking

* Weight tracking
* Workout adherence tracking
* Diet adherence tracking
* Body measurements monitoring

### 🔄 Habit Intelligence Engine

* Habit score calculation
* Drop‑off detection
* Motivation prompts

### ⚡ Recovery Intelligence

* Fatigue tracking
* Adaptive training adjustments
* Recovery suggestions

### 🤖 AI Fitness Assistant

* Interactive fitness chatbot
* Coaching suggestions
* Data‑driven recommendations

### 📈 Analytics Dashboard

* Goal forecasting
* Trend visualization
* Habit analytics

---

## 🧑‍💻 Installation Guide

### 1️⃣ Clone Repository

```bash
git clone <https://github.com/Rakhiraj1686/NavKalpana-RICR-NK-0029>
cd HealthUP
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_KEY=
EMAIL_CONFIG=
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Overview

### Authentication APIs

* POST `/auth/register`
* POST `/auth/login`
* GET `/auth/profile`

### Fitness Plan APIs

* POST `/plan/create`
* GET `/plan/user`

### Progress Tracking APIs

* POST `/progress/add`
* GET `/progress/history`

### AI Chat API

* POST `/chat/message`

*(Endpoints may vary depending on deployment.)*

---

## 📸 Screenshots

Add screenshots here:

### Dashboard
![Dashboard](./public/UserProfileDashboard.png)

### AI Chat
![AI Chat](./public/AIChatInterface1.png)
![AI Chat](./public/AIChatInterface2.png)

### Workout Plan Page
![Workout Plan](./public/UserWorkoutPlan.png)

### Diet Plan Page
![Diet Plan](./public/UserDietPlan.png)

### Analytics Graphs

![Analytics](./public/UserAnalytics
.png)

---

## 🚀 Deployment (Recommended)

### Frontend

* Vercel / Netlify

### Backend

* Render / Railway / AWS / Azure

### Database

* MongoDB Atlas

---

## 🔮 Future Improvements

* Advanced AI health monitoring
* Wearable device integration
* Mobile app version
* Smarter nutrition insights
* Automated coaching recommendations
* Advanced analytics dashboard

---

## 🤝 Contribution Guidelines

* We used meaningful commit messages
* Followed clean code practices
* Maintain modular structure
* Update documentation when needed

---

## 📜 License

This project is developed for educational, research, and hackathon purposes.

---

## ❤️ Acknowledgement

HealthUP aims to become a complete AI fitness companion combining adaptive intelligence, behavioral analytics, and personalized coaching to help users achieve sustainable health goals.
