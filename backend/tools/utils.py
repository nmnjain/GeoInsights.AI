import os
import json
from typing import Dict, List, Union

# --- Absolute Path Configuration ---
# This reliably finds your project's root directory
_CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_CURRENT_DIR)

def get_data_file_path(filename: str) -> str:
    """Constructs the absolute path to a file within the 'data' directory."""
    return os.path.join(_PROJECT_ROOT, 'data', filename)

# --- Centralized JSON Loading Function ---
def load_json_data(filename: str) -> Union[Dict, List, None]:
    """Loads a JSON file from the 'data' directory using an absolute path."""
    filepath = get_data_file_path(filename)
    print(f"--- [Loader] Attempting to load JSON from: {filepath} ---")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"!!! FATAL ERROR: File not found at {filepath}")
        return None
    except json.JSONDecodeError as e:
        print(f"!!! FATAL ERROR: Could not decode JSON from {filepath}. Error: {e}")
        return None