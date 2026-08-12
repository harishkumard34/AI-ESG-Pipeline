from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import os
import shutil
import json
from sqlalchemy.orm import Session
from app.agents.graph import app_graph
from app.models.database import SessionLocal
from app.models.models import NormalizedRecord, DataSource, Company

router = APIRouter()

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# DB connection-kaga oru chinna function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    allowed_extensions = [".pdf", ".xlsx", ".xls"]
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PDF and Excel files are allowed!")

    # 1. Ensure a dummy company exists for our testing (Fix for Foreign Key error)
    company = db.query(Company).filter(Company.id == 1).first()
    if not company:
        company = Company(id=1, name="Demo Company")
        db.add(company)
        db.commit()

    # 2. File-a Save panrom
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 3. Database-la "File vandhurukku, Processing-la irukku" nu record panrom
    new_source = DataSource(filename=file.filename, status="Processing")
    db.add(new_source)
    db.commit()

    # 4. AI Pipeline Trigger panrom
    print(f"Starting AI processing for {file.filename}...")
    initial_state = {"file_path": file_path, "extracted_data": ""}
    final_state = app_graph.invoke(initial_state)
    ai_output = final_state["extracted_data"]

    import re
    # 5. Clean JSON string (LLMs can be chatty, grab the LAST json block)
    json_blocks = re.findall(r'```json\s*(.*?)\s*```', ai_output, re.DOTALL)
    if json_blocks:
        ai_output_clean = json_blocks[-1]
    else:
        start_idx = ai_output.find('[')  # FIRST bracket
        end_idx = ai_output.rfind(']')   # LAST bracket
        if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
            ai_output_clean = ai_output[start_idx:end_idx+1]
        else:
            ai_output_clean = "[]"
    
    try:
        data_list = json.loads(ai_output_clean)
        
        # 6. Database-kulla ovvoru row a save panrom
        for row in data_list:
            is_invalid = row.get("status") == "Invalid"
            reason = row.get("error_reason", "")
            amt = row.get("amount", 0.0)
            
            record = NormalizedRecord(
                company_id=1, 
                category=row.get("category", "Unknown"),
                amount=float(amt) if amt != "" and amt is not None else 0.0,
                unit=row.get("unit", ""),
                date=row.get("date", ""),
                is_suspicious=is_invalid,
                ai_reasoning=reason
            )
            db.add(record)
        
        # Vela mudinjiduchu nu Database-la update panrom
        new_source.status = "Completed"
        db.commit()

        return {
            "status": "success",
            "message": f"Successfully processed and saved {len(data_list)} records to the Database!",
            "data": data_list
        }
        
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": "Failed to save to database", "details": str(e), "raw_ai": ai_output, "clean_ai": ai_output_clean}