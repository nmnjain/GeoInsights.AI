# tools/groundwater_tools.py

import json
import math
import sys
from typing import Dict, Any, List

# --- Data Loading ---

def load_json_data(filepath: str) -> List:
    """Loads data from a JSON file. Exits if the file is not found or is invalid."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"FATAL ERROR: The data file '{filepath}' was not found.")
        # Returning an empty list is safer than exiting in a library file
        return []
    except json.JSONDecodeError as e:
        print(f"FATAL ERROR: Could not decode JSON from '{filepath}'. Error: {e}")
        return []

# Load the groundwater data once when the module is imported
GROUNDWATER_DATA = load_json_data("data/groundwater_data.json")

# --- Helper Functions ---

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great-circle distance between two points on Earth in kilometers."""
    R = 6371  # Radius of Earth in kilometers
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat / 2) * math.sin(dLat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon / 2) * math.sin(dLon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance

# --- Tool Definition ---

def get_groundwater_levels_tool(latitude: float, longitude: float, radius: float = 5, district: str = "Pune") -> Dict[str, Any]:
    """
    Tool to calculate the average groundwater level from local well data within a specified radius.
    Requires 'latitude' (float), 'longitude' (float), and optionally 'radius' (float, in km) and 'district' (str).
    """
    print(f"--- TOOL: get_groundwater_levels_tool(lat={latitude}, lon={longitude}, radius={radius}) CALLED ---")

    if not GROUNDWATER_DATA:
         return {"error": "Groundwater data could not be loaded from the server."}

    yearly_totals = {}
    yearly_counts = {}
    filtered_wells_count = 0

    for well_data in GROUNDWATER_DATA:
        well_lat_str = well_data.get('latitude')
        well_lon_str = well_data.get('longitude')
        well_district = well_data.get('DISTRICT', '').lower()

        # Basic validation for the well entry
        if well_lat_str is None or well_lon_str is None:
            continue
        if well_district != district.lower():
            continue

        try:
            # The values in your JSON are strings, so they must be converted to floats
            well_lat = float(well_lat_str)
            well_lon = float(well_lon_str)
        except (ValueError, TypeError):
            # Skip entry if coordinates are not valid numbers
            continue

        # Calculate distance from the search point
        dist = haversine_distance(latitude, longitude, well_lat, well_lon)

        # If the well is within the radius, process its water level data
        if dist <= radius:
            filtered_wells_count += 1
            date_str = well_data.get("Date")
            wl_str = well_data.get("WL(mbgl)") # Water Level (meters below ground level)

            if date_str and wl_str:
                try:
                    # Your date format is "dd-mm-yy", so we extract the year
                    year = "20" + date_str.split('-')[2]
                    level = float(wl_str)

                    # Add the data to our yearly totals for averaging later
                    yearly_totals[year] = yearly_totals.get(year, 0) + level
                    yearly_counts[year] = yearly_counts.get(year, 0) + 1
                except (IndexError, ValueError):
                    # Ignore entries where date or water level is malformed
                    continue

    # Calculate the final averages for each year
    average_levels = {
        year: round(yearly_totals[year] / yearly_counts[year], 2) for year in yearly_totals
    }

    print(f"--- TOOL COMPLETE: Found {filtered_wells_count} matching entries. ---")

    # Return the final structured dictionary
    return {
        "request_params": {"latitude": latitude, "longitude": longitude, "district": district, "radius_km": radius},
        "filtered_wells_count": filtered_wells_count,
        "average_water_level_by_year": average_levels,
        "provenance": {"source": "Local file: groundwater_data.json"}
    }