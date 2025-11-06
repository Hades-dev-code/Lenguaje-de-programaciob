import React, { useState, useEffect } from "react";
import SidebarFootball from "../components/shared/SidebarFootball";
import { handleApiError } from "../utils/toastHandler";

fetch(`${API_URL}/teams/${teamId}/matches?status=FINISHED&limit=1`, { headers })
  .then(res => {
    if (!res.ok) throw { response: res };
    return res.json();
  })
  .then(data => setLastMatch(data.matches[0]))
  .catch(err => handleApiError(err));

function FootballData() {
  const [teamId, setTeamId] = useState(81); // FC Barcelona por defecto
  const [lastMatch, setLastMatch] = useState(null);
  const [nextMatch, setNextMatch] = useState(null);
  const [squad, setSquad] = useState([]);

  const API_URL = "https://api.football-data.org/v4";
  const API_KEY = "69d53a18557d4c5e92d9bab88c53ec62";

  // Cargar datos del equipo seleccionado
  useEffect(() => {
    const headers = { "X-Auth-Token": API_KEY };

    // Último partido terminado
    fetch(`${API_URL}/teams/${teamId}/matches?status=FINISHED&limit=1`, { headers })
      .then(res => res.json())
      .then(data => setLastMatch(data.matches[0]));

    // Próximo partido
    fetch(`${API_URL}/teams/${teamId}/matches?status=SCHEDULED&limit=1`, { headers })
      .then(res => res.json())
      .then(data => setNextMatch(data.matches[0]));

    // Plantilla
    fetch(`${API_URL}/teams/${teamId}`, { headers })
      .then(res => res.json())
      .then(data => setSquad(data.squad));
  }, [teamId]);

  return (
    <div className="flex min-h-screen bg-zinc-800 text-white">
      {/* Sidebar */}
      <SidebarFootball setTeamId={setTeamId} />

      {/* Contenido principal */}
      <main className="flex-1 p-8 space-y-10">
        {/* Último resultado */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Último Resultado</h2>
          {lastMatch ? (
            <p>
              {lastMatch.homeTeam.name} {lastMatch.score.fullTime.home} -{" "}
              {lastMatch.score.fullTime.away} {lastMatch.awayTeam.name}
            </p>
          ) : (
            <p>Cargando...</p>
          )}
        </section>

        {/* Próximo partido */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Próximo Partido</h2>
          {nextMatch ? (
            <p>
              {nextMatch.homeTeam.name} vs {nextMatch.awayTeam.name} <br />
              {new Date(nextMatch.utcDate).toLocaleString()}
            </p>
          ) : (
            <p>Cargando...</p>
          )}
        </section>

        {/* Plantilla */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Plantilla</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {squad.length > 0 ? (
              squad.map(player => (
                <div
                  key={player.id}
                  className="bg-zinc-700 p-4 rounded-lg shadow hover:scale-105 transition"
                >
                  <h3 className="font-semibold">{player.name}</h3>
                  <p>{player.position}</p>
                  <p>{player.nationality}</p>
                </div>
              ))
            ) : (
              <p>Cargando plantilla...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default FootballData;
