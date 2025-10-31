import React from 'react';
import GithubIcon from '../../assets/github-icon.png'; 
import BufferringIcon from '../../assets/company-icon.png'; 
import ProfileIcon from '../../assets/profile-pic.png';

// Componente individual para cada enlace
const SidebarItem = ({ icon, url, name }) => (
    <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center h-12 w-12 my-2 mx-auto
                   transition-all duration-300 ease-linear rounded-xl
                   hover:bg-indigo-600 hover:text-white text-gray-400
                   group"
    >
        {/* Ícono */}
        <img src={icon} alt={name} className="h-6 w-6 ml-3" />
        
        <span className="absolute left-full w-48 ml-4
                       bg-white text-gray-900 rounded-md px-4 py-2
                       opacity-0 group-hover:opacity-100 group-hover:transition-opacity
                       shadow-lg whitespace-nowrap pointer-events-none">
            {name}
        </span>
    </a>
);


const Sidebar = () => {
    // Definimos los enlaces con su información
    const topLinks = [
        { 
            name: 'Mi Perfil', 
            url: '#', // Enlace para la sección principal de la página
            icon: ProfileIcon 
        },
    ];

    const externalLinks = [
        { 
            name: 'Mi GitHub Personal', 
            url: 'https://github.com/Hades-dev-code', 
            icon: GithubIcon 
        },
        { 
            name: 'GitHub Bufferring', 
            url: 'https://github.com/bufferring', 
            icon: BufferringIcon 
        },
    ];

    return (
        // El contenedor principal del menú
        <div className="fixed left-0 top-0 h-screen w-20 
                        bg-gray-800 shadow-xl p-3 
                        flex flex-col items-center z-10"> {/* Añadimos z-10 para que esté encima del contenido */}
            
            <div className="flex flex-col w-full items-center mb-6 mt-2">
                {topLinks.map((link) => (
                    <SidebarItem key={link.name} {...link} />
                ))}
            </div>

            <div className="border-t border-gray-700 pt-4 w-10/12"></div>
            
            <div className="flex flex-col w-full items-center mt-4">
                {externalLinks.map((link) => (
                    <SidebarItem key={link.name} {...link} />
                ))}
            </div>
            
        </div>
    );
};


export default Sidebar;
