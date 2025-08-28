import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Punedata = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pune insights data
  const slides = [
    {
      id: 1,
      title: "Monsoon Alert 2025",
      description: "Yellow alert issued for heavy rain in Western Ghats regions including Pune",
      image: "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?w=1200&h=300&fit=crop&q=80",
      category: "Weather Alert"
    },
    {
      id: 2,
      title: "Metro Line 3 Progress", 
      description: "Hinjewadi to District Court connectivity advancing with 15 modern stations",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=300&fit=crop&q=80",
      category: "Infrastructure"
    },
    {
      id: 3,
      title: "Carbon Neutral 2030",
      description: "500MW rooftop solar capacity and 1 lakh electric vehicles target by 2030",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=300&fit=crop&q=80",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Enhanced Security",
      description: "Smart surveillance systems deployed across Pune districts for safety",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=300&fit=crop&q=80",
      category: "Public Safety"
    },
    {
      id: 5,
      title: "Air Quality Monitoring",
      description: "Real-time AQI tracking across 25 locations with IoT sensors",
      image: "https://images.unsplash.com/photo-1569163366506-a7c8bb315c1b?w=1200&h=300&fit=crop&q=80",
      category: "Environment"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {/* Slides */}
        <div className="relative h-64 overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 relative">
                {/* Background Image */}
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div className="max-w-2xl">
                    <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                      {slide.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{slide.title}</h3>
                    <p className="text-lg text-gray-200">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Punedata;