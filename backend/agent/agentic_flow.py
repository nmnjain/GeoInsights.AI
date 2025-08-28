import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv
from agent.master_prompt import get_master_prompt
from agent.final_response_prompt import get_final_response_prompt_improved
from tools import ward_tools, population_tools, groundwater_tools, land_cover_tools, search_tools
from typing import Dict, Any, Optional

# --- Configuration & Setup ---
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

AVAILABLE_TOOLS = {
    "get_all_wards": ward_tools.get_all_wards_tool,
    "get_ward_population": population_tools.get_ward_population_tool,
    "get_groundwater_levels": groundwater_tools.get_groundwater_levels_tool,
    "get_land_cover": land_cover_tools.get_land_cover_tool,
    "get_web_search": search_tools.get_web_search_tool,
}

def extract_json_advanced(text: str) -> Optional[Dict[str, Any]]:
    """
    Advanced JSON extraction with multiple fallback strategies
    """
    # Strategy 1: Direct JSON parsing
    try:
        return json.loads(text.strip())
    except:
        pass
    
    # Strategy 2: Extract from markdown code blocks
    patterns = [
        r'```json\s*(.*?)\s*```',
        r'```\s*(.*?)\s*```',
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, text, re.DOTALL)
        for match in matches:
            try:
                return json.loads(match.strip())
            except:
                continue
    
    # Strategy 3: Find JSON by bracket matching
    start_idx = text.find('{')
    if start_idx == -1:
        return None
    
    bracket_count = 0
    for i, char in enumerate(text[start_idx:], start_idx):
        if char == '{':
            bracket_count += 1
        elif char == '}':
            bracket_count -= 1
            if bracket_count == 0:
                try:
                    json_str = text[start_idx:i+1]
                    return json.loads(json_str)
                except:
                    continue
    
    return None

def get_structured_response(model, prompt: str) -> Optional[Dict[str, Any]]:
    """
    Get structured JSON response using response_mime_type method
    """
    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.1,
                candidate_count=1,
            )
        )
        return json.loads(response.text)
    except:
        # Fallback to robust parsing
        try:
            response = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.1,
                    candidate_count=1,
                )
            )
            return extract_json_advanced(response.text)
        except:
            return None

def run_agentic_flow(user_query: str, user_coordinates: dict = None, user_role: str = "citizen"):
    print(f"\n--- 🚀 STARTING AGENTIC FLOW for Query: '{user_query}' ---")

    model = genai.GenerativeModel('gemini-2.0-flash')

    # Step 1 & 2: Decide on tools to call
    print("🧠 Contacting Gemini to decide on tools...")
    prompt = get_master_prompt(user_query, user_coordinates)
    decision = get_structured_response(model, prompt)

    if not decision or "tool_calls" not in decision:
        print("❌ Failed to get valid tool decision from Gemini")
        return {
            "maps_required": [],
            "ans": "I'm sorry, I had trouble determining how to respond to your request. Please try rephrasing your question.",
            "insights": ["Tool selection failed"],
            "news_articles": [],
            "predictions_next_5_years": "",
            "data_sources": []
        }

    tool_calls = decision.get("tool_calls", [])
    if not tool_calls:
        print("❌ Gemini did not identify any tools to call.")
        return {
            "maps_required": [],
            "ans": "I could not determine an appropriate action for your request.",
            "insights": [],
            "news_articles": [],
            "predictions_next_5_years": "",
            "data_sources": []
        }

    print(f"✅ Gemini decided to call {len(tool_calls)} tool(s).")

    # Step 3: Execute all chosen tools
    aggregated_results = []
    for call in tool_calls:
        tool_name = call.get("tool_name")
        parameters = call.get("parameters", {})
        if tool_name in AVAILABLE_TOOLS:
            print(f"🛠️ Executing: '{tool_name}' with params: {parameters}")
            tool_function = AVAILABLE_TOOLS[tool_name]
            if tool_name == "get_groundwater_levels" and user_coordinates:
                parameters.setdefault("latitude", user_coordinates.get("latitude"))
                parameters.setdefault("longitude", user_coordinates.get("longitude"))
            result = tool_function(**parameters)
            aggregated_results.append(result)
        else:
            aggregated_results.append({"error": f"Tool '{tool_name}' not found."})

    print(f"📊 Aggregated results: {json.dumps(aggregated_results, indent=2)}")

    # Step 4: Synthesize the final response
    print("🧠 Contacting Gemini to synthesize the final response...")
    final_prompt = get_final_response_prompt_improved(user_query, json.dumps(aggregated_results), user_role)
    final_response = get_structured_response(model, final_prompt)

    if not final_response:
        print("❌ Failed to get valid final response from Gemini")
        return {
            "maps_required": [],
            "ans": "I was able to gather data but encountered an issue generating the final analysis.",
            "insights": [],
            "news_articles": [],
            "predictions_next_5_years": "",
            "data_sources": []
        }

    print("--- ✅ AGENTIC FLOW COMPLETE ---")
    return final_response