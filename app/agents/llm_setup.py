import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

# Namma Llama 3 model-a initialize panrom
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama3-70b-8192",  # Switch to a smarter model that handles tools better
    max_tokens=1000 # STRICT LIMIT to prevent Rate Limit (429) errors!
)