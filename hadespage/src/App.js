import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* Contenedor principal con fondo nocturno */}
      <div className="min-h-screen bg-night-sky text-white relative">
        
        {/* Luna en la esquina superior derecha */}
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
