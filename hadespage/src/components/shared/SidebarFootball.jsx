import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SidebarFootball({ setTeamId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [teams, setTeams] = useState([]);

  const API_URL = "https://api.football-data.org/v4";
  const API_KEY = "69d53a18557d4c5e92d9bab88c53ec62";

  useEffect(() => {
    const headers = { "X-Auth-Token": API_KEY };
    fetch(`${API_URL}/competitions/PD/teams`, { headers })
      .then(res => res.json())
      .then(data => setTeams(data.teams));
  }, []);

  const navigate = useNavigate();

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

      {/* Equipos de La Liga */}
      <nav className="flex flex-col gap-6 overflow-y-auto">
        {teams.map(team => (
          <button
            key={team.id}
            onClick={() => setTeamId(team.id)}
            className="flex items-center gap-2 hover:text-indigo-400 transition"
          >
            <img src={team.crest} alt={team.name} className="w-6 h-6" />
            {isExpanded && <span>{team.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default SidebarFootball;
