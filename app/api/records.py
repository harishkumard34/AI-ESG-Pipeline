from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import NormalizedRecord

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/records/")
async def get_records(db: Session = Depends(get_db)):
    records = db.query(NormalizedRecord).all()
    return {"status": "success", "data": records}
