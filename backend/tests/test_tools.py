import sys
import os
import unittest

# This is a bit of a hack to allow the test file to import from parent directories
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from tools import ward_tools, population_tools, groundwater_tools

class TestTools(unittest.TestCase):

    def test_get_all_wards_tool(self):
        print("\n--- Testing: get_all_wards_tool ---")
        wards = ward_tools.get_all_wards_tool()
        self.assertIsInstance(wards, list)
        self.assertGreater(len(wards), 0, "Ward list should not be empty")
        self.assertIn("ward_name", wards[0])
        self.assertIn("ward_number", wards[0])
        print("✅ PASSED")

    def test_get_ward_population_tool_success(self):
        print("\n--- Testing: get_ward_population_tool (Success Case) ---")
        # NOTE: This makes a live API call and may take a moment.
        population_data = population_tools.get_ward_population_tool(ward_number=1, year=2020)
        self.assertNotIn("error", population_data)
        self.assertEqual(population_data["ward_number"], 1)
        self.assertIn("population", population_data["population_data"])
        print("✅ PASSED")

    def test_get_ward_population_tool_failure(self):
        print("\n--- Testing: get_ward_population_tool (Failure Case) ---")
        error_data = population_tools.get_ward_population_tool(ward_number=999) # An invalid ward
        self.assertIn("error", error_data)
        self.assertIn("not found", error_data["error"])
        print("✅ PASSED")

    def test_get_groundwater_levels_tool_found(self):
        print("\n--- Testing: get_groundwater_levels_tool (Wells Found) ---")
        # These coordinates are close to the sample data in groundwater_data.json
        groundwater_data = groundwater_tools.get_groundwater_levels_tool(latitude=18.5204, longitude=73.8567, radius=1)
        self.assertNotIn("error", groundwater_data)
        self.assertGreater(groundwater_data["filtered_wells_count"], 0)
        self.assertIn("2022", groundwater_data["average_water_level_by_year"])
        self.assertIn("2023", groundwater_data["average_water_level_by_year"])
        print("✅ PASSED")

    def test_get_groundwater_levels_tool_not_found(self):
        print("\n--- Testing: get_groundwater_levels_tool (Wells Not Found) ---")
        # These coordinates are far away from the sample data
        groundwater_data = groundwater_tools.get_groundwater_levels_tool(latitude=25.0, longitude=80.0, radius=5)
        self.assertNotIn("error", groundwater_data)
        self.assertEqual(groundwater_data["filtered_wells_count"], 0)
        self.assertEqual(len(groundwater_data["average_water_level_by_year"]), 0)
        print("✅ PASSED")

if __name__ == '__main__':
    unittest.main()