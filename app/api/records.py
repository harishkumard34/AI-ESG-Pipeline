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

from pydantic import BaseModel

class StatusUpdate(BaseModel):
    status: str

@router.get("/records/")
async def get_records(db: Session = Depends(get_db)):
    records = db.query(NormalizedRecord).all()
    return {"status": "success", "data": records}

@router.put("/records/{record_id}")
async def update_record_status(record_id: int, status_update: StatusUpdate, db: Session = Depends(get_db)):
    record = db.query(NormalizedRecord).filter(NormalizedRecord.id == record_id).first()
    if not record:
        return {"status": "error", "message": "Record not found"}
    
    record.auditor_status = status_update.status
    db.commit()
    db.refresh(record)
    return {"status": "success", "message": f"Record marked as {status_update.status}"}
