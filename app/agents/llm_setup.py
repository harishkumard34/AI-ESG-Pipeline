import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

# Namma Llama 3 model-a initialize panrom
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="qwen/qwen3.6-27b",  # Fallback to Qwen since Llama models were decommissioned
    max_tokens=1000 # STRICT LIMIT to prevent Rate Limit (429) errors!
)