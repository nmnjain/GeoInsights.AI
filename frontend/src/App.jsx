import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EarthDashboard from "./pages/EarthDashboard";
import ImageRotate from "./pages/ImageRotate";




import AboutPlatfrom from "./pages/AboutPlatfrom";
import AppUniqueness from "./pages/AppUniqueness";
import Representation from "./pages/Representation";

function App() {
  return (
  
      
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <div className="min-h-screen transition-colors duration-300 bg-gray-950 text-white">
            {/* Futuristic background */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),rgba(0,0,0,0)_50%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(168,85,247,0.05),rgba(59,130,246,0.05),rgba(56,189,248,0.05))]" />
              <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.35'%3E%3Cpath d='M0 50 L100 50'/%3E%3Cpath d='M50 0 L50 100'/%3E%3Ccircle cx='50' cy='50' r='49'/%3E%3C/g%3E%3C/svg%3E')]" />
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 900,
                style: {
                  background: "var(--toast-bg)",
                  color: "var(--toast-color)",
                },
                success: {
                  iconTheme: {
                    primary: "green",
                    secondary: "#FFFFFF",
                  },
                  style: {
                    backgroundColor: "green",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "red",
                    secondary: "#FFFFFF",
                  },
                  style: {
                    backgroundColor: "red",
                  },
                },
                alert: {
                  iconTheme: {
                    primary: "orange",
                    secondary: "#FFFFFF",
                  },
                  style: {
                    backgroundColor: "orange",
                  },
                },
              }}
            />
            <Routes>
              {/* Public Routes */}

              {/* All routes are public now */}
              <Route
                path="/"
                element={
                  <div>
                    <Navbar />
                    <main className="">
                      <Home />
                    </main>
                    <Footer />
                  </div>
                }
              />

              <Route
                path="/representation"
                element={
                  <div>
                    <Navbar />
                    <main className="pt-16">
                      <Representation />
                    </main>
                    <Footer />
                  </div>
                }
              />

              <Route
                path="/earth"
                element={
                  <div>
                    <Navbar />
                    <main className="pt-16">
                      <EarthDashboard />
                    </main>
                    <Footer />
                  </div>
                }
              />

              <Route
                path="/image-rotate"
                element={
                  <div>
                    <Navbar />
                    <main className="pt-16">
                      <ImageRotate />
                    </main>
                    <Footer />
                  </div>
                }
              />

              

              
              {/* Routes for cards of Home page */}
              <Route
                path="/about-platform"
                element={
                  <div>
                    <Navbar />
                    <main className="pt-16">
                      <AboutPlatfrom />
                    </main>
                    {/* <Footer /> */}
                  </div>
                }
              />
              <Route
                path="/app-uniquness"
                element={
                  <div>
                    <Navbar />
                    <main className="pt-16">
                      <AppUniqueness/>
                    </main>
                    {/* <Footer /> */}
                  </div>
                }
              />
              <Route 
            path="/representation"
               element={
                  <div>
                    <Navbar />
                    <main className="">
                      <Representation />
                    </main>
                    <Footer />
                  </div>
                }
            />

              {/* Test Route - Remove in production */}
              
            </Routes>
          </div>
        </Router>
      
    
  );
}

export default App;
