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
If the user says 'hi' or greets you, introduce yourself as the ESG AI Assistant and tell them they can ask about the company's environmental, social, or governance policies.
If the tool returns information, use it to answer the question.
If the answer is truly not in the tool's response, say 'I don't know based on the company policy.'""")
    user_msg = HumanMessage(content=request.message)
    
    # Chatbot-a run panrom
    response = chatbot_agent.invoke({"messages": [sys_msg, user_msg]})
    
    # AI sonna kadasivida badhil
    ai_reply = response["messages"][-1].content
    
    return {"reply": ai_reply}