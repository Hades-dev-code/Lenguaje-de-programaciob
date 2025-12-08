import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/profile-pic.png";

function getPokemonIdFromUrl(url) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}

function PokeSidebar({ setPokemonId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const autoScrollInterval = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results))
      .catch((err) => console.error("Error cargando Pokémon:", err));
  }, []);

  const startScroll = (direction, speed = 2) => {
    stopScroll();
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += direction * speed;
      }
    }, 30);
  };

  const stopScroll = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = null;
  };

  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 1;
        const atBottom =
          scrollRef.current.scrollTop >=
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        if (atBottom) clearInterval(autoScrollInterval.current);
      }
    }, 151);

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  const handleNavigateHome = () => navigate("/");

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-zinc-900 text-white 
                  flex flex-col items-center py-6 transition-all duration-300 
                  ${isExpanded ? "w-48" : "w-20"} z-50 transition-colors`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        onClick={handleNavigateHome}
        className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500 mb-6 cursor-pointer"
      >
        <img src={Avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>

      <div
        className="w-full h-6 cursor-pointer"
        onMouseEnter={() => startScroll(-1, 6)}
        onMouseLeave={stopScroll}
      />

      <nav
        ref={scrollRef}
        className="flex flex-col gap-4 overflow-y-hidden flex-1"
      >
        {pokemonList.map((pokemon) => {
          const id = getPokemonIdFromUrl(pokemon.url);
          return (
            <button
              key={pokemon.name}
              onClick={() => setPokemonId(pokemon.name)}
              className="flex items-center gap-2 hover:text-indigo-400 transition capitalize"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemon.name}
                className="w-6 h-6"
              />
              {isExpanded && <span>{pokemon.name}</span>}
            </button>
          );
        })}
      </nav>

      <div
        className="w-full h-6 cursor-pointer"
        onMouseEnter={() => startScroll(1, 6)}
        onMouseLeave={stopScroll}
      />
    </aside>
  );
}

export default PokeSidebar;
