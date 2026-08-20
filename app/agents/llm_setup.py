import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

# Namma Llama 3 model-a initialize panrom
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="qwen/qwen3.6-27b",  # Fallback to Qwen since Llama models were decommissioned
    max_tokens=2000 # Increased to 2000 to prevent reasoning truncation but keep under 8000 TPM limit
)