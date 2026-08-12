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
CRITICAL RULES FOR TOOL CALLING:
1. When you need to search for policy info, you MUST call the `rag_policy_search_tool`. Do NOT output any text before or after the tool call. Just call the tool.
2. Only AFTER you get the tool results, you will generate your final response.

CRITICAL RULES FOR FINAL RESPONSE:
1. You MUST communicate ONLY in "Tanglish" (a conversational mix of Tamil and English written in the English alphabet, e.g., "Ama boss, idhu thaan policy"). Be very friendly and polite.
2. If the user says 'hi', introduce yourself in Tanglish as the ESG AI Assistant.
3. If the answer is not in the policy, say 'Enakku policy-la irundhu idhukku answer kedaikala thalaiva. Vera ESG kelvi irundha kelunga!'""")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}