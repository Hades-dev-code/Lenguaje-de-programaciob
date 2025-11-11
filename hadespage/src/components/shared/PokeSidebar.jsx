import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function PokeSidebar({ setPokemonId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    // Traer lista de Pokémon (primeros 50)
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(res => res.json())
      .then(data => setPokemonList(data.results))
      .catch(err => console.error("Error cargando Pokémon:", err));
  }, []);

  const navigate = useNavigate();

  // Scroll manual (hover arriba/abajo)
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
        scrollRef.current.scrollTop += 1;
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
          src="../../assets/profile-pic.png"
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

      {/* Lista de Pokémon */}
      <nav
        ref={scrollRef}
        className="flex flex-col gap-4 overflow-y-hidden flex-1"
      >
        {pokemonList.map(pokemon => (
          <button
            key={pokemon.name}
            onClick={() => setPokemonId(pokemon.name)}
            className="flex items-center gap-2 hover:text-indigo-400 transition capitalize"
          >
            {/* Sprite básico desde PokéAPI */}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.url.split("/")[6]
              }.png`}
              alt={pokemon.name}
              className="w-6 h-6"
            />
            {isExpanded && <span>{pokemon.name}</span>}
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

export default PokeSidebar;


