import streamlit as st
import folium
from streamlit_folium import st_folium

wards_polygons = {
    "01 Dhanori - Vishrantwadi": [
        [73.90771, 18.60121],
        [73.8948, 18.58235],
        [73.88217, 18.57587],
        [73.8637, 18.59257]
    ],
    "02 Tingrenagar - Sanjay Park": [
        [73.91178, 18.59201],
        [73.91093, 18.56419],
        [73.88514, 18.57341],
        [73.89418, 18.58177]
    ],
    "03 Lohegaon - Vimannagar": [
        [73.93051, 18.62044],
        [73.95857, 18.59418],
        [73.92958, 18.56316],
        [73.9029, 18.58371]
    ],
    "04 East Kharadi - Wagholi": [
        [74.01045, 18.60401],
        [73.98099, 18.5684],
        [73.93873, 18.5624],
        [73.96112, 18.59819]
    ],
    "05 West Kharadi - Vadgaon Sheri": [
        [73.93445, 18.5636],
        [73.94508, 18.545],
        [73.9263, 18.55535],
        [73.92088, 18.56188]
    ],
    "06 Vadgaon Sheri - Ramwadi": [
        [73.9226, 18.55611],
        [73.92282, 18.54024],
        [73.91305, 18.55084],
        [73.92118, 18.55658]
    ],
    "07 Kalyaninagar - Nagpur Chawl": [
        [73.90306, 18.5695],
        [73.91947, 18.54888],
        [73.88885, 18.54546],
        [73.90037, 18.57177]
    ],
    "08 Kalas - Phulenagar": [
        [73.87663, 18.58292],
        [73.88326, 18.55342],
        [73.87207, 18.56411],
        [73.87205, 18.57931]
    ],
    "09 Yerwada": [
        [73.88683, 18.5517],
        [73.88509, 18.54341],
        [73.87811, 18.54829],
        [73.8825, 18.55336]
    ],
    "10 Shivajinagar Gaothan - Sangamwadi": [
        [73.87811, 18.54829],
        [73.85442, 18.52228],
        [73.83882, 18.54122],
        [73.85623, 18.54247]
    ]
}

# Sample feature data; replace with your actual full data
feature_data = {
    "01 Dhanori - Vishrantwadi": {
        "2018": {"vegetation_percent": 28.8507, "water_percent": 0.7344, "builtup_percent": 5.7086},
        "2019": {"vegetation_percent": 21.6310, "water_percent": 0.5988, "builtup_percent": 0.6692},
        "2020": {"vegetation_percent": 29.5956, "water_percent": 0.4818, "builtup_percent": 3.9722},
        "2021": {"vegetation_percent": 29.8586, "water_percent": 0.5681, "builtup_percent": 7.6700},
        "2022": {"vegetation_percent": 36.0948, "water_percent": 0.4496, "builtup_percent": 1.7097},
        "2023": {"vegetation_percent": 31.7466, "water_percent": 0.6623, "builtup_percent": 2.5237},
        "2024": {"vegetation_percent": 32.8669, "water_percent": 0.6233, "builtup_percent": 3.6540}
    },
    "02 Tingrenagar - Sanjay Park": {
        "2018": {"vegetation_percent": 26.1353, "water_percent": 0.2414, "builtup_percent": 8.3451},
        "2019": {"vegetation_percent": 19.4870, "water_percent": 0.0866, "builtup_percent": 1.5186},
        "2020": {"vegetation_percent": 25.5710, "water_percent": 0.1403, "builtup_percent": 4.8090},
        "2021": {"vegetation_percent": 27.4057, "water_percent": 0.1114, "builtup_percent": 5.3305},
        "2022": {"vegetation_percent": 33.1141, "water_percent": 0.0000, "builtup_percent": 2.0129},
        "2023": {"vegetation_percent": 31.5093, "water_percent": 0.0000, "builtup_percent": 4.0311},
        "2024": {"vegetation_percent": 31.5068, "water_percent": 0.0000, "builtup_percent": 6.3113}
    },
    "03 Lohegaon - Vimannagar": {
        "2018": {"vegetation_percent": 15.5223, "water_percent": 0.0273, "builtup_percent": 13.9194},
        "2019": {"vegetation_percent": 11.3274, "water_percent": 0.0000, "builtup_percent": 2.0726},
        "2020": {"vegetation_percent": 17.2009, "water_percent": 0.0000, "builtup_percent": 5.8819},
        "2021": {"vegetation_percent": 16.7789, "water_percent": 0.0015, "builtup_percent": 7.9223},
        "2022": {"vegetation_percent": 23.7483, "water_percent": 0.0000, "builtup_percent": 1.8768},
        "2023": {"vegetation_percent": 19.3900, "water_percent": 0.0000, "builtup_percent": 7.0039},
        "2024": {"vegetation_percent": 19.2086, "water_percent": 0.0000, "builtup_percent": 7.3747}
    },
    "04 East Kharadi - Wagholi": {
        "2018": {"vegetation_percent": 9.5748, "water_percent": 0.3805, "builtup_percent": 6.2581},
        "2019": {"vegetation_percent": 6.1962, "water_percent": 0.1427, "builtup_percent": 0.6607},
        "2020": {"vegetation_percent": 12.6609, "water_percent": 0.3061, "builtup_percent": 2.4777},
        "2021": {"vegetation_percent": 10.9871, "water_percent": 0.2410, "builtup_percent": 2.2512},
        "2022": {"vegetation_percent": 18.0370, "water_percent": 0.1921, "builtup_percent": 1.7050},
        "2023": {"vegetation_percent": 13.2459, "water_percent": 0.1167, "builtup_percent": 1.9052},
        "2024": {"vegetation_percent": 12.7747, "water_percent": 0.0000, "builtup_percent": 0.7609}
    },
    "05 West Kharadi - Vadgaon Sheri": {
        "2018": {"vegetation_percent": 13.8129, "water_percent": 0.0030, "builtup_percent": 1.6248},
        "2019": {"vegetation_percent": 9.9744, "water_percent": 0.0000, "builtup_percent": 0.2766},
        "2020": {"vegetation_percent": 12.8644, "water_percent": 0.0018, "builtup_percent": 0.3591},
        "2021": {"vegetation_percent": 13.5732, "water_percent": 0.0030, "builtup_percent": 0.1934},
        "2022": {"vegetation_percent": 15.4691, "water_percent": 0.0000, "builtup_percent": 0.7705},
        "2023": {"vegetation_percent": 15.9634, "water_percent": 0.0018, "builtup_percent": 0.6623},
        "2024": {"vegetation_percent": 15.7586, "water_percent": 0.0000, "builtup_percent": 0.4949}
    },
    "06 Vadgaon Sheri - Ramwadi": {
        "2018": {"vegetation_percent": 26.8539, "water_percent": 0.0000, "builtup_percent": 1.6962},
        "2019": {"vegetation_percent": 19.7597, "water_percent": 0.0000, "builtup_percent": 0.3224},
        "2020": {"vegetation_percent": 24.2069, "water_percent": 0.0000, "builtup_percent": 0.4372},
        "2021": {"vegetation_percent": 25.8967, "water_percent": 0.0000, "builtup_percent": 0.1734},
        "2022": {"vegetation_percent": 28.3075, "water_percent": 0.0000, "builtup_percent": 1.1778},
        "2023": {"vegetation_percent": 31.0409, "water_percent": 0.0000, "builtup_percent": 0.9643},
        "2024": {"vegetation_percent": 29.9155, "water_percent": 0.0000, "builtup_percent": 1.0487}
    },
    "07 Kalyaninagar - Nagpur Chawl": {
        "2018": {"vegetation_percent": 48.0047, "water_percent": 0.0000, "builtup_percent": 2.5221},
        "2019": {"vegetation_percent": 38.2151, "water_percent": 0.0000, "builtup_percent": 0.5680},
        "2020": {"vegetation_percent": 46.0613, "water_percent": 0.0000, "builtup_percent": 0.8443},
        "2021": {"vegetation_percent": 50.4961, "water_percent": 0.0000, "builtup_percent": 1.2172},
        "2022": {"vegetation_percent": 57.3824, "water_percent": 0.0000, "builtup_percent": 1.3047},
        "2023": {"vegetation_percent": 48.9121, "water_percent": 0.0000, "builtup_percent": 2.5957},
        "2024": {"vegetation_percent": 46.8034, "water_percent": 0.0000, "builtup_percent": 7.6376}
    },
    "08 Kalas - Phulenagar": {
        "2018": {"vegetation_percent": 45.8370, "water_percent": 0.9147, "builtup_percent": 1.8311},
        "2019": {"vegetation_percent": 41.6228, "water_percent": 0.0049, "builtup_percent": 0.1080},
        "2020": {"vegetation_percent": 47.5817, "water_percent": 0.0880, "builtup_percent": 0.2733},
        "2021": {"vegetation_percent": 52.6301, "water_percent": 0.0342, "builtup_percent": 0.0734},
        "2022": {"vegetation_percent": 52.9376, "water_percent": 0.0880, "builtup_percent": 0.4378},
        "2023": {"vegetation_percent": 52.0494, "water_percent": 0.0636, "builtup_percent": 0.2058},
        "2024": {"vegetation_percent": 52.8834, "water_percent": 0.0880, "builtup_percent": 0.1911}
    },
    "09 Yerwada": {
        "2018": {"vegetation_percent": 10.6453, "water_percent": 0.0000, "builtup_percent": 4.2858},
        "2019": {"vegetation_percent": 8.5796, "water_percent": 0.0000, "builtup_percent": 1.1499},
        "2020": {"vegetation_percent": 12.6238, "water_percent": 0.0000, "builtup_percent": 0.4711},
        "2021": {"vegetation_percent": 14.8917, "water_percent": 0.0000, "builtup_percent": 0.1301},
        "2022": {"vegetation_percent": 15.4830, "water_percent": 0.0000, "builtup_percent": 0.3699},
        "2023": {"vegetation_percent": 14.4620, "water_percent": 0.0000, "builtup_percent": 0.3699},
        "2024": {"vegetation_percent": 12.8245, "water_percent": 0.0000, "builtup_percent": 0.5719}
    },
    "10 Shivajinagar Gaothan - Sangamwadi": {
        "2018": {"vegetation_percent": 47.4835, "water_percent": 3.7329, "builtup_percent": 2.8720},
        "2019": {"vegetation_percent": 42.2155, "water_percent": 0.2680, "builtup_percent": 0.3378},
        "2020": {"vegetation_percent": 52.6711, "water_percent": 2.4124, "builtup_percent": 0.5261},
        "2021": {"vegetation_percent": 53.7461, "water_percent": 1.6001, "builtup_percent": 0.4808},
        "2022": {"vegetation_percent": 59.1386, "water_percent": 1.3630, "builtup_percent": 0.4574},
        "2023": {"vegetation_percent": 53.9381, "water_percent": 0.1690, "builtup_percent": 0.5851},
        "2024": {"vegetation_percent": 49.0377, "water_percent": 1.2538, "builtup_percent": 0.9268}
    }
}

def normalize_builtup_increase(feature_data):
    for ward, years in feature_data.items():
        sorted_years = sorted(years.keys())
        previous_builtup = None
        for year in sorted_years:
            builtup = years[year].get('builtup_percent')
            if builtup is None:
                continue
            if previous_builtup is None:
                previous_builtup = builtup
            else:
                if builtup < previous_builtup:
                    years[year]['builtup_percent'] = round(previous_builtup + 0.1, 4)
                    previous_builtup = years[year]['builtup_percent']
                else:
                    previous_builtup = builtup
    return feature_data

feature_data = normalize_builtup_increase(feature_data)

# ---------------- Streamlit Layout ----------------
st.set_page_config(layout="wide")
st.title("📍 Pune Ward Feature Difference Dashboard")

col1, col2 = st.columns([1, 2])  # Left side: controls + legend | Right side: map

# ---------------- Controls + Legend ----------------
with col1:
    st.markdown("### 🔧 Controls")

    feature = st.selectbox("Select Feature:", ["vegetation_percent", "water_percent", "builtup_percent"])

    # Dynamic Legend
    if feature == "vegetation_percent":
        st.markdown("""
        ### 🌱 Vegetation Color Coding
        - **Increase → Green shades**  
          - Light green = small increase  
          - Dark green = large increase  
        - **Decrease → Red shades**  
          - Light red = small decrease  
          - Dark red = large decrease  
        """)
    elif feature == "water_percent":
        st.markdown("""
        ### 💧 Water Color Coding
        - **Increase → Blue shades**  
          - Light blue = small increase  
          - Dark blue = large increase  
        - **Decrease → Red shades**  
          - Light red = small decrease  
          - Dark red = large decrease  
        """)
    elif feature == "builtup_percent":
        st.markdown("""
        ### 🏙️ Built-up Color Coding
        - **Increase → Gray/Black shades**  
          - Light gray = small urban growth  
          - Dark gray = heavy urban growth  
        - **Decrease → Not shown (treated as 0)**  
        """)

    # Year selection
    year_options = sorted({yr for ward in feature_data.values() for yr in ward.keys()})
    year1 = st.selectbox("Select Base Year:", year_options, index=0)
    year2 = st.selectbox("Select Comparison Year:", year_options, index=1 if len(year_options) > 1 else 0)

    if year1 == year2:
        st.warning("Please select different years for base and comparison.")
        st.stop()

# ---------------- Map + Calculation ----------------
with col2:
    st.markdown("### 🗺️ Ward Map")

    # Collect all diffs
    diff_values = []
    for ward_name in wards_polygons.keys():
        base_value = feature_data.get(ward_name, {}).get(year1, {}).get(feature, None)
        comp_value = feature_data.get(ward_name, {}).get(year2, {}).get(feature, None)
        if base_value is None or comp_value is None:
            continue
        diff = comp_value - base_value
        if feature == "builtup_percent" and diff < 0:
            diff = 0
        diff_values.append(diff)

    if diff_values:
        min_diff = min(diff_values)
        max_diff = max(diff_values)
    else:
        min_diff = 0
        max_diff = 1

    def interpolate_color(c1, c2, t):
        return tuple(int(c1[i] + t * (c2[i] - c1[i])) for i in range(3))

    def color_from_diff(diff, feature):
        if diff is None:
            return "#808080"

        magnitude = abs(diff)
        max_magnitude = max(abs(min_diff), abs(max_diff)) or 1
        intensity = min(magnitude / max_magnitude, 1)

        if feature in ["vegetation_percent", "water_percent"]:
            if diff < 0:
                light = (255, 200, 200)
                dark = (139, 0, 0)
                rgb = interpolate_color(light, dark, intensity)
            else:
                if feature == "vegetation_percent":
                    light = (198, 239, 206)
                    dark = (0, 97, 0)
                else:  # water
                    light = (198, 221, 239)
                    dark = (0, 57, 113)
                rgb = interpolate_color(light, dark, intensity)
        else:  # builtup
            if diff < 0:
                diff = 0
                intensity = 0
            light = (213, 213, 213)
            dark = (77, 77, 77)
            rgb = interpolate_color(light, dark, intensity)

        return f'#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}'

    # Map bounds
    all_points = []
    for coords in wards_polygons.values():
        for lon, lat in coords:
            all_points.append((lat, lon))

    min_lat = min(p[0] for p in all_points)
    max_lat = max(p[0] for p in all_points)
    min_lon = min(p[1] for p in all_points)
    max_lon = max(p[1] for p in all_points)

    # Folium Map
    m = folium.Map(
        zoom_control=True,
        min_zoom=12,
        max_bounds=True
    )
    m.fit_bounds([[min_lat, min_lon], [max_lat, max_lon]])

    # Draw wards
    for ward_name, coords in wards_polygons.items():
        base_value = feature_data.get(ward_name, {}).get(year1, {}).get(feature, None)
        comp_value = feature_data.get(ward_name, {}).get(year2, {}).get(feature, None)

        if base_value is None or comp_value is None:
            diff = None
        else:
            diff = comp_value - base_value
            if feature == "builtup_percent" and diff < 0:
                diff = 0

        popup_text = f"<b>{ward_name}</b><br>{feature} change from {year1} to {year2}: "
        popup_text += f"{diff:.2f}%" if diff is not None else "Data unavailable"

        polygon_latlon = [[lat_lon[1], lat_lon[0]] for lat_lon in coords]
        if polygon_latlon[0] != polygon_latlon[-1]:
            polygon_latlon.append(polygon_latlon[0])

        fill_color = color_from_diff(diff, feature)

        folium.Polygon(
            locations=polygon_latlon,
            color="black",
            weight=1,
            fill=True,
            fill_color=fill_color,
            fill_opacity=0.7,
            popup=folium.Popup(popup_text, max_width=300)
        ).add_to(m)

    st_folium(m, width=850, height=650)