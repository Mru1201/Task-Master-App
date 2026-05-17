from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
from datetime import datetime
from sqlalchemy import ForeignKey

class User(Base):
	__tablename__ = "users"
	
	id = Column(Integer, primary_key=True, index=True)
	username = Column(String, unique=True, index=True)
	password = Column(String)

class Task(Base):
	__tablename__ = "tasks"

	id = Column(Integer, primary_key=True, index=True)
	title = Column(String, index=True)
	description = Column(String, nullable=True)
	completed = Column(Boolean, default=False)
	created_at = Column(DateTime, default=datetime.utcnow)
	
	user_id = Column(Integer, ForeignKey("users.id"))
