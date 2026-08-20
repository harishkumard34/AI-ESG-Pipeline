from langchain_core.prompts import ChatPromptTemplate
from app.agents.llm_setup import llm

system_msg = """You are a Data Validator Agent. 
You will receive a JSON string of ESG data.
Your job is to check if any row has missing dates, negative amounts, or 0 amounts.
Return the same JSON string, but add a 'status' field to each row: 'Valid' or 'Invalid'.
If 'Invalid', also add an 'error_reason' field.
CRITICAL: Keep your <think> process extremely short, under 50 words. Return ONLY the JSON array, no other text."""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_msg),
    ("user", "Data to validate: {extracted_data}")
])

# Tool theva illa, idhu just data-va padichu check pannum
validator_agent = prompt | llm