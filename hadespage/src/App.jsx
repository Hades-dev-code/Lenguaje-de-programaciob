import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import useScrollProgress from "./hooks/useScrollProgress.js";

function App() {
  const progress = useScrollProgress();

  // Interpolamos entre negro (0,0,0) y rojo (255,0,0)
  const redValue = Math.floor(255 * progress);
  const bgColor = `rgb(${redValue}, 0, 0)`; // de negro a rojo

  return (
    <Router>
      <div
        className="min-h-screen text-white relative transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        {/* Luna */}
        <div className="absolute top-10 right-10 w-28 h-28 rounded-full 
                        bg-white/90 shadow-[0_0_60px_20px_rgba(255,255,255,0.6)]">
        </div>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
