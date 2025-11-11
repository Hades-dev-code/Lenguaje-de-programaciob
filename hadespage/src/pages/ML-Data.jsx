import React, { useState, useEffect } from "react";
import SidebarHeroes from "../components/shared/SidebarHeroes";
import { handleApiError } from "../utils/toastHandler";

const API_HOST = "mobile-legends-character-api.p.rapidapi.com";
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

function MobileLegendsData() {
  const [heroId, setHeroId] = useState("Julian");
  const [heroInfo, setHeroInfo] = useState(null);

  useEffect(() => {
    fetch(`https://${API_HOST}/api/characters/${heroId}`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error("Error en la respuesta de la API");
          error.response = res;
          throw error;
        }
        return res.json();
      })
      .then(data => setHeroInfo(data))
      .catch(err => handleApiError(err));
  }, [heroId]);

  return (
    <div className="flex min-h-screen bg-zinc-800 text-white">
      {/* Sidebar con lista de héroes */}
      <SidebarHeroes setHeroId={setHeroId} />

      {/* Contenido principal */}
      <main className="flex-1 p-8 space-y-10">
        {/* Lore / Historia */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Historia</h2>
          {heroInfo ? <p>{heroInfo.story}</p> : <p>Cargando historia...</p>}
        </section>

        {/* Habilidades */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
          {heroInfo && heroInfo.skills ? (
            heroInfo.skills.map(skill => (
              <div key={skill.name} className="mb-2">
                <h3 className="font-semibold">{skill.name}</h3>
                <p>{skill.description}</p>
              </div>
            ))
          ) : (
            <p>Cargando habilidades...</p>
          )}
        </section>

        {/* Estadísticas */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          {heroInfo && heroInfo.stats ? (
            <ul>
              <li>Ataque: {heroInfo.stats.attack}</li>
              <li>Defensa: {heroInfo.stats.defense}</li>
              <li>Dificultad: {heroInfo.stats.difficulty}</li>
            </ul>
          ) : (
            <p>Cargando estadísticas...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default MobileLegendsData;
