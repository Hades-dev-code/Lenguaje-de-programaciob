import React from "react";
import WorkItem from "../shared/WorkItem";

// Importa tus imágenes desde assets
import DriveAnalyzer from "../../assets/driveanalizer.jpg";
import Simulator from "../../assets/simulator.jpg";
import Peak from "../../assets/peak.jpg";
import CarFix from "../../assets/Carfix.jpg";

// Array de proyectos destacados
const workItems = [
  {
    title: "Analizador de archivos",
    icon: DriveAnalyzer,
    link: "https://github.com/Hades-dev-code/Lenguaje-de-programaciob/tree/main/unidad%201",
  },
  {
    title: "Simulador Compra-Venta",
    icon: Simulator,
    link: "https://github.com/Hades-dev-code/Lenguaje-de-programaciob/tree/main/Unidad%202",
  },
  {
    title: "Manipulador de archivo",
    icon: Peak,
    link: "https://github.com/Hades-dev-code/Lenguaje-de-programaciob/tree/main/unidad%203",
  },
  {
    title: "CarFix",
    icon: CarFix,
    link: "https://www.carfixve.app",
  },
];

function Work() {
  return (
    <section
      id="trabajos"
      className="border-4 border-zinc-500 p-8 bg-zinc-200 rounded-xl shadow-lg mt-12"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
        Trabajos Destacados 🚀
      </h2>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workItems.map((item, index) => (
          <WorkItem
            key={index}
            title={item.title}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Work;