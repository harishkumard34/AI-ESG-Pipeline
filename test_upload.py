from fastapi.testclient import TestClient
from app.main import app
import os

client = TestClient(app)

# Create a dummy PDF
with open("test.pdf", "wb") as f:
    f.write(b"%PDF-1.4 dummy pdf content")

response = client.post("/api/upload/", files={"file": ("test.pdf", open("test.pdf", "rb"), "application/pdf")})
print(response.json())
