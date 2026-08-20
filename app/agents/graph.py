from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.messages import SystemMessage, HumanMessage
from app.agents.extractor import extractor_agent
from app.agents.validator import validator_agent 
from app.agents.detector import detector_agent

class AgentState(TypedDict):
    file_path: str
    extracted_data: str

from app.tools.custom_tools import read_raw_file_tool
from app.agents.llm_setup import llm

def run_extractor(state: AgentState):
    print(f"--- Extractor Agent Reading File: {state['file_path']} ---")
    
    # 1. Direct-a Python laye file-a padichudalam! (Saves tokens & avoids tool hallucination)
    file_content = read_raw_file_tool.invoke({"file_path": state['file_path']})
    
    sys_msg = SystemMessage(content='You are an expert AI ESG Data Extractor. Extract key ESG data from the provided text. CRITICAL: Return ONLY a valid JSON array of objects like [{"category":"Utility", "amount":100, "unit":"kWh", "date":"April 2024"}]. No markdown, no extra text. Keep your <think> process extremely short, under 50 words.')
    user_msg = HumanMessage(content=f"Extract data from this text:\n{file_content}")
    
    response = llm.invoke([sys_msg, user_msg])
    return {"extracted_data": response.content}

def run_validator(state: AgentState):
    print("--- Validator Agent Checking Data ---")
    response = validator_agent.invoke({"extracted_data": state['extracted_data']})
    return {"extracted_data": response.content}

def run_detector(state: AgentState):
    print("--- Anomaly Detector Agent Checking History ---")
    
    # 3. Direct-a Python laye history context-a kuduthudalam! (Avoids tool hallucination 'update_data')
    history_context = "Historical Average for Utility is 30,000 kWh per month. Historical Average for Travel is 50,000 miles per month."
    
    sys_msg = SystemMessage(content='You are an Anomaly Detector Agent. Compare the JSON data against the historical averages. If any "amount" is wildly higher (e.g. >50000 for Utility), change its "status" to "Invalid" and write the "error_reason". CRITICAL: Output ONLY a valid raw JSON array of objects. Do NOT write python scripts. Do NOT explain. Keep your <think> process extremely short, under 50 words. Just output the array.')
    user_msg = HumanMessage(content=f"History: {history_context}\n\nData to check:\n{state['extracted_data']}")
    
    from app.agents.llm_setup import llm
    response = llm.invoke([sys_msg, user_msg])
    
    return {"extracted_data": response.content}    

workflow = StateGraph(AgentState)

workflow.add_node("extractor", run_extractor)
workflow.add_node("validator", run_validator)
workflow.add_node("detector", run_detector)

workflow.set_entry_point("extractor")
workflow.add_edge("extractor", "validator")
workflow.add_edge("validator", "detector")
workflow.add_edge("detector", END)

app_graph = workflow.compile()