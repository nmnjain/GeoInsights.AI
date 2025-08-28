from typing import List, Dict, Any
# Import the new centralized loader
from .utils import load_json_data

# Load data using the helper, providing a fallback for safety
_wards_full_data = load_json_data("wards.json")
WARDS_DATA = _wards_full_data.get("wards", []) if _wards_full_data else []

if not WARDS_DATA:
    print("!!! WARNING: [ward_tools] WARDS_DATA is empty. Check data/wards.json path and content.")

def get_all_wards_tool() -> List[Dict[str, Any]]:
    print("--- TOOL: get_all_wards_tool() CALLED ---")
    if not WARDS_DATA:
        return {"error": "Ward data could not be loaded. Please check server logs."}
    return WARDS_DATA