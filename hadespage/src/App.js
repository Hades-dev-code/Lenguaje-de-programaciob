import React from 'react';
import './App.css'; 
import Sidebar from './Sidebar';
import DriveAnalyzer from './assets/driveanalizer.jpg';
import Simulator from './assets/simulator.jpg';
import Peak from './assets/peak.jpg';
import CarFix from './assets/Carfix.jpg';
import ProfilePic from './assets/profile-pic.png'; 
import AboutMeImage from './assets/about-me.jpg'

// Simulación de los elementos del Carrusel de Trabajos
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
    { title: "CarFix", icon: CarFix, link: "https://www.carfixve.app" },
];

function App() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            
            <Sidebar />
            
            {/* Contenido Principal */}
            <main className="ml-20 p-8 w-full"> 
                
                {/* 1. Bloque de Presentación (Margen Corregido) */}
                <section 
                    id="presentacion" 
                    className="p-10 bg-white rounded-xl shadow-lg mb-12"
                >
                    {/* CORRECCIÓN DE MARGEN: mx-auto y max-w-4xl centran el bloque y limitan el espacio entre elementos. */}
                    <div className="flex flex-col md:flex-row items-center mx-auto max-w-4xl">
                        
                        {/* Avatar */}
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 flex-shrink-0 mb-6 md:mb-0 md:mr-10">
                            <img
                                src={ProfilePic}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Texto de Bienvenida */}
                        <div className="text-center md:text-left">
                            <p className="text-xl font-semibold text-indigo-600">
                                ¡Hola a todos!
                            </p>
                            <h1 className="text-5xl font-extrabold text-gray-900 mt-1 mb-4">
                                Bienvenidos a mi <span className="text-indigo-600">Portafolio</span>
                            </h1>
                            <p className="text-lg text-gray-600">
                                Soy desarrollador, ahora mismo enfocado en <span className="font-bold">React y Tailwind CSS</span>. Explora mis trabajos y descubre cómo puedo ayudar a tu próximo proyecto.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. Carrusel de Trabajos (Uniformidad Corregida) */}
                <section id="trabajos" className="p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                        Trabajos Destacados 🚀
                    </h2>
                    
                    {/* Cuadrícula */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {workItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl shadow-md transition duration-300 transform hover:scale-105 flex flex-col"
                            >
                                {/* CORRECCIÓN DE ALTURA 1: Contenedor de Imagen con ALTURA FIJA (h-32) para alinear todas las tarjetas */}
                                <div className="mb-4 h-32 w-full overflow-hidden rounded-lg flex items-center justify-center border border-indigo-200">
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="h-full w-full object-contain p-2" // object-contain previene que las imágenes se corten y p-2 añade relleno.
                                    />
                                </div>
                                
                                {/* Título */}
                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 mt-2">
                                    {item.title}
                                </h3>
                                
                                {/* CORRECCIÓN DE ALTURA 2: Contenedor del texto inferior con ALTURA FIJA (h-10) para uniformidad. */}
                                <div className="h-10 flex items-end">
                                    <p className="text-sm text-indigo-600 font-medium mt-2">
                                        Ver proyecto &rarr;
                                    </p>
                                </div>
                            </a>
                        ))}
                        {/* 3. Sección "Sobre Mí" */}
<section id="sobre-mi" className="p-8 bg-white rounded-xl shadow-lg mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
        Sobre Mí 👤
    </h2>
    
    {/* Estructura de dos columnas: Texto y Imagen */}
    <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Bloque de Texto (ocupa 2/3 en desktop) */}
        <div className="md:w-2/3 text-lg text-gray-700 space-y-4">
            <p>
                Soy estudiante de ingeniería de sistemas de la UNEFA núcleo Apure. Aún soy bastante **novato** en el área de programación, pero he tenido la oportunidad de crear unos pocos proyectos además de formar parte de la organización de **Buffer ring**.
            </p>
            <p>
                En Buffer ring hemos trabajado juntos para crear un sitio web, lo que ha sido una experiencia valiosa para aplicar conocimientos y colaborar en un proyecto real. Estoy comprometido a seguir aprendiendo y mejorando mis habilidades como desarrollador.
            </p>
        </div>
        
        {/* Bloque de Imagen/Ilustración*/}
        <div className="md:w-1/3 w-full flex justify-center p-4">
            <img 
                src={AboutMeImage} 
                alt="Ilustración o Logo Personal" 
                className="w-full max-w-xs h-auto rounded-xl shadow-lg border-4 border-indigo-200 object-cover"
            />
        </div>
        
    </div>
</section>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default App;
