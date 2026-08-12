from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.database import engine
from app.models import models
from app.api import upload
from app.api import chat
from app.api import records

# Idhu dhan tables-a Supabase-la create pannum
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI ESG Pipeline API")

# CORS Setup - Frontend connect panna thevai
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "success", "message": "ESG Backend is running!"}

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(chat.router, prefix="/api", tags=["Chatbot"])
app.include_router(records.router, prefix="/api", tags=["Records"])
