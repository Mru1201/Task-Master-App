import os
from database import engine
from models import Base
from fastapi import FastAPI, Depends, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Task as TaskModel
from pydantic import BaseModel
from passlib.context import CryptContext
from models import User as UserModel
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

security = HTTPBearer()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
ALGORITHM = "HS256"

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_methods=["*"],
	allow_headers=["*"],
	allow_credentials=True,
)

tasks = []

def hash_password(password: str):
	return pwd_context.hash(password[:72])

def verify_password(plain, hashed):
	return pwd_context.verify(plain,hashed)

def create_token(data: dict):
	to_encode = data.copy()
	expire = datetime.utcnow() + timedelta(hours=1)
	to_encode.update({"exp": expire})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

class UserCreate(BaseModel):
	username: str
	password: str


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials  # 👈 this extracts the token automatically

    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    return payload["user_id"]	

class Task(BaseModel):
	title: str
	description: str | None = None

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

@app.on_event("startup")
def startup():
	import models 
	models.Base.metadata.create_all(bind=engine)

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

	hashed_password = hash_password(user.password)

	db_user = UserModel(
		username=user.username,
		password=hashed_password
	)
	db.add(db_user)
	db.commit()

	return {"message": "User created"}
@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):

	db_user = db.query(UserModel).filter(
		UserModel.username == user.username
	).first()

	if not db_user:
		return {"error": "User not found"}

	if not verify_password(user.password, db_user.password):
		return {"error": "Wrong password"}

	token = create_token({"user_id": db_user.id})
	
	return {"acess_token": token}

@app.post("/tasks")
def create_task(task:Task, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
	db_task = TaskModel(
		title=task.title,
		description=task.description,
		user_id=user_id
	)

	db.add(db_task)
	db.commit()
	db.refresh(db_task)
	return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):

    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Deleted"}

@app.put("/tasks/{task_id}")

def mark_complete(task_id: int, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
	
	task = db.query(TaskModel).filter(TaskModel.id == task_id, TaskModel.user_id == user_id).first()
	
	if not task:
		return {"error": "Task not found or not yours"}

	task.completed = True 
	db.commit()
 
	return task
"""
def update_task(task_id: int, updated_task: Task, db: Session = Depends(get_db)):

    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:

        return {"error": "Task not found"}

    task.title = updated_task.title

    db.commit()

    return task
"""
@app.get("/")

def home():

    return {"message": "Task API Running"}

"""
def get_tasks(completed: bool = None, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
   	
	query = db.query(TaskModel)

	if completed is not None:
		query = query.filter(TaskModel.completed == completed)

	return query.all()
"""

@app.get("/tasks")
def get_tasks(
	user_id: int = Depends(get_current_user),
	db: Session = Depends(get_db)
):
	return db.query(TaskModel).filter( 
		TaskModel.user_id == user_id
	).all()

