# Task UI — React Frontend

A responsive frontend application for the Task Management system, built using React. This client interacts with a FastAPI backend to provide authentication and user-specific task management.

---

## 📌 Overview

This frontend allows users to:

- 🔐 Log in using credentials
- ➕ Create new tasks
- 📋 View their tasks
- 🔄 Interact with a secure backend API using JWT authentication

---

## 🏗️ Architecture

React (Vercel)       ↓ FastAPI Backend (Render)       ↓ PostgreSQL Database

---

## 🚀 Features

- 🔐 User login with JWT authentication
- 📡 API integration with FastAPI backend
- ➕ Create tasks
- 📋 Fetch and display user-specific tasks
- ⚡ Fast and responsive UI
- 🌐 Deployed on Vercel

---

## 🧰 Tech Stack

- React (Hooks)
- JavaScript (ES6+)
- Fetch API
- HTML / CSS

---

## 🔐 Authentication Flow

1. User enters credentials
2. Frontend sends login request
3. Backend returns JWT token
4. Token is stored in application state
5. Token is sent in headers for protected API calls:

Authorization: Bearer <token>

---

## 📡 API Integration

The frontend communicates with the backend via:

https://your-api.onrender.com

Make sure to update the API URL in:

src/App.js

---

## ⚙️ Environment Configuration

(Optional improvement)

You can store API URL in a .env file:

REACT_APP_API_URL=https://your-api.onrender.com

Then use:

javascript const API = process.env.REACT_APP_API_URL; 

---

## 🧪 Local Development

### Install dependencies

npm install

### Run development server

npm start

### Open in browser

http://localhost:3000

---

## 🌍 Deployment

The frontend is deployed on Vercel:

- Live App: https://your-app.vercel.app

---

## 📁 Project Structure

task-ui/ │ ├── src/ │   ├── App.js        # Main UI logic │   └── index.js      # Entry point │ ├── public/ ├── package.json └── README.md

---

## 🧠 Key Concepts Demonstrated

- React functional components and hooks
- API integration using Fetch
- Handling authentication tokens
- State management in React
- Frontend-backend communication

---

## 🚧 Future Improvements

- Persistent login (localStorage)
- Signup page
- Better UI (Tailwind / Material UI)
- Error handling and validation
- Loading states
- Task editing and deletion UI

---

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/your-username

---

## 📜 License

This project is for educational and portfolio purpos
