# Urban Intelligence Platform

GeoInsights.AI is an AI-powered geospatial intelligence platform that transforms satellite imagery and open geospatial data into actionable insights about Pune’s rapid change. Designed for quick, easy use by government agencies, NGOs, journalists, and citizens, it offers personalized dashboards that reveal urbanization, environmental shifts, and socioeconomic trends—empowering smarter local decisions for a sustainable future.

## Problem Statement
Pune, like many growing Indian cities, faces complex challenges: urban expansion, loss of green cover, fluctuating water resources, and shifting population patterns. Making sense of change—at the level of a neighborhood or street—requires fusing time-series imagery, census data, environmental data, and infrastructure maps. Today, this fusion is slow, expert-driven, and inaccessible to actionable local plannin

## 🌟 Project Overview

This project combines frontend visualization with backend AI-powered analytics to provide insights into:
- Ground water levels
- Land cover changes
- Population distribution
- Ward-wise urban metrics
- Environmental parameters

## 🏗️ Architecture

### Frontend (React + Vite)
- Interactive 3D Earth visualization
- Ward-level data representation
- Responsive design using Tailwind CSS
- Real-time data updates

### Backend (FastAPI + Python)
- RESTful API endpoints
- AI-powered analysis using Google's Generative AI
- Data processing tools
- Streamlit dashboards for data visualization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.11+)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
# For Windows
.\venv\Scripts\activate
# For Unix/MacOS
source venv/bin/activate

pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Environment Variables**

Backend (.env):
```env
GEMINI_API_KEY=your_gemini_api_key
ZENSERP_API_KEY=your_zenserp_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

Frontend (.env):
```env
VITE_API_URL=your_backend_api_url
```

### Running the Application

1. **Start the Backend**
```bash
cd backend
uvicorn main:app --reload
```

2. **Start the Frontend**
```bash
cd frontend
npm run dev
```

## 📊 Features

### Data Analysis Tools
- Ground water level analysis
- Land cover change detection
- Population distribution metrics
- Ward-wise data visualization

### Interactive Visualizations
- 3D Earth Dashboard
- Ward-level mapping
- Time-series data representation
- Environmental metrics display

### AI Integration
- Natural language queries
- Predictive analytics
- Pattern recognition
- Automated insights generation

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   └── ...config files
│
└── backend/
    ├── agent/
    ├── api/
    ├── data/
    ├── tools/
    ├── tests/
    └── streamlit/
```

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Three.js (for 3D visualization)

### Backend
- FastAPI
- Google GenerativeAI
- Python data processing tools
- Streamlit
