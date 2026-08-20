from app.agents.graph import app_graph
import json

initial_state = {"file_path": "temp_uploads/dummy.pdf", "extracted_data": ""}
print("Invoking graph...")
final_state = app_graph.invoke(initial_state)
print("Graph output:")
print(final_state["extracted_data"])
