# main.py
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
from agent.agentic_flow import run_agentic_flow

app = FastAPI(title="Geospatial Analysis API", version="1.0.0")

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class Coordinates(BaseModel):
    lat: float
    lng: float

class AnalysisRequest(BaseModel):
    query: str
    coordinates: Optional[List[Coordinates]] = None
    additional_params: Optional[Dict[str, Any]] = None

# Response models
class AnalysisResponse(BaseModel):
    success: bool
    data: Dict[str, Any]
    message: str
    query_processed: str

@app.get("/")
async def root():
    return {"message": "Geospatial Analysis API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_geospatial_data(request: AnalysisRequest):
    """
    Main endpoint to process geospatial queries through the agentic flow
    """
    try:
        # Prepare the query with coordinates if provided
        enhanced_query = request.query
        
        if request.coordinates:
            coords_text = "Selected coordinates: "
            for i, coord in enumerate(request.coordinates):
                coords_text += f"Point {i+1}: ({coord.lat}, {coord.lng}) "
            enhanced_query = f"{request.query}\n\n{coords_text}"
        
        # Add any additional parameters to the query context
        if request.additional_params:
            enhanced_query += f"\n\nAdditional parameters: {json.dumps(request.additional_params)}"
        
        # Run the agentic flow
        result = run_agentic_flow(enhanced_query)
        
        # Ensure result is properly formatted
        if isinstance(result, str):
            try:
                result = json.loads(result)
            except json.JSONDecodeError:
                result = {"analysis": result, "raw_response": True}
        
        return AnalysisResponse(
            success=True,
            data=result,
            message="Analysis completed successfully",
            query_processed=enhanced_query
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing analysis: {str(e)}"
        )

@app.post("/api/analyze/batch")
async def batch_analyze(requests: List[AnalysisRequest]):
    """
    Endpoint to process multiple queries in batch
    """
    results = []
    
    for i, request in enumerate(requests):
        try:
            enhanced_query = request.query
            if request.coordinates:
                coords_text = "Selected coordinates: "
                for j, coord in enumerate(request.coordinates):
                    coords_text += f"Point {j+1}: ({coord.lat}, {coord.lng}) "
                enhanced_query = f"{request.query}\n\n{coords_text}"
            
            result = run_agentic_flow(enhanced_query)
            
            if isinstance(result, str):
                try:
                    result = json.loads(result)
                except json.JSONDecodeError:
                    result = {"analysis": result, "raw_response": True}
            
            results.append({
                "index": i,
                "success": True,
                "data": result,
                "query": enhanced_query
            })
            
        except Exception as e:
            results.append({
                "index": i,
                "success": False,
                "error": str(e),
                "query": request.query
            })
    
    return {"results": results, "total_processed": len(requests)}

if __name__ == "__main__":
    # Example usage (for testing)
    print("Starting Geospatial Analysis API...")
    
    # Test example
    query1 = "Show me the trend in built-up percentage for Ward 3 between 2018 and 2024. Also, search for information about the environmental impact of development in the Lohegaon and Viman Nagar areas"
    
    print(f"Test Query: {query1}")
    print("Starting server...")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload during development
        log_level="info"
    )