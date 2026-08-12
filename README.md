# AI ESG Pipeline 🌍🤖

A cutting-edge AI-driven Environmental, Social, and Governance (ESG) data pipeline. This project automates the extraction, validation, and anomaly detection of ESG data from raw documents using a Multi-Agent AI architecture, paired with a stunning glassmorphic React frontend.

## ✨ Features

- **Multi-Agent Workflow (LangGraph):** 
  - 🕵️‍♂️ **Extractor Agent:** Extracts structured ESG data from raw PDFs/Excel files.
  - 👮‍♂️ **Validator Agent:** Validates data formatting, checks for missing fields or illogical values (e.g., negative amounts).
  - 🕵️‍♀️ **Detector Agent:** Analyzes the data against historical averages to flag anomalies.
- **RAG Chatbot:** Ask the AI questions about the company's ESG policies directly from the dashboard. Uses **FAISS** in-memory vector database and HuggingFace Embeddings.
- **Premium Frontend:** A beautiful, responsive, Light Glassmorphism UI built with React and Vite. Features drag-and-drop file upload, real-time data tables, and animated AI chat bubbles.
- **FastAPI Backend:** A robust, high-performance Python backend managing the AI pipeline and SQLite database.

## 🏗️ Architecture

- **Backend:** FastAPI, LangChain, LangGraph, SQLAlchemy, SQLite, Groq (Llama-3.1-8b)
- **Frontend:** React, Vite, Axios, Lucide React (Icons)
- **AI Models:** Llama-3.1-8b (via Groq), all-MiniLM-L6-v2 (HuggingFace Embeddings)

## 🚀 How to Run Locally

### 1. Backend Setup

1. Navigate to the project root:
   ```bash
   cd "AI ESG Pipeline"
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn langchain langgraph sqlalchemy pydantic groq sentence-transformers faiss-cpu pypdf2 pandas
   ```
4. Set up your `.env` file:
   Create a `.env` file in the root and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The backend will run on `http://127.0.0.1:8000`*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd "AI ESG Pipeline/frontend"
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

## 📖 Usage

1. Open the Frontend at `http://localhost:5173`.
2. Click **Enter Portal** and Sign In.
3. Drag and drop a utility bill PDF (e.g., `utility_april_2024.pdf`) into the Upload Section.
4. Watch the LangGraph Agents extract, validate, and detect anomalies in real-time.
5. Use the floating Chatbot to query your ESG policies!
