import React from "react";

// Importamos los componentes
import Sidebar from "../components/shared/Sidebar";
import Hero from "../components/sections/Hero";
import Work from "../components/sections/Work";
import About from "../components/sections/About";

function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="ml-20 p-8 w-full bg-zinc-700">
        <Hero />
        <Work />
        <About />
      </main>
    </div>
  );
}

export default Home;