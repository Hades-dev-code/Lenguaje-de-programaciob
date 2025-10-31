import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import useScrollProgress from "./hooks/useScrollProgress.js";

function App() {
  const progress = useScrollProgress();

  // Interpolación: negro (0,0,0) → rojo (255,0,0)
  const redValue = Math.floor(255 * progress);
  const bgColor = `rgb(${redValue}, 0, 0)`;

  return (
    <Router>
      <div
        className="min-h-screen text-white relative transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        {/* Luna */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full 
                        bg-white/90 shadow-[0_0_80px_30px_rgba(255,255,255,0.6)] 
                        translate-x-1/3 -translate-y-1/3">
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
