from fastapi import FastAPI, HTTPException
from typing import List

# Import the tools and models
from tools import ward_tools, population_tools, groundwater_tools
from .models import Ward, PopulationResponse, GroundwaterResponse

app = FastAPI(
    title="Agentic Tools API",
    description="An API that exposes backend data tools for an AI agent.",
    version="1.0.0"
)

@app.get("/wards", response_model=List[Ward])
def get_all_wards():
    """Returns a list of all available wards."""
    return ward_tools.get_all_wards_tool()

@app.get("/population/ward/{ward_number}", response_model=PopulationResponse)
def get_ward_population(ward_number: int, year: int = 2020):
    """Retrieves population for a specific ward."""
    result = population_tools.get_ward_population_tool(ward_number, year)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result

@app.get("/groundwater", response_model=GroundwaterResponse)
def get_groundwater_levels(latitude: float, longitude: float, radius: float = 10):
    """Calculates average groundwater level within a radius."""
    result = groundwater_tools.get_groundwater_levels_tool(latitude, longitude, radius)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result