import React, { useState } from "react";
import { Link } from "react-router-dom";
import GithubIcon from "../../assets/github-icon.png";
import CompanyIcon from "../../assets/company-icon.png";
import ProfilePic from "../../assets/profile-pic.png";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-zinc-900 text-white 
                  flex flex-col items-center py-6 transition-all duration-300 
                  ${isExpanded ? "w-48" : "w-20"} z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500 mb-6">
        <img
          src={ProfilePic}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Íconos arriba, justo después del avatar */}
      <nav className="flex flex-col gap-6 mb-8">
        <a
          href="https://github.com/Hades-dev-code"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-indigo-400 transition"
        >
          <img src={GithubIcon} alt="GitHub" className="w-6 h-6" />
          {isExpanded && <span>Mi GitHub</span>}
        </a>

        <a
          href="https://github.com/bufferring"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-indigo-400 transition"
        >
          <img src={CompanyIcon} alt="Compañía" className="w-6 h-6" />
          {isExpanded && <span>Buffer Ring</span>}
        </a>
      </nav>

      {/* Botón de contacto debajo de los íconos */}
      <Link
        to="/contacto"
        className="mt-4 w-full text-center bg-indigo-600 hover:bg-indigo-700 
                   py-2 px-3 rounded-lg text-sm transition"
      >
        {isExpanded ? "Contáctame" : "✉️"}
      </Link>
    </aside>
  );
}

export default Sidebar;
