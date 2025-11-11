import React, { useState, useEffect } from "react";
import PokeSidebar from "../components/shared/PokeSidebar"; 
import { handleApiError } from "../utils/toastHandler";

function PokemonData() {
  const [pokemonId, setPokemonId] = useState("pikachu");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    // Datos básicos: stats, habilidades, sprites
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error en la API Pokémon");
        return res.json();
      })
      .then(data => setPokemonInfo(data))
      .catch(err => handleApiError(err));

    // Lore / historia (flavor text)
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error en species API");
        return res.json();
      })
      .then(data => setPokemonSpecies(data))
      .catch(err => handleApiError(err));
  }, [pokemonId]);

  return (
    <div className="flex min-h-screen bg-zinc-800 text-white">
      <PokeSidebar setHeroId={setPokemonId} /> {/* renombrar a SidebarPokemon */}

      <main className="flex-1 p-8 space-y-10">
        {/* Historia */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Historia</h2>
          {pokemonSpecies ? (
            <p>{pokemonSpecies.flavor_text_entries.find(e => e.language.name === "es")?.flavor_text}</p>
          ) : (
            <p>Cargando historia...</p>
          )}
        </section>

        {/* Habilidades */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          {pokemonInfo ? (
            pokemonInfo.abilities.map(a => (
              <div key={a.ability.name}>
                <h3 className="font-semibold">{a.ability.name}</h3>
              </div>
            ))
          ) : (
            <p>Cargando habilidades...</p>
          )}
        </section>

        {/* Estadísticas */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          {pokemonInfo ? (
            <ul>
              {pokemonInfo.stats.map(s => (
                <li key={s.stat.name}>
                  {s.stat.name}: {s.base_stat}
                </li>
              ))}
            </ul>
          ) : (
            <p>Cargando estadísticas...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default PokemonData;
