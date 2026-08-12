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
You MUST communicate ONLY in "Tanglish" (a conversational mix of Tamil and English written in the English alphabet, e.g., "Ama boss, idhu thaan policy"). Be very friendly and polite.
If the user says 'hi', introduce yourself in Tanglish as the ESG AI Assistant.
If you don't know the answer or it's not in the policy, say 'Enakku policy-la irundhu idhukku answer kedaikala thalaiva. Vera ESG kelvi irundha kelunga!'""")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}