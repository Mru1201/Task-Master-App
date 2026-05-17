## Task Master Full-Stack App (Monorepo)

A production-ready, full-stack task management ecosystem utilizing a modular monorepo architecture. The project separates concerns into a high-performance Python backend API and a fast, responsive React user interface.

## System Architecture

This project is managed as a unified monorepo with distinct deployment targets:

```text
📁 Task-Master-App (Root)
│
├── 📁 task-api  ───> Deployed on Render (Python 3.12 / FastAPI / Docker)
│   ├── 📄 main.py
│   └── 📄 requirements.txt
│
└── 📁 task-ui   ───> Deployed on Vercel (React / Tailwind CSS / PostCSS)
    ├── 📄 package.json
    └── 📁 src/App.js

```

## Live Cloud Deployments

Backend Service: task-api on Render

Frontend Client: task-ui on Vercel

## Local Development Setup

Clone the repository to your machine before proceeding with the workspace guides:


git clone [https://github.com/Mru1201/Task-Master-App.git](https://github.com/Mru1201/Task-Master-App.git)

cd Task-Master-App

# 1. Backend Setup (task-api)
Navigate to the backend directory to isolate your Python workspace:

cd task-api

Create and activate a virtual environment:

python -m venv venv

On Windows:
.\venv\Scripts\activate

On macOS/Linux:
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run the development server:

uvicorn main:app --reload
The local API docs will be interactive at http://127.0.0.1:8000/docs.

# 2. Frontend Setup (task-ui)
Open a separate terminal window at the root directory and navigate to the frontend workspace:

cd task-ui

Install dependencies:

npm install

Run the React compilation server:

npm start
The client application will open automatically at http://localhost:3000.

## Environment Variable Settings

Backend: Local runtime configurations must be placed in task-api/.env. Production parameters are securely managed directly via the Render Dashboard environment panel.

Frontend: Build variables and production routing targets are handled through Vercel.

