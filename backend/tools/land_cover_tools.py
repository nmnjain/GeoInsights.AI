import json
from typing import Dict, Any, Optional, List

# To find ward names from numbers, we need data from ward_tools
# This assumes ward_tools.py is in the same directory
from .ward_tools import WARDS_DATA

# --- Data Loading ---
def load_json_data(filepath: str) -> Dict:
    """Loads data from a JSON file."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"FATAL ERROR: The data file '{filepath}' was not found.")
        return {}
    except json.JSONDecodeError as e:
        print(f"FATAL ERROR: Could not decode JSON from '{filepath}'. Error: {e}")
        return {}

# Load the land cover data once when the module is imported
LAND_COVER_DATA = load_json_data("data/land_cover_data.json")

# --- Helper Function ---
def find_ward_name_by_number(ward_number: int) -> Optional[str]:
    """Finds a ward's full name from the loaded list by its number."""
    for ward in WARDS_DATA:
        if ward.get("ward_number") == ward_number:
            return ward.get("ward_name")
    return None

# --- Tool Definition ---
def get_land_cover_tool(ward_number: int, year: Optional[int] = None) -> Dict[str, Any]:
    """
    Tool to get land cover data (vegetation, water, built-up) from satellite imagery analysis.
    Requires 'ward_number' (integer) and an optional 'year' (integer).
    """
    print(f"--- TOOL: get_land_cover_tool(ward_number={ward_number}, year={year}) CALLED ---")

    if not LAND_COVER_DATA:
        return {"error": "Land cover data could not be loaded from the server."}

    ward_name = find_ward_name_by_number(ward_number)
    if not ward_name:
        return {"error": f"Ward with number {ward_number} was not found."}

    ward_land_cover = LAND_COVER_DATA.get(ward_name)
    if not ward_land_cover:
        return {
            "error": f"Land cover data is not available for Ward {ward_number} ({ward_name}). Data is only available for wards 1-10."
        }

    # If a specific year is requested
    if year:
        year_str = str(year)
        year_data = ward_land_cover.get(year_str)
        if not year_data:
            return {"error": f"Land cover data for the year {year} is not available for Ward {ward_number}."}
        
        # Check if the data for that year is null
        if year_data.get("vegetation_percent") is None:
             return {"error": f"Data for the year {year} is recorded as null for Ward {ward_number}. Please choose a year from 2018 onwards."}

        result_data = {year_str: year_data}
    else:
        # If no year is specified, return all available yearly data
        result_data = ward_land_cover

    return {
        "ward_number": ward_number,
        "ward_name": ward_name,
        "land_cover_data": result_data,
        "provenance": {"source": "Local file: land_cover_data.json (Derived from satellite imagery)"}
    }