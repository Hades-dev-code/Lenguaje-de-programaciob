import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import DriveAnalyzer from "./assets/driveanalizer.jpg";
import Simulator from "./assets/simulator.jpg";
import Peak from "./assets/peak.jpg";
import CarFix from "./assets/Carfix.jpg";
import ProfilePic from "./assets/profile-pic.png"; // También la imagen de perfil

// Simulación de los elementos del Carrusel de Trabajos
const workItems = [
  // Usamos las variables importadas en lugar de strings de ruta
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
  { title: "CarFix", icon: CarFix, link: "https://www.carfixve.app" },
];

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
                   <Sidebar />             {/* Contenido Principal */}     {" "}
      <main className="ml-20 p-8 w-full">
                           {/* 1. Bloque de Presentación (Mi Carota) */}       {" "}
        <section
          id="presentacion"
          className="p-10 bg-white rounded-xl shadow-lg mb-12"
        >
          {/* NUEVO CONTENEDOR: max-w-4xl centra el bloque entero */}
          <div className="flex flex-col md:flex-row items-center mx-auto max-w-4xl">
            {/* Avatar (sin cambios en clases de Tailwind) */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 border-4 border-indigo-500 flex items-center justify-center mb-6 md:mb-0 md:mr-10 flex-shrink-0">
              {/* Agregué 'flex-shrink-0' para asegurar que no se encoja */}
              <img
                src={ProfilePic}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Texto de Bienvenida: quite max-w-xl para que se ajuste mejor */}
            <div className="text-center md:text-left">
              <p className="text-xl font-semibold text-indigo-600">
                ¡Hola a todos!
              </p>
                             {" "}
              <h1 className="text-5xl font-extrabold text-gray-900 mt-1 mb-4">
                                    Bienvenidos a mi{" "}
                <span className="text-indigo-600">Portafolio</span>             
                 {" "}
              </h1>
                             {" "}
              <p className="text-lg text-gray-600">
                                    Soy desarrollador, ahor mismo enfocado en{" "}
                <span className="font-bold">React y Tailwind CSS</span>. Explora
                mis trabajos y descubre cómo puedo ayudar a tu próximo proyecto.
                               {" "}
              </p>
                         {" "}
            </div>
          </div>
        </section>
                {/* 2. Carrusel de Trabajos (Estructura de Bloques) */}       {" "}
        <section id="trabajos" className="p-8 bg-white rounded-xl shadow-lg">
                     {" "}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                            Trabajos Destacados 🚀            {" "}
          </h2>
                                  {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {" "}
            {workItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-md transition duration-300 transform hover:scale-105 group"
              >
                {/* Aquí mostramos la imagen como el 'ícono' */}               
                       {" "}
                <div className="mb-4 h-24 w-full overflow-hidden rounded-md flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                                       {" "}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700">
                                              {item.title}                     
                   {" "}
                </h3>
                                       {" "}
                <p className="text-sm text-gray-500 mt-2">
                                              Ver proyecto &rarr;              
                           {" "}
                </p>
                                   {" "}
              </a>
            ))}
                       {" "}
          </div>
                              {" "}
        </section>
             {" "}
      </main>
         {" "}
    </div>
  );
}

export default App;
