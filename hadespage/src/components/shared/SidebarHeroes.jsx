import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function SidebarHeroes({ setHeroId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const autoScrollInterval = useRef(null);

  const API_HOST = "mobile-legends-character-api.p.rapidapi.com";
  const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

  useEffect(() => {
    fetch(`https://${API_HOST}/api/characters`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    })
      .then(res => res.json())
      .then(data => setHeroes(data))
      .catch(err => console.error("Error cargando héroes:", err));
  }, []);

  const navigate = useNavigate();

  // Scroll control manual (hover arriba/abajo)
  const startScroll = (direction, speed = 2) => {
    stopScroll();
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += direction * speed;
      }
    }, 30);
  };

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  // Scroll automático tipo marquee
  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 1; // velocidad suave
        // Reinicia al llegar al final
        if (
          scrollRef.current.scrollTop >=
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        ) {
          scrollRef.current.scrollTop = 0;
        }
      }
    }, 50);

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-zinc-900 text-white 
                  flex flex-col items-center py-6 transition-all duration-300 
                  ${isExpanded ? "w-48" : "w-20"} z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Avatar → volver al portafolio */}
      <div
        onClick={() => navigate("/")}
        className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500 mb-6 cursor-pointer"
      >
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Zona superior para acelerar scroll hacia arriba */}
      <div
        className="w-full h-6 cursor-pointer"
        onMouseEnter={() => startScroll(-1, 6)}
        onMouseLeave={stopScroll}
      />

      {/* Lista de héroes con scroll automático */}
      <nav
        ref={scrollRef}
        className="flex flex-col gap-6 overflow-y-hidden flex-1"
      >
        {heroes.map(hero => (
          <button
            key={hero.name}
            onClick={() => setHeroId(hero.name)}
            className="flex items-center gap-2 hover:text-indigo-400 transition"
          >
            {hero.icon && (
              <img src={hero.icon} alt={hero.name} className="w-6 h-6" />
            )}
            {isExpanded && <span>{hero.name}</span>}
          </button>
        ))}
      </nav>

      {/* Zona inferior para acelerar scroll hacia abajo */}
      <div
        className="w-full h-6 cursor-pointer"
        onMouseEnter={() => startScroll(1, 6)}
        onMouseLeave={stopScroll}
      />
    </aside>
  );
}

export default SidebarHeroes;
