import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# .env file-la irukka passwords-a load pannum
load_dotenv()

# .env-la irundhu namma url-a edukkurom
SQLALCHEMY_DATABASE_URL = os.getenv("SUPABASE_DB_URL")

# Engine: Idhu dhan namma app-kum Database-kum irukka paalam (bridge)
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Session: Database kooda pesa idhu thevai
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: Namma uruvakka pora tables ellam idha base panni dhan irukkum
Base = declarative_base()

# Idhu oru helper function (Database connection-a open panni close panna)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()