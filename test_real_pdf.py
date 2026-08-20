import requests

response = requests.post(
    "https://ai-esg-pipeline.onrender.com/api/upload/", 
    files={"file": ("utility_april_2024.pdf", open("temp_uploads/utility_april_2024.pdf", "rb"), "application/pdf")}
)
print(response.json())
