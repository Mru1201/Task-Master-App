# Task API — FastAPI Backend

A production-ready backend service for a task management application, built using FastAPI, PostgreSQL, and JWT authentication. This API supports secure user authentication and user-specific task operations.

---

##  Overview

This project implements a RESTful API that allows users to:

- Register and authenticate securely
- Manage personal tasks (CRUD operations)
- Access only their own data via token-based authentication

The system is designed with scalability and production practices in mind, including containerization and cloud deployment.

---

## Architecture

```text
Client (React)         
            ↓ 
FastAPI Backend (Render)         
            ↓ 
PostgreSQL Database (Render)

```
---

##  Features

- 🔐 JWT-based Authentication
- 👤 User-specific data isolation
- 📋 Full CRUD operations on tasks
- 🐘 PostgreSQL integration (cloud-hosted)
- 🐳 Dockerized application
- 🌐 Deployed on Render
- ⚡ FastAPI automatic API documentation

---

## Tech Stack

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL
- Python 3.12

Authentication:
- python-jose (JWT)
- passlib (bcrypt)

DevOps:
- Docker
- Render (deployment)

---

## API Endpoints

```text
| Method | Endpoint     | Description                     |
|--------|--------------|---------------------------------|
| POST   | /signup      | Register a new user             |
| POST   | /login       | Authenticate user & get token   |
| GET    | /tasks       | Get all tasks (user-specific)   |
| POST   | /tasks       | Create a new task               |
| PUT    | /tasks/{id}  | Update an existing task         |
| DELETE | /tasks/{id}  | Delete a task                   |
```
---

## Authentication Flow

1. User registers via /signup
2. User logs in via /login
3. Server returns a JWT token
4. Client sends token in headers:

Authorization: Bearer <token>

5. Backend validates token and returns user-specific data

---

## Environment Variables

The following environment variables must be set

SECRET_KEY= your_secret_key 

DATABASE_URL= your_postgres_connection_string

---

## Docker Setup

### Build Image

docker build -t task-api .

### Run Container

docker run -p 8000:8000 task-api

---

##  Local Development

### Install dependencies

pip install -r requirements.txt

### Run server

uvicorn main:app --reload

### Access API Docs

http://localhost:8000/docs

---

## Deployment

The backend is deployed on Render:

- Hosted API: [https://your-api.onrender.com](https://task-api-46uc.onrender.com)
- Interactive Docs: [https://your-api.onrender.com/docs](https://task-api-46uc.onrender.com/docs)

---

## Concepts Demonstrated

- REST API design
- Token-based authentication (JWT)
- ORM usage with SQLAlchemy
- Secure password hashing
- Environment-based configuration
- Containerization with Docker
- Cloud deployment workflow

---

##  Improvements to be implemented

- Refresh token mechanism
- Role-based access control
- Pagination and filtering
- Unit and integration tests
- Logging and monitoring
- Rate limiting

---
