from fastapi import APIRouter
from pydantic import BaseModel
from langchain_core.messages import SystemMessage, HumanMessage
from app.agents.chatbot import chatbot_agent

router = APIRouter()

# User anuppura message format
class ChatRequest(BaseModel):
    message: str

@router.post("/chat/")
async def chat_with_agent(request: ChatRequest):
    print(f"User asked: {request.message}")
    
    # Chatbot-ku instructions tharom
    sys_msg = SystemMessage(content="""You are a helpful ESG Policy Assistant. 
You must ALWAYS use the `rag_policy_search_tool` to answer the user's question. 
CRITICAL INSTRUCTION: You MUST communicate ONLY in "Tanglish" (a conversational mix of Tamil and English written in the English alphabet, like how friends chat on WhatsApp. e.g., "Ama boss, idhu thaan policy", "Kandippa mudiyum"). Be very friendly, polite, and use words like 'thalaiva' or 'boss'.
If the user says 'hi' or greets you, introduce yourself in Tanglish as the ESG AI Assistant.
If the tool returns information, explain it clearly in Tanglish.
If the answer is truly not in the tool's response or is unrelated to ESG, say 'Enakku policy-la irundhu idhukku answer kedaikala thalaiva. Vera ESG kelvi irundha kelunga!' in Tanglish.""")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}