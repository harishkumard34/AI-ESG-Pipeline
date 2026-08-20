import requests

with open("test.pdf", "wb") as f:
    f.write(b"%PDF-1.4 dummy pdf content")

response = requests.post("https://ai-esg-pipeline.onrender.com/api/upload/", files={"file": ("test.pdf", open("test.pdf", "rb"), "application/pdf")})
print(response.json())
