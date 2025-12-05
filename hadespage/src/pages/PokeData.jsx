import React, { useState, useEffect } from "react";
import PokeSidebar from "../components/shared/PokeSidebar";
import { handleApiError } from "../utils/toastHandler";

// Función para obtener flavor text en español
function getSpanishFlavorText(entries) {
  return (
    entries.find(e => e.language.name === "es")?.flavor_text ||
    "No hay descripción disponible en español."
  );
}

function PokemonData() {
  const [pokemonId, setPokemonId] = useState("gengar");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => {
        if (!res.ok) throw new Error("Error en la API Pokémon");
        return res.json();
      }),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`).then(res => {
        if (!res.ok) throw new Error("Error en species API");
        return res.json();
      })
    ])
      .then(([info, species]) => {
        setPokemonInfo(info);
        setPokemonSpecies(species);
      })
      .catch(handleApiError);
  }, [pokemonId]);

  return (
    <div className="flex min-h-screen bg-zinc-800 text-white">
      <PokeSidebar setPokemonId={setPokemonId} />

      <main className="flex-1 p-8 pl-24 space-y-10">
        {/* Cabecera con sprite y nombre */}
        {pokemonInfo && (
          <div className="flex items-center gap-6">
            {pokemonInfo.sprites?.front_default && (
              <img
                src={pokemonInfo.sprites.front_default}
                alt={pokemonInfo.name}
                className="w-24 h-24"
              />
            )}
            <h1 className="text-4xl font-bold capitalize">{pokemonInfo.name}</h1>
          </div>
        )}

        {/* Historia */}
        <section className="bg-zinc-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Historia</h2>
          {pokemonSpecies ? (
            <p className="text-zinc-300">
              {getSpanishFlavorText(pokemonSpecies.flavor_text_entries)}
            </p>
          ) : (
            <p>Cargando historia...</p>
          )}
        </section>

        {/* Habilidades */}
        <section className="bg-zinc-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          {pokemonInfo ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pokemonInfo.abilities.map(a => (
                <div
                  key={a.ability.name}
                  className="bg-zinc-600 p-4 rounded-lg text-center"
                >
                  <h3 className="font-semibold capitalize">{a.ability.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>Cargando habilidades...</p>
          )}
        </section>

        {/* Estadísticas */}
        <section className="bg-zinc-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          {pokemonInfo ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pokemonInfo.stats.map(s => (
                <div
                  key={s.stat.name}
                  className="bg-zinc-600 p-4 rounded-lg text-center"
                >
                  <h3 className="font-semibold capitalize">{s.stat.name}</h3>
                  <p className="text-indigo-300 text-xl">{s.base_stat}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Cargando estadísticas...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default PokemonData;
