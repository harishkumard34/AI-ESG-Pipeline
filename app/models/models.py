from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, JSON
from datetime import datetime
from app.models.database import Base

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    role = Column(String) # 'admin' or 'analyst'

class DataSource(Base):
    __tablename__ = "data_sources"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    status = Column(String, default="Processing") # 'Processing' or 'Completed'

class RawRecord(Base):
    __tablename__ = "raw_records"
    id = Column(Integer, primary_key=True, index=True)
    data = Column(JSON) # JSON format-la raw data save aagum

class NormalizedRecord(Base):
    __tablename__ = "normalized_records"
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    category = Column(String)
    amount = Column(Float)
    unit = Column(String)
    date = Column(String)
    is_suspicious = Column(Boolean, default=False)
    ai_reasoning = Column(String, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    action = Column(String) # 'Approved' or 'Rejected'
    timestamp = Column(DateTime, default=datetime.utcnow)