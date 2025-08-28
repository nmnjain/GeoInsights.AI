const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log(API_BASE_URL)
class GeospatialAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    async analyzeGeospatialData(query, coordinates = [], additionalParams = {}) {
        const requestData = {
            query,
            coordinates: coordinates.map(coord => ({
                lat: parseFloat(coord.lat),
                lng: parseFloat(coord.lng)
            })),
            additional_params: additionalParams
        };

        return this.makeRequest('/api/analyze', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });
    }
}

export default new GeospatialAPI();