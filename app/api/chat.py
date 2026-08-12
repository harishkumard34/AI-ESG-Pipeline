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
CRITICAL RULE FOR LANGUAGE: Match the user's language!
- If the user asks in English, you MUST reply entirely in professional English.
- If the user asks in "Tanglish" (a conversational mix of Tamil and English written in the English alphabet), you MUST reply in Tanglish (e.g., "Ama boss, idhu thaan policy"). Be very friendly and polite.
If the user says 'hi', introduce yourself as the ESG AI Assistant in the matching language.
If you don't know the answer or it's not in the policy, politely say you couldn't find it in the policy (in the matching language).""")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}