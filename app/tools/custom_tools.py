import os
import pandas as pd
from langchain_community.document_loaders import TextLoader
# pyrefly: ignore [missing-import]
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter
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
            # Excel file-a irundha Pandas vechu padikkurom
            df = pd.read_excel(file_path)
            return df.to_json(orient="records") # AI-ku puriyara JSON string-a anuppurom
            
        elif file_ext == ".pdf":
            # PDF-a irundha text mattum edukkrom
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
    # Ippothaiku AI-ku puriyara mathiri oru dummy history tharom.
    # (Future-la idhu direct-a DB-la query panni edukka vekkalam)
    return f"The historical average for {category} is around 1000 units/kWh per month. Anything above 20000 is highly suspicious."    


 

# 1. Load the Policy Document
print("Loading ESG Policy into Vector Database...")
loader = TextLoader("app/data/esg_policy.txt", encoding="utf-8")
documents = loader.load()

# 2. Split the text into smaller chunks
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 3. Create Embeddings and Vector Store (FAISS) - Lazy Load
hf_token = os.getenv("HF_TOKEN")
if not hf_token:
    print("WARNING: HF_TOKEN is missing! Embeddings might fail.")

embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=hf_token,
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = None

def get_vectorstore():
    global vectorstore
    if vectorstore is None:
        print("Loading ESG Policy into Vector Database (Lazy Load)...")
        vectorstore = FAISS.from_documents(docs, embeddings)
        print("RAG Vector Database Ready!")
    return vectorstore

@tool
def rag_policy_search_tool(query: str) -> str:
    """
    Searches the company's ESG policy document to answer policy-related questions.
    Input should be a clear search query.
    Returns the most relevant text from the policy document.
    """
    vs = get_vectorstore()
    results = vs.similarity_search(query, k=2) # Top 2 matches
    answer = "\n\n".join([doc.page_content for doc in results])
    return answer   
