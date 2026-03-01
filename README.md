
# 🚀 Mentorly – AI-Powered Barter-Based Mentoring Platform

Mentorly is a full-stack AI-powered mentoring platform built on a barter-based learning ecosystem, where users can both teach and learn through structured 1:1 sessions. The platform supports unified role switching, AI-driven mentor discovery, real-time video call, and a gamified badge system to encourage active participation.

---
## 📌 Table of Contents

- [Features](#✨features-)
- [Tech Stack](#🛠tech-stack-)
- [Prerequisites](#📋prerequisites-)
- [Installation](#🚀installation-)
- [Configuration](#⚙️configuration-)
- [Usage](#💻usage-)
- [Project Structure](#📁project-structure-)
- [Queue & Badge Processing](#⌛-queue--badge-processing)
- [Contributing](#🤝contributing-)
- [Contact](#📧contact-)

---
## ✨ Features

- 🔄 **Unified Role Switching**  
  IUsers can seamlessly switch between Mentor and Learner roles without creating separate accounts.

- 🤝 **Barter-Based Learning Ecosystem**  
  Teach a skill to earn learning credits and use them to book sessions with other mentors.

- 🧠 **AI-Driven Mentor Discovery**  
  Intelligent mentor recommendations powered by AI based on:
  - Skills
  - Learning goals
  - Experience level
  - Session feedback

- 📅 **1:1 Session Management**  
  - Book mentoring sessions
  - Accept/Reject requests
  - Track session history
  - Leave structured feedback

- 🏅 **Gamified Badge System**  
 Achievement badges awarded based on:
  - Completed sessions
  - Positive feedback
  - Community participation

- 💬 **Real-Time Communication**  
  Live chat between mentors and learners for seamless coordination.
  
- 📊 Admin Dashboard
  - Manage users
  - Monitor sessions
  - View engagement metrics
  - Moderate platform activity

- 🔍  **Advanced Search**  
 Search mentors by:
  - Skill
  - Rating
  - Experience
  - Availability

---
## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit / Zustand
- Tailwind CSS
- ShadCN UI

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB (Mongoose)

### AI
- Google Gemini AI (mentor discovery & recommendations)

### Real-Time
- Socket.IO

### Queue System
- BullMQ
- Redis (Badge processing & async tasks)

### DevOps
- Docker
- Docker Compose

### Deployment
- Render / Vercel


 
## 🏗  Architecture Overview

The platform follows a modular MVC architecture:
 - Controllers → Handle API requests
 - Services → Business logic & AI integrations
 - Models → MongoDB schemas
 - Routes → API endpoints
 - Middleware → Auth & error handling
 - Queue Workers → Badge processing & async tasks

---
## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Openrouter API key

---

## 🚀 Installation

### Clone the repository
```
git clone https://github.com/viv756/mentorly.git
cd mentorly
```

### Install dependencies

#### Backend
```
cd server
npm install
```
#### Frontend
```
cd client
npm install
```


## ⚙️ Configuration
Create a .env file in both backend and frontend directories.

### Backend .env

```
PORT=8000
NODE_ENV=development

MONGO_URI=your_mongodb_url

JWT_ACCESS_SECRET=secret
JWT_REFRESH_SECRET=secret

FRONTEND_ORIGIN=http://localhost:5173

OPEN_ROUTER_API_KEY=openrouterkey

CLOUDINARY_CLOUD_NAME=cloudinary_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret

AGORA_APP_ID=agora_app_id
AGORA_APP_CERTIFICATE=agora_app_certificate

REDIS_URL=redis_url
```
### Frontend .env
```
VITE_API_BASE_URL=http://localhost:8000

```

---

## 💻 Usage
### Development
#### Start Backend
```
npm run dev
```
#### Start Frontend
```
npm run dev
```

---

---

## 🐳 Docker Support

Mentorly supports **Dockerized development and deployment**, making setup consistent and environment-independent.

### Prerequisites
- Docker
- Docker Compose

### Run the Project Using Docker

```bash
docker-compose up --build
```
This will start:

- Frontend (React)
- Backend (Node.js / Express)
- MongoDB

### Stop Containers
```
docker-compose down
```
```
| Service  | Description              | Port  |
| -------- | ------------------------ | ----- |
| frontend | React Application        | 5173  |
| backend  | Express API              | 8000  |
| mongodb  | MongoDB Database         | 27017 |
| redis    | Redis (BullMQ Queue)     | 6379  |
```

## 📁 Project Structure
```
mentorly/
├── backend/
│   ├── controllers/        # API controllers
│   ├── routes/             # Route definitions
│   ├── models/             # Mongoose schemas
│   ├── services/           # Business logic & AI logic
│   ├── middleware/         # Auth & error handling
│   ├── queues/             # BullMQ queue definitions
│   ├── workers/            # Queue workers (badge processing)
│   └── server.js           # Entry point
│
├── frontend/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-level components
│   ├── store/              # State management
│   ├── hooks/              # Custom hooks
│   └── main.jsx            # Entry point
│
├── docker-compose.yml
├── .env.example
└── README.md
```
---

🏅 **Queue & Badge Processing**

   - The platform uses BullMQ + Redis for asynchronous badge processing:
   - When a session is completed:
   - A job is added to the queue
   - Worker processes achievements
   - Badge is awarded if criteria is met
   - User is notified in real-time
   - This ensures:
   - Non-blocking API responses
   - Scalable background processing
   - Clean separation of concerns

---
     
   ## 🤝 Contributing
1. Fork the project
2. Create your feature branch

```
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```
git commit -m "Add AmazingFeature"
```
4. Push to the branch
```
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---
## 📧 Contact

Vivek

GitHub: https://github.com/viv756

Project Live Link:
👉 https://mentorly-u5qn.onrender.com/
