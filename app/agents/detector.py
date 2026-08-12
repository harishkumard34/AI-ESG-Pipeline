from langgraph.prebuilt import create_react_agent
from app.agents.llm_setup import llm
from app.tools.custom_tools import db_history_check_tool

# Idhu thaan namma Anomaly Detector!
detector_agent = create_react_agent(
    llm,
    tools=[db_history_check_tool]
)