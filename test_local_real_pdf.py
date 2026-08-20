from fastapi.testclient import TestClient
from app.main import app
import os

client = TestClient(app)

response = client.post("/api/upload/", files={"file": ("utility_april_2024.pdf", open("temp_uploads/utility_april_2024.pdf", "rb"), "application/pdf")})
print(response.json())
