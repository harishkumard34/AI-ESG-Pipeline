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
    sys_msg = SystemMessage(content="You are a helpful ESG Policy Assistant for DemoCorp. Always use the `rag_policy_search_tool` to find the correct policy before answering. If the answer is not in the policy, say 'I don't know based on the company policy.' Do not make up answers.")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}