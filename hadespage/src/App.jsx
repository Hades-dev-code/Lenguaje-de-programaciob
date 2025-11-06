// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import FootballData from "./pages/Football-Data.jsx"; // 👈 Importamos la nueva página
import useScrollProgress from "./hooks/useScrollProgress.js";

function App() {
  const progress = useScrollProgress();

  // Interpolación
  const redValue = Math.floor(255 * progress);
  const bgColor = `rgb(${redValue}, 0, 0)`;

  return (
    <Router>
      <div
        className="min-h-screen text-white relative transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/football-data" element={<FootballData />} /> {/* 👈 Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
