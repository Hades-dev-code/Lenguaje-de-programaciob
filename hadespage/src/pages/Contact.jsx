import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700 p-8">
      <div className="bg-zinc-200 p-8 rounded-xl shadow-lg w-full max-w-lg border-4 border-zinc-500">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Contáctame 📩
        </h2>

        {/* Formulario con FormSubmit */}
        <form
          action="https://formsubmit.co/hadesdev004@gmail.com"
          method="POST"
          className="space-y-4"
          <input
    type="text"
    name="name"
    placeholder="Tu nombre"
    required
    className="w-full p-3 border rounded-lg text-gray-900"
  />
  <input
    type="email"
    name="email"
    placeholder="Tu correo"
    required
    className="w-full p-3 border rounded-lg text-gray-900"
  />
  <textarea
    name="message"
    placeholder="Escribe tu mensaje..."
    required
    className="w-full p-3 border rounded-lg h-32 text-gray-900"
  ></textarea>

  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
  >
    Enviar
  </button>
</form>

        {/* Botón para regresar */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
        >
          ← Volver al Portafolio
        </button>
      </div>
    </div>
  );
}

export default Contact;
