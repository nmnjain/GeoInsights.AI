import React, { useEffect, useRef, useState } from 'react'
import { MapPin, ChevronDown, Send, Globe, Users, TrendingUp, Map, MessageSquare, Target, Sparkles, X, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import GeospatialAPI from '../services/geospatialAPI' // Import the API service
import Punedata from '../components/punedata'

const COMMON_QUESTIONS = [
    "Are there any ongoing environmental issues here?",
    "Is this area prone to flooding during monsoons?",
    "What are the water quality parameters for this location?",

    "How can I report an environmental concern here?"
]

const RoleSelector = ({ onSelect, selectedRole }) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 mb-4">
            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold mb-2">Select your role</h2>
                <p className="text-gray-400 text-sm">Tailor the dashboard and onboarding to your needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <button
                    onClick={() => onSelect('reporter')}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedRole === 'reporter'
                        ? 'bg-cyan-600/20 border-cyan-500 ring-2 ring-cyan-400/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                        <span className="font-semibold">Reporter / Journalist</span>
                    </div>
                    <p className="text-sm text-gray-400">Trending events, map overlays, fact-check tools, and story builder.</p>
                </button>
                <button
                    onClick={() => onSelect('ngo')}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedRole === 'ngo'
                        ? 'bg-emerald-600/20 border-emerald-500 ring-2 ring-emerald-400/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">NGO / Government</span>
                    </div>
                    <p className="text-sm text-gray-400">Advanced analytics, spatial analysis, campaigns, bulk data/API.</p>
                </button>
                <button
                    onClick={() => onSelect('citizen')}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedRole === 'citizen'
                        ? 'bg-amber-600/20 border-amber-500 ring-2 ring-amber-400/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-amber-400" />
                        <span className="font-semibold">Citizen</span>
                    </div>
                    <p className="text-sm text-gray-400">Simple reporting, track case status, view resolved incidents.</p>
                </button>
            </div>
        </div>
    )
}

const OnboardingBanner = ({ role, onDismiss }) => {
    const byRole = {
        reporter: {
            title: 'Welcome, Reporter',
            tips: ['Explore trending environmental events', 'Use overlays to compare timelines', 'Annotate and share stories with your team']
        },
        ngo: {
            title: 'Welcome, NGO/Government',
            tips: ['Open the analytics panel', 'Tune severity modeling sliders', 'Use export to retrieve bulk data']
        },
        citizen: {
            title: 'Welcome, Citizen Scientist',
            tips: ['Tap the map to report a local issue', 'Describe the issue and submit', 'Track status under My Reports']
        }
    }
    const data = byRole[role]
    if (!data) return null
    return (
        <div className="mb-4 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 p-4 text-white">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-cyan-300" /><span className="font-semibold">{data.title}</span></div>
                    <ul className="text-sm text-gray-300 list-disc ml-5 space-y-1">
                        {data.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>
                <button onClick={onDismiss} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
        </div>
    )
}

// New Results Display Component
const ResultsDisplay = ({ results, isLoading, error, onClose }) => {
    if (!results && !isLoading && !error) return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4 mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold">Analysis Results</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-cyan-400">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Analyzing your query...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                        <div className="font-semibold">Analysis Failed</div>
                        <div className="text-sm text-red-400">{error}</div>
                    </div>
                </div>
            )}

            {results && results.success && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{results.message}</span>
                    </div>

                    {/* Query Summary */}
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-300 mb-2">Processed Query:</div>
                        <div className="text-sm text-gray-400 bg-gray-800 p-2 rounded">
                            {results.query_processed}
                        </div>
                    </div>

                    {/* Results Data */}
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-300 mb-2">Analysis Results:</div>
                        <div className="max-h-96 overflow-y-auto">
                            <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                                {typeof results.data === 'string'
                                    ? results.data
                                    : JSON.stringify(results.data, null, 2)
                                }
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function PuneMapDashboard() {
    const mapRef = useRef(null)
    const mapElRef = useRef(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const [clickedCoordinates, setClickedCoordinates] = useState(null)
    const [selectedWard, setSelectedWard] = useState('')
    const [userQuery, setUserQuery] = useState('')
    const [showWardDropdown, setShowWardDropdown] = useState(false)
    const [showOnboarding, setShowOnboarding] = useState(false)
    const [puneWards, setPuneWards] = useState([]);
    const navigate = useNavigate();

    // New states for API integration
    const [apiResults, setApiResults] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [apiError, setApiError] = useState(null)

    // Point-in-polygon algorithm to check if a point is inside a polygon
    const isPointInPolygon = (point, polygon) => {
        const [x, y] = point;
        let inside = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const [xi, yi] = polygon[i];
            const [xj, yj] = polygon[j];

            if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }

        return inside;
    };

    // Function to find which ward contains the given coordinates
    const findWardForCoordinates = (lat, lng) => {
        const point = [parseFloat(lng), parseFloat(lat)]; // [longitude, latitude]

        for (const ward of puneWards) {
            // Convert coordinates to [lng, lat] format for consistency
            const polygon = ward.approximate_coordinates.map(coord => [coord[0], coord[1]]);

            if (isPointInPolygon(point, polygon)) {
                return ward.ward_name;
            }
        }

        // If no exact match found, find the closest ward by calculating distance to polygon center
        let closestWard = null;
        let minDistance = Infinity;

        for (const ward of puneWards) {
            // Calculate center of the ward polygon
            const centerLng = ward.approximate_coordinates.reduce((sum, coord) => sum + coord[0], 0) / ward.approximate_coordinates.length;
            const centerLat = ward.approximate_coordinates.reduce((sum, coord) => sum + coord[1], 0) / ward.approximate_coordinates.length;

            // Calculate distance using Haversine formula approximation
            const distance = Math.sqrt(Math.pow(parseFloat(lng) - centerLng, 2) + Math.pow(parseFloat(lat) - centerLat, 2));

            if (distance < minDistance) {
                minDistance = distance;
                closestWard = ward.ward_name;
            }
        }

        return closestWard;
    };

    // Fetch ward data for the dropdown
    useEffect(() => {
        fetch('/wards.json')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.wards)) {
                    setPuneWards(data.wards);
                } else {
                    console.error("Fetched data is not in the expected format. It must be an object with a 'wards' array.", data);
                }
            })
            .catch(error => console.error('Error fetching ward data:', error));
    }, []);

    // Initialize Leaflet map
    useEffect(() => {
        if (!selectedRole || !mapElRef.current) return
        if (!window.L) {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
            script.onload = initializeMap
            document.head.appendChild(script)

            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
            document.head.appendChild(link)
            return
        }
        initializeMap();
    }, [selectedRole, puneWards]) // Added puneWards dependency

    const initializeMap = () => {
        if (!window.L || !mapElRef.current || mapRef.current) return

        const map = L.map(mapElRef.current, {
            center: [18.5204, 73.8567], // Pune coordinates
            zoom: 12,
            maxBounds: [
                [18.45, 73.74],  // Southwest corner
                [18.63, 73.98]   // Northeast corner
            ],
            maxBoundsViscosity: 1.0,
            minZoom: 10
        })

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)

        // Handle map clicks to get coordinates
        let currentMarker = null
        map.on('click', (e) => {
            const { lat, lng } = e.latlng
            setClickedCoordinates({ lat: lat.toFixed(6), lng: lng.toFixed(6) })

            // Find and automatically select the ward for these coordinates
            if (puneWards.length > 0) {
                const wardName = findWardForCoordinates(lat, lng);
                if (wardName) {
                    setSelectedWard(wardName);
                } else {
                    setSelectedWard('');
                }
            }

            // Remove previous marker
            if (currentMarker) {
                map.removeLayer(currentMarker)
            }

            // Add new marker with ward information
            const selectedWardName = puneWards.length > 0 ? findWardForCoordinates(lat, lng) : null;
            const popupContent = selectedWardName
                ? `Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}<br><strong>Ward:</strong> ${selectedWardName}`
                : `Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`;

            currentMarker = L.marker([lat, lng]).addTo(map)
                .bindPopup(popupContent)
                .openPopup();
        })
    }

    const handleRoleSelect = (role) => {
        setSelectedRole(role)
        setShowOnboarding(true)
    }

    const dismissOnboarding = () => {
        setShowOnboarding(false)
    }

    const handleWardSelect = (wardName) => {
        console.log('handleWardSelect called with:', wardName);

        setSelectedWard(wardName)
        setShowWardDropdown(false)

        // Try exact match first
        let ward = puneWards.find(w => w.ward_name === wardName)

        // If no exact match, try partial match (in case of formatting differences)
        if (!ward) {
            ward = puneWards.find(w =>
                w.ward_name.toLowerCase().includes(wardName.toLowerCase()) ||
                wardName.toLowerCase().includes(w.ward_name.toLowerCase())
            )
        }

        console.log('Found ward:', ward);

        if (!ward) {
            console.log('No ward found for:', wardName);
            return;
        }

        if (mapRef.current && window.L) {
            // Calculate center of the ward polygon
            const centerLng = ward.approximate_coordinates.reduce((sum, coord) => sum + coord[0], 0) / ward.approximate_coordinates.length;
            const centerLat = ward.approximate_coordinates.reduce((sum, coord) => sum + coord[1], 0) / ward.approximate_coordinates.length;

            const mapCenter = [centerLat, centerLng]

            mapRef.current.setView(mapCenter, 14)
            setClickedCoordinates({
                lat: centerLat.toFixed(6),
                lng: centerLng.toFixed(6)
            })

            // Remove existing markers and add new one
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof window.L.Marker) {
                    mapRef.current.removeLayer(layer);
                }
            });

            window.L.marker(mapCenter).addTo(mapRef.current)
                .bindPopup(`Ward: ${wardName}<br>Lat: ${centerLat.toFixed(6)}<br>Lng: ${centerLng.toFixed(6)}`)
                .openPopup();
        }
    }

    // Updated handleSendQuery function with API integration
    const handleSendQuery = async () => {
        if (!userQuery.trim()) return

        // Clear previous results and errors
        setApiResults(null)
        setApiError(null)
        setIsAnalyzing(true)

        try {
            // Prepare coordinates array
            const coordinates = clickedCoordinates ? [clickedCoordinates] : []

            // Prepare additional parameters
            const additionalParams = {
                role: selectedRole,
                ward: selectedWard,
                timestamp: new Date().toISOString(),
                source: 'pune_environmental_dashboard'
            }

            console.log('Sending query to API:', {
                query: userQuery,
                coordinates,
                additionalParams
            })

            // Call the API
            const response = await GeospatialAPI.analyzeGeospatialData(
                userQuery,
                coordinates,
                additionalParams
            )

            console.log('API Response:', response)
            navigate('/representation', { state: { responseData: response } });
            window.scrollTo(0, 0);


            setApiResults(response)

        } catch (error) {
            console.error('API call failed:', error)
            setApiError(error.message || 'An error occurred while analyzing your query')
        } finally {
            setIsAnalyzing(false)
        }

        // Clear the input
        setUserQuery('')
    }

    const handleCloseResults = () => {
        setApiResults(null)
        setApiError(null)
    }
    const handleQuestionClick=(question => {
        setUserQuery(question)
    })

    return (
        <div className="min-h-screen text-white bg-gray-950">
            {/* Header bar */}
            <div className="px-4 pt-4 max-w-7xl mx-auto">
                <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-600 flex items-center justify-center">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg font-bold">Pune Environmental Monitor</div>
                                <div className="text-xs text-gray-400">Interactive city analysis platform</div>
                            </div>
                        </div>
                    </div>

                    <RoleSelector onSelect={handleRoleSelect} selectedRole={selectedRole} />

                    {selectedRole && showOnboarding && (
                        <OnboardingBanner role={selectedRole} onDismiss={dismissOnboarding} />
                    )}
                </div>
            </div>


            
            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                {/* Map Section */}
                {selectedRole && (
                    <>
                    <Punedata/>
                    <div className="rounded-2xl border border-white/10 bg-gray-900/60 overflow-hidden">
                        <div className="p-3 flex items-center gap-2 bg-gray-900/60">
                            <Map className="w-4 h-4 text-cyan-300" />
                            <span className="text-l text-gray-300">Click anywhere on the map to get coordinates and auto-select ward</span>
                        </div>

                        <div
                            ref={mapElRef}
                            className="w-full"
                            style={{ height: '400px' }}
                        />
                    </div>
                    </>
                )}

                {/* Coordinates and Controls Section */}
                {selectedRole && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Coordinates Display */}
                        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Target className="w-4 h-4 text-emerald-400" />
                                <span className="font-semibold">Selected Location</span>
                            </div>
                            {clickedCoordinates ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-red-400" />
                                        <span className="text-sm text-gray-400">Latitude:</span>
                                        <span className="font-mono text-sm text-cyan-300">{clickedCoordinates.lat}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-red-400" />
                                        <span className="text-sm text-gray-400">Longitude:</span>
                                        <span className="font-mono text-sm text-cyan-300">{clickedCoordinates.lng}</span>
                                    </div> 
                                    {selectedWard && (
                                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
                                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                            <span className="text-sm text-gray-400">Ward:</span>
                                            <span className="text-sm text-emerald-300 font-medium">{selectedWard}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">Click on the map to select coordinates</p>
                            )}
                        </div>

                        {/* Ward Selection */}
                        <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4">
                            <div className="font-semibold mb-3"> Ward</div>
                            <div className="relative">
                                <button
                                    onClick={() => setShowWardDropdown(!showWardDropdown)}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-sm hover:bg-gray-700 focus:outline-none"
                                >
                                    <span className="text-gray-300">
                                        {selectedWard || 'Choose a ward...'}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {showWardDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                                        {puneWards.map((ward) => (
                                            <button
                                                key={ward.ward_number}
                                                onClick={() => handleWardSelect(ward.ward_name)}
                                                className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                                            >
                                                {ward.ward_name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Query Section */}
                {selectedRole && (
                    <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                            <span className="font-semibold">Ask a Question</span>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <textarea
                                value={userQuery}
                                onChange={(e) => setUserQuery(e.target.value)}
                                placeholder="Enter your environmental query..."
                                className="flex-1 px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendQuery()}
                                disabled={isAnalyzing}
                            />
                            <button
                                onClick={handleSendQuery}
                                disabled={!userQuery.trim() || isAnalyzing}
                                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm min-w-[80px] justify-center"
                            >
                                {isAnalyzing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Common Questions */}
                        <div className="pt-3 border-t border-white/10">
                            <div className="text-sm text-gray-300 mb-3">Commonly Asked Questions</div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {COMMON_QUESTIONS.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuestionClick(question)}
                                        className="p-3 text-left text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                                        disabled={isAnalyzing}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                <ResultsDisplay
                    results={apiResults}
                    isLoading={isAnalyzing}
                    error={apiError}
                    onClose={handleCloseResults}
                />
            </div>
        </div>
    )
}