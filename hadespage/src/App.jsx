import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import PokeData from "./pages/PokeData.jsx";
import useScrollProgress from "./hooks/useScrollProgress.js";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import AOS from "aos";
import "aos/dist/aos.css";

// Configuración de Tailwind
const fullConfig = resolveConfig(tailwindConfig);
const dark = fullConfig.theme.colors.sky.dark;
const accent = fullConfig.theme.colors.sky.accent;
const moon = fullConfig.theme.colors.moon;

// Función para interpolar entre dos colores hex
function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  const r1 = (c1 >> 16) & 0xff,
    g1 = (c1 >> 8) & 0xff,
    b1 = c1 & 0xff;
  const r2 = (c2 >> 16) & 0xff,
    g2 = (c2 >> 8) & 0xff,
    b2 = c2 & 0xff;
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `rgb(${r},${g},${b})`;
}

// Componente interno que sí puede usar useLocation
function AppContent({ bgColor }) {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh(); // refresca animaciones al cambiar de ruta
  }, [location]);

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: moon }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <div data-aos="fade-down">
              <Home />
            </div>
          }
        />
        <Route
          path="/contacto"
          element={
            <div data-aos="fade-down">
              <Contact />
            </div>
          }
        />
        <Route
          path="/poke-data"
          element={
            <div data-aos="fade-down">
              <PokeData />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  const progress = useScrollProgress();
  const bgColor = interpolateColor(dark, accent, progress);

  return (
    <Router>
      <AppContent bgColor={bgColor} />
    </Router>
  );
}

export default App;
