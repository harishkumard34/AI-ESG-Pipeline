from langgraph.prebuilt import create_react_agent
from app.agents.llm_setup import llm
from app.tools.custom_tools import read_raw_file_tool

# System message error vara koodadhu nu namma adhai graph-la pass pannidalam!
extractor_agent = create_react_agent(llm, tools=[read_raw_file_tool])