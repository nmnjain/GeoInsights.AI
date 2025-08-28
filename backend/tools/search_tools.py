import os
import requests
from typing import Dict, Any, Optional

def get_web_search_tool(query: str, location: str = "Pune, Maharashtra, India", timeframe: Optional[str] = None) -> Dict[str, Any]:
    print(f"--- TOOL: get_web_search_tool(query='{query}', timeframe='{timeframe}') CALLED ---")
    api_key = os.getenv("ZENSERP_API_KEY")
    if not api_key: return {"error": "ZENSERP_API_KEY is not set."}

    params = {"q": query, "tbm": "nws", "location": location, "num": 3}
    if timeframe: params["timeframe"] = timeframe
    
    try:
        response = requests.get("https://app.zenserp.com/api/v2/search", headers={"apikey": api_key}, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
        news_results = data.get("news_results", [])
        if not news_results: return {"search_results": f"No relevant news found for: '{query}'."}
        
        processed = [{"title": r.get("title"), "url": r.get("url"), "snippet": r.get("snippet"), "source": r.get("source"), "date": r.get("date")} for r in news_results]
        return {"search_query": query, "search_results": processed, "provenance": {"source": "Zenserp News API"}}

    except requests.exceptions.RequestException as e:
        return {"error": f"Zenserp API call failed: {e}"}