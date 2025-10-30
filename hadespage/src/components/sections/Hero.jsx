import React from "react";
import ProfilePic from "../../assets/profile-pic.png";

function Hero() {
  return (
    <section
      id="presentacion"
      className="p-10 bg-zinc-200 rounded-xl shadow-lg mb-12 border-4 border-zinc-500"
    >
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
            Soy desarrollador, ahora mismo enfocado en{" "}
            <span className="font-bold">React y Tailwind CSS</span>. Explora mis
            trabajos y descubre cómo puedo ayudar a tu próximo proyecto.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;