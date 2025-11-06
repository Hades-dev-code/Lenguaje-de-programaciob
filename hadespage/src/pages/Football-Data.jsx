import React, { useState, useEffect } from "react";
import SidebarFootball from "../components/shared/SidebarFootball";
import { handleApiError } from "../utils/toastHandler";

function FootballData() {
  const [teamId, setTeamId] = useState(81); // FC Barcelona por defecto
  const [lastMatch, setLastMatch] = useState(null);
  const [nextMatch, setNextMatch] = useState(null);
  const [squad, setSquad] = useState([]);

  // Cargar datos del equipo seleccionado desde tu backend Express
  useEffect(() => {
    // Último partido terminado
    fetch(`http://localhost:4000/api/team/${teamId}/last-match`)
      .then(res => {
        if (!res.ok) throw { response: res };
        return res.json();
      })
      .then(data => setLastMatch(data.matches[0]))
      .catch(err => handleApiError(err));

    // Próximo partido
    fetch(`http://localhost:4000/api/team/${teamId}/next-match`)
      .then(res => {
        if (!res.ok) throw { response: res };
        return res.json();
      })
      .then(data => setNextMatch(data.matches[0]))
      .catch(err => handleApiError(err));

    // Plantilla
    fetch(`http://localhost:4000/api/team/${teamId}/squad`)
      .then(res => {
        if (!res.ok) throw { response: res };
        return res.json();
      })
      .then(data => setSquad(data))
      .catch(err => handleApiError(err));
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
