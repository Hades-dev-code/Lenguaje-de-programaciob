import React from "react";
import AboutMeImage from "../../assets/about-me.jpg";

function About() {
  return (
    <section
      id="sobre-mi"
      className="p-8 rounded-xl shadow-lg mt-12 border-4 border-zinc-500 transition-colors duration-300"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-600 pb-2">
        Sobre Mí 👤
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Texto */}
        <div className="md:w-2/3 text-lg text-gray-700 space-y-4">
          <p>
            Soy estudiante de ingeniería de sistemas de la UNEFA núcleo Apure. 
            Aún soy bastante novato en el área de programación, pero he tenido 
            la oportunidad de crear algunos proyectos además de formar parte de 
            la organización de Buffer ring.
          </p>
          <p>
            En Buffer ring hemos trabajado juntos para crear un sitio web, lo que 
            ha sido una experiencia valiosa para aplicar conocimientos y colaborar 
            en un proyecto real. Estoy comprometido a seguir aprendiendo y 
            mejorando mis habilidades como desarrollador.
          </p>
        </div>

        {/* Imagen */}
        <div className="md:w-1/3 w-full flex justify-center p-4">
          <img
            src={AboutMeImage}
            alt="Ilustración o Logo Personal"
            className="w-full max-w-xs h-auto rounded-xl shadow-lg border-4 border-indigo-200 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
