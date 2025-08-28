import json
import requests
import time
from typing import Dict, Any, Optional, Tuple

# We import from ward_tools, which is in the same directory (tools/)
from .ward_tools import load_json_data, WARDS_DATA

# --- Configuration ---
WORLDPOP_STATS_URL = "https://api.worldpop.org/v1/services/stats"
WORLDPOP_TASK_URL = "https://api.worldpop.org/v1/tasks/{}"

# --- Helper Functions ---

def find_ward_by_number(ward_number: int) -> Optional[Dict[str, Any]]:
    """Finds a ward's data from the loaded list by its number."""
    for ward in WARDS_DATA:
        if ward.get("ward_number") == ward_number:
            return ward
    return None

def get_population_from_worldpop(year: int, coordinates: list) -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """
    Fetches population data from the WorldPop API.
    This is the function that was previously missing its logic.
    """
    # Ensure the polygon is closed for GeoJSON
    if not coordinates or coordinates[0] != coordinates[-1]:
        coordinates.append(coordinates[0])

    geojson = {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [coordinates]}}]}
    payload = {"dataset": "wpgppop", "year": year, "geojson": json.dumps(geojson)}

    try:
        # Submit the task to WorldPop
        resp = requests.post(WORLDPOP_STATS_URL, json=payload, timeout=30)
        resp.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
        taskid = resp.json().get("taskid")
        task_url = WORLDPOP_TASK_URL.format(taskid)

        # Poll the task status
        for _ in range(20): # Poll for up to 60 seconds (20 * 3s)
            check_resp = requests.get(task_url, timeout=30)
            check_resp.raise_for_status()
            check = check_resp.json()
            status = check.get("status")

            if status == "finished":
                population = check.get("data", {}).get("total_population")
                return ({"population": population, "taskid": taskid, "status": status}, {"source": "WorldPop", "task_url": task_url})
            elif status in ["failed", "error"]:
                return ({"error": check.get("error_message", "Task failed"), "taskid": taskid, "status": status}, {"source": "WorldPop", "task_url": task_url})
            
            time.sleep(3) # Wait before polling again

        # If the loop finishes without returning, it timed out
        return ({"error": "Polling timed out", "taskid": taskid, "status": "timeout"}, {"source": "WorldPop", "task_url": task_url})

    except requests.exceptions.RequestException as e:
        # Handle network errors, timeouts, etc.
        return ({"error": str(e)}, {"source": "WorldPop"})


# --- Tool Definition ---

def get_ward_population_tool(ward_number: int, year: int = 2020) -> Dict[str, Any]:
    """
    Tool to retrieve the total population for a specific ward by its number and a given year.
    Requires 'ward_number' (integer) and 'year' (integer) as parameters.
    """
    print(f"--- TOOL: get_ward_population_tool(ward_number={ward_number}, year={year}) CALLED ---")
    ward_info = find_ward_by_number(ward_number)
    if not ward_info:
        return {"error": f"Ward with number {ward_number} was not found."}

    coordinates = ward_info.get("approximate_coordinates")
    if not coordinates or len(coordinates) < 4:
        return {"error": f"Invalid or missing coordinates for ward {ward_number}."}
    
    # This call will now work correctly
    population_result, provenance = get_population_from_worldpop(year, coordinates)
    
    if "error" in population_result:
        return {"error": f"Failed to retrieve data from WorldPop: {population_result['error']}"}

    return {
        "ward_number": ward_number,
        "ward_name": ward_info.get("ward_name", "N/A"),
        "year": year,
        "population_data": population_result,
        "provenance": provenance
    }