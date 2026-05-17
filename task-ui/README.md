# Task UI — React Frontend

A responsive frontend application for the Task Management system, built using React and Tailwind CSS. This client interacts with a FastAPI backend to provide authentication and user-specific task management.

---

## Overview

This frontend allows users to:

- 🔐 Log in using credentials
- ➕ Create new tasks
- 📋 View their tasks
- 🔄 Update tasks
- 🔄 Interact with a secure backend API using JWT authentication

---

## Architecture

React (Vercel)       
              ↓ 
FastAPI Backend (Render)       
              ↓ 
PostgreSQL Database (Render)

---

## Tech Stack & Dependencies

- UI Framework: React (Functional components + Hooks)
- Styling engine: Tailwind CSS (Utility-first responsive design)
- HTTP Client: Axios (Interceptors ready for seamless token injection)
- Authentication Standard: OAuth2Bearer + JWT 

---

## Authentication Flow

1. User enters credentials
2. Frontend sends login request
3. Backend returns JWT token
4. Token is stored in application state
5. Token is sent in headers for protected API calls:

Authorization: Bearer <token>

---

## For Local Development

### Install dependencies

npm install

### Run development server

npm start

### Open in browser

http://localhost:3000

---

## To access Deployment

The frontend is deployed on Vercel:

- Live App: [https://your-app.vercel.app](https://task-api-ecru.vercel.app/)

---



## 🧠 Key Concepts Demonstrated

- React functional components and hooks
- Tailwind UI integration
- API integration using Fetch
- Handling authentication tokens
- State management in React
- Frontend-backend communication

---

##  Future Improvements :
- Please suggest improvements here  :)

