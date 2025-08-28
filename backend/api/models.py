from pydantic import BaseModel
from typing import List, Dict, Any, Optional

# Re-using the same Pydantic models you defined
class Ward(BaseModel):
    ward_name: str
    ward_number: int

class PopulationResponse(BaseModel):
    ward_number: int
    ward_name: str
    year: int
    population_data: Dict[str, Any]
    provenance: Dict[str, Any]

class GroundwaterResponse(BaseModel):
    request_params: Dict[str, Any]
    filtered_wells_count: int
    average_water_level_by_year: Dict[str, Optional[float]]
    provenance: Dict[str, Any]


