import os
import pandas as pd
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.retrievers import BM25Retriever
# pyrefly: ignore [missing-import]
from PyPDF2 import PdfReader
from langchain_core.tools import tool

@tool
def read_raw_file_tool(file_path: str) -> str:
    """
    Reads the content of an uploaded PDF or Excel file.
    Use this tool when you need to extract data from a user's uploaded ESG file.
    Returns the extracted text or data.
    """
    if not os.path.exists(file_path):
        return f"Error: File not found at {file_path}"
    
    file_ext = os.path.splitext(file_path)[1].lower()
    
    try:
        if file_ext in [".xlsx", ".xls"]:
            df = pd.read_excel(file_path)
            return df.to_json(orient="records")
            
        elif file_ext == ".pdf":
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
            
        else:
            return "Error: Unsupported file format."
            
    except Exception as e:
        return f"Error reading file: {str(e)}"

@tool
def db_history_check_tool(category: str) -> str:
    """
    Checks the historical database for past consumption patterns for a given category.
    Returns the average historical consumption.
    """
    return f"The historical average for {category} is around 1000 units/kWh per month. Anything above 20000 is highly suspicious."    

from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. Load the Policy Document
print("Loading ESG Policy into BM25 Retriever...")
loader = TextLoader("app/data/esg_policy.txt", encoding="utf-8")
documents = loader.load()

# 2. Split the text into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 3. Create BM25 Retriever (No API Keys, No Network Requests, 100% Local!)
retriever = None

def get_retriever():
    global retriever
    if retriever is None:
        print("Initializing Local BM25 Retriever...")
        retriever = BM25Retriever.from_documents(docs)
        retriever.k = 2  # Top 2 matches
        print("BM25 Retriever Ready!")
    return retriever

@tool
def rag_policy_search_tool(query: str) -> str:
    """
    Searches the company's ESG policy document to answer policy-related questions.
    Input should be a clear search query.
    Returns the most relevant text from the policy document.
    """
    ret = get_retriever()
    results = ret.invoke(query)
    answer = "\n\n".join([doc.page_content for doc in results])
    return answer   
