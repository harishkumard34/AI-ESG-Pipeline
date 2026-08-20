import requests

response = requests.get("https://ai-esg-pipeline.onrender.com/api/records/")
print(response.status_code)
