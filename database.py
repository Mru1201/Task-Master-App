import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tasks.db")

# Only add check_same_thread if we are using SQLite
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
	DATABASE_URL, pool_pre_ping=True, connect_args=connect_args
)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()
