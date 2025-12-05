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
import useInterpolatedColor from "./hooks/useInterpolatedColor.js";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import AOS from "aos";
import "aos/dist/aos.css";

// Color de texto desde Tailwind
const fullConfig = resolveConfig(tailwindConfig);
const moon = fullConfig.theme?.colors?.moon || "#f1f5f9";

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
  const bgColor = useInterpolatedColor();

  return (
    <Router>
      <AppContent bgColor={bgColor} />
    </Router>
  );
}

export default App;
