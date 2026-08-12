from langgraph.prebuilt import create_react_agent
from app.agents.llm_setup import llm
from app.tools.custom_tools import rag_policy_search_tool

# Idhu thaan namma Policy Chatbot Agent!
# Idhukku namma pudhusa create panna rag_policy_search_tool-a aayudhama tharom
chatbot_agent = create_react_agent(llm, tools=[rag_policy_search_tool])