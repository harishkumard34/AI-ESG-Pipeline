import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

# Namma Llama 3 model-a initialize panrom
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant",  # Fallback to 8b since 70b was decommissioned
    max_tokens=1000 # STRICT LIMIT to prevent Rate Limit (429) errors!
)